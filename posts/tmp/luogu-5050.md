---
title: 多点求值的新做法
date: 2020-09-22 15:13:16
tags:
- 多项式
---

[题目链接](https://www.luogu.com.cn/problem/P5050)。终于不需要恐怖的多项式取模了。

<!--more-->

首先可以把多项式 $F$ 写成一个列向量

$$\mathbf f=\begin{pmatrix}f_0\\f_1\\\vdots\\f_{n-1}\end{pmatrix}$$

那么多点求值就是一个范德蒙德矩阵 $\mathbf A$ 乘它：

$$\begin{pmatrix}1&a_0&a_0^2&\dots&a_0^{n-1}\\1&a_1&a_1^2&\dots&a_1^{n-1}\\\vdots&\vdots&\vdots&\ddots&\vdots\\1&a_{n-1}&a_{n-1}^2&\dots&a_{n-1}^{n-1}\end{pmatrix}\mathbf f$$

而 $\mathbf A^T\mathbf f$ 不算难求，它是

$$ans_d=\sum_{i=0}^{n-1}f_ia_i^d$$

也就是

$$[x^d]\sum_{i=0}^{n-1}\dfrac{f_i}{1-a_ix}$$

这有一个 $\Theta(n\log^2 n)$ 做法，分治合并求解，设左边分子分母为 $(u_L,v_L)$，右边分子分母为 $(u_R,v_R)$，则合并后为 $(u_Lv_R+u_Rv_L,v_Lv_R)$。不妨把准确的过程写出来：

- 预处理所有的 $v$

- $\text{Solve(x):=}$

- $\quad\text{if len=1 return }f_i$

- $\quad\text{Solve(L),Solve(R)}$

- $\quad\text{return }u_Lv_R+u_Rv_L$

- $\text{return }\text{Solve}([0,n-1])\times v_{[0,n-1]}^{-1}$

那么根据某神奇的特勒根原理（Tellegen's Principle），只要我们能计算 $\mathbf {Af}$ 就能构造出一种计算 $\mathbf A^T\mathbf f$ 的方法，而且加法/乘法次数完全一样，具体构造方式如下：

- 把 $\mathbf A$ 拆成一系列初等变换 $\prod_{i=1}^m \mathbf E_i$

- 那么 $\mathbf A^T$ 就是 $\prod_{i=1}^m\mathbf E_{m-i+1}^T$

其中初等变换是指把 $f_j\leftarrow f_j+cf_i$。显然它的转置就是 $f_i\leftarrow f_i+cf_j$。

只要你不嫌麻烦就可以把这个分治 FFT 的所有加法乘法全部离线下来，然后转置并反向操作。但是显然这是非常憨批的。

首先考虑卷积的转置是什么。原来把 $f_{i+j}+=f_iv_j$，那么转置后就变成 $f_{i-j}+=f_iv_j$。也就是逆向卷积。记为 $\times^T$。

然后观察原来的分治过程。

<div style="width:70%;margin:auto"><img src="https://xyix.github.io/images/polypolyeval.png" alt=""></div>

请注意第二/三层之间的那组箭头**不是** $4\times 4$ 的。

它的转置应该能想象得出来了吧……

有趣的是：关于逆向卷积，可以直接翻转 $v$ 然后按原来的长度循环卷积，因为溢出的部分刚好不需要。

最后叶子处挨个拼成的向量就是所求点值。

核心代码：

```cpp
namespace MultiEval{
	Poly F,A;
	Poly V[maxN<<2],G[maxN<<2];
	Poly ans;
	void Get_V(int x,int l,int r){
		if(l==r){V[x].push_back(1);V[x].push_back(-A[l]);return;}
		int mid=(l+r)>>1;
		Get_V(x<<1,l,mid);Get_V(x<<1|1,mid+1,r);
		V[x]=Conv(V[x<<1],V[x<<1|1],r-l+2);
	}
	void clear(int x,int l,int r){
		V[x].clear();G[x].clear();
		if(l==r) return;
		int mid=(l+r)>>1;clear(x<<1,l,mid);clear(x<<1|1,mid+1,r);
	}
	void Get_G(int x,int l,int r){
		if(l==r){ans.push_back(G[x][0]);return;}
		int mid=(l+r)>>1,N0=(r-l+1)>>1;
		reverse(V[x<<1|1].begin(),V[x<<1|1].end()); //0->N0
		V[x<<1|1]=Conv(V[x<<1|1],G[x],N0<<1);
		G[x<<1].resize(N0);copy(V[x<<1|1].begin()+N0,V[x<<1|1].end(),G[x<<1].begin()); //[0,N0-1]
		reverse(V[x<<1].begin(),V[x<<1].end()); 	//0->N0
		V[x<<1]=Conv(V[x<<1],G[x],N0<<1);
		G[x<<1|1].resize(N0);copy(V[x<<1].begin()+N0,V[x<<1].end(),G[x<<1|1].begin()); //[N0,2N0-1]
		Get_G(x<<1,l,mid);Get_G(x<<1|1,mid+1,r);
	}
	Poly Solve(Poly dF,Poly dA){
		int N0=calc(max(dF.size(),dA.size()+1)); //占位符 
		F=dF,A=dA;F.resize(N0);A.resize(N0);
		Get_V(1,0,N0-1);
		Poly invSV=Inv(V[1],N0);
		reverse(invSV.begin(),invSV.end()); //0->N0-1
		invSV=Conv(invSV,F,N0<<1);G[1].resize(N0);
		copy(invSV.begin()+N0-1,invSV.end()-1,G[1].begin());
		Get_G(1,0,N0-1);
		clear(1,0,N0-1);
		Poly tans=ans;ans.clear();tans.resize(A.size());A.clear();F.clear();
		return tans;
	}
}
```