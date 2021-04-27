---
title: 【NEERC2016】Binary Code
---

> **题目翻译.**
>
> [这里](https://www.luogu.com.cn/problem/P6965)

每个串只有两个可能的形态，于是建出这 $2n$ 个串的字典树，最终就是要所有点互无祖先关系。

自然可以爆建 2-SAT 但是边数并不理想。

<center><div style="width:40%;margin:0"><img src="https://xyix.gitee.io/images/luogu-6965-1.png" style="width: 70%" alt=""></div></center>

我们当然会想，能不能依托这棵 Trie 来帮助建图？大概就是这样的：

<center><div style="width:40%;margin:0"><img src="https://xyix.gitee.io/images/luogu-6965-1.png" style="width: 70%" alt=""></div></center>