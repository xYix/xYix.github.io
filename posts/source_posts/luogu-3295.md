---
title: luoguP3295 题解 - [SCOI2016]萌萌哒
---

> **题目大意.**
>
> 有一列 $n$ 个数，有以下形式的 $m$ 个限制条件：$a_{l_1}=a_{l_2},a_{l1+1}=a_{l_2+1},...,a_{r_1}=a_{r_2}$。求连通块数。
>
> $n,m\le 10^5$。

思路是**倍增并查集**。具体来说，第 $i$ 个并查集中有 $x=y$ 意味着原图中有 $[x,x+2^i),[y,y+2^i)$ 全部两两等价。当合并 $(i,x),(i,y)$ 时我们暴力递归 $(i-1,x),(i-1,y)$ 和 $(i-1,x+2^{i-1}),(i-1,y+2^{i-1})$。可见无效访问只有有效访问（的确连了边的访问）的常数倍，从而复杂度是对的。

```cpp
#include<bits/stdc++.h>
using namespace std;

int N, M;
int fa[20][100005];
int find_fa(int k, int x) { return fa[k][x] == x ? x : fa[k][x] = find_fa(k, fa[k][x]); }
void Merge(int k, int x, int y) {
	int fx = find_fa(k, x), fy = find_fa(k, y);
	if(fx == fy) return;
	fa[k][fx] = fy;
	if(k != 0) k--, Merge(k, x, y), Merge(k, x + (1 << k), y + (1 << k));
}

int main() {
	scanf("%d%d", &N, &M);
	for(int k = 0; k < 20; k++)
	for(int i = 1; i <= N; i++)
		fa[k][i] = i;
	while(M--) {
		int l1, r1, l2, r2; scanf("%d%d%d%d", &l1, &r1, &l2, &r2);
		int len = r1 - l1 + 1, px = l1, py = l2;
		for(int k = 19; k >= 0; k--) if((len >> k) & 1)
			Merge(k, px, py), px += 1 << k, py += 1 << k;
	}
	int cnt = -1;
	for(int i = 1; i <= N; i++) if(fa[0][i] == i) cnt++;
	int ans = 9;
	while(cnt) ans = 10LL * ans % 1000000007, cnt--;
	printf("%d\n", ans);
}
```

