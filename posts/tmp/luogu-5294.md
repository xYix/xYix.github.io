---
title: luogu5294 题解 - P5294 [HNOI2019]序列
date: 2020-09-29 16:24:13
tags:
- 整体二分
- 保序回归
---

[题目链接](https://www.luogu.com.cn/problem/P5294)，参考资料：论文集2018《浅谈保序回归问题》高睿泉

<!--more-->

出论文题的屑出题人给爷爬

# 保序回归问题的定义

$L_p$ 问题的定义如下：

> 给出一张 DAG $G=(V,E)$，每个点 $i$ 有代价 $y_i,w_i$。求点值序列 $f$，满足如果在 $G$ 中有从 $i$ 到 $j$ 的路径（称为 $v_i\preceq v_j$），则必须有 $f_i\le f_j$，并使得
>
> $$
> \begin{cases}\sum_{i=1}^nw_i|f_i-y_i|^p&(1\le p<\infty)\\\max_{i=1}^n w_i|f_i-y_i|&(p=\infty)\end{cases}
> $$
>
> 最小。

## 其他定义

> 将序列 $z$ 中 $\le a$ 的元素变为 $a$，$\ge b$ 的元素变为 $b$，称为把 $z$ 向 $(a,b)$ 取整。