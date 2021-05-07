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

实际上，Trie 点的被选的含义是"当前点不能放串"，这么一看就更合理了！$u$ 放了串 $\rightarrow$ $u$ 对应的 Trie 点不能再放 $\rightarrow$ 其祖先也全不能再放。

这是一个"上传 Trie"，我们自然还要再建一个类似的"下传 Trie"。这不就是优化建图吗！

---

但这会出现一个问题：一个串会推出自己不能放……

小问题！我们强行让第一步必须跳一步就行了！

<center><div style="width:60%;margin:0"><img src="https://xyix.gitee.io/images/luogu-6965-3.png" style="width: 70%" alt=""></div></center>

----

然而又出现了问题：现在相同串不互相排斥了。于是，我们希望让任意相同的 $u,v$ ，都有 $u\rightarrow\lnot v$。

这是一个经典的**前后缀模型**。从它的名字你就能知道它是怎么建的了……

----

最后一点：没有 ``?`` 的情况。你冷静一想，这个情况好像并不尴尬，判有无解的时候特判这组 $u,\lnot u$ 即可。也可以强行钦定（连边 $u\rightarrow\lnot u$），这样就连特判都不需要了。

