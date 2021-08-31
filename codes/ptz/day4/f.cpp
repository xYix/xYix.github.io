#include<bits/stdc++.h>
using namespace std;

int n;
int a[200005];

int sum[200005 << 2];
int lzyp[200005 << 2], lzym[200005 << 2];
void add(int x, int K) {
    sum[x] += K;
    if (lzym[x] == -1)
        lzyp[x] += K;
    else lzym[x] += K;
}
void mmax(int x, int K) {
    sum[x] = K;
    lzyp[x] = 0; lzym[x] = max(lzym[x], K);
}
void pushdown(int x) {
    if (lzym[x] != -1)
        mmax(x << 1, lzym[x]), mmax(x << 1 | 1, lzym[x]),
        lzym[x] = -1;
    if (lzyp[x] != 0)
        add(x << 1, lzyp[x]), add(x << 1 | 1, lzyp[x]),
        lzyp[x] = 0;
}
void build(int x, int l, int r) {
    lzym[x] = -1;
    if (l == r) sum[x] = a[l];
    else {
        int mid = (l + r) >> 1;
        build(x << 1, l, mid);
        build(x << 1 | 1, mid + 1, r);
        sum[x] = max(sum[x << 1], sum[x << 1 | 1]);
    }
}
void update_a(int x, int l, int r, int L, int R) {
    if (L <= l && r <= R)
        return add(x, 1);
    pushdown(x);
    int mid = (l + r) >> 1;
    if (L <= mid) update_a(x << 1, l, mid, L, R);
    if (R > mid) update_a(x << 1 | 1, mid + 1, r, L, R);
    sum[x] = max(sum[x << 1], sum[x << 1 | 1]);
}
void update_m(int x, int l, int r, int L, int R, int K) {
    if (L <= l && r <= R && K >= sum[x])
        return mmax(x, K);
    if (l == r) {
        sum[x] = max(sum[x], K);
        return;
    }
    pushdown(x);
    int mid = (l + r) >> 1;
    if (L <= mid) update_m(x << 1, l, mid, L, R, K);
    if (R > mid) update_m(x << 1 | 1, mid + 1, r, L, R, K);
    sum[x] = max(sum[x << 1], sum[x << 1 | 1]);
}
int query(int x, int l, int r, int L, int R) {
    if (L <= l && r <= R)
        return sum[x];
    pushdown(x);
    int mid = (l + r) >> 1, ans = -1;
    if (L <= mid) ans = max(ans, query(x << 1, l, mid, L, R));
    if (R > mid) ans = max(ans, query(x << 1 | 1, mid + 1, r, L, R));
    return ans;
}

int main() {
    int m;
    scanf("%d%d", &n, &m);
    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);
    build(1, 1, n);
    while (m--) {
        int L, R; scanf("%d%d", &L, &R);
        int x = query(1, 1, n, L, R);
        update_a(1, 1, n, L, R);
        update_m(1, 1, n, L, R, x);
        // for (int i = 1; i <= n; i++) printf("%d ", query(1, 1, n, i, i)); printf("\n");
    }
    for (int i = 1; i <= n; i++) printf("%d ", query(1, 1, n, i, i));
}