---
title: luoguP3565 题解 - [POI2014]HOT-Hotels
---

发现自己好像不会长链剖分。

>**题目大意.** 给定一棵树，求两两距离相等的三元组数。$n\le 5\text{e}6$。

首先有一个思博 DP
$$
f_{i,j}:=\sum_{u\in T_i}[d(u_,i)=j]\\
g_{i,j}:=\sum_{u_1,u_2\in T_i}[d(u_1,\operatorname{lca}(u_1,u_2))-d(\text{lca}(u_1,u_2),i)=j]\\
f_{i,j}=[j=0]+\sum_{u\in\text{son}_i}f_{u,j-1}\\
g_{i,j}=\sum_{u\in\text{son}_i}g_{u,j+1}+\frac 12f_{i,j}^2-\frac12\sum_{u\in\text{son}_i}f_{u,j-1}^2\\
\text{ans}\leftarrow\text{ans}+g_{i,0}+\sum_{j;u\in\text{son}_i}g_{i,j}f_{u,j-1}
$$
其中 $T_i$ 是 $i$ 的子树。

运用 dsu on tree 的思想，我们每次直接继承一个儿子（为了防止复制我们直接移动指针），其他儿子暴力转移。对于其他儿子，我们是要 for 一遍它的“高度”的，**这等于最长链的链长**。于是我们继承长儿子，此时每条链会恰好被 for 一次，于是复杂度就变成了 $\Theta(n)$。

我们再和 dsu on tree 对比一下，此处要 for 一遍高度所以使用长剖，如果 for 一遍整个子树则应当使用重剖。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN = 5000005;
int N;
vector<int> G[maxN];
int dep[maxN], Mdis[maxN], son[maxN];
void dfs1(int x, int fa) {
	dep[x] = dep[fa] + 1;
	for (int y : G[x]) if(y != fa) {
		dfs1(y, x);
		if(Mdis[y] > Mdis[son[x]]) son[x] = y;
	}
	Mdis[x] = Mdis[son[x]] + 1;
}

ll *f[maxN], *g[maxN], f__[maxN << 2], *f_ = f__, ans;
void Solve(int x, int fa) {
	if (son[x]) f[son[x]] = f[x] + 1, g[son[x]] = g[x] - 1, Solve(son[x], x);
	f[x][0] = 1, ans += g[x][0];
	for (int y : G[x]) if(y != fa && y != son[x]) {
		f[y] = f_, f_ += (Mdis[y] + 1) << 1; g[y] = f_, f_ += (Mdis[y] + 1) << 1;
		Solve(y, x);
		for(int i = 0; i <= Mdis[y]; i++) {
			if(i) ans += f[x][i - 1] * g[y][i];
			ans += g[x][i + 1] * f[y][i];
		}
		for(int i = 0; i <= Mdis[y]; i++) {
			if(i) g[x][i - 1] += g[y][i];
			g[x][i + 1] += f[x][i + 1] * f[y][i];
			f[x][i + 1] += f[y][i];
		}
	}
}

int main() {
	scanf("%d", &N);
	for(int i = 1; i < N; i++) {
		int u, v; scanf("%d%d", &u, &v);
		G[u].push_back(v); G[v].push_back(u);
	}
	Mdis[0] = -1; dfs1(1, 0);
	f[1] = f_, f_ += (Mdis[1] + 1) << 1; g[1] = f_, f_ += (Mdis[1] + 1) << 1;
	Solve(1, 0);
	printf("%lld\n", ans);
}
```

