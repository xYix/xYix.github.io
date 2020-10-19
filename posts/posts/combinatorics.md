---
title: 解析组合学习笔记
---

在写[ZJOI2018 树](/posts/?page=0&postid=21)的题解时我一直有这样一种感觉：我们计数的对象太复杂以至于我们很难描述和分析它。有序？无序？有标号？无标号？万一对象是什么“k 棵本质相同的树”之类的东西，上面的四个问题还能无限套娃。数数初学者更是很难搞明白 exp 和有标号计数的关系；作为一个集合幂级数的初学者我也很难理解集合幂级数 ln 是怎么“拆解”一个对象的。

发现有个叫“解析组合”的东西里面有一些工具，学来用一用。pdf 版本在[这里](http://algo.inria.fr/flajolet/Publications/book.pdf)。书中举了大量生动的例子，画了大量的插图，非常的强大。如果你的数数不够好，可以找来看一看加深理解。

# 定义

> 一个**组合类**（combinatorial class）是一个可数集合 $\mathcal A$，以及一个**大小函数**（size function）$f:\mathcal A\rightarrow\N$。记 $f(x)=|x|$，或者，在某些需要指出组合类的场合下，$|x|_{\mathcal A}$。

大小函数应该是一个我们很熟悉的东西了。“节点数”“叶子数”……

> 记对于自然数 $n$，$A_n=\Big|\{x\in \mathcal A,|x|=n\}\Big|$。称 $A_n$ 是 $\mathcal A$ 的**计数序列**（counting sequence）。
>
> 一个计数序列的 **OGF**（ordinary GF）是形式幂级数
> $$
> A(z)=\sum_{i\in\N}A_iz^i
> $$
> 因而对于组合类 $\mathcal A$，它的 OGF 也是
> $$
> \sum_{x\in A}z^{|x|}
> $$
> 我们记
> $$
> [z^n]A=A_n
> $$

熟悉到不能再熟悉了。~~（不想熟悉）~~

> 两个组合类 $\mathcal A,\mathcal B$ 是**同构**的，如果 $A_n=B_n$。记作 $\mathcal A\cong\mathcal B$。

## 引出的一些组合类

记 $\mathcal  E$ 是只由一个大小为 0 的元素构成的组合类。我们有 $E(z)=1$。

记 $\mathcal Z$ 是只由一个大小为 1 的元素构成的组合类。我们有 $Z(z)=z$。

# 几个基础的构造

下面讨论一些可以直接被翻译为生成函数的构造，称为 admissible constructions，可译为“可接受的构造”。具体来说

> 称一个构造 $\Phi$ **admissible**，如果
> $$
> \mathcal A=\Phi[\mathcal B^{(1)},\mathcal B^{(2)},...,B^{(m)}]
> $$
> 中的 $\mathcal A$ 的计数序列 $A_n$ 只依赖于 $B_n^{(i)}$。也就是说存在一个对应的函数 $\Psi$，使得
> $$
> A=\Psi[B^{(1)},B^{(2)},...,B^{(m)}]
> $$

## 笛卡尔积

> $\mathcal A=\mathcal B\times \mathcal C$ 被称为 $\mathcal B$ 和 $\mathcal C$ 的**笛卡尔积**，其中 $\mathcal A$ 的元素是有序对 $\alpha=(\beta,\gamma)$，$|\alpha|_{\mathcal A}=|\beta|_{\mathcal B}+|\gamma|_{\mathcal C}$。

此时，
$$
A_n=\sum_{i+j=n}B_iC_j
$$
也就是普通卷积，从而有
$$
\boxed{A(z)=B(z)C(z)}
$$

## 不交并

> $\mathcal A=\mathcal B\cup\mathcal C\ (\mathcal B\cap\mathcal C=\varnothing)$ 被称为 $\mathcal B$ 和 $\mathcal C$ 的**不交并**，其元素 $\alpha$ 的大小函数 $|\alpha|_{\mathcal A}=\begin{cases}|\alpha|_{\mathcal B}&(\alpha\in \mathcal B)\\|\alpha|_{\mathcal C}&(\alpha\in \mathcal C)\end{cases}$。

此时，
$$
A_n=B_n+C_n,\\\boxed{A(z)=B(z)+C(z)}
$$
## 和

我们意图扩展不交并的概念。为了绕开多重集，我们使用下面的定义：

> $$
> \mathcal B+\mathcal C:=(\{\square\}\times \mathcal B)\cup(\{\triangle\}\times\mathcal C)
> $$
>
> 其中 $\square$ 和 $\triangle$ 是两个不同的，大小为 0 的元素。

我们有
$$
\boxed{\mathcal A=\mathcal B+\mathcal C\Rightarrow A(z)=B(z)+C(z)}
$$
请注意，集合并显然不是 admissible 的。

## Sequence 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{SEQ}(\mathcal B):=\mathcal E+\mathcal B+\mathcal B\times \mathcal B+\mathcal B\times \mathcal B\times \mathcal B+...
> $$
> 是 $\mathcal B$ 的 Sequence 构造。换句话说，如果 $\mathcal A=\text{SEQ}(\mathcal B)$，则
> $$
> \mathcal A=\{(\beta_1,...,\beta_l)\ |\ l\ge 0,\beta\in \mathcal B\}
> $$

我们有
$$
\boxed{\mathcal A=\text{SEQ}(\mathcal B)\Rightarrow A(z)=\dfrac{1}{1-B(z)}}
$$

## Cycle 构造

首先定义**本质相同**是什么意思。两个元素 $\beta_1,\beta_2$ 在映射群列 $G_0,G_1,G_2,...$ 下本质相同，如果 $|\beta_1|=|\beta_2|$，且存在映射 $g\in G_{|\beta|}$ 使得 $g(\beta_1)=\beta_2$。显然此处的本质相同具有自反性、对称性、传递性，从而是一个等价关系。

定义 $\mathcal A/G$ 是一个组合类，其中的元素 $\alpha$ 是一个组合对象的非空集合，$\alpha$ 中的元素互相等价，如果 $\alpha_1\neq \alpha_2$，则 $\alpha_1$ 和 $\alpha_2$ 中的元素两两不等价。$|\alpha|_{\mathcal A/G}$ 等于任意 $\alpha$ 中元素的大小，显然它们都相等。我们把 $\alpha$ 称为一个**等价类**（equivalence class）。

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{CYC}(\mathcal B):=(\text{SEQ}(\mathcal B)-\mathcal E)/\mathbf S
> $$
> 其中 $\mathbf S$ 是所有循环移位（circular shift）构成的群。

根据 Burnside 引理我们容易得到
$$
\boxed{\mathcal A=\text{CYC}(\mathcal B)\Rightarrow A(z)=\sum_{k=1}^{\infty}\dfrac{\varphi(k)}{k}\text{log}\dfrac{1}{1-B(z^k)}}
$$
## Multiset 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{MSET}(\mathcal B)=\text{SEQ}(\mathcal B)/\mathbf R
> $$
> 其中 $\mathbf R$ 是任意置换构成的群。
>
> 比如，$(\beta_1,\beta_2,\beta_3)$ 和 $(\beta_1,\beta_3,\beta_2),(\beta_2,\beta_1,\beta_3),(\beta_2,\beta_3,\beta_1),(\beta_3,\beta_1,\beta_2),(\beta_3,\beta_2,\beta_1)$ 等价。这是整个 $(\beta_1,\beta_2,\beta_3)$ 所属的等价类。
>
> 再比如，$(\beta_1,\beta_1,\beta_2)$ 和 $(\beta_1,\beta_2,\beta_1),(\beta_2,\beta_1,\beta_1)$ 等价。这是整个 $(\beta_1,\beta_1,\beta_2)$ 所属的等价类。

你可能更熟悉它的另两个名字：Euler 变换或 Polya Exp。

于是有我们熟悉的结论：
$$
\boxed{\mathcal A=\text{MSET}(\mathcal B)\Rightarrow A(z)=\begin{cases}\prod_{i=1}^{\infty}(1-x^i)^{-B_i}\\\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{B(z^i)}{i}\right)\end{cases}}
$$

## Powerset 构造

> 若 $[z^0]\mathcal B=0$，则我们定义 $\text{PSET}(\mathcal B)$ 是 $\mathcal B$ 的所有有限子集构成的集合。如果 $\alpha\in\text{PSET}(\mathcal B)$，则 $|\alpha|=\sum_{\beta\in \alpha}|\beta|$。

显然有
$$
\text{PSET}(\mathcal B)\cong\prod_{\beta}(Z+\{\beta\})
$$
从而
$$
\boxed{\mathcal A=\text{PSET}(\mathcal B)\Rightarrow A(z)=\begin{cases}\prod_{n}(1+z^n)^{B_i}\\\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{(-1)^{i-1}B(z^i)}{i}\right)\end{cases}}
$$

我们将用以上的几个构造（$\mathcal E,\mathcal Z,+,\times,\text{SEQ},\text{CYC},\text{MSET},\text{PSET}$）构造出一切组合类。具体来讲

## specification，可构造性，Pólya 操作

> 一个 $r$ 阶的 **specification**（可译作规范）是 $r$ 条方程构成的方程组
> $$
> \begin{cases}\mathcal A^{(1)}=\Phi_1(\mathcal A^{(1)},\mathcal A^{(2)},...,\mathcal A^{(r)})\\\mathcal A^{(2)}=\Phi_2(\mathcal A^{(1)},\mathcal A^{(2)},...,\mathcal A^{(r)})\\...\\\mathcal A^{(r)}=\Phi_r(\mathcal A^{(1)},\mathcal A^{(2)},...,\mathcal A^{(r)})\end{cases}
> $$
> 其中 $\Phi$ 都是八大构造构建起的函数。

> 我们称一组组合类是**可构造的**，如果它满足一个 specification。

> The generating function of a constructible class is a component of a system of functional equations whose terms are built from 八大构造。（前面那段文字翻译不能……）

我们记
$$
Q(f)=\dfrac{1}{1-f}\quad(\texttt{拟逆})\\
\text{Log}(f)=\sum_{k=1}^{\infty}\dfrac{\varphi(k)}{k}\text{log}\dfrac{1}{1-f(z^k)}\quad(\text{Pólya Log})\\
\text{Exp}(f)=\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{B(z^i)}{i}\right)\quad(\text{Pólya Exp})\\
\overline{\text{Exp}}(f)=\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{(-1)^{i-1}B(z^i)}{i}\right)\quad(\text{Pólya Exp · 改})
$$
它们被称为 Pólya 操作。

~~那个 Pólya Exp · 改真的不是我乱翻，原文就是 Modified Pólya Exp~~

## Pointing 构造

>定义
>$$
>\Theta\mathcal B:=\sum_{i\ge 0}\{\beta\in \mathcal B,|\beta|=i\}\times\{\epsilon_1,\epsilon_2,...,\epsilon_i\}
>$$
>其中 $\epsilon_i$ 是大小为 0 的对象。

它没有什么组合意义，因为它可以解释成在一个图 $\beta$ 中指明一个特殊节点（比如根），但是在图计数中使用 OGF 往往是因为无标号，而无标号场合下任何操作都要 $/\mathbf R$，这使得这个鬼构造什么用也没有。

我们有
$$
\boxed{\mathcal A=\Theta\mathcal B\Rightarrow A(z)=z\dfrac{\part}{\part z}B(z)}
$$

## Subsitution 构造

> 定义
> $$
> \mathcal B\circ\mathcal C:=\sum_{i\ge 0}\{\beta\in\mathcal B,|\beta|=i\}\  {\color{red}\times}\ \mathcal C^{\times i}
> $$
> $\mathcal C^{\times i}:=$ $i$ 个 $\mathcal C$ 连 $\times$。
>
> 这里的 $\color{red}\times$ 较特殊：新的 $|\cdot|$ 定义为 $\sum|\gamma|$。

同上，没有组合意义。

有
$$
\boxed{\mathcal A=\mathcal B\circ\mathcal C\Rightarrow A(z)=B(C(z))}
$$


# Pólya 定理

考虑一个大小为 $m$ 的有限集合 $\mathcal M$ 和一个置换群 $G$ 作用在其上。不妨认为 $\mathcal M=\{1,2,...,m\}$。

> 定义 $G$ 的**循环指标**为
> $$
> Z(G)=Z(G;x_1,x_2,...,x_m)=\dfrac{1}{|G|}\sum_{g\in G}x_1^{j_1(g)}x_2^{j_2(g)}...x_m^{j_m(g)}
> $$
> 其中 $j_1(g)$ 表示 $g$ 中大小为 1 的循环个数。

一个我们并不陌生的东西。

> **Pólya 定理.** 令 $\mathcal B$ 是一个组合类，$\mathcal M$ 是一个有限集合，上有一个置换群 $G$。考虑集合 $\mathcal B^{\mathcal M}$，即所有 $\mathcal M\rightarrow\mathcal B$ 的映射……

我们指出，这是广义的**染色**。

> ……两个**染色** $\phi_1,\phi_2\in\mathcal B^{\mathcal M}$ 被认为本质相同，如果存在映射 $g\in G,\phi_1\circ g=\phi_2$。从而我们研究的对象可以称为 $\mathcal B^{\mathcal M}/G$。
>
> $\mathcal B$ 中的每一个元素 $\beta$ 都可以有权重 $w(\beta)$。一个映射 $\phi$ 的权重 $w(\phi):=\prod_{k\in\mathcal M}w(\phi(k))$，显然同一个等价类中的映射权重都一样，称为这个等价类的权重。**Pólya-Redfield 定理**的内容如下：
> $$
> \sum_{\phi\in (\mathcal B^{\mathcal M}/G)}w(\phi)=Z\left(G;\sum_{\beta\in\mathcal B}w(\beta),...,\sum_{\beta\in\mathcal B}w^m(\beta)\right)
> $$
> 如果取 $w(\beta)=z^{|\beta|}$，我们还有
> $$
> \sum_{\phi\in (\mathcal B^{\mathcal M}/G)}z^{|\phi|}=Z\left(G;B(z),...,B(z^m)\right)
> $$

《如果早知道，~~男生也会被~~真正的 Pólya 定理长这样》

现在运用上面的构造，Burnside 引理和 Pólya 定理，你应该能解决很多无标号计数问题了。可是……**标号**是什么？我们来介绍有标号计数。

# 有标号计数

首先定义什么叫做标号。

> 一个大小为 $n$ 的对象被称作**标号的**，如果它的每一个节点（这里我们认为一个对象是一个图，如果我们需要的话，可以任意扩展它）都附带一个互不相同的正整数标号，恰好是 $[1..n]$ 的一个排列。
>
> 一个对象被称为**弱标号**的，如果它几乎是标号的，但是其标号不必恰好是 $[1..n]$ 的一个排列。
>
> 一个组合类被称作**标号的**，如果它的元素都是标号的对象。

> 一个计数序列 $A_n$ 的 **EGF**（Exponential GF）是形式幂级数
> $$
> A(z)=\sum_{i\ge 0}A_n\dfrac{z^n}{n!}
> $$
> 因而对于组合类 $\mathcal A$，它的 EGF 也是
> $$
> \sum_{x\in \mathcal A}\dfrac{z^{|x|}}{|x|!}
> $$
> 我们记
> $$
> A_n=n![z^n]A(z)
> $$

$\mathcal E,\mathcal Z$ 的定义如之前一样。接下来的 GF 默认为 EGF。

## 重标号

众所周知，标号的存在就是为了让你重新排的。下面是典型的两种重排。

### reduction

把一个弱标号的对象排成强标号。比如有一个 $\alpha$，它的标号是 $\left<233,998244353,1\right>$，那么 $\alpha$ 的标号就会被 reduction 成 $\left<2,3,1\right>$。这个被重标号的 $\alpha$ 记作 $\rho(\alpha)$。

### expansion

reduction 的逆操作。显然 expansion 的结果不唯一。记作 $e(\alpha)$。

## 标号积

你一定记得[城市规划](https://www.luogu.com.cn/problem/P4841)。“一个无向图就是由若干个无向连通图组成的”，组成是什么意思？~~感性理解，请~~今天我们终于可以严谨地定义“组成”了。

两个标号对象 $\beta,\gamma$ 的**标号积**定义为
$$
\beta\star\gamma:=\{(\beta',\gamma')|(\beta',\gamma')\texttt{是强标号的},\rho(\beta')=\beta,\rho(\gamma')=\gamma\}
$$
其大小定义为 $|\beta|+|\gamma|$。

两个组合类的**标号积**定义为
$$
\mathcal B\star\mathcal C:=\bigcup_{\beta\in\mathcal B,\gamma\in\mathcal C}\beta\star\gamma
$$
显然此处 $\beta\star\gamma$ 两两不交。

那么标号积是否 admissible 呢？答案是肯定的。事实上我们都知道它对应二项卷积，也对应 EGF 的乘法。
$$
\mathcal A=\mathcal B\star\mathcal C\Rightarrow A(z)=B(z)C(z)
$$

## 有标号 Sequence 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{SEQ}(\mathcal B):=\mathcal E+\mathcal B+\mathcal B\star \mathcal B+\mathcal B\star \mathcal B\star \mathcal B+...
> $$
> 是 $\mathcal B$ 的 Sequence 构造。换句话说，如果 $\mathcal A=\text{SEQ}(\mathcal B)$，则
> $$
> \mathcal A=\{\beta_1\star\ldots\star\beta_l\ |\ l\ge 0,\beta\in \mathcal B\}
> $$
> 比如，$(\beta'_1,\beta'_2,\beta'_3)$ 本身是强标号的，$\rho(\beta_1')=\beta_1,\rho(\beta_2')=\beta_2,\rho(\beta_3')=\beta_3$，那么它就应该的确是 $\text{SEQ}(\mathcal B)$ 的一个元素。
>
> 对应数个 $\mathcal B$ “有序地”组合在一起。

有
$$
\boxed{\mathcal A=\text{SEQ}(\mathcal B)\Rightarrow A(z)=\dfrac{1}{1-B(z)}}
$$

## Set 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{SET}(\mathcal B):=\text{SEQ}(\mathcal B)/\mathbf R
> $$
> 对应数个 $\mathcal B$ “无序地”组合在一起。

我们终于摆脱了“有序”和“无序”，我们现在只说它们在什么置换下等价。

有~~刻在 DNA 里的~~结论
$$
\boxed{\mathcal A=\text{SET}(\mathcal B)\Rightarrow A(z)=\text{exp}B(z)}
$$

## 有标号 Cycle 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{CYC}(\mathcal B):=\text{SEQ}(\mathcal B)/\mathbf S
> $$
> 其中 $\mathbf S$ 是所有循环移位（circular shift）构成的群。

我们有
$$
\boxed{\mathcal A=\text{CYC}(\mathcal B)\Rightarrow A(z)=\text{log}\dfrac{1}{1-B(z)}}
$$

## 有标号可构造性

与普通的可构造性类似。

## 有标号 Pointing 构造

>定义
>$$
>\Theta\mathcal B:=\sum_{i\ge 0}\{\beta\in \mathcal B,|\beta|=i\}\times[1..n]
>$$

其组合意义可以解释为在 $\beta$ 中指明一个特殊的节点（也就是指明一个特殊的标号），比如指明根。

我们有
$$
\boxed{\mathcal A=\Theta\mathcal B\Rightarrow A(z)=z\dfrac{\part}{\part z}B(z)}
$$

## 有标号 Subsitution 构造

> 定义
> $$
> \mathcal B\circ\mathcal C:=\sum_{i\ge 0}\{\beta\in\mathcal B,|\beta|=i\}\ {\color{red}\times}\ \dfrac{\mathcal C^{\star i}}{i!}
> $$
> $C^{\star i}:=$ $i$ 个 $\mathcal C$ 连 $\star$。
>
> 这里的 $\color{red}\times$ 较特殊：新的 $|\cdot|$ 定义为 $\sum|\gamma|$。

其组合意义可以解释为我们把 $\mathcal B$ 的每一个节点全部换成一个 $\mathcal C$ 结构。由于标号，我们可以区分 $\beta$ 中各节点的不同，从而把 $\dfrac{\mathcal C^{\star i}}{i!}$（请确认你了解这个东西的含义。比如它在有相同的 $\gamma$ 时是否还是正确的？）中的 $\mathcal C$ 挨个按 $\beta$ 的标号填进去即可。

有
$$
\boxed{\mathcal A=\mathcal B\circ\mathcal C\Rightarrow A(z)=B(C(z))}
$$

## boxed product

我们定义

>$$
>\mathcal A=\mathcal B^{\square}\star\mathcal C\Rightarrow \left(\dfrac{\text{d}}{\text{d}z}A\right)(z)=\left(\dfrac{\text{d}}{\text{d}z}B\right)(z)C(z)
>$$

这个东西的组合意义相当于要求一个特殊标号，比如 $1$ 必须分配进 $\beta$。在关于父亲在 $1..i-1$ 随机选的树的问题中比较有用。

# 例题

好了，你已经掌握数数的基本方法了，让我们来做一道例题练习一下吧！

> [ZJOI2018 树](https://www.luogu.com.cn/problem/P4500)

心 肺 停 止

冷静一下。首先我们应该先表示一棵树。根据题面，我们要数的是每个**有根无标号树**（可以验证这个生成方法会把每个有根无标号树等概率生成）作为一个等价类的大小的 $k$ 次方和。设为 $siz^k(\alpha)$，表述的时候我们说这棵无标号树描述了多少棵有标号树。记 $T$ 是答案的 EGF，或 $T(z)=\sum_{\alpha}siz^k(\alpha)\dfrac{z^{|\alpha|}}{|\alpha|!}$。

冷静分析一下。首先我们可以剔掉根（和标号 1）：
$$
T'(z)=
$$
枚举儿子数：
$$
T'(z)=\sum_{i=0}^{\infty}
$$
然后呢？每个儿子都可以是一个有根无标号树（儿子到 $\mathcal T$ 的映射，也就是染色），注意无标号，所以在任意置换下相同的方案不该被重复计数。

而最终生成的树描述的有标号树数量是：儿子描述的有标号树数量之积；再乘以当前的染色等价类的大小的 $k$ 次方。

考虑染色等价类的大小怎么描述，显然就是 ${n\choose |\alpha_1|,...,|\alpha_i|}^k$。$k=1$ 是自然的，因为有一个叫 exp 的好东西会自动帮我们算出来：$T'(z)=\text{exp}T(z)$。

对于 $k\neq 1$，我们可以魔改 exp 成，用 EI 的记号，
$$
\mathcal{EXP}:\alpha\rightarrow 1+\alpha+\dfrac{\alpha^{\star 2}}{2!^k}+...
$$
EGF 也改成 $\mathcal E$GF，$T(z)=\sum_{\alpha}siz^k(\alpha)\dfrac{z^{|\alpha|}}{|\alpha|!^k}$。求导类似。

但是你会发现这个 $\mathcal{EXP}$ 假掉了，问题的关键在于这个 $\mathcal{EXP}$ 不满足
$$
\mathcal{EXP}(f+g)=\mathcal{EXP}(f)\cdot\mathcal{EXP}(g)
$$
从而它并不像我们希望的那样，合理地使得
$$
\mathcal{EXP}\left(\sum_{\alpha}siz^k(\alpha)\dfrac{z^{|\alpha|}}{|\alpha|!}\right)=\prod_{\alpha}\mathcal{EXP}\left(siz^k(\alpha)\dfrac{z^{|\alpha|}}{|\alpha|!}\right)
$$
左边是我们实际算的，而右边是我们希望的，这个 $\mathcal {EXP}$ 使得左边右边不相等。

