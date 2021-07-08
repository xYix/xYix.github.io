---
title: 范畴论通俗演义
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
- 集合 $\text{Mor}(\mathcal C)$，称为 $\mathcal C$ 的**态射**（morphism）。一个态射 $f$ 可以设想为一个从其**来源** $s(f)$<span style='color: #36C48B'>【注意 $s$ 是一个从 $\text{Mor}(\mathcal C)$ 到 $\text{Ob}(\mathcal C)$ 的映射】</span>到其**目标** $t(f)$ 的一个同态<span style='color: #36C48B'>【但是 $s(f)$ 和 $t(f)$ 并不确定了 $f$，即一对对象之间可能有多个同态，这很自然】</span>。定义 $\text{Hom}_{\mathcal C}(X,Y)$ 是 $\text{Mor}(\mathcal C)$ 中从对象 $X$ 到对象 $Y$ 的态射，也就是 $s^{-1}(X)\cap t^{-1}(Y)$。
- 给定每个元素到自身的态射的**其中一个** $\text{id}_X:X\mapsto X$，称为 $X$ 到自身的**恒等态射**。
- 对于对象 $X,Y,Z\in\text{Ob}(\mathcal C)$，给定态射间的**合成映射** $\circ$：

$$
\circ:\text{Hom}(Y,Z)\times\text{Hom}(X,Y)\longrightarrow\text{Hom}(X,Z)
$$

- 也就是把有序对 $(f\in\text{Hom}(Y,Z),g\in\text{Hom}(X,Y))$ 映射到 $f\circ g\in \text{Hom}(X,Z)$。它满足**结合律**，而且恒等映射是其**单位元**，即任意 $f\in\text{Hom}(X,Y)$ 满足 $f\circ\text{id}_X=\text{id}_Y\circ f= f$。
- 有时候直接省去 $\circ$，$f\circ g$ 记为 $fg$。

说白了就是一些点和一些点上的箭头。特殊之处在于箭头可以合成。为了更好地把握范畴的形象，我们介绍一些例子。

## 1.2 例子

对象和态射都为空的范畴称为空范畴 $\mathbf 0$。

令 $\mathsf{Set}$ 为所有集合构成的范畴<span style="color: #36C48B">【这里其实有一些问题，因为所有集合的全体“太大”了，以至于它并不是集合而应该称为真类，虽然它的确可以解决但非常麻烦，所以我们这里忽略这个困难。】</span>，$X$ 到 $Y$ 的态射定义为映射。恒等态射即恒等映射。复合即映射的复合。

令 $\mathsf{Grp}$ 为所有群构成的范畴，态射定义为群同构。

令 $\mathsf{Top}$ 为所有豪斯多夫<span style='color: #36C48E'>【任何两个不同的点，存在它们各自的邻域，这两个邻域不交，说人话就是没有”黏在一起“的两个点】</span>拓扑空间构成的范畴，态射定义为连续映射。

选定一个域 $\mathbb k$，令 $\mathsf{Vect}(\mathbb k)$ 为其上的所有向量空间构成的范畴，态射定义为线性变换。

$\mathsf{Proof}$ 表示逻辑范畴，从 $X$ 到 $Y$ 的态射定义为一个“如果 $X$，那么 $Y$”的证明。恒等态射就是一个显然的“如果 $X$，那么 $X$”的证明。如果有兴趣的话可以玩玩[这个游戏](http://wwwf.imperial.ac.uk/~buzzard/xena/natural_number_game/)的“function world”之后的关卡，相信你会对它深有体会（

## 1.3 其他定义

- 如果对于 $f:X\rightarrow Y$，存在它的**逆** $g: Y\rightarrow X$，使得 $fg=\text{id}_Y,gf=\text{id}_X$，则称 $f$ 是**可逆**的或者称 $f$ 是一个**同构**，记作 $f:X\xrightarrow{\sim}Y$。<span style='color: #36C48B'>【同构就是双态射，而双射的本质就是可逆啊】</span>从 $X$ 到 $Y$ 的同构构成的集合记作 $\text{Isom}_{\mathcal C}(X,Y)$。

- 记 $\text{End}_{\mathcal C}(X)=\text{Hom}_{\mathcal C}(X,X)$ 是 $X$ 到自身的态射的集合，称为**自同态**，$\text{Aut}_{\mathcal C}(X)=\text{Isom}_{\mathcal C}(X,X)$ 则是**自同构**。显然它们在 $\circ$ 下封闭。

- 称一个态射 $f$ 是**单态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $fg=fh\Leftrightarrow g = h$。<span style='color: #36C48B'>【左消去】</span>
- 称一个态射 $f$ 是**满态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $gf=hf\Leftrightarrow g = h$。<span style='color: #36C48B'>【右消去】</span>
- <span style='color: #36C48E'>【注意**既单且满**有时并不一定意味着可逆。例如，在 $\mathsf{Top}$ 中，一个态射满只意味着它的像稠密。】</span>
- 若存在 $gf=\text{id}_X$，则 $f$ **左可逆**；若存在 $fg=\text{id}_Y$，则 $f$ **右可逆**。一个态射可逆当且仅当它左右都可逆。

称 $\mathcal C'$ 是 $\mathcal C$ 的**子范畴**，如果它的对象、态射、恒等态射、来源/目标映射、合成全是由 $\mathcal C$ 限制而来的。如果还有 $\text{Hom}_{\mathcal C'}(X,Y)=\text{Hom}_{\mathcal C}(X,Y)$<span style='color: #36C48B'>【即只要两个对象都存在，它们之间的所有箭头就会原封不动地搬进 $\mathcal C'$】</span>，则 $\mathcal C'$ 是 $\mathcal C$ 的**全子范畴**。

一个范畴 $\mathcal C$ 的**反范畴** $\mathcal C^{\text{op}}$ 定义为反转 $\mathcal C$ 中的箭头和复合运算。有 $(\mathcal C^{\text{op}})^{\text{op}}=\mathcal C$。

# 2 函子

一个**函子**（functor）$F:\mathcal C'\rightarrow \mathcal C$<span style="color: #36C48E">【这个记法揭示了它是一个从 $\mathcal C'$ 的成分到 $\mathcal C$ 的成分的映射】</span>是以下资料：

- 对象间的映射 $F:\text{Ob}(\mathcal C')\rightarrow \text{Ob}(\mathcal C)$；
- 态射间的映射 $F: \text{Mor}(\mathcal C)\rightarrow \text{Mor}(\mathcal C')$；
- $s_{\mathcal C}F=Fs_{\mathcal C'},t_{\mathcal C}F=Ft_{\mathcal C'}$。可以见下图。<span style='color: #36C48E'>【注意这不意味着 $F$ 是单射（多个 $\mathcal C'$ 中的箭头可以映射到一个箭头），也不意味着 $F$ 是满射（$\mathcal C$ 中的箭头可以不是 $\mathcal C'$ 中箭头的像）】</span>

<div style="width:50%;margin:auto"><img src="https://xyix.github.io/images/cate1.png" alt=""></div>

函子的合成是显然的：只需要把对对象的映射和对态射的映射分别合成。

- 称一个函子是**本质满**的，如果 $\mathcal C$ 中对象同构于某一 $F\text{Ob}(\mathcal C')$ 中的元素。
- 称一个函子是**忠实**的，如果对任意 $X,Y\in\text{Ob}(\mathcal C')$，映射 $\text{Hom}_{\mathcal C'}(X,Y)\rightarrow\text{Hom}_{\mathcal C}(X,Y)$ 是单射。<span style='color: #36C48E'>【注意，由于 $F:\text{Ob}\rightarrow\text{Ob}$ 不一定是单射，所以忠实函子 $F$ 的 $F:\text{Mor}\rightarrow\text{Mor}$ 可能不是单射。】</span>

- 称一个函子是**全**的，如果对任意 $X,Y\in\text{Ob}(\mathcal C')$，映射 $\text{Hom}_{\mathcal C'}(X,Y)\rightarrow\text{Hom}_{\mathcal C}(X,Y)$ 是满射。<span style='color: #36C48E'>【注意，由于 $F:\text{Ob}\rightarrow\text{Ob}$ 不一定是满射，所以忠实函子 $F$ 的 $F:\text{Mor}\rightarrow\text{Mor}$ 可能不是满射。】</span>

我们再来举一些例子。

## 2.1 例子

对于子范畴 $\mathcal C'$，显然有包含函子 $\iota:\mathcal C'\hookrightarrow\mathcal C$。它总是忠实的，是全函子当且仅当 $\mathcal C'$ 是全子范畴。取 $\mathcal C'=\mathcal C$ 时得到恒等函子 $\text{id}_{\mathcal C}$。

我们总是可以把群的群结构”忘掉“，即把那些并非群同构的映射全部加入 $\mathsf{Grp}$，这就给出一个忘却函子 $\mathsf{Grp}\rightarrow\mathsf{Set}$。当然也可以对 $\mathsf{Top}$ 等施以类似操作。这类忘却函子都忠实而不一定全。

# 3 自然变换

**自然变换**（natural transformation）是一类函子间的同态。它的定义如下：

- 给定函子 $F,G:\mathcal C'\rightarrow\mathcal C$，它们之间的自然变换 $\theta$ 是一组**态射** $\theta_X:FX\rightarrow GX$，满足对于任意态射 $f\in\text{Hom}(X,Y)$，$Gf\circ \theta_X=\theta_Y\circ Ff$ 。

<div style="width:40%;margin:auto"><img src="https://xyix.github.io/images/cate2.png" alt=""></div>

函子 $F,G$ 之间若有自然变换 $F\xrightarrow{\sim }G$，则称有 $F$ 到 $G$ 的**自然同态**。自然有了**自然同构**等概念。

- 如果有 $F\circ G\xrightarrow{\sim}\text{id}_{\mathcal C'}$ 和 $G\circ F\xrightarrow{\sim}\text{id}_{\mathcal C}$，则称 $F,G$ 互为**拟逆**，$F$ 是范畴 $\mathcal C'$ 到 $\mathcal C$ 的**等价**，$G$ 是 $\mathcal C$ 到 $\mathcal C'$ 的等价。
- 如果更进一步有 $F\circ G=\text{id}_{\mathcal C'}$ 和 $G\circ F=\text{id}_{\mathcal C}$，则称 $F,G$ 互为**逆**，$F,G$ 是范畴间的**同构**。

# 4 泛性质

## 4.0 引入

相信各位已经看抽象废话看厌了，我们现在来考虑一些很具体的问题。

先来思考这样一个小问题。我们如何在 $\mathsf{Set}$ 中找出 $\varnothing$？注意我们根本没有说明“元素”是什么，“属于”又是什么，所以这个问题并不是那么 simple。不过答案也很简单：如果有一个集合，它到所有集合（包括自身）皆有**唯一**的映射（空映射），而任何其他集合到它皆没有映射，那么它一定就是 $\varnothing$。

第二个问题：如何在 $\mathsf{Set}$ 中找出那些大小为 $1$ 的集合？（注意我们显然不可能分清大小为 $1$ 的集合互相的区别）答案也很简单：任何集合到它皆有**唯一**的映射。

第三个问题：如何在 $\mathsf {Set}$ 中找出那些大小为 $2$ 的集合？或者我们再往前一点，如何找出一些集合的**直和**？这个问题就困难多了。

抽象地说我们遇到了这样一个问题：要构造一个满足某种性质的对象。解决方法是把这个性质转化为用范畴方法表述的**泛性质**然后确定之。

下面来看两个具体的例子。

## 4.1 直积和直和

<span style='color: #36C48E'>【如果你不理解下面的内容，你可以尝试把 $\mathcal C$ 换成 $\mathsf{Set}$ 再读一次。~~您要做的只是把文件中描述的异常抄录成一份SCP档案。每次尝试之间，我会调整喂给您的不可知剂，直至您准确理解该异常为止。这将表明您的理性范式已得到正确重构。让我们努力吧！~~】</span>

- 令 $\mathcal C$ 是一个范畴，$A_i,i\in I$ 是 $\mathcal C$ 中的一组对象，$I$ 是指标集。$A_i$ 的**直积**是以下资料
- - $\mathcal C$ 中的对象 $\prod A$。
  - 态射族 $p_i:\prod A\rightarrow A_i$。
- 直积满足如下条件：
- - 对于任意的 $\mathcal C$ 中对象 $X$，总是存在唯一的态射 $\theta:X\rightarrow \prod A$， 使得对于任意态射列 $f_i:X\rightarrow A_i$，有 $p_i\circ \theta=f_i$。

<span style='color: #36C48E'>【下面把上述内容翻译为 $\mathsf{Set}$。</span>

<span style='color: #36C48E'>【所谓态射族 $p_i$ 其实就是 $(a_i)\in\prod A$ 的投影 $a_i\in A_i$。</span>

<span style='color: #36C48E'>【$\theta$ 的含义也就很清晰了：它把所有的 $f_i$“压缩”到了一起。】</span>

<div style="width:37%;margin:auto"><img src="https://xyix.github.io/images/cate3.png" alt=""></div>

容易证明，一组 $A$ 的直积（如果存在）是唯一的，精确到同构。

对偶地，我们考虑下面这个构造：

- 令 $\mathcal C$ 是一个范畴，$A_i,i\in I$ 是 $\mathcal C$ 中的一组对象，$I$ 是指标集。$A_i$ 的**直和**（你可把直和看作一组不交集合的并，事实上在 $\mathsf{Grp}$ 范畴内也无法定义交）是以下资料
- - $\mathcal C$ 中的对象 $\coprod A$。
  - 态射族 $p_i:A_i\rightarrow \coprod A$。
- 直和满足如下条件：
- - 对于任意的 $\mathcal C$ 中对象 $X$，总是存在唯一的态射 $\theta:\coprod A\rightarrow X$， 使得对于任意态射列 $f_i:A_i\rightarrow X$，有 $\theta\circ p_i=f_i$。

<span style='color: #36C48E'>【图就不画了，因为只是翻转上图的所有箭头。</span>

<span style='color: #36C48E'>【如果把 $\mathcal C$ 理解为 $\mathsf{Grp}$，则此处的态射族 $p$ 直接是恒等映射。$\theta$ 可看成是 $f$ 的直和。】</span>

可见的是积竟与和有着神奇的对偶关系……不过这只是范畴论神奇之处的一点罢了。

# 4.2 核

