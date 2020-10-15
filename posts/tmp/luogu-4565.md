---
title: luoguP4565 题解 - [CTSC2018]暴力写挂
---

[题目链接](https://www.luogu.com.cn/problem/P4565)

求
$$
\dfrac 12\max_{x,y}\Big(\text{dis}(x,y)+\text{dep}_x+\text{dep}_y-2\text{dep}'_{\text{lca}'(x,y)}\Big)
$$

# 解法 1

考虑边分治，计算跨过边 $e$ 的答案。这把当前分治的点集划为 $e_L$ 和 $e_R$，我们建出它们在 $T_2$ 上的的虚树，让后大力枚举 lca 就好了。实现好的话（预 DFS 序排序）就是一只 log 的了。

# 解法 2

想不到吧，边分治不仅可以[可持久化](https://codeforces.com/problemset/problem/757/G)还可以合并！

~~感觉还可以整更多奇怪的阴间活~~

