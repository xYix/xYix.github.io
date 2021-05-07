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

在开始之前，你需要先了解[杨表和 RSK 算法](https://xyix.gitee.io/posts/?&postname=young-tableau)。

看过袁方舟的论文的同学应该记得这样一个引理：

<center><div style="width:100%;margin:0"><img src="https://xyix.gitee.io/images/nytoi-2021-d.png" style="width: 70%" alt=""></div></center>