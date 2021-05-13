---
title: RSK 算法对称性的一个证明
---

EC 7.13 翻译。老汉化组了。

> **定理.  (The Symmetry of the RSK Algorithm)**
>
> 现有一个矩阵 $A$。
>
> <span style="color: #ea6965">如果 $A\xrightarrow{RSK}(P,Q)$，那么 $A^T\xrightarrow{RSK}(Q,P)$。</span>

首先考虑标准杨表的情形，即 $A$ 中元素只有 $0/1$。

我们将要在 $A$ 上定义一个 **Growth Diagram**。

首先我们直接把 $A$ 画出来，然后所谓 Growth Diagram 就是在每个格点上写一个划分，不过当然要遵从一定的规则，等下再细说。

（下图中最下角是第一行第一列。）

<div style="width:40%;margin:auto"><img src="https://xyix.gitee.io/images/ec-chapter-701.png" alt=""></div>

规则如下：

- 对于某格点 $\rho$，令它对应的划分（记为 $G(\rho)$）被它左下方的 $X$ 集合完全确定。
- 且 $|G(\rho)|=|X(\rho)|$。特别地，如果 $X(\rho)=\varnothing$ 那么立即令 $G(\rho)=\varnothing$。
- 且如果 $X(\rho)\subseteq X(\upsilon)$，那么 $G(\rho)\subset G(\upsilon)$（即，$\forall i,G(\rho)_i\le G(\upsilon)_i$）。

更进一步地，有一个详细的递推：

- 如果该格点 $(i,j)$ 左下的格子有 $X$，那么显然 $G(i-1,j)=G(i-1,j-1)=G(i,j-1)$。令 $G(i,j)$ 是它们在首位 $+1$ 的结果。
- 否则当前格子没有 $X$。
- - 如果 $G(i-1,j)=G(i-1,j-1)=G(i,j-1)$，即没有任何 $X$，服从最开头的规则。
  - 如果 $G(i-1,j)\neq G(i,j-1)$，即有一个或者两个"不兼容"的 $X$，那么令 $G(i,j)=G(i-1,j)\cup G(i,j-1)$。
  - 如果 $G(i-1,j)=G(i,j-1)$，即有两个"兼容"的 $X$。设 $*$ 是 $G(i-1,j),G(i,j-1)$ 和 $G(i-1,j-1)$ 相比 $+1$ 的位置，那么令 $G(i,j)$ 是 $G(i-1,j),G(i,j-1)$ 在 $*+1$ 号位置 $+1$ 的结果。

----

现在考虑 Growth Diagram 上的第 $n$ 行和第 $n$ 列。

以第 $n$ 行为例，显然 $G(n,i-1)\subset G(n,i)$。

我们构造一个标准杨表：在 $G(n,i)$ 和 $G(n,i-1)$ 相比新增的那个格子上写上 $i$。我们称这个杨表被划分链 $G(n,0)\subset G(n,1)\subset\ldots\subset G(n,n)$ **encode**。

下面来到本文的核心结论：

> **定理.**
>
> $A$ 的 Growth Diagram 的第一列 encode 了 $P$，第一行 encode 了 $Q$。
>
> （注意到上面的递推是行列对称的，于是可以推出 the symmetry of the RSK）

