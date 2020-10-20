---
title: 组合结构符号化学习笔记
---

在写[ZJOI2018 树](/posts/?page=0&postid=21)的题解时我一直有这样一种感觉：我们计数的对象太复杂以至于我们很难描述和分析它。有序？无序？有标号？无标号？万一对象是什么“k 棵本质相同的树”之类的东西，上面的四个问题还能无限套娃。数数初学者更是很难搞明白 exp 和有标号计数的关系；作为一个集合幂级数的初学者我也很难理解集合幂级数 ln 是怎么“拆解”一个对象的。

发现有个叫“解析组合”的东西里面有一些符号化组合对象的工具，学来用一用。pdf 版本在[这里](http://algo.inria.fr/flajolet/Publications/book.pdf)。书中举了大量生动的例子，画了大量的插图，非常的强大。如果你的数数不够好，可以找来看一看加深理解。

这里默认读者有一些数数功底，比如至少做过城市规划和无标号树计数。

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

> $\mathcal A=\mathcal B\times \mathcal C$ 被称为 $\mathcal B$ 和 $\mathcal C$ 的**笛卡尔积**，其中 $\mathcal A$ 的元素是有序对 $\{(\beta,\gamma)|\beta\in\mathcal B,\gamma\in \mathcal C\}$，$|\alpha|_{\mathcal A}=|\beta|_{\mathcal B}+|\gamma|_{\mathcal C}$。

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

就是把 $\beta$ 排成有序序列，很好理解。

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

你可能更熟悉它的另两个名字：Euler 变换或 Polya Exp。在无标号计数中起重要作用。

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

它没有什么组合意义。它的确可以解释成在一个图 $\beta$ 中指明一个特殊节点（比如根），但是在图计数中使用 OGF 往往是因为无标号，而无标号场合下任何操作都要 $/\mathbf R$。而如果我们能区别点之间的区别，往往这会变成一个有标号计数问题。这使得这个鬼构造什么用也没有。

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
> 如果取 $G$ 为任意置换的集合 $\mathbf R$，我们还有
> $$
> \sum_{i=0}^{\infty}\sum_{\phi\in (\mathcal B^{[1..i]}/\mathbf R_i)}w(\phi)=\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{\sum_{\beta\in\mathcal B}w^i(\beta)}{i}\right)
> $$
> 证明可大致参考[这里](/posts/?page=1&postid=31)（链接里同时还取 $w(\beta)=z^{|\beta|}$，但是其实不失一般性。注意 $w(\beta)=z^{|\beta|}$ 和 $\text{MSET}$ 的关系。）

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

把一个弱标号的对象排成强标号。比如有一个 $\alpha$，它的标号是 $\left<233,998244353,1\right>$，那么 $\alpha$ 的标号就会被 reduction 成 $\left<2,3,1\right>$。这个被重标号的 $\alpha$ 记作 $\rho(\alpha)$。其实就是离散化。

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

## [ZJOI2018 树](https://www.luogu.com.cn/problem/P4500)

心 肺 停 止

冷静一下。根据题面，我们要数的是每个**有根无标号树**（可以验证这个生成方法会把每个有根无标号树等概率生成）（记所有有根无标号树构成的组合类为 $\mathcal T$）作为一个等价类的大小的 $k$ 次方和。设为 $siz^k(\alpha)$，表述的时候我们说这棵无标号树描述了多少棵有标号树。

首先考虑两个等价类的笛卡尔积（我们当然要先引入笛卡尔积再引入 $\text{MSET}$ 构造），记为 $*$。我们有
$$
|t_1*t_2|=|t_1|+|t_2|\\
siz(t_1*t_2)=siz(t_1)siz(t_2){t_1+t_2\choose t_1,t_2}
$$
这提示我们搞出一个类似 EGF 的东西（$k=1$ 就退化到 EGF）。记 $T(\mathcal A;z)=\sum_{\alpha\in\mathcal A}siz^k(\alpha)\dfrac{z^{|\alpha|}}{|\alpha|!^k}$。

分析一下它的性质。

- 线性是自然的：

- $$
  T(\mathcal A+\mathcal B)=T(\mathcal A)+T(\mathcal B)
  $$

- 于是我们也容易得到积性：

- $$
  T(\mathcal A*\mathcal B)=T(\mathcal A)T(\mathcal B)
  $$
  
- 事实上积性并不那么显然。请独立验证。

那么我们分析一棵树的构造。我们容易得到
$$
\mathcal T^{\square}=\text{MSET}(\mathcal T)
$$
注意我们分析的是 $\mathcal T$ 的结构，这和我们使用什么生成函数**无关**，我们只是知道某些结构和某些生成函数有直接对应罢了。**绝对不要把构造和生成函数混为一谈**。

我们直接把我们的魔改 EGF 带进去。有
$$
\begin{aligned}T(\mathcal T^{\square})&=T(\text{MSET}(\mathcal T))\\
&=T\left(\text{exp}\left(\sum_{i=1}^{\infty}\dfrac 1 i\sum_{t\in\mathcal T}t^i\right)\right)&(\texttt{Pólya}\ \text{定理})\\
&=T\left(\prod_{i=1}^{\infty}\prod_{t\in\mathcal T}\sum_{j=0}^{\infty}\dfrac{t^{ij}}{i^jj!}\right)&(\texttt{拆开}\text{ exp})\\
&=\prod_{i=1}^{\infty}\prod_{t\in\mathcal T}\sum_{j=0}^{\infty}\dfrac{T^{ij}(t)}{i^jj!}&(T\ \texttt{的线性，积性})\\
&=\prod_{i=1}^{\infty}\prod_{t\in \mathcal T}\text{exp}(T^i(\mathcal t)/i)&(\texttt{恢复} \text{ exp})
\end{aligned}
$$
现在出现了一个问题。我们没法处理 $T^i(\mathcal t)$。

可以想到的是修改 $T$ 的定义为
$$
T(\mathcal A;z,u)=\sum_{\alpha\in\mathcal A}z^{|\alpha|}\dfrac{1}{1-u\frac{siz(\alpha)}{|\alpha|!}}
$$
$T$ 的乘法定义为 $[u^k](T_1T_2)=[u^k]T_1[u^k]T_2$，即 $z$ 一维卷积，$u$ 一维点乘。它仍然保有之前的线性，积性。于是有
$$
\left[u^k\right]T^i(\mathcal t;z)=siz^{ik}(t)\dfrac{z^{i|t|}}{|t|!^{ik}}=[u^{ik}]T(t;z^i)
$$
于是我们有
$$
\begin{aligned}[u^k]T(\mathcal T^{\square};z)&=\prod_{i=1}^{\infty}\prod_{t\in\mathcal T}\text{exp}([u^{ik}]T(t;z^i))\\
&=\prod_{i=1}^{\infty}[u^{ik}]\text{exp}(T(\mathcal T;z^i)/i)&(T\ \texttt{的线性，也是刚才操作的目的})\\
&=\text{exp}\left(\sum_{i=1}^{\infty}\dfrac{[u^{ik}]T(\mathcal T;z^i)}{i}\right)
\end{aligned}
$$
那么具体怎么做呢？首先观察到 $u$ 指标乘 $z$ 指标不超过 $nk$ 的项才是有意义的；然后我们从大的 $u$ 指标推到小的 $u$ 指标，有
$$
\text{ln}[u^k]T(\mathcal T^{\square};z)-[u^k]T(\mathcal T;z)=\sum_{i=2}^{\infty}\dfrac{[u^{ik}]T(\mathcal T;z^i)}{i}
$$
对于左边，$[u^kz^n]T(\mathcal T)$ 容易 $O(n)$ 算出。复杂度为
$$
\sum_{k=1}^nO\left(\dfrac{n^2}{k^2}\right)=O(n^2)
$$

当 $k$ 变动时我们必须重新计算右式，这部分复杂度为 $O(n\log^2 n)$。

## 分析边仙人掌的结构

先分析有标号有根仙人掌，记为 $\mathcal C$。显然它是 $\Theta(有标号无根仙人掌)$，从而很容易完成从有根到无根的转换。

讨论根的“儿子”是否和根在一个环上。如果不在一个环上，那么直接得到
$$
\mathcal Z\star\text{SET}(\mathcal C)
$$
否则枚举环的大小 $i+1\ge 3$，显然有一端固定的环的结构是 $\mathcal Z^i/2$（由于标号，没有一个对象是翻转置换的不动点），而环上每一个除了根的节点都可以直接替换为一个仙人掌。所以我们最终得到
$$
\mathcal C=\mathcal Z\star\text{SET}\left(\mathcal C+\dfrac 12\sum_{i=2}^{\infty}\mathcal C^i\right)=\mathcal Z\star\text{SET}\left(\dfrac 1 2\mathcal C+\dfrac {\mathcal C} {2(1-\mathcal C)}\right)
$$
接下来看看无标号有根仙人掌，还是记为 $\mathcal C$。故技重施：
$$
\mathcal C=\mathcal Z\times\text{MSET}\left(\mathcal C+\dfrac 1 2\sum_{i=2}^{\infty}\mathcal C^i+\dfrac 12\sum_{i=1}^{\infty}(\Delta\mathcal C^2)^i\times(1+\mathcal C)\right)\\
=\mathcal Z\times\text{MSET}\left(\dfrac{\mathcal C}{2(1-\mathcal C)}+\dfrac{\mathcal C+\Delta\mathcal C^2}{2(1-\Delta\mathcal C^2)}\right)
$$
其中 $\Delta\mathcal C^2=\sum_{t\in\mathcal C}t^2$。

# 课后练习

我们定义一种新的组合类，其元素的大小函数是 $[1..n]$ 的一个子集，当然也可看成一个 $[0,2^n)$ 的一个二进制数。

考虑[子集卷积的普通做法](https://www.luogu.com.cn/problem/P4221)，我们定义一个组合类的**集合占位幂级数**为
$$
\sum_{\alpha\in\mathcal A}\left(z^{|\alpha|}x^{||\alpha||}+\sum_{i=||\alpha||+1}^{\infty}f_ix^{i}\right)
$$
其中 $||\alpha||$ 表示集合 $|\alpha|$ 的大小。$f$ 是无意义的占位信息。容易验证集合占位幂级数的或卷积
$$
[z^{s}](\sigma\times\tau)=\sum_{p\cup q=s}[z^p]\sigma\times[z^q]\tau
$$
是**子集卷积**。

- 定义两个组合类的“笛卡尔积”，它应该和其集合占位幂级数的乘积对应。
- 定义两个组合类的和，它应该和其集合占位幂级数的和对应。
- 定义 composition 构造，它应该和其集合占位幂级数的 $\text{exp}$ 对应。$\text{exp}$ 中出现的乘法均定义为或卷积。指出 composition 构造的组合意义。
- 定义 decomposition 构造，它应该和其集合占位幂级数的 $\text{ln}$ 对应。指出 decomposition 构造的组合意义。
- 定义 modified box 构造 $\square_i\mathcal A:=\{\alpha|\alpha\in \mathcal A,i\in|\alpha|\},|\alpha|_{\square_i\mathcal A}:=|\alpha|_{\mathcal A}/\{i\}$。指出它的组合意义。
- 分析一个图的**无根生成树**的结构。你可以考虑从 $1..n$ 依次加入各个节点。
- 分析一个图的**无根生成仙人掌**的结构。你可以参考[这里](https://xyix.gitee.io/posts/?page=1&postid=35)。