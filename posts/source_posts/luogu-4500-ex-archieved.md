---
title: ZJOI2018 树 —— 没有群论相关
---

这道刻在 DNA 里的好题想必大家都很熟悉，这里就不写题意了。

# 1. 起手式

- 记 $\mathcal T$ 是所有无根树的集合。$t$ 一般是无根树的记号。$|t|$ 表示 $t$ 的节点数。

- 记 $w(t)$ 为给 $t$ 分配 $k$ 次标号的方案数。不难看到

$$
w((t_1,t_2))=w(t_1)w(t_2){|t_1|+|t_2|\choose |t_1|}^k
$$

- 那么不妨搞一个神奇的 GF，

$$
\color{orange}T(\mathcal A;x)=\sum_{a\in\mathcal A}\dfrac{w(a)x^{|a|}}{(|a|!)^k}
$$

- 有时为了简略我们会简写为 $T(\mathcal A)$。

- 不难验证它的卷积就是上面描述的笛卡尔积。

那么我们都知道“无根树构成的无序列表加上根是无根树”，不妨记为
$$
\boxed{\mathcal T^{\square}=\text{MSET}(\mathcal T)}
$$

> 如果你不懂 Symbolic Method 可以看[这个](https://xyix.github.io/posts/?page=1&postname=combinatorics)作一个简单的入门。

# 2. 找出组合构造对应的代数运算

$^{\square}$ 的逆构造所对应的“积分”自然很简单，它的意义要符合“加上根”，此题根的标号一定最小故不影响 $w$，于是它就是 $x^n\rightarrow \dfrac{x^{n+1}}{(n+1)^k}$。

那么“$\text{MSET}$”所对应的运算呢？

回忆 OGF 中有个叫 $\text{MSET}$ 的构造，它是
$$
\prod_{a\in\mathcal A}\dfrac{1}{1-w(a)x^{|a|}}=\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}w^i(a)x^{i|a|}
$$
仔细思考它的含义。说白了不就是枚举每个元素选几个。

回忆 EGF 中有个叫 $\text{SET}$ 的构造，它是
$$
\text{exp}\sum_{a\in\mathcal A}\dfrac{w(a)x^{|a|}}{|a|!}=\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}\dfrac{w^i(a)x^{i|a|}}{(|a|!)^ii!}
$$
考虑它的含义。不就是枚举每个元素选几个，然后如果你选了 $i$ 个 $a$ 在分配标号的时候还要除以 $i!$，因为这 $i$ 个 $a$ 可以而且一定可以（这里是说，原本无法辨别的 $a$ 在分配标号后一定可以互相辨别）随便换。

那么我们这里的“$\text{MSET}$”自然也就很明朗了：
$$
\prod_{a\in\mathcal A}\sum_{i=0}^{\infty}\dfrac{\color{orange}w^i(a)x^{i|a|}}{{\color{orange}(|a|!)^{ik}}(i!)^k}
$$
我们分配了 $k$ 次标号，自然就要除以 $(i!)^k$。

记 $\sum_{i=0}^{\infty}\dfrac{x^i}{(i!)^k}$ 为 $\operatorname{xexp}x$。所谓“$\text{MSET}$”就是
$$
\prod_{a\in\mathcal A}\operatorname{xexp}\color{orange}T(\{a\})
$$
注意，$k=0$ 的时候 $\text{xexp}$ 的性质好在它的乘法逆很简单（从而可以方便地求 $\ln$），$k=1$ 的时候 $\text{xexp}$ 的性质好在 $\text{xexp}(a)\cdot\text{xexp}(b)=\text{xexp}(a+b)$。这可能是它们常用的原因。

不幸的是 $\text{xexp}$ 两个性质都没有。所以我们只能大力 $\ln$：

> 请区分 $\operatorname{xexp}$ 和 $\exp$，$\operatorname{xln}$ 和 $\ln$！这里的 $\exp$ 指的是保持 $\exp(a)\cdot\exp(b)=\exp(a+b)$ 的那个 $\exp$。

$$
\exp\sum_{a\in\mathcal A}\ln\circ\operatorname{xexp}\color{orange}T(\{a\})
$$
接下来任务就变成求解 $\sum_{a\in\mathcal A}\ln\circ\operatorname{xexp}(T\{a\})$。注意我们的任务是尽量把它化为一个仅和 $T(\mathcal A)$ 有关的形式，这样我们就可以得到一个两边都是 $T(\mathcal T)$ 的方程了。

# 3. 求解 ln xexp 的失败尝试

## 3.1. 对于单个元素

$$
\ln\circ\operatorname{xexp}{\color{orange}T(\{a\})}=\ln \color{blue}\sum_{j=0}^{\infty}\dfrac{w^{jk}(a)x^{|a|j}}{(|a|!)^{jk}(j!)^k}
$$
事实上可以预处理。下面不妨记
$$
\ln{\color{blue}\sum_{j=0}^{\infty}\dfrac{x^j}{(j!)^k}}=\sum_{j=0}^{\infty}f_jx^j
$$
那么之前的式子就是将 $x=w^kx^{|a|}$ 代入其中。

## 3.2. 对于整个组合类

下面为了简便，把 $\tfrac{w(a)}{(|a|!)^k}$ 记为 $w$。
$$
\sum_{a\in\mathcal A}\ln\circ \operatorname{xexp}{\color{orange}T(\{a\})}=\sum_{a\in\mathcal A}\sum_{j=0}^{\infty}f_j(w^kx^{|a|})^j=\sum_{j=0}^{\infty}f_j\color{green}\sum_{a\in\mathcal A}(w^kx^{|a|})^j
$$

你会发现这个东西怎么也没法和 $T(\mathcal A)$ 联系在一起。我们失败了。

不过，虽然这东西暂时和 $T(\mathcal A)$ 无关，不过我们可以试试强行让它和 $T(\mathcal A)$ 有关。

# 4. 重新开始

下面这一步是最为关键的一步，我们把 $T(\mathcal A)$ 改成二元生成函数
$$
\begin{aligned}{\color{orange}T(\mathcal A;x,y)}&=\sum_{a\in\mathcal A}x^{|a|}\sum_{i=0}^{\infty}\dfrac{{\color{red}w^i(a)}y^i}{(|a|!)^i}\\&=\sum_{a\in\mathcal A}\dfrac{x^{|a|}}{1-w(a)y/(|a|!)}\end{aligned}
$$
说人话就是保存 $k$ 为任意值时的答案。$y$ 的次数就是 $k$ 的值。

> 其中要注意 $\color{red}w^i(a)$ 其实指的是 $k=i$ 时的分配标号方案数，不过它也的确显然就是 $k=1$ 时的 $i$ 次方，所以我们就这么记算了。

既然重新编了生成函数，自然也要重新处理构造。

# 5. 找出组合构造对应的代数运算

可见笛卡尔积现在对应“$x$ 上的卷积，$y$ 上的点积”。

$^{\square}$ 对应的“积分”改为
$$
\int:{\color{orange}\dfrac{x^{|a|}}{1-w(a)y/(|a|!)}}\mapsto\dfrac{x^{|a+1|}}{1-w(a)y/((|a|+1)!)}
$$

而且注意根据组合意义积分自然具有线性。

不能死板地使用 $\text{xexp}$：$k$ 都不一样了，自然也不能用之前的定义。易知应重新定义为
$$
\text{xexp}:{\color{orange}T(\{a\};x,y)=\dfrac{x^{|a|}}{1-w(a)y/(|a|!)}}\mapsto\sum_{i=0}^{\infty}y^i\color{blue}\sum_{j=0}^{\infty}\dfrac{w^{ij}(a)x^{|a|j}}{(|a|!)^{ij}(j!)^i}
$$
注意整个 $\text{xexp}$ 完全是我们按想要的组合意义编出来的。没有像 $1+\tfrac{x}{(1!)^k}+\tfrac{x^2}{(2!)^k}+...$ 那样的幂级数表达式也很正常。

# 6. 回到 ln xexp

前面的推导都相同，直到我们刚失败时的那一步：
$$
{\color{violet}[y^k]}\sum_{a\in\mathcal A}\ln\circ \operatorname{xexp}{\color{orange}T(\{a\})}=\sum_{j=0}^{\infty}f_j\color{green}\sum_{a\in\mathcal A}(w^kx^{|a|})^j
$$
注意到 $\color{green}[y^k]T(\mathcal A)=\sum_{a\in\mathcal A} w^kx^{|a|}$，于是 $\color{green}\sum_{a\in\mathcal A} w^{jk}x^{j|a|}=[y^{jk}]T(\mathcal A;x^j,y)$。

则有
$$
[y^k]\sum_{a\in\mathcal A}\ln\circ\operatorname{xexp}{\color{orange}T(\{a\})}=\sum_{j=0}^{\infty}f_j[y^{jk}]\color{green}T(\mathcal A;x^j,y)
$$
最后我们回到原式。
$$
\boxed{[y^k]T(\mathcal T)=\int\text{exp}\sum_{j=0}^{\infty}f_j[y^{jk}]T(\mathcal T;x^j,y)}
$$

这便是最终式子了。它的处理细节和复杂度分析等参见[这篇题解](https://xyix.github.io/posts/?page=0&postname=luogu-4500)。