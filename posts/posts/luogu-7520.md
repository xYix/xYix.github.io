---
title: luoguP7520 题解 - 【省选联考 2020】支配
---

> **题目大意.**
>
> 给出一个有向图 $G$。如果从 $1$ 出发到 $v$ 的任何路径都会经过 $u$，则称 $u$ **支配** $v$。所有支配点 $v$ 的点构成**受支配集** $D_v$。
>
> 现有 $q$ 次询问，形如：若加上边 $(u,v)$，会有多少个点的受支配集发生变动。
>
> $|V|\le 3\times10^3,|E|\le 2|V|,q\le 2\times10^4$。

**观察 1.** 显然支配具有传递性，且两个点不可能同时支配某点却不互相支配，故支配关系形成了一个树形结构，是为**支配树**。

在本题中由于数据范围较小，我们可以通过一个简单的方式求出支配树：从图中抠掉点 $u$ 然后从 $1$ 开始跑一遍，到不了的就是 $u$ 在支配树上的子树。

**观察 2.** 加入一条边 $(u,v)$ 会让 $v$ 的父亲变为 $u,v$ 的 LCA。

但是 $v$ 的 LCA 一旦变动又会导致原先的所有 $(v,w)$ 产生类似效应并传播出去，若直接模拟复杂度肯定很差。

**观察 3.** 一个点的受支配集就是其祖先。若要使 $u$ 的受支配集变动，必定是其祖先中至少有一个的父亲变为了更早的祖先。于是我们可以考虑搞出所有父亲变动的点，所欲求即为它们的子树并。

**观察 4.** 一个点 $w$ 的父亲变动，其实就是其父亲不能再支配它。即：如果从图中扣掉 $\text{fa}(w)$，$1$ 仍能走到它。而且这条路径显然必定利用了新加的 $(u,v)$。那么就相当于问

- $1$ 到 $u$ 是否有不经过 $\text{fa}(w)$ 的路径？这个问题的答案是显然的。
- $v$ 到 $w$ 是否有不经过 $\text{fa}(w)$ 的路径？这东西可以预处理。抠掉 $\text{fa}(w)$ 从 $w$ 跑一遍即可。

于是就做完了。

```cpp
#include<bits/stdc++.h>
typedef long long ll;
using namespace std;

const int maxn = 3005;
int n, m, q;
vector<int> G[maxn], rG[maxn];
vector<int> H[maxn];
int fa[maxn];
bool des[maxn][maxn]; int siz[maxn];
bool anc[maxn][maxn];

int rt;
void dfs_(int x, bool flg[]) {
    flg[x] = 1;
    for (int y : G[x]) if (y != rt && !flg[y])
        dfs_(y, flg);
}
void solve(int S, bool flg[]) {
    memset(flg, 0, maxn << 2);
    dfs_(S, flg);
}

bool ans[maxn][maxn];
void rdfs_(int x, bool flg[]) {
    flg[x] = 1;
    for (int y : rG[x]) if (y != rt && !flg[y])
        rdfs_(y, flg);
}
void rsolve(int S, bool flg[]) {
    memset(flg, 0, maxn << 2);
    rdfs_(S, flg);
}

int dfn[maxn], idx;
void get_dfn(int x) {
    dfn[++idx] = x;
    for (int y = 1; y <= n; y++) if (fa[y] == x) get_dfn(y);
}

bool ANS1[maxn], ANS2[maxn];

int main() {
    scanf("%d%d%d", &n, &m, &q);
    while (m--) {
        int u, v; scanf("%d%d", &u, &v);
        G[u].push_back(v), rG[v].push_back(u);
    }
    for (int u = 1; u <= n; u++) {
        rt = u; if (u != 1) solve(1, des[u]);
        for (int v = 1; v <= n; v++) 
            des[u][v] ^= 1, siz[u] += des[u][v];
        for (int v = 1; v <= n; v++) if (des[u][v]) {
            // printf("%d -> %d\n", u, v);
            anc[v][u] = 1; H[u].push_back(v);
            if (u != v && (fa[v] == 0 || siz[u] < siz[fa[v]])) fa[v] = u;
        }
    }
    for (int u = 2; u <= n; u++) {
        // printf("fa %d = %d\n", u, fa[u]);
        rt = fa[u]; rsolve(u, ans[u]);
    }
    get_dfn(1);
    
    while (q--) {
        memset(ANS1, 0, sizeof(ANS1));
        int qu, qv; scanf("%d%d", &qu, &qv);
        for (int i = 2; i <= n; i++)
            if (!anc[qu][fa[i]] && ans[i][qv]) ANS1[i] = 1;
        memset(ANS2, 0, sizeof(ANS2));
        int ANS = 0;
        for (int i = 1; i <= n; i++) {
            int u = dfn[i];
            if (ANS1[u] && !ANS2[u]) {
                ANS += siz[u];
                for (int v : H[u]) ANS2[v] = 1;
            }
        }
        printf("%lld\n", ANS);
    }
}
```

