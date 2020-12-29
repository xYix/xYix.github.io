---
title: bijective proof problems 选做（下）
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

由于一些奇怪的问题，建议直接看[这里](https://xyix.gitee.io/posts/posts/bpp2.html)（请用鼠标中键或右键加 T 打开）。

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
> > 所有 $n$ 的元素互不相同、且长度为偶数的划分的数量 $-$ 所有 $n$ 的元素互不相同、且长度为奇数的划分的数量
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
> > 所有 $n$ 的元素互不相同、且 $\lambda_1$ 为偶数的划分的数量 $-$ 所有 $n$ 的元素互不相同、且 $\lambda_1$ 为奇数的划分的数量
>
> 继续应用上述双射即可。
>
> 105. 可解释为：
>
> > 所有 $n$ 的 $\lambda_{\ell}$ 为奇数、且偶元素个数为偶数、且元素互不相同的划分的数量 $-$ 所有 $n$ 的 $\lambda_{\ell}$ 为奇数、且偶元素个数为奇数、且元素互不相同的划分的数量
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
## 树

经典永流传。由于树的问题差不多都被生成函数研究光了，所以本节的主要目的是重新证明那些生成函数结论。

### 128.[3-]

> **题目.**
>
> 证明，$n$ 个节点的有标号无根树有 $n^{n-2}$ 棵。

<script>
  	document.new_button(7);
</script>
> **解答.**
>
> 不会吧不会吧不会真有人不知道 [Prüfer 序列](https://oi-wiki.org/graph/prufer/) 就敢来做这个题单吧？？？
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
### 135.[2]

> **题目.**
>
> 证明：
> $$
> \sum_{n\ge 0}(n+1)^n\dfrac{x^n}{n!}={\color{blue}\left(\sum_{n\ge 0}n^{n}\dfrac{x^{n}}{n!}\right)}\left(\sum_{n\ge 0}(n+1)^{n-1}\dfrac{x^{n}}{n!}\right)
> $$
> 注意你不应该对式子进行任何，哪怕只是提出一个 $x$ 的改动。

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 显然左式描述了标号为 $0\sim n$ 的有根树。
>
> - 若根是 $0$，则方案数即为无根树数量（所有无根树钦定根为 $0$ 后便得到以 $0$ 为根的树），在右式中表现为<span style='color: blue'>蓝色</span>部分取 $n=0$。
> - 否则根 $rt\neq 0$，则我们考虑切断 $0$ 到 $rt$ 的路径上的第一条边 $(0, u)$。$rt$ 所在部分是有根树（根为 $u$），而且要额外选出 $rt$，故方案数为 $n^n$。$0$ 所在部分是无根树，故方案数为 $(n+1)^{n-1}$。
> - 而容易验证他们的合并的确是二项卷积（如果你不明确这一点，可以参考[这里](https://xyix.gitee.io/images/%E7%BB%84%E5%90%88%E8%AE%A1%E6%95%B0%E5%92%8C%E7%94%9F%E6%88%90%E5%87%BD%E6%95%B0.pdf)的习题集 1 一节），于是便得证了。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 137.[3]

> **问题.**
>
> 定义一棵树上的逆序对是二元组 $(i,j)$，同时满足 $i>j$ 和 $i$ 是 $j$ 的祖先。记节点数为 $n$ 的树 $\tau$ 的逆序对数为为 $\text{inv}(\tau)$。
>
> 定义 $I_n(t)=\sum_{\tau}t^{\text{inv}(\tau)}$。
>
> 证明，
> $$
> t^{n-1}I_n(t+1)=\sum_{G}t^{e(G)}
> $$
> 其中 $G$ 取遍所有 $n$ 个节点的连通无向图。 $e(G)$ 是其边数。

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> $t^{\color{red} n-1}$ 无疑让我们想到生成树。我们如此~~钦定~~一棵 $G$ 的特定生成树 $\tau_G$：
>
> - 从 $1$ 出发一条边一条边移动，每次走当前能走到的最大节点，如果无边可走就回溯。
>
> 首先显然 $G$ 中没有横杈边（即所有边要么属于 $\tau_G$ 要么恰好链接一个节点和其某个祖先）。
>
> 考虑剩下的非树边 $(i,j)$ 且 $i$ 是 $j$ 的一个祖先，显然必须有 $i$ 到 $j$ 路径上的第一个节点 $k>j$，从而是一对逆序对。这显然构建了从非树边到逆序对的单射（当然，这个映射与 $\tau$ 有关，但是 $\tau$ 不相等时它们也同样遵循我们想要的性质）。于是也就构建了从 $\tau_G=\tau$ 的 $G$ 到 $\text{inv}(\tau)\rightarrow\{0,1\}$ 的双射。
>
> 原式的含义也就很显然了，$t\leftarrow t+1$ 正代表了每个逆序对可以自由地转化或不转化成非树边。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
### 138.[3] && 139.[3-]

> **问题.**
>
> 138. 定义一棵树是**交错**的，如果不存在三元组 $(i,j,k)$，满足 $i<j<k$ 且 $(i,j)$ 有边且 $(j,k)$ 有边。记标号为 $0\sim n$ 的交错树的数量为 $f(n)$，证明
>
> $$
> f(n)=\dfrac{1}{2^n}\sum_{k=0}^n{n\choose k}(k+1)^{n-1}
> $$
>
> 139. 一个**局部二叉搜索树**是一棵有根二叉树，任何一个节点都小于它的右儿子但大于它的左儿子（请注意不是小于（大于）它的右子树（左子树），这就是所谓“局部”的来源）。证明，标号为 $[n]$ 的局部二叉搜索树数量等于上述 $f(n)$。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 复杂，参考[这里](https://core.ac.uk/download/pdf/82315359.pdf)。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
下面两题是 x义x 自己加的。它们都与拉格朗日反演有关……哦，应该说，它们自己就是拉格朗日反演。


### EXTRA-2.[2]

> **问题.**
>
> 证明下述的**拉格朗日反演**。
>
> 若有形式幂级数 $f=xg(f)$，则有
> $$
> \boxed{[x^n]h(f)=\dfrac 1n[x^{n-1}]h'g^n}
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 我们只需要证明
> $$
> n[x^n]h(f)=[x^n](xh')g^n
> $$
> 首先考虑到条件 $f=xg(f)$，我们构造这样的树 $\tau$：
> - 编号为 $0\sim n$，根为 $0$
> - 一个节点 $u$ 若度数为 $d_u$，则其权值为
>
> $$
> \begin{cases}[x^d/d!]g&(u\neq 0)\\ [x^d/d!]h&(u=0)\end{cases}
> $$
>
> - 令 $\tau$ 的权值 $w(\tau)$ 为其所有节点的权值之积除以 $n!$。
>
> 于是 LHS（Left Hand Side，左式）便是所有 $\tau$ 的权值之和。
>
> 接下来解释 RHS。考虑这样的有向图 $g$：
>
> - 编号为 $0\sim n$，每个除 $0$ 以外的点恰有一条出边（从而 $g$ 一定是一棵内向树和若干内向基环树）
> - 一个节点 $u$ 若入度为 $d_u$，则其权值为
>
> $$
> \begin{cases}[x^d/d!]g&(u\neq 0)\\ d[x^d/d!]h&(u=0)\end{cases}
> $$
>
> - 令 $g$ 的权值 $w(g)$ 为其所有节点的权值之积除以 $n!$。
>
> 于是 RHS 便是所有 $g$ 的权值之和。
>
> 考虑 $0$ 的度数为 $k$，其余点中有 $m_i$ 个度数为 $i$ 的那些 $\tau$ 和 $g$。显然 $\tau,g$ 的权值和它们本身的细节无关，且总是有
> $$
> w(g)=kw(\tau)
> $$
> 于是为了证明拉格朗日反演，我们只需要说明
> $$
> \dfrac nk\#\tau=\#g
> $$
> 根据 Prüfer 序列，
> $$
> \#\tau=\dfrac{(n-1)!}{(k-1)!1!^{m_1}2!^{m_2}....}{n\choose m_1,m_2,...}
> $$
> 对于 $\#g$，直接考虑每条边连向谁即可，
> $$
> \#g=\dfrac{n!}{k!1!^{m_1}2!^{m_2}...}{n\choose m_1,m_2,...}
> $$
> 立即得证。
>
> 从而拉格朗日反演只是套了个皮的 Prüfer 序列……
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
### EXTRA-3.[3#]

\# 号表示“++++”。（

> **问题.**
>
> 证明下述的**多元拉格朗日反演**，或称 **Good-Lagrange 公式**。~~一元的拉反是不是可以叫做 Bad-Lagrange 公式~~
>
> 下面把 $m$ 维向量 $(x_1,x_2,...,x_m)$ 简记为 $\mathbf x$。（其他一些诡异的符号比如 $\mathbf f(\mathbf t)$ 和 $\mathbf g^{\mathbf n}$ 相信可以由读者自己猜出意思）
>
> 现有一列 $m$ 个 $m$ 元形式幂级数 $f_1(\mathbf x),f_2(\mathbf x),...,f_m(\mathbf x)$，它们满足下面的方程组
> $$
> f_i=x_ig_i(\mathbf f)
> $$
>
> 那么我们有
> $$
> \boxed{[\mathbf t^{\mathbf n}]h(\mathbf f(\mathbf t))=\dfrac{1}{\prod\mathbf n}[\mathbf x^{\mathbf n - \mathbf 1}]\sum_{\mathcal T}\dfrac{\partial(h,\mathbf g^{\mathbf n})}{\partial \mathcal T}}
> $$
> 其中 $\mathcal T$ 是完全图 $0\sim m$ 的所有以 $0$ 为根的内向生成树，而
> $$
> \dfrac{\partial \mathbf f}{\partial G}=\prod_{j=0}^m\left(\prod_{(i,j)\in G}\dfrac{\partial}{\partial x_i}\right)f_j
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
> 
> 此处不给出解答。其中一种双射的中文翻译可见[此处](https://x-yi-x.blog.uoj.ac/blog/6511)。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

## 卡塔兰数

卡塔兰数有 [214 种](https://www.cambridge.org/cn/academic/subjects/mathematics/discrete-mathematics-information-theory-and-coding/catalan-numbers?format=PB&isbn=9781107427747) 组合解释，你知道么？

## 杨表

生成函数的阴影无法触及的领域。双射方法终于得以生活在阳光之下。（

### 教程关：标准杨表，RSK 算法 && 203[2-].

> **定义.**
>
> 一个划分 $\lambda$ 的**杨图**大概就是一个长成这样的东西：
>
> <div style="width:50%;margin:auto"><img src="/images/youngtable.png" alt=""></div>
>
> 你要往里面填 $[n]$ 的排列，使得行单调增列单调增，这样的一种填充称为**标准杨表**（简称 SYT，Standard Young Tableau）。记形状为 $\lambda$ 的标准杨表数量为 $f^{\lambda}$。
>
> 杨表 $\lambda$ 的第 $i$ 行第 $j$ 列的元素记作 $\lambda^{(i,j)}$。

> **题目.**
>
> 证明
> $$
> \sum_{\lambda\vdash n}(f^{\lambda})^2=n!
> $$

<script>
  	document.new_button(3);
</script>
> **解答.**
>
> 我们来介绍 **RSK 算法**。
>
> > #### 行插入
> >
> > 定义 $P\leftarrow x$ 是把 $x$ 从第一行**行插入**进近似 SYT（即填入的元素不必恰好是 $[n]$）$P$ 中。流程如下：
> >
> > - 找到本行最小的比 $x$ 大的数 $y$。如果找不到这样的 $y$，则把 $x$ 放在本行末尾并结束算法。
> > - 交换 $x,y$。将 $y$ **行插入**下一行。
>
> 如下演示了一个行插入过程。
>
> <div style="width:70%;margin:auto"><img src="/images/RSK1.png" alt=""></div>
>
> 显然最后新增的格子一定在边角，即其下方和右方都没有格子。
>
> 对于对 $P$ 的第 $i$ 次插入，在另一个表 $Q$ 中在新增的格子上写上 $i$（注意只是单纯地写上，而不是插入）。显然 $Q$ 是 SYT。我们称 $P$ 为**插入表**，$Q$ 为**记录表**。
>
> > #### 删除
> >
> > 下面定义从 $P$ 中删除格子 $p$。尽管看起来不必要，我们还是规定 $p$ 必须是边角。记 $p$ 中填的数是 $x$。流程如下：
> >
> > - 如果这是第一行，结束算法。
> >
> > - 找到上一行最大的比 $x$ 小的数 $y$（显然一定存在）
> >
> > - 交换 $x,y$，移到上一行继续算法。
> >
> > 结束算法后删掉已经没有数的格子 $p$。
>
> 如下演示了一个删除过程。
>
> <div style="width:70%;margin:auto"><img src="/images/RSK2.png" alt=""></div>
>
> 很明显删除就是行插入的逆操作。
>
> 考虑一个 $1...n$ 的排列，依次插入即可得到两个 SYT $(P,Q)$；给定 $(P,Q)$，显然 $Q$ 中最大元素一定在边角，于是我们可以按 $Q$ 的指导去删除 $P$ 来还原原来的排列。
>
> 于是也就得到了以下的 *Robinson–Schensted correspondence*：
>
> > 上述算法构成了 $(P,Q)$ 到 $\mathfrak S_n$ 的双射。
> 
> $\blacksquare$

<script>
document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 教程关：标准杨表的钩长公式 && 201.[3]

> **问题.**
>
> 定义一个格子 $u$ 的**钩长** $h(u)$ 是它下方的格子数 $+$ 右方的格子数 $+1$。
>
> 证明，
> $$
> f^{\lambda}=\dfrac{n!}{\prod_uh(u)}
> $$

<script>
  	document.new_button(5);
</script>

> **解答.**
>
> 复杂，参见 [这里](https://www.dmtcs.org/dmtcs-ojs/index.php/dmtcs/article/view/76/135.html)。

<script>
document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### 教程关：RSK 算法和最长上升子序列 && 204.[3]

> **问题.**
>
> 证明，$n$ 个格子的 SYT 总数与 $\mathfrak S_n$ 中的**对合**~~内卷~~（即逆为自身的排列）总数相等。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 我们只需要证明以下定理：若 $\text{RSK}:w\mapsto(P,Q)$，则必有 $\text{RSK}:w^{-1}\mapsto (Q,P)$。
>
> 从而被 RSK 算法映射到 $(P,P)$ 当且仅当这个排列是对合，也就证明了原题。
>
> > 考虑 $w$ 中的这样一条子序列：$A=(w(i_1),w(i_2),...,w(i_{\ell}))$，其中 $i_*$ 皆满足 $\forall j<i_*,w(j)>w(i_*)$，且 $i_{*}<i_{*+1}$。
> >
> > 显然它们会依次替换掉 $P^{(1,1)}$，而 $P^{(1,1)}$ 被替换出后，在下一行不可能有能与之匹敌的对手，于是必然插入 $P^{(2,1)}$，原来的 $P^{(2,1)}$ 必然插入 $P^{(3,1)}$，依次类推。
> >
> > 于是我们如此总结：$P^{(1,1)}=w(i_{\ell}),Q^{(1,1)}=i_{1}$。对于 $P^{(2,1)}$，只需要考虑在 $w$ 中抽掉 $A$ 再进行类似构造即可。
> >
> > （但是注意上述结论不能得出有关 $P^{(*,1)}$ 的信息，因为该格的来源的可能性相对较复杂）
>
> 注意 $A$ 可看成从排列 $w$ 到子序列 $A$ 的映射，所以我们下面可能会使用 $A(w),i(w)$ 等记号。
>
> 回过头来考虑 $w$ 和 $w^{-1}$ 的关系。我们指出，如果交换 $A(w)$ 的下标和元素值，然后再 $\text{reverse} $ 整个序列，则得到的恰好是 $A(w^{-1})$。下面我们来说明为何会这样。
>
> > 上面的结论写的明确一些就是：$i_*(w^{-1})=w(i_{\ell+1-*}(w))$。
> >
> > $i_*(w^{-1})<i_{*+1}(w^{-1})$ 是显然的，所以我们只需要验证
> > $$
> > \begin{aligned}\forall j<i_*(w^{-1}),w^{-1}(j)>w^{-1}(i_*(w^{-1}))\\
> > \Longleftrightarrow\forall w(k)<w(i_{\ell +1 -*}(w)),k>i_{\ell+1-*}(w)
> > \end{aligned}
> > $$
> > 这的确和 $i(w)$ 的定义等价。
>
> 也就是说我们证明了对 $w$，原定理在第一行的确成立。
>
> 构造一个新序列，它是依次写下 $w$ 中被插入第二行的元素形成的序列（显然，插入第二行的顺序不一定在是 $w$ 中的顺序）。只要它满足原定理，$w$ 也就满足原定理。于是归纳即可。
>
> $\blacksquare$

<script>
document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

## 后记

放弃了，做不动力