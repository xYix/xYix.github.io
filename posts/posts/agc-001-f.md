---
title: AGC001F 题解 - Wide Swap
---

参考资料：[yhx 的博客](https://yhx-12243.github.io/OI-transit/records/ac1984%3Bagc001F.html)

> **题目大意.**
>
> 给定 $K$。现在有一个排列 $p$，你可以进行若干次如下操作
>
> - 选择一对满足 $|i-j|\le K,|p(i)-p(j)|=1$ 的 $i,j$，交换 $p(i)$ 和 $p(j)$。
>
> 你要尽量使得 $p$ 的字典序最小。
>
> $p$ 的阶 $n\le 5\times10^5$。

开门就是一个 key observation：如上操作其实就是在 $p^{-1}$ 上交换两个相邻且值至少相差 $K$ 的元素。不难发现，这个操作方式满足这样的约束

- 两个值差小于 $K$ 的元素，相对顺序不会改变。

于是可以建出一个图 $G$，而所能生成的 $p^{-1}$ 序列就是一个它的拓扑序。

> 提醒：$G$ 的标号等同于 $p^{-1}$ 的值，也即 $p$ 的下标。

> 然而有一个问题：如何在较好的时间复杂度内建出 $G$。
>
> 考虑不断在 $p^{-1}$ 序列新增一个元素 $p^{-1}(*)=v$，由于边有传递性，可以发现只需要和 $(v-K,v)$ 中的最右点和 $(v, v+K)$ 中的最右点连边即可。

但是该条件是否充分呢？

> 显然，我们能把某个元素排到第一位当且仅当它能越过排在它前面的所有点，这和它在 $G$ 中出度为 $0$ 是等价的。
>
> 于是我们删掉这个点，归纳下去即可。

从而它的确是充分的。

于是，任务就变为

> **题目大意(new).**
>
> 给定一个有向图，求它的所有拓扑排序 $p$ 中，$p^{-1}$ 字典序最小者。

----

下面就要来到本题的核心结论了。

> **定理 1.**
>
> 一个 DAG $G$ 的某拓扑序 $p$ 在所有拓扑序中字典序最大，当且仅当它的逆 $p^{-1}$ 在所有拓扑序的逆中字典序最大。

> **证明.**
>
> 设恰好有 $k$ 个元素（不包括 $1$）存在路径到 $1$ 号点。
>
> 考虑 $p^{-1}$，$p^{-1}$ 自然会不择手段地尽量把 $p^{-1}(1)$ 增大，所以 $p^{-1}(1)=n-1-k$。
>
> 再考虑 $1$ 在 $p$ 中出现的位置。如果关注于 $1$，那么不择手段地把 $1$ 往后推永远是优的，所以它后面恰好就是那 $k$ 个元素。至于它身后的元素……等会再说等会再说.jpg
>
> 即，我们证明了，$p$ 和 $p^{-1}$ 在 $1$ 的位置上达成了一致意见。接下来只需删去 $1$ 并归纳。

简记为：
$$
\max p\Leftrightarrow \max p^{-1}
$$
通过重标号还可得到以下结论：
$$
\min p\Leftrightarrow \max\operatorname{rev}(p^{-1})\\
\max \operatorname{rev}p\Leftrightarrow \min p^{-1}\\
\min \operatorname{rev}p\Leftrightarrow \max\operatorname{rev}(p^{-1})
$$
于是就做完了！

下面的代码中没有把图显式建出。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 500005;
int n, k, p[maxn];

struct node {
	int p, v;
	bool operator < (const node b) const { return v < b.v; }
};
node max(const node &a, const node &b) { return a < b ? b : a; }
node val[maxn << 2];
void build(int x, int l, int r) {
	if (l == r) return val[x] = (node){l, p[l]}, void();
	int mid = (l + r) >> 1;
	build(x << 1, l, mid);
	build(x << 1 | 1, mid + 1, r);
	val[x] = max(val[x << 1], val[x << 1 | 1]);
}
void update(int x, int l, int r, int pos) {
	if (l == r) return val[x] = (node){0, 0}, void();
	int mid = (l + r) >> 1;
	if (pos <= mid) update(x << 1, l, mid, pos);
	if (pos > mid) update(x << 1 | 1, mid + 1, r, pos);
	val[x] = max(val[x << 1], val[x << 1 | 1]);
}
node query(int x, int l, int r, int L, int R) {
	if (L <= l && r <= R) return val[x];
	int mid = (l + r) >> 1; node ans = (node){0, 0};
	if (L <= mid) ans = max(ans, query(x << 1, l, mid, L, R));
	if (mid < R) ans = max(ans, query(x << 1 | 1, mid + 1, r, L, R));
	return ans;
}
node QUERY(int L, int R) {
	if (L <= 0) L = 1;
	if (R > n) R = n;
	if (L > R) return (node){0, 0};
	return query(1, 1, n, L, R);
}

bool vis[maxn];
priority_queue<int> qaq;
void check(int u) {
	if (!u) return;
	if (!vis[u] && QUERY(u - k + 1, u + k - 1).p == u)
		qaq.push(u), vis[u] = 1;
}

int ans[maxn];

int main() {
	scanf("%d%d", &n, &k);
	for (int i = 1; i <= n; i++) scanf("%d", &p[i]);
	build(1, 1, n);
	for (int i = 1; i <= n; i++) check(i);
	for (int T = n; T; T--) {
		int u = qaq.top(); qaq.pop();
		ans[u] = T;
		update(1, 1, n, u);
		check(QUERY(u - k + 1, u - 1).p);
		check(QUERY(u + 1, u + k - 1).p);
	}
	for (int i = 1; i <= n; i++) printf("%d\n", ans[i]);
}
```

