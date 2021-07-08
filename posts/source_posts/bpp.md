---
title: bijective proof problems 选做（上）
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
[pdf 版本的题目表](https://xyix.github.io/images/bijective%20proof%20probs.pdf)

<script>
    document.get_button_click = function(blockid) {
        return function() {
            let my_blockquote = document.getElementsByTagName("blockquote")[blockid];
            if(my_blockquote.style.display === 'none') {
                my_blockquote.style.opacity = 0;
                my_blockquote.style.display = "block";
                this.childNodes[0].textContent = '- 隐藏证明';
                for (var i = 0; i < 20; i++)
                	setTimeout("document.getElementsByTagName(\"blockquote\")[" + String(blockid) + "].style.opacity = 0.05 * " + String(i), i * 10);
            }
            else {
                my_blockquote.style.display = 'none';
                this.childNodes[0].textContent = '+ 显示证明';
            }
        };
	};
    document.last_block = -1;
    document.new_button = function(blockid) {
        document.last_block = blockid = document.last_block + blockid;
        let my_button = document.createElement('button');
        	let button_content = document.createElement('span');
        	button_content.style = 'font-family: consolas';
        	button_content.textContent = '+ 显示证明';
        	my_button.appendChild(button_content);
       	my_button.onmouseover = function(){this.style = 'background-color: #dddddd;cursor: pointer;';};
        my_button.onmouseout = function(){this.style = 'background-color: #ffffff;cursor: pointer;';};
        my_button.onclick = document.get_button_click(blockid);
        document.body.childNodes[0].childNodes[1].appendChild(my_button);
	};
</script>

### **记号和声明.**

- 注意双射意味着**单**和**满**。单往往是显然的，满则等价于唯一可逆。
- $Y^X=X\rightarrow Y$ 代表从集合 $X$ 到 $Y$ 的映射。
- $x\mapsto\xi$ 代表一个把元素 $x$ 映射到 $\xi$ 的映射。
- $C(S,m)$ 代表从 $S$ 的所有大小为 $m$ 的子集。当然也可以看作 $\{f\in\{0,1\}^S,\sum_{i=1}^nf(i)=m\}$。
- $[n]=\{1,2,...,n\}$。
- $\#S$ 表示集合 $S$ 的大小。
- 向量 $(c_1,c_2,...,c_n)$ 记为 $\mathbf c$。
- 既然是双射证明题集，此处所有问题的解答**只允许使用组合意义**，准确来说是 **bijective proof**（通过构造从 $S$ 到 $T$ 的双射来证明 $|S|=|T|$）。被禁止的手段包括但不限于
- - 归纳
  - 递归 / 递推
  - 生成函数
  - 组合恒等式，即使该组合恒等式可以用组合意义证明
- ~~事实上很大概率你也用不了（悲）~~
- 另外还要尽量使证明足够优雅。
- 有可能会插入一些 EC 里的好题。
- 教程关皆是 EC 里的叙述，加入的原因是：如果读者不熟悉这部分的双射和结论，则很可能对下面的问题掉线。

### **问题难度解释.**

- $+$ 和 $-$ 表示微调。
- [1]：显然或直接。
- [2]：困难或比较技巧性。[2+] 是应当给研究生留的作业题的难度上界。 
- [3]：极其困难。一些学生可能能做出 [3-]。几乎没有人可以在合理的时间内做出 [3]。（有时候用相对简单的方法做出 [3] 级题是可以发论文的……）
- [*]：Open Problem。（草）
- 此处难度皆标注以题单中标注的难度。

## 基础部分

主要关于组合数。

### **5.[2]**

> **问题.**
>
> 分别求满足如下条件的有序列表 $(S_1,...,S_k)$ 的数量，其中 $S_i$ 皆为 $[n]$ 的子集。
>
> - $S_1\subseteq...\subseteq S_k$。
> - $S_i$ 两两不交。
> - $\bigcap S=\varnothing$。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 第一问：容易建立从 $\{1\sim k +1\}^{[n]}$ 到指定集合的双射：$f(i)$ 表示第 $i$ 个元素首次出现是在 $S_{f(i)}$，$f(i)=k+1$ 表示从未出现。
>
> 第二问：显然可以建立到第一问的双射：$S_i\mapsto S_{i}/S_{i-1}$。
>
> 第三问：显然可以建立到一组 $\bigcup S=[n]$  的集合的双射：$S_i\mapsto [n]/S_i$。而后者可以按和之前类似的方法建立到 $([k] 的非空子集)^{[n]}$ 的双射。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
开胃小菜，没啥好说的。

话说这不应该是 [1]？

### **12.[2-]**

> **问题.**
>
> 证明
> $$
> \sum_{k=0}^n{x+k\choose k}={x+n+1\choose n}
> $$
> 不妨假定 $x$ 为正整数。（因为等式两边都是关于 $x$ 的有限次多项式，证明了正整数的情况也就证明了一般情况）

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 考虑集合 $C([x+n+1],n)$，我们的目的是将其元素 $\mathbf S$ 用如下二元组描述：$(k, S)$，其中 $S\in C(x+k,k)$。
>
> 这一双射是显然的，我们只需要令 $n-k$ 等于 $\mathbf S$ 中末尾那一长串 $1$ 的长度，$S$ 为剩下的 $[x+k]$ 的情况。注意 $\mathbf S(x+k+1)$ 必定为 $0$，不需要也不能用 $S$ 描述。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **13.[3]**

> **问题.**
>
> 证明
> $$
> \sum_{k=0}^n{2k\choose k}{2(n-k)\choose n-k}=4^n
> $$

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 注意到 $2n\choose n$ 是从 $(0,0)$ 走到 $(n,n)$，每一步只能向上一步或是向右一步的方案数（该双射是显然的）。
>
> 于是等式右边可解释为：从 $(0,0)$ 开始走 $2n$ 步，不限目的地的方案数。一个方案可以双射到三元组：$(k,S,T)$，其中 $S$ 是一条从 $(0,0)$ 到 $(k,k)$ 的路径，$T$ 是一条从 $(0,0)$ 开始走 $2n-2k$ 步且除了 $(0,0) $**从未**触碰 $y=x$ 的路径。换句话说，$k$ 标记出了它最后一次触碰 $y=x$ 的位置。
>
> 我们只需要说明，$T$ 的数量为 ${2(n-k)\choose n-k}$。这一部分的说明不是我的解法而是来自于[这里](https://www.quora.com/How-do-I-prove-that-sum_-k-0-n-binom-2k-k-binom-2n-2k-n-k-4-n/answer/Luke-Gustafson)。
>
> > 长度为 $2n$ 的所有路径可被分为 $4$ 类：
> >
> > - $T$ 的一员
> > - $S$ 的一员
> > - 触碰过 $y=x$ 并在最后处在 $y=x$ 右方
> > - 触碰过 $y=x$ 并在最后处在 $y=x$ 上方
> >
> > 显然，第一步往右走的第三类和第一步往右走的第四类数量相等，往上走亦然。关键之处在于，第一步往右走的第四类和第一步往上走的第三类是极易考虑的：它们的定义保证了它们必然触碰过 $y=x$，不需要再做考虑。
> >
> > 剩下只是一些处理组合数的工作，略去不谈。
>
> $\blacksquare$
> 
> 有趣的是一位老哥头铁地直接构造了一个从 $S$ 到 $T$ 的[双射](https://math.stackexchange.com/a/72661)。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **14.[3-]**

> **问题.**
>
> 证明
> $$
> \sum_{i=0}^{\min(a,b)}{x+y+i\choose i}{y\choose a-i}{x\choose b-i}={x+a\choose b}{y+b\choose a}
> $$

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 不妨改为证明
> $$
> \sum_{i=0}^{\min(a,b)}{x+y+i\choose x,y,i}{y\choose a-i}{x\choose b-i}={x+y\choose x}{x+a\choose b}{y+b\choose a}
> $$
> 左式可以化为这样一个模型，你在一个 $4$ 维网格上走动，每次可以选择
>
> - $(0,1,0,1)$
> - $(1,0,0,0)$
> - $(1,1,0,0)$
> - $(0,0,1,0)$
> - $(0,0,1,1)$
>
> 之一，最后走到 $(x,a,y,b)$。求总方案数。
>
> 当然也可以看成，往四个可区分的盒子里放任意多个有标号的球，要求第二个盒子和第三个球数之和为 $x$，第一个和第三个为 $a$，第一个和第五个为 $b$，第四个和第五个为 $y$。
>
> 然后到这里我就做不下去了……还是 EIls 靠谱。
>
> <div style="width:70%;margin:auto"><img src="https://xyix.github.io/images/bpp1.png" alt=""></div>
>
> 其实和上面的思路是一样的，但是 EIls 的解释确实更容易联系到右式。剩下的工作已经很显然了。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
### **15.[3-]**

> **问题.**
>
> 证明
> $$
> \sum_{k=0}^n{n\choose k}^2x^k=\sum_{k=0}^n{2n-k\choose n-k,n-k,k}(x-1)^k
> $$

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 等式左边可理解为三元组 $(S,T,f)$，其中 $S,T\subseteq [n]$ 且大小相等，$f$ 是从 $S$ 到 $[x]$ 的映射。
>
> 右边则可理解为三元组 $(S',T',f')$，其中 $S'\subseteq[n]$，$T'\in C([2n]/S,n)$，$f'$ 是从 $S'$ 到 $[x-1]$ 的映射。
>
> 如此构造映射 $(S,T,f)\mapsto(S',T',f')$：
>
> > 令 $S'=f^{-1}([x-1])$；
> >
> > $f'$ 自然是 $f$ 在 $S'$ 上的限制；
> >
> > 令 $T'$ 在 $[n]$ 的部分为 $[n]/S$，在 $[n+1....2n]$ 的部分为 $T$ 平移到此处。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **16.[3-]**

> **问题.**
>
> 证明
> $$
> \sum_{i+j+k=n}{i+j\choose i}{j+k\choose j}{k+i\choose k}=\sum_{r=0}^n{2r\choose r}
> $$

<script>
  	document.new_button(3);
</script>
> **解答.**
>
> 不会，贺了题解。
>
> 左式可理解为如下三元组 $(\alpha,\beta,\gamma)$ 的数量：
>
> - $\alpha$ 是一个以 $\text{a}$ 开头以 $\text{b}$ 结尾的字符串，恰有 $i+1$ 个 $\text{a}$ 和 $j+1$ 个 $\text{b}$。
> - $\beta$ 是一个长度为 $j+1$ 的正整数序列且和恰为 $j+k+1$。
> - $\gamma$ 是一个长度为 $i+1$ 的正整数序列且和恰为 $i+k+1$。
>
> 做如下映射：
>
> - 将 $\alpha$ 的第 $i$ 个 $\text{a}$ 替换为 $\text{c}^{\gamma_i}\text{d}$，第 $i$ 个 $b$ 替换为 $\text{d}^{\beta_i}\text{c}$。其中 $\text{c}^r$ 表示 $r$ 个 $\text{c}$。
> - 此时 $\alpha$ 必以 $\text{c}$ 开头，以 $\text{d}(\text{dc})^r$（满足该形式的后缀显然是唯一的）的形式结尾。删掉它们。
>
> 这构建了一个从左到右的双射。（其逆并不非常复杂，留给读者）
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

就离谱，这双射是人能想出来的？建议评分 [3+]

### **66.[*]**

> **问题.**
>
> 证明，
> $$
> \dfrac{(2m)!(2n)!}{m!n!(m+n)!}
> $$
> 总是整数。
>
> $\blacksquare$

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 这个问题在 2014 年得到了[解决](https://arxiv.org/abs/1403.5246)。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
## 置换和循环

排列 / 置换显然是一个重要的话题：没有排列 / 置换我们就无从描述一大类等价。

### **教程关：置换和循环.**

> **问题.**
>
> 给出序列 $(c_1,c_2,...,c_n)$。证明，有 $c_1$ 个长度为 $1$ 的循环，有 $c_2$ 个长度为 $2$ 的循环，……，的 $[n]\rightarrow [n]$ 的置换的数量为
> $$
> {n\choose c_1,c_2,...,c_n}\prod_{i}\dfrac{1}{i^{c_i}}
> $$

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 记问题描述中的所有置换构成集合 $\mathfrak S^{\mathbf c}_{[n]}$，这种置换称为类型为 $\mathbf c$ 的置换。
>
> 故而只需要证明
> $$
> n!=\#\mathfrak S^{\mathbf c}_{[n]}\prod_{i}i^{c_i}c_i!
> $$
> 首先我们先展示一个从 $\mathfrak S_{[n]}$ 到自身的双射，被称为**基本双射**。ctrl+F 搜索本网页的“基本双射”，你就会知道为何它配得上如此称号。
>
> > 将 $w$ 的所有循环写为以其最大元素开头，称为代表元素，然后以代表元素的大小排列各循环。最后删掉括号。
> >
> > 例：$w=4271367=(14)(2)(375)(6)$ 会被映射到 $2416753$。
>
> 我们有一个显然的 $\mathfrak S_{[n]}\rightarrow\mathfrak S_{[n]}^{\mathbf c}$ 的映射：把它开头的 $c_1$ 个元素每个套上一个括号，剩下部分开头的 $2c_2$ 个元素每 $2$ 个套一个括号……。我们只需要说明一个类型为 $\mathbf c$ 的置换的原像大小总是 $\prod_{i}i^{c_i}c_i!$。
>
> > 先从任意一个原像出发。首先我们可以任意排列长度相等的循环，然后每个循环还可以旋转，显然这样生成的所有排列两两不同，于是便得证了。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **51.[3]**

> **问题.**
>
> 记 $D(n)$ 是 $n$ 的错排数，证明：
> $$
> D(n)=nD(n-1)+(-1)^n
> $$

<script>
  	document.new_button(4);
</script>
> **解答.**
>
> 比较复杂，参见：[A bijective proof of a derangement recurrence](https://www.fq.math.ca/Papers1/55-5/BenjaminOrnstein.pdf)。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **57 && EC 117.[2+]**

> **问题.**
>
> 从 $[n]$ 的所有排列中等概率随机一个排列 $w$，求 $1$ 所在循环大小为 $k$ 的概率。

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 答案为：与 $k$ 无关，皆为 $\frac 1n$。
>
> 我们考虑把一个循环转变为，把 $1$ 所在循环固定在其首位且以 $1$ 为代表，剩下的部分遵从基本双射接在其后。容易发现对于任意确定的 $k$，上述映射构成了从 $1$ 所在循环大小为 $k$ 的排列到 $[n-1]$ 的排列的双射。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **EC 120.[2+]**

> **问题.**
>
> 令 $E_k(n)$ 为 $[n]$ 的排列中长度为 $k$ 的循环数量的期望。证明，$E_k(n)=\dfrac{1}{k}$。

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 由 117 直接得 $E_k(n)=\dfrac 1k\sum_{i=1}P(i 所在循环大小为 k)=\dfrac 1k$。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **58 && EC118.**

> **问题.**
>
> - (a)[2] 令 $w$ 是 $[n]$ 的随机排列，证明，$1,2$ 在同一个循环的概率为 $\dfrac 12$。
> - (b)[2+] 推广 (a) 至下面的结论：$1,...,\lambda_1$ 在同一个循环，$\lambda_1+1,...,\lambda_1+\lambda_2$ 在和 $1,...,\lambda_1$ 不同的另一个循环，……，一直到 $\lambda_{\ell}$，其出现概率为
>
> $$
> P_{\lambda}=\dfrac{\prod(\lambda-1)!}{(\sum \lambda)!}
> $$
>
> - (c)[3-] 描述同 (b)，但是 $w$ 从 $[n]$ 的**偶置换**中选取。证明概率为
>
> $$
> Q_{\lambda}=\dfrac{\prod(\lambda-1)!}{(-2+\sum\lambda)!}\cdot \left(\dfrac{1}{(\sum\lambda-1)\sum\lambda}+\dfrac{(-1)^{n-l}}{(n-1)n}\right)
> $$

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 对于 (a)，解法是显然的。
>
> - 构造双射为交换 $w_1$ 和 $w_2$。它把 $1,2$ 在同一个循环的排列双射至 $1,2$ 不在同一个循环的排列。
>
> 对于 (b)，我们还是考虑**基本双射**。为了方便稍稍修改其为：把最小的元素固定为循环开头，把循环按最小元素降序排列。
>
> - 回忆 (a)。满足 (b) 的条件等价于 $1$ 在 $2$ 之前出现。
> - 思考如何扩展到此处：只需要：
> - - $2,...,\lambda$ 皆在 $1$ 之后出现；
>   - $\lambda_1+2,...,\lambda_1+\lambda_2$ 皆在 $\lambda_1+1$ 之后出现；且 $\lambda_1+1,...,\lambda_1+\lambda_2$ 皆在 $1$ 之前出现；
>   - ……
> - 剩下的工作已经显然了。
>
> 对于 (c)，我们做如下考虑。
>
> - 记 $w$ 在基本双射下的像为 $v$，我们来证明，$v$ 和 $v'=(v_2,v_1,v_3,v_4,....,v_n)$ 恰有一个奇置换和一个偶置换。
> - - $v,v'$ 中必然有一个满足 $v_1,v_2$ 在同一个循环，另一个满足：$v_1,v_2$ 之一自成循环，另一个还在原来的循环里。于是交换 $v_1,v_2$ 反转了后者所在循环的长度奇偶性，也就反转了整个置换的奇偶性。
> - 除此之外，若 $v'$ 满足条件，则
> - - 要么 $v$ 也满足条件；
>   - 要么 $v_2=\lambda_1+...+\lambda_{\ell-1}+1$ 且 $v_2<v_1\le \sum \lambda$。
> - 剩下的部分已经显然了。

<script>
    document.getElementsByTagName("blockquote")[27].style.display="none";
</script>

### 76[2] && 77[3].

> **问题.**
>
> 证明：
>
> 76. [2] 环长皆能被 $k\ge 2$ 整除的 $[n]$ 的排列的数量为
>
> $$
> \prod_{i=1}^n(n-i+\left[k\ |\ i\right])
> $$
>
> 77. [3] 环长皆**不**能被 $k\ge 2$ 整除的 $[n]$ 的排列的数量为
>
> $$
> \prod_{i=1}^n(i-[k\ |\ i])
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 对于 76 只需要做如下考虑：
>
> - 首先决定 $w(1)$，这有 $n-1$ 种选择（不能连回 $1$）。
> - 然后决定 $w(w(1)),w(w(w(1)))$……，分别有 $n-2,n-3$……种选择。
> - 直到我们试图决定 $w^{\left<k\right>}(1)$，这时我们除了 $n-k$ 种选择之外还有一种可能：连回 $1$。如果选择连会 $1$，这之后我们从第一个尚未决定的 $w(i)$ 开始继续流程。
>
> 显然每一步的选择数量和之前的选择完全无关，而上述流程显然是可逆的，从而它是一个从所有描述的排列到 $\prod_{i=1}^n(n-i+[k\ |\ i])$ 的直接双射。
>
> 对于 77……我所能找到的唯一一份[文献](https://pdf.sciencedirectassets.com/272565/1-s2.0-S0097316500X01082/1-s2.0-0097316580900126/main.pdf?X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIG8m%2Bol%2Bx3tt7cZCtRclv0QgGYcabFXqBQabh62aRtpxAiBGOp0PFBb1Rowhx%2FYxdVb7ahX6Mc%2BlOhEoEN%2FhPBmWLSq9AwiJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAMaDDA1OTAwMzU0Njg2NSIMz8pZaz2RoMCK42B7KpEDP6J%2B1pVDZA0DHk1ruwHUFtO4urpUocOwNxWe2dUQT8DWMnLeKhK3toSnkyj7%2FCJFBPojrGV0fUlBtjHZMgZiHJKVXGaTdS0v9sQt01PgFkhfdHwZNChkTPjkntK4CZrgUL9GxjrN1LBi1rHkC9vS6IHp78lSZ1haCrwykWDifm%2B7908bp9tk0FEfyQtePm2A%2Fti%2B6YD8TibddDJM%2FSAUdNSSIf5C7DytVtLP%2BMDbMtbx0UkSjb2I5E8wvIk3nBciPAinDTDCHuy%2B2e2UDzRRCJGIUY3BOMIuNOKRQInjBgM5stCfdIK6Bs1grIVuse%2BLvdijugWjC35JHucAiqyvQFuq%2BEikIpD6A6Ofz%2B89yWo4ccLaVT1nqceAlAh8JyyXKtj68Rn3%2Fq2EOoGlLx06nvVLCUZAwcLmlMW43DjU6KOW3RnOpXgmjxG9QH7LzZuLRm0YX4aS0jRasX%2F7rpryn2EkubHGEzUyUMOUM9ftQcIoMMjTReYzsovtFHfHrUnLYKazgZGghLrcNulN6Y8b7Skw26CB%2FwU67AFr%2FPLktkItJkzD2l7vsh%2B7ZYCw7fjRSslxivpwh3zgTc3L5TV9zebK9aQC%2B2Ye2QxkqgS5YEqgmaNAWF%2FcjZJ0c7MYDBSAhKe9dqOD9uu7SMkucg78C98bpsT2v%2BnK2fVBo%2FmnZ5hAGCx4%2FVIncz36DYx2yTSF%2F4osprcQtH6S2gz%2BOiQ2FBxdC%2FI5ENThnExxl2ofaS0A%2FE%2FzTBoT6nqP%2BIT7BOFFgJOIVA3puXo3ME6LU17VJ7mDZ2TjoQ9hz2TbRoPCs9InTji09k4CJwd5363YMItLDxjMfM4I6f39OBNmA14zS7WvMlc5oQ%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20201221T080917Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3PHCVTYT4BKZE3H%2F20201221%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=2a6d10a4287c5fb4d91e83de3a7111c4fe135a1e69a4009219f8289fe1a43f42&hash=26af4f9f17e42ece010fb70d4eacbeefa21f4c8c6bd702f5e0f391ec8d6c56a2&host=68042c943591013ac2b2430a89b270f6af2c76d8dfd086a07176afe7c76c2c61&pii=0097316580900126&tid=spdf-4cf30eae-9c7a-4172-a142-b52528aaede8&sid=f27d352e4ec1d943869a64a-1bcd5a1a0876gxrqa&type=client)复杂得离谱，而我根本找不到别的做法。实在是没办法了。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

## 置换和等价类

等价类的研究和应用。

### **18.[3]**

> **问题.**
>
> 证明，当 $n$ 为质数时，下面两个集合的元素个数相等。
>
> - 所有满足其和在模 $n$ 意义下为 $0$ 的 $[0...n-1]$ 的子集
>- 所有有 $n$ 个珠子的黑白项链在旋转变换下的等价类

<script>
  	document.new_button(2);
</script>
> **解答.**
>
> 我们来证明两者皆是 $\dfrac{2(n-1)+2^n}n$。
>
> 后者比较显然。
>
> > 取所有等价类，考虑其在所有旋转下的像（$\times n$），这个集合“几乎”是 $[2]^{[n]}$：
> >
> > - 显然两个不同等价类形成的像不会相同
> > - 但是一个等价类的像可能和同一个等价类的另一个像相同，由于 $n$ 是质数，这种情况只在该项链全黑或全白时出现，减掉即可
> >
> > 稍微扩展一下便是 Burnside 引理的一个组合证明。
>
> 再来考虑前者。
>
> > 考虑所有大小为 $i$ 的集合。考虑这样一个映射：把集合中所有元素加上 $1$ 再取模。
> >
> > 在 $i\neq 0\land i\neq n$ 的普通情形下这是一个从所有大小为 $i$ 的 $[0...n-1]$ 的子集回到自身的双射。且和为 $d$ 的集合总会被映射到和为 $d+i\bmod n$ 的集合，从而它们的元素个数相等。即两两
> >
> > 只是在 $i=0\lor i = n$ 时不成立，特判即可。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

原题要求证明任意奇数的情况，所以评到了 [3]。原话：This is easy if n is prime.

被 D 傻了（悲）

UPD 2020/12/17：找到了一份对珠子颜色数为 $q$，$n,q$ 互质的一般情况的[双射](https://arxiv.org/abs/1802.03507)。~~为什么近年来发数数论文的看名字全是中国人或华裔，难道这是血统加成？~~

### **21[2].**

> **问题.**
>
> 证明如果 $p$ 是质数，$a^p-a$ 在模 $p$ 意义下为 $0$。

<script>
  	document.new_button(4);
</script>

> **解答.**
>
> 大体思路是，选取一个大小为 $a^p-a$ 的集合，然后将其分为数份，每份大小均为 $p$。
>
> 一个显然的想法是令 $S$ 为所有 $[a]^{[p]}$ 中值不全相同的映射。
>
> 相信读者对 18 一定还有印象，于是一个显然的分组是把所有循环同构的映射分为一类。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
### **22.a.[2]**

> **问题.**
>
> 证明，如果 $p$ 是质数，那么 ${2p\choose p}-2$ 被 $p^2$ 整除。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 构造集合 $S$ 为所有从 $(0,0)$ 开始，每次可往右或往上走一步，走到 $(p,p)$，且不完全贴着边框走的方案数。
>
> 于是只需要把对前 $p$ 步的右-上序列施以循环变换，后 $p$ 步施以一个独立的循环变换：在这种意义下同构的序列被分为一组。每组大小皆为 $p^2$，得证。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
下面是一道我自己加的题目。

### EXTRA-1.[2]

> **问题.**
>
> 建议阅读[这个课件](https://xyix.github.io/posts/?page=1&postname=combinatorics)或对生成函数有一定了解后再来尝试此题。
>
> 记组合类 $\mathcal G$ 由所有无序列表 $g=(f_1,f_2,...)$ 构成，记其长度为 $\ell(g)$。其中 $f$ 皆是组合类 $\mathcal F$ 中的元素。
>
> 证明
> $$
> \boxed{\sum_{g\in\mathcal G}\prod_{i}xt_{f_i}=\text{exp}\left(\sum_{i=1}^{\infty}\dfrac {x^i}i\sum_{f\in\mathcal F}t^i_f\right)}
> $$
> 其中 $t_{f},x$ 皆是形式幂级数变元。
>
> 这个定理是欧拉变换的加强版：普通的欧拉变换就是它取 $t_f=y^{|f|},x=1$ 的特殊情况。

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 首先，由于 $\text{exp}$ 在有标号计数中体现出的组合意义（如果要精确描述势必会极占篇幅，所以干脆不描述了，想必读者在阅读完课件之后肯定能独立研究出），我们希望两边都可以写成指数生成函数的形式。
>
> 具体来说，把左式强行写成：
> $$
> \sum_{n\ge 1}n!G_n\dfrac{x^n}{n!}
> $$
> 其中 $G_n=\sum_{\ell(g)=n}\prod_{i}t_{f_i}$。于是左式可解释为：枚举了所有无序颜色列表 $g$ 和一个排列 $w$ 组成的有序对。
>
> 右边则可这样考虑：
>
> - $\sum_{i=1}^{\infty}(i-1)!\dfrac{x^i}{i!}$ 可解释为所有循环。
>
> - 考虑 exp 的组合意义，循环的 exp 自然就是排列。
>
> - 那么右边可以解释为有序颜色列表 $h$ 和一个排列 $v$ 组成的有序对，且 $v$ 中每一个循环中的所有位置必须是同样的颜色，且每有一个位置的颜色为 $f$ 就附带 $t_f$ 的权值。
>
> 最后，我们考虑**基本双射**就可得到左右式之间的双射。具体对本题来说：考虑排列 $w$，将其按 $g$ 染色，然后逆向使用基本双射。显然这个变换是保权值的，于是我们便证明了原定理。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

## 排列上的统计（statistics）

一个排列可能有极多的特征，其中一些特征神奇地有着极其紧密的联系。

### **教程关：逆序对，Descents，和 Major index（上）&& 70.**

> **定义.**
>
> - 逆序对对我们而言是很熟悉的。一个排列的逆序对数记为 $\text{inv}(w)$。
> - 一个排列（准确来说可直接推广至元素不重复的序列）的 Descents（可译为“下降”）Set 是集合 $D(w)=\{w_i>w_{i+1},i\in[n-1]\}$。
> - $\text{maj}(w)=\sum_{i\in D(w)}i$。

> **问题.**
>
> 证明，$\mathbf{inv}$ **和** $\mathbf{maj}$ **是等分布（equidistribution）的。**换句话说
> $$
> \#\{w\in\mathfrak S_n,\text{inv}(w)=k\}=\#\{w\in\mathfrak S_n,\text{maj}(w)=k\}
> $$

此处的证明并不是完全双射的，~~[A direct bijective proof would be of great interest.jpg](https://www.luogu.com.cn/blog/zyxxs/bijective-proof-problems-zhong-di-yi-suo-sheng-cao-ping-lun)~~，这种类型的双射被称为 recursive bijection，即构造长度为 $n$ 时的映射需要使用长度为 $n-1$ 时的映射。

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 下面构造双射 $\phi:\{w\in\mathfrak S_n,\text{maj}(w)=k\}\rightarrow\{w\in\mathfrak S_n,\text{inv}(w)=k\}$。
>
> 令 $v=\phi((w_1,w_2,...,w_{n-1}))$。
>
> 在 $v$ 的基础上如此构造 $\phi(w)$：
>
> - 如果 $w_{n-1}<w_n$：
> - - 在 $\phi(w)$ 中所有小于 $w_n$ 的位置后面切一刀。
>   - 把所有部分向右循环移一位。
> - 否则，
> - - 在 $\phi(w)$ 中所有大于 $w_n$ 的位置后面切一刀。
>   - 把所有部分向右循环移一位。
> - 最后令 $\phi_{n}(w)=w_n$。
>
> $\phi$ 显然是可逆的。
>
> 接下来我们来展示，$\text{maj}(w)=\text{inv}(\phi(w))$。
>
> > 对 $n=1$ 显然成立。
> >
> > 归纳假设：$\text{maj}((w_1,w_2,...,w_{n-1})=\text{inv}(v)$。
> >
> > 若 $w_{n-1}<w_{n}$，我们来证明上面描述的操作恰会使 $v$ 的逆序对数不变。
> >
> > - 首先我们不必考虑不同部分之间的影响，因为它们之间根本没有相对位置改变。
> > - 旋转前的某个长为 $l$ 的部分一定是由 $l-1$ 个 $>w_n$ 的元素和一个 $<w_n$ 的元素构成的。循环移位会使之失去末尾元素与其他所有元素的逆序对，即 $l-1$。
> > - 对所有部分求和即 $n-1-\#\{i:w_i<w_n\}=\#\{i:w_i>w_n\}$。恰和插入 $w_n$ 代来的影响抵消。
> >
> > 不再赘述 $w_{n-1}>w_n$ 的部分，这和上面的证明完全一样。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **教程关：逆序对，Descents，和 Major index（中）.**

> **定义.**
>
> 记 $\text{ID}(w)=D(w^{-1})$。对于 $w$ 并非排列的情况必须稍稍声明一下：只需要认为序列 $(w_1,w_2,...,w_n)$ 描述了函数 $f(\min w)=w_1,...,f(\max w)=w_n$ 即可。

> **问题.**
>
> 证明，上文的 $\phi$ 是保 $\text{ID}$ 的。也即 $\text{ID}(w)=\text{ID}(\phi(w))$。

<script>
  	document.new_button(4);
</script>

> **解答.**
>
> 事实上，$\text{ID}$ 还可如此解释：
>
> - 找到 $w$ 中的 $1$，然后往后查找找 $2$，之后找 $3$……如果根本不存在就跳过。
>- 如果找到了 $n$ 便立即结束。
> - 每当没找到（即下一个元素的位置小于刚读的元素的位置）便把当前已经找到的元素个数写下并回到 $w$ 的开头。写下的集合便是 $\text{ID}(w)$。
> 
> 该解释（下称为阅读过程）和 $\text{ID}$ 的基础定义显然是直接一致的。不过它的确更直观。
>
> 下面我们开始证明原命题。
>
> 对 $n=1$ 显然成立。
>
> 归纳假设：$\text{ID}((w_1,w_2,...,w_{n-1}))=\text{ID}(v)$。
> 
> 当然我们还是要分 $w_{n-1}$ 是否小于 $w_n$ 来讨论。
> 
> 若 $w_{n-1}<w_n$：
> 
> - 显然 $w$ 和 $\phi(w)$ 在读到 $w_n$ 之前的行为都是完全一致的：这部分有没有 $w_n$ 没区别。
> - 则我们读到第一个小于 $w_n$ 的元素后（这个元素总是存在，毕竟有 $w_{n-1}$）一定能读到 $w_n$，这时我们会回到序列的开头。对于 $\phi_n(w)$ 也是如此。我们还需要核对接下来的行为。
> - 注意到 $\phi_n(w)$ 根本没有改变 $w_i>w_n$ 的元素之间的相对顺序，于是便得证了。
> 
> 而若 $w_{n-1}>w_n$，注意到阅读是可反向的（这不是说可逆，而是说我们从 $n$ 开始反向查找得到的结果相同），我们反着读即可。
> 
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **教程关：逆序对，Descents，和 Major index（下）&& 71.**

> **定义.**
>
> 记 $\text{imaj}(w)=\text{maj}(w^{-1})$。

> **问题.**
>
> 证明，$\mathbf{inv}$ **和** $\mathbf{maj}$ **和** $\mathbf{imaj}$ **是两两交对称分布（symmetric joint distribution）的。**换句话说
> $$
> \#\{w\in\mathfrak S_n,\text{inv}(w)=j,\text{maj}(w)=k\}=\#\{w\in\mathfrak S_n,\text{inv}(w)=k,\text{maj}(w)=j\}
> $$
>
> $$
> \#\{w\in\mathfrak S_n,\text{inv}(w)=j,\text{imaj}(w)=k\}=\#\{w\in\mathfrak S_n,\text{inv}(w)=k,\text{imaj}(w)=j\}
> $$
>
> $$
> \#\{w\in\mathfrak S_n,\text{maj}(w)=j,\text{imaj}(w)=k\}=\#\{w\in\mathfrak S_n,\text{maj}(w)=k,\text{imaj}(w)=j\}
> $$

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 我们首先来说明 $\text{maj}$ 和 $\text{imaj}$ 是交对称分布的：显然映射 $w\mapsto w^{-1}$ 可反转 $\text{maj}$ 和 $\text{imaj}$。
>
> 而 $\phi$ 是保 $\text{ID}$ 的，故当然是保 $\text{maj}$ 的。于是便立即得证。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **63.[2+] && 64.[2-]**

> **问题.**
>
> 63. 定义一个排列的 **excedance** 是 $w_i>i$ 的位置的数量。证明，excedance 的数量和 descents 的数量是等分布的。
>
> 64. 证明，一个排列的 **weak excedance**（$w_i\ge i$ 的位置）的数量满足
>
> $$
> \#\{w\in\mathfrak S_n,\text{wexc}(w)=k\}=\#\{w\in\mathfrak S_n,\text{des}(w)=k-1\}
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 考虑 $w$ 在基本双射下的像 $w'$。容易发现，$w'(i)<w'(i+1)$ 当且仅当：
>
> - $w(w'(i))\neq w'(i+1)$（$w'(i)$ 是循环的结尾）
> - 或 $w(w'(i))=w'(i+1)\land w'(i+1)>w'(i)$。
>
> 也就等价于，$w'(i)\le w(w'(i))$。
>
> 而反过来说，$w'(i)\le w(w'(i))$ 当且仅当 $w'(i)<w'(i+1)\lor {\color{red}i=n}$。
>
> 总结：
> $$
> n-\text{des}(w')=\text{wexc}(w)
> $$
> 至此我们证明了，
> $$
> \#\{w\in\mathfrak S_n,\text{wexc}(w)=k\}=\#\{w\in\mathfrak S_n,\text{des}(w)=n-k\}
> $$
> 注意到 reverse 整个序列会使 $\text{des}(w)\mapsto n-1-\text{des}(w)$，我们已然证明了 64。
>
> 至于 63 也很显然，我们只需要考虑双射 $\phi_i(w)=n+1-w_{n+1-i}$，它使得
> $$
> n-\text{wexc}(w)=\text{exc}(\phi(w))
> $$
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **教程关：Descents 和 $\mathbf w$- 兼容性（compatibility）（上）.**

> **定义.**
>
> 称函数 $f:[n]\rightarrow\mathbb N$ 是 **$\mathbf w$- 兼容的**，如果：
>
> - $f(w_1)\ge f(w_2)\ge ...\ge f(w_n)$；
> - 若有 $w_i>w_{i+1}$ 则必须有 $f(w_i)>f(w_{i+1})$。

> **问题.**
>
> 证明，任意函数 $f:[n]\rightarrow\mathbb N$ 总是与且只与某个排列兼容。

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 首先我们可以靠值把 $f$ 分成数段。
>
> 考虑段 $f(i_1)=f(i_2)=...=f(i_{\ell})$。显然，$\{i_1,i_2,...,i_{\ell}\}$ 是一段连续的 $\{w_l,w_{l+1},...,w_r\}$。我们又注意到段内 $w_i<w_{i+1}$，这便构造了一个唯一的与 $f$ 兼容的排列。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **教程关：Descents 和 $\mathbf w$- 兼容性（compatibility）（下）.**

> **定义.**
>
> - $\mathcal A(w)=\{f:[n]\rightarrow \mathbb N,f\ 兼容于\ w\}$。
>
> - $\mathcal A_m(w)=\{f\in[n]^{[m]},f\ 兼容于\ w\}$。

> **问题.**
>
> (a) 证明，
> $$
> \#\mathcal A_m(w)={m+n-1-\text{des}(w)\choose n}
> $$
> (b) 证明，
> $$
> \sum_{f\in\mathcal A(w)}x^{\sum_{i=1}^nf(i)}=\dfrac{x^{\text{maj}(w)}}{(1-x)(1-x^2)...(1-x^n)}
> $$

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> (a) 只需要：对于每个 $w_i>w_{i+1}$ 的位置，把 $1\sim i$ 的函数值全 $-1$，便得到了一个和 $m-\text{des}(w)\ge g(w_1)\ge g(w_2)\ge ...\ge g(w_n)\ge 1$ 的函数的双射，剩下的工作已经显然了。
>
> (b) 类似 (a)，我们建立到 $g(w_1)\ge g(w_2)\ge ...\ge g(w_n)\ge 0$ 的双射，同时显然有
> $$
> \sum_{i=1}^nf(i)=\text{maj}(w)+\sum_{i=1}^ng(i)
> $$
> 接着考虑 $\dfrac{1}{(1-x)(1-x^2)...(1-x^n)}$，它其实是一个经典 trick，建立了从 $\mathcal A_{n=k}(w)$ 到 $\mathcal A_{n=k}(w)\cup A_{n=k-1}(w)$ 的双射：
>
> - 要么末尾元素为 $0$，删掉这个元素。
> - 否则把序列中所有元素 $-1$。
>
> $\dfrac{1}{1-x^k}$ 中的 $k$ 其实就是上述过程中的 $k$，展开时从中选取的项 $x^{jk}$ 就代表了在长度为 $k$ 时进行了 $j$ 次全部 $-1$。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

### **65.[3-]**

> **问题.**
>
> 记
> $$
> A(n,k)=\#\{w\in\mathfrak S_n,\text{wexc}(w)=k\}
> $$
> 证明：
> $$
> \sum_{n\ge 0}n^kx^n=\dfrac{\sum_{i=1}^kA(k,i)x^i}{(1-x)^{k+1}}
> $$

<script>
  	document.new_button(2);
</script>

> **解答.**
>
> 我们只需要证明，
> $$
> n^k=\sum_{i=1}^kA(k,i){k+n-i\choose n-i}
> $$
> 左边的 $n^k$ 暗示我们考虑 $[n]^{[k]}$，联系到教程关（上），我们容易写出
>
> $$
> n^k=\sum_{w\in\mathfrak{S}_k}\#\mathcal A_n(w)
> $$
>
> 应用教程关（下）便得证了。
>
> $\blacksquare$

此题在 bijective proof problems 中出现时几乎没有给出关于 w- 兼容性的介绍（只给了一个简短的 note 介绍定义），故评到了 [3-]。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

## 多重集的排列

为了研究划分我们必须先介绍一下。

### 教程关：多重集排列.

> **定义.**
>
> - 记 $\mathbf{(n)!}$ 为 $\dfrac{1-q}{1-q}\cdot\dfrac{1-q^2}{1-q}\cdot\ldots\cdot\dfrac{1-q^n}{1-q}$。
> - 记
>
> $$
> \mathbf{{n\choose a_1,a_2,...,a_m}}=\mathbf{\dfrac{(n)!}{(a_1)!(a_2)!...(a_m)!}}
> $$
>
> 注意类似于组合数的记号是有一定原因的，比如有
> $$
> \mathbf{n\choose k}=\mathbf{n-1\choose k}+q^{n-k}\mathbf{n-1\choose k-1}
> $$
>
> 注意当 $q=1$ 时这个记号回到正常的组合数。所以这个记号被我们叫做**组合数的 q-模拟**。q-模拟当然是有其价值的，但那就是另一个故事了。这里我们只是借用一下它的符号。
>
> 另外，正常的组合数可解释为严格递增集合链 $\varnothing\subsetneq S_1\subsetneq S_2\subsetneq...\subsetneq S_{n-1}\subsetneq [n]$ 的数量，而 q-模拟组合数可解释为严格递增线性子空间链 $\varnothing\subsetneq V_1\subsetneq...\subsetneq V_{n-1}\subsetneq \mathbb F_q^n$ 的数量。
> 
> - 定义多重集 $M$（其中有 $a_i$ 个 $i$，整个多重集也记作 $\{1^{a_1},2^{a_2},....,m^{a_m}\}$）上的排列为 $|M|\rightarrow m$ 的函数，且函数值中恰好有 $a_i$ 个 $i$。
> - 澄清：我们定义多重集排列的逆序对为 $\sum_{i<j}[w_i<w_j]$。

> **问题.**
>
> 证明
> $$
> \sum_{w\in\mathfrak S_{M}}q^{\text{inv}(w)}=\mathbf{n\choose a_1,a_2,...,a_m}
> $$

<script>
  	document.new_button(3);
</script>

> **解答.**
>
> 我们有双射 $\phi$：
> $$
> \mathfrak S_M\times\mathfrak S_{[a_1]}\times\mathfrak S_{[a_2]}\times\dots\times\mathfrak S_{[a_m]}\xrightarrow{\phi}\mathfrak S_{|M|}\\(w_0,w_1,w_2,...,w_m)\xmapsto{\phi}\mathfrak w
> $$
> 其内容为，若 $w_0(i)$ 是第 $j$ 个 $w_0(i)$，则令 $\mathfrak w(i)=w_{w_0(i)}(j)+\sum_{d<w_0(i)}a_d$。
>
> 注意到有 $\text{inv}(\mathfrak w)=\text{inv}(w_0)+\text{inv}(w_1)+...$，于是就得证了。
>
> $\blacksquare$

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
<center><a href='/posts/posts/bpp2.html'>to be continued...</a></center>

