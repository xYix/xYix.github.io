---
title: nimber 运算和扩展
---

参考资料：论文集2020《》罗煜翔

事实上作者只是扫了一眼 lyx 神仙的论文，以下内容全是作者找资料总结的……

# 什么是 nimber

## 无偏博弈

无偏博弈是一种双人回合制游戏，两人轮流行动，同时局面对两个人是**对称**的，也就是当前的走法与当前行动的是 A 还是 B 无关。

## nim 游戏

nim 游戏是一个无偏博弈。每人轮流从一个石子堆拿走非空的石子，不能行动（当前石子堆为空）的玩家输。

## 斯普莱格–格隆第定理

斯普莱格-格隆第定理（Sprague–Grundy theorem）指出，任何一个以“不能行动的玩家输”为胜利条件的无偏博弈等价于特定大小（一般在 OI 中称为这个游戏的 $\text{SG}$ 函数）（在奇怪的情形下它可能是无限的，这时候需要一些序数理论，这不是我们今天讨论的重点，所以我们可以忽略无限的情况）的 nim 游戏。

从而我们可以用 nim 堆的大小来描述游戏。因为它上面有一些和实数不同的运算（事实上 nim 数里可能会有 $\omega^{\omega^\omega}$ 之类的奇怪东西）（事实上全体 nim 数甚至不能称为集合，只能称为真类）

# nim 运算基础

为了避免谈论序数，我们以后只谈论 $[0,2^{2^n})$ 内的 nim 数构成的**域**。可以验证它的确对下面介绍的加和乘构成域。

## 附：群是什么

一个集合 $G$ 连带它上面的运算 $\cdot$ 称为一个群，如果

- $G$ 对 $\cdot$ 封闭：$\forall a,b\in G,(a\cdot b)\in G$
- $\cdot$ 具有结合律，$a\cdot(b\cdot c)=(a\cdot b)\cdot c$
- 存在单位元 $e$ 使得 $\forall a,e\cdot a=a\cdot e=a$
- 任意 $\forall a$ 都有逆元 $a^{-1}$ 使得 $a\cdot a^{-1}=a^{-1}\cdot a=e$

请注意我们不要求 $\cdot$ 具有交换律。

## 附：域是什么

一个集合 $R$ 和上面的两个运算 $+,\times$ 称为一个域，如果

- $(R,+)$ 是群，而且 $+$ 具有交换律
- $(R,\times)$ 是半群，即不要求存在单位元和逆元的群
- $+,\times$ 之间满足左右分配律：
- - $a\times(b+c)=a\times b+a\times c$
  - $(b+c)\times a=b\times a+c\times a$

## nim 和

我们考虑一个称为 $a\oplus b$ 的新游戏，它的内容是，参与者每一步都可以选择在 $a$ 游戏**或** $b$ 游戏中走一步。它对应的 nim 数被称为 $a$ 和 $b$ 的 **nim 和**。nim 和以如下的方式定义

> $$
> a\oplus b=\text{mex}(\{a'\oplus b,a'<a\}\cup\{a\oplus b',b'<b\})
> $$

其中 $\text{mex}$ 表示一个集合中第一个没有出现的自然数。

但是其实我们都知道有一个非常简单的办法计算它：它就是 $a\operatorname{xor} b$。

## nim 积

考虑一个称为 $a\otimes b$ 的新游戏，它的内容比较复杂。我们举一个例子。

> 在一个白色平面上，$(x,y)$ 处有一个黑点。这是一个无偏博弈，每个回合，玩家都可以选定一个黑点 $(x,y)$ 和 $0\le x'<x,0\le y'<y$，反转 $(x,y),(x',y),(x,y'),(x',y')$ 的颜色。不能行动者输。

如上的这个游戏就是两个 nim 游戏的 **nim 积**。nim 积以如下的方式定义

>$$
>a\otimes b=\text{mex}(\{(a'\otimes b)\oplus(a\otimes b')\oplus(a'\otimes  b'),a'<a,b'<b\})
>$$

由于打 latex 太累，所以接下来我们会省略 $\bigcirc$。

## 如何计算 nim 积

首先有一些结论

> $$
> 2^{2^x}\times y=2^{2^{x}}\cdot y\quad(y<2^{2^x})\\
> 2^{2^x}\times 2^{2^x}=\dfrac 3 2\cdot 2^{2^x}
> $$

容易验证。

### 做法 1

我们知道 nimber 是一个域，从而我们可以使用分配律，于是我们拆分 $x,y$ 为二进制
$$
x\times y=\sum x_i\cdot2^{i}\times\sum y_i\cdot 2^{i}=\sum_{i,j}x_i\cdot y_j\cdot 2^{i}\times 2^{j}
$$
注意 $\sum$ 是 $\bigoplus$ 的省略。注意 $0\times x=0\cdot x=0,1\times x=1\cdot x=x$，从而这个式子是合理的。问题转化为如何求 $2^x\times 2^y$。对于 $x,y$ 的最高位 $k$，我们进行下面的讨论

- $x_k=y_k=1$。

记 $M=2^{2^k},A=2^{x-2^k},B=2^{y-2^k}$。从而有
$$
\begin{aligned}2^x\times 2^y&=(A\cdot M)\times (B\cdot M)\\
&=A\times M\times B\times M\\&=(\dfrac 32\cdot M)\times (A\times B)\end{aligned}
$$

- $x_k=1,y_k=0$。

记 $M=2^{2^k},A=2^{x-2^k},B=2^{y}$。从而有
$$
2^x\times 2^y=M\times(A\times B)
$$
于是综上所述有
$$
\boxed{2^x\times 2^y=\prod_{i\in \{x\operatorname{xor} y\}}2^{2^i}\times\prod_{i\in\{x\operatorname {and} y\}}\dfrac 3 2\cdot 2^{2^i}}
$$
注意 $\prod$ 是 $\bigotimes $ 的省略。前面一个累乘和自然数乘相同，后一个累乘大力递归就好。复杂度 $O(\log^2 x)$。

代码如下：

```cpp
ll F(ll x,ll y);

ll g[64][64];
ll G(int x,int y){
	if(!x||!y) return 1LL<<(x|y);
	if(~g[x][y]) return g[x][y];
	ll ans=1;
	for(int i=0;i<64;i++) if(((x^y)>>i)&1) ans<<=1LL<<i;
	for(int i=0;i<64;i++) if(((x&y)>>i)&1) ans=F(ans,(3LL<<(1<<i))>>1);
	return g[x][y]=ans;
}
ll f[256][256];
ll F(ll x,ll y){
	if(!x||!y) return x|y;
	if(x<256&&y<256) if(~f[x][y]) return f[x][y];
	ll ans=0;
	for(int i=0;i<64;i++) if((x>>i)&1)
	for(int j=0;j<64;j++) if((x>>j)&1)
		ans^=g(i,j);
	if(x<256&&y<256) f[x][y]=ans;
	return ans;
}
```

### 做法 2

[出处](https://codeforces.com/blog/entry/74214)

科技改变生活（

令一个比较好地把 $x$ 均匀分为两半的 $2^{2^i}$ 为 $P$。我们记 $x=x_0P+x_1,y=y_0P+y_1$。从而有
$$
x\times y=
x_0\times y_0\times\left(P+\dfrac P2\right)+(x_0\times y_1+x_1\times y_0)\times P+x_1\times y_1
$$
看似要计算 $x_0\times y_0,x_0\times y_1,x_1\times y_0,x_1\times y_1$，但其实不然，我们可以把 $x_0\times y_1+x_1\times y_0$ 写为
$$
(x_0+x_1)\times(y_0+y_1)-x_0\times y_0-x_1\times y_1
$$
从而这部分只需要三次乘法。而乘以 $\dfrac P2$ 是 $\log x$ 级别的。这里每次递归变为原来的 $\sqrt n$，从而有
$$
T(n)=3T(\sqrt n)+\log n
$$
直接实现复杂度为 $O(\log n^{\log_23})$，$\log_23$ 大概是 1.585 左右。然后再考虑预处理 $256$ 以内的乘法表，那就直接起飞了。``This makes multiplication about 5 times faster than naive approach.``

## 做法 i

显然只处理 256 以内的乘法表不够劲爆，我们考虑处理 65536 以内的乘法表。你可能会很疑惑，处理 65536 以内的乘法表不是去世了吗？下面就由小编带大家来了解吧。

简单来说就是，事实上在 nimber 中也是有原根存在的，从而我们考虑处理出所有 $\operatorname{exp}x$，$\operatorname {ln}$ 就直接 ``ln[exp[x]]=x``。

考虑原根 $g$，它使得序列 $g^0,g^1,g^2,...,g^{15}$ 构成了一组线性基（否则可以证明 $g$ 并非原根）。从而任意 $g^x$ 可以被它们用加法线性表示，实际实现的时候只需要使用 $g^{16}$ 的表示然后递推出它们各自的线性表示即可。

这里放一个 yhx 杯爷找出的高妙原根和它的 $g^i$ 序列。这个原根有一个性质是 $g^3=32768$，使得它和方法 2 的结合更快了。

```cpp
namespace nimbers {
	constexpr u32 n2f[16] = {0x0001u, 0x8ff5u, 0x6cbfu, 0xa5beu, 0x761au, 0x8238u, 0x4f08u, 0x95acu, 0xf340u, 0x1336u, 0x7d5eu, 0x86e7u, 0x3a47u, 0xe796u, 0xb7c3u, 0x0008u},
				  f2n[16] = {0x0001u, 0x2827u, 0x392bu, 0x8000u, 0x20fdu, 0x4d1du, 0xde4au, 0x0a17u, 0x3464u, 0xe3a9u, 0x6d8du, 0x34bcu, 0xa921u, 0xa173u, 0x0ebcu, 0x0e69u};
	inline u32 nimber2field(u32 x) {u32 y = 0; for (; x; x &= x - 1) y ^= n2f[ctz(x)]; return y;}
	inline u32 field2nimber(u32 x) {u32 y = 0; for (; x; x &= x - 1) y ^= f2n[ctz(x)]; return y;}
	inline u32 __builtin_double(u32 x) {return x << 1 ^ (x < 0x8000u ? 0 : 0x1681fu);}
    ...
```

## Nim 乘法逆，Nim 平方根

由于 nimber 是一个**有限域**，从而一定有
$$
x^{2^{2^n}-1}=1
$$
于是 $x^{-1}=x^{2^{2^n}-2},\sqrt x=x^{2^{2^n-1}}$。快速幂即可。

# 系数为 Nimber 的生成函数

> 你好啊小机器人。你学会数数了吗，还是说你还卡在 0 和 1 上？

## 例题，二项卷积逆 Ln 和 Exp

[来源](https://yhx-12243.github.io/OI-transit/records/soj1006.html)

这个 OJ 好像爆了，而且疑似是一个校内 OJ？

简要题意：

一张每个连通分量都是完全图的有标号无向图对应一个游戏：记各连通分量的大小为 $d_i$，这个游戏是 $\prod f_{d_i}$。对于每个 $n$，求所有这种大小为 $n$ 的无向图的和是否先手必胜，如果先手必胜，还要输出：如果只能修改 $f_n$，该如何修改才能使先手必败。

## 解

先考虑求所有图的和。显然一个连通分量的 EGF 可以写成
$$
A(x)=\sum_{i=1}^{\infty}f_i\dfrac{x^i}{i!}
$$
从而答案的 EGF 为
$$
\operatorname{exp} A=\sum_{i=0}^{\infty}\dfrac{A^i}{i!}
$$

停一停。你真的知道你在写什么东西吗？我们必须先保证这个所谓 “EGF” 的卷积仍然是二项卷积。
$$
\dfrac{h_n}{n!}=\sum_{i=0}^n\dfrac{f_i}{i!}\dfrac{g_{n-i}}{(n-i)!}\Rightarrow h_n=\sum_{i=0}^n{n\choose i}f_ig_{n-i}
$$
其中 $n\choose i$ 是***实数***。说真的，${n\choose i}f_ig_i$ 到底是什么意思？从组合上来讲，它应当表示把 $f_i\times g_{n-i}$ 重复加 ${n\choose i}$ 次。从而我们定义 nimber 上的整数乘 $\lambda f=(\lambda\bmod 2)\cdot f$。我们当然期望有 $\dfrac 1\lambda(\lambda f)=f$，但是显然这是不可能的，因为 $\forall f,2f=0$，从而 $\dfrac 120$ 必须同时等于多个数。所以我们只好避开不谈有理数乘，采用某种方式绕过它吧。

不过问题其实不大，我们暴力 Exp
$$
G'=GF'\\\Downarrow\\
g_{n+1}=\sum_{i=0}^n{n\choose i}g_i\times f_{n+1-i}
$$

我们知道 ${n\choose i}\bmod 2=[i\subseteq n]$，如果把一个整数看成它的二进制表示描述的集合。从而这就是一个**子集卷积**。此时已经有一个 Karatsuba 分治乘法做法，但是不够劲爆。我们给出一个劲爆引理：

>$$
>f\circledast f=[x^0]f\times[x^0]f
>$$
>
>其中 $\circledast$ 表示二项/子集卷积。

读者自证不难，只需要注意到任何 nimber 的加法逆元等于自身。

从而，任何常数项为 1 的多项式的二项/子集卷积逆是其自身。于是有
$$
GG'=F'\\\Downarrow\\
f_{n+1}=\sum_{i=0}^n{n\choose i}g_ig_{n+1-i}
$$
从而，如果忽略乘法的复杂度，我们可以在 $O(n\log n)$ 的时间内计算 Ln，牛迭即可得到 Exp。

然后考虑怎么修改 $f_{n+1}$，假设修改为 $w$。则有
$$
g_{n+1}'=\sum_{i=0}^n{n\choose i}g_i\times f_{n+1-i}+f_{n+1}+w=0
$$

$$
w=g_{n+1}+f_{n+1}
$$

于是就做完了。

# 后记

不知不觉写了这么多？

其他的高科技等初赛考完能借到论文集再说吧。到时候重开一篇文章。