---
title: 《数论函数中的一些结论》翻译与改正
---

又到了快乐的[读论文](https://arxiv.org/pdf/1909.07823.pdf)时间

首先引入一些函数

- 假设 $n$ 的分解为 $p_1^{e_1}p_2^{e_2}...p_{r}^{e_r}$，则记 $\omega(n)=r,\text{rad}(n)=p_1p_2...p_r$。

> **定理 1.** 记
> $$
> \rho(n,k)=\sum_{a_1a_2...a_k=n}[a_i\ \text{两两互质}]
> $$
> 则 $\rho(n,k)=k^{\omega(n)}$。

**证明**：考虑归纳。当 $k=1$ 时是显然的。假设对任意 $n$ 有 $\rho(n,k-1)=(k-1)^{\omega(n)}$，我们来证明这使得 $k$ 的情形也成立。考虑 $a_k$，如果它含有某个质因子 $p$，它一定取走了 $n$ 中的所有 $p$。从而显然可以写出
$$
\begin{aligned}\rho(n,k)&=\sum_{i=0}^r{r\choose i}(k-1)^{r-i}\\&=k^r\end{aligned}
$$
也就是 $\rho(n,k)=k^{\omega(n)}$。$\square$

- 记 $\varphi(x,a)$ 是 $\le x$ 的数中与 $a$ 互质的个数。

- 记

- $$
  \mathcal R(n,k)=\sum_{i=1}^n\rho(i,k)\\
  \mathcal S(n)=\mathcal R(n,2)\\
  \mathcal T(n)=\sum_{i=1}^n\sigma_0(n)=\sum_{i=1}^n\Big\lfloor\dfrac ni\Big\rfloor
  $$

> **引理 1.** 
> $$
> \sum_{d|n}\mu^2(d)=2^{\omega(n)}=\rho(n,2)
> $$

**证明**：可以用[狄利克雷生成函数](/posts/dirichlet-GF.html)立即得出，但没必要。显然等式左边等于
$$
\prod_{i=1}^r(1+\mu^2(p_i)+0+0+...)
$$
立即得证。$\square$

下面给出两个计算 $\mathcal S$ 的方法。

> **定理 2.** 
> $$
> \mathcal S(n)=1+\sum_{1\le i<\sqrt n}\left(\varphi\left(\Big\lfloor\dfrac ni\Big\rfloor,i\right)-\varphi(i)\right)
> $$

**证明**：根据 $\mathcal S$ 的意义，它可写成
$$
\sum_{ab\le n}[\gcd(a,b)=1]
$$
从而原定理就显然了。$\square$

> **定理 3.**
> $$
> \mathcal S(n)=\sum_{i=1}^{\lfloor\sqrt n\rfloor}\mu(i)\mathcal T\left(\Big\lfloor\dfrac n{i^2}\Big\rfloor\right)
> $$
> 请注意原文的定理是明显**错误**的。应把减号改成加号。

**证明**：由**引理 1** 得
$$
\begin{aligned}\mathcal S(n)&=\sum_{i=1}^n\sum_{j|i}\mu^2(j)\\&=\sum_{j=1}^n\mu^2(j)\Big\lfloor\dfrac nj\Big\rfloor\end{aligned}
$$
下面我们证明，

> **引理 2.**
> $$
> \sum_{i^2|n}\mu(i)=\mu^2(n)
> $$

**证明**：容易发现等式两边都是积性函数，我们只需要验证它们在质数处相等即可。
$$
\sum_{i^2|p^e}\mu(i)=\mu(1)+\mu(p)[e\ge 2]=[e\le 1]=\mu^2(p^e)\qquad\square
$$
从而几乎立即得到原定理。$\square$

结合以上两个定理我们得到另一个~~根本没用的~~定理

> **定理 4.**
> $$
> 1+\sum_{1\le i<\sqrt n}\left(\varphi\left(\Big\lfloor\dfrac ni\Big\rfloor,i\right)-\varphi(i)\right)=\sum_{i=1}^{\lfloor\sqrt n\rfloor}\mu(i)\mathcal T\left(\Big\lfloor\dfrac n{i^2}\Big\rfloor\right)
> $$

下面为了导出对更一般的 $\mathcal R$ 的结果新定义一些记号。

- $d(n,k)$ 是把 $n$ 写成 $k$ 个数之积的方案数。即不要求互质的 $\rho$。显然 $d$ 对 $n$ 积性。从而我们考虑 $d(p^e,k)$。简单的组合数学可以得到 $d(p^e,k)={e+k-1\choose k-1}$。
- $D(n,k)=\sum_{i=1}^nd(n,k)$。易知有 $D(n,1)=n,D(n,2)=\mathcal T(n)$。

显然有
$$
D(n,k)=\sum_{a_1=1}^nD\left(\Big\lfloor\dfrac n{a_1}\Big\rfloor,k-1\right)
$$
从而定理 3 可以写成
$$
\mathcal R(n,2)=\sum_{i=1}^{\lfloor\sqrt n\rfloor}\mu(i)D\left(\Big\lfloor\frac n{i^2}\Big\rfloor,2\right)
$$
