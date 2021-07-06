---
title: 迫真数论笔记：偏序集计数和莫比乌斯函数
---

# 1 多得可怕的定义

> 除此阅读时建议跳过，当后文出现你不清楚的词汇时再来查阅。

## 1.1 基础定义

定义一个**偏序集**（Partially Ordered SET, poset）是一个对象的集合 $P$ 和一个 $P$ 上的二元关系 $\le_P$ 构成的二元组。且 $\le$ 满足三个性质：

- $t\le t$。（自反性）
- $s\le t\land t \le s\Rightarrow s=t$。（反对称性）
- $s\le t,t\le u\Rightarrow s\le u$。（传递性）

如果对于 $s,t$，有 $s\le t$ 或 $t\le s$，则说 $s,t$ 是**可比的**。否则当然是不可比的。

## 1.2 子偏序

我们说两个偏序集**同构**，记作 $P\cong G$，如果存在**保序**双射 $\phi:P\leftrightarrow Q$。一个映射保序是说，这个映射 $\phi$ 满足 $s\le_P t\Leftrightarrow \phi(s)\le_Q \phi(t)$。

一个偏序集 $Q$ 是 $P$ 的**弱子偏序集**，如果 $Q\subseteq P$ 且 $s\le_Q t\Rightarrow s\le_Pt$。如果 $P=Q$（在集合意义上），那么还说 $P$ 是 $Q$ 的一个**精炼**（refinement）。

一个偏序集 $Q$ 是 $P$ 的**诱导子偏序集**（简称**子偏序集**），如果 $Q\subseteq P$ 且 $s\le_Q t\Leftrightarrow s\le_P t$。

> 可见子偏序集是原偏序集的限制，弱子偏序集是在子偏序集的基础上丢掉了一些偏序关系。

一种特殊的子偏序集 $[s,t]$ 被称为**区间**，它们恰由 $\{s\le u\le t,u\in P\}$ 的元素构成。如果再加上 $u\neq s,t$ 的限制便得到开区间。（为了方便，我们把 $\le$ 且不等于直接记为 $<$）

如果 $P$ 中的任何区间皆是有限的，那么称 $P$ 是**局部有限**的。

## 1.3 覆盖，图表示

想象一个局部有限偏序集，它的 $\le$ 一定总是存在着“最小单位”。严谨地说一个 $t$ **覆盖**了 $s$，记作 $s\lessdot t$，如果 $[s,t]=\{s,t\}$（为了防止混淆，我们尽量不用开区间符号）。在局部有限偏序集的情况下，任何 $\le$ 都可以由覆盖链“生成”。

> 我们如此强调局部有限，是因为上述结论在非局部有限集上很可能不成立。可参考类似有理数集或实数集的情形。

一种局部有限偏序集的表示方法是画图，只画出所有的覆盖边，覆盖者在被覆盖者的上方。

<div style="width:70%;margin:auto"><img src="https://xyix.github.io/images/mobi1.png" alt=""></div>

有时候我们会给一个偏序集加上两个元素 $\hat 0$ 和 $\hat 1$。$\hat 0$ 小于等于任意元素，任意元素 $\hat 1$。偏序集 $P$ 加上了 $\hat0,\hat 1$（即使它原来就有和 $\hat 0,\hat 1$ 类似的元素）得到的偏序集记作 $\widehat P$。

## 1.4 链

一条**链**是一个任何任意两个元素都可比的偏序集（如上图标记的 $\mathbf 5$）。链的**长度** $\ell(C)$ 是 $\#C-1$。如果链 $C$ 是 $P$ 的子偏序链，且没有其他子偏序链包含 $C$，则称 $C$ 是一条**极大**的链。一条链是**饱和**的，如果不存在 $u\in P/C\land \exists s,t\in C,s<u<t$ 使得 $C\cup\{u\}$ 仍是 $P$ 的一条链。

> 显然：极大链总是饱和的，但是饱和链不一定是极大的。

## 1.5 排名

一个局部有限偏序集的**长度**是其最长链的长度。如果 $P$ 中每一条极大链的长度皆相等，则我们总是可以唯一定义一个**排名函数** $\rho$，使得 $t\gtrdot s\Rightarrow\rho(t)=\rho(s)+1$，小于等于任意元素的元素的排名为 $0$。

总是有 $\rho(t)-\rho(s)=\ell([s,t])$，故也记为 $\rho(s,t)$。

记 $P$ 中元素的最大排名为 $r(P)$。

一个偏序集的**排名生成函数**是
$$
F(P;x)=\sum_{s\in P}x^{\rho(s)}
$$
上述定义皆可以推广至可数无限的情形。

## 1.6 反链和理想

一个**反链**是一个 $P$ 的子集，其中任意两个元素都不可比。

一个**理想** $I$ 是一个 $P$ 的子集，若 $t\in I,s\in P,s\le t$，则 $s\in I$。

一个**滤子**则反之：若 $t\in I,s\in P,t\le s$，则 $s\in I$。

所有 $P$ 的理想按包含关系形成了另一个偏序集，记作 $J(P)$。

在 $P$ 有限的情形下，反链和理想一一对应：$I=\{s\in P,\exists t\in A,s\le t\}$。称 $A$ **生成**了 $I$。

若 $I$ 由仅有一个元素 $t$ 构成的反链生成，则称 $I$ 是 $t$ 的**主理想** $\Lambda_t$。

## 1.7 偏序集运算

两个*不相交*的偏序集 $P,Q$ 的**直和** $P+Q$ 是指以下资料构成的二元组：

- 集合 $P\cup Q$。
- 一个新的偏序关系 $\le_{P+Q}$，定义如下（其中 $[\ ]$ 指的是艾弗森括号）

$$
[s\le_{P+Q} t]=\begin{cases}[s\le_P t]&,s\in P,t\in P\\ [s\le_Q t]&,s\in Q,t\in Q\\0&,\text{otherwise}\end{cases}
$$

两个*不相交*的偏序集 $P,Q$ 的**序和** $P\oplus Q$ 是指以下资料构成的二元组：

- 集合 $P\cup Q$。
- 偏序关系 $\le_{P\oplus Q}$，定义如下

$$
[s\le_{P\oplus Q} t]=\begin{cases}[s\le_P t]&,s\in P,t\in P\\ [s\le_Q t]&,s\in Q,t\in Q\\ [s\in P]&,\text{otherwise}\end{cases}
$$

> 把 $P\oplus P\oplus\ldots\oplus P$ 记作 $nP$。

两个偏序集 $P,Q$ 的**直积** $P\times Q$ 是指以下资料构成的二元组：

- 集合 $P\times Q=\{(u,v)\ |\ u\in P, v\in Q\}$。
- 偏序关系 $\le_{P\times Q}$，定义如下

$$
[(s_p,s_q)\le_{P\times Q}(t_p,t_q)]=[s_p\le_P t_p]\cdot[s_q\le_Q t_q]
$$

> 显然有 $P\times Q =Q\times P$。
>
> 我们还指出，若 $P,Q$ 上皆有排名函数，则有
> $$
> F(P\times Q;x)=F(P;x)F(Q;x)
> $$

两个偏序集 $P,Q$ 的**序积** $P\otimes Q$ 是指以下资料构成的二元组：

- 集合 $P\times Q$。
- 偏序关系 $\le_{P\otimes Q}$，定义如下

$$
[(s_p,s_q)\le_{P\otimes Q}(t_p,t_q)]=\begin{cases}[s_p\le_P t_p]&,s_p\neq t_p\\ [s_q\le_Q t_q]&,\text{otherwise}\end{cases}
$$

> 若 $P,Q$ 上皆有排名函数，则有
> $$
> F(P\otimes Q;x)=F(P;x^{r(Q)+1})F(Q;x)
> $$

在两个偏序集 $P,Q$ 上定义**幂** $Q^P$ 为所有 $P\rightarrow Q$ 且保序的映射的集合。

称 $P^{*}$ 是 $P$ 的**对偶**，如果 $s\le_P t\Leftrightarrow t\le_{P^*}s$。

# 2 格（lattice）

定义两个元素 $s,t$ 的**最小上界**，或称**并**，是 $s\le u$ 且 $t\le u$ 中的最小者（严格要求任何其他的 $u$ 都能与之比较）。如果它的确存在，则记其为 $s\lor t$。

类似地，定义**最大下界** $s\land t$。

> 有时 $s\lor t$ 不存在的原因包括但不限于：
>
> - 根本不存在上界；
> - 存在一些不大于其他上界的上界，但它们之间不能互相比较；
> - 根本不存在不大于其他上界的上界：考虑偏序集 $\{{\color {blue}1},{\color{red} 1}\}\cup(2,3]$（按实数偏序关系）中 ${\color {blue}1}$ 和 ${\color {red}1}$ 的上界们是 $(2,3]$，但它显然不存在最小值。

> 显然，任何有限偏序集总是有 $\hat 0$ 和 $\hat 1$。
>
> 任何已经证明了*最大下界总是存在*的*有限*偏序集，如果还存在 $\hat 1$，则必定是一个格。证明如下。
>
> > 显然 $s$ 和 $t$ 的上界集合不为空（$\hat 1$），故 $s,t$ 的最大上界是上界集合的下界。由于 $P$ 有限且任意一对元素有最大下界，故其任意一个子集一定有下界。这就证明了上述引理。$\blacksquare$

一种格特别重要，它们被称为**分配律格**，即满足下述的分配律
$$
\quad r\land(s\lor t)=(r\land s)\lor(r\land t)\\
或\ r\lor(s\land t)=(r\lor s)\land(r\lor t)
$$
容易验证上述两个分配律是等价的。

> **定理（有限分配律格基本定理）.** 若 $L$ 是有限分配律格，则唯一（精确到同构）存在一个 $P$ 使得 $L\cong J(P)$。
>
> 这里不给出证明。
>
> 上述定理可直接扩展到 $L$ 为局部有限分配律格的情形。

> 我们进一步指出：若 $P$ 的大小为 $n$，则 $r(J(P))=n$。而一个 $L\in J(P)$ 的排名 $\rho(L)$ 就等于（把它看作一个理想时）它的大小。

# 3 接合代数（Incidence Algebras）

记局部有限偏序集 $P$ 上的所有区间构成的集合为 $\text{Int}(P)$，**接合代数**指的是所有函数 $f:\text{Int}(P)\rightarrow K$，$K$ 是任意一个域。接合代数上定义了如下的**卷积**
$$
fg(r,t)=\sum_{r\le t\le s}f(r,s)g(s,t)、
$$
很明显可以看出“接合”代数一名的来源。

接合代数上的单位元是显然的：$1(s,t)=[s=t]$。

> 我们指出以下论断皆等价。
>
> - $f$ 有左乘法逆。
> - $f$ 有右乘法逆。
> - $f$ 的左右乘法逆皆唯一且相等。
> - 总是有 $f(t,t)\neq 0$。

## 3.1 zeta 和 mu

定义 zeta 函数：$\zeta(s,t)=1$。

zeta 函数的组合意义是比较丰富的，如：

> $\zeta^k(s,t)$ 是链 $s\le u_1\le\ldots\le u_{k-1}\le t$ 的数量。
>
> $(\zeta-1)^k(s,t)$ 是链 $s<u_1<\ldots<u_{k-1}<t$ 的数量。

而 zeta 函数的乘法逆就是我们的标题：莫比乌斯函数 $\mu$。显然其定义如下（大力求逆即可）。
$$
\mu(s,t)=\begin{cases}1&,s=t\\-\sum_{s\le u<t}\mu(s,u)&,s\neq t\end{cases}
$$
于是我们立即得到以下两个方向的**莫比乌斯反演**。

> $$
> f(s)=\sum_{t\le s}g(t)\Longleftrightarrow f=g\zeta\Longleftrightarrow f\mu=g\Longleftrightarrow g(s)=\sum_{t\le s}f(t)\mu(t,s)\\
> f(s)=\sum_{t\ge s}g(t)\Longleftrightarrow f=\zeta g\Longleftrightarrow \mu f=g\Longleftrightarrow g(s)=\sum_{t\ge s}\mu(s,t)f(t)
> $$

容易发现这直接得出了子集反演，当然也就得出了二项式反演。（包含关系可看成偏序）

接下来挖掘莫比乌斯函数的更多性质。我们指出

> $$
> \mu_{P\times Q}((s_p,s_q),(t_p,t_q))=\mu_P(s_p,t_p)\mu_Q(s_q,t_q)
> $$

这直接解释了数论中的莫比乌斯函数。（整除关系作为偏序）

我们再指出

> **定理（Hall 定理）.**
>
> 令 $P$ 是一个有 $\hat 0$ 和 $\hat 1$ 的偏序集（特别地，区间显然满足条件）。令 $c_i$ 等于链 $\hat 0< u_1<\ldots<u_{i-1}<\hat 1$ 的数量。则
> $$
> \mu(\hat 0,\hat 1)=c_0-c_1+c_2-c_3+\ldots
> $$

请和二分图匹配的 Hall 定理区别开来。证明非常显然，不表。