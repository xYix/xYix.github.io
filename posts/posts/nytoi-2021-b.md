---
title: NayutanOI2021B 题解 - Dance Robot Dance
---

>**题目大意.**
>
>メダ子一来到地球就被这里生长的植物迷上了，所以她枚举了所有可能的 $n$ 个节点的有标号有根树。
>
>但是这些树实在太多了，于是メダ子希望只留下其中的一部分。她的审美标准

考虑 OGF 中的 PowerSet 构造
$$
\prod_i(1+x^i)^{f_i}=\exp(F(x)-\frac 12F(x^2)+\frac 13F(x^3)+\ldots)
$$
在 $k-$EGF 中，我们有类似意义的
$$
\prod_{i}(1+\dfrac{x^i}{(i!)^k})^{f_i}\\=\exp\sum_if_i\ln(1+x^i/(i!)^k)\\=\exp\sum_{i}-f_i\sum_{j=1}^{\infty}\dfrac{(-x^{i})^{j}}{j(i!)^{jk}}\\=\exp\sum_{j=1}^{\infty}\dfrac{(-1)^{j-1}}{j}\sum_{i}\dfrac{f_i(x^j)^i}{(i!)^{jk}}
$$

$$
\operatorname{Pow}F_k=\exp(F_k-\frac 12F_{2k}(x^2)+\frac 13F_{3k}(x^3)-\ldots)
$$

