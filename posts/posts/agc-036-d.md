---
title: AGC036D 题解 — Negative Cycle
---

> **题目大意.**
>
> [这里](https://www.luogu.com.cn/problem/AT5147)

"没有负环"可联想到**差分约束**模型。一个图没有负环当且仅当对应的差分约束有解。

我们不妨把原问题看成这样：可以自由决定一列 $x_i\ge x_{i+1}$ 的 $x$ 的值，每满足一个形如下式的约束就能获得对应权值，求所能获得的最大权值。

- 对于 $i<j$，$x_i\ge x_j+1$
- 对于 $i<j$，$x_j\ge x_i-1$

自然考虑差分，设 $y_i=x_i-x_{i+1}\ge 0$。约束形如

- $y_i+\ldots+y_{j-1}\ge 1$
- $y_i+\ldots+y_{j-1}\le 1$

$y$ 只能取 $0$ 和 $1$，否则显然不优。于是便有一个基于上一个 $1$ 的位置的简单 DP。

```cpp
#include<bits/stdc++.h>
typedef long long ll;
using namespace std;

const ll inf = 0x3f3f3f3f3f3f3f3fLL;

int n;
ll a[505][505], sa[505][505], ta[505][505];
ll f[505][505];
ll ans = inf;

ll calc(int i, int j, int k) {
    return ta[j + 1][i] + sa[n][j] - sa[n][k] - sa[i][j] + sa[i][k];
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++) if (i != j)
        scanf("%d", &a[i][j]);
    for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        sa[i][j] = sa[i - 1][j] + sa[i][j - 1] - sa[i - 1][j - 1] + a[i][j];
    for (int i = n; i; i--)
    for (int j = i; j <= n; j++)
        ta[i][j] = ta[i + 1][j] + ta[i][j - 1] - ta[i + 1][j - 1] + a[i][j];
    
    for (int i = 1; i < n; i++) {
        f[i][0] = calc(i, 0, 0);
        ans = min(ans, f[i][0] + calc(n, i, 0));
        for (int j = 1; j < i; j++) {
            f[i][j] = inf;
            for (int k = 0; k < j; k++)
                f[i][j] = min(f[i][j], f[j][k] + calc(i, j, k));
            ans = min(ans, f[i][j] + calc(n, i, j));
        }
    }
    printf("%lld\n", ans);
}
```

