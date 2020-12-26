---
title: 迫真数论笔记：偏序集计数和莫比乌斯函数
---

定义一个**偏序集**（Partially Ordered SET, poset）是一个对象的集合 $P$ 和一个 $P$ 上的二元关系 $\le_P$ 构成的二元组。且 $\le$ 满足三个性质：

- $t\le t$。（自反性）
- $s\le t\land t \le s\Rightarrow s=t$。（反对称性）
- $s\le t,t\le u\Rightarrow s\le u$。（传递性）

如果对于 $s,t$，有 $s\le t$ 或 $t\le s$，则说 $s,t$ 是**可比的**。否则当然是不可比的。

我们说两个偏序集**同构**，如果存在**保序**双射 $\phi:P\leftrightarrow Q$。一个映射保序是说，这个映射 $\phi$ 满足 $s\le_P t\Leftrightarrow \phi(s)\le_Q \phi(t)$。

一个偏序集 $Q$ 是 $P$ 的**弱子偏序集**，如果 $Q\subseteq P$ 且 $s\le_Q t\Rightarrow s\le_Pt$。如果 $P=Q$（在集合意义上），那么还说 $P$ 是 $Q$ 的一个**精炼**（refinement）。

一个偏序集 $Q$ 是 $P$ 的**诱导子偏序集**（简称**子偏序集**），如果 $Q\subseteq P$ 且 $s\le_Q t\Leftrightarrow s\le_P t$。

> 可见子偏序集是原偏序集的限制，弱子偏序集是在子偏序集的基础上丢掉了一些偏序关系。

一种特殊的子偏序集 $[s,t]$ 被称为**区间**，它们恰由 $\{s\le u\le t,u\in P\}$ 的元素构成。如果再加上 $u\neq s,t$ 的限制便得到开区间。（为了方便，我们把 $\le$ 且不等于直接记为 $<$）

如果 $P$ 中的任何区间皆是有限的，那么称 $P$ 是**局部有限**的。

一个子偏序集被称为**凸**的，如果 $s,t\in Q,u\in P,s< u< t\Rightarrow u\in Q$。显然区间当然是凸的。

想象一个局部有限偏序集，它的 $\le$ 一定总是存在着“最小单位”。严谨地说一个 $t$ **覆盖**了 $s$，如果 $[s,t]=\{s,t\}$（为了防止混淆，我们尽量不用开区间符号）。在局部有限偏序集的情况下，任何 $\le$ 都可以由覆盖链“生成”。

> 我们如此强调局部有限，是因为上述结论在非局部有限集上很可能不成立，更精确地说是*一定不成立*（想象取一个无限的区间，然后不断分割）。可参考类似有理数集或实数集的情形。

一种局部有限偏序集的表示方法是画图，只画出所有的覆盖，覆盖者在被覆盖者的上方。

<div style="width:70%;margin:auto"><img src="https://xyix.gitee.io/images/mobi1.png" alt=""></div>