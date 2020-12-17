---
title: luoguP5291 题解 - [十二省联考2019]希望
---

> 现在我所谓希望，不也是我自己手制的偶像么？

> **题目大意.** 
>
> 给出一个 $n$ 个节点的树 $T$。
>
> 称 $T$ 的某连通子集 $S$ 的 $\mathbf L$ **- 收缩** $\text{P}_L(S)$ 是 $\{u|u\in S\land\forall v\in S,d(u,v)\le L\}$，其中 $L$ 是一个给定的常量。
>
> 求有多少长度为 $k$ 的连通子集有序列表 $\{S_i\}$，使得所有 $S_i$ 的 $L$ - 收缩的交非空。
>
> $n\le 1\text{e}6,k\le 10$。

### 容斥

可见“交非空”非常难以处理。我们观察到连通子集的 $L$ - 收缩仍是一个连通子集，故它们的交也是一个连通子集。

我们使用一个**容斥**：任何树的*点数* - *边数* = 1，从而我们转而考虑钦定 $u$ 并求“有多少长度为 $k$ 的连通子集有序列表 $\{S_i\}$，使得 $u$ 属于所有 $S_i$ 的 $L$ - 收缩”。

### 暴力 DP

可见让复杂度不依赖于 $L$ 是非常困难的。根据 x义x OI 比赛第一定律：如果有困难，那就不要克服。所以我们先考虑一个复杂度依赖于 $L$ 的 DP。

令
$$
f_{u,l}:=\sum_{S\subset T_u}[u\in\text{P}_l(S)]\\
g_{u,l}:=\sum_{S\subset (T/T_u)\cup\{u\}}[u\in \text{P}_l(S)]
$$
其中 $T_u$ 是 $u$ 的子树。有 DP
$$
\boxed{f_{u,l}\leftarrow \prod_{(u,v)}({f_{v,l-1}\color{red}+1})\\
g_{u,l}\leftarrow 1+g_{fa,l-1}\color{blue}\prod_{(fa,v),v\neq u}(f_{v,l-2}+1)\\
\text{ans}\leftarrow\text{ans}+f_{u,L}^k\left(g^k_{u,L}-(g_{u,L}-1)^k\right)}
$$
注意对 $\text{ans}$ 的贡献中，$g^k_{u,L}$ 是钦定 $u$ 的情况，$(g_{u,L}-1)^k$ 的贡献是钦定 $(fa,u)$ 的情况。

得到一个 $O(nL)$ 做法。

### 长链剖分 : part f

首先 $f$ 的这个转移方程长得就很像[经典的长链剖分优化转移](https://xyix.gitee.io/posts/?page=2&postid=61)。处理 $\color{red}+1$ 只需要打一个**加法标记**。

但真正的问题在于 $f_v$ 其实是**无限长**的。对复杂度的直观影响是每一次合并儿子都要付出 $\text{mdep}(u)$ 的代价，于是长链剖分就炸了。

真正合理的方法应该是：注意到后面的部分虽然无限长但是全等于 $f_{v,\text{mdep}(v)}$，于是给整个数组打一个 $f_{v,\text{mdep}(v)}$ 的**乘法标记**，然后把前面的部分大力乘上 $f_{v,\text{mdep}(v)}$ 的逆元。如果 $f_{v,\text{mdep}(v)}$ 为 $0$ 的话，打一个“从这个下标往后全是 $0$”的标记。

求逆元看似会多一个 $\log$，但是由于 $f_{v,\text{mdep}(v)}$ 这个东西本身的特殊性，可以较快的**预处理**出它们的值，然后用那个**离线线性求逆元**的 trick。

### 长链剖分 : part g

可以发现的是这长得像是一个**反向的长链剖分**。我们来一个一个列举其中的困难。

- $g$ 需要使用 $f$

显然我们应该完全算出 $f$ 再回到 $g$，但是长链剖分会重复利用 $f$ 数组导致它被改得面目全非。看似这要求我们支持**持久化**，但是考虑到 $g$ 的求解完全是 $f$ 的逆过程（至少在任意一条具体长链上是如此），从而我们只需要支持**回退化**就可以了。幸运的是加法和乘法和后缀赋零（这东西直接可逆的原因是，这段后缀原来总是同一个值）都直接可逆，从而只需要保存一个操作栈，逆过来操作即可。

- 具体如何反向长链剖分

首先我们可以把 $g$ 遗传给重儿子。对于轻儿子，即使是 $u$ 最深的后代节点最多也只会用到 $g_{fa,L-\text{mdep}(u)-1}$，直接暴力遗传给它们。

至于 $\color{blue}\prod_{(fa,v),v\neq u}(f_{v,l-2}+1)$，用到 $g$ 的时候直接贴上去就行了。

### 总结

忽然觉得关于这题的标程 800 行的确有些合理……

[~~高质量好代码~~](https://loj.ac/s/405238)