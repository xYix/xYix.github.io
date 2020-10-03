---
title: 多项式快速插值
date: 2020-09-22 20:36:42
tags:
- 多项式
---

果然这种东西不推一遍是绝对记不住的

<!--more-->

首先我们观察一下拉格朗日插值

$$f(x)=\sum_{i=0}^{n-1}y_i\dfrac{\prod_{j\neq i}x-x_j}{\prod_{j\neq i}x_i-x_j}$$

很显然 $\prod_{j\neq i}x_i-x_j$ 形式非常工整，看起来就很好求，具体来说就是求

$$\dfrac{\prod_{j}x-x_j}{x-x_i}$$

在 $x_i$ 处的点值。这个东西虽然是 $0/0$，但是可以洛必达啊，下面的东西求导完就是 1，所以要求的就是

$$\frac{\text{d}}{\text{d}x}\prod_{j}x-x_j$$

的在 $x_0,x_1,...,x_{n-1}$ 的点值，多点求值即可。不妨记 $\dfrac{y_i}{\prod_{j\neq i}x_i-x_j}$ 为 $Y_i$。

于是要求的就是

$$\sum_{i=0}^{n-1}Y_i\prod_{j\neq i}x-x_j$$

考虑分治，记 $\sum_{i\in s}Y_i\prod_{j\in s,j\neq i}x-x_j$ 为 $u_s$，$\prod_{j\in s}x-x_j$ 为 $v_s$，则

$$u=u_Lv_R+u_Rv_L$$

$$v=v_Lv_R$$

看着和多点求值的转置很像，不知道是不是某种对它们的对偶性的暗示呢……？

核心代码：

```cpp
namespace Intpo{
	Poly X,Y;
	Poly V[maxN<<2],U[maxN<<2];
	void Get_V(int x,int l,int r){
		if(l==r){V[x].push_back(-X[l]);V[x].push_back(1);return;}
		int mid=(l+r)>>1;
		Get_V(x<<1,l,mid);Get_V(x<<1|1,mid+1,r);
		V[x]=Conv(V[x<<1],V[x<<1|1],r-l+2);
	}
	void Get_U(int x,int l,int r){
		if(l==r){U[x].push_back(Y[l]);return;}
		int mid=(l+r)>>1;
		Get_U(x<<1,l,mid);Get_U(x<<1|1,mid+1,r);
		U[x]=Add(Conv(U[x<<1],V[x<<1|1],r-l+2),Conv(U[x<<1|1],V[x<<1],r-l+2));
	}
	void clear(int x,int l,int r){
		V[x].clear();U[x].clear();
		if(l==r) return;
		int mid=(l+r)>>1;clear(x<<1,l,mid);clear(x<<1|1,mid+1,r);
	}
	Poly Solve(Poly dX,Poly dY){
		int N0=dX.size();
		X=dX,Y=dY;X.resize(N0);Y.resize(N0);
		Get_V(1,0,N0-1);
		Poly derSV=Der(V[1],N0+1);derSV.resize(N0);
		Poly nY=MultiEval::Solve(derSV,X);
		for(int i=0;i<N0;i++) Y[i]=Y[i]*qpow(nY[i],p-2);
		Get_U(1,0,N0-1);
		Poly ans=U[1];ans.resize(dX.size());
		clear(1,0,N0-1);X.clear();Y.clear();
		return ans;
	}
}
```