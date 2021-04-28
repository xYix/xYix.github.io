---
title: luoguP6965 题解 - 【NEERC2016】Binary Code
---

> **题目翻译.**
>
> [这里](https://www.luogu.com.cn/problem/P6965)

每个串只有两个可能的形态，于是建出这 $2n$ 个串的字典树，最终就是要所有点互无祖先关系。

自然可以爆建 2-SAT 但是边数并不理想（$n^2$）。

<center><div style="width:60%;margin:0"><img src="https://xyix.gitee.io/images/luogu-6965-1.png" style="width: 70%" alt=""></div></center>

我们当然会想，能不能依托这棵 Trie 来帮助建图？大概就是这样的：

<center><div style="width:60%;margin:0"><img src="https://xyix.gitee.io/images/luogu-6965-2.png" style="width: 70%" alt=""></div></center>

注意上图并不准确，实际上的 $u$ 不在 Trie 上而是独立的，只不过有个 Trie 上的点和它对应罢了。

于是我们建一个 "上传 Trie" 和一个 "下传 Trie" 即可。是不是和[线段树优化建图](https://www.luogu.com.cn/problem/CF786B)一模一样？

----

最后一点：没有 ``?`` 的情况。只需要强制选 $u$（$\lnot u\rightarrow u$）即可。

```cpp
🕊
```

