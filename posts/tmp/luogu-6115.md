---
title: luogu6115 题解 - 【模板】整式递推
---

[题目链接](https://www.luogu.com.cn/problem/P6115)

给出一个递推
$$
\sum_{i=0}^ma_{n-i}P_i(n)=0
$$
求 $a_n$。数据范围 $m,d\le 7$（其中 $d$ 是 $P$ 的次数），$n\le 6\times 10^8$。

为了防止对 $P_0(i)$ 求逆（这导致递推系数从多项式变为有理函数，比较痛苦），我们考虑求 $a_n\prod_{i=m}^nP_0(i)$。我们有
$$
\begin{bmatrix}a_{n-1}\prod_{i=m}^{n-2}P_0(i)\\a_{n-1}\prod_{i=m}^{n-1}P_0(i)\\\vdots\\a_{n-m}\prod_{i=m}^{n-1}P_0(i)\end{bmatrix}\times
\begin{bmatrix}0&0&...&0&0&-P_m(n)\\P_0(n)&0&...&0&0&-P_{m-1}(n)\\0&P_{0}(n)&...&0&0&-P_{m-2}(n)\\...&...&...&...&...&...\\0&0&...&0&P_{0}(n)&-P_{1}(n)\end{bmatrix}=
\begin{bmatrix}a_{n}\prod_{i=m}^nP_0(i)\\a_{n-1}\prod_{i=m}^nP_0(i)\\\vdots\\a_{n-m+1}\prod_{i=m}^nP_0(i)\end{bmatrix}
$$
这是显然容易验证的。

记中间那个矩阵为 $M(n-m)$。从而我们就是要求 $\prod_{i=0}^{n-m}M(i)$。