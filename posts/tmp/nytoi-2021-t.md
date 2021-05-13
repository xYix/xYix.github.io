---
title: NayutanOI2021T 题解 - 太陽系デスコ【Solar System Disco】
---

> **题目大意.**
>
> 现在有一些方格，第 $i$ 行恰有 $\lambda_i$ 个（保证 $\lambda_i\ge \lambda_{i+1}$），你要往里面填写 $0\sim k-1$ 的整数，使得：
>
> - 任意元素小于等于它左边的相邻格子中的元素，如果存在的话；
> - 且任意元素小于它上方的相邻格子中的元素，如果存在的话。
>
> 一个元素 $i$ 的权值为 $q_i$，一个填写方案的权值为所用元素权值之积。求所有填写方案的权值和，模 $998244353$。

构造这样一张图：

<center><div style="width:100%;margin:0"><img src="https://xyix.gitee.io/images/nytoi-2021-t.png" style="width: 100%" alt=""></div></center>

可见原问题被转化为不相交路径计数，使用 LGV 引理即可。