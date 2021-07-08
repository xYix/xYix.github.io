---
title: k 短路及其延伸
---

# 1. k 短路

首先跑出每个点 $u$ 到汇 $T$ 的最短路，记为 $d(u)$。自然也就得出了原图的最短路树。下面所提到的“边”，如果没有特殊说明，都是非树边。

现有一个边**列表** $P$（[某些材料](https://oi-wiki.org/graph/kth-path/#k)中说是边集，这显然是错的，考虑环的情况易见）。自然地，它导出一条唯一的从 $S$ 至 $T$ 的路径。于是自然地，

> **引理 1.**
>
> $P$ 所代表的路径的权值为 $d(S)+\sum_{(u,v,w)\in P}w-d(u)+d(v)$。

那么问题就剩下怎么生成合法的 $P$。这个生成方法必须精心设计，首先它

- 必须能遍历所有合法边列表；
- 而且不会生成非法边列表；
- 而且以权值不降的顺序遍历合法边列表。

注意这组要求看着很自然但其实很强，强到可以直接导出结论：每个 $P$ 被生成的顺序就是它们权值的排序。

显然有下面的观察：

- $P$ 比 $P+\{e\}$ 权值小。
- 如果 $e_1$ 的权值比 $e_2$ 小，则 $P+\{e_1\}$ 比 $P+\{e_2\}$ 小。

可见这个偏序关系把所有的 $P$ 组织成一棵树，我们只需要在这棵树上不停走可扩展的最小节点。

具体维护可以使用可持久化可并堆。维护细节此处不表，因为它不关键。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 5005;
int n, m; double E;

struct edge {
    int u, v; double w;
}; vector<edge> G[maxn], rG[maxn];
int fa[maxn]; double dep[maxn];
bool flg[maxn];

struct leftist;
leftist *merge(leftist *x, leftist *y);

struct leftist {
    vector<edge>::iterator val;
    leftist *c[2];
    int dis;
} *rt[maxn];
int get_dis(leftist *x) {
    return x ? x -> dis : 0;
}
leftist *merge(leftist *x, leftist *y) {
    if (!x) return y; if (!y) return x;
    if (x -> val -> w > y -> val -> w) swap(x, y);
    leftist *nx = new leftist; *nx = *x;
    nx -> c[1] = merge(nx -> c[1], y);
    if (get_dis(nx -> c[0]) < get_dis(nx -> c[1])) swap(nx -> c[0], nx -> c[1]);
    nx -> dis = get_dis(nx -> c[1]) + 1;
    return nx;
}

void get_rt(int x) {
    if (fa[x]) rt[x] = merge(rt[x], rt[fa[x]]);
    for (int y = 1; y <= n; y++) if (fa[y] == x)
        get_rt(y);
}

int ans;

struct node {
    leftist *p; double nowE;
    vector<edge>::iterator e;
    bool operator < (const node b) const { return nowE > b.nowE; }
}; priority_queue<node> Q;

int main() {
    // freopen("C:/Users/x_Yi_x/Documents/1.in", "r", stdin);
    scanf("%d%d%lf", &n, &m, &E);
    while (m--) {
        int u, v; double w; scanf("%d%d%lf", &u, &v, &w);
        if (u != n)
            G[u].push_back((edge){u, v, w}),
            rG[v].push_back((edge){v, u, w});
    }

    for (int i = 0; i <= n; i++) dep[i] = 1e20;
    dep[n] = 0;
    for (int T = 1; T <= n; T++) {
        int u = 0;
        for (int i = 1; i <= n; i++) if (!flg[i] && dep[i] < dep[u]) u = i;
        flg[u] = 1;
        for (edge e : rG[u]) dep[e.v] = min(dep[e.v], dep[u] + e.w);
    }

    for (int i = 1; i <= n; i++)
    for (vector<edge>::iterator e = G[i].begin(); e != G[i].end(); e++)
        if (!fa[i] && dep[e -> v] + e -> w < dep[i] + 1e-10)
            fa[i] = e -> v;
        else {
            e -> w = e -> w - dep[e -> u] + dep[e -> v];
            leftist *p = new leftist;
            *p = (leftist){e, NULL, NULL, 0};
            rt[i] = merge(rt[i], p);
        }
    get_rt(n);

    E -= dep[1]; ans++;
    if (!rt[1]) { printf("1\n"); return 0; }
    Q.push((node){rt[1], dep[1] + rt[1] -> val -> w, rt[1] -> val});
    while (!Q.empty()) {
        node u = Q.top(); Q.pop();
        leftist *p = u.p; double nowE = u.nowE; edge e = *u.e;
        E -= nowE;
        if (E < -1e-10) break;
        ans++;
        if (p -> c[0])
            Q.push((node){p -> c[0], nowE - e.w + p -> c[0] -> val -> w, p -> c[0] -> val});
        if (p -> c[1])
            Q.push((node){p -> c[1], nowE - e.w + p -> c[1] -> val -> w, p -> c[1] -> val});
        if (rt[e.v])
            Q.push((node){rt[e.v], nowE + rt[e.v] -> val -> w, rt[e.v] -> val});
    }

    printf("%d\n", ans);
}
```

# 2. 延伸

这里所说的 k 短路问题的延伸，其实就是延伸算法 1 的思想：构造一棵所有方案构成的树，我们只需要走其中极小极浅的一部分。

> **例题.**
>
> 给定两个长度为 $n$ 的数列 $a,b$。一个 $n$ 阶排列 $p$ 的权值定义为
> $$
> \sum_{i=1}^na_ib_{p_i}
> $$
> 求权值最大的 $k$ 个排列的权值。
>
> $n\le 10^5,k\le 10^5$。

首先我们不妨把 $a,b$ 都排序。

从一个点开始构造它的儿子一般而言是比较困难的，我们考虑怎么构造父亲。父亲的权值必须比原来的点大。当然，最好还有：点和它的父亲总是比较相近。

把一个**下降**（$p_i>p_{i+1}$）用一次交换消掉显然能增大答案。于是，我们不妨把一个点消掉第一个交换得到的排列作为其父亲。不难验证这就构造出了一个合法的树，而且我们很容易就能得到一个排列的儿子们。

不过仍需精细地实现，不然复杂度随时会假……

