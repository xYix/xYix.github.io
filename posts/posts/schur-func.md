---
title: Symmetric Function 的部分应用（EC Chapter 7 中的有趣 Excercise）
---

# Part 1 - 抠格子问题

考虑下面这两个函数
$$
U(f)=(x_1+x_2+\ldots)f\\
D(f)=\dfrac{\part f}{\part(x_1+x_2+\ldots)}
$$
不难发现，
$$
DU^k=kD^{k-1}+U^kD
$$
于是可以通过归纳得到
$$
\color{#ea6965}(U+D)^{n}=\sum_{i+j\le n\\r:=(n-i-j)/2\\r\in\N}\dfrac{n!}{2^rr!i!j!}U^iD^j
$$

----

那么这东西有什么用呢？

有
$$
\color{#ea6965}U(s_{\lambda})=\sum[\mu=(\lambda_1,...,\lambda_i+1,...,\lambda_{\ell})]s_{\mu}\\
\color{#ea6965}D(s_{\lambda})=\sum[\mu=(\lambda_1,...,\lambda_i-1,...,\lambda_{\ell})]s_{\mu}
$$
注意下式中还必须保证 $\mu$ 仍是划分。

你不需要知道这两个式子为什么成立，因为它完全就是靠堆结论堆出来的，知道证明过程对理解没有帮助。如果你真的很好奇你可以看[这里](https://xyix.gitee.io/posts/?&postname=ec-chapter-7)。（unavailable yet……）

所以 $U,D$ 可以直接联系到那些"抠格子"问题，下面举一些例子。

----

> **问题.**
>
> 给定 $\lambda,n$。求有多少个这样的划分列
> $$
> \varnothing=\lambda_0,\lambda_1,...,\lambda_n=\lambda
> $$
> 其中 $\lambda_{i+1}$ 是 $\lambda_i$ 增加 / 抠掉一个格子得到的划分。答案记为 $\tilde f_n^{\lambda}$。

注意到 $D^*1=0$，易见
$$
\sum_{\lambda}\tilde f_n^{\lambda}s_{\lambda}=(U+D)^n1=\sum_{i\le n\\r:=(n-i)/2\\r\in\N}\dfrac{n!}{2^rr!i!}U^i1\\=\sum_{i\le n\\r:=(n-i)/2\\r\in\N}\dfrac{n!}{2^rr!i!}\left(\sum_{\lambda\vdash i}f^{\lambda}s_{\lambda}\right)
$$
立得答案：
$$
\color{#ea6965}\tilde f_{n}^{\lambda}=\dfrac{n!f^{\lambda}}{2^{r}r!|\lambda|!}\quad(2r=n-|\lambda|)
$$

----

> **问题.**
>
> 给定 $n,k$。求有多少个这样的划分列
> $$
> \lambda_0,\lambda_1,...,\lambda_{2k}
> $$
> 其中 $\lambda_{i+1}$ 是 $\lambda_i$ 增加 / 抠掉一个格子得到的划分，且 $\lambda_0=\lambda_{2n}$，且 $|\lambda_0|=n$。答案记为 $f_{2k}(n)$。

答案显然可以写为
$$
f_{2k}(n)=\sum_{\lambda\vdash n}[s_{\lambda}](U+D)^{2k}s_{\lambda}
$$
而我们知道 $\left<s_{\lambda},s_\mu\right>=[\lambda=\mu]$，且度数不同的 Symmetric Function 显然正交，故也可写成
$$
f_{2k}(n)=\sum_{\lambda\vdash n}\left<(U+D)^{2k}s_{\lambda},s_{\lambda}\right>\\
=\sum_{\lambda\vdash n}\left<\sum_{i=0}^k\dfrac{(2k)!}{2^{k-i}(k-i)!(i!)^2}U^iD^is_\lambda,s_{\lambda}\right>
$$
我们实际上在考虑线性变换 $U^iD^i$ 的*迹*。这提醒我们：

- 由于迹具有相似不变性，我们可以考虑把 $s$ 换成别的基。

考虑基 $p$。
$$
Dp_{\lambda}=\sum_iDp_{\lambda_i}\prod_{j\neq i}p_{\lambda_j}
$$
注意到 $\left<p_{\lambda},p_{\mu}\right>=z_{\lambda}[\lambda=\mu]$，而一旦 $p_{*},*\neq 1$ 被 $D$ 之后的新 $p$ 一定恢复不到 $p_{\lambda}$，所以：记 $m(\lambda)$ 为 $\lambda$ 中大小为 $1$ 的块数，有
$$
\left<U^iD^ip_{\lambda},p_{\lambda}\right>=z_{\lambda}m(\lambda)^{\underline i}
$$
即迹为 $\sum_{\lambda}m(\lambda)^{\underline i}$。故得
$$
f_{2k}(n)=\dfrac{(2k)!}{2^kk!}\sum_{i=0}^k{k\choose i}2^i\sum_{\lambda\vdash n}{m(\lambda)\choose i}
$$
易知 $\sum_{\lambda\vdash n}{m(\lambda)\choose i}=[x^n]\dfrac{x^i}{(1-x)^i}\prod_{j=1}^{\infty}\dfrac{1}{1-x^j}$，从而
$$
\color{#ea6965}\sum_{n=0}^{\infty}f_{2k}(n)x^n=\dfrac{(2k)!}{2^k!}\cdot\prod_{j=1}^{\infty}\dfrac{1}{1-x^j}\cdot\left(\dfrac{1+x}{1-x}\right)^k
$$

----

> 给定 $n,k$。求有多少个这样的划分列
> $$
> \lambda_0,\lambda_1,...,\lambda_{2k}
> $$
> 其中 $\lambda_{2i+1}$ 是 $\lambda_{2i}$ 抠掉一个格子得到的划分，$\lambda_{2i+2}$ 是 $\lambda_{2i+1}$ 增加一个格子得到的划分，且 $\lambda_0=\lambda_{2n}$，且 $|\lambda_0|=n$。答案记为 $g_{2k}(n)$。

有了之前的经验，本题求的就是 $(UD)^k$ 的迹。

而我们已经知道，
$$
\text{tr}(UD)=\sum_{\lambda}m(\lambda)
$$
而 $UD$ 在以 $p$ 为基下是一个上三角矩阵（回忆那句"新 $p$ 一定恢复不到 $p_{\lambda}$"），故，
$$
\text{tr}((UD)^{i})=\sum_{\lambda}m^i(\lambda)
$$
之前的 GF 简单表达大概是找不到了，下面给出一个退而求其次的形式。容易发现 $m(\lambda)=n-j$  的 $\lambda$ 恰有 $p(j)-p(j-1)$ 个，其中 $p$ 是划分数。于是答案即为
$$
\color{#ea6965}g_{2k}(n)=\sum_{j=0}^n(p(j)-p(j-1))(n-j)^k
$$
