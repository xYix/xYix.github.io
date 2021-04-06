---
title: luoguP5287 题解 - 【HNOI2019】JOJO
---

> **题目大意.**
>
> 现有一个初始为空的串，你要支持
>
> - 加入 $x$ 个相同字符 $c$，保证 $c$ 不是此时的串尾字符；
> - 回复到某操作后的版本。
>
> 每次操作后你要输出：每一个前缀的最长 border 的长度之和。
>
> $n\le 10^5,x\le 10^4$。$|\Sigma|=26$。

离线+可持久化，自然考虑操作树。下面先考虑在链上的情况。

"保证该字符不是串尾字符"就很诡异，实际上它告诉你：你可以不用真的加 $x$ 个 $c$，而是把字符集看成二元组 $(c,x)$，而 $s\left[l_1:r_1\right]$ 能匹配上 $s\left[l_2:r_2\right]$ 实际上就是说：

- $\forall 0\le b\le r_1-l_1+1,c(l_1+b)=c(l_2+b)$；
- $\forall 1\le b\le r_1-l_1, x(l_1+b)=x(l_2+b)$；
- $x(l_1)\le x(l_2)$；
- $x(r_1)\ge x(r_2)$。

虽然比较怪但其实和正常 kmp 一样爆跳 nxt 就行了，毕竟本质上还是在模拟正常的 kmp 过程。

那么下面考虑上树。显然刚才的复杂度是均摊的，不能接受。不如考虑预处理"此时如果插入 $(x,c)$会发生什么事情"（被称为 **KMP 自动机**），你会发现这玩意可以从 nxt 那里继承，于是就做完了。

这题真是绝了，pushdown 不复制节点能拿 70……

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 100005, maxsig = 10005 * 26, p = 998244353;
void check(int &x) { if (x >= p) x -= p; }

int n;
int msk[maxn];
vector<int> G[maxn]; int opx[maxn], opc[maxn];

struct node;
node *copynode(node *x);

struct node {
    node *lc, *rc;
    int l, r;
    int sum, lzy, nxt;
    void pushup() {
        check(sum = lc -> sum + rc -> sum);
    }
    void cov(int v) {
        sum = 1LL * v * (r - l + 1) % p;
        lzy = v;
    }
    void pushdown() {
        if (lzy == -1) return;
        lc = copynode(lc); lc -> cov(lzy);
        rc = copynode(rc); rc -> cov(lzy);
        lzy = -1;
    }
} T[maxsig * 40]; int idx;
node *rt[maxn][26]; int maxlen[maxn][26];

node *copynode(node *x) {
    T[++idx] = *x;
    return T + idx;
}
void build(node *&x, int l, int r) {
    x = T + ++idx;
    *x = (node){NULL, NULL, l, r, 0, -1, 0};
    if (l != r) {
        int mid = (l + r) >> 1;
        build(x -> lc, l, mid);
        build(x -> rc, mid + 1, r);
    }
}
void update(node *&x, int pos, int v, int nxt) {
    assert(x);
    x = copynode(x);
    if (x -> r < pos) return x -> cov(v);
    if (x -> l == x -> r) return x -> nxt = nxt, x -> cov(v);
    x -> pushdown();
    update(x -> lc, pos, v, nxt);
    if (pos >= x -> rc -> l) update(x -> rc, pos, v, nxt);
    x -> pushup();
}
void merge(pair<int, int> &u, pair<int, int> v) {
    check(u.first += v.first); u.second = max(u.second, v.second);
}
pair<int, int> query(node *x, int pos) {
    assert(x);
    if (x -> r < pos) return make_pair(x -> sum, -1);
    if (x -> l == x -> r) return make_pair(x -> sum, x -> nxt);
    x -> pushdown();
    pair<int, int> ans = make_pair(0, -1);
    merge(ans, query(x -> lc, pos));
    if (pos >= x -> rc -> l) merge(ans, query(x -> rc, pos));
    return ans;
}

int calc(int l) { return 1LL * l * (l + 1) / 2 % p; }

int ans[maxn];
int suc[maxn];
int RT;
void solve(int u, int slen) {
    int x = opx[u], c = opc[u], nxt = 0;
    if (u == RT) ans[u] = calc(x - 1);
    else {
        check(ans[u] += calc(min(maxlen[u][c], x)));
        pair<int, int> qaq = query(rt[u][c], x);
        check(ans[u] += qaq.first);
        nxt = qaq.second;
        // printf("nxt %d = %d %d\n", u, nxt, qaq.first);
        if (!nxt && opc[RT] == c && opx[RT] < x)
            nxt = RT,
            ans[u] = (ans[u] + 1LL * opx[RT] * max(0, x - maxlen[u][c])) % p;
    }
    maxlen[u][c] = max(maxlen[u][c], x);
    update(rt[u][c], x, slen, u);
    slen += x;
    // cerr << u << " solved " << idx << "\n";
    for (int v : G[u]) {
        suc[u] = v;
        memcpy(rt[v], rt[suc[nxt]], sizeof(rt[0]));
        memcpy(maxlen[v], maxlen[suc[nxt]], sizeof(maxlen[0]));
        ans[v] = ans[u];
        solve(v, slen);
    }
}

int main() {
    // freopen("C:/Users/x_Yi_x/Downloads/P5287_6.in", "r", stdin);
    // freopen("C:/Users/x_Yi_x/Downloads/qaq.out", "w", stdout);
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        int opt; scanf("%d", &opt);
        if (opt == 1) {
            msk[i] = i;
            char qaq;
            scanf("%d %c", &opx[i], &qaq);
            assert(qaq >= 'a' && qaq <= 'z');
            opc[i] = qaq - 'a';
            G[msk[i - 1]].push_back(i);
        }
        else {
            int ver; scanf("%d", &ver);
            msk[i] = msk[ver];
        }
    }
    for (int c = 0; c < 26; c++) build(rt[0][c], 1, 10000);
    for (int i : G[0]) {
        RT = i;
        suc[0] = i;
        memcpy(rt[i], rt[0], sizeof(rt[0]));
        solve(i, 0);
    }
    for (int i = 1; i <= n; i++) printf("%d\n", ans[msk[i]]);
}
```



