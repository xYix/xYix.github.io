---
title: luoguP4500 题解 - [ZJOI2018]树
date: 2020-09-08 19:05:49
tags:
- 数学
- 计数
- 群论计数
- 生成函数
- $\color{red}精品$
---

[题目链接](https://www.luogu.com.cn/problem/P4500)。究极毒瘤群论计数。

<!--more-->

# 感想

这就是 ZJOI 的 D2T1 吗爱了爱了

这题实在太毒以至于我花了整整一天时间才写好这篇 blog，题解长度堪称群论计数界幽灵乐团

但这题的题面简直不能再短：求随机生成 $k$ 棵大小为 $n$ 的有标号树互相有根同构的概率。它只是难而已……

不禁令人叹息：吉老师，永远滴神

想要在合理的时间内解出这题需要你非常熟悉群论计数，有一个清晰的逻辑，可能还需要比较强的观察能力。~~然而你大概率需要解出这题才够资格宣称自己非常熟悉群论计数~~

# 开始

首先你可能需要一些群论计数的知识。

设 $f(i,j)$ 是大小为 $i$ 的树的所有等价类大小的 $jk$ 次方和。答案当然就是 $f(n,1)$。至于这个 $j$ 是一个伏笔（草）

提醒：$f(i,j)$ 可以被解释为生成 $jk$ 棵树全都彼此同构的方案数。

很显然下一步我们应该删掉根然后考虑它子树的构成。设 $tf(p,j,i)$ 是用大小不超过 $p$ 的子树拼成 $i$ 个节点，这堆子树的所有等价类大小的 $jk$ 次方和。

显然有 $f(i,j)=tf(i-1,j,i-1)$。

边界为 $tf(1,j,i)=1$。

考虑到只有大小相同的子树可能同构，不妨分别考虑 $p,p-1,p-2$。具体来说我们得到下面的东西：

# $tf(p,j,i)$

$$
\boxed{tf(p,j,i)=\sum_{pu+v=i}tf(p-1,j,v)g(p,u,j){i\choose pu}^{jk}}
$$

组合数比较好理解，简单来说就是我们从 $i$ 个标号里抽出了 $pu$ 个标号用来构成我们的这 $u$ 棵大小为 $p$ 的树。

那么这里的 $g(p,u,j)$ 表示的当然就是 $u$ 棵大小为 $p$ 的树的所有等价类大小的 $jk$ 次方之和。

讲道理至今为止其实我们没干什么东西，只不过把大小为 $p$ 的树抽出来讨论了而已。

提醒：$pu\le n$。

# $g(p,u,j)$

mark 一下，我们要求的是 $u$ 棵大小为 $p$ 的树的所有等价类大小的 $jk$ 次方之和，也可以解释为生成 $jk$ 组每组 $u$ 个大小为 $p$ 的树，每组互相同构的方案数。

冷静分析一下。假设 $n$ 个节点的树有 $m$ 个等价类，属于第 $i$ 号等价类的树有 $a_i$ 棵。那么**两个方案等价当且仅当 $\{a_i\}$ 相等**。

伟大的成就！可是每个等价类有多少方案呢？

首先考虑分配 $1...pu$ 个标号。显然方案数是

$$
\dfrac{up\choose p,p,..,p}{\prod_{i}(a_i!)}
$$

下面那个累乘是因为我们无法区分等价的树。

那么每个树内部都可以看成是以 $1..p$ 标号了。那么现在考虑它们内部的结构。答案是不是

$$
\prod_if(p,a_ij)
$$

呢？

显然不是。因为这样可能生成两组等价但是被算成两种等价类的树。假设我们把 $1...u$ 每棵树属于的等价类写成一个序列，那么我们只能考虑**无序**序列，或者一个 ``sort`` 过的代表序列。这个玩意显然不符合要求。

但上面这个东西并非没有价值。引入一些记号：我们考虑 $1...u$ 每棵树属于的等价类组成的**有序**序列，设一个有序序列为 $x$，组成的集合为 $X$。你可以理解为这是对 $u$ 棵树的**染色**。我们知道 $x$ 在 $\{a_i\}$ 的意义下同构，设它属于的等价类为 $\overline x$。我们有

$$
\boxed{g(p,u,j)=\dfrac{(up!)^{jk}}{(p!)^{ujk}}\cdot\sum_{x\in X}\left(\prod_{i}\dfrac{1}{(a_i!)^{jk}}\right)\cdot\dfrac{\omega_x}{|\overline x|}}
$$

其中 $\omega_x$ 表示可以被 $x$ 描述的树组个数的 $jk$ 次方。同属一个等价类的元素会重复计算它，所以还要除以 $|\overline x|$。

那么之前的式子是什么意思呢：它只要求 $a_1$ 个元素同色，另外 $a_2$ 个元素同色，……。而且它认为 $\{a_i\}$ **有序**（根本没人觉得它无序吧……）。我们知道要求某些东西同色可以被描述为**是某个置换的不动点**，在这里就是一个大小为 $a_1$ 的循环加一个大小为 $a_2$ 的循环……

设 $fix(A)$ 是置换 $A$ 的不动点集合，$A$ 拆成循环生成的序列是 $\{a'_i\}$，注意 $\{a'_i\}$ **有序**，因为循环之间是可以按最前面的元素的位置分出先后的（这也就和前面的 $\{a_i\}$ 有序对上了），那么我们有

$$
\boxed{\color{red}\sum_{x\in fix(A)}\omega_x=\prod_{i}f(p,a_i'j)}
$$

好了，伏笔回收。

可以看出这个东西和我们要求的 $g$ 起码算是有点关系了。那么问题就来了，系数 $\dfrac 1{|\overline x|}\prod_{i}\dfrac{1}{(a_i!)^{jk}}$ 该如何解决呢？

# 解决 $\small\dfrac 1{|\overline x|}\prod_{i}\dfrac{1}{(a_i!)^{jk}}$

既然元素可以带权，那么置换可不可以带权呢？答案当然是肯定的。

假设置换 $A$ 的权为 $w_A$，则有

$$
\sum_{A\in G}w_A{\color{red}\sum_{x\in fix(A)}\omega_x}=\sum_{x\in X}\omega_x{\color{blue}\sum_{x\in fix(A)}w_A}
$$

于是我们只需要求 $w_A$ 使得

$$
\color{blue}\sum_{x\in fix(A)}w_A=\dfrac{C}{|\overline x|}\prod_i\dfrac{1}{(a_i!)^{jk}}
$$

其中 $C$ 是一个常数，~~事实上是另一个伏笔~~。这样的话我们就有

$$
{\color{blue}C}\sum_{x\in X}{\color{blue}\left(\prod_{i}\dfrac{1}{(a_i!)^{jk}}\right)}\cdot\dfrac{\omega_x}{\color{blue}|\overline x|}=\sum_Aw_A{\color{red}\prod_{i}f(p,a_i'j)}
$$

$$
\boxed{C\dfrac{g(p,u,j)(p!)^{ujk}}{(up!)^{jk}}=\sum_Aw_A\prod_{i}f(p,a_i'j)}
$$

伟大的成就！（震声）

注意到 $w_A$ 后面接的连乘号，我们自然也希望

$$
w_A=\prod_i \hat w(a'_i)
$$

你可能已经猜到 $\text{Exp}$ 了。具体如下。先假装我们会求 $\hat w(a'_i)$。

# 回到 $g(p,u,j)$

换掉 $w_A$，有更近一步的

$$
\begin{aligned}&\sum_{x\in X}\left(\prod_{i}\dfrac{1}{(a_i!)^{jk}}\right)\cdot\dfrac{\omega_x}{|\overline x|}\\=&\dfrac{1}{C}\sum_A\prod_{i}\hat w(a_i)f(p,a_ij)\end{aligned}
$$

考虑一个 $\{a_i\}$ 序列能代表几个置换。（由于对之前的 $a_i$ 的讨论已经停止了，我们从这里开始对 $a'_i$ 去掉 $'$ 号应该不至于混淆。)先决定标号从属于哪个循环，然后循环内可以圆排列，但是这样会使循环原本的次序错乱所以还要除以循环数的阶乘。

$$
=\dfrac{1}{C}\sum_{l,\sum a_i=u}{u\choose a_1,a_2,...,a_l}\left(\prod_{i=1}^l(a_i-1)!\right)\dfrac{\prod_{i=1}^l\hat w(a_i)f(p,a_ij)}{l!}
$$

$$
=\dfrac{u!}{C}\sum_{l,\sum a_i=u}\dfrac 1{l!}\prod_{i=1}^l\dfrac{\hat w(a_i)f(p,a_ij)}{a_i}
$$

审视一下这个形式。$\sum a_i=u$ 已经刻到 DNA 里了。设

$$
F(x)=\sum_{i=1}^{\infty}\dfrac{\hat w(i)f(p,ij)x^i}{i}
$$

那么我们得到

$$
=\dfrac{u!}{C}[x^u]e^{F(x)}
$$

也就是

$$
\boxed{g(p,u,j)=\dfrac{(up!)^{jk}}{(p!)^{ujk}}\dfrac{u!}{C}[x^u]e^{F(x)}}
$$

现在只剩 $\hat w(a_i')$ 的问题了。

# $\hat w(a'_i)$

我们希望满足的是

$$
\sum_{x\in fix(A)}\prod_{i}\hat w(a'_i)=\dfrac{C}{|\overline x|}\prod_i\dfrac{1}{(a_i!)^{jk}}
$$

展开 $|\overline{x}|$。

$$
\sum_{x\in fix(A)}\prod_{i}\hat w(a'_i)=C\prod_{i}\dfrac{1}{(a_i!)^{jk}}{u\choose a_1,a_2,...,a_m}^{-1}
$$

考虑 $x\in fix(A)$ 的 $A$。显然 $A$ 没有跨颜色块的循环。那么我们故技重施拆解颜色块，等式左边就等于

$$
=\prod_{i=1}^m\sum_{l,\sum b_j=a_i}{a_i\choose b_1,b_2,...,b_l}\left(\prod_{j=1}^l(b_j-1)!\right)\dfrac {\prod_{j=1}^l\hat w(b_j)}{l!}
$$

$$
=\prod_{i=1}^ma_i!\cdot \sum_{l,\sum b_j=a_i}\dfrac 1{l!}\prod_{j=1}^l\dfrac{\hat w(b_j)}{b_j}
$$

设 

$$
G(x)=\sum_{i=1}^{\infty}\dfrac{\hat w(i)x^i}{i}
$$

即

$$
\prod_{i=1}^m[x^{a_i}]e^{G(x)}=\dfrac{C}{u!}\prod_{i}\dfrac{1}{(a_i!)^{jk}}
$$

取 $C=u!$（伏笔回收），那么有

$$
\boxed{[x^i]e^{G(x)}=\dfrac{1}{(i!)^{jk}}}
$$

完 全 胜 利

# 暴力 Ln 和 Exp

MTT Exp……想想都恐怖……还是暴力吧

考虑

$$
\text{Ln} F=G
$$

$$
\dfrac{F'}{F}=G'
$$

$$
F'-FG'=0
$$

$$
(n+1)f_{n+1}-\sum_{i=1}^{n+1}if_{n+1-i}g_i=0
$$

$$
\boxed{f_n=\dfrac{1}{n}\sum_{i=1}^nif_{n-i}g_i}
$$

$$
\boxed{g_n=f_n-\dfrac 1 n\sum_{i=1}^{n-1}if_{n-i}g_i}
$$

# 复杂度分析

对于 $g(p,u,j)$，会计算$f(p,j),...,f(p,uj)$；

对于 $f(i,j)$，会计算 $g(p,u,j)(up\le i)$

而我们从 $f(n,1)$ 出发，也就是说会 DP 到的 $f,g$，其下标之积 $\le n$

但是 $tf$ 则是二，三维之积 $\le n$，第一维小于等于第三维，转移和第三维除以第一维有关……

容易发现 Exp 所用复杂度为 $\sum_{i}\sum_{j}\dfrac{n^2}{i^2j^2}=\Theta(n^2)$（著名的巴塞尔问题），Ln 所用时间复杂度为 $\sum_{i}\dfrac{n^2}{i^2}=\Theta(n^2)$，而 DP 所用时间复杂度为 $\sum_{j}\sum_{p=1}^{n/j}\sum_{i=1}^{p}\dfrac{p}{i}=\Theta(n^2\log n)$。

如果实现比较辣鸡可能会多出一个求逆元的 $\log$。

# 式子速查

$f(i,j)=tf(i-1,j,i-1)$

$tf(1,j,i)=1$

$$
\boxed{tf(p,j,i)=\sum_{pu+v=i}tf(p-1,j,v)g(p,u,j){i\choose pu}^{jk}}
$$

$$
G(x)=\sum_{i=1}^{\infty}\dfrac{\hat w(i)x^i}{i}
$$

$$
\boxed{[x^i]e^{G(x)}=\dfrac{1}{(i!)^{jk}}}
$$

$$
F(x)=\sum_{i=1}^{\infty}\dfrac{\hat w(i)f(p,ij)x^i}{i}
$$

$$
\boxed{g(p,u,j)=\dfrac{(up!)^{jk}}{(p!)^{ujk}}[x^u]e^{F(x)}}
$$

# 代码实现

直接抄式子不优化，喜提最劣解

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxN=2005;int p;
int N,K;
void inline check(int &x){x-=p,x+=x>>31&p;}
int qpow(int a,int k){
	int ans=1;
	while(k){
		if(k&1) ans=1LL*ans*a%p;
		a=1LL*a*a%p;
		k>>=1;
	}
	return ans;
}

int inv[maxN],fac[maxN],ifac[maxN];
int Fac[maxN][maxN],iFac[maxN][maxN];
void init(){
	inv[1]=fac[0]=ifac[0]=fac[1]=ifac[1]=1;
	for(int i=2;i<maxN;i++)
		inv[i]=1LL*(p-p/i)*inv[p%i]%p,
		fac[i]=1LL*fac[i-1]*i%p,
		ifac[i]=1LL*ifac[i-1]*inv[i]%p;
	for(int i=0;i<maxN;i++)
		Fac[i][0]=iFac[i][0]=1,
		Fac[i][1]=qpow(fac[i],K),iFac[i][1]=qpow(ifac[i],K);
	for(int i=0;i<maxN;i++)
	for(int j=2;j<maxN;j++)
		Fac[i][j]=1LL*Fac[i][j-1]*Fac[i][1]%p,
		iFac[i][j]=1LL*iFac[i][j-1]*iFac[i][1]%p; 
}

void Ln(int f[],int g[],int n){
	g[0]=0;
	for(int i=1;i<=n;i++){
		g[i]=f[i];
		for(int j=1;j<i;j++)
			check(g[i]+=p-1LL*j*f[i-j]%p*g[j]%p*inv[i]%p);
	}
}
void Exp(int g[],int f[],int n){
	f[0]=1;
	for(int i=1;i<=n;i++){
		f[i]=0;
		for(int j=1;j<=i;j++)
			check(f[i]+=1LL*j*f[i-j]%p*g[j]%p);
		f[i]=1LL*f[i]*inv[i]%p;
	}
}

int tmp[maxN];
int hatw[maxN][maxN];
int F[maxN][maxN];
int tF[maxN][maxN]; //tF[j][i]=tf(i,j,i)
int ttF[maxN][maxN];
int G[maxN][maxN]; //G[j][u]=g(i,u,j)

int main(){
	scanf("%d%d%d",&N,&K,&p);init();
	for(int j=1;j<=N;j++){
		for(int u=0;u<=N/j;u++)
			tmp[u]=iFac[u][j];
		Ln(tmp,hatw[j],N/j);
	}
	for(int P=1;P<=N;P++){
		if(P==1) for(int j=1;j<=N;j++) F[P][j]=1;
		else for(int j=1;j<=N/P;j++) F[P][j]=tF[j][P-1];
		if(P==1) for(int j=1;j<=N;j++) for(int k=0;k<=N/j;k++) tF[j][k]=1;
		else{
			for(int j=1;j<=N/P;j++){
				for(int u=1;u<=N/P/j;u++) tmp[u]=1LL*hatw[j][u]*F[P][u*j]%p;
				Exp(tmp,G[j],N/P/j);
				for(int u=1;u<=N/P/j;u++) G[j][u]=1LL*G[j][u]*iFac[P][u*j]%p;
				for(int i=0;i<=N/j;i++) ttF[j][i]=tF[j][i];
				for(int i=1;i<=N/j;i++)
				for(int u=1;u<=i/P;u++)
					check(ttF[j][i]+=1LL*tF[j][i-u*P]*G[j][u]%p*Fac[i][j]%p*iFac[i-u*P][j]%p);
				swap(ttF[j],tF[j]);
			}
		}
	}
	printf("%d\n",1LL*F[N][1]*iFac[N-1][1]%p);
}
```

# 彩蛋

败了呀。

![](/images/qiyangak.png)