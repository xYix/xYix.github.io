---
title: luoguP4565 题解 - [CTSC2018]暴力写挂
---

[题目链接](https://www.luogu.com.cn/problem/P4565)

求
$$
\dfrac 12\max_{x,y}\Big(\text{dis}(x,y)+\text{dep}_x+\text{dep}_y-2\text{dep}'_{\text{lca}'(x,y)}\Big)
$$

# 解法 1

考虑边分治，计算跨过边 $e$ 的答案。这把当前分治的点集划为 $e_L$ 和 $e_R$，我们建出它们在 $T_2$ 上的的虚树，让后大力枚举 lca 就好了，一对异子树异色节点对的贡献是 $\text{dis}(x,e)+\text{dep}_x+\text{dis}(y,e)+\text{dep}_y-2\text{dep}_{lca}$，显然可以方便维护。实现得好的话（预 DFS 序排序）就是一只 log 的。

# 解法 2

想不到吧，边分治不仅可以[可持久化](https://codeforces.com/problemset/problem/757/G)还可以合并！

显然，边分治其实是一个几乎和线段树完全一致的结构（但是注意其深度是 $\log_{1.5}n$），从而在它上面整活是很自然的。

比如对于这样一个边分治

<div style="width:70%;margin:auto"><img src="/images/bfz.png" alt=""></div>

就可以表示成这样一个分治树

<div style="width:70%;margin:auto"><img src="/images/bfz_.png" alt=""></div>

那么在上面那个做法中，每个 lca 都有一个“生效的分治树”，有些分治叶子生效有些分治叶子不生效，所有生效的分治叶子就是 lca 在 $T_2$ 中的子树。每个 lca 能贡献的就是所有生效而且不在 lca 的儿子生效的节点对（准确地说是异色节点对，但是这也不甚准确，因为任意节点对会异色一次且仅一次）。看起来这很垃圾，但是这个贡献是和线段树合并完美契合的。具体可以看下面的核心代码。

```cpp
int Merge(int x,int y,int id,ll deplca){
		if(!~x||!~y) return (x==-1?y:x);
		ANS=max(ANS,T[x].maxD[0]+T[y].maxD[1]+BFZ::E[id]->c-2*deplca);
		ANS=max(ANS,T[x].maxD[1]+T[y].maxD[0]+BFZ::E[id]->c-2*deplca);
		T[x].maxD[0]=max(T[x].maxD[0],T[y].maxD[0]);
		T[x].maxD[1]=max(T[x].maxD[1],T[y].maxD[1]);
		T[x].s[0]=Merge(T[x].s[0],T[y].s[0],BFZ::Es[id][0],deplca);
		T[x].s[1]=Merge(T[x].s[1],T[y].s[1],BFZ::Es[id][1],deplca);
		stk[++len]=y;
		return x;
	}
```

# 彩蛋

![](/images/sbxyx6.png)