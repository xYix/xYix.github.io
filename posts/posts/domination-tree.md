---
title: 男性增加支配树题分数的技巧
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

男性的图论经验和图论技巧是不可能与生俱来的，无论你的观察能力是如何的健♂壮，你没有学会<span style="color: #1a5a40">**支配树**</span>，在[支配树相关题目](https://www.luogu.com.cn/problem/P7520)（好吧其实不相关）中就会紧张，就会不知所措，就会被水淹没；而你学会了支配树，在支配树相关题目中你就能轻松自如，如[鱼](https://yhx-12243.github.io/OI-transit/)得水。

下面，我们详细介绍关于男性掌握增加支配树题分数的技巧必需具备的几个结论。

# Part 1 - 什么是支配树

> 学会支配树有许多条件，有一个不大不小的有向图 $G$，有一个不复杂不简单的支配关系，首先你用大眼观察盯着有向图，用手推结论，经过一段时间的练习，你就学会了支配关系的性质。

现在有一个有向图 $G$。

首先定义<span style="color: #1a5a40">**支配关系**</span>。

<span style="color: #36c48e">如果 $1$ 到 $u$ 的路径都必须经过 $v$，那么说 $v$ 支配 $u$。</span>

> **引理 0.**
>
> 把上面定义的路径换为<span style="color: #36c48e">"简单路径"</span>，得到的新定义和原定义是等价的。

<script>
    document.new_button(3);
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

首先在原图上引入一个以 $1$ 为根的 DFS 树。

- 记 DFS 树上从 $u$ 到 $v$ 的路径（其中 $u$ 是一个 $v$ 的祖先）为 $u\Rightarrow v$。
- 这个 DFS 树会引出一个 DFS 序，下面我们把 $\text{dfn}(u)<\text{dfn}(v)$ 记为 $u\prec v$。

> **引理 3.**
>
> $\text{dom}(u)$ 一定是 $u$ 在 DFS 树上的祖先。

<script>
    document.new_button(3);
</script>

> **引理 3 - 证明.**
>
> 因为我们实际上已经找到一条 $1\rightarrow u$ 的路径 $1\Rightarrow u$，$\text{dom}(u)$ 只能在其中排除而不能增加。

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

经过长期的摸♂索和练♂习，一个脱胎于以上定义的重要概念被（Lengauer 和 Tarjan）发现了——<span style="color: #1a5a40">**半支配点**</span>。

# Part 2 - 半支配点

> 接着你把身体趴在支配树上（？），用手玩半支配点，一段时间的练习，你又学会了半支配点的性质。

> **定义. (半支配点)**
>
> 一个点 $u$ 的<span style="color: #1a5a40">**半支配点**</span> $\text{sdom}(u)$ 是这样的 $v$ 中 DFS 序最小的：<span style="color: #36c48e">存在一条只经过 $u$、$v$ 和 $\succ u$ 的节点的 $v\rightarrow u$ 的路径。</span>

> **引理 6. (半支配点的性质)**
>
> - $\text{sdom}(u)$ 一定是 $u$ 在 DFS 树上的一个祖先。
> - $\text{dom}(u)$ 一定是 $\text{sdom}(u)$ 在 DFS 树上的一个祖先。

<script>
    document.new_button(4);
</script>
> **引理 6 - 证明.**
>
> - 由 **引理 5**，显然。
> - 回忆 **引理 3**，而我们已经提到 $\text{sdom}(u)$ 的存在否定了它底下的那些点成为 $\text{dom}(u)$ 的可能，故得原引理。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>
> <span style="color: #1a5a40">**定理 2. (dom 和 sdom)**</span>
>
> <span style="color: #36c48e">从 $\text{sdom}(u)\Rightarrow u/\{\text{sdom}(u)\}$ 中找到使得 $\text{sdom}(v)$ 在 DFS 序意义下最小的 $v$。</span>
>
> - <span style="color: #36c48e">若 $\text{sdom}(u)=\text{sdom}(v)$，那么 $\text{dom}(u)=\text{sdom}(u)$；</span>
> - <span style="color: #36c48e">否则 $\text{dom}(u)=\text{dom}(v)$。</span>

<script>
    document.new_button(2);
</script>

> **定理 2 - 证明.**
>
> - 第一条。
>
> 我们只需要证明 <span style="color :#36c48e">$\text{sdom}(u)$ 支配了 $u$</span>。
>
> 假设不然，也就是说存在一条 $1\rightarrow u$ 的路径不经过 $\text{sdom}(u)$。
>
> 如果这条路径从未接触过 $\text{sdom}(u)\Rightarrow u/\{u,\text{sdom}(u)\}$，那么考虑这条路径上最后一个在 $1\Rightarrow u$ 上的点 $w$。$w\rightarrow u$ 的路径必定只经过了 $\succ u$ 的点，否则根据 **引理 5** $w$ 必定不是最后一个。既然如此，$w$ 为什么不自己当 $\text{sdom}(u)$ 呢？
>
> 否则这条路径接触过 $\text{sdom}(u)\Rightarrow u/\{u,\text{sdom}(u)\}$。我们故技重施，很容易可以证明这与 $\text{sdom}(u)=\text{sdom}(v)$ 矛盾。
>
> - 第二条。
>
> 现在 $\text{dom}(v)$ 高于 $\text{sdom}(v)$ 严格高于 $\text{sdom}(u)$ 严格高于 $v$ 严格高于 $u$。
>
> 根据 **引理 4**，$\text{dom}(u)$ 必定是 $\text{dom}(v)$ 的祖先。我们只需要证明 <span style="color: #36c48e">$\text{dom}(v)$ 支配了 $u$</span>。
>
> 实际上就是故技重施，仍是假设存在一条 $1\rightarrow u$ 的路径不经过 $\text{dom}(v)$。
>
> 如果这条路径从未接触过 $\text{sdom}(u)\Rightarrow u/\{u\}$，那么根据上面的论述可以推出矛盾；
>
> 否则它必定接触过 $\text{sdom}(u)\Rightarrow u/\{u\}$。而它显然没有接触过 $\text{sdom}(u)$，否则 $\text{sdom}(u)$ 直接走到 $v$，$\text{dom}(v)$ 就支配不了 $v$ 了；而对于剩下的那些，它接触哪个都会导致 $v$ 作为"$\text{sdom}$ 在 DFS 序意义下最小"的头衔被抢。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

那么现在只剩一个问题，怎么求 $\text{sdom}$？

# Part 3 - 怎么求半支配点

> 最后你推开支配树，在 DFS 树中你的支配点和半支配点不断地划动（？），经过一段时间的摸索和练习，忽然你觉得你会求半支配点了，支配点也抬出了水面（？），从此你也就学会了支配树。

对于 $\text{sdom}(u)$，我们自然要考虑所有 $(v,u)$。仍然是经过摸♂索和练♂习，Lengauer 和 Tarjan 发现结论如下：

> <span style="color: #1a5a40">**定理 3. (sdom 的求法)**</span>
>
> $$
> \color{#36c48e}\text{sdom}(u)=\min_{\prec}\{v|(v,u),v\prec u\}\cup\{\text{sdom}(w)|w\succ u,w\Rightarrow v,(v,u),v\succ u\}
> $$

<script>
    document.new_button(3);
</script>

> **定理 3 - 证明.**
>
> 对于 $v\prec u$ 的那一部分直接搬了半支配点的定义。
>
> 对于 $v\succ u$ 的一部分：很明显是枚举了"半支配路径"的一个子集。
>
> 注意到 $w\Rightarrow v$ 是树边，$(v,u)$ 是横杈边/返祖边。没有下指边，这很合理，能走下指边就一定能走对应树边。
>
> 不过，为什么 $w$ 之前的部分要求 $\succ w$ 而不是 $\succ u$？
>
> 不妨设 $w$ 是从 $(x,w)$ 来的，显然 $x>w$。那么是否可能存在 $y\Rightarrow x$ 且 $u<y<w$ 呢？
>
> - $y$ 是 $w$ 的祖先。那为什么不直接走 $y\Rightarrow w$？即，这样的 $y\Rightarrow x\rightarrow w\Rightarrow v\rightarrow u$ 是没有考虑价值的。
> - $y$ 不是 $w$ 的祖先。然而注意到 $y$ 是 $x$ 的祖先且 $x>w$，这种情况不可能发生。
>
> 故得证。

<script>
    document.getElementsByTagName("blockquote")[document.last_block].style.display="none";
</script>

是的，它的证明很显然，但我该怎么想到证这个？

——我怎么知道……

# Part 4 - 代码实现

**定理 2** 和 **定理 3** 所需信息的维护可以通过 DFS 序和带权并查集的精细配合实现。

此处不作进一步具体解释，因为一看就懂，代码如下。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 500005;
vector<int> G[maxn], rG[maxn];

int n, m;
int dfn[maxn], rev[maxn], idx;
int T_fa[maxn];
void get_dfn(int x) {
	rev[dfn[x] = ++idx] = x;
	for (int y : G[x])
		if (!dfn[y]) get_dfn(y), T_fa[y] = x;
}

int dom[maxn], sdom[maxn], dfn_sdom[maxn];

int dsu_fa[maxn], dsu_val[maxn];
int find(int x) {
	if (dsu_fa[x] == x) return x;
	int fx = find(dsu_fa[x]);
	if (dfn_sdom[dsu_val[dsu_fa[x]]] < dfn_sdom[dsu_val[x]])
		dsu_val[x] = dsu_val[dsu_fa[x]];
	return dsu_fa[x] = fx;
}

vector<int> r_sdom[maxn];

void solve() {
	for (int i_ = n; ; i_--) {
		int x = rev[i_];
		for (int y : r_sdom[x]) {
			find(y);
			if (sdom[dsu_val[y]] == x) dom[y] = x;
			else dom[y] = -dsu_val[y]; //实际上应是 dom[dsu_val[y]], - 作为标记
		}

		if (x == 1) break;

		int &qaq = (dfn_sdom[x] = n);
		for (int y : rG[x])
			if (dfn[y] < dfn[x])
				qaq = min(qaq, dfn[y]);
			else find(y), qaq = min(qaq, dfn_sdom[dsu_val[y]]);
		r_sdom[sdom[x] = rev[qaq]].push_back(x);
		dsu_fa[x] = T_fa[x];
	}

	for (int i_ = 2; i_ <= n; i_++) {
		int x = rev[i_];
		if (dom[x] < 0) dom[x] = dom[-dom[x]]; //伏笔回收
	}
}

int main() {
	scanf("%d%d", &n, &m);
	while (m--) {
		int u, v; scanf("%d%d", &u, &v);
		G[u].push_back(v); rG[v].push_back(u);
	}
	get_dfn(1);
	for (int i = 1; i <= n; i++)
		dsu_fa[i] = dsu_val[i] = i, dfn_sdom[i] = dfn[i];
	solve();
	for (int i = 2; i <= n; i++) printf("%d ", dom[i]);
}
```

# Part 5 - 结语

以上我们介绍了支配树的求法，只要各位男性朋友按照步骤反复练习，一定能够取得你满意的效果！

最后，祝你~~缇乾赦晶~~身体健康，再见。

