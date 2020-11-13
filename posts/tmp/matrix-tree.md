---
title: 从集合幂级数到矩阵树定理
---

在此之前，我们需要先深刻地理解矩阵树定理。

# 矩阵树定理的组合解释

考虑某矩阵 $(a_{i,j})$ 的行列式，它是
$$
\text{Det}=\sum_p\text{sgn}(p)w(p)
$$
其中 $p$ 是任意置换，$w(p)=\prod_{i} a_{i,p_i}$。我们考虑它的循环分解

$$
\text{Det}=\sum_{}[\cup q_i=[1..n]][\forall i,j,q_i\cap q_j =\varnothing]\prod_i\text{sgn}(q_i)w(q_i)
$$

可以看到其中的 sigma 枚举了所有并为 $[1..n]$ 的无序列表 $\{q_i\}$。

在基尔霍夫矩阵中，它的行为是这样的：$w$ 不为 $0$ 的 $q$ 要么是单点，权值为该点的度数，要么体现为原图中的一个环，权值为 $(-1)^{|q|}$。而我们知道对于循环 $q$，$\text{sgn}(q) =(-1)^{|q|-1}$，从而有

$$
\text{Det}=\sum[\cup q_i=[2..n]][\forall i,j,q_i\cap q_j =\varnothing]\prod_i\begin{cases}deg_{q}&(|q|=1)\\-1&(q\ \text{is a cycle in}\ G)\end{cases}
$$

我们默认去掉的是第一行和第一列。这个东西有一个精妙的解释。

- 首先，为每个 $2..n$ 的点随机选一个父亲，这解释了度数的出现；
- 这时显然会有环，那么我们把环给容斥掉即可，无环的情况就是生成树。这解释了系数 $-1$。

去掉第一行第一列正代表了选取一个根。这也解释了为什么如果不去掉第一行第一列，基尔霍夫矩阵的行列式为 $0$，因为这时不论怎么选总存在一个环。

# 正论

首先声明：我们必须避免“集合幂级数方法算的是生成树个数，矩阵树定理算的也是生成树个数，所以它们相等”和类似的逻辑，否则讨论会变得没有意义。

考虑生成树如何用集合幂级数表达。只需要对 $i$ 取遍 $[1..n]$ 进行迭代
$$
T\leftarrow T+x^{\{i\}}\text{exp}\left(\sum_{(i,j)}\sum_{j\in s}[x^s]T\right)
$$
我们只需要验证 $[x^s]T=\text{Det}(s\ \text{导出的子图})$ 的确满足上式，即
$$
\begin{aligned}\text{Det}(s\cup\{i\})&=[x^s]\text{exp}\left(\sum_{(i,j)}\sum_{j\in t}x^t\text{Det}(t)\right)\\
&=[x^s]\text{exp}\left(deg_i\sum_{t}x^t\text{Det}(t)-\sum_{(i,j)}\sum_{j\notin t}x^t\text{Det}(t)\right)
\end{aligned}
$$
看起来比较难处理，我们使用一个 $\text{FWT}$ 变换，并记 $\text{FWT}$ 后的 $\text{Det}$ 为 $\mathbf{Det}$。
$$
[x^{s\cup\{i\}}]\mathbf{Det}=[x^s]\mathbf{Det}+\text{exp}\left(deg_i[x^s]\mathbf{Det}-\sum_{(i,j)}[x^{s/\{j\}}]\mathbf{Det}\right)
$$
稍微合适了一些，但是 $\text{exp}$ 的出现仍然令人迷惑。

根据上面的讨论，我们知道
$$
\text{Det}(s)=[x^s]\text{exp}\left(\sum_{i\in s, j\in s, (i,j)}\left(x^{\{i\}}+x^{\{j\}}\right)-\sum_{|p|\ge 2}[p\ \text{is a cycle in}\ s]\right)
$$
此处的核心障碍在于，$\text{exp}$ 里面的内容依赖于 $s$，从而我们不能简单地认为 $[x^s]\mathbf{Det}=\text{exp}(*)$。