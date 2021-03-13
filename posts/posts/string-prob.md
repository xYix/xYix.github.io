---
title: 字符串题集
---

<center><a href='/posts/posts/string-tech.html'>上回说到...</a></center>

# 最小表示法的进一步讨论

首先考虑 $s$ 的 $\text{CFL}(s)=w_1^{k_1}w_2^{k_2}...$。

自然，一个串 $s\left[i:\right]+s\left[:i-1\right]$ 如果要是 $s$ 的最小表示法，起码得先小于本 Lyndon Word 的开头 $j$ 引出的 $s\left[j:\right]+s\left[:j-1\right]$。从而必须有 $s\left[i:\right]<s\left[j:\right]$，而这是不可能的，故必须有 $i=j$。

从而最小表示法一定形如 $w_i^*w_{i+1}^{k_{i+1}}...w_m^{k_w}w_{1}^{k_1}...w_{i}^{k_i-*}$。

更进一步，我们来说明 $*=k_i$。只需要证明对于*任意串*（不必是 Lyndon Word），$u^2v$ 和 $v$ 中必有其一比 $uv$ 优。这其实是显然的。于是一个一组相同 Word 要么全选要么全不选。

称满足上述条件的后缀为 **Significant Suffix**。下面记 $S_i=w_i^{k_i}...$。

注意到对于 $i<j$ 总有 $w_i>w_j$，若还有 $w_j\not\sqsubseteq w_i$，则必定有 $S_i>S_j$，从而 $i$ 引出的串不是最小表示。因而实际上有用的串构成了 $w_m\sqsubseteq w_{m-1}\sqsubseteq\ldots$ 的一条链，我这里用一个自己瞎取的名字 **Significant Chain** 称呼之。

而 Lyndon Word 不能有长度大于等于其一半的 border，故这条链的长度仅为 $\log n$。在这些候选者中比较时还是直接大力 LCP 即可。

> **题目大意.(【JSOI2019】节日庆典)**
>
> 求原串的每一个前缀的最小表示法。

我们只需要维护原串的 Significant Chain 即可。但其实还有一个[线性做法](https://www.luogu.com.cn/blog/qwaszx/solution-p5334)，🕊了。

# 本原平方串

