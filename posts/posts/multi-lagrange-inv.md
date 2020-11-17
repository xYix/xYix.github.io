---
title: 矩阵树定理和多元拉反
---

参考资料：

[1] [A Multivariate Lagrange Inversion Formula for Asymptotic Calculations](https://www.researchgate.net/publication/2313679_A_Multivariate_Lagrange_Inversion_Formula_for_Asymptotic_Calculations)

[2] [Multivariable Lagrange Inversion, Gessel-Viennot Cancellation, and the Matrix Tree Theorem](https://uwaterloo.ca/math/sites/ca.math/files/uploads/files/gkulkjcta1997.pdf)

[3] [A Bijetive Proof for the Arboresent Form of the Multivariable Lagrange Inversion Formula](http://www.cecm.sfu.ca/~cchauve/Publications/MCS00.ps)

# 0 目录

- 1 矩阵树定理的组合解释
- 2 多元拉格朗日反演
- - 2.1 内向树形式
  - 2.2 多元拉反的组合解释
  - - 2.2.1 基础定义
    - 2.2.2 函数图的概括
    - 2.2.3 树形概括双射定理
    - 2.2.4 结局
  - 2.3 主子式扩展
  - 2.4 主子式扩展的组合解释
  - - 2.4.1 右式的处理
    - 2.4.2 左式的处理

# 1 矩阵树定理的组合解释

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

因为一些奇怪的原因，矩阵树定理和多元拉格朗日反演有着紧密的联系，我们来介绍它。你很快会看到这是为什么。

# 2 多元拉格朗日反演

下面把 $m$ 维向量 $(x_1,x_2,...,x_m)$ 记为 $\mathbf m$。原谅 x义x 对它的滥用，因为滥用实在是太香了。

现有一列形式幂级数 $f_1(\mathbf x),f_2(\mathbf x),...,f_m(\mathbf x)$，它们满足下面的方程组
$$
f_i=x_ig_i(\mathbf f)
$$

那么我们有
> **多元拉格朗日反演**.
> $$
> \boxed{[\mathbf t^{\mathbf n}]h(\mathbf f(\mathbf t))=[\mathbf x^{\mathbf n}]h(\mathbf x)\cdot\prod\mathbf g^{\mathbf n}(\mathbf x)\cdot\text{det}\left(I-\dfrac{x_i}{g_j(\mathbf x)}\dfrac{\partial g_j(\mathbf x)}{\partial x_i}\right)}
> $$

我们暴力展开行列式。中间过程不表，类似之前对矩阵树定理的证明，只有一个观察是 $[\mathbf x^{\mathbf n}]\dfrac{n_i}{x_i}=[\mathbf x^{\mathbf n}]\dfrac{\partial}{\partial x_i}$。这得到一个有趣的新形式

## 2.1 内向树形式

> **多元拉格朗日反演：内向树形式.**
> $$
> \boxed{[\mathbf t^{\mathbf n}]h(\mathbf f(\mathbf t))=\dfrac{1}{\prod\mathbf n}[\mathbf x^{\mathbf n - 1}]\sum_{\mathcal T}\dfrac{\partial(h,\mathbf g^{\mathbf n})}{\partial \mathcal T}}
> $$
> 其中 $\mathcal T$ 是完全图 $[0..m]$ 的所有以 $0$ 为根的内向树，而
> $$
\dfrac{\partial \mathbf f}{\partial G}:=\prod_{j=0}^m\left(\prod_{(i,j)\in G}\dfrac{\partial}{\partial x_i}\right)f_j
> $$

我们给出对内向树形式的一个**组合解释**。

## 2.2 多元拉反的组合解释

### 2.2.1 基础定义

定义我们研究的点集：

- 令 $V(\mathbf n)=\{(i,j):1\le i\le m,1\le j\le n_i\}$，说人话就是有 $m$ 种颜色的点，第 $i$ 种颜色的有 $n_i$ 个。
- 记 $V_0(\mathbf n)=\{0\}\cup V(\mathbf n)$，称这个新加的 $0$ 节点的颜色为 $0$。
- 记 $(i,n_i)$ 为 $M_i$。只是一个代表元素，用于下面的构造。

下面定义**函数图**。

- 函数图是一种有向图，每个点有且仅有一条出边，这个图对应一个函数 $F$：边 $(a,b)$ 意味着 $F(a)=b$。
- 记 $\mathcal F_0(\mathbf n)$ 是从 $V(\mathbf n)$ 到 $V_0(\mathbf n)$ 的函数图构成的集合，也就是说这个函数的定义域为 $V(\mathbf n)$，到达域为 $V_0(\mathbf n)$。容易发现 $\mathcal F_0(\mathbf n)$ 中的函数是由一个包含 $0$ 的内向树和一些内向基环树构成的。
- 而 $\mathcal A_0(\mathbf n)$ 是其中的以 $0$ 为根的内向树（又出现了）的集合。

接下来定义**权值**。

- 对于某个 $D\in\mathcal F_0(\mathbf n)$，其中的节点 $v$ 的权值 $w_D(v)$ 定义如下：令 $j_l$ 为颜色为 $l$ 的，映射到 $v$ 的节点数量，则

- $$
  w_D(v)=\begin{cases}\left[\dfrac{\mathbf x^{\mathbf j}}{\prod\mathbf j!}\right]g_{i}&(v\neq 0)\\\left[\dfrac{\mathbf x^{\mathbf j}}{\prod\mathbf j!}\right]H&(v=0)\end{cases}
  $$

- 定义 $\Psi(D)=\prod w_D(v)$。

这时我们可以立即解释 $f_i$：考虑以某个颜色为 $i$ 的点为根的内向树集合的生成函数 $\hat f_i$ 满足
$$
\hat f_i=x_i\sum_{\mathbf j}g_{i,\mathbf j}\prod_{l=1}^m \hat f_l^{j_l}=x_ig_i(\hat {\mathbf f})
$$

正是我们最开始提到的方程组，即 $\hat f=f$。从而有引理

> **引理 1.**
> $$
> h(\mathbf f(\mathbf t))\ 是\ \mathcal A_0\ 的权值和的指数生成函数。
> $$

### 2.2.2 函数图的概括

接下来我们定义两种对函数图的**概括**（原文为 substructure 子结构，原谅我擅自如此翻译）。

- 对于某个 $T\in \mathcal A_0(\mathbf n)$，它的**路图** $P(T)$ 是一个 $\mathcal F_0(\mathbf 1)$ 图，它如此构造：首先令已经处理的颜色序列为 $\sigma$。

- - 令 $\mu=\max([1..m]/\{\sigma_1 , ...,\sigma_j\}).$ 
  - 找出 $T$ 中的单向路径 $\rho$，它从 $M_\mu$ 延伸到第一个颜色为 $0$ 或其颜色已被处理的节点 $x.$

  - $\rho$ 上有边 $y\rightarrow x$，令离 $M_\mu$ 最近且与 $y$ 同色的节点为 $z$（它当然可以为 $(\mu,n_\mu)$ 自身）。
  - 令 $\sigma_j$ 为 $y$ 的颜色，令 $K_{\sigma_j}=x,F_{\sigma_j}=z$。令 $\pi_{\sigma_j}$ 为 $z$ 到 $y$ 的路径（含）。
  - 在 $P(T)$ 中连边 $\sigma_j\rightarrow \left(K_{\sigma_j} 的颜色\right)$。

- 这里给出一个[例子](https://xyix.gitee.io/images/path-abor.png)。

- 记只保留 $\{0\}\cup\{\sigma_1,...,\sigma_j\}$ 的 $P(T)$ 为 $P^{(j)}(T)$。

- 一个 $\sigma_j$ 是 **rlmax** 的，如果 $\sigma_j=\max(\sigma_j,...,\sigma_m)$。

可见路图的性质是复杂的。我们下面给出它的一些有用的性质。

> **引理 2.** 路图具有以下性质：
>
> - 如果 $\sigma_j$ 是 rlmax 的，那么 $F_{\sigma_j}=M_{\sigma_j}$。否则 $F_{\sigma_j}=K_{\sigma_{j+1}}$。
>
> - $P^{(j)}(T)$ 皆是以 $0$ 为根的内向树，且其最小叶子为 $\sigma_j$。
>
> - $\pi_{\sigma_j}$ 中没有颜色为 $\{0\}\cup\{\sigma_1,...,\sigma_{j-1}\}$ 的节点。

证明不表，因为均可直接由构造过程得出。

- 对于某个 $D\in\mathcal F_0(\mathbf n)$，它的**色图**（草生）$C(D)$ 是一个 $\mathcal F_0(\mathbf 1)$ 图。如果在 $D$ 中存在 $M_i\rightarrow(j,*)$ 则在其色图中连边 $i\rightarrow j$。

这两种概括的意义在于，我们即将通过它们建立一个震撼的双射。先进行一些准备工作：研究一些被称为**保权值**的变换：变换前后两个图的权值相等。

- 首先我们可以交换两个相同颜色节点 $u,v$ 的父亲，称为 **转换 (u,v)**，这显然是保权值的。
- 先选定颜色为 $c$ 的两个节点 $u,v$，其中间有一条有向路径 $\pi$ 自 $u$ 到 $v$。下面这个变换称为 **c - 剥皮**：
- - 从 $v$ 倒回到 $D(u)$，检查出那些颜色为 $c$ 且比迄今为止遇到的所有颜色为 $c$ 的节点标号都大的节点，称为 $w_1,...,w_k$。构造新图 $D'$，其中
  - $D'(u)=D(v),D'(w_k)=D(u),D'(w_{k-1})=D(w_k),...,D'(v)=D(w_1)$
  - $D'$ 就是 $D$ 的 $c$ - 剥皮。
- 显然剥皮是保权值的。

现在我们终于可以给出下面这个定理。

### 2.2.3 树形概括双射定理

> **定理 1.（树形概括双射）**
> $$
> \sum_{A\in\mathcal A_0(\mathbf n),P(A)=T}\Psi(A)=\sum_{D\in\mathcal F_0(\mathbf n),C(D)=T}\Psi(D)
> $$

**证明.** 对于 $P(A)=T$ 的 $A$，对 $j=1...m$，施以下面的变换

- $(j_1)：$$\sigma_j$ - 剥下 $\pi_{\sigma_j}$；
- $(j_2)$：转换 $(M_{\sigma_j},F_{\sigma_j})$；

接下来我们只需要证明：最终得出的图 $D$ 满足 $C(D)=T$，而且这组变换是一个双射。

首先指出，第 $j$ 组变换只会影响颜色为 $j$ 的节点的函数值，又根据引理 2.3，故当第 $j$ 组变换被施行时，$\pi_{\sigma_j}$ 是“完好无损”的。

于是，当 $(j_1)$ 结束，我们有 $D(F_{\sigma_j})=K_{\sigma_j}$，也就是说 $(j_2)$ 结束时 $D(M_{\sigma_j})=K_{\sigma_j}$。从而，最终，$C(D)=T$。

接下来我们展示上面的变换的可逆性。

- 首先，我们的确可以恢复 $\sigma$，只需要重复使用引理 2.2。

- 通过 $D(M_{\sigma_j})=K_{\sigma_j}$ 和引理 2.1，我们可以恢复 $K$ 和 $F$。

- 显然 $(j_2)$ 是可逆的。
- 下面说明 $(j_1)$ 也是可逆的。我们找到图中环上有 $\sigma_j$ 但没有 $\{0\}\cup\{\sigma_1,...,\sigma_{j-1}\}$ 的那些基环树，环上面颜色为 $\sigma_j$ 中标号最大的元素就是原来的 $w$，逆也就显然了。

$\blacksquare$

### 2.2.4 结局

接下来，我们只需要证明

> **引理 3.**
> $$
> \sum_{D\in\mathcal F_0(\mathbf n),C(D)=T}\Psi(D)=\left[\dfrac{\mathbf x^{\mathbf n-\mathbf 1}}{\prod(\mathbf n-\mathbf 1)!}\right]\dfrac{\partial(h,\mathbf g^{\mathbf n})}{\partial T}
> $$
> 

**证明.** 如果不管 $C(D)=T$ 的限制，那么儿子是可以任意选的，只要所有点恰好被作为一次儿子。那么答案即为
$$
\left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]h\cdot\prod\mathbf g^{\mathbf n}
$$

现在考虑 $C(D)=T$。此 $M_i$ 的父亲就被钦定为了某个颜色，那个颜色的生成函数中必须挖去一个 $i$ 的位置留给它，而且标号还必须是 $n_i$，这正是对 $i$ 求偏导。

$\blacksquare$

还有一个奇妙的扩展。

## 2.3 主子式扩展

> **多元拉格朗日反演：主子式扩展.**
> $$
> \boxed{\left[\dfrac{\mathbf t^{\mathbf n}}{\prod\mathbf n!}\right]h(\mathbf f(\mathbf t))\det\left(t_j\dfrac{\partial f_i}{\partial t_j}\right)_\alpha=\\
> \qquad \left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]h(\mathbf x)\cdot\prod\mathbf g^{\mathbf n}(\mathbf x)\cdot\prod_{k\in\alpha}x_k\cdot\text{det}\left(I-\dfrac{x_j}{g_i}\dfrac{\partial g_i}{\partial x_j}\right)_{\overline\alpha}}
> $$
> 其中 $\det \alpha$ 表示仅留下原矩阵的 $\alpha$ 中的行列的子矩阵（主子式）的行列式。$\overline \alpha$ 表示 $\alpha$ 的补。

接下来，我们给出一个对这个主子式扩展的**组合解释**。

## 2.4 主子式扩展的组合解释

直接沿用对普通多元拉反的组合解释。在引理 3 之后，我们已经得到
$$
\sum_{A\in\mathcal A_0(\mathbf n),P(A)=T}\Psi(A)=\sum_{D\in\mathcal F_0(\mathbf n),C(D)=T}\Psi(D)=\left[\dfrac{\mathbf x^{\mathbf n-\mathbf 1}}{\prod(\mathbf n-\mathbf 1)!}\right]\dfrac{\partial(h,\mathbf g^{\mathbf n})}{\partial T}
$$

我们的目的是，对规定的 $k$，对下面这样的 $T$ 求上式的和：$T$ 中存在边 $(k+1,0),...,(m,0)$，这样的 $T$ 的集合称为 $\mathcal J^{(k)}$。显然可以不失一般性地从 $\{k+1,...,m\}$ 扩展到任意集合 $\alpha$。

### 2.4.1 右式的处理

>  **定理 2.** 
> $$
> \sum_{D\in\mathcal F_0(\mathbf n),C(D)\in \mathcal J^{(k)}}\Psi(D)=\\
> \left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]\prod_{i=k+1}^m\dfrac{x_i}{n_i}\cdot\left\{\left(\prod_{i=k+1}^m\dfrac{\partial}{\partial x_i}\right)H(\mathbf x)\right\}\cdot\prod\mathbf g^{\mathbf n}(\mathbf x)\cdot\text{det}\left(I-\dfrac{x_j}{g_i}\dfrac{\partial g_i}{\partial x_j}\right)_{[1...k]}
> $$

**证明.** 只需要对引理 3 运用矩阵树定理即可。还有别忘了 $[\mathbf x^{\mathbf n}]\dfrac{n_i}{x_i}=[\mathbf x^{\mathbf n}]\dfrac{\partial}{\partial x_i}$。

$\blacksquare$

### 2.4.2 左式的处理

接下来，我们介绍 **Gessel - Viennot cancellation**。先对 $A\in\mathcal A_{0}(\mathbf n)$ 引入下面的记号。

- 对于 $j\in[1...m]$，找出 $M_j$ 到 $0$ 的路径，记 $0$ 之前的最后一个点为 $N_j$。记 $M_j$ 到 $N_j$ 的路径为 $\tau_j$。
- 令 $L_i(\tau_j)$ 是 $\tau_j$ 中离 $N_j$ 最近的，颜色为 $i$ 的节点。显然，它可能没有定义。

下面定义一种树集 $\mathcal G^{(k)}$，满足

- 对于 $i=k+1,...,m$，$\tau_i$ 两两不交
- 对于 $i=k+1,...,m$，记 $N_i(A)$ 的颜色为 $\kappa_i(A)$，$\kappa(A)$ 恰好构成 $[k+1...m]$ 的一个排列。

如果还满足下面的条件，则称其属于 $\mathcal R^{(k)}$；否则称其为 $\mathcal U^{(k)}$。

- 对于 $i=k+1,...,m$，$\tau_i$ 中不含颜色大于 $i$ 的节点。这意味着 $\kappa(A)$ 就是 $[k+1...m]$ 本身。

我们认识到，$\mathcal R^{(k)}$ 恰好等于 $A\in\mathcal A_0(\mathbf n),P(A)\in\mathcal J^{(k)}$ 的 $A$ 构成的集合。容易验证。

> **定理 3.**
> $$
> \sum_{A\in\mathcal A_0(\mathbf n),P(A)\in\mathcal J^{(k)}}\Psi(A)=\\
> \left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]\prod_{i=k+1}^m\dfrac{1}{n_i}\cdot\left\{\left(\prod_{i=k+1}^m\dfrac{\partial}{\partial f_i}\right)H(\mathbf f)\right\}\cdot\text{det}\left(x_j\dfrac{\partial f_i}{\partial x_j}\right)_{[k+1...m]}
> $$

**证明.**

首先，我们有
$$
\sum_{A\in\mathcal A_0(\mathbf n),P(A)\in\mathcal J^{(k)}}\Psi(A)=\sum_{A\in\mathcal R^{(k)}}\Psi(A)=\sum_{A\in\mathcal R^{(k)}}\text{sgn}(\kappa(A))\Psi(A)
$$

下面我们来证明
$$
\sum_{A\in\mathcal U^{(k)}}\text{sgn}(\kappa(A))\Psi(A)=0
$$

这其实是一个容斥（也就是所说的 Gessel - Viennot cancellation，其实在 [这篇博客](https://xyix.gitee.io/posts/?page=1&postid=39) 的 LGV 引理一节时我们已经遇到了）。考虑这样一个定义在 $\mathcal U^{(k)}$ 上的映射 $\phi(U)$。

- 令 $\gamma$ 是使得 $\tau_j(U)$ 中存在一个节点颜色大于 $j$ 的最大的 $j$；
- 令 $\beta$ 是 $\tau_j(U)$ 中最大的颜色。
- 对 $U$ 施以转换 $(L_{\beta}(\tau_\beta),L_\beta(\tau_\gamma))$，其结果便是 $\phi(U)$。

可见的是 $\phi$ 保权值，$\phi(\phi(U))=U$，且 $U$ 和 $\phi(U)$ 的 $\text{sgn}(\kappa)$ 相反，从而 $U$ 和 $\phi(U)$ 的贡献抵消了。

综上，我们得到
$$
\sum_{A\in\mathcal A_0(\mathbf n),P(A)\in\mathcal J^{(k)}}\Psi(A)=\sum_{A\in\mathcal G^{(k)}}\text{sgn}(\kappa(A))\Psi(A)
$$

现在考虑对 $\kappa$，$A\in\mathcal G^{(k)},\kappa(A)=\kappa$ 的带符号权值和。容易考虑出它是
$$
\left[\dfrac{\mathbf x^{\mathbf n}}{\prod\mathbf n!}\right]\text{sgn}(\kappa)\cdot\prod_{i=k+1}^m\dfrac{x_i}{n_i}\cdot \left\{\left(\prod_{i=k+1}^m\dfrac{\partial}{\partial f_i}\right)H(\mathbf f)\right\}\cdot\prod_{i=k+1}^m\dfrac{\partial f_{\kappa_j}}{\partial x_j}
$$

对 $\kappa$ 求和即得到一个行列式的形式，正是原定理。

$\blacksquare$

综合左式和右式的处理即得到原定理。