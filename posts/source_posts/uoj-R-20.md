---
title: UR#20 题解 - 跳蚤电话 / 机器蚤分组 / 金坷垃
---

# T1 跳蚤电话

>**题目大意.**
>
>现有一棵 $n$ 个节点的树，你可以反复执行如下操作：
>
>- 删去一个叶子。
>- 缩掉一个度为 $2$ 的节点。
>
>求有多少种缩删点的顺序能使最终只剩下 $1$ 号节点。
>
>$n\le 2000$。

自然考虑树形 DP。设 $f_u$ 表示 $u$ 有一个不能删的父亲时删光 $u$ 所在子树的方案数。下面为了方便，令 $f_u\leftarrow f_u/\text{siz}(u)$（即，随机选一个操作序列，$f_u$ 能被合法删光的概率）

枚举子树 $u$ 中最后一个被消除的点 $v$（每个点最后一个被消除的概率都是 $1/\text{siz}_u$），显然它一定是被删的。而 $u$ 到 $v$ 的路径上的点一定都是被缩的，而且是它们"所在的块"中最后一个被消除的。

<center><div style="width:40%;margin:0"><img src="https://xyix.github.io/images/uoj-R-20-1.png" style="width: 70%" alt=""></div></center>

导出的 DP 也就显然了。
$$
f_u=\dfrac{1}{\text{siz}_u}\sum_{v\in T_u}\prod_{i=0}\dfrac{\prod_{w\in\text{son}(u_i),w\neq u_{i+1}}f_w}{\text{siz}_{u_i}-\text{siz}_{u_{i-1}}}
$$
然而你会发现这很浪费，我们这样考虑：一个节点可以自己最后一个被删也可以把"决定谁最后一个被删"的任务丢给自己的某个子树，即
$$
f_u=\dfrac{1}{\text{siz}_u}\prod_{v\in\text{son}_u}f_v+\sum_{v\in\text{son}_u}\dfrac{\text{siz}_v}{\text{siz}_u}\cdot f_v\cdot\dfrac{\prod_{w\in\text{son}_u,w\neq v}f_w}{\text{siz}_u-\text{siz}_v}
$$
这就做完了。

----

然而还可以继续考虑，原 DP 式就是
$$
f_u=\dfrac{1}{\text{siz}_u}\left(1+\sum_{v\in\text{son}_u}\dfrac{\text{siz}_v}{\text{siz}_u-\text{siz}_v}\right)\cdot\prod_{v\in\text{son}_u}f_v
$$
于是
$$
f_1=\prod_{u}\dfrac{1}{\text{siz}_u}\left(1+\sum_{v\in\text{son}_u}\dfrac{\text{siz}_v}{\text{siz}_u-\text{siz}_v}\right)
$$

# T2 机器蚤分组

> **题目大意.**
>
> 定义两个串的 $\subset$ 关系是：前者是后者的子串。
>
> 现在给出一个 $s$ 和 $q$ 次询问：考虑对于 $s[l:r]$ 的所有本质不同子串，求其最长反链。
>
> $|s|,q\le 10^5$。

众所周知最小链覆盖等于最长反链。（Dilworth 定理）

这个图显然很有特色：如果串内的每一个字符都不相同，那么整个图恰好是一个塔形。如果有相同的子串再把节点缩起来。

<center><div style="width:60%;margin:0"><img src="https://xyix.github.io/images/uoj-R-20-2.png" style="width: 70%" alt=""></div></center>

很直观的是，

> 所有链很有可能在某一层全都有点，于是答案就是各层"宽度"的最大值。

这个结论是正确的，果然爱拼才会赢！证明如下。

> 假如有一个串长不全相等的反链，则我们一定可以把它调整为一个串长全相等的反链：
>
> 考虑其中长度最短的串们，记其长度为 $L$，从中挑出一个 $[p-1,p+L-2]$ 或 $[p+1,p+L]$ 皆不存在于原反链的串 $[p, p+L-1]$（容易发现它总是存在），然后把它换成 $[p-1,p+L-1]$ 或 $[p,p+L]$。
>
> <center><div style="width:60%;margin:0"><img src="https://xyix.github.io/images/uoj-R-20-3.png" style="width: 100%" alt=""></div></center>

然而还是不好做。下面这一个结论就属实有点难看出来了：

> 答案 $\ge n-k+1$ 当且仅当长度为 $k$ 的所有串互不相同。

证明如下：

> 充分性显然，考虑必要性。
>
> 假设现有两个长为 $k$ 的串 $a,b$ 只需要研究长度为 $L<k$ 的所有串，我们来证明它们的数量不会超过 $n-k$。
>
> 这其实是显然的，因为 $a,b$ 内部恰有 $k-L+1$ 个长为 $L$ 的串对应相等，故长为 $L$ 的串的数量一定不会超过 $n-L+1-(k-L+1)=n-k$。

于是 SAM+LCT 维护即可。

总结：<span style="color: red; font-weight: bold">字符串题的关键不是在于怎么证而是证什么。</span>

# T3 金坷垃

> 给出固定参数 $m$，现在有 $n$ 个**实数**随机变量 $a_i$ 分别在 $[b_i,b_i+m]$ 中均匀随机。对 $1\le i\le n$ 求第 $i$ 大的随机变量的期望。
>
> $n\le 2000,m\le 10^8$。

记 $A_i(x)$ 为 $a_i>x$ 的概率，是个分段函数。

自然考虑 rank $i$ 大于 $x$ 的概率：把这个东西积一下就是答案。我们会写出
$$
\sum_{|S|\ge i}\prod_{u\in S}A_u(x)\cdot\prod_{u\notin S}(1-A_u(x))
$$
不妨记
$$
\begin{aligned}
F(i,x)&=\sum_{|S|{\color{red}=}i}\prod_{u\in S}A_u(x)\cdot\prod_{u\notin S}(1-A_u(x))\\
&=\sum_{|S|\ge i}(-1)^{|S|-i}{|S|\choose i}\prod_{u\in S}A_u(x)
\end{aligned}
$$
再一次，不妨记
$$
F(i,x)=\sum_{j\ge i}(-1)^{j-i}{j\choose i}G(j,x)\\
G(i,x)=\sum_{|S|=i}\prod_{u\in S}A_u(x)
$$
剩下的问题就是怎么求 $G$。

对于 $G$ 的某一段，所有的 $A$ 都是一次函数且斜率要么为 $0$ 要么为 $\frac1m$。斜率为 $0$ 的可以强行提出来，对于斜率为 $\frac 1m$ 的部分，此处有一个神妙的观察：$G(i,x)$ 一定是 $\left(\prod_u A_u(x)\right)^{(n-i)}$ 再乘上一个常数。而最终的积分也就变为了要求 $G(i+1,x)$ 的点值。

又可见相邻两段的答案是很相关的，只需要做一次卷积。时间复杂度 $O(n^2\log n)$。

~~哈哈，全是口胡！~~

