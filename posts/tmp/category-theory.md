---
title: 简明易懂的范畴论基础
---

# 0 一些符号，和警告

映射或态射 $f:X\rightarrow Y$ 有时候会被记为 $f:x\in X\mapsto y\in Y$ 或 $X\xrightarrow{f}Y$。

有时候你会发现有一些该写的符号神必消失了，这是因为 x义x 懒得打了，你可以靠上下文立即推断出它应该是什么。

有一些颜色为 <span style="color: #36C48B">#36C48B</span> 的文字，它们是批注和讲解。

# 1 基础定义

一个范畴 $\mathcal C$ 指的是：

- 集合 $\text{Ob}(\mathcal C)$，称为 $\mathcal C$ 的**对象**。
- 集合 $\text{Mor}(\mathcal C)$，称为 $\mathcal C$ 的**态射**。一个态射 $f$ 其实就是就是一个从其**来源** $s(f)$<span style='color: #36C48B'>【注意 $s$ 是一个从 $\text{Mor}(\mathcal C)$ 到 $\text{Ob}(\mathcal C)$ 的映射】</span>到其**目标** $t(f)$ 的一个箭头<span style='color: #36C48B'>【但是 $s(f)$ 和 $t(f)$ 并不确定了 $f$，换言之一对对象之间可能有多个箭头】</span>。定义 $\text{Hom}_{\mathcal C}(X,Y)$ 是 $\text{Mor}(\mathcal C)$ 中从对象 $X$ 到对象 $Y$ 的态射，形式化地说就是 $s^{-1}(X)\cap t^{-1}(Y)$。
- 给定每个元素到自身的态射中的一个 $\text{id}_X:X\mapsto X$，称为 $X$ 到自身的**恒等态射**。
- 对于对象 $X,Y,Z\in\text{Ob}(\mathcal C)$，给定态射间的**合成映射** $\circ$：

$$
\circ:\text{Hom}(Y,Z)\times\text{Hom}(X,Y)\longrightarrow\text{Hom}(X,Z)
$$

- 也就是把有序对 $(f\in\text{Hom}(Y,Z),g\in\text{Hom}(X,Y))$ 映射到 $f\circ g\in \text{Hom}(X,Z)$。它满足**结合律**，而且恒等映射是其单位元，即任意 $f\in\text{Hom}(X,Y)$ 满足 $f\circ\text{id}_X=\text{id}_Y\circ f= f$。<span style='color: #36C48B'>【这大概就是恒等映射的特殊性的唯一体现了（】</span>
- 有时候直接省去 $\circ$，$f\circ g$ 记为 $fg$。

对象和态射都为空的范畴称为空范畴 $\mathbf 0$。

如果对于 $f:X\rightarrow Y$，存在它的**逆** $g: Y\rightarrow X$，使得 $fg=\text{id}_Y,gf=\text{id}_X$，则称 $f$ 是**可逆的**或者称 $f$ 是一个**同构**，记作 $f:X\xrightarrow{\sim}Y$。<span style='color: #36C48B'>【仔细想想，确实，所谓“同构”的本质确实就是可逆啊】</span>从 $X$ 到 $Y$ 的同构构成的集合记作 $\text{Isom}_{\mathcal C}(X,Y)$。

记 $\text{End}_{\mathcal C}(X)=\text{Hom}_{\mathcal C}(X,X)$ 是 $X$ 到自身的态射的集合，称为**自同态**，$\text{Aut}_{\mathcal C}(X)=\text{Isom}_{\mathcal C}(X,X)$ 则是**自同构**。显然它们在 $\circ$ 下封闭。

称 $\mathcal C'$ 是 $\mathcal C$ 的**子范畴**，如果它的对象、态射、恒等态射、来源/目标映射、合成全是由 $\mathcal C$ 限制而来的。如果还有 $\text{Hom}_{\mathcal C'}(X,Y)=\text{Hom}_{\mathcal C}(X,Y)$<span style='color: #36C48B'>【即只要两个对象都存在，它们之间的所有箭头就会原封不动地搬进 $\mathcal C'$】</span>，则 $\mathcal C'$ 是 $\mathcal C$ 的**全子范畴**。

- 称一个态射 $f$ 是**单态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $fg=fh\Leftrightarrow g = h$。<span style='color: #36C48B'>【左消去】</span>
- 称一个态射 $f$ 是**满态射**，如果对于任意对象 $Z$ 和一对态射 $g,h:Z\rightarrow X$，有 $gf=hf\Leftrightarrow g = h$。<span style='color: #36C48B'>【右消去】</span>
- 注意**既单且满**并不意味着可逆。例如，在范畴 $\text{Top}$：所有豪斯多夫拓扑空间构成的范畴，态射定义为连续映射中，一个态射满只意味着它的像稠密。
- 若存在 $gf=\text{id}_X$，则 $f$ **左可逆**；若存在 $fg=\text{id}_Y$，则 $f$ **右可逆**。一个态射可逆当且仅当它左右都可逆。

