---
title: luoguP5470 题解 - [NOI2019] 序列
---

> **题目大意.**
>
> 给定两个长为 $n$ 的正整数序列 $a_i,b_i$，你要在每个序列中恰好选定 $K$ 的下标，要求至少有 $L$ 个下标在两个序列中都被指定。你要使得这 $2K$ 个下标对应的元素之和尽量大。
>
> 多测，$n\le 2\times 10^5,\sum n\le 10^6$。

首先建出网络流模型。

- $S\rightarrow u_i:(1,-a_i)$；
- $u_i\rightarrow v_i:(1,0)$，表示相同的下标；
- $v_i\rightarrow T:(1,-b_i)$；
- $u_i\rightarrow X:(1,0),X\rightarrow Y:(K-L,0),Y\rightarrow v_j:(1,0)$，有 $K-L$ 次不相同的机会。

显然直接跑费用流跑不过，但我们可以考虑“手动加速”，即手动模拟求解费用流的过程，在其中用一些数据结构之类的来加速。这就是所谓**模拟费用流**。

于是我们考虑每次使流量 +1。

注意到费用流每次挑的是**任意**的最短路，那么毫无疑问，如果 $XY$ 没有满流则必然先流 $XY$。否则有两个选择：

- 流正常的 $u_i\rightarrow v_i$。
- 退流。考虑某个已通过 $XY$ 流过的 $v_i$ 和一个没被流过的 $v_j$，我们走路径 $S\rightarrow u_i\rightarrow v_i\ {\color{red}\rightarrow}\ Y \rightarrow v_j\rightarrow T$。另一个方向亦然。显然 $i,j$ 的选择是独立的。这个操作的意义非常直接，就不解释了。
- - 如果你操作完发现 $u_j$ 也早就选了，那么你获得一个隐藏操作：退掉 $XY$ 上的一个流量走正常的 $u_j\rightarrow v_j$ 路径。然后立刻把 $XY$ 上的这个流量流掉。

你会发现这不就是所谓反悔贪心吗……其实模拟费用流就是玄学反悔贪心的理论基础。

代码实在是有点![](https://xyix.gitee.io/images/qq/tuu.png)，我先鸽为敬