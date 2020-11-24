---
title: uoj#36 ~ #41 题解 - 清华集训 2014
---

# #36 玛里【】斯

如今的贴吧虽然几乎什么都变了，但是提到玛里【】斯时的接龙却依然传承了下来。~~建议申请非物质文化遗产~~

回到正题。

> **题目大意.**
>
> 从可重集 $S=\{a_i\}$ 中等概率随机一个子集 $A$，求 $\left(\bigoplus A\right)^5$ 的期望。

考虑现在有一个 $k$ 维空间，每维都是 $\{0,1\}$，每个点的权值就是它出现的概率。一开始只有 $(0,0,...,0)$ 上是 $1$，其他都是 $0$。

加入一个元素 $x$，那么这个空间会分裂为一个不变的复制品和一个坐标全异或了 $x$ 的复制品，权值均变为原来的 $\dfrac 12$。

我们归纳证明任何非 $0$ 点的权值相等。根据下面的证明，它其实是显然的：

- 如果加入 $x$ 并没有使 $\{x_1,...\}$ 张成的线性空间扩大，即线性基中没有插入 $x$，那么这次操作无事发生，当然不违反权值相等的规则。
- 否则，另一个复制品一定是到了和当前空间完全平行的另一个空间，所以所有点的权值都变成了原来的 $\dfrac 12$，没有违反权值相等的规则。

<div style="width:70%;margin:auto"><img src="/images/uoj-36.png" alt=""></div>

对于此题，由于答案 $\le 2^{63}$ 的限制，对 $k\ge 3$ 我们暴力枚举基中元素即可。$k=1,2$ 则都是傻逼题。

三合一/ruo，skip

# #37 主旋律

> **题目大意.**
>
> 求一个图的生成强连通子图数量。$n\le 15$，边数不限。

记 $G_{S,T}$ 是 $2^{S 连向T 的边数}$。

考虑直接计数 $f_S$ 为 $S$ 是强连通分量的方案数。$f$ 的反面是容易计数的，我们只需要抽出那些出度为 0 的分量，剩下的点随意连边。但是这不能排除剩下的点集还有出度为 0 的分量的情况，所以使用一个容斥。
$$
f_S=G_{S,S}+g_{0,S}-g_{1,S}+f_S+\sum_{T\subsetneq S,T\neq\varnothing}G_{S/T,S/T}\cdot G_{S/T,T}\cdot (g_{0,T}-g_{1,T})
$$
其中 $g_{0,S}$ 是把 $S$ 分为偶数且 $\ge 2$ 个互相无边相连的强连通分量的方案数，$g_{1,S}$ 反之。上式其实没有给出任何关于 $f$ 的信息，但它的确给出了关于 $g_1-g_0=\Delta g$ 的 DP：
$$
\boxed{\Delta g_S=G_{S,S}-\sum_{T\subsetneq S, T\neq\varnothing}G_{S/T,S/T}\cdot G_{S/T,T}\cdot \Delta g_T}
$$
我们还显然有
$$
g_{0,S}=\sum_{T\subsetneq S,T\neq\varnothing,u_S\in T}g_{1,S/T}\cdot f_{T}\\
g_{1,S}=\sum_{T\subsetneq S,T\neq\varnothing,u_S\in T}g_{0,S/T}\cdot f_T+f_S
$$
其中为了保证转移的顺序，我们在 $S$ 中标记了一个“根” $u_S$，$T$ 必须包含它，代码中选用 $ctz(s)$。上下相减便得到
$$
\boxed{f_S=\Delta g_S+\sum_{T\subsetneq S,T\neq \varnothing,u_S\in T}\Delta g_{S/T}\cdot f_T}
$$
只剩下一个问题：预处理 $G$。显然用到的 $G$ 有两类，一类形如 $G(S,S)$，这非常简单；否则 $G(S,T)$ 中的 $S,T$ 不交，我们使用一个三进制数表示。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p = 1000000007, maxN = 15, mL = 1 << maxN, mN = maxN + 1, inv2 = (p + 1) >> 1;
struct Z {int x; Z(int x0 = 0) : x(x0) {}};
int inline check(int x) { return x >= p ? x - p : x; }
Z operator +(const Z a, const Z b) { return check(a.x + b.x); }
Z& operator +=(Z &a, const Z b) { return a = a + b; }
Z operator -(const Z a, const Z b) { return check(a.x - b.x + p); }
Z operator -(const Z a) {return check(p - a.x);}
Z& operator -=(Z &a, const Z b) { return a = a - b; }
Z operator *(const Z a, const Z b) { return 1LL * a.x * b.x % p; }
Z& operator *=(Z &a, const Z b) { return a = a * b; }
Z qpow(Z a, int k) {
	Z ans = 1;
	for (; k; a *= a, k >>= 1) if(k & 1) ans *= a;
	return ans;
}
Z fac[mL], ifac[mL], inv[mL];
Z pow2[450];
int ppc[mL], ctz[mL];
int to_3_1[mL], to_3_2[mL];
void init() {
	inv[1] = fac[0] = fac[1] = ifac[0] = ifac[1] = 1;
	for (int i = 2; i < mL; i++)
		fac[i] = fac[i - 1] * i,
		inv[i] = -inv[p % i] * (p / i),
		ifac[i] = ifac[i - 1] * inv[i];
	pow2[0] = 1;
	for(int i = 1; i < 450; i++) pow2[i] = pow2[i - 1] + pow2[i - 1];
	for (int i = 1; i < mL; i++) {
		ppc[i] = ppc[i >> 1] + (i & 1);
		ctz[i] = (i & 1) ? 0 : (ctz[i >> 1] + 1);
	}
	for(int i = 1; i < mL; i++)
		to_3_1[i] = to_3_1[i >> 1] * 3 + (i & 1),
		to_3_2[i] = to_3_2[i >> 1] * 3 + ((i & 1) << 1);
}
int inline to_3(int s, int t) { return to_3_1[s] + to_3_2[t]; }

int N, M, L, L3;
int gsT[15][mL];
Z G[14348907], Gself[mL];
Z dG[mL], F[mL];

int main() {
	init();
	dG[0] = 0; F[0] = 1;
	scanf("%d%d", &N, &M); L = 1 << N; L3 = qpow(3, N).x;
	while(M--) {
		int u, v; scanf("%d%d", &u, &v); u--; v--;
		gsT[u][1 << v]++;
	}
	for(int u = 0; u < N; u++)
	for(int i = 0; i < N; i++)
	for(int s = 0; s < L; s++) if((s >> i) & 1)
		gsT[u][s] += gsT[u][s ^ (1 << i)];
	
	for(int s = 1, is = L - 2; s < L; s++, is--)
	for(int t = is; t; t = (t - 1) & is)
		G[to_3(s, t)].x = G[to_3(s ^ (1 << ctz[s]), t)].x + gsT[ctz[s]][t];
	for(int s = 0; s < L3; s++) G[s] = pow2[G[s].x];
	
	for(int s = 0; s < L; s++) {
		for(int i = 0; i < N; i++) if((s >> i) & 1) 
			Gself[s].x += gsT[i][s];
		Gself[s] = pow2[Gself[s].x];
	}
	
	for(int s = 1; s < L; s++) {
		dG[s] = Gself[s];
		for(int t = (s - 1) & s; t; t = (t - 1) & s)
			dG[s] -= Gself[s ^ t] * G[to_3(s ^ t, t)] * dG[t];
		F[s] = dG[s];
		for(int t = (s - 1) & s; t; t = (t - 1) & s) if((t >> ctz[s]) & 1)
			F[s] += dG[s ^ t] * F[t];
	}
	printf("%d\n", F[L - 1]);
}
```

# #38 奇数国

阅读理解思博题。

> **题目大意.**
>
> 有一个序列，一开始全是 $3$。你要支持
>
> - 单点修改权值；
> - 求一段区间的乘积的 $\varphi$。
>
> 保证任何时刻序列中元素的最大因子不超过 281。

考虑到 $\varphi$ 的性质我们直接维护 60 个区间或就可以了。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN = 100005, p = 19961993;
struct Z {int x; Z(int x0 = 0) : x(x0) {}};
int inline check(int x) { return x >= p ? x - p : x; }
Z operator +(const Z a, const Z b) { return check(a.x + b.x); }
Z& operator +=(Z &a, const Z b) { return a = a + b; }
Z operator -(const Z a, const Z b) { return check(a.x - b.x + p); }
Z operator -(const Z a) {return check(p - a.x);}
Z& operator -=(Z &a, const Z b) { return a = a - b; }
Z operator *(const Z a, const Z b) { return 1LL * a.x * b.x % p; }
Z& operator *=(Z &a, const Z b) { return a = a * b; }
Z qpow(Z a, int k) {
	Z ans = 1;
	for (; k; a *= a, k >>= 1) if(k & 1) ans *= a;
	return ans;
}
const int pri[60] = {
	2,   3,   5,   7,  11,  13,  17,  19,  23,  29,  31,  37,  41,  43, 
   47,  53,  59,  61,  67,  71,  73,  79,  83,  89,  97, 101, 103, 107, 
  109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 
  191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 
  269, 271, 277, 281 };
Z ipri[60];
ll sum[maxN << 2]; Z pro[maxN << 2];
void Build(int x, int l, int r) {
	sum[x] = 2;
	if(l != r) {
		int mid = (l + r) >> 1;
		Build(x << 1, l, mid); Build(x << 1 | 1, mid + 1, r);
		pro[x] = pro[x << 1] * pro[x << 1 | 1];
	}
	else pro[x] = 3;
}
void Update(int x, int l, int r, int pos, ll K1, Z K2) {
	if(l == r) { sum[x] = K1; pro[x] = K2; return; }
	int mid = (l + r) >> 1;
	if(pos <= mid) Update(x << 1, l, mid, pos, K1, K2);
	else Update(x << 1 | 1, mid + 1, r, pos, K1, K2);
	sum[x] = sum[x << 1] | sum[x << 1 | 1];
	pro[x] = pro[x << 1] * pro[x << 1 | 1];
}
#define plz pair<ll, Z>
plz operator +(const plz a, const plz b) { return make_pair(a.first | b.first, a.second * b.second); }
plz Query(int x, int l, int r, int L, int R) {
	if(L <= l && r <= R) return make_pair(sum[x], pro[x]);
	int mid = (l + r) >> 1; plz ans = make_pair(0LL, Z(1));
	if(L <= mid) ans = ans + Query(x << 1, l, mid, L, R);
	if(R > mid) ans = ans + Query(x << 1 | 1, mid + 1, r, L, R);
	return ans;
}

int N;

int main() {
	Build(1, 1, 100000);
	for(int i = 0; i < 60; i++) ipri[i] = qpow(pri[i], p - 2);
	scanf("%d", &N);
	while(N--) {
		int opt; scanf("%d", &opt);
		if(opt == 0) {
			int l, r; scanf("%d%d", &l, &r);
			plz ret = Query(1, 1, 100000, l, r);
			for(int i = 0; i < 60; i++) if((ret.first >> i) & 1)
				ret.second *= (pri[i] - 1) * ipri[i];
			printf("%d\n", ret.second.x);
		}
		else {
			int pos; ll K1 = 0; Z K2; scanf("%d%lld", &pos, &K2.x);
			for(int i = 0; i < 60; i++) if(K2.x % pri[i] == 0) K1 |= 1LL << i;
			Update(1, 1, 100000, pos, K1, K2);
		}
	}
}
```

# #39 简单回路

插头 DP 草，skip

# #40 卡常数

