---
title: luoguP6667 题解 - [清华集训2016] 如何优雅地求和
---

转下降幂然后乱搞组合数显然不够优雅。此处有高妙做法。考虑函数
$$
A(x)=\sum_{i=0}^n{n\choose i}p^i(1-p)^{n-i}x^i=(px+1-p)^n
$$
从而，$A'(1)=np,A^{(2)}(1)=n^{\underline 2}p^2,...,A^{(k)}(1)=n^{\underline k}p^k$。

写开就直接得到
$$
\sum_{i=0}^n{n\choose i}p^i(1-p)^{n-i}i^{\underline k}=n^{\underline k}p^k
$$
于是考虑将 $f$ 转成下降幂。假设 $f(x)=\sum_{i=0}^nb_ix^{\underline i}$，则答案为 $\sum_{i=0}^nb_in^{\underline i}p^i$。

那么问题来了下降幂该怎么转呢？我们考虑 $a_i=i^{\underline k}$ 的 EGF
$$
\sum_{i=k}^{\infty}\dfrac{i^{\underline k}x^i}{i!}=x^ke^x
$$
那么我们把 $a_i$ 换成一个多项式 $a_i=\sum_{j}f_ji^{\underline j}$，它的 EGF 就是
$$
e^x\sum_{j}f_jx^j
$$
可以发现这个 $a_i$ 就是多项式 $\sum_{i}f_ix^{\underline i}$ 的点值序列，而题目中已经给了，那么乘以 $e^{-x}$ 即可。

# 不知道放哪，所以放这里好了

**Laplace-Borel** 变换：
$$
\boxed{F(z)=\int_{0}^{+\infty}\hat F(tz)e^{-t}\text{d}t\\\hat F(z)=\dfrac{1}{2\pi}\int_{-\pi}^{+\pi}F(e^{-i\vartheta}z)e^{e^{i\vartheta}}\text{d}\vartheta}
$$
其中 $F$ 是某数列的 OGF，$\hat F$ 是它的 EGF。