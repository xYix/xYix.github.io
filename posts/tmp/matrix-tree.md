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
T\leftarrow T+x^{\{i\}}\text{exp}\left(\sum_{(i,j)}\sum_{j\in s}x^s[x^s]T\right)
$$
我们只需要验证 $[x^s]T=\text{MatT}(s\ \text{导出的子图})=[x^s]x^{\{1\}}\text{exp}(\sum_{1\notin p}w(p)x^p)$（注意 $w$ 依赖于 $s$！）的确满足上式，即
$$
\begin{aligned}\text{MatT}(s\cup\{i\})&=[x^s]\text{exp}\left(\sum_{(i,j)}\sum_{j\in t,i\notin t}x^t\text{MatT}(t)\right)
\end{aligned}
$$
不妨取等式左边的根为 $i$，即只需验证
$$
\boxed{[x^s]\text{exp}\left(\sum_{p}x^p\begin{cases}deg_p&(|p|=1)\\-1&(p\ \text{is a cycle})\end{cases}\right)=[x^s]\text{exp}\left(\sum_{t}x^t|t\cap deg_i|\text{MatT}(t)\right)}
$$
其中度数均是在 $s\cup\{i\}$ 导出的子图意义下的。这就非常令人惊讶了，堪称离谱。

