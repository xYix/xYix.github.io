---
title: NayutanOI2021A 题解 - レグルス【Regulus】
---

你可以在[这里](https://www.luogu.com.cn/problem/T172891)提交。

> **题目大意.**
>
> 求两类斯特林数第 $n$ 行第 $k$ 列的奇偶性。
>
> $n,k\le 2^{(10^6)}$。

# 2. 第二类 - 生成函数

众所周知，
$$
\sum_{n\ge 0}\begin{Bmatrix}n\\k\end{Bmatrix}x^n=\dfrac{x^k}{(1-x)(1-2x)...(1-kx)}
$$
模 $2$ 即为 $\dfrac{x^k}{(1-x)^{\lceil k/2\rceil}}$，发现是个组合数。

# 1. 第一类 - 生成函数

众所周知，
$$
\sum_{k=0}^n\begin{bmatrix}n\\k\end{bmatrix}x^n=x(x+1)...(x+k-1)
$$
模 $2$ 即为 $x^{\lceil k/2\rceil}(1+x)^{\lfloor k/2\rfloor}$。

