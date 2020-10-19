---
title: 组合计数学习笔记
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

### 引出的一些组合类

记 $\mathcal  E$ 是只由一个大小为 0 的元素构成的组合类。我们有 $E(z)=1$，从而 $\mathcal A\cong \mathcal A\times \mathcal E\cong\mathcal E\times\mathcal A$。

记 $\mathcal Z$ 是只由一个大小为 1 的元素构成的组合类。我们有 $Z(z)=z$。

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
\boxed{\mathcal A=\text{SEQ}(\mathcal B)\Rightarrow A=\dfrac{1}{1-B}}
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
事实上我们甚至有一种绕过 Burnside 引理的做法，不过需要多元生成函数，此处先不表。

## Multiset 构造

> 若 $[z^0]\mathcal B=0$，则我们定义
> $$
> \text{MSET}(\mathcal B)=\text{SEQ}(\mathcal B)/\mathbf R
> $$
> 其中 $\mathbf R$ 是任意置换构成的群。

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

## 没啥用的几个记号

$$
\text{SEQ}_k(\mathcal B)=\mathcal B^k\\
\text{SEQ}_{\ge k}(\mathcal B)=\mathcal B^k\text{SEQ}(\mathcal B)\\
\text{MSET}_k(\mathcal B)=\mathcal B^k/\mathbf R
$$

我们将用以上的几个构造（$\mathcal E,\mathcal Z,+,\times,\text{SEQ},\text{CYC},\text{MSET},\text{PSET}$）构造出一切组合类。具体来讲

# specification，可构造性，Pólya 操作

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