---
title: bijective proof problems 选做（中）
---

<style>
    button{
        border: 1px outset #1A5A40;
        border-radius: 5px;
        font-size: medium;
        color: #1A5A40;
        background-color: #ffffff;
    }
</style>

[pdf 版本的题目表](https://xyix.gitee.io/images/bijective%20proof%20probs.pdf)

由于一些奇怪的问题（页面高度固定），建议直接看[这里](https://xyix.gitee.io/posts/posts/bpp2.html)。

<script>
    document.get_button_click = function(blockid) {
        return function() {
            let my_blockquote = document.getElementsByTagName("blockquote")[blockid];
            if(my_blockquote.style.display === 'none') {
                my_blockquote.style.display = "block";
                this.childNodes[0].textContent = '-隐藏解答';
            }
            else {
                my_blockquote.style.display = 'none';
                this.childNodes[0].textContent = '+显示解答';
            }
        };
	};
    document.last_block = -1;
    document.new_button = function(blockid) {
        document.last_block = blockid = document.last_block + blockid;
        let my_button = document.createElement('button');
        	let button_content = document.createElement('span');
        	button_content.style = 'font-family: consolas';
        	button_content.textContent = '+显示解答';
        	my_button.appendChild(button_content);
       	my_button.onmouseover = function(){this.style = 'background-color: #dddddd;cursor: pointer;';};
        my_button.onmouseout = function(){this.style = 'background-color: #ffffff;cursor: pointer;';};
        my_button.onclick = document.get_button_click(blockid);
        document.body.childNodes[1].appendChild(my_button);
	};
</script>

<center><a href='/posts/posts/bpp.html'>前情提要</a></center>

## 划分

另一大类组合对象。

> **定义.**
>
> 称 $\lambda=(\lambda_1,...,\lambda_{\ell})$ 是 $n$ 的一个划分（记作 $\lambda\vdash n$），如果 $\sum\lambda = n$ 且 $\lambda_i\ge \lambda_{i+1}$。

### 90.[2+]

> **问题.**
>
> 定义 $f_{\lambda}(k)=\sum_{i=1}^{\ell}[\lambda_i=k],g_{\lambda}(k)=\sum_{i=1}^n[k\le \sum_{j=1}^{\ell}[\lambda_j=i]]$。
>
> 证明
> $$
> \sum_{\lambda\vdash n}f_{\lambda}(k)=\sum_{\lambda\vdash n}g_{\lambda}(k)
> $$

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 首先能观察到的是一个映射：某个 $\lambda$ 可以通过把 $k$ 个 $v$ 转化成 $v$ 个 $k$。然而这既非单射（$v$ 的取值不明确）更不把等量的 $g$ 转化成 $f$，看起来难以利用。
>
> 此处有一个精妙的想法：
>
> - 考虑 $\lambda$ 能在如上映射下转化到的 $\lambda'$ 的数量，这恰好是 $g_\lambda(k)$；
> - 考虑能在如上映射下转化到 $\lambda$ 的 $\lambda'$ 的数量，这恰好是 $f_{\lambda}(k)$（$v=1,2,...,\lambda_k$）。
>
> 这样一个有向图的总出入度自然相等，于是得证。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 91.[2+]

> **问题.**
>
> 定义 $f(\lambda)=\sum_{i=1}^{\ell}[\lambda_i=2],g(\lambda)=\sum_{i=1}^{n}[1=\sum_{j=1}^{\ell}[\lambda_j=i]]$。
>
> 证明
> $$
> \sum_{\lambda\vdash n}f(\lambda)=\sum_{\lambda\vdash n-1}g(\lambda)
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 根据上题结论，我们有 $\sum_{\lambda\vdash n}f(\lambda)=\sum_{\lambda\vdash n}\sum_{i=1}^n[2\le\sum_{j=1}^{\ell}[\lambda_j=i]]$。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 92.[2-]

> **问题.**
>
> 证明，把 $n$ 划分为数个 $2$ 的幂的方案数总是偶数。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 我们只需要证明，所有这样的方案数总是一半长度为奇一半长度为偶。
>
> 如此构造双射：
>
> - 如果 $\lambda$ 的最大元素 $2^r$ 只出现一次，则将其映射到 $(2^{r-1},2^{r-1},...)$；
> - 否则把两个 $2^r$ 合并为 $2^{r+1}$。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 94.[2]

>**问题.**
>
>证明，把 $n$ 划分为数个奇数的方案数和把 $n$ 划分为数个互不相同的数的方案数相等。或者说，
>$$
>\prod_{n=1}^{\infty}(1-x^{2n-1})^{-1}=\prod_{n=1}^{\infty}(1+x^n)
>$$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 我们给出两个解法。
>
> > **法一.** 双射如下：把奇数二进制合并，比如 $5$ 个 $7$ 会被合并为 $28+7$。逆也显然，只需要不断把偶数拆成原来的一半。
>
> > **法二.**
> >
> > <div style="width:70%;margin:auto"><img src="https://xyix.gitee.io/images/bpp3.png" alt=""></div>
> >
> > 上图已足以说明。它的逆的确唯一存在，虽然不是很显然。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 103.[3] && 104.[2] && 105.[3]

> **问题.**
>
> 103. 证明
>
> $$
> [x^n]\prod_{i=1}^{\infty}(1-x^i)=\begin{cases}(-1)^k&,\text{if}\ n=k(3k\pm 1)/2\\0&,\text{otherwise}\end{cases}
> $$
>
> 104. 证明
>
> $$
> [x^n]\sum_{i=1}^{\infty}(-1)^ix^i\prod_{j=1}^i(1+x^j)=\begin{cases}1&,\text{if}\ n= k(3k-1)/2\\-1&,\text{if}\ n=k(3k+1)/2\\0&,\text{otherwise}\end{cases}
> $$
>
> 105. 证明
>
> $$
> [x^n]\sum_{i=2*+1}^{\infty}x^i\prod_{j>i}(1-(-x)^j)=\begin{cases}1&,\text{if}\  n= k^2\\0&, \text{otherwise}\end{cases}
> $$

<script>
  	document.new_button(4);
</script>

> **解答.**
>
> 103. 左式可理解为：
>
> > 所有 $n$ 的元素互不相同，且长度为偶数的划分的数量 $-$ 所有 $n$ 的元素互不相同，且长度为奇数的划分的数量
>
> 因此我们希望建立一个从左到右的“几乎双射”。该双射如下（来自 [wiki](https://en.wikipedia.org/wiki/Pentagonal_number_theorem)）。
>
> > 令 $t(\lambda)$ 为从最大的 $\lambda_1$ 开始，连续段 $\lambda_1,\lambda_1-1,\lambda_1-2,...$ 的最长长度。
> >
> > - 若 $t(\lambda)\ge \lambda_{\ell}$，则移除 $\lambda_\ell$ 并令 $\lambda_{1}\sim \lambda_{\lambda_\ell}$ 增加 $1$；
> > - 否则 $t(\lambda)<\lambda_{\ell}$，则令 $\lambda_1\sim\lambda_{t(\lambda)}$ 减 $1$，增加一个 $\lambda_{\ell+1}=t(\lambda)$。
> >
> > 这个映射是它自己的逆。
> >
> > 这个双射总是把划分长度的奇偶性反转——除非 $t(\lambda)=\lambda_{\ell}=\ell$，这时双射直接失败，因为移除 $\lambda_\ell$ 后根本不存在 $\lambda_{\lambda_\ell}=\lambda_{\ell}$ 以供增加；或者 $t(\lambda)=\lambda_\ell-1=\ell$，增加的 $\lambda_{\ell+1}$ 和减一后的 $\lambda_\ell$ 相等，双射也失败。
> >
> > 剩下的工作只是确认这两种情况在什么时候发生及其影响，这直接引出结论。
>
> 104. 可解释为：
>
> > 所有 $n$ 的元素互不相同，且 $\lambda_1$ 为偶数的划分的数量 $-$ 所有 $n$ 的元素互不相同，且 $\lambda_1$ 为奇数的划分的数量
>
> 继续应用上述双射即可。
>
> 105. 可解释为：
>
> > 所有 $n$ 的 $\lambda_{\ell}$ 为奇数，且偶元素个数为偶数，且元素互不相同的划分的数量 $-$ 所有 $n$ 的 $\lambda_{\ell}$ 为奇数，且偶元素个数为奇数，且元素互不相同的划分的数量
>
> 考虑我们所希望的映射要具有的性质：
>
> - 在且只在 $(2k-1,2k-3,...,3,1)$ 处失效（这是一个很强的条件，一个映射要怎么只在从 $1$ 开始的连续奇数时失效却不在缺少任何一些奇数时失效？）
> - 反转偶元素数量的奇偶性
>
> 因此我们构造如下映射：
>
> > 找出最小的偶元素 $b$。
> >
> > - 如果它的确存在，删除它，令 $\lambda_1\sim\lambda_{b/2}$ 增加 $1$；
> >
> > 如果它不存在，找到最长的连续段 $\lambda_1,\lambda_1-2,\lambda_1-4,...$，把它们全部 $-2$，增加一个等量的偶元素。
>
> 这个双射有与之前类似的性质，不再赘述。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>