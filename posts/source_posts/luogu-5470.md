---
title: luoguP5470 题解 - [NOI2019] 序列
---

> **题目大意.**
>
> 给定两个长为 $n$ 的正整数序列 $a_i,b_i$，你要在每个序列中恰好选定 $K$ 的下标，要求至少有 $L$ 个下标在两个序列中都被指定。你要使得这 $2K$ 个下标对应的元素之和尽量大。
>
> 多测，$n\le 2\times 10^5,\sum n\le 10^6$。

首先建出网络流模型。

- $S\rightarrow u_i:(1,-a_i)$；
- $u_i\rightarrow v_i:(1,0)$，表示相同的下标；
- $v_i\rightarrow T:(1,-b_i)$；
- $u_i\rightarrow X:(1,0),X\rightarrow Y:(K-L,0),Y\rightarrow v_j:(1,0)$，有 $K-L$ 次不相同的机会。

显然直接跑费用流跑不过，但我们可以考虑“手动加速”，即手动模拟求解费用流的过程，在其中用一些数据结构之类的来加速。这就是所谓**模拟费用流**。

于是我们考虑每次使流量 +1。

注意到费用流每次挑的是**任意**的最短路，那么毫无疑问，如果 $XY$ 没有满流则必然先流 $XY$。否则有两个选择：

- 流正常的 $u_i\rightarrow v_i$。
- 退流。考虑某个已通过 $XY$ 流过的 $v_i$ 和一个没被流过的 $v_j$，我们走路径 $S\rightarrow u_i\rightarrow v_i\ {\color{red}\rightarrow}\ Y \rightarrow v_j\rightarrow T$。另一个方向亦然。显然 $i,j$ 的选择是独立的。这个操作的意义非常直接，就不解释了。
- - 如果你操作完发现 $u_j$ 也早就选了，那么你获得一个隐藏操作：退掉 $XY$ 上的一个流量走正常的 $u_j\rightarrow v_j$ 路径。然后立刻把 $XY$ 上的这个流量流掉。

你会发现这不就是所谓反悔贪心吗……其实模拟费用流就是玄学反悔贪心的理论基础。

代码如下。

```cpp
#include<bits/stdc++.h>
typedef long long ll;
using namespace std;

struct node {
	int p, v;
	bool operator < (const node b) const { return v < b.v; }
};
typedef priority_queue<node> H;

const int maxn = 400005;

int n, K, L;
int a[maxn];
int clr[maxn];
H A0, B0, A1, B1, AB00;

void clear(H *h) { while (!h -> empty()) h -> pop(); }
int opp(int x) { return x > n ? x - n : x + n; }
node top(H *A) {
	if (A -> empty()) return (node){-1, -1};
	return A -> top();
}

void solve() {
	scanf("%d%d%d", &n, &K, &L);
	for (int i = 1; i <= n + n; i++) scanf("%d", &a[i]);
	
	memset(clr, 0, 8 * n + 4);
	clear(&A0), clear(&B0), clear(&A1), clear(&B1), clear(&AB00);
	for (int i = 1; i <= n; i++)
		A0.push((node){i, a[i]}), B0.push((node){i + n, a[i + n]}),
		AB00.push((node){i, a[i] + a[i + n]});
		
	L = K - L;
	ll ans = 0;
	while (K) {
		K--;
		while (!A0.empty() && clr[A0.top().p]) A0.pop();
		while (!B0.empty() && clr[B0.top().p]) B0.pop();
		while (!A1.empty() && clr[A1.top().p + n] != 1) A1.pop();
		while (!B1.empty() && clr[B1.top().p - n] != 1) B1.pop();
		while (!AB00.empty() && (clr[AB00.top().p] || clr[AB00.top().p + n])) AB00.pop();
		if (L) {
			L--;
			assert(!A0.empty()), assert(!B0.empty());
			node u = top(&A0), v = top(&B0); A0.pop(), B0.pop();
			ans += u.v + v.v; clr[u.p] = clr[v.p] = 1;
			if (u.p + n != v.p) {
				if (clr[u.p + n]) L++, clr[u.p] = clr[u.p + n] = 2;
				else B1.push((node){u.p + n, a[u.p + n]});
				if (clr[v.p - n]) L++, clr[v.p] = clr[v.p - n] = 2;
				else A1.push((node){v.p - n, a[v.p - n]});
			}
			else L++, clr[u.p] = clr[v.p] = 2;
		}
		else {
			node w1 = top(&AB00);
			node u2 = top(&A0), v2 = top(&B1);
			node u3 = top(&A1), v3 = top(&B0);
			if (w1.v >= u2.v + v2.v && w1.v >= u3.v + v3.v) 
				ans += w1.v, clr[w1.p] = clr[w1.p + n] = 2;
			else if (u2.v + v2.v >= u3.v + v3.v) {
				ans += u2.v + v2.v;
				clr[u2.p] = 1, clr[v2.p] = clr[v2.p - n] = 2;
				if (clr[u2.p + n]) L++, clr[u2.p] = clr[u2.p + n] = 2;
				else B1.push((node){u2.p + n, a[u2.p + n]});
			}
			else {
				ans += u3.v + v3.v;
				clr[u3.p] = clr[u3.p + n] = 2, clr[v3.p] = 1;
				if (clr[v3.p - n]) L++, clr[v3.p] = clr[v3.p - n] = 2;
				else A1.push((node){v3.p - n, a[v3.p - n]});
			}
		}
	}
	printf("%lld\n", ans);
}

int main() {
	int t; scanf("%d", &t);
	while(t--) solve();
}
```

