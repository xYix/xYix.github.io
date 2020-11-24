---
title: 简明易懂的范畴论科普
---

# 0 一些符号，和警告

映射 $f:X\rightarrow Y$ 有时候会被记为 $f:x\in X\mapsto y\in Y$ 或 $X\xrightarrow{f}Y$。

态射 $f:X\rightarrow Y$ 有时候会被记为 $X\xrightarrow{f}Y$。

有时候你会发现有一些该写的符号神必消失了，这是因为 x义x 懒得打了，你可以靠上下文立即推断出它应该是什么。

有一些颜色为 <span style="color: #36C48B">#36C48B</span> 的文字，它们只是为了让繁多的注记不那么影响阅读。

参考资料：

- [1]《代数学方法 卷一：基础架构》李文威

# 1 基础定义

## 1.1 范畴

一个范畴（category） $\mathcal C$ 指的是：

- 集合 $\text{Ob}(\mathcal C)$，称为 $\mathcal C$ 的**对象**（object）。
- 集合 $\text{Mor}(\mathcal C)$，称为 $\mathcal C$ 的**态射**（morphism）。一个态射 $f$ 其实就是就是一个从其**来源** $s(f)$<span style='color: #36C48B'>【注意 $s$ 是一个从 $\text{Mor}(\mathcal C)$ 到 $\text{Ob}(\mathcal C)$ 的映射】</span>到其**目标** $t(f)$ 的一个箭头<span style='color: #36C48B'>【但是 $s(f)$ 和 $t(f)$ 并不确定了 $f$，换言之一对对象之间可能有多个箭头】</span>。定义 $\text{Hom}_{\mathcal C}(X,Y)$ 是 $\text{Mor}(\mathcal C)$ 中从对象 $X$ 到对象 $Y$ 的态射，形式化地说就是 $s^{-1}(X)\cap t^{-1}(Y)$。
- 给定每个元素到自身的态射中的一个 $\text{id}_X:X\mapsto X$，称为 $X$ 到自身的**恒等态射**。
- 对于对象 $X,Y,Z\in\text{Ob}(\mathcal C)$，给定态射间的**合成映射** $\circ$：

$$
\circ:\text{Hom}(Y,Z)\times\text{Hom}(X,Y)\longrightarrow\text{Hom}(X,Z)
$$

- 也就是把有序对 $(f\in\text{Hom}(Y,Z),g\in\text{Hom}(X,Y))$ 映射到 $f\circ g\in \text{Hom}(X,Z)$。它满足**结合律**，而且恒等映射是其**单位元**，即任意 $f\in\text{Hom}(X,Y)$ 满足 $f\circ\text{id}_X=\text{id}_Y\circ f= f$。<span style='color: #36C48B'>【这大概就是恒等映射的特殊性的唯一体现了（】</span>
- 有时候直接省去 $\circ$，$f\circ g$ 记为 $fg$。

说白了就是一些点和一些点上的箭头。特殊之处在于箭头可以合成。为了更好地把握范畴的形象，我们介绍一些例子。

## 1.2 例子

对象和态射都为空的范畴称为空范畴 $\mathbf 0$。

令 $\mathsf{Set}$ 为所有集合构成的范畴<span style="color: #36C48B">【这里其实有一些问题，因为所有集合的全体“太大”了，以至于它并不是集合而应该称为真类，为了讨论这个问题我们不得不引入序数理论和 Grothendieck 宇宙，所以我们这里忽略这个困难。】</span>，$X$ 到 $Y$ 的态射定义为映射。恒等态射即恒等映射。复合即映射的复合。

令 $\mathsf{Grp}$ 为所有群构成的范畴，态射定义为群同构。

令 $\mathsf{Top}$ 为所有豪斯多夫<span style='color: #36C48E'>【任何两个不同的点，存在它们各自的邻域，这两个邻域不交，说人话就是没有”黏在一起“的两个点】</span>拓扑空间构成的范畴，态射定义为连续映射。

选定一个域 $\mathbb k$，令 $\mathsf{Vect}(\mathbb k)$ 为其上的所有向量空间构成的范畴，态射定义为线性变换。

$\mathsf{Proof}$ 表示逻辑范畴，从 $X$ 到 $Y$ 的态射定义为一个“如果 $X$，那么 $Y$”的证明。恒等态射就是一个显然的“如果 $X$，那么 $X$”的证明。如果有兴趣的话可以玩玩[这个游戏](http://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/)的“function world”之后的关卡，相信你会对它深有体会（

## 1.3 其他定义

- 如果对于 $f:X\rightarrow Y$，存在它的**逆** $g: Y\rightarrow X$，使得 $fg=\text{id}_Y,gf=\text{id}_X$，则称 $f$ 是**可逆的**或者称 $f$ 是一个**同构**，记作 $f:X\xrightarrow{\sim}Y$。<span style='color: #36C48B'>【仔细想想，确实，所谓“同构”的本质确实就是可逆啊】</span>从 $X$ 到 $Y$ 的同构构成的集合记作 $\text{Isom}_{\mathcal C}(X,Y)$。

- 记 $\text{End}_{\mathcal C}(X)=\text{Hom}_{\mathcal C}(X,X)$ 是 $X$ 到自身的态射的集合，称为**自同态**，$\text{Aut}_{\mathcal C}(X)=\text{Isom}_{\mathcal C}(X,X)$ 则是**自同构**。显然它们在 $\circ$ 下封闭。

- 称一个态射 $f$ 是**单态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $fg=fh\Leftrightarrow g = h$。<span style='color: #36C48B'>【左消去】</span>
- 称一个态射 $f$ 是**满态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $gf=hf\Leftrightarrow g = h$。<span style='color: #36C48B'>【右消去】</span>
- <span style='color: #36C48E'>【注意**既单且满**并不一定意味着可逆。例如，在 $\text{Top}$ 中，一个态射满只意味着它的像稠密。】</span>
- 若存在 $gf=\text{id}_X$，则 $f$ **左可逆**；若存在 $fg=\text{id}_Y$，则 $f$ **右可逆**。一个态射可逆当且仅当它左右都可逆。

称 $\mathcal C'$ 是 $\mathcal C$ 的**子范畴**，如果它的对象、态射、恒等态射、来源/目标映射、合成全是由 $\mathcal C$ 限制而来的。如果还有 $\text{Hom}_{\mathcal C'}(X,Y)=\text{Hom}_{\mathcal C}(X,Y)$<span style='color: #36C48B'>【即只要两个对象都存在，它们之间的所有箭头就会原封不动地搬进 $\mathcal C'$】</span>，则 $\mathcal C'$ 是 $\mathcal C$ 的**全子范畴**。

一个范畴 $\mathcal C$ 的**反范畴** $\mathcal C^{\text{op}}$ 定义为反转 $\mathcal C$ 中的箭头和复合运算。有 $(\mathcal C^{\text{op}})^{\text{op}}=\mathcal C$。

# 2 函子

一个**函子**（functor）$F:\mathcal C'\rightarrow \mathcal C$<span style="color: #36C48E">【这个记法揭示了它是一个从 $\mathcal C'$ 的成分到 $\mathcal C$ 的成分的映射】</span>是以下资料：

- 对象间的映射 $F:\text{Ob}(\mathcal C')\rightarrow \text{Ob}(\mathcal C)$；
- 态射间的映射 $F: \text{Mor}(\mathcal C)\rightarrow \text{Mor}(\mathcal C')$；
- $s_{\mathcal C}F=Fs_{\mathcal C'},t_{\mathcal C}F=Ft_{\mathcal C'}$。可以见下图。<span style='color: #36C48E'>【注意这不意味着 $F$ 是单射（多个 $\mathcal C'$ 中的箭头可以映射到一个箭头），也不意味着 $F$ 是满射（$\mathcal C$ 中的箭头可以不是 $\mathcal C'$ 中箭头的像）】</span>

<div style="width:70%;margin:auto"><img src="/images/cate1.png" alt=""></div>

函子的合成是显然的：只需要把对对象的映射和对态射的映射分别合成。

- 称一个函子是**本质满**的，如果 $\mathcal C$ 中对象同构于某一 $F\text{Ob}(\mathcal C')$ 中的元素。
- 称一个函子是**忠实**的，如果对任意 $X,Y\in\text{Ob}(\mathcal C')$，映射 $\text{Hom}_{\mathcal C'}(X,Y)\rightarrow\text{Hom}_{\mathcal C}(X,Y)$ 是单射。<span style='color: #36C48E'>【注意，由于 $F:\text{Ob}\rightarrow\text{Ob}$ 不一定是单射，所以忠实函子 $F$ 的 $F:\text{Mor}\rightarrow\text{Mor}$ 可能不是单射。】</span>

- 称一个函子是**全**的，如果对任意 $X,Y\in\text{Ob}(\mathcal C')$，映射 $\text{Hom}_{\mathcal C'}(X,Y)\rightarrow\text{Hom}_{\mathcal C}(X,Y)$ 是满射。<span style='color: #36C48E'>【注意，由于 $F:\text{Ob}\rightarrow\text{Ob}$ 不一定是满射，所以忠实函子 $F$ 的 $F:\text{Mor}\rightarrow\text{Mor}$ 可能不是满射。】</span>

我们再来举一些例子。

## 2.1 例子

对于子范畴 $\mathcal C'$，显然有包含函子 $\iota:\mathcal C'\hookrightarrow\mathcal C$。它总是忠实的，是全函子当且仅当 $\mathcal C'$ 是全子范畴。取 $\mathcal C'=\mathcal C$ 时得到恒等函子 $\text{id}_{\mathcal C}$。

我们总是可以把群的群结构”忘掉“，即把那些并非群同构的映射全部加入 $\mathsf{Grp}$，这就给出一个忘却函子 $\mathsf{Grp}\rightarrow\mathsf{Set}$。当然也可以对 $\mathsf{Top}$ 等施以类似操作。这类忘却函子都忠实而不一定全。