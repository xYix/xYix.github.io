---
title: luoguP4775 题解 - 【NOI2018】情报中心
---

> 这个样例，无疑是善良的出题人无私的馈赠。大量精心构造的 $n\le 100, m\le 200$ 的测试数据，涵盖了测试点中所有出现性质的组合。你可以利用这个测试点，对自己的程序进行全面的检查。足量的数据组数、不大的数据范围和多种多样的数据类型，能让程序中的错误无处遁形。出题人相信，这个美妙的样例，可以给拼搏于 AC 这道题的逐梦之路上的你，提供一个有力的援助。

2018 真是毒瘤的一年……

> **题目大意.**
>
> 给出一棵带边权树 $T$ 和 $m$ 条链，每条链有一个非正权值。
>
> 你要选出两条有交的链，使得：这两条链本身的权值加至少被其中一条链覆盖的边权之和最大。
>
> $|T|\le 5\times10^4,m\le 10^5$。多测，$\sum |T|\le 10^6,\sum m\le 2\times 10^6$。

根据部分分的提示，分讨两种情况：两条链的最高点相同和不同。

下面记：不考虑有交时单独一条链 $i$ 的贡献为 $w_i$，最高点为 $p_i$。

# 1. LCA 不同

下面是最典型的情况：

<div style="width:40%;margin:auto"><img src="https://xyix.gitee.io/images/luogu-4775-1.png" alt=""></div>

可见，$X$ 点是最关键的点。下面写出一些事实：

- 这种方案的贡献为 ${\color{red}w}+{\color{blue}w}-{\color{grey}\text{dep}(X)}+\max({\color{red}\text{dep}(p)},{\color{blue}\text{dep}(p)})$。
- 这种方案实际存在，当且仅当
- $\color{red}p$ 不在 $X$ 的子树（不包括 $X$）中；$\color{blue}p$ 亦然。
- - 换句话说，$\color{red}u,v$ 不在 $X$ 的同一个分支中；$\color{blue}u,v$ 亦然。
- $\color{red}u$ 不和 $\color{blue}u$ 在 $X$ 的同一个分支中。

自然能有一个合并子树的大致想法。可是怎么合并？自然会往分治上去想，其实再冷静一下就能想到**线段树合并**。剩下的工作已经显然了。

# 2. LCA 相同

当然我们要枚举 LCA。易见每个 LCA 对应的链是有限的，自然考虑到虚树。

<div style="width:40%;margin:auto"><img src="https://xyix.gitee.io/images/luogu-4775-2.png" alt=""></div>

我们不可能枚举两个 $X$，但是枚举一个 $X$ 也能完成任务，具体来说：

- 这种方案的贡献为 ${\color{red}w}+{\color{blue}w}-{\color{grey}\text{dep}(X)}-\text{dep}(\text{LCA}({\color{red}v},{\color{blue}v}))+{\color{grey}2\text{dep}(\text{LCA})}$。
- - [众所周知](https://www.luogu.com.cn/problem/P4220)，如果你在树论题中见到了 $-\text{dep}(\text{LCA}({\color{red}v},{\color{blue}v}))$，一定要记得把它转化为**最远点对**。
  - 具体来说，在 $\color{blue}v$ 下面挂一个 ${\color{blue}(v,v')}=2{\color{blue}w}-{\color{blue}\text{dep}(v)}$ 即可。不过实际上就没必要把它建出来了。
- 剩下只要考虑两个 $u$ 分别在 $x$ 的两个分支，强行合并即可。（因为这回不会有 $u,v$ 同时出现导致要删的情况了）

# 3. 瑇🐎实现

毒瘤

数据结构能不能去死啊😅

```cpp

```

