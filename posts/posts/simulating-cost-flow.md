---
title: 模拟费用流学习笔记
---

参考资料：WC2019《模拟费用流问题》laofu（陈江伦）

> **问题 1.**
>
> 数轴上有 $n$ 只老鼠和 $m$ 个洞，求代价最小的老鼠对洞的完美匹配。
>
> 代价为：老鼠和洞之间的距离之和。

**费用流部分.**

直接快进到**最小费用最大流**模型：

- $S\longrightarrow(v=1,w=0){\large 鼠}$
- 数轴上距离为 $\text{dis}$ 的相邻点之间：$\longleftrightarrow(v=+\infty,w=\text{dis})$
- ${\large 洞}\longrightarrow(v=1,w=0)T$

**“模拟”部分.**

简单来说就是，普通费用流的增广太逊了，所以我们来根据这个图的特殊性质手动增广。

对老鼠依次增广。显然轮到每只老鼠增广时，候选的洞只有两个：离他最近的未满流的两个洞。比较一下即可。注意反向边。

复杂度 $O(n\log n)$（排序）${}+O(n)$。

> **问题 2.**
>
> 同 1，但：每只老鼠可以任意分身，至少要有一个进洞。每个洞容量无限，但至少要有一只老鼠进。

**费用流部分.**

由于流量显然不定，我们下面求解最小费用流。

对于“真鼠”“真洞”，和源/汇连边 $v=1,w=-\infty$；对于“假鼠”“假洞”，和源/汇连边 $v=+\infty,w=0$。

**“模拟”部分.**

显然，“候选洞只有两个”这一限制仍然存在