---
title: 圆面积并的靠谱做法
---

我们来解释一下如下的**斯托克斯公式**：
$$
\int_Md\omega=\int_{\part M}\omega
$$
其中 $M$ 是一个 $n$ 维**流形**（你可以理解为超区域），$\part M$ 是它的**有向边界**，$\omega$ 是一个定义在 $M$ 上的 $n-1$-形式。

### Q1. $n-1$-形式是什么意思？

首先，我们认为一个光滑函数 $f$ 是一个 0-形式。

一个 $n$-形式 大概长这样：$fdx_1dx_2...dx_n$。其中 $dx_i$ 之间不是普通的乘法而是**楔积** $\land$，它满足反交换律
$$
dx_1\land dx_2=-dx_2\land dx_1
$$

> ~~原来这就是叉积一般重载成异或的原因吗？！远古时期程序员人均数学系可能性微存~~

### Q2. 如何对 $n-1$-形式求微分？

对于一个 $k$-形式 $\omega=fdx_I$，定义
$$
d\omega=\sum_{i=1}^n\dfrac{\part f}{\part x_i}dx_i\land dx_I
$$
比如我们取 $\omega =xdy$ 就有 $d\omega=dx\land dy$。

### Q3. 如何对 $n$-形式求积分？

这里的积分指的是在区域 $M$ 上积分，记为 $\int_M$。积分法则很简单：你可以把 $dx\land dy$ 看成面积微元，那么这就变成我们比较熟悉的积分了。注意 $dx\land dy$ 和 $dy\land dx$ 并不相等：它们差了 $-1$。

## 具体操作

考虑求一些圆的并 $M$ 的面积，那么直接取 $d\omega=dx\land dy,\omega=xdy$ 即可发现斯托克斯公式的左边就是面积。

> 不过其实 $d\omega=dx\land dy$ 的 $\omega$ 不止一个，比如 $-ydx,\dfrac 12(xdy-ydx)$ 之类的都可以。下面以 $\omega=xdy$ 为例。

右边写出来是
$$
\int_{\part M}xdy
$$
由于积分是可加的，所以我们只需要把每一段连续的边界，也就是一段段圆弧，全部加起来即可。下面考虑圆弧 $(x_0+\cos\theta r,y_0+\sin\theta r),r\in(\alpha,\beta)$。
$$
r\int_{\alpha}^{\beta}(x_0\cos\theta+r\cos^2\theta )d\theta\\
=rx_0(\sin\beta-\sin\alpha)+r^2\int_{\alpha}^{\beta}\dfrac{(\cos2\theta+1)}{4}d2\theta\\
=rx_0(\sin\beta-\sin\alpha)+\dfrac {r^2}{4}(\sin 2\beta-\sin 2\alpha+2\beta-2\alpha)
$$
可以发现这里面又有 $\alpha$ 又有 $\sin\alpha$，三角函数必然是逃不掉了（悲）

## 更具体的操作

那么问题来了，如何找出边界呢？只需要对每个点，求出其他所有圆和它的交点，排个序处理一下就可以得到其“暴露在外”的部分了。

