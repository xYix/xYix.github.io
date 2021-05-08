---
title: NayutanOI2021D 题解 - ダンスロボットダンス【Dance Robot Dance】
---

你可以在[这里](https://www.luogu.com.cn/problem/T173880)提交。

> **题目大意.**
>
> 给定一个 $n$ 阶排列 $w$，你可以进行任意多次（也可以一次都不进行）以下操作：
>
> - 选择两个相邻元素 $u,v$，且你还要保证一个值在 $u,v$ 之间的元素和 $u,v$ 中一者相邻。交换 $u,v$。
>
> 求，有多少个排列能按这种方式得到。答案模 $998244353$。

设题中所给的等价关系为 $\sim^{K}$。

在开始之前，你需要先了解[杨表和 RSK 算法](https://xyix.gitee.io/posts/?&postname=young-tableau)。

看过袁方舟的论文的同学应该记得这样一个引理：

<center><div style="width:100%;margin:0"><img src="https://xyix.gitee.io/images/nytoi-2021-d.png" style="width: 100%" alt=""></div></center>

把上面的证明略作补充就可直接推出：如果两个排列 $w_1,w_2$ 等价，那么它们在运行 RSK 算法后的*插入表*（在一般的记法 $\text{RSK}:w\rightarrow (P,Q)$ 中，插入表是它的 $P$）<span style="color: #36c48e">**完全相同**</span>。

根据样例，你大胆猜测：只要插入表相同，两个排列就一定等价！

敲了十行代码直接 A 了，出题人可真是个思博。

——但是，为什么？

----

我们只需要证明这些排列全和某一个"标准排列"等价。

> **定义.**
>
> 我们把一个杨表按这样的顺序读出来，这会形成一个排列，称为这个杨表的 <span style="color: #36c48e">**Reading Word**</span>。
>
> <center><div style="width:50%;margin:0"><img src="https://xyix.gitee.io/images/drd-1.png" style="width: 70%" alt=""></div></center>

极显然地，

> **引理.**
>
> 如果对一个杨表的 Reading Word 运行 RSK 算法，其插入表必定是原杨表。

下面我们来证明，

> **定理.**
>
> 一个排列和它对应的插入表的 Reading Word 等价。

> **证明.**
>
> 考虑归纳，设已有 $w\sim \text{read}(P)$，那么我们只需要验证
> $$
> \text{read}(P)+k\sim \text{read}(P\leftarrow k)
> $$
> 其中 $P\leftarrow k$ 是在 $P$ 中插入 $k$ 的结果。
>
> 首先看第一行，不妨把 $\text{read}(P)+k$ 看成这样一个杨表的 $\text{read}$。我们可以通过若干次操作把 $k$ 换到它应在的位置。当然如果一下都换不了，那就说明 $\text{read}(P)+k=\text{read}(P\leftarrow k)$。
>
> <center><div style="width:70%;margin:0"><img src="https://xyix.gitee.io/images/drd-2.png" style="width: 70%" alt=""></div></center>
>
> 首次换不了的情形如下。这时应该改变交换策略，把第一个 $>k$ 的元素踢到下一行。
>
> <center><div style="width:70%;margin:0"><img src="https://xyix.gitee.io/images/drd-2.png" style="width: 70%" alt=""></div></center>
>
> 把它踢到下一行就变成了一个新的插入过程，重复以上论述即可。

