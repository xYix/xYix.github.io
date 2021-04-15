---
title: 保序回归学习笔记
date: 2020-09-29 16:24:13
tags:
- 整体二分
- 保序回归
---

[题目链接](https://www.luogu.com.cn/problem/P5294)，参考资料：论文集2018《浅谈保序回归问题》高睿泉

<!--more-->

# 保序回归问题的定义

$L_p$ 问题的定义如下：

> 给出一张 DAG $G=(V,E)$，每个点 $i$ 有代价 $y_i,w_i$（$w_i>0$）。求点值序列 $f$，满足如果在 $G$ 中有从 $i$ 到 $j$ 的路径（称为 $v_i\preceq v_j$），则必须有 $f_i\le f_j$，并使得回归代价
>
> $$
> \begin{cases}\sum_{i=1}^nw_i|f_i-y_i|^p&(1\le p<\infty)\\\max_{i=1}^n w_i|f_i-y_i|&(p=\infty)\end{cases}
> $$
>
> 最小。

# 其他定义

> 将序列 $z$ 中 $\le a$ 的元素变为 $a$，$\ge b$ 的元素变为 $b$，称为**把 $z$ 向 $(a,b)$ 取整**。

> **点集 $U$ 的 $L_p$ 均值**为使得
> $$
> \begin{cases}\sum_{i\in U}w_i|k-y_i|^p&(1\le p<\infty)\\\max_{i\in U} w_i|k-y_i|&(p=\infty)\end{cases}
> $$
> 最小的 $k$。

> 定义 $\bold S$ **问题**为，在满足 $L_p$ 所有限制的同时，还要求 $a\le f_i\le b\ \ (a<b)$，求最小回归。

# 对 $p=1$ 情况的解法——整体二分

## 准备工作

> **引理 1.** 当 $1<p<\infty$ 时，任意集合 $U$ 的 $L_p$ 均值唯一；当 $p=1$ 时，任意集合 $U$ 的 $L_p$ 均值构成一个区间。
>
> **引理 2.** 任意集合的 $L_p(1\le p<\infty)$ 均值不小于该集合的最小值，不大于该集合的最大值。

**证明**：设
$$
g_U(k)=\sum_{y_i\le k,i\in U}w_i(k-y_i)^p+\sum_{y_i>k,i\in U}w_i(y_i-k)^p
$$
则有
$$
g'_U(k)=\sum_{y_i\le k,i\in U}pw_i(k-y_i)^{p-1}-\sum_{y_i>k,i\in U}pw_i(y_i-k)^{p-1}
$$
容易发现 $g'_U(k)$ 当 $p>1$ 时单调增，当 $p=1$ 时也单调不降。而当 $k<\min y$ 时显然有 $g'_U(k)<0$，当 $k>\max y$ 时显然有 $g'_U(k)>0$，从而得证。$\square$

## 重要定理

> **定理 1.** 在 $L_1$ 问题中，如果：
>
> - 任意 $y_i$ 均不在区间 $(a,b)$ 内
> - 存在一个最优解序列 $z_i$ 的元素也均不在 $(a,b)$ 内
> 
> 记 $z^S$ 是 $S$ 问题的一个最优解，那么一定存在 $L_1$  的一个最优解 $z$，使得 $z$ 向 $(a,b)$ 取整可以得到 $z^S$。

这个引理并没有它看起来那么自然。

**证明**：反证法。

假设不存在能取整到 $z^S$ 的 $L_1$ 最优解，记 $z$ 是一个元素不在 $(a,b)$ 内且不能取整到 $z_S$ 的最优解。

下面我们证明一个引理

> **引理 3.** $\forall i,z_i^S=a\or z_i^S=b$。

**证明：**注意 $g'$ 不在 $(a,b)$ 上有零点，从而正负性恒定。反证法，假设存在 $z_i^S\neq a\and z_i^S\neq b$。

考虑 $z_i^S\neq b$ 中取到最大值的点集，记为 $U$。显然 $U$ 不受到来自外部的 $\le $ 限制。如果 $g'_U\le 0$，则显然可以把 $U$ 全部调整到 $b$。否则会引出矛盾，我们把 $U$ 调整到剩下的点集中的最小值会使得回归代价更小，从而 $z^S$ 并非最优解。$\square$

于是必定存在 $z_i$，有 $z_i^S=b,z_i\le a$ 或 $z^S_i=a,z_i\ge b$。

显然这两类点之间没有偏序关系，于是可以分开研究，从而我们接下来可以不失一般性地只证明

> 不存在这样的 $z$，使得存在 $z_i^S=b,z_i\le a$ 而且 $z$ 是最优解。

记这类点为**坏点**。

设**坏点中 $z$ 取到最大值**的那些点构成的点集为 $U$。根据**引理 1**，$U$ 的 $L_1$ 均值是一个区间，记为 $[l,r]$。显然，$U$ 的 $g$ 函数在 $(-\infty,l)$ 单调降，在 $(r,+\infty)$ 单调增。

（请注意，当我们谈论***任何其他集合***，这个结论都是***不成立的***。而且，由于我们说的是 $g$ 函数单调降，从而如果希望调整 $U$ 的回归代价就必须使 $U$ 的***所有元素一起调整***。）

（请注意，我们甚至不能保证 $z_U\in [l,r]$。其中 $z_U$ 是 $U$  中元素公用的 $z$ 值。）

注意由于 $U$ 已经在坏点中 $z$ 取到了最大值，而且 $z_i^S=b$，所以 $U$ 不受到任何来自外部的 $\le$ 限制。

- 若 $l>a$，则我们增大 $U$ 中的所有 $z$，当它们增大到 $l$ 前（它们的确可以增大）回归代价一直都是单调降的，从而 $z$ 并非最优解，得出矛盾。

- 若 $l\le a,b\le r$，则我们可以把 $U$ 中的所有 $z$ 增大到 $b$（它们的确可以增大），显然这组新的解不比原先的解劣，但是取整成功的点变多了，从而经过有限次操作可以得到一个能取整到 $z^S$ 的 $L_1$ 最优解，得出矛盾。

- 若 $l\le a,b>r$。此时增大 $z_U$ 没有任何益处，我们需要另寻方法得出矛盾。记 $V$ 为坏点集合。

- - 如果 $U=V$，从而显然可以把 $z^S_i,i\in V$ 从 $b$ 下降，使得回归代价降低，从而 $z^S$ 并非 $S$ 问题的最优解，得出矛盾。
- 否则我们设 $W$ 是在 $V/U$ 中 $z$ 取到最大值的点集。记 $W$ 的 $L_1$ 均值为 $[l',r']$。我们不能像上面一样下降 $U$，因为可能会被 $W$“卡住”。
  - - 若 $r'<b$，则我们一定可以下降 $z_i^S,i\in W$，从而 $z^S$ 并非 $S$ 问题的最优解，得出矛盾。
  - - 否则有 $r'\ge b>a\ge z_U$，从而我们可以把 $z_W$ 调整到 $z_U$ 得到一组不更劣的解，显然重复该操作有限步必定能得出矛盾。$\square$

## 解法

我们还需要一个引理

> **引理 4.** 对于 $L_1$ 问题，必定存在一个最优解 $z$，使得 $\forall z_i\in\{y\}$。

**证明：**几乎重复**引理 3** 的证明过程即可。$\square$

从而，采用**整体二分**的思路：假设当前点集的取值已经确定为 $y[l,r]$，则考虑计算 $S\{y_{mid},y_{mid+1}\}$，即可应用**定理 1**，把当前点集划分为取值于 $y[l,mid]$ 或取值于 $y[mid+1,r]$。

# $1<p<\infty$ 的情况——化归到 $p=1$

## 重要定理

> **定理 2.** 在 $L_p(1<p<\infty)$ 问题中，如果：
>
> - 任意点集的 $L_p$ 均值均不在 $(a,b)$ 内
> - 存在一个最优解序列 $z_i$ 的元素也均不在 $(a,b)$ 内
>
> 记 $\tilde z$ 是相同 DAG 上的，回归代价为
> $$
> (\tilde y_i,\tilde w_i)=\begin{cases}(0,w_i\Big((b-y_i)^p-(a-y_i)^p\Big))&(y_i\le a)\\(1,w_i\Big((y_i-b)^p-(y_i-a)^p\Big))&(y_i>a)\end{cases}
> $$
> 的 $L_1$ 问题的一组最优解，而且取值仅为 $0,1$。那么一定存在 $L_1$  的一个最优解 $z$，使得 $\tilde z_i=0\Leftrightarrow z_i\le a,\tilde z_i=1\Leftrightarrow z_i\ge b$。

**证明：**我们接下来证明，这个 $L_1$ 问题和 $S$ 问题等价。

由于任意点集的 $L_p$ 均值不在 $(a,b)$ 内，从而**结论 1** 可以应用到这里：此 $S$ 问题的最优解取值只能为 $a,b$。

根据**引理 3**，存在一组该 $L_1$ 问题的最优解取值，只包含 $0,1$。

接下来只需要验证 $\tilde w_i|\tilde y_i-0|=w_i|y_i-a|^p,\tilde w_i|\tilde y_i-1|=w_i|y_i-b|^p$，读者自证不难，从而得到等价。

然后只需要重复**定理 1** 的证明过程即可。（事实上比定理 1 简单多了）$\square$

## 解法

由于点集 $(x,y)$ 有限，从而 $L_p$ 均值和最优解的取值也有限（大不了在一个鬼畜无比的 $n$ 维空间里大力找这个回归的最值点，而且不会有在某个边界子空间里全是最值的情况，因为边界一定是 $z_{i1}=z_{i2}=...$ 的形式，即它们取了某个 $L_p$ 均值，运用**引理 1** 即得到矛盾），我们只需要找一个~~看起来~~足够小的 $\varepsilon$，考虑 $b=a+\varepsilon$。此时 $\tilde w_i$ 变为 $a$ 处回归代价的导数。于是在实数上二分即可。

# 技巧和例题

## 偏序关系是一条链的情况

> **引理 5.** 当偏序关系是一条链，如果有 $y_i>y_{i+1}$，那么最优解必有 $f_i=f_{i+1}$。

**证明**：显然。

从而我们可以单调栈维护各区间的 $L_p$ 均值，如果后面的均值比前面大那就~~去世了~~，显然合并后这两个区间的取值全会相等，从而重新计算 $L_p$ 均值即可。

由于 $L_p(p>1)$ 均值唯一，所以一般比较好求（比如 $L_2$ 就是加权平均值），但是 $L_1$ 均值是中位数，如果想要 $O(\log n)$ 地合并区间需要用可并堆。当然直接启发式合并 $\log^2 n$ 也行。

### [[BalticOI 2004]Sequence 数字序列](https://www.luogu.com.cn/problem/P4331)

令 $a_i\leftarrow a_i-i$，就变成了一个标准的 $L_1$ 问题。应用上面的解法即可。

```cpp
#include<bits/stdc++.h>
using namespace std;

struct leftist{
    int c[2];
    int dis, val;
    int siz;
} H[100005];
void pushup(int x) {
    if (H[H[x].c[1]].dis < H[H[x].c[0]].dis) swap(H[x].c[0], H[x].c[1]);
    H[x].dis = H[H[x].c[0]].dis + 1;
    H[x].siz = H[H[x].c[0]].siz + H[H[x].c[1]].siz + 1;
}
int merge(int x, int y) {
    if (!x || !y) return x + y;
    if (H[x].val < H[y].val) swap(x, y);
    H[x].c[0] = merge(H[x].c[0], y);
    pushup(x);
    return x;
}

int n;

struct node {
    int rt;
    int true_siz;
    int val;
};
node stk[100005]; int len;
int tgt[100005];

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) 
        H[i].dis = 1, scanf("%d", &H[i].val), H[i].val -= i, H[i].siz = 1;
    for (int i = 1; i <= n; i++) {
        stk[++len] = (node){i, 1, H[i].val};
        while (len != 1 && stk[len - 1].val > stk[len].val) {
            len--; stk[len].rt = merge(stk[len].rt, stk[len + 1].rt);
            stk[len].true_siz += stk[len + 1].true_siz;
            while (H[stk[len].rt].siz > (stk[len].true_siz + 1) / 2)
                stk[len].rt = merge(H[stk[len].rt].c[0], H[stk[len].rt].c[1]);
            stk[len].val = H[stk[len].rt].val;
        }
    }
    int cnt = 0, pos = 0;
    long long ans = 0;
    for (int i = 1; i <= n; i++) {
        if (cnt == 0) cnt += stk[++pos].true_siz;
        cnt--;
        tgt[i] = pos;
        ans += abs(H[i].val - stk[pos].val);
    }
    printf("%lld\n", ans);
    for (int i = 1; i <= n; i++) printf("%d ", stk[tgt[i]].val + i);
}
```

### [[HNOI2019]序列](https://www.luogu.com.cn/problem/P5294)

要分数取模的最优化问题，已经完全暴露了啊（

标准的 $L_2$ 问题，但是需要支持特殊询问。

由于最优解显然和我们的单调栈扫描顺序无关，从而我们可以处理出一个元素前缀和后缀的单调栈情况。（可以考虑主席树；其实把询问离线，从左到右扫时暴力把右栈回退也可以）

假设修改了的元素是 $x$，显然不和 $x$ 在同一个区间的元素和 $x$ 没有关系，从而直接使用处理好的信息即可。从而问题变为求 $x$ 所在的区间。

考虑向左合并，其实就是找到最右方的"稳定"左端点 $L$，如果已知了 $R$ 它就可以直接二分；$R$ 套在外面二分即可。

```cpp
代码鸽了
```

## 网络流

对于 $L_1:S$ 问题，$f_i\le f_j$ 可以看成选了 $f_i$ 就必须选 $f_j$，变为最大权闭合子图问题，是一个经典网络流例题。

### [[省选联考 2020 A 卷] 魔法商店](https://www.luogu.com.cn/problem/P6621)

众所周知线性基是[拟阵](https://xyix.gitee.io/posts/?&postname=matroid)。考虑**基交换引理**：

> 现有两个基 $A,B$。对于任意 $x\in A/B$，必存在 $y\in B/A$ 使得 $A/\{x\}\cup\{y\}$ 是一个基。

即，任意两个基都是直接可以通过一次"交换"操作互相到达的。只需要保证："交换"操作无法使 $A$ 变小，也无法使 $B$ 变大。

于是，爆枚举 $A$（respectively，$B$）中的元素和其外的元素，如果能互相替换就有偏序关系。

最后应用上[保序回归](https://xyix.gitee.io/posts/?&postname=isotonic-regression)就做完了！！！

# $p=\infty$ 的情况和扩展

🕊了