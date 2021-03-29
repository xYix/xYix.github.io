---
title: luoguP7440 题解 -「KrOI2021」Feux Follets
---

明眼人都看得出来你做这种题其实就是在划水，但是【】偏偏就会觉得你非常努力！！！

# 1. 简单的问题

> **题目描述.**
>
> 给定 $n$。设 $\text{cyc}(\pi)$ 是置换 $\pi$ 的循环数。给定 $k$ 阶多项式 $F$，你要求出
> $$
> \sum_{\pi}F(\text{cyc}(\pi))
> $$
> 其中 $\pi$ 遍历了所有 $n$ 阶错排。
>
> $n,k\le 10^5$。

检测到关键词：多项式、点值。启动 一般多项式转下降幂 协议。下面认为
$$
F(x)=\sum_{i=0}^kf_i{x\choose k}
$$
那么考虑计算
$$
\sum_{\pi}{\text{cyc}(\pi)\choose k}
$$
自然写出 GF：
$$
\exp((1+y)(-x-\ln(1-x))
$$
下面记为 $G$。而最终要求的就是
$$
\sum_{i=0}^{k}f_k[y^k]G
$$
你会发现这东西用常规方法没法算，于是先考虑一个简单的问题。

考虑求
$$
[x^k]G
$$
对 $G$ 求偏导易得
$$
\dfrac{\part}{\part x}G=\dfrac{x(1+y)}{1-x}G
$$
即，
$$
\dfrac{k+1}{1+y}[x^{k+1}]G=\sum_{i=0}^{k-1}[x^{i}]G\\
[x^k]G=\dfrac{k-1}{k}[x^{k-1}]G+\dfrac{y+1}{k}[x^{k-2}]G
$$
那么显然地，我们记
$$
A_i=\begin{bmatrix}\dfrac{i-1}{i}&\dfrac{y+1}{i}\\1&0\end{bmatrix}
$$
于是有
$$
\boxed{G=\sum_{i=0}^{\infty}x^i\left(A_iA_{i-1}...A_1\begin{bmatrix}1\\0\end{bmatrix}\right)_{00}}
$$

# 2. 困难的问题

> **题目描述.**
>
> 设 $\text{cyc}(\pi)$ 是置换 $\pi$ 的循环数。给定 $k$ 阶多项式 $F$，你要对 $1\le n\le L$ 求出
> $$
> \sum_{\pi}F(\text{cyc}(\pi))
> $$
> 其中 $\pi$ 遍历了所有 $n$ 阶错排。
>
> $L,k\le 10^5$。

试图直接按和 $[x^k]$ 一样的方法解 $[y^k]$ 的尝试必然会失败，究其原因是因为 $\frac 1{1-x}$ 比较简单，很容易就转化掉了，而 $\ln$ 比它要麻烦很多。

回忆一下之前的递推，它其实蕴含了
$$
[x^{k1}y^{k2}]G=\dfrac{k_1-1}{k_1}[x^{k1-1}y^{k2}]G+\dfrac 1{k_1}[x^{k1-2}y^{k2}]G+\dfrac{1}{k_1}[x^{k1-2}y^{k2-1}]G
$$
不妨把这看成是一个四维的超矩阵 $\mathcal A$，也就是说
$$
G=\mathcal AG+\mathbf e
$$
其中 $\mathbf e$ 是一个只有 $00$ 处有 $1$ 的超列向量，而不是乘法单位元 $\mathcal 1_{x_1y_1x_2y_2}=[x_1=x_2][y_1=y_2]$。于是，
$$
G=\dfrac{\mathbf e}{\mathcal 1-\mathcal A}=\sum_{i=0}^{\infty}\left(\mathcal A^i\right)_{00**}
$$
而若欲求 $[y^k]$，其实就是把 $\mathcal A$ 换成它的“反转”（**请注意这里不是转置！这里是反转了 $x$ 维和 $y$ 维，而不是反转了 $x_1y_1$ 和 $x_2y_2$！**具体来说， $\mathcal A^R_{x_1y_1x_2y_2}=\mathcal A_{y_1x_1y_2x_2}$）。

而我们已经知道
$$
\sum_{i=0}^{\infty}\left(\mathcal A^i\right)_{00**}=G=\sum_{i=0}^{\infty}x^i\left(A_iA_{i-1}...A_1\begin{bmatrix}1\\0\end{bmatrix}\right)_{00}
$$
两边的超矩阵同时“反转”，反映在它的投影：普通矩阵上就是转置。于是
$$
\boxed{G=\sum_{i=0}^{\infty}y^i\left(\begin{bmatrix}1&0\end{bmatrix}A^T_1A^T_{2}...A_i^T\right)_{00}}
$$
发现自己不会普通多项式转下降幂，代码鸽了。