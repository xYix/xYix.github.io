---
title: det = exp trace ln 和矩阵树定理和多元拉反
---

其中 det 表示行列式，trace 表示矩阵的迹（主对角线元素之和）。

# 1. 如何证明 det = exp trace ln

戚大师说任何矩阵都和某个上三角矩阵相似，于是就显然了。但我不知道为什么任何矩阵都和某个上三角矩阵相似。

# 2. 矩阵树定理和多元拉反的相似性

[请看这里](https://xyix.gitee.io/posts/?page=1&postname=multi-lagrange-inv)

为了方便我们下面只以矩阵树定理为例。也沿用上文的符号。

# 3. 正题

考虑矩阵
$$
M=\left([(i,j)\in G\right]x_i)
$$
显然特定的环 $\rightarrow v_1\rightarrow\ldots\rightarrow v_{\ell}\rightarrow v_1\rightarrow\ldots$ 会被 $\operatorname{trace}M^{\ell}$ 恰好统计 $\ell$ 次，故 $\dfrac{1}{\ell}\operatorname{trace}M^{\ell}$ 统计了所有长度为 $\ell$ 的环。故所有环即为
$$
\sum_{\ell}\dfrac{1}{\ell}\operatorname{trace}M^{\ell}=\text{trace}\sum_{\ell}\dfrac{1}{\ell}M^{\ell}=\operatorname{trace}(-\ln (I-M))
$$

参考之前对矩阵树定理的证明，我们自然有答案即为
$$
[x_1x_2...x_n]\prod_i(1+\text{deg}_ix_i)\cdot\operatorname{exp}\operatorname{trace}\ln(I-M)
$$

$$
=[x_1x_2...x_n]\text{det}((1+\text{deg}_ix_i)([i=j]-[(i,j)\in G]x_i)
$$

这里我们要做一些分析，考虑行列式的定义 $\prod_p\text{sgn}(p)w(p)$ 并注意前面的 $[x_1x_2...x_n]$。

可见 $x_i$ 只能在第 $i$ 行拿到，所以第 $i$ 行贡献的必定不是 $[i=j]$；而且显然也必定不是 $\text{deg}_i[(i,j)\in G]x^2_i$。故上式也可写为
$$
\text{det}(\text{deg}_i[i=j]-[(i,j)\in G])
$$
正是矩阵树定理。