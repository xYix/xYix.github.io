---
title: uoj#36 ~ #47 题解 - 清华集训 2014
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
其中 $g_{0,S}$ 是把 $S$ 分为偶数且 $\ge 2$ 个互相无边相连的强连通分量的方案数，$g_{1,S}$ 反之。上式其实没有给出任何关于 $f$ 的信息（两边消掉了），但它的确给出了关于 $g_1-g_0=\Delta g$ 的 DP：
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

KDT sb 题，skip

# #41 矩阵变换

> **题目大意.**
>
> 给出一个 $n\times m$ 的矩阵，每行恰好有 $m-n$ 个 $0$ 和一个 $1\sim n$ 的排列。保证每一列中，非零元素总是只出现不超过 $1$ 次。
>
> 你要在每一行 $i$ 选定一个 $p_i$，然后令 $j>p_i, a_{i,j}\leftarrow a_{i,p_i}$。你要使得仍然有：每一列中，非零元素总是只出现不超过 $1$ 次。显然 $p_i$ 是一个排列。输出任意方案即可，否则报告无解。
>
> $n\le 200,m\le 400$。多测，$T\le 50$。

**观察 1.** 如果一行选了 $(i,p_i)$ 处的元素，设任意的另一行 $j$ 的相同值元素处在 $(j,q_j)$。则 $p_i<q_j<p_j$。

**观察 2.** 如果希望解决上面的一对冲突，调整 $i$ 是复杂的，所以每一行 $j$ 都有把 $p_j$ 往前移的倾向。

**观察 3.** 同上，对于值 $v$，它会更希望选择 $j$ 更大的 $a_{i,j}=v$。

这时我们终于发现，$p_i<q_j<p_j$ 即意味着：

- 权值 $a_{i,p_i}$ 比起当前匹配的 $i$（评价为 $p_i$）更喜欢 $j$（评价为 $q_j$）；
- 而行 $j$ 比起当前匹配的 $a_{j,p_j}$（评价为 $-p_j$）更喜欢 $a_{j,q_j}=a_{i,p_i}$（评价为 $-q_j$）。

这是[**稳定婚姻匹配**](https://zh.wikipedia.org/wiki/%E7%A9%A9%E5%AE%9A%E5%A9%9A%E5%A7%BB%E5%95%8F%E9%A1%8C)中的一对不稳定婚姻。使用 Gale Shapley 算法即可。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxN = 205, maxM = 405;
int T, N, M;
int A[205][405];
int WF[205][205], CM[205][205], lM[205];
int MatchM[205], MatchF[205];
int q[40005], h, t;

int main() {
	scanf("%d", &T);
	while(T--) {
	scanf("%d%d", &N, &M);
	for(int i = 1; i <= N; i++) lM[i] = 0;
	for(int i = 1; i <= N; i++)
	for(int j = 1; j <= M; j++) {
		int w;
		scanf("%d", &w); A[i][j] = w;
		if(w) CM[i][++lM[i]] = w;
	}
	for(int i = 1; i <= N; i++)
	for(int j = 1; j <= M; j++) {
		int w = A[i][j];
		if(w) WF[w][i] = -j;
	}
	
	h = t = 0;
	for(int i = 1; i <= N; i++) MatchM[i] = MatchF[i] = 0, lM[i] = 1, q[++t] = i;
	while(h != t) {
		int u = q[++h], v = CM[u][lM[u]];
		if(!MatchF[v] || WF[v][MatchF[v]] > WF[v][u]) {
			MatchM[MatchF[v]] = 0;
			if(MatchF[v]) lM[q[++t] = MatchF[v]]++;
			MatchF[v] = u, MatchM[u] = v;
		}
		else lM[q[++t] = u]++;
	}
	for(int i = 1; i <= N; i++) printf("%d ", MatchM[i]);
	printf("\n");
	}
}
```

# #42 Sum

> **题目大意.** 求
> $$
> \sum_{d=1}^n(-1)^{\lfloor d\sqrt r\rfloor}
> $$
> $n\le 1\text{e}9,r\le 1\text{e}4$。多测，$T\le 1\text{e}4$。

我们有 $(-1)^x=1-2(x\bmod 2)=1-2(x-2\lfloor x/2\rfloor)=1-2x+4\lfloor x/2\rfloor$。于是运用类欧几里得算法即可。

兄啊你这怎么还是实数版的啊，呕，skip

不过似乎是[可以避免](https://www.cnblogs.com/mangoyang/p/11650708.html)的

# #43 Router

阴间题爬

# #44 Breaking Bomber

计算几何爬

# #45 虫逢

> **题目大意.** 有 $2n$ 只变形虫，每只虫都有一个大小为 $L$ 的基因集合，基因均从一个大小为 $m\approx L^2$ 的未知基因库中随机抽取。保证 $n$ 只变形虫可以两两配对，称为同源，每一对同源虫的基因集合有一半是重合的。请你找出这样的配对。
>
> $n\le 16900,L\le 130$。

一个简单的想法是抽出一个代表元素进行比较。具体来说，我们给每一个字符串随机 rand 一个权值，然后定义一只变形虫的特征是其基因的最小权值，然后每次把权值相同的一对虫暴力 check。

我们来分析两个固定集合 $u,v$，rand 出了相等权值的概率。显然它应当是 $\dfrac{|u\cap v|}{|u\cup v|}$。那么对于随机的不同源集合，它们权值相等的概率约是 $L^{-1}$，同源集合相等的概率是 $\frac 1 3$。如果找到了一对权值相同的虫，它们只有 $3L^{-1}$ 的概率失误：即不同源却随到了同样的权值。这是很可以接受的。

问题的关键在于虫有 $n\approx L^2$ 只，每一轮中每只虫都要期望 check $L$ 次。这才是不能接受的：换句话说，我们遭受了“生日攻击”。

简单的思路是采用双特征值，一个最小权值，一个最大权值。这样每个类的大小就都是 $O(1)$ 了。

注意：能用哈希就别用数据结构。

```cpp
#include<bits/stdc++.h>
typedef unsigned int ui;
using namespace std;

char buf[17576100]; int blen;
struct hshMap {
    const int mod = 1111151;
    struct node {
        ui key; int val, nxt;
    } a[20010];
    int cnt, tot, head[1111151];
    inline int calc(ui x) {
        ui xx = x % mod;
        for (int i = head[xx]; i; i = a[i].nxt) {
            if (a[i].key == x) return a[i].val;
        }
        a[++tot] = {x, ++cnt, head[xx]};
        head[xx] = tot;
        return cnt;
    }
} hsh;

int N, M_, L;
int val[16905];
struct Cell {
	int S[135];
	inline int getval() {
		int ansL = 0x3f3f3f3f, ansR = 0;
		for(int i = 1; i <= L; i++) ansL = min(ansL, val[S[i]]), ansR = max(ansR, val[S[i]]);
		return (ansL - 1) + 16900 * (ansR - 1);
	}
} A[16905 << 1];
int Match[16905 << 1];
struct node {
	int p, v;
	bool operator <(const node b) const { return v < b.v; }
} B[16905 << 1];

bool vis[16905];
bool check(const Cell a, const Cell b) {
	for(int i = 1; i <= L; i++) vis[a.S[i]] = 1;
	int tot = 0;
	for(int i = 1; i <= L; i++) if(vis[b.S[i]]) tot++;
	for(int i = 1; i <= L; i++) vis[a.S[i]] = 0;
	return tot >= L / 2;
}

int main() {
//	freopen("2.in", "r", stdin);
//	freopen("WA.out", "w", stdout);
	scanf("%d%d%d%s", &N, &M_, &L, buf);
	for(int i = 1; i <= 2 * N; i++)
	for(int j = 1; j <= L; j++) {
		ui x = (buf[blen] << 24) | (buf[blen + 1] << 16) | (buf[blen + 2] << 8) | (buf[blen + 3]);
		blen += 4;
		A[i].S[j] = hsh.calc(x);
	}
	for(int i = 1; i <= hsh.cnt; i++) val[i] = i;
	int tot = 2 * N;
	while(1) {
		random_shuffle(val + 1, val + hsh.cnt + 1);
		tot = 0;
		for(int i = 1; i <= 2 * N; i++) if(!Match[i]) tot++, B[tot].v = A[i].getval(), B[tot].p = i;
		if(!tot) break;
		if(tot == 2) {
			Match[B[1].p] = B[2].p;
			Match[B[2].p] = B[1].p;
			break;
		}
		sort(B + 1, B + tot + 1);
		for(int l = 1, r; l <= tot; l = r) {
			for(r = l + 1; r <= tot && B[r].v == B[l].v; r++);
			#define k0 B[j0].p
			#define k1 B[j1].p
			for(int j0 = l; j0 < r; j0++)
			for(int j1 = j0 + 1; !Match[k0] && j1 < r; j1++)
				if(!Match[k1] && check(A[k0], A[k1])) Match[k0] = k1, Match[k1] = k0;
		}
	}
	for(int i = 1; i <= 2 * N; i++) printf("%d\n", Match[i]);
}
```

# #46 玄学

二进制分组，暴力维护分段函数即可。

辣鸡数据结构题不想写啊（关键实在太板了），skip

# #47 文学

计算几何爬