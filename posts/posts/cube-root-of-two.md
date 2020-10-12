---
title: 2 的立方根是多少（详细揭秘）
---

[前置知识](/posts/?page=1&postid=41)

> $2$ 的 nimber 立方根是多少？

我们已经知道，$2\times 2\times 2=1$，称它有阶数 3。从而 $2$ 的 nimber 立方根必须有阶数 9，我们知道对于 $x\in[0,2^{2^n})$ 有
$$
x^{2^{2^n}-1}=1
$$
但是我们发现并不存在 $n$ 使得 $9|2^{2^n}$。

为了完成讨论我们必须回顾 nimber 的构造，然后把 nimber 大力扩张。

# nimber 运算的构造

你以为 nimber 的构造是靠博弈论？图样！nimber 的构造方法是：使得上面的运算是最简单的可以使自身构成一个特征为 2 的域的运算。那么我们来定义加法。

我们应该有一个零元素 $0$，它加任何元素都等于自身。

考虑下一个加法群，它应当有一个新元素 $1$。$1+1$ 当然可以是 $0$，所有特征为 2 的域都是这样的。接下来所有的 $x+x=0$。

下一个加法群应该有新元素 $2$。$1+2$ 不能是 $0$（否则 $2=1$），不能是 $1$（否则 $2=0$），也不能是 $2$（否则 $1=0$）。从而 $1+2$ 必须是另一个元素 $3$。

可以发现，我们已经推导出那个带 mex 的加法法则了。我们不讨论异或，因为我们可能会讨论**超限序数**，异或法则在那里不适用。快进到乘法。

显然地 $0\times x=0$。

考虑让 $\{0,1\}$（或者叫做 $2$，我们接下来把任何数都描述为比它小的所有数的集合）变成一个域。它应当有一个乘法单位元，显然就是 $1$。从而 $1\times x=x$。

考虑让 $\{0,1,2,3\}$（或者叫做 $4$）变成一个域。$2\times 2$ 不能等于 $0$，不然它没有乘法逆元。它不能等于 $1$，不然 $2\times 1=2\times 2\Rightarrow2\times 3=0$，容易验证这使得 $3$ 没有乘法逆元。它还不能等于 $2$，不然显然 $2=1$。所以 $2\times2=3$。

事实上，取任意 $x'\neq x,y'\neq y$，$(x+x')\times(y+y')\neq 0$。因为如果有 $a\times b=0,a\neq 0$，则有 $a\times a^{-1}\times b=0\Rightarrow b=0$。于是我们又回到了 mex，可喜可贺。

为什么我们要讨论构造呢？因为这是让你熟悉一下 nimber 的“定义”：最简单的特征为 2 的域。接下来我们要讨论 nimber 的扩张，为了一次飞跃：从 $\N$ 跳到 $\omega=\N$。

# 最小扩张定理

我们记 $\triangle$ 是我们已经考虑过的数集，我们将要扩张它。记 $[]$ 直接套住的运算是非 nimber 运算，你可以理解为实数运算，但是其实它应该是超实数运算，不过其实和实数差不了太多，你真的想知道的话可以看[wiki](https://zh.wikipedia.org/wiki/%E8%B6%85%E7%8F%BE%E5%AF%A6%E6%95%B8)。$\le$ 默认是（超）实数运算。

> **引理 1.** 如果 $\triangle$ 在加法下不封闭，那么令 $(a,b)$ 是**字典序最小**的 $a+b\notin\triangle$ 的对，则有 $\triangle=a+b$。

$a+b\ge \triangle$ 和 $a+b\le \triangle$ 都很显然。

> **引理 2.** 如果 $\triangle$ 在加法下是一个群，$a,b\in\triangle$，则 $[a\triangle]+b=[a\triangle+b]$。

$[a\triangle]+b=\operatorname{mex}([a'\triangle]+c+b,[a\triangle]+b')$。显然的任意 $[a'\triangle]+c$ 都可以达到（$c=x+b$ 总是有解 $b+c$），从而得证。

>**引理 2.5. **如果 $\triangle$ 在加法下是一个群，则 $\triangle+\triangle$ 也是一个加法群。

在引理 2 中取 $a=1$ 即可得到新的加法。

> **引理 3.** 如果 $\triangle$ 在加法下是一个群但是在乘法下不封闭，那么令 $(a,b)$ 是**字典序最小**的 $a\times b\notin\triangle$ 的对，则有 $\triangle=a\times b$。

显然 $a\times b\ge\triangle$，由于 $a\times b$ 字典序最小，从而 $a'\times b,a\times b',a'\times b'$ 都 $\in\triangle$，所以他们的和也 $\in\triangle$，从而 $a\times b\le\triangle$。

> **引理 4.** 如果 $\triangle$ 是一个环，$\Gamma\le \triangle$ 是一个加法子群且其非零元素均在 $\triangle$ 中有乘法逆，则对任意 $\gamma\in\Gamma$，有$\gamma\triangle=[\gamma\triangle]$。

$\gamma\triangle=\operatorname{mex}(\gamma'\triangle+\delta(\gamma+\gamma'))$。显然 $\gamma+\gamma'\in\Gamma$，从而有乘法逆，于是 $c=x(\gamma+\gamma')$ 总是有解。

> **引理 5.** 如果 $\triangle$ 是一个环但是其非零元素不总是有乘法逆，那么 $\triangle$ 是其最小的无乘法逆的元素 $\alpha$ 的乘法逆。

设 $\Gamma$ 是 $\triangle$ 中最大的加法群使得 $\Gamma\le \alpha$（于是也是一个域）。我们有
$$
\triangle\Gamma=\operatorname{mex}(\triangle\gamma+\delta(\gamma+\Gamma)),\gamma\in\Gamma,\delta\in\triangle
$$
首先我们有 $[\alpha-\Gamma]\in\Gamma$，否则根据引理 2.5，$\Gamma+\Gamma$ 是一个更大的 $\le\alpha$ 的加法群。

对于 $\gamma+\Gamma\le \alpha\Leftrightarrow[\gamma+\Gamma]\le \alpha$，它有乘法逆，从而 $\triangle\Gamma\ge \triangle[\alpha-\Gamma]$。事实上 $\triangle\Gamma>\triangle[\alpha-\Gamma]$，因为可以取 $\gamma=[\alpha-\Gamma],\delta=0$。但是也就到此为止了，因为 $\alpha$ 没有逆，我们无法得到 $[\triangle[\alpha-\Gamma]+1]=\triangle[\alpha-\Gamma]+1$。从而
$$
\triangle\Gamma-\triangle[\alpha-\Gamma]=1\\
\triangle\alpha=1
$$

> **引理 6. **如果 $\triangle$ 是一个环，$\Gamma$ 是其中的一个域，$n\in\N$，则有 $\triangle^{n+1}=[\triangle\Gamma^n]$。这使得
>
>$$
>\triangle^n\gamma_n+\triangle^{n-1}\gamma_{n-1}+...+\triangle\gamma_1+\delta=[\triangle(\Gamma^{n-1}\gamma_n+...+\gamma_1)+\delta]
>$$
>
> 其中 $\gamma_i\in \Gamma,\delta\in \triangle$。

我们有
$$
\triangle^{n+1}=\operatorname{mex}\left(\triangle+\prod_{i=1}^n (\delta_i+\triangle)\right)
$$
