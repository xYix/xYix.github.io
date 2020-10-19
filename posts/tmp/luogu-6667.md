---
title: luoguP6667 题解 - [清华集训2016] 如何优雅地求和
---

转下降幂然后乱搞组合数显然不够优雅。此处有高妙做法。考虑函数
$$
A(x)=\sum_{i=0}^n{n\choose i}p^i(1-p)^{n-i}x^i=(px+1-p)^n
$$
从而，$A'(1)=np,A^{(2)}(1)=n^{\underline 2}p^2,...,A^{(k)}(1)=n^{\underline k}p^k$。

于是有
$$
\sum_{i=0}^n{n\choose i}p^i(1-p)^{n-i}i^{\underline k}=n^{\underline k}p^k
$$
于是考虑将 $f$ 转成下降幂。假设 $f(x)=\sum_{i=0}^nb_ix^{\underline i}$，则答案为 $\sum_{i=0}^nb_in^{\underline i}p^i$。