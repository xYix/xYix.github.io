---
title: AGC031F 题解 - Walk on Graph
---

> **题目大意.**
>
> 给定一个奇数 $p$。现有一个连通无向图 $G$，每条边有权值。
>
> 定义一次从 $u$ 到 $v$ 的路径的权值为：令你一开始的持有的权值为 $0$，每经过一条边就把你持有的权值翻倍再加上该边的权值。
>
> 现有 $q$ 组询问：是否存在从 $u$ 到 $v$ 的路径，其权值和 $w$ 在模 $p$ 意义下相等。
>
> $|V|,|E|,q\le5\times10^4,p\le 10^6$。

# 记号

- 下面我们用 $(u,w)$ 表示下面这个状态：目前站在 $u$，权值为 $w$。
- "一个状态能走到另一个状态"这个关系记为 $\Rightarrow$。

# 观察 1

考虑反复走同一条边，则权值会依次变为 $w,2w+d,4w+3d,8w+7d,...$，又必然存在 $2^k=1\pmod p$，即走 $k$ 步又会走回 $w$。即使奇偶性有问题，再走 $k$ 步就能调整回来。

上述结论可表述为：如果有 $(u,v,d)$，则 $(u,w)\Leftrightarrow(v,2w+d)$。

# 观察 2.

假设现有节点 $u$，连出了两条边 $a,b$，基于与观察 1 的类似理由有
$$
(u,4w+3a)\Leftrightarrow(u,w)\Leftrightarrow(u,4w+3b)
$$
故
$$
(u,4w+3a)\Leftrightarrow(u,4w+3b)
$$
又 $4$ 必有逆元，故又可总结为
$$
(u,w)\Leftrightarrow (u,w+3(a-b))
$$
这样，对于同一个 $u$，$(u,w)$ 中的 $w$ 被观察 2 划为若干等价类，设 $(u,w)\Leftrightarrow (u,w+l_u)$。

显然，$l_u=\text{gcd}(p,\text{gcd}_{a,b}(3(a-b)))=\text{gcd}(p,3\text{gcd}_{a,b}(a-b))$。

# 观察 3.

若有边 $(u,v,d)$，则由上得
$$
\begin{matrix}(u,w)&\Leftrightarrow&(u,w+l_u)\\\Updownarrow&&\Updownarrow\\(v,2w+d)&\Leftrightarrow&(v,2w+2l_u+d)\end{matrix}
$$
由于 $2$ 必有逆元，即 $(v,w)\Leftrightarrow(v,w+2l_u)$。即 $l_v$ 被更新为 $\gcd(l_v,2l_u)$。

又循环节必定是 $p$ 的约数，即也是奇数，故 $l_v\leftarrow\gcd(l_u,l_v)$。

那么不断更新下去，最终的稳定状态必定满足 $l_v|l_u,l_u|l_v$，又图连通，故最终所有点的 $l$ 总是相等，且等于 $\text{gcd}(p,3\text{gcd}_{u,a,b}(a-b))$，记为 $\text{gcd}(p,3g)$。下面我们不如令 $p\leftarrow \gcd(p,3g)$。

# 观察 4.

显然，所有边在模 $g$ 意义下相同，不妨设为 $b$，故在现在的 $p$ 下最多只有三种边权：$b,g+b,2g+b$。

可以发现，若有边 $(u,v,kg+b)$，则
$$
(u,w-b)\Leftrightarrow(v,2w+kg-b)
$$
即，与 $(u,w-b)$ 等价的皆是形如 $(v,2^\ell+kg-b)$ 的状态。注意到 $p|2g$，$k$ 的有用取值仅有 $0,1,2$；又注意到只要有 $(u,v,kg+b)$ 就有 $(u,w-b)\Leftrightarrow(u,4w+3kg)=(u,4w)$，即 $\ell$ 的有用取值也仅有 $0,1$。这就做完了。

```cpp
#include<bits/stdc++.h>
using namespace std;

struct node {
    node *fa = this;
    node *find() { return this == fa ? this : fa = fa -> find(); }
} A[50005][2][3];
void merge(node *x, node *y) {
    node *fax = x -> find(), *fay = y -> find();
    if (fax == fay) return;
    fax -> fa = fay;
}

struct edge {
    int u, v, c;
} G[50005];

int n, m_, q_, p, g, B;

bool check[2][1000005];

int main() {
    scanf("%d%d%d%d", &n, &m_, &q_, &p); g = p;
    for (int i = 0; i < m_; i++) {
        scanf("%d%d%d", &G[i].u, &G[i].v, &G[i].c);
        g = __gcd(g, abs(G[i].c - G[0].c));
    }
    p = __gcd(3 * g, p);
    B = G[0].c % g;
    for (int i = 0; i < m_; i++) {
        int k = G[i].c / g;
        for (int l = 0; l < 2; l++)
        for (int m = 0; m < 3; m++) {
            merge(A[G[i].u][l] + m, A[G[i].v][l ^ 1] + (2 * m + k) % 3),
            merge(A[G[i].v][l] + m, A[G[i].u][l ^ 1] + (2 * m + k) % 3);
            // printf("merge %d %d\n", l, m);
        }
    }
    for (int i = 0, pB = B; i < p; i++, pB = (pB + pB) % p)
        check[i & 1][pB] = 1;
    while (q_--) {
        int u, v, w; scanf("%d%d%d", &u, &v, &w);
        for (int l = 0; l < 2; l++)
        for (int m = 0; m < 3; m++)
            if (check[l][((3 - m) * g + w + B) % p])
            if (A[v][0][0].find() == A[u][l][m].find())
                goto qaq;
        printf("NO\n");
        continue;
        qaq: printf("YES\n");
    }
}
```

