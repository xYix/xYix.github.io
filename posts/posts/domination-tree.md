---
title: 男性增加支配树题分数的控制技巧
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

<script>
    document.get_button_click = function(blockid) {
        return function() {
            let my_blockquote = document.getElementsByTagName("blockquote")[blockid];
            if(my_blockquote.style.display === 'none') {
                my_blockquote.style.opacity = 0;
                my_blockquote.style.display = "block";
                this.childNodes[0].textContent = '- 隐藏证明';
                for (var i = 0; i < 10; i++)
                	setTimeout("document.getElementsByTagName(\"blockquote\")[" + String(blockid) + "].style.opacity = 0.1 * " + String(i), i * 20);
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
各位男性朋友，你们好！

男性的图论经验和图论技巧是不可能与生俱来的，无论你的观察能力是如何的健♂壮，你没有学会<span style="color: #1a5a40">**支配树**</span>，在支配树相关题目中就会紧张，就会**不知所措**，就会**被水淹没**。

男性增加支配树题分数的控制技巧过程，其实也就像是一个人掌握数数技巧的过程，它也和[练习数数](https://www.luogu.com.cn/blog/zyxxs/x-yi-x-jiang-tan-sheng-cheng-han-shuo-zai-ru-men)一样，需要有一套**练习增加支配树题分数的方法**，并经过一段时间的**平衡协调练习**，使**刻意的强制性**增加支配树题分数的控制转化为**下意识的习惯性控制**，*最终也和数数一样，一旦学会，就不会忘记。*（迫真）

# Part 1 - 什么是支配树

现在有一个有向图 $G$。

首先定义<span style="color: #1a5a40">**支配关系**</span>。

<span style="color: #36c48e">如果 $1$ 到 $u$ 的路径都必须经过 $v$，那么说 $v$ 支配 $u$。</span>

> **引理 0.**
>
> 把上面定义的路径换为<span style="color: #36c48e">"简单路径"</span>，得到的新定义和原定义是等价的。

<script>
    document.new_button(2);
</script>

> **引理 0 - 证明.**
>
> 显然。完全没有必要走环。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

于是现在，如果 $v$ 支配 $u$，则我们可以说 <span style="color: #36c48e">$1\rightarrow u=1\rightarrow v\rightarrow u$</span>。即，$1\rightarrow u$ 的所有路径，是由 $1\rightarrow v$ 的所有路径和 $v\rightarrow u$ 的所有路径"生成"的。

> **引理 1.**
>
> 支配关系具有<span style="color: #1a5a40">**传递性**</span>：<span style="color: #36c48e">如果 $u$ 支配 $v$，$v$ 支配 $w$，那么 $u$ 支配 $w$。</span>

<script>
    document.new_button(2);
</script>

> **引理 1 - 证明.**
>
> $1\rightarrow w=1\rightarrow v\rightarrow w=1\rightarrow u\rightarrow v\rightarrow w$，即 $u$ 支配 $w$。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

> **引理 2.**
>
> <span style="color: #36c48e">如果 $u,v$ 都支配 $w$，那么 $u,v$ 不可能不互相支配。</span>

<script>
    document.new_button(2);
</script>

> **引理 2 - 证明.**
>
> 考虑 $1\rightarrow w=1\rightarrow v\rightarrow w$。由于前后两段是独立的，所以 $u$ 至少必定在其中一段出现。（不过不可能两段都是。怎么可能有必须走环的路径？）
>
> 下面不妨认为 $1\rightarrow w=1\rightarrow u\rightarrow v\rightarrow w$。又由于 $1\rightarrow w=1\rightarrow v\rightarrow w$，所以
> $$
> 1\rightarrow v=1\rightarrow u\rightarrow v
> $$
> 即原命题。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

又考虑到支配关系有显然的自反性和反对称性，故

> **定理 1.**
>
> 支配关系形成一个树形结构，是为<span style="color: #1a5a40">**支配树**</span>。

下面称节点 $u$ 在支配树上的父亲为 $\text{dom}(u)$。

# Part 1.5 - DFS 树和半支配点的引入

那么问题就来了，我们从该从哪里掏出"$u\rightarrow w=u\rightarrow v\rightarrow w$"这种关系？如果连一条关系都找不到就不可能进行更多的分析。

首先在原图上引入一个以 $1$ 为根的 DFS 树。这个 DFS 树会引出一个 DFS 序，下面我们把 $\text{dfn}(u)<\text{dfn}(v)$ 记为 $u\prec v$。

> **引理 3.**
>
> $\text{dom}(u)$ 一定是 $u$ 在 DFS 树上的祖先。

<script>
    document.new_button(3);
</script>

> **引理 3 - 证明.**
>
> 因为我们实际上已经找到一条 $1\rightarrow u$ 的路径，$\text{dom}(u)$ 只能在其中排除而不能增加。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

> **引理 4.**
>
> 若 $u$ 是 $v$ 在 DFS 树上的祖先，则
>
> - 要么 $\text{dom}(v)$ 是 $u$ 的后代；
> - 要么 $\text{dom}(v)$ 是 $\text{dom}(u)$ 的祖先。

<script>
    document.new_button(2);
</script>

> **引理 4 - 证明.**
>
> 假设不然，那么 $\text{dom}(u)$ 严格高于 $\text{dom}(v)$ 严格高于 $u$ 严格高于 $v$。
>
> 那么显然 $\text{dom}(v)$ 不能支配 $u$，否则 $\text{dom}(u)$ 的"$\text{dom}(u)$"这一头衔就保不住了。于是必定存在一条 $1\rightarrow u$ 且不经过 $\text{dom}(v)$ 的路径，但这直接导出 $\text{dom}(v)$ 支配不了 $v$，矛盾。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

> **引理 5.**
>
> <span style="color: #36c48e">如果 $u\prec v$，那么 $u\rightarrow v$ 总是至少经过 $u,v$ 在 DFS 树上的公共祖先中的至少一个。</span>

<script>
    document.new_button(2);
</script>

> **引理 5 - 证明.**
>
> 注意到非树边只有三种：
>
> - 返祖边；
> - 下指边（起点是终点的祖先）；
> - 由较大的 $\text{dfn}$ 指向较小的 $\text{dfn}$ 的横杈边。
>
> 于是就显然了。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

你会想，$u\rightarrow v$ 是否就一定等于 $u\rightarrow \text{lca}(u,v)\rightarrow v$ 呢？并不是这样，比如下面这个 case：

<center><div style="width:40%;margin:0"><img src="https://xyix.gitee.io/images/domin-1.png" style="width: 70%" alt=""></div></center>

于是，这种"能不经过 $\text{lca}(u,v)$ 就能到 $v$"的 $v$ 的祖先相当重要。更进一步，这种点的存在还直接蕴含 $\text{lca}(u,v)$ 并不支配 $v$。

经过长期的摸♂索和练♂习，一个脱胎于以上定义的重要概念被发现了——<span style="color: #1a5a40">**半支配点**</span>。

# Part 2 - 半支配点

> **定义. (半支配点)**
>
> 一个点 $u$ 的<span style="color: #1a5a40">**半支配点**</span> $\text{sdom}(u)$ 是这样的 $v$ 中 DFS 序最小的：<span style="color: #36c48e">存在一条只经过 $u$、$v$ 和 $\succ u$ 的节点的 $v\rightarrow u$ 的路径。</span>

> **引理 6. (半支配点的性质)**
>
> - $\text{sdom}(u)$ 一定是 $u$ 在 DFS 树上的一个祖先。
> - $\text{dom}(u)$ 一定是 $\text{sdom}(u)$ 在 DFS 树上的一个祖先。

<script>
    document.new_button(3);
</script>

> **引理 6 - 证明.**
>
> - 由 **引理 5**，显然。
> - 回忆 **引理 3**，而我们已经提到 $\text{sdom}(u)$ 的存在否定了它底下的那些点成为 $\text{dom}(u)$ 的可能，故得原引理。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
现在我们考虑 $\text{sdom}$ 怎么求。

# Part $\infty$ - 结语

以上我们介绍了几种练习方法，只要各位男性朋友按照步骤反复练习，一定能够取得你满意的效果！

最后，祝你~~缇乾赦晶~~身体健康，再见。

