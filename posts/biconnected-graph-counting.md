---
title: 边/点双连通图计数
date: 2020-06-11 19:43:26
tags:
- 数学
- 计数
- 生成函数
- 多项式
- 拉格朗日反演
---

有标号边/点双连通图计数。

<!--more-->

下面只讨论有根情况，无根情况即乘以 $\dfrac 1 n$。

答案为 $g_n$。

# 有标号边双连通图计数

我们都知道[有标号无向连通图](https://www.luogu.com.cn/problem/P4841)的 EGF 怎么求。记为 $F(x)$。

对于一个无向连通图，枚举根节点所在边双连通分量的大小。剩下的部分是一个个无向连通图，挂在根边双联通分量的任意一个点上，于是有

$$
F(x)=\sum_{i=1}^{\infty}\dfrac{g_ix^i\exp(iF(x))}{i!}=G(x\exp F(x))
$$

这里出现了一个复合，难以处理，需要请出一个新的工具：

# 拉格朗日反演

$$
[x^n]A(B^{-1}(x))=\dfrac 1n[x^{n-1}]A'(x)\left(\dfrac{x}{B(x)}\right)^n
$$

回到**边双连通图计数**的问题上。

设 $H(x)=x\exp F(x)$，则

$$
F(x)=G(H(x))
$$

$$
[x^n]F(H^{-1}(x))=\dfrac 1n[x^{n-1}]\dfrac{F'(x)}{\exp nF(x)}=[x^n]G(x)
$$

# 有标号点双连通图计数

根有可能存在于多个点双中，这些点双显然两两间只有根一个交点，如果把根去掉，那么原图会被分为数个连通块，一个点双对应一个。所以把连通块 exp 即可。下面分析单个连通块。

枚举点双大小 $i+1$，显然它的 EGF 是

$$
\sum_{i=1}^{\infty}g_{i+1}\dfrac{F(x)^i}{i!}
$$

这里 $G(x)$ 移了一位，是 $\sum_{i=1}^\infty g_{i+1}\dfrac{x^i}{i!}$。有

$$
F(x)=x\exp G(F(x))
$$

$$
\ln\dfrac{F(x)}{x}=G(F(x))
$$

$$
[x^n]\ln\dfrac{F(F^{-1}(x))}{F^{-1}(x)}=\dfrac{1}{n}[x^{n-1}]\left(\ln\dfrac{F(x)}{x}\right)'\left(\dfrac{x}{F(x)}\right)^n=[x^n]G(x)
$$

设 $H(x)=\dfrac{F(x)}x$，则有

$$
[x^n]G(x)=\dfrac{1}{n}[x^{n-1}]\dfrac{H'(x)}{H^{n+1}(x)}
$$