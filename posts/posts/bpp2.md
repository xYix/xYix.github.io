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
>证明，把 $n$ 划分为数个奇数的方案数和把 $n$ 划分为数个互不相同的数的方案数相等。

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