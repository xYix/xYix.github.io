---
title: luoguP4775 题解 - 【NOI2018】情报中心
---

> 这个样例，无疑是善良的出题人无私的馈赠。大量精心构造的 $n\le 100, m\le 200$ 的测试数据，涵盖了测试点中所有出现性质的组合。你可以利用这个测试点，对自己的程序进行全面的检查。足量的数据组数、不大的数据范围和多种多样的数据类型，能让程序中的错误无处遁形。出题人相信，这个美妙的样例，可以给拼搏于 AC 这道题的逐梦之路上的你，提供一个有力的援助。

2018 真是毒瘤的一年……

> **题目大意.**
>
> 给出一棵带边权树 $T$ 和 $m$ 条链，每条链有一个非正权值。
>
> 你要选出两条有交的链，使得：这两条链本身的权值加至少被其中一条链覆盖的边权之和最大。
>
> $|T|\le 5\times10^4,m\le 10^5$。多测，$\sum |T|\le 10^6,\sum m\le 2\times 10^6$。

根据部分分的提示，分讨两种情况：两条链的最高点相同和不同。

下面记：不考虑有交时单独一条链 $i$ 的贡献为 $w_i$，最高点为 $p_i$。

# 1. LCA 不同

下面是最典型的情况：

<div style="width:40%;margin:auto"><img src="https://xyix.github.io/images/luogu-4775-1.png" alt=""></div>

可见，$X$ 点是最关键的点。下面写出一些事实：

- 这种方案的贡献为 ${\color{red}w}+{\color{blue}w}-{\color{grey}\text{dep}(X)}+\max({\color{red}\text{dep}(p)},{\color{blue}\text{dep}(p)})$。
- 这种方案实际存在，当且仅当
- $\color{red}p$ 不在 $X$ 的子树（不包括 $X$）中；$\color{blue}p$ 亦然。
- - 换句话说，$\color{red}u,v$ 不在 $X$ 的同一个分支中；$\color{blue}u,v$ 亦然。
- $\color{red}u$ 不和 $\color{blue}u$ 在 $X$ 的同一个分支中。

自然能有一个合并子树的大致想法。可是怎么合并？自然会往分治上去想，其实再冷静一下就能想到**线段树合并**。剩下的工作已经显然了。

# 2. LCA 相同

当然我们要枚举 LCA。易见每个 LCA 对应的链是有限的，自然考虑到虚树。

<div style="width:40%;margin:auto"><img src="https://xyix.github.io/images/luogu-4775-2.png" alt=""></div>

我们不可能枚举两个 $X$，但是枚举一个 $X$ 也能完成任务，具体来说：

- 这种方案的贡献为 ${\color{red}w}+{\color{blue}w}-{\color{grey}\text{dep}(X)}-\text{dep}(\text{LCA}({\color{red}v},{\color{blue}v}))+{\color{grey}2\text{dep}(\text{LCA})}$。
- - [众所周知](https://www.luogu.com.cn/problem/P4220)，如果你在树论题中见到了 $-\text{dep}(\text{LCA}({\color{red}v},{\color{blue}v}))$，一定要记得把它转化为**最远点对**。
  - 具体来说，在 $\color{blue}v$ 下面挂一个 ${\color{blue}(v,v')}=2{\color{blue}w}-{\color{blue}\text{dep}(v)}$ 即可。不过实际上就没必要把它建出来了。
- 剩下只要考虑两个 $u$ 分别在 $x$ 的两个分支，强行合并即可。

# 3. 瑇🐎实现

> 那东西构造上庞大无比，拓扑上则毁脑灭心。它来自的空间里，理念的存在完全超越于人类尺度。它的错乱还有自洽的邪恶是如此艰深，光是理解都会伤人。

还多测就离谱

管它常数大不大，反正爷过了！

```cpp
#include<bits/stdc++.h>
typedef long long ll;
using namespace std;

const int maxn = 50005, maxm = 100005;
const ll inf = 0x3f3f3f3f3f3f3f3fLL;
void maxeq(int &x, int y) { x = max(x, y); }
void maxeq(ll &x, ll y) { x = max(x, y); }

int T;
int n, m;

struct edge {
    int u, v; ll w;
};
vector<edge> G[maxn];
vector<edge> Q;

namespace TREE {
    int dep_[maxn], dfn[maxn], nfd[maxn], idx;
    ll dep[maxn];
    int FA[maxn][16];
    void dfs(int x, int f) {
        dfn[x] = ++idx;
        FA[x][0] = f; dep_[x] = dep_[f] + 1;
        for (int i = 1; i < 16; i++)
            FA[x][i] = FA[FA[x][i - 1]][i - 1];
        for (edge e : G[x]) if (e.v != f)
            dep[e.v] = dep[x] + e.w, dfs(e.v, x);
        nfd[x] = idx;
    }
    int LCA(int u, int v) {
        if (dep_[u] < dep_[v]) swap(u, v);
        for (int i = 15; i >= 0; i--)
            if (dep_[FA[u][i]] >= dep_[v]) u = FA[u][i];
        if (u == v) return u;
        for (int i = 15; i >= 0; i--)
            if (FA[u][i] != FA[v][i]) u = FA[u][i], v = FA[v][i];
        return FA[u][0];
    }
    ll dis(int u, int v, int lca = -1) {
        if (lca == -1) lca = LCA(u, v);
        return dep[u] + dep[v] - 2 * dep[lca];
    }
    void init() {
        dfs(1, 0);
    }
}

using TREE::dep; using TREE::LCA; using TREE::dis; using TREE::dfn; using TREE::nfd;

namespace DIFF { //DIFFerent LCA
    namespace segT {
        struct node {
            ll w1, w2;
            node *lc, *rc;
            void pushup() {
                w1 = max(lc ? lc -> w1 : -inf, rc ? rc -> w1 : -inf);
                w2 = max(lc ? lc -> w2 : -inf, rc ? rc -> w2 : -inf);
            }
        } T[maxn * 40]; int idx;
        ll ans;
        void merge(node *&u, node *v, int l, int r) {
            if (!u) { u = v; return; }
            if (!v) return;
            if (l == r) {
                maxeq(u -> w1, v -> w1);
                maxeq(u -> w2, v -> w2);
                return;
            }
            if (u -> lc && v -> rc)
                maxeq(ans, u -> lc -> w1 + v -> rc -> w2);
            if (u -> rc && v -> lc)
                maxeq(ans, u -> rc -> w2 + v -> lc -> w1);
            int mid = (l + r) >> 1;
            merge(u -> lc, v -> lc, l, mid);
            merge(u -> rc, v -> rc, mid + 1 , r);
            u -> pushup();
        }
        void update(node *&u, int l, int r, int pos, ll w1, ll w2) {
            if (!u) {
                u = T + idx++;
                u -> w1 = u -> w2 = -inf;
                u -> lc = u -> rc = NULL;
            }
            if (l == r) {
                maxeq(u -> w1, w1);
                maxeq(u -> w2, w2);
                return;
            }
            int mid = (l + r) >> 1;
            if (pos <= mid) update(u -> lc, l, mid, pos, w1, w2);
            else update(u -> rc, mid + 1, r, pos, w1, w2);
            if (u -> lc && u -> rc)
                maxeq(ans, u -> lc -> w1 + u -> rc -> w2);
            u -> pushup();
        }
        void erase(node *&u, int l, int r, int pos) {
            if (!u) {
                u = T + idx++;
                u -> w1 = u -> w2 = -inf;
                u -> lc = u -> rc = NULL;
            }
            if (l == r) {
                u -> w1 = u -> w2 = -inf;
                return;
            }
            int mid = (l + r) >> 1;
            if (pos <= mid) erase(u -> lc, l, mid, pos);
            else erase(u -> rc, mid + 1, r, pos);
            u -> pushup();
        }
    }
    segT::node *rt[maxn];
    ll ANS;
    void dfs(int x, int f) {
        for (edge e : G[x]) if (e.v != f) {
            dfs(e.v, x);
            segT::ans = -inf;
            segT::merge(rt[x], rt[e.v], 1, n);
            maxeq(ANS, segT::ans - dep[x]);
        }
        if (f) segT::erase(rt[x], 1, n, f);
    }
    ll solve() {
        ANS = -inf;
        for (edge e : Q) {
            int lca = LCA(e.u, e.v);
            // printf("DIFF : considering %d %d %lld : %d\n", e.u, e.v, e.w, lca);
            ll W = dis(e.u, e.v, lca) - e.w;
            if (e.u != lca) { //insert u
                segT::ans = -inf;
                segT::update(rt[e.u], 1, n, lca, W, W + dep[lca]);
                maxeq(ANS, segT::ans - dep[e.u]);
            }
            if (e.v != lca) { //insert v
                segT::ans = -inf;
                segT::update(rt[e.v], 1, n, lca, W, W + dep[lca]);
                maxeq(ANS, segT::ans - dep[e.v]);
            }
        }
        // printf("DIFF : init succeed. ANS = %lld\n", ANS);
        dfs(1, 0);
        segT::idx = 0;
        for (int i = 1; i <= n; i++) rt[i] = NULL;
        return ANS;
    }
}

namespace SAME { //SAME LCA
    vector<edge> Qlis[maxn];

    bool inT[maxn];
    vector<int> lis;
    vector<edge> Qpos[maxn];
    bool cmp(int u, int v) {
        return dfn[u] < dfn[v];
    }
    void insert(int x) {
        if (!inT[x]) lis.push_back(x), inT[x] = 1;
    }

    struct node {
        int p[2];
        ll w[2];
        ll calc() const {
            if (p[0] == -1 && p[1] == -1) return -inf - 1;
            if (p[0] == -1 || p[1] == -1) return -inf;
            return w[0] + w[1] - dep[LCA(p[0], p[1])];
        }
    } A[maxn];
    ll ans;
    node operator + (const node a, const node b) {
        ans = -inf;
        node c, tmp; c.p[0] = c.p[1] = -1;
        for (int i = 0; i < 2; i++)
        for (int j = 0; j < 2; j++)
            if ((tmp = (node){a.p[i], b.p[j], a.w[i], b.w[j]}).calc() > ans)
                ans = (c = tmp).calc();
        if (a.calc() > c.calc()) c = a;
        if (b.calc() > c.calc()) c = b;
        return c;
    }
    ll calc(int rt) {
        // printf("SAME : calcing %d\n", rt);
        for (edge e : Qlis[rt])
            insert(e.u), insert(e.v),
            Qpos[e.u].push_back(e), Qpos[e.v].push_back((edge){e.v, e.u, e.w});
        sort(lis.begin(), lis.end(), cmp);
        int tlen = lis.size();
        for (int i = 1; i < tlen; i++) insert(LCA(lis[i - 1], lis[i]));
        sort(lis.begin(), lis.end(), cmp);
        // printf("SAME : imagT = "); for (int i : lis) printf("%d ", i); printf("\n");

        ll ANS = -inf;
        vector<int> stk;
        for (int u : lis) {
            // printf("vis %d\n", u);
            while (stk.size() > 1 && dfn[u] > nfd[stk.back()]) {
                int v = stk.back(), fv = stk[stk.size() - 2];
                //merge
                A[fv] = A[fv] + A[v];
                // printf("merge %d -> %d : %d : %d %d %d %d\n", v, fv, ans - dep[fv], A[fv].p[0], A[fv].p[1], A[fv].w[0], A[fv].w[1]);
                // if (v == 8 && fv == 7) printf("qaq %lld\n", ans - dep[fv]);
                if (fv != rt) maxeq(ANS, ans - dep[fv]);
                stk.pop_back();
            }
            stk.push_back(u);
            //new
            A[u] = (node){-1, -1, -inf, -inf};
            if (u != rt) {
                for (edge e : Qpos[u]) {
                    A[u] = A[u] + (node){e.v, -1, dis(e.u, e.v) - e.w, -inf};
                    maxeq(ANS, ans - dep[u]);
                }
            }
        }
        while (stk.size() > 1) {
            int v = stk.back(), fv = stk[stk.size() - 2];
            //merge
            A[fv] = A[fv] + A[v];
            // printf("merge %d -> %d : %d : %d %d %d %d\n", v, fv, ans - dep[fv], A[fv].p[0], A[fv].p[1], A[fv].w[0], A[fv].w[1]);
            // if (v == 8 && fv == 7) printf("qaq %lld\n", ans - dep[fv]);
            if (fv != rt) maxeq(ANS, ans - dep[fv]);
            stk.pop_back();
        }
        stk.clear();

        for (int i : lis) inT[i] = 0, Qpos[i].clear();
        lis.clear();
        if (ANS == -inf) return ANS;
        return ANS + dep[rt] + dep[rt];
    }
    ll solve() {
        for (edge e : Q) Qlis[LCA(e.u, e.v)].push_back(e);
        ll ANS = -inf;
        for (int i = 1; i <= n; i++) ANS = max(ANS, calc(i));

        for (int i = 1; i <= n; i++) Qlis[i].clear();
        return ANS;
    }
}

void solve() {
    scanf("%d", &n);
    for (int i = 1; i < n; i++) {
        int u, v; ll w; scanf("%d%d%lld", &u, &v, &w);
        G[u].push_back((edge){u, v, w});
        G[v].push_back((edge){v, u, w});
    }
    TREE::init();
    scanf("%d", &m);
    for (int i = 1; i <= m; i++) {
        int u, v; ll w; scanf("%d%d%lld", &u, &v, &w);
        Q.push_back((edge){u, v, w});
    }
    ll ANS_DIFF = DIFF::solve();
    // printf("DIFF = %lld\n", ANS_DIFF);
    ll ANS_SAME = SAME::solve();
    // printf("SAME = %lld\n", ANS_SAME);

    ll ANS = max(ANS_DIFF, ANS_SAME);
    if (ANS <= -(inf / 2)) printf("F\n");
    else printf("%lld\n", ANS);

    for (int i = 1; i <= n; i++) G[i].clear();
    Q.clear();
}

int main() {
    freopen("center.in", "r", stdin);
    freopen("center.out", "w", stdout);
    scanf("%d", &T);
    while (T--) {
        solve();
    }
}
```

