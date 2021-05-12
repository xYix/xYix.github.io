---
title: EC Chapter 7 阅读笔记
---

由于x义x的脑容量太小了所以不得不整一个这个东西。

# Part 1 - 什么是 Symmetric Functions

一个 symmetric funcion

- 是一个每项度数都相等的无限元多项式（多项式只是说说而已，其实我甚至不确定它是不是幂级数……）（你也可以理解为它是一个"元数足够多"的形式幂级数）；
- 且在任意变换 $x_i\leftarrow x_{w(i)}$ 下不变，其中 $w$ 是一个正整数的排列。

所有度为 $n$ 的 symmetric funcion 组成的集合称为 $\Lambda^n$。

很快你会发现这个人畜无害的定义总是能和莫名其妙的鬼东西发生关联。

# Part 2 - Symmetric Functions 中的基本结论

Symmetric Functions 和**划分**有着巨大的关联。所以我们需要一些关于划分的工具。

划分一般表示为 $\lambda=(\lambda_1,\lambda_2,...,\lambda_{\ell(\lambda)})$。.

记 $|\lambda|=\sum_{}\lambda_i$。当表达"$\lambda$ 是一个 $n$ 的划分时"我们也会记 $\lambda\vdash n$，当然这等价于 $|\lambda|=n$。

定义划分间的 **dominance order**（记为 $\le$）是这样一个关系：$\lambda\le \mu$ 当且仅当
$$
\forall i,\lambda_1+\ldots+\lambda_i\le\mu_1+\ldots+\mu_i
$$
我们来试图解释一下这个东西：<span style="color: #ea6965">想象把 $\mu$ 的某个位置 $\mu_i\leftarrow\mu_i-1$，然后把这个 $1$ 搬到某个 $j>i$ 上（也可以新增一位），而且要保证操作后仍是划分。重复该操作，能得到的所有划分就是 $\le\mu$ 的所有划分。</span>

易证 $\le$ 是一个偏序关系。（它对 $n\le 5$ 都是全序关系，但对 $n\ge6$ 就不是了）

## Part 2.1 Monomial Symmetric Function

定义 **Monomial Symmetric Functions** 为 <span style="color: #ea6965">$m_{\lambda}=\sum_{I}x^I$。其中 $I$ 是所有的，排序后变为 $\lambda$ 的指标集合。</span>

比如 $m_{11}=\sum_{i<j}x_ix_j,m_{21}=\sum_{i\neq j}x_i^2x_j$。

显然，<span style="color: #ea6965">$\{m_{\lambda}:\lambda\vdash n\}$ 是 $\Lambda^n$ 的一组线性基。</span>

## Part 2.2 Elementary Symmetric Funcion

**Elementary Symmetric Functions** $e_{\lambda}$，其定义如下：<span style="color: #ea6965">$e_n=m_{1^n},e_{\lambda}=\prod e_{\lambda_i}$。</span>

$e_{\lambda},\lambda\vdash n$ 可用 $m_{\mu},\mu\vdash n$ 线性表示。其系数在今后的研究中有意义，以下记 <span style="color: #ea6965">$e_{\lambda}=\sum_{\mu}M_{\lambda\mu}m_{\mu}$。</span>

易见：$M_{\lambda\mu}$ 的组合意义是，现有 $\lambda_i$ 个颜色为 $i$ 的球，现在要将球放入足够多个盒中，使得颜色相同的球不放在相同的盒，而盒中球数恰好符合 $\mu$ 的放置方案数。盒和（颜色相同的）球皆不可区分。

易见 $M_{\lambda\mu}=M_{\mu\lambda}$。反转"颜色"和"盒"的概念立得。

易见：

$$
\color{#ea6965}\prod_{i,j}(1+x_iy_i)=\sum_{\lambda,\mu}M_{\lambda\mu}m_{\lambda}(x)m_{\mu}(y)
$$

----

我们自然会问，$e_{\lambda}$ 是否是一个基？

> **定理 1. (The Foundamental Theorem of Symmetric Functions)**
>
> <span style="color: #ea6965">$M_{\lambda\lambda^T}=1$。且 $M_{\lambda\mu}\neq 0$ 当且仅当 $\mu\le\lambda^T$。</span>
>
> 这显然直接引出 <span style="color: #ea6965">$e_{\lambda}$ 是一个基。</span>（实际上说明了 $M$ 是一个"上三角矩阵"。打引号是因为这里是偏序而非全序关系。）

> **证明 - 定理 1.**
>
> 懒得严谨证明了。根据 $M_{\lambda\mu}$ 和 dominance order 的组合意义，这应该是很有道理的吧！！

## Part 2.3 Complete Homogeneous Symmetric Funcion

**Complete Homogeneous Symmetric Functions** $h_{\lambda}$，其定义如下：<span style="color: #ea6965">$h_n=\sum_{\lambda\vdash n}m_{\lambda},h_{\lambda}=\prod h_{\lambda_i}$。</span>

类似地，定义 $h_{\lambda}=\sum_{\mu}N_{\lambda\mu}m_{\mu}$。$N_{\lambda\mu}$ 的组合意义也类似，但是同色球可以放在一个盒子中。于是易得 $N_{\lambda\mu}=N_{\mu\lambda}$。

另有：

$$
\color{#ea6965}\prod_{i,j}(1-x_iy_j)^{-1}=\sum_{\lambda,\mu}N_{\lambda\mu}m_{\lambda}(x)m_{\mu}(y)
$$

---

我们自然会问，$h_{\lambda}$ 是否是一个基？

然而它并没有 $e$ 那样的"上三角"性。这里的证明途径是构造了一个 $e$ 到 $h$ 的线性变换并证明了它有逆。

> **定理 2.**
>
> （显然，任何线性变换 $w$ 被其在 $e$ 上的点值唯一确定。）
>
> 线性变换 $\omega(e_{\lambda})=h_{\lambda}$ 是一个对合。
>
> 这显然直接引出 <span style="color: #ea6965">$h_{\lambda}$ 是一个基。</span>（$\omega$ 有逆且就是自身。）

> **证明 - 定理 2.**
>
> 不难发现，$\omega$ 是积性的。
>
> 不妨设 $h_{\lambda}=\sum_{\mu}W_{\lambda\mu}e_{\mu}$。
>
> 我们有
> $$
> e_{\lambda}=[m_{\lambda}(y)]\prod(1+x_iy_j)\\
> h_{\lambda}=[m_{\lambda}(y)]\prod(1-x_iy_j)^{-1}=(-1)^{|\lambda|}[m_{\lambda}(y)]\prod(1+x_iy_j)^{-1}
> $$
> 自然会思考能不能用卷积搞出一个 $e_{\lambda},h_{\lambda}$ 的关系式，然而我们并不熟悉这种卷积。不妨先考虑 $e_n,h_n$ 的简单情形。事实上我们也只需要证明 $w(h_n)=e_n$ 就够了。（回忆 $w$ 的积性。）
>
> 回到 $e_n,h_n$ 的情形。有
> $$
> e_n=[y^n]\prod(1+x_iy)\\
> h_n=(-1)^{n}[y^n]\prod(1+x_iy)^{-1}
> $$
> 于是，
> $$
> \sum_{i=0}^n(-1)^{n-i}e_ih_{n-i}=[n=0]
> $$
> 对两边都作用 $\omega$。注意 $\omega(1)=\omega(e_{\varnothing})=h_{\varnothing}=1$。
> $$
> \sum_{i=0}^n(-1)^{n-i}h_i\omega(h_{n-i})=\sum_{i=0}^n(-1)^{i}h_i\omega(h_{n-i})=[n=0]
> $$
> 对比上下两式，于是 $\omega(h_{n-i})$ 只能是 $u_{n-i}$。

## Part 2.4 Power Sum Symmetric Function

还有完没完了……

**Power Sum Symmetric Functions** $p_{\lambda}$ 的定义如下：<span style="color: #ea6965">$p_n=\sum_i x_i^n,p_{\lambda}=\prod p_{\lambda_i}$。</span>

类似地记 <span style="color: #ea6965">$p_{\lambda}=\sum_{\mu}R_{\lambda\mu}m_{\mu}$。</span>$R$ 的组合意义与之前类似，但是同色球必须放在同一个盒里。

显然如果 $\lambda>\mu$，则 $R_{\lambda\mu}=0$。又易见 $R_{\lambda\lambda}\neq 0$，所以 $p$ 也是基。

----

容易验证：
$$
\color{#ea6965}\prod_{i,j}(1-x_iy_j)^{-1}=\exp\sum_{n=1}^{\infty}\dfrac 1np_n(x)p_n(y)\\\color{#ea6965}
\prod_{i,j}(1+x_iy_j)=\exp\sum_{n=1}^{\infty}\dfrac {(-1)^{n-1}}np_n(x)p_n(y)
$$

----

下面，我们说明，$p_{n}$ 是 **定理 2** 中构造的 $\omega$ 的特征向量。
$$
\sum_{\lambda}h_{\lambda}=\prod_{i}(1-x_i)^{-1}=\text{exp}\sum_{n=1}^{\infty}\dfrac{p_n(x)}{n}
$$
两边作用 $\omega$ 得
$$
\exp\sum_{n=1}^{\infty}\dfrac{w(p_n(x))}{n}=\sum_{\lambda}e_{\lambda}=\prod_{i}(1+x_i)=\exp\sum_{n=1}^{\infty}\dfrac{(-1)^{n-1}p_n(x)}{n}
$$
注意到 $p_n(x)$ 互相线性无关，故得证。

----

现在我们考虑 $h,e$ 如何用 $p$ 表示。

首先定义
$$
\color{#ea6965}z_{\lambda}=\prod_i\lambda_i\cdot\prod_j\left(\sum_{i}[\lambda_i=j]\right)!
$$
这个东西在巨大多群论题里出现过，各位应该已经很熟悉了。
$$
{\color{#ea6965}e_n}=[y^n]\prod(1+x_iy)=[y^n]\exp\sum_{i=1}^{\infty}\dfrac{(-1)^{i-1}}{i}p_i(x)y^i\\
\color{#ea6965}=\sum_{\lambda\vdash n}(-1)^{n-\ell(\lambda)}p_{\lambda}/z_{\lambda}
$$
类似地，
$$
\color{#ea6965}h_n=\sum_{\lambda\vdash n}p_{\lambda}/z_{\lambda}
$$

# Part 3 - 一些 Specializations

