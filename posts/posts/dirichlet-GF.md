---
title: 狄利克雷生成函数学习笔记
date: 2020-09-01 19:45:15
tags:
- 数学
- 数论
- $\color{red}精品$
---

对于一些奇怪的数论问题有奇效。也是对数论函数的另一种视角。

<!--more-->

## 基础形式

数列 $f$ 的狄利克雷生成函数是

$$
F(z)=\sum_{n=1}^{\infty}\dfrac{f(n)}{n^z}
$$

容易验证它的乘积就是狄利克雷卷积

$$
(F*G)(z)=\sum_{n=1}\dfrac{\sum_{d|n}f(d)g(\frac{n}{d})}{n^z}
$$

狄利克雷函数初看非常的诡异，它和普通型与指数型不同，并不是一个形式幂级数。我们介绍一些典型的狄利克雷生成函数来了解它的性质。

## 典型函数

过于显然地 $\left<1,0,0,...\right>$，也就是数论中的 $\varepsilon$ 函数，的狄利克雷生成函数是 1。

### zeta 函数

众所周知研究某型生成函数都要从 $\left<1,1,...\right>$ 开始，也就是数论中的 $\mathbf{1}$ 函数，它的狄利克雷生成函数是

$$
\sum_{n=1}^{\infty}\dfrac{1}{n^z}
$$

你可能已经在各种科普文上见过这个函数。这就是著名的黎曼 $\zeta$ 函数。

和 $\dfrac{1}{1-x}$ 以及 $e^x$ 不同，它的性质比较复杂，我们甚至不完全了解它的零点……不过这和接下来的介绍关系不大。

$\mathbf{1}$ 是一个（完全）积性函数，把 $n$ 分解质因数后每个 $p^k$ 对它的贡献是独立的，也就是说，一个积性函数 $f$ 的狄利克雷生成函数有下面的形式

$$
\prod_{p\text{ is a prime}}\sum_{k=0}^{\infty}\dfrac{f(p^k)}{p^{kz}}
$$

这个形式会极大地方便我们讨论积性函数的性质。比如 $\zeta(z)=$

$$
\prod_{p\text{ is a prime}}\sum_{k=0}^{\infty}\dfrac{1}{p^{kz}}
$$

$$
\prod_{p\text{ is a prime}}\dfrac{1}{1-p^{-z}}
$$

那么它的逆就是

### 莫比乌斯函数

$$
\prod_{p\text{ is a prime}}(1-p^{-z})
$$

当 $k=0$ 时贡献为 $1$，当 $k=1$ 时贡献为 $-1$，否则贡献为 $0$，正是莫比乌斯函数 $\mu$。也就是说

$$
\mu(z)=\zeta^{-1}(z)
$$

### ID 函数

$$
\sum_{n=1}^{\infty}\dfrac{n}{n^z}
$$

显然就是

$$
\zeta(z-1)
$$

同理，

$$
\mathbf{Id}_k(z)=\zeta(z-k)
$$

### 约数个数和

显然有

$$
\sigma_k(z)=\zeta(z)\zeta(z-k)
$$

### 欧拉函数

有

$$
\varphi(z)=\dfrac{\zeta(z-1)}{\zeta(z)}
$$

从中可以立刻看出欧拉函数的筛法：

$$
\prod_{p\text{ is a prime}}\dfrac{1-p^{-z}}{1-p^{1-z}}
$$

$$
\prod_{p\text{ is a prime}}1+\sum_{k=1}^{\infty}\dfrac{(p-1)p^{k-1}}{p^{kz}}
$$

也就是说，$p^k$ 的贡献是

$$
\begin{cases}1&(k=0)\\(p-1)p^{k-1}&(k\ge1)\end{cases}
$$

当质因数增加了一个 $p$ 的时候按这个柿子更新贡献即可。

## 实际应用

### 例一

筛出 $\varphi*\mu$。

### 解答

它就是 $\dfrac{\zeta(z-1)}{\zeta^2(z)}$，容易知道 $p^k$ 的贡献是

$$
\begin{cases}1&(k=0)\\p-2&(k=1)\\(p^2-2p+1)p^{k-2}&(k\ge 2)\end{cases}
$$

### 例二

[链接](https://www.luogu.com.cn/problem/U119515)

### 解答

显然有答案的生成函数是

$$
\dfrac{\zeta(z-q)}{\zeta(z-p)}
$$

几乎立即得到 $d^k$ 的贡献是

$$
\begin{cases}1&(k=0)\\(d^q-d^p)d^{(k-1)q}&(k\ge 1)\end{cases}
$$