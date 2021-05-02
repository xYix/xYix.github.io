---
title: 支配树通俗演义
---

### Part 1

现在有一个有向图 $G$。

首先定义<span style="color: var(--dark-main-color)">**支配关系**</span>。<span style="color: var(--main-color)">如果 $1$ 到 $u$ 的路径都必须经过 $v$，那么说 $v$ 支配 $u$。</span>

> **引理 0.**
>
> 把上面定义的路径换为"简单路径"，得到的新定义和原定义是等价的。

> **引理 0 - 证明.**
>
> 显然。完全没有必要走环。

> **引理 1.**
>
> 支配关系具有<span style="color: var(--dark-main-color)">**传递性**</span>：如果 $u$ 支配 $v$，$v$ 支配 $w$，那么 $u$ 支配 $w$。

> **引理 1 - 证明.**
>
> 

- 如果 $u,v$ 都支配 $w$，那么不难证明 $u,v$ 不可能不互相支配。

