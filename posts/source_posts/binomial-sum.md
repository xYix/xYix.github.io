---
title: 《再谈 Binomial Sum》通俗演义
---

> **原文地址.**
>
> - [luogu](https://www.luogu.com.cn/blog/EntropyIncreaser/zai-tan-binomial-sum-duo-xiang-shi-fu-ge-cha-zhi-yu-tai-lei-zhan-kai)
> - [CSDN](https://blog.csdn.net/EI_Captain/article/details/115118001)

# 1. 主要思想

现在有一个生成函数 $G(x)$，我们通过某种神秘方法对于任意 $0\le k\le n$ 得知了 $G^k(x)$ 的前 $n$ 项系数的带权和。具体来说，有一个固定的权值序列 $a$，我们得知了
$$
\mathcal G_k=\sum_{j=0}^na_j[x^j]G^k(x)
$$
然后给定另一个生成函数 $F(x)$，我们所欲求的是 $F(G)$ 的前 $n$ 项系数的带权和，具体来说是
$$
\text{ans}=\sum_{j=0}^na_j[x^j]F(G(x))
$$
如果 $F$ 的度数不超过 $n$ 或者 $G$ 的常数项为 $0$ 那这就是思博题了，然而事实往往并非如此；

这里的策略是，搞出一个奥妙重重的 $\mathscr F$ 使得 $\mathscr F(G)$ 和 $F(G)$ 的前 $n$ 项相同，而且 $\mathscr F$ 是 $n$ 次多项式。

构造方法是：考虑 $F$ 在 $c=[x^0]G$ 处的泰勒展开，并将 $x=G$ 代入其中
$$
F(G)=\sum_{k\ge 0}F^{(k)}(c)\dfrac{(G(x)-c)^k}{k!}
$$
我们惊喜地发现，由于 $G(x)-c$ 没有常数项，上式的 $k>n$ 部分可以直接忽略。不仅如此，还可以发现，只要对于 $0\le k\le n$ 总有 $\mathscr F^{(k)}(c)=F^{(k)}(c)$ 就说明这个 $\mathscr F$ 的确是我们想要的。

更近一步：直接取 $\mathscr F=F\bmod(x-c)^{n+1}$。（因为 $(x-c)^{n+1}$ 连续求导 $n$ 次在代入 $c$ 时一直为 $0$。）那么剩下的问题就变成求 $F\bmod(x-c)^{n+1}$ 了。

----

下面我们必须用到 $F$ 的一些具体性质。设 $F$ 是**微分有限**的，即存在一个方程
$$
\sum_{j=0}^mp_j(x)F^{(i)}(x)=0
$$
其中 $p_j$ 皆是次数有限的多项式。代入 $x=x+c$ 得
$$
\sum_{j=0}^mp_j(x+c)F^{(i)}(x+c)=0
$$
可见的是 $\mathscr F(x+c)=F(x+c)\bmod x^{n+1}$ 应该满足一个类似的方程，但是由于它的 $x^{n+1}$ 以上的部分被截掉了，所以我们要强行补偿，这个补偿的部分得手算（悲）。

然后也就得到一个 $\mathscr F(x)$ 的微分方程，众所周知微分方程和整式递推有联系，然后就做完了。

（当然这个做法的复杂度肯定和整式递推的阶数有关，但是实际应用中该微分方程的阶数和 $p_j$ 的次数一般都是常数）

# 2. 试看看

## 2.1. 线性插值

取 $G=e^x$，可见 $\mathcal G_k$ 就是多项式 $\sum_{i=0}^{n}\frac{a_ix^i}{i!}$ 在 $x=k$ 处的点值。再取 $F=x^m$，所欲求的就是 $x=m$ 处的点值。

$F$ 显然遵从微分方程
$$
mF=xF'
$$
那么对于 $\mathscr F(x+1)=(x+1)^m\bmod x^{n+1}$，它遵从
$$
m\mathscr F(x+1)=(x+1)\mathscr F'(x+1)+m{m-1\choose n}x^n
$$
其中 $m{m-1\choose n}x^n$ 是人工硬算出来的（观察 $[x^n]$ 容易算出）。然后就可以递推了。

# 2.2. 如何优雅地求和

仍取 $G=e^x$，取 $F=(ax+(1-a))^m$。

$F$ 遵从微分方程
$$
maF=(ax+(1-a))F'
$$
对于 $\mathscr F(x+1)=(ax+1)^m\bmod x^{n+1}$ 也就有微分方程
$$
ma\mathscr F(x+1)=(ax+1)\mathscr F'(x+1)+ma^{n+1}{m-1\choose n}x^n
$$
可以递推。

