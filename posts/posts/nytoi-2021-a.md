---
title: NayutanOI2021A 题解 - アンドロメダアンドロメダ【Andromeda Andromeda】
---

由于是第一次出双射题，所以标题用了初投稿曲 Andromeda Andromeda。

你可以在[这里](https://www.luogu.com.cn/problem/T172893)提交。

> **题目大意.**
>
> 现在有一个 $r\times c$ 列的方格，对于 $n$，你要在方格中填入一些自然数，使得
>
> - 每个数都小于等于它右方的数和上方的数，如果存在的话；
>
> - 所有数的和为 $n$。
>
> 你要对所有 $0\le n\le L$ 求填充方案数。答案模 $998244353$。

# 解法 1.

在开始之前，你需要先了解[杨表和 RSK 算法](https://xyix.gitee.io/posts/?&postname=young-tableau)。

- 下面把各块大小不相同的划分称作不重划分。

- 下面把半标准杨表（**S**emi-**S**tandard **Y**oung **T**ableau）简称为 SSYT。
- 下面把行列都不降的杨表称作~~四分之一标准杨表~~平面划分（plane partition）。易见：它可看作是普通的划分的推广。

再给出一些有益的记号：对于杨表 $\pi$，记

- $\text{tr}(\pi)=\sum_i \pi_{i,i}$，$\text{diag}(\pi)=(\pi_{1,1},\pi_{2,2},...)$
- $|\pi|=\sum_{i,j}\pi_{i,j}$。
- $\text{sh}(\pi)$ 为 $\pi$ 的“形状”，即每一行的长度构成的列表。$|\text{sh}(\pi)|$ 为 $\pi$ 的“格子数”。

下面我们来证明一个远强于本题的结论。

> **定理 1.**
> $$
> \sum_{\pi\in\mathcal P(r,c)}q^{\text{tr}(\pi)}x^{|\pi|}=\prod_{i=1}^r\prod_{j=1}^r\dfrac{1}{1-qx^{i+j-1}}
> $$
> 其中 $\mathcal P(r,c)$ 是至多有 $r$ 行，至多有 $c$ 列的所有平面划分。
>
> （当 $r=2,c\rightarrow+\infty$ 时即得到原题。）

下面给出一个优雅而神秘（此处想强调的其实是神秘）的双射证明。首先引入一个辅助双射。

> **双射 1.**
>
> **定义域**：所有由两个相同长度的不重划分构成的二元组 $(\lambda,\mu)$。
>
> **值域**：所有划分 $\xi$。
>
> **具体内容/步骤**：（阅读时请思考每一步的可逆性）
>
> - 把一个划分 $\lambda=(\lambda_1,\lambda_2,...)$ 看成一个点图，其中第 $i$ 行有 $\lambda_i$ 个点。再在第 $i$ 行前敲 $i-1$ 格缩进。
>
> - $\mu$ 与之相同，但在此之后要反转其行和列。
>
> <div style="width:60%;margin:auto"><img src="https://xyix.gitee.io/images/youngtable2.png" alt=""></div>
>
> - 然后叠合它们的左 / 上边缘。
>
> <div style="width:30%;margin:auto"><img src="https://xyix.gitee.io/images/youngtable3.png" alt=""></div>
>
> **性质.**
>
> 易知有：
>
> - $|\xi|=|\lambda|+|\mu|-\text{len}(\lambda)=|\lambda|+|\mu|-\text{len}(\mu)$。

借由这个双射——不妨称之为不重划分的合并——我们可以定义两个 SSYT 的合并。

> **双射 2.**
>
> **定义域**：所有形状相同的 SSYT 构成的二元组 $(P,Q)$。
>
> **值域**：所有平面划分 $\pi$。
>
> **具体内容/步骤**：
>
> - 设杨表 $\tau$ 为：把合并（即**双射 1**，从而这一步是可逆的）$P,Q$ 的每一列的结果作为 $\tau$ 的对应列。不难验证，$\tau$ 是一个平面划分。
> - 把 $\tau$ 的每一行看成划分并转置，结果即为 $\pi$。不难验证 $\pi$ 也是平面划分。
>
> **性质**：
>
> 不难验证以下性质：
>
> - $|\pi|=|P|+|Q|-|\text{sh}(P)|$
> - $\text{diag}(\pi)=\text{sh}(P)=\text{sh}(Q)$，自然也推出 $\text{tr}(\pi)=|\text{sh}(P)|=|\text{sh}(Q)|$。（这个结论可能需要动笔核验。）

两个形状相同的 SSYT，这让你想到什么？正是 RSK 算法。

> **双射 3.（RSK 算法）**
>
> **定义域**：所有形状相同的 SSYT 构成的二元组 $(P,Q)$。
>
> **值域**：所有广义置换矩阵 $A$。
>
> **具体内容/步骤**：RSK 算法，此处不表。
>
> **性质**：
>
> 以下性质都可以直接看出。
>
> - $|P|=\sum_{i,j}ja_{i,j}$。
> - $|Q|=\sum_{i,j}ia_{i,j}$。
> - $|\text{sh}(P)|=|\text{sh}(Q)|=\sum_{i,j}a_{i,j}$。

把**双射 2** 和**双射 3** 连在一起就获得了一个从广义置换矩阵到平面划分的双射，原定理就立即得证了。

对于原题，只需要和[此题](https://loj.ac/p/6077)一样做最后再求逆既可。

# 解法 2.

打开 OEIS 搜索样例中的数列，你就会了！！！

