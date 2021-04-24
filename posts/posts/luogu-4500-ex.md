---
title: ZJOI2018 树 —— 没有群论相关
---

这道刻在 DNA 里的好题想必大家都很熟悉，这里就不写题意了。

# 1. 起手式

如果你不知道 Symbolic Method，下面是一些你可能需要的背景知识。

> - 记 $\mathcal T$ 是所有无标号有根树的集合。
> - 对于树 $t$，记 $|t|$ 表示 $t$ 的节点数。
> - 记 $w(t)$ 为给 $t$ **分配标号**（即给每个节点写上一个数字，$1\sim |t|$ 中的数字必须恰好用一次，且每个子树中根节点的编号必须小于其他所有节点）的方案数。
> - 如果把两棵树 $t_1,t_2$ "捆在一起"成为有序对 $(t_1,t_2)$，那么应该有
>
> $$
> w((t_1,t_2))=w(t_1)w(t_2){|t_1|+|t_2|\choose |t_1|}
> $$
>
> - （相当于选 $|t_1|$ 个标号分给 $t_1$ 让他自己分配，$t_2$ 亦然）
> - 注意到我们所欲求的是 $\sum_{t\in\mathcal T}[|t|=n]w^k(t)$，于是不妨编一个生成函数
>
> $$
> T_k(\{a\};x)=\dfrac{w^k(a)x^{|a|}}{(|a|!)^k}
> $$
>
> - 对于树的集合 $\mathcal A$，定义它的生成函数是其中的所有树的生成函数之和。
>
> $$
> T_k(\mathcal A;x)=\sum_{a\in\mathcal A}\dfrac{w^k(a)x^{|a|}}{(|a|!)^k}
> $$
>
> - （有时为了简略我们会写为 $T_k(\mathcal A)$）
> - 不难验证，对于 $\mathcal A\times \mathcal B=\{(a,b),a\in\mathcal A,b\in\mathcal B\}$（称为两个组合类的**笛卡尔积**），有
>
> $$
> T_k(\mathcal A\times\mathcal B)=T_k(\mathcal A)T_k(\mathcal B)
> $$
>
> - 也就是说，<span style="color: red">我们把两个组合类的笛卡尔积对应成了它们生成函数的乘积。</span>
>
> - 另外需要注意，有序列表可以看成有序对的不断嵌套，比如 $(((1,2),1),3)$ 其实就是 $(1,2,1,3)$。

我们都知道，任何一棵无标号有根树都可以这样表示：

- 它的根，和它的子树列表（一个由无标号有根树构成的无序列表）。

不妨记为
$$
\mathcal T^{\square}=\text{MSET}(\mathcal T)
$$

其中，$^{\square}$ 的意义是去掉根，而 $\text{MSET}(\mathcal A)$ 的意义是"所有由 $\mathcal A$ 中元素构成的无序列表"。下面我们的任务就变成：<span style="color: red">为 $^{\square}$ 和 $\text{MSET}$ 找到对应的生成函数运算。</span>

不妨记 $^{\square}$ 对应的是 $\text{xD}$，$\text{MSET}$ 对应的是 $\text{xexp}$。

# 2. $\text{xD}$ 的部分

$^{\square}$ 反映在生成函数上的效果是显然的：所有对象的节点数 $-1$，而 $w$ 不变。如果对所有对象求和就是
$$
\text{xD}:\sum_{a\in\mathcal A}\dfrac{w^k(a)x^{|a|}}{(|a|!)^k}\mapsto\sum_{a\in\mathcal A}\dfrac{w^k(a)x^{|a|}}{((|a|-1)!)^k}
$$
既然如此，我们也就没有必要枚举 $a$ 了，而是可以直接从 $T_k(\mathcal A)$ 的系数得到 $\text{xD}(T_k(\mathcal A))$。
$$
\text{xD}:\sum_{i=1}^{\infty}\dfrac{f_ix^i}{(i!)^k}\rightarrow\sum_{i=0}^{\infty}\dfrac{f_{i+1}x^i}{(i!)^k}
$$
# 3. $\text{xexp}$ 的部分

回忆 OGF 中有个叫"Euler 变换"的东西，它是
$$
\text{Euler}:T_0(\{a\})\mapsto\sum_{i=0}^{\infty}\left(x^{|a|}\right)^i\\
\text{Euler}:T_0(\mathcal A)\mapsto\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}\left(x^{|a|}\right)^i
$$
说白了：如果把无序列表看成排序过的有序列表，那么这里就是枚举每个元素用了几个。

回忆 EGF 中有个叫 $\exp$ 的东西，它是
$$
\exp:T_1(\{a\})\mapsto\sum_{i=0}^{\infty}\dfrac{\left(\frac{w(a)x^{|a|}}{|a|!}\right)^i}{i!}\\
\exp:T_1(\mathcal A)\mapsto\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}\dfrac{\left(\frac{w(a)x^{|a|}}{|a|!}\right)^i}{i!}
$$
考虑它的含义：还是枚举每个元素选几个，然后如果你选了 $i$ 个 $a$，那么在分配标号的时候还要除以 $i!$。

为什么呢？因为你把 $\frac{w(a)x^{|a|}}{|a|!}$ 硬乘时实际上是把 "$i$ 个 $a$" 当有序列表来分配标号的，然而这 $i$ 个 $a$ 之间的标号分配方式可以任意互换，即一些标号分配方式互相等价。然后你又会发现，每个等价类大小恰好是 $i!$，于是就有了上式。

那么我们这里的 $\text{xexp}$ 自然也就很明朗了：
$$
\text{xexp}:T_k(\{a\})\mapsto\sum_{i=0}^{\infty}\dfrac{\left(\frac{w^k(a)x^{|a|}}{(|a|!)^k}\right)^i}{(i!)^k}\\
\text{xexp}:T_k(\mathcal A)\mapsto\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}\dfrac{\left(\frac{w^k(a)x^{|a|}}{(|a|!)^k}\right)^i}{(i!)^k}
$$
我们分配了 $k$ 次标号，自然就要除以 $(i!)^k$。

$k=0$ 的时候 $\text{xexp}$ 退化为 $\text{Euler}$ 变换。$\text{Euler}$ 变换的性质好在：对于单个元素， $\text{Euler}$ 变换的乘法逆很简单（从而可以方便地求 $\ln$）。

$k=1$ 的时候 $\text{xexp}$ 退化为 $\exp$。$\exp$ 的性质好在 $\exp(a)\cdot\exp(b)=\exp(a+b)$。

不幸的是 $\text{xexp}$ 两个性质都没有。所以我们只能大力 $\ln$：

$$
\exp\sum_{a\in\mathcal A}\ln\circ\operatorname{xexp}\color{orange}T(\{a\})
$$
接下来任务就变成求解 $\sum_{a\in\mathcal A}\ln\circ\operatorname{xexp}(T\{a\})$。

## 3.1. 对于单个元素

$$
\ln\circ\operatorname{xexp}T(\{a\})=\ln \sum_{i=0}^{\infty}\dfrac{\left(\frac{w^k(a)x^{|a|}}{(|a|!)^k}\right)^i}{(i!)^k}
$$
事实上可以预处理。下面不妨记
$$
\ln\sum_{i=0}^{\infty}\dfrac{x^i}{(i!)^k}=\sum_{i=0}^{\infty}f_ix^i
$$
那么之前的式子就是将 $x\leftarrow \frac{w^k(a)x^{|a|}}{(|a|!)^k}$ 代入其中。

## 3.2. 对于整个组合类

$$
\begin{aligned}
\sum_{a\in\mathcal A}\ln\circ \operatorname{xexp}T(\{a\})&=\sum_{a\in\mathcal A}\sum_{j=0}^{\infty}f_i\left(\frac{w^k(a)x^{|a|}}{(|a|!)^k}\right)^i\\
&=\sum_{i=0}^{\infty}f_i\sum_{a\in\mathcal A}\frac{w^{ik}(a)x^{i|a|}}{(|a|!)^{ik}}\\
&=\sum_{i=0}^{\infty}f_iT_{ik}(\mathcal A;x^i)
\end{aligned}
$$

即，
$$
\operatorname{xD}T_k(\mathcal A;x)=\exp\sum_{i=0}^{\infty}f_iT_{ik}(\mathcal A;x^i)
$$
这便是最终式子了。它的处理细节和复杂度分析等参见[这篇题解](https://xyix.gitee.io/posts/?page=0&postname=luogu-4500)。

