#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef __int128 lll;

const int maxn = 100010;


lll L_[6][maxn];
lll L(int s, int n) { return L_[s][n]; }
lll fac(int s) {
    if (s <= 1) return 1;
    if (s == 2) return 2;
    if (s == 3) return 6;
    if (s == 4) return 24;
    return 120;
}

// c(s, i) = {i + s - 1\choose i}

// i + s - 1 ... i + 1
// s - 1 ... 1

void init() {
    for (int s = 0; s < 5; s++) {
        L_[s][1] = 1;
        for (int i = 2; i < maxn; i++)
            L_[s][i] = L_[s][i - 1] * (i + s - 1) / (i - 1);
    }
}

int n;
int per[maxn], iper[maxn];

lll *ans_;
struct SMX {
    int s;
    struct qrys {
        int ver, pos, X;
        lll *ans;
        bool operator < (const qrys b) const { return pos < b.pos; }
    };
    vector<qrys> lis;
    struct node {
        lll sum[5];
    } T[maxn << 2];
    node add(node a, node b) {
        node ans;
        for (int i = 0; i < 5; i++)
            ans.sum[i] = a.sum[i] + b.sum[i];
        return ans;
    }
    node calc(int i) {
        lll sum[5], tsum[5];
        memset(sum, 0, sizeof(sum));
        sum[0] = 1;
        for (int j = 1; j <= s - 1; j++) { // i + j - X
            memset(tsum, 0, sizeof(tsum));
            for (int k = 0; k < 5; k++) {
                tsum[k] += (i + j) * sum[k];
                if (k) tsum[k] -= sum[k - 1];
            }
            for (int k = 0; k < 5; k++) sum[k] = tsum[k];
        }
        node ans;
        for (int k = 0; k < 5; k++) ans.sum[k] = sum[k];
        return ans;
    }
    void update(int x, int l, int r, int pos, node K) {
        T[x] = add(T[x], K);
        if (l != r) {
            int mid = (l + r) >> 1;
            if (pos <= mid) update(x << 1, l, mid, pos, K);
            else update(x << 1 | 1, mid + 1, r, pos, K);
        }
    }
    node query(int x, int l, int r, int L, int R) {
        if (L <= l && r <= R) return T[x];
        int mid = (l + r) >> 1;
        node ans;
        memset(ans.sum, 0, sizeof(ans.sum));
        if (L <= mid) ans = add(ans, query(x << 1, l, mid, L, R));
        if (R > mid) ans = add(ans, query(x << 1 | 1, mid + 1, r, L, R));
        return ans;
    }
    void solve() {
        sort(lis.begin(), lis.end());
        // printf("s = %d\n", s);
        if (s == 0) {
            for (qrys e : lis) 
                if (iper[e.X] <= e.pos && e.X <= e.ver) (*e.ans)++;
            return;
        }
        int u = 0;
        while (u < lis.size() && lis[u].pos <= 0) u++;
        for (int pos = 1; pos <= n; pos++) {
            update(1, 1, n, per[pos], calc(per[pos]));
            while (u < lis.size() && lis[u].pos == pos) {
                qrys e = lis[u];
                if (e.X > e.ver) { u++; continue; }
                node qaq = query(1, 1, n, e.X, e.ver);
                lll q = 1, tmp = 0;
                for (int i = 0; i < 5; i++, q *= e.X)
                    tmp += qaq.sum[i] * q;
                // printf("X = %d, ver = %d, pos = %d, tmp = %d -> %d\n", e.X, e.ver, e.pos, (int)(tmp / fac(s - 1)), e.ans - ans_);
                (*e.ans) += tmp / fac(s - 1);
                u++;
            }
        }
    }
} smx[5];

struct SegT {
    int s;
    struct node {
        lll sum;
        int l, r;
        node *lc, *rc;
    } nT[maxn * 20], *rt[maxn]; int idx;
    node *build(int l, int r) {
        node *x = nT + idx++;
        x -> sum = 0, x -> l = l, x -> r = r;
        if (l != r) {
            int mid = (l + r) >> 1;
            x -> lc = build(l, mid);
            x -> rc = build(mid + 1, r);
        }
        return x;
    }
    node *update(node *x0, int pos, lll K) {
        node *x = nT + idx++;
        *x = *x0; x -> sum += K;
        if (x -> l != x -> r) {
            int mid = (x -> l + x -> r) >> 1;
            if (pos <= mid) x -> lc = update(x0 -> lc, pos, K);
            else x -> rc = update(x0 -> rc, pos, K);
        }
        return x;
    }
    void BUILD() {
        if (s != -1) {
            rt[0] = build(1, n);
            for (int i = 1; i <= n; i++) {
                rt[i] = update(rt[i - 1], iper[i], L(s, i));
            }
        }
    }
    int locate(node *x, lll &V) {
        if (x -> l == x -> r) return x -> l;
        int mid = (x -> l + x -> r) >> 1;
        if (V <= x -> lc -> sum) return locate(x -> lc, V);
        else {
            V -= x -> lc -> sum;
            return locate(x -> rc, V);
        }
    }
    int LOCATE(int ver, lll &V, lll *ans, int X) {
        if (s == -1) {
            assert(V == 1);
            // printf("check %d %d\n", ver, X);
            *ans += (X == ver);
            return 0;
        }
        int pos = locate(rt[ver], V);
        smx[s].lis.push_back({ver, pos - 1, X, ans});
        return pos;
    }
} T[6];

lll ans[200005];

void outp(lll x) {
    if (x / 10) outp(x / 10);
    printf("%d", (int)(x % 10));
}

int main() {
    ans_ = ans;
    int s, q;
    init();
    scanf("%d%d%d", &n, &s, &q);
    for (int i = 1; i <= n; i++) scanf("%d", &per[i]), iper[per[i]] = i;
    
    for (int i = 0; i <= 5; i++) {
        T[i].s = i - 1;
        T[i].BUILD();
    }

    for (int i = 1; i <= q; i++) {
        int X, a; lll V; scanf("%d%d", &X, &a); V = a;
        for (int j = s, ver = n; j >= 0; j--)
            ver = per[T[j].LOCATE(ver, V, &ans[i], X)];
    }

    for (int i = 0; i < 5; i++) smx[i].s = i;
    for (int i = 0; i < 5; i++) smx[i].solve();

    for (int i = 1; i <= q; i++) outp(ans[i]), printf("\n");
}