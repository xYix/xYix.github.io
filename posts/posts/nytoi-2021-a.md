---
title: NayutanOI2021A 题解 - 星の王子サマ【Star Prince】
---

你可以在[这里](https://www.luogu.com.cn/problem/T172893)提交。

> **题目大意.**
>
> 求有多少对单调不降序列 $\{a\},\{b\}$，满足：
>
> - $b$ 的长度大于等于 $a$；
>
> - $a_i\le b_i$；
>
> - 且 $\{a\}$ 的元素之和加 $\{b\}$ 的元素之和为 $n$。
>
> 答案模 $998244353$。

在开始之前，你需要先了解[杨表和 RSK 算法](https://xyix.gitee.io/posts/?&postname=young-tableau)。

- 下面把各块大小不相同的划分称作不重划分。

- 下面把半标准杨表（**S**emi-**S**tandard **Y**oung **T**ableau）简称为 SSYT。
- 下面把行严格递增而列不降的杨表称作反半标准杨表，简称为 rev-SSYT。
- 下面把行列都不降的杨表称作~~四分之一标准杨表~~平面划分（plane partition）。易见：它可看作是普通的划分的推广。

再给出一些有益的记号：对于杨表 $\pi$，记

- $\text{tr}(\pi)=\sum_i \pi_{i,i}$，$\text{diag}(\pi)=(\pi_{1,1},\pi_{2,2},...)$
- $|\pi|=\sum_{i,j}\pi_{i,j}$。
- $\text{sh}(\pi)$ 为 $\pi$ 的“形状”，即每一行的长度构成的列表。

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
> - **定义域**：所有由两个相同形状的不重划分构成的二元组 $(\lambda,\mu)$。
>
> - **值域**：所有平面划分 $\pi$。
>
> - **具体内容/步骤**：（阅读时请思考每一步的可逆性）
>
> - - 把一个划分 $\lambda=(\lambda_1,\lambda_2,...)$ 看成一个点图，其中第 $i$ 行有 $\lambda_i$ 个点。再在第 $i$ 行前敲 $i-1$ 格缩进。
>
>   - $\mu$ 与之相同，但在此之后要反转其行和列。
>
>   - <div style="width:50%;margin:auto"><img src="https://xyix.gitee.io/images/youngtable2.png" alt=""></div>
>
>   - 然后叠合它们的左 / 上边缘。
>   
>   - <div style="width:50%;margin:auto"><img src="https://xyix.gitee.io/images/youngtable3.png" alt=""></div>



