---
title: 集合幂级数学习笔记
date: 2020-09-26 17:04:53
tags:
- 集合幂级数
- $\color{red}精品$
---

参考资料：论文集2015《集合幂级数的性质及其快速算法》吕凯风

<!--more-->

# 从子集卷积开始

两个序列 $f,g$（当然，以集合为下标）的**子集卷积**为

$$
h_S=\sum_{L\subseteq S}\sum_{R\subseteq S}[L\cap R=\varnothing][L\cup R=S]f_Lg_R
$$

它是非常重要的集合卷积；事实上它可能是最重要的集合卷积。

我们都知道它的经典 $O(n^22^n)$ 算法：考虑把 $f_{|L|,L}$ 和 $g_{|R|,R}$ 卷积到 $h_{|L|+|R|,L\cup R}$ 上，这样 $h_{|S|,S}$ 显然一定是两个不相交的 $L,R$ 卷出来的，否则第一维一定会比 $|S|$ 大。

$(|L|,|R|)\rightarrow |L|+|R|$ 显然就是普通的序列卷积，这提示我们定义如下的

# 集合占位幂级数

> 定义 $\sigma$ 是 $f$ 的**集合占位幂级数**，如果任意 $[x^S]\sigma$ 是一个形式幂级数，且对于 $i<|S|$ 有 $[z^ix^S]\sigma=0$，同时有 $[z^{|S|}x^S]\sigma=f_S$。

我也知道乱改论文里的符号不太好，但是在右下角标里写太多东西就是让我很难受……

显然对于 $i>|S|$ 的 $[z^ix^S]\sigma$ 我们完全不关心。大概这就是占位罢（。显然集合占位幂级数的如下定义的卷积

$$
\boxed{[z^rx^S]\delta=\sum_{L\cup R=S,p+q=r}[z^px^L]\sigma[z^qx^R]\tau}
$$

就是子集卷积。

实现方法就是之前提到的经典算法，不再赘述。

接下来我们简称集合占位幂级数为集合幂级数。

# 集合幂级数求逆

此处指的是子集卷积意义下的逆。显然子集卷积意义下的乘法单位元就是 $z^{\varnothing}$。

回想子集卷积，我们只是单纯地 $\sigma,\tau$ or_FWT 后把对应位置的集合幂级数相乘。从而有

$$
[x^S]\text{FWT}(\sigma)\cdot[x^S]\text{FWT}(\sigma^{-1})=[x^S]\text{FWT}(x^{\varnothing})=1
$$

于是我们把 $[x^S]\text{FWT}(\sigma)$（是一个形式幂级数）挨个求逆然后 $\text{FWT}^{-1}$ 回去即可。从而也可以看出集合幂级数 $\sigma$ 有逆当且仅当

$$
[z^0x^{\varnothing}]\sigma\neq 0
$$

由于 $\text{FWT}$ 一个集合幂级数是 $O(n^22^n)$ 的，所以时间复杂度瓶颈并不在求逆上，可以使用简单常数小的暴力 $O(n^2)$ 求逆。

# 集合幂级数 Exp 和 Ln

考虑如下定义的 Exp：

$$
\text{Exp}(\sigma)=\sum_{i}\dfrac{\sigma^i}{i!}
$$

从而，由于 $\text{FWT}$ 有线性和积性，$[x^S]$ 有线性，我们可以得到
$$
\begin{aligned} \left[x^S\right] \text{FWT Exp}(\sigma)&=\sum_{i}\dfrac{\Big([x^S]\text{FWT}(\sigma)\Big)^i}{i!}\end{aligned}
$$

某种意义上说：$\text{FWT}\circ\text{Exp}=\text{Exp}\circ\text{FWT}$。

从而只需要 $\text{FWT}$ - 对每个形式幂级数求 $\text{Exp}$ - $\text{FWT}^{-1}$ 即可。

$\text{Ln}$ 完全类似。

同样，由于对形式幂级数的操作并非时间复杂度瓶颈，从而可以使用暴力 $O(n^2)$ 算法。

# 参考代码

虽然集合占位幂级数一看就让人很有封装的欲望，但是不仅没有封装的必要而且一旦封装还会让你的常数起飞……

```cpp
#include<bits/stdc++.h>
#include<typeinfo>
using namespace std;

const int p = 998244353, maxN = 18, mL = 1 << maxN, mN = maxN + 1, inv2 = (p + 1) >> 1;
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
int ppc[mL], ctz[mL];
void init() {
	inv[1] = fac[0] = fac[1] = ifac[0] = ifac[1] = 1;
	for (int i = 2; i < mL; i++)
		fac[i] = fac[i - 1] * i,
		inv[i] = -inv[p % i] * (p / i),
		ifac[i] = ifac[i - 1] * inv[i];
	for (int i = 1; i < mL; i++) {
		ppc[i] = ppc[i >> 1] + (i & 1);
		ctz[i] = (i & 1) ? 0 : (ctz[i >> 1] + 1);
	}
}

namespace Poly {
#define forj for(Z *jf = f + 1, *jg = i - 1; jg >= g; jf++, jg--)
void Mul(Z f[], Z g[], int n) {
	for (Z *i = g + n; i >= g; i--) {
		*i *= f[0];
		forj *i += *jf * *jg;
	}
}
void Inv(Z f[], Z g[], int n) {
	memset(g, 0, (n + 1) * sizeof(Z));
	g[0] = qpow(f[0], p - 2);
	for (Z *i = g + 1; i <= g + n; i++) {
		forj *i -= *jf * *jg;
		*i *= g[0];
	}
}
Z tg[mN]; //tg = 0.5ttgg = 0.5瑇!
void copy(Z f[], Z g[], int n) { for (Z *i0 = f, *i1 = g; i0 <= f + n; i0++, i1++) *i1 = *i0; }
void Inv(Z f[], int n) { copy(f, tg, n); Inv(tg, f, n); }
void Ln(Z f[], Z g[], int n) {
	memset(g, 0, (n + 1) * sizeof(Z));
	g[0] = 0;
	for (Z *i = g + 1; i <= g + n; i++) {
		*i = (i - g) * f[i - g];
		forj *i -= (jg - g) * *jf * *jg;
		*i *= inv[i - g];
	}
}
void Ln(Z f[], int n) { copy(f, tg, n); Ln(tg, f, n); }
void Exp(Z f[], Z g[], int n) {
	memset(g, 0, (n + 1) * sizeof(Z));
	g[0] = 1;
	for (Z *i = g + 1; i <= g + n; i++) {
		forj *i += (jf - f) * *jf * *jg;
		*i *= inv[i - g];
	}
}
void Exp(Z f[], int n) { copy(f, tg, n); Exp(tg, f, n); }
#undef forj
}

struct SPS { //Set Power Series
	int n;
	Z D[mL][mN];
	void FWT() {
		for (int i = 1; i < 1 << n; i <<= 1)
		for (auto j = D; j < D + (1 << n); j += i << 1)
		for (auto k0 = j, k1 = j + i; k0 < j + i; k0++, k1++)
		for (auto l0 = *k0, l1 = *k1; l0 <= *k0 + n; l0++, l1++)
			*l1 += *l0;
	}
	void iFWT() {
		for (int i = 1; i < 1 << n; i <<= 1)
		for (auto j = D; j < D + (1 << n); j += i << 1)
		for (auto k0 = j, k1 = j + i; k0 < j + i; k0++, k1++)
		for (auto l0 = *k0, l1 = *k1; l0 <= *k0 + n; l0++, l1++)
			*l1 -= *l0;
	}
	void clear() {
		for (auto s = D; s < D + (1 << n); s++)
		for (auto j = *s; j <= *s + n; j++)
			*j = 0;
	}
	void copy(SPS &b) {
		for (auto s0 = D, s1 = b.D; s0 < D + (1 << n); s0++, s1++)
		for (auto j0 = *s0, j1 = *s1; j0 <= *s0 + n; j0++, j1++)
			*j0 = *j1;
	}
};

int main() {
	init();  // important
}
```

# 劲爆应用

## [欧拉生成子图个数](https://loj.ac/problem/6673)

题面完全没有体现出要求的是**生成子图**啊……

考虑计算点度均为偶数的生成子图个数。暴力枚举点集，于是得到一个异或方程组，解数即偶子图个数。抽出其中的线性基，其他边均可随意选或不选。

然后集合幂级数 $\text{Ln}$ 即可。

复杂度 $O(2^n(n^2+m))$。

> 注意 $\text{Ln}$ 体现的重要组合意义：$\text{Ln}(\sigma)$ 会把 $\sigma$ 拆解成不能再拆解的形式，因为它是 $\text{Exp}$，即完全任意组合的逆运算。~~Exp 组合意义的名字是 x义x 乱取的，不要在意~~

## [点双连通生成子图计数](https://loj.ac/problem/6729)

我们都知道点/边双是和连通有[某种容斥关系](/posts/biconnected-graph-counting/)的。在生成子图问题中我们仍然可以类推。具体来讲：

首先我们可以算出连通生成子图的集合幂级数 $F_0$。这个很显然，生成子图的集合幂级数 $\text{Ln}$ 一下即可。

令 $F_i$ 为所有割点编号都大于等于 $i$ 的连通生成子图的集合幂级数。考虑从 $F_i$ 推到 $F_{i+1}$。也就是要去除所有 $i$ 是其割点的图：删去 $i$ 后变为多个 $F_{i}$（你可能会想不应该是 $F_{i+1}$ 吗，但是这些图本来就不含 $i$，$F_{i},F_{i+1}$ 不影响它们）的图。

但是这怎么列式子呢，你可以看看大概长这样的一个图

<div style="width:70%;margin:auto"><img src="/images/spsln.png" alt=""></div>

于是我们得到

$$
\dfrac{F_{i+1}'}{zx^{\{i\}}}=\text{Ln}\dfrac{F_i'}{zx^{\{i\}}}
$$

其中 $F_i'$ 是强制把不包含 $i$ 的位置置 0 得到的集合幂级数。

> 建议细品。理解这个完全基于点的容斥的处理边的方式是不太容易的。关注处理连通性的方式：这里用 $i$ 把连通块“缝”了起来。上面的变换也和 Exp 有了很大差别，不如称为“连通组合”？

复杂度 $O(2^nn^3)$。你可能会很惊讶，这玩意不是 $1.5\text{e}9$ 的吗，是怎么过的呢，小编也很惊讶，但事实就是这样。

### 彩蛋

![](/images/sbxyx2.png)

## [边双连通生成子图计数](https://loj.ac/problem/6730)

啊这，边的限制……这就很难搞了。我们必须想个办法把它变成点。

边双的每一条边都包含在至少一个环里。环意味着什么？点双连通分量。

也就是说，每一个有边的点对都包含在一个更大的点双里。**边双连通图就是没有大小为 2 的点双连通分量的图**。

注意大小为 2 的点双连通分量是不可（按上面的方式）拆解的。

我们考虑先求出点双的集合幂级数，然后挖掉所有的大小为 2 的位置，记为 $G_0$，再一步步把它“组装”回去。令 $G_i$ 是允许编号小于等于 $i$ 的节点成为其割点的答案。如果你真的认真考虑过了上面两个问题，你应该能轻松写出

$$
\dfrac{G_{i+1}'}{zx^{\{i\}}}=\text{Exp}\dfrac{G_i'}{zx^{\{i\}}}
$$

复杂度 $O(2^nn^3)$。

### 彩蛋

![](/images/sbxyx3.png)

## [Tutte 多项式](https://loj.ac/problem/155)

一个无向图 $G=(V,E)$ 的 Tutte 多项式定义为

$$
T_G(x,y)=\sum_{A\subseteq E}(x-1)^{k(A)-k(E)}(y-1)^{k(A)+|A|-|V|}
$$

我们先考虑计算连通的 $A$，之后再 Exp 上去。

设 $f_S$ 是所有使 $S$ 连通的 $A$ 的 $(y-1)^{1+|A|-|S|}$ 之和。考虑加一个节点 $i$。设 $S,i$ 之间的边数为 $G(S,i)$。则如果加入 $i$ 则应该乘的是

$$
\sum_{j=1}^{G(S,i)}{G(S,i)\choose j}(y-1)^{j-1}
$$

$$
\dfrac{y^{G(S,i)}-1}{y-1}
$$

可以发现如果新的连通块是由多个 $S$ 拼成，那么只需要对每个 $S$ 分别乘这个东西就好了。那么暴力把 $n$ 个 $i$ 全都加进去就做完了。复杂度 $O(n^22^n)$。

注意 $x=1$ 的情况。

### 彩蛋

![](/images/sbxyx4.png)

## [生成仙人掌计数](https://loj.ac/problem/6719)

还是考虑加入一个点 $i$。观察一下 $i$ 的“子节点”：

- 真的就是一个子节点。那么这个“子树”是一个仙人掌。

- 和根节点在一个环。那么这个子树是一个仙人掌，加上 $i$ 也必须还是一个仙人掌。

<div style="width:70%;margin:auto"><img src="/images/cactus.png" alt=""></div>

那么我们设 $[x^s]Caccac$ 是点集为 $s\cup\{i\}$ 的仙人掌，而且删掉 $i$ 还是仙人掌的数量，从而答案就是

$$
zx^{\{i\}}\text{Exp}(Caccac)
$$

[经验](/posts/cactus-counting/)告诉我们应该分别讨论单纯的点和环两种情况。设前一种为 $S_v$：$v$ 表示儿子为 $v$，后一种为 $C_v$：$v$ 表示 $i$ 在环上的“下一个点”是 $v$，显然 $C$ 会因此算两遍。然后还要特判只有 $i,v$ 的迫真环，从而有

$$
Caccac=\dfrac 12\sum S+\dfrac 1 2\sum C
$$

$[x^s]S_v$ 非常的简单，它只要求 $(i,v)$ 有边，而且 $s$ 是一个仙人掌。

接下来考虑 $C$。$C$ 是由一串仙人掌串在一个环上，不妨修改 $C_v$ 的定义：不再要求 $(v,i)$ 有边，我们只是简单地把仙人掌串到了 $v$ 处。也不妨利用一下 $S$，它也不再要求 $(v,i)$ 有边。最后统计的时候强行要求即可。

<div style="width:70%;margin:auto"><img src="/images/cactuus.png" alt=""></div>

（↑ 请注意实际上 $C,S$ 的“占地”并不包含 $i$，图中只是为了方便理解）

于是可以写出

$$
C_v=S_v\sum_{(u,v)}C_u
$$

初值为 $C_i=x^{\varnothing}$。考虑

$$
\text{FWT}(C_v)=\text{FWT}(S_v)\times\sum_{(u,v)}\text{FWT}(C_u)
$$

于是从较低的 $z^i$ 推上去即可。时间复杂度为 $\sum_{i=1}^nO(n^32^n)$。

### 彩蛋

![](/images/sbxyx5.png)

### upd 2020/11/11

注意到只需要承认一条边是一个长度为 2 的环，此时仙人掌就是环套在一起，立即得到一个好写的做法。

# 后记

是不是什么图计数题都可以搬到集合幂级数上啊（

生 成 烷 烃（错乱）