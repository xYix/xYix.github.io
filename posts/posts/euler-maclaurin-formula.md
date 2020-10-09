---
title: 欧拉-麦克劳林级数的推导
date: 2020-09-03 14:29:31
tags:
- 数学
- $\color{red}精品$
---

因为很有趣就记下来了。

<!--more-->

首先有泰勒级数：

$$
f(x)=\sum_{i=0}^{\infty}\dfrac{1}{i!}f^{(i)}(x_0)(x-x_0)^i
$$

令 $x_0\leftarrow x,x\leftarrow x+1$ 得

$$
f(x+1)=\sum_{i=0}^{\infty}\dfrac{f^{(i)}(x)}{i!}
$$

我们定义**移位算子** $\text{E}$ 为

$$
\text{E}f(x)=f(x+1)
$$

而微分算子 $\text{D}$ 我们都很熟悉，就不介绍了。

上面的式子可以写为

$$
\text{E}=e^{\text{D}}
$$

而我们知道**差分算子** $\Delta f(x)=f(x+1)-f(x)$，显然它是 $\text{E}-\mathbf{1}=e^{D}-\mathbf{1}$。

那么我们还知道前缀和是差分的逆运算，设**求和算子** $\Sigma$ 为

$$
\Sigma f(x)=\sum_{i=0}^{x-1} f(i)
$$

那么有

$$
\Sigma=\Delta^{-1}=\dfrac{1}{e^{\text{D}}-1}
$$

而

$$
[x^n]\dfrac{x}{e^x-1}=\dfrac{B_n}{n!}
$$

其中 $B_n$ 是伯努利数。

于是我们得到

$$
\boxed{\Sigma=\sum_{i=0}^{\infty}\dfrac{B_i}{i!}\text{D}^{i-1}}
$$

形式幂级数，永远滴神，连算子都能往里代（

具体把上面的式子作用到函数 $f$ 上就是**欧拉-麦克劳林级数**

$$
\boxed{\sum_{0\le i<n}f(i)=\int_{0}^{n}f(x)\text{d}x+\sum_{i=1}^{\infty}\dfrac{B_i}{i!}f^{(i-1)}(n)}
$$

# 后记

关于 **欧拉-麦克劳林公式**（也就是欧拉-麦克劳林级数加上用来估计误差的余项）的资料可以在[这里](https://zh.wikipedia.org/wiki/%E6%AC%A7%E6%8B%89-%E9%BA%A6%E5%85%8B%E5%8A%B3%E6%9E%97%E6%B1%82%E5%92%8C%E5%85%AC%E5%BC%8F)查看。