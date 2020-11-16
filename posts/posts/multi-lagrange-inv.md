---
title: 多元拉反和矩阵树定理
---

参考资料：

[1] [A Multivariate Lagrange Inversion Formula for Asymptotic Calculations](https://www.researchgate.net/publication/2313679_A_Multivariate_Lagrange_Inversion_Formula_for_Asymptotic_Calculations)

[2] [Multivariable Lagrange Inversion, Gessel-Viennot Cancellation, and the Matrix Tree Theorem](https://uwaterloo.ca/math/sites/ca.math/files/uploads/files/gkulkjcta1997.pdf)

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

# 从集合幂级数到矩阵树定理

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

x义x 试图搞这个东西搞了三天但并没有效果。其实这是因为我们持有的工具并不足以推出它。下面我们有请——

# 多元拉格朗日反演

下面把 $m$ 维向量 $(x_1,x_2,...,x_m)$ 记为 $\mathbf m$。原谅 x义x 对它的滥用，因为滥用实在是太香了。

现有一列形式幂级数 $f_1(\mathbf x),f_2(\mathbf x),...,f_m(\mathbf x)$，它们满足下面的方程组
$$
f_i=x_ig_i(\mathbf f)
$$
那么我们有
> **多元拉格朗日反演**.
> $$
> \boxed{[\mathbf t^{\mathbf n}]h(\mathbf f(\mathbf t))=[\mathbf x^{\mathbf n}]h(\mathbf x)\cdot\prod\mathbf g^{\mathbf n}(\mathbf x)\cdot\text{det}\left(I-\dfrac{x_i}{g_j(\mathbf x)}\dfrac{\part g_j(\mathbf x)}{\part x_i}\right)}
> $$

行吧，我们没去找行列式，行列式却自己找上门了。

我们暴力展开行列式。中间过程不表，类似之前对矩阵树定理的证明，只有一个观察是 $[\mathbf x^{\mathbf n}]\dfrac{n_i}{x_i}=[\mathbf x^{\mathbf n}]\dfrac{\part}{\part x_i}$。这得到一个有趣的新形式
> **多元拉格朗日反演：内向树形式.**
> $$
> \boxed{[\mathbf t^{\mathbf n}]h(\mathbf f(\mathbf t))=\dfrac{1}{\prod\mathbf n}[\mathbf x^{\mathbf n - 1}]\sum_{\mathcal T}\dfrac{\part(h,\mathbf g^{\mathbf n})}{\part \mathcal T}}
> $$
> 其中 $\mathcal T$ 是完全图 $[0..m]$ 的所有以 $0$ 为根的内向树，而
> $$
\dfrac{\part \mathbf f}{\part G}:=\prod_{j=0}^m\left(\prod_{(i,j)\in G}\dfrac{\part}{\part x_i}\right)f_j
> $$

我们给出对内向树形式的一个**组合解释**。证明了内向树形式也就证明了原来的形式，因为中间的推导都是可逆的。



还有一个奇妙的扩展。

> **多元拉格朗日反演：主子式形式.**
> $$
> \boxed{\left[\dfrac{\mathbf t^{\mathbf n}}{\prod\mathbf n!}\right]h(\mathbf f(\mathbf t))\det\left(t_j\dfrac{\part f_i}{\part t_j}\right)_\alpha=\\
> \qquad \left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]h(\mathbf x)\cdot\prod\mathbf g^{\mathbf n}(\mathbf x)\cdot\prod_{k\in\alpha}x_k\cdot\text{det}\left(I-\dfrac{x_j}{g_i}\dfrac{\part g_i}{\part x_j}\right)_{\overline\alpha}}
> $$
> 其中 $\det \alpha$ 表示仅留下原矩阵的 $\alpha$ 中的行列的子矩阵（**主子式**）的行列式。$\overline \alpha$ 表示 $\alpha$ 的补。

接下来，我们给出一个对这个主子式形式的**组合解释**。

先扔出一大坨定义：

- 令 $V(\mathbf n)=\{(i,j):1\le i\le m,1\le j\le n_i\}$，说人话就是有 $m$ 种颜色的点，第 $i$ 种颜色的有 $n_i$ 个。
- 记 $V_0(\mathbf n)=\{0\}\cup V(\mathbf n)$，称这个新加的 $0$ 节点的颜色为 $0$。

- 记 $M_i:=(i,n_i)$。

上面是点集的符号，下面定义 $\text{funcional digraph}$。

- $\text{functional digraph}$ 是一种有向图，每个点有且仅有一条出边，这个图对应一个函数 $F$：边 $(a,b)$ 意味着 $F(a)=b$。
- 记 $\mathcal F_0(\mathbf n)$ 是从 $V(\mathbf n)$ 到 $V_0(\mathbf n)$ 的 $\text{funcional digraphs}$ 构成的集合，也就是说这个函数的定义域为 $V(\mathbf n)$，到达域为 $V_0(\mathbf n)$。容易发现 $\mathcal F_0(\mathbf n)$ 中的函数是由一个包含 $0$ 的内向树和一些内向基环树构成的。
- 而 $\mathcal A_0(\mathbf n)$ 是其中的以 $0$ 为根的内向树（又出现了）的集合。

接下来定义权值。

- 对于某个 $D\in\mathcal F_0(\mathbf n)$，其中的节点 $v$ 的权值 $w_D(v)$ 定义如下：令 $j_l$ 为颜色为 $l$ 的，映射到 $v$ 的节点数量，则

- $$
  w_D(v)=\begin{cases}g_{i,\mathbf j}&(v\neq 0)\\H_{\mathbf j}&(v=0)\end{cases}
  $$

- 其中 $g_{i,\mathbf j}$ 是 $g_i$ 的系数，$H_{\mathbf j}$ 亦如此。

- 定义 $\Psi(D)=\prod w_D(v)$。

这时我们可以立即解释 $f_i$：考虑一个各颜色的点数目无限的图，以某个颜色为 $i$ 的点为根的内向树集合的生成函数 $\hat f_i$ 满足
$$
\hat f_i=x_i\sum_{\mathbf j}g_{i,\mathbf j}\prod_{l=1}^m \hat f_l^{j_l}=x_ig_i(\hat {\mathbf f})
$$
正是我们最开始提到的方程组。