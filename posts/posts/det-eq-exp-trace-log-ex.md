---
title: det 又等于 exp trace ln 了
---

det = exp trace ln 想必大家[都很熟悉](https://xyix.gitee.io/posts/?postname=det-eq-exp-trace-log)，但是为什么 det = exp trace ln 呢？下面就让小编带大家了解一下吧！

小编了解到，所谓 det = exp trace ln，其实就是要证明
$$
e^{\operatorname{trace}xA}=\det\exp xA
$$
显然，
$$
(\exp xA)_{u,v}=\sum_{\{w\}}\dfrac{x^{|\{w\}|}}{|\{w\}|!}A_{u,w_1}A_{w_1,w_2}\ldots A_{w_{|\{w\}|},v}
$$
即所有 $u$ 到 $v$ 的路径。

不知道大家看到 det 和路径想到了什么呢？小编想到了 [**LGV 引理**](https://xyix.gitee.io/posts/?&sortby=last_modi&postname=loj-6759) 哦！

然而和 LGV 引理还是略有出入的，毕竟这里根本不是 DAG。展开行列式成：
$$
\sum_{p}(-1)^{\operatorname{sgn}(p)}\prod_i(\exp xA)_{i,p_i}
$$
那 $|\{w\}|!$ 的含义也就真相大白了。固定 $p$，实际上就是枚举了所有这样操作序列：

- 一开始有 $n$ 个石子，分别在位置 $1\sim n$。每次可以选任意一个石子移动一步并获得对应权值（$A_{u,v}$），要求最终第 $i$ 个石子恰好在位置 $p_i$。

类似于 LGV 引理，我们构造一个操作序列间的映射 $\phi$：在首次有石子重叠时把这两个石子偷偷换掉。这时你会发现，这个 $\phi$ 是一个**对合**，且恰好反转了原操作序列的权值（修改了 $\operatorname{sgn}(p)$），于是所有操作序列全抵消了呢！

最终剩下的只有从未有石子重合的操作序列，很显然它们就是左式 $e^{\operatorname{trace}xA}$。

不知道大家还有没有更好的证明 det = exp trace ln 的方法呢？欢迎在下方留言和小编讨论哦！

