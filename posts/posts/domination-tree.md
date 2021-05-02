---
title: 支配树通俗演义
---

# Part 1 - 什么是支配树

现在有一个有向图 $G$。

首先定义<span style="color: #1a5a40">**支配关系**</span>。

<span style="color: #36c48e">如果 $1$ 到 $u$ 的路径都必须经过 $v$，那么说 $v$ 支配 $u$。</span>

> **引理 0.**
>
> 把上面定义的路径换为<span style="color: #36c48e">"简单路径"</span>，得到的新定义和原定义是等价的。

> **引理 0 - 证明.**
>
> 显然。完全没有必要走环。

于是现在，如果 $v$ 支配 $u$，则我们可以说 <span style="color: #36c48e">$1\rightarrow u=1\rightarrow v\rightarrow u$</span>。即，$1\rightarrow u$ 的所有路径，是由 $1\rightarrow v$ 的所有路径和 $v\rightarrow u$ 的所有路径"生成"的。

> **引理 1.**
>
> 支配关系具有<span style="color: #1a5a40">**传递性**</span>：<span style="color: #36c48e">如果 $u$ 支配 $v$，$v$ 支配 $w$，那么 $u$ 支配 $w$。</span>

> **引理 1 - 证明.**
>
> $1\rightarrow w=1\rightarrow v\rightarrow w=1\rightarrow u\rightarrow v\rightarrow w$，即 $u$ 支配 $w$。

> **引理 2.**
>
> <span style="color: #36c48e">如果 $u,v$ 都支配 $w$，那么 $u,v$ 不可能不互相支配。</span>

> **引理 2 - 证明.**
>
> 考虑 $1\rightarrow w=1\rightarrow v\rightarrow w$。由于前后两段是独立的，所以 $u$ 至少必定在其中一段出现。（不过显然不可能两段都是。怎么可能有必须走环的路径？）
>
> 下面不妨认为 $1\rightarrow w=1\rightarrow u\rightarrow v\rightarrow w$。又由于 $1\rightarrow w=1\rightarrow v\rightarrow w$，所以
> $$
> 1\rightarrow v=1\rightarrow u\rightarrow v
> $$
> 即原命题。

又考虑到支配关系有显然的自反性和反对称性，故

> **定理 1.**
>
> 支配关系形成一个树形结构，是为<span style="color: #1a5a40">**支配树**</span>。

下面称节点 $u$ 在支配树上的父亲为 $\text{dom}(u)$。

# Part 2 - DFS 树

那么问题就来了，我们从该从哪里掏出"$u\rightarrow w=u\rightarrow v\rightarrow w$"这种关系？如果连一条关系都找不到就不可能进行更多的分析。

首先在原图上引入一个以 $1$ 为根的 DFS 树。

> **引理 4.**
>
> 任取原图的一个 DFS 树。
>
> <span style="color: #36c48e">如果 $\text{dfn}(u)<\text{dfn}(v)$，那么 $u\rightarrow v$ 总是至少经过 $u,v$ 在 DFS 树上的公共祖先中的至少一个。</span>

> **引理 3 - 证明.**
>
> 注意到非树边要么下指要么总是由较大的 $\text{dfn}$ 指向较小的 $\text{dfn}$，于是就显然了。

你会想，$u\rightarrow v$ 是否就一定等于 $u\rightarrow \text{lca}(u,v)\rightarrow v$ 呢？并不是这样，比如下面这个 case：

<center><div style="width:60%;margin:0"><img src="https://xyix.gitee.io/images/domin-1.png" style="width: 70%" alt=""></div></center>



