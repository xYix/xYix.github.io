---
title: luoguP5155 题解 - [USACO18DEC]Balance Beam P
date: 2020-09-08 17:29:03
tags:
- 概率期望
- 计算几何
---

[题目链接](https://www.luogu.com.cn/problem/P5155)

<!--more-->

好题好题妙啊妙啊

首先显然可以列出

$$
E_i=\max(F_i,\dfrac{E_{i-1}+E_{i+1}}{2})
$$

但是这个东西显然是解不了的。

考虑 $E_i=F_i$ 的点，称为中止点，游走到它上面的时候显然立即停止。

那么非中止点的期望也就只取决于相邻的两个中止点：

$$
E_i=\dfrac{v-i}{v-u}F_u+\dfrac{i-u}{v-u}F_v
$$

系数是经典结论（在数轴上随机游走，到两端停止，到两端分别的概率）

那么一个点是停止点也就等价于

$$
F_i>\dfrac{v-i}{v-u}F_u+\dfrac{i-u}{v-u}F_v
$$

$$
F_i-F_u>\dfrac{i-u}{v-u}(F_v-F_u)
$$

$$
\dfrac{F_i-F_u}{i-u}>\dfrac{F_v-F_u}{v-u}
$$

即 $(i,F_i)$ 在凸包上！