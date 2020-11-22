---
title: 简明易懂的范畴论基础
---

# 0 一些符号

映射或态射 $f:X\rightarrow Y$ 有时候会被记为 $f:x\in X\mapsto y\in Y$ 或 $X\xrightarrow{f}Y$。

# 1 基础定义

一个范畴 $\mathcal C$ 指的是：

- 集合 $\text{Ob}(\mathcal C)$，称为 $\mathcal C$ 的**对象**。
- 集合 $\text{Mor}(\mathcal C)$，称为 $\mathcal C$ 的**态射**。一个态射 $f$ 其实就是就是一个从其**来源** $s(f)$（$s$ 是一个从 $\text{Mor}(\mathcal C)$ 到 $\text{Ob}(\mathcal C)$ 的映射）到其**目标** $t(f)$ 的一个箭头（但是 $s(f)$ 和 $t(f)$ 并不确定了 $f$，换言之一对对象之间可能有多个箭头）。定义 $\text{Hom}_{\mathcal C}(X,Y)$ 是 $\text{Mor}(\mathcal C)$ 中从对象 $X$ 到对象 $Y$ 的态射，形式化地说就是 $s^{-1}(X)\cap t^{-1}(Y)$。
- 给定每个元素到自身的态射中的一个 $\text{id}_X:X\mapsto X$，称为 $X$ 到自身的**恒等态射**。
- 对于对象 $X,Y,Z\in\text{Ob}(\mathcal C)$，给定态射间的**合成映射** $\circ$：

$$
\circ:\text{Hom}(Y,Z)\times\text{Hom}(X,Y)\longrightarrow\text{Hom}(X,Z)
$$

- 也就是把有序对 $(f\in\text{Hom}(Y,Z),g\in\text{Hom}(X,Y))$ 映射到 $f\circ g\in \text{Hom}(X,Z)$。它满足**结合律**，而且恒等映射是其单位元，即任意 $f\in\text{Hom}(X,Y)$ 满足 $f\circ\text{id}_X=\text{id}_Y\circ f= f$。
- 有时候直接省去 $\circ$，$f\circ g$ 记为 $fg$。

对象和态射都为空的范畴称为空范畴 $\mathbf 0$。

如果对于 $f:X\rightarrow Y$，存在它的**逆** $g: Y\rightarrow X$，使得 $fg=\text{id}_Y,gf=\text{id}_X$，则称 $f$ 是**可逆的**或者称 $f$ 是一个**同构**