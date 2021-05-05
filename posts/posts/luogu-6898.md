---
title: luoguP6898 题解 - Metal Processing Plant
---

> **题目大意.**
>
> 现在有一个 $n\le 200$ 个点的无向完全图，记 $u$ 和 $v$ 之间的边权为 $d(u,v)$。你要把所有点分成两部分 $A,B$，使得 $D(A)+D(B)$ 最小。其中
>
> $$
> D(S)=\max_{u,v\in S}d(u,v)
> $$

有一个自然的观察：

> **观察 1.**
>
> 存在一个划分使得任何一部分中都不存在 $\ge v$ 的边，当且仅当 $\ge v$ 的边必须形成一个二分图。

考虑怎么利用。

> **观察 2.**
>
> 对于某个 $v$ 导出的图，如果所有点都联通了那么划分方案实际上是唯一的；否则可以反转任意一个连通块的颜色。

> **观察 3.**
>
> 枚举 $D$ 较大的部分（不妨为 $A$）的 $D$ 值，考虑 $D(A)+1$ 导出的图。（可以随 $D(A)$ 减小带权并查集维护，暴力一点也没关系）
>
> $D(A)$ 就那样了，能否使得 $D(B)$ 尽量小？
>
> 二分 $D(B)$ 大小，就变成了 2-SAT。

然而这是 $O(n^4\log n)$ 的。（悲）

----

上面的做法非常粗糙，我们要更充分地利用性质。下面这个观察建立了枚举 $D(A)$ 和二分 $D(B)$ 的联系。

> **观察 4.**
>
> 随着 $D(A)$ 增大，反转自由度一定越来越高，于是最小可行 $D(B)$ 一定越来越小。

于是可以双指针，复杂度 $O(n^4)$。

----

然而我们对 2-SAT 模型的分析仍然不够。

> **观察 5.**
>
> 可见的是这个 2-SAT 的图相当稠密，那为什么要老老实实跑 Tarjan 而不能直接 bitset 传递闭包变成 $O(n^2/\omega)$ 呢？
>
> ——因为还要建图啊……不过直接传递闭包确是一个有益的想法。

> **观察 6.**
>
> 然而可见每一次 2-SAT 时 $D(A)$ 和 $D(B)$ 的改动都很轻微，那么它们对图的改动是否也很轻微？
>
> - $D(B)$ 增大：增加可用边。显然轻微。
> - $D(A)$ 减小：合并两个点 $u,v$，其他点到新点的距离为到 $u,v$ 距离的 max。
>
> 后者看起来不好维护，但是，它显然只会合并 $n$ 次啊！暴力重构即可。

于是最终复杂度为 $O(n^4/\omega)$，可以通过。
