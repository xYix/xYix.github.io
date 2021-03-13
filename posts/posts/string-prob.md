---
title: 字符串题集
---

<center><a href='/posts/posts/string-tech.html'>上回说到...</a></center>

# 最小表示法的进一步讨论

首先考虑 $s$ 的 $\text{CFL}(s)=w_1^{k_1}w_2^{k_2}...$。

自然，一个串 $s\left[i:\right]+s\left[:i-1\right]$ 如果要是 $s$ 的最小表示法，起码得先小于本 Lyndon Word 的开头 $j$ 引出的 $s\left[j:\right]+s\left[:j-1\right]$。冷静分析显然可以发现，必须有 $i=j$。

从而最小表示法一定形如 $w_i^*w_{i+1}^{k_{i+1}}...w_m^{k_w}w_{1}^{k_1}...w_{i}^{k_i-*}$。

更进一步，我们来说明 $*=k_i$。只需要证明对于*任意串*（不必是 Lyndon Word），$u^2v$ 和 $v$ 中必有其一比 $uv$ 优，这是显然的。于是一个一组相同 Word 要么全选要么全不选。