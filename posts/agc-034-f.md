---
title: AGC034F 题解 - RNG and XOR
date: 2020-09-25 20:55:31
tags:
- 集合幂级数
---

[题目链接](https://atcoder.jp/contests/agc034/tasks/agc034_f)，[题目翻译](https://www.luogu.com.cn/problem/AT4996)

<!--more-->

看起来很像 ZJOI2019 开关，可惜这题被大大强化，看来还是逃不过集合幂级数了。

~~天道好轮回，毒瘤饶过谁~~

显然有方程组

$$
E_i=\begin{cases}1+\sum_{j}p_{i\oplus j}E_j&(i\neq\varnothing)\\0&(i=\varnothing)\end{cases}
$$

写成集合幂级数就是

$$
\mathbf E=\sum_{s}x^s+\mathbf{p}\times\mathbf E+cx^{\varnothing}
$$

$c$ 暂且不知道是什么。$\text{FWT}$ 得

$$
\text{FWT}(\textbf E)_i=\text{FWT}\left(\sum_{s} x^s\right)_i+\text{FWT}(\mathbf p)_i\cdot\text{FWT}(\mathbf E)_i+\text{FWT}(cx^{\varnothing})_i
$$

先研究 $i=\varnothing$。显然 $\text{FWT}(\mathbf p)_{\varnothing}=1,\text{FWT}(\sum_sx^s)_{\varnothing}=2^n$，于是

$$
c=-2^n
$$

从而对于 $i\neq \varnothing$，

$$
\text{FWT}(\mathbf E)_i=\dfrac{\text{FWT}(\sum_sx^s)_i-2^n}{1-\text{FWT}(\mathbf p)_i}
$$

从而我们可以得出所有的 $\text{FWT}(\mathbf E)_i,i\neq \varnothing$。但是 $\text{FWT}(\mathbf E)_{\varnothing}$ 是多少？不妨设它为 $e$。如果我们假装 $\text{FWT}(\mathbf E)_{\varnothing}=0$ 做 $\text{FWT}^{-1}$，那么有

$$
\mathbf{E}_i'+\dfrac{e}{2^n}=\mathbf E_i
$$

从而我们知道 $e=-2^n\mathbf{E}'_{\varnothing},\mathbf E_i=\mathbf E'_i-\mathbf E'_{\varnothing}$。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p=998244353,maxN=262144*2,maxK=20,g=3,ig=332748118,inv2=(p+1)/2;
int calc(int n){
	int x=1;while(x<n) x<<=1;
	return x;
}
struct Z{
	int x;
	Z(int x0=0):x(x0){}
}; 
int inline check(int x){return x>=p?x-p:x;}
Z operator +(const Z a,const Z b){return check(a.x+b.x);}
Z operator -(const Z a,const Z b){return check(a.x-b.x+p);}
Z operator *(const Z a,const Z b){return 1LL*a.x*b.x%p;}
Z operator -(const Z a){return check(p-a.x);}
Z& operator +=(Z &a,const Z b){return a=a+b;}
Z& operator -=(Z &a,const Z b){return a=a-b;}
Z& operator *=(Z &a,const Z b){return a=a*b;}
Z fac[maxN],ifac[maxN],inv[maxN];
Z qpow(Z a,int k){
    Z ans=1;
    while(k){
        if(k&1) ans*=a;
        a*=a;
        k>>=1;
    }
    return ans;
}
void init(){
    fac[0]=ifac[0]=fac[1]=ifac[1]=inv[1]=1;
    for(int i=2;i<maxN;i++)
    	fac[i]=fac[i-1]*i,
    	inv[i]=(p-p/i)*inv[p%i],
    	ifac[i]=ifac[i-1]*inv[i];
}

int M,N;Z P[1<<18],SP,E[1<<18];
void FWT(Z d[],bool flg){
	for(int n=1;n<N;n*=2)
	for(Z *j=d;j<d+N;j+=n*2)
	for(Z *k0=j,*k1=j+n,tmp;k0<j+n;k0++,k1++)
		tmp=*k1,*k1=*k0-*k1,*k0+=tmp;
	if(flg){
		Z invN=qpow(N,p-2);
		for(Z *k=d;k<d+N;k++) *k*=invN;
	}
}

int main(){
	init();
	scanf("%d",&M);N=1<<M;
	for(int i=0;i<N;i++) scanf("%d",&P[i].x),SP+=P[i];
	SP=qpow(SP,p-2);
	for(int i=0;i<N;i++) P[i]*=SP,E[i]=1;
	FWT(P,0);FWT(E,0);
	for(int i=1;i<N;i++) E[i]=(E[i]-N)*qpow(1-P[i],p-2);E[0]=0;
	FWT(E,1);
	for(int i=0;i<N;i++) printf("%d\n",E[i]-E[0]);
}
```

# 彩蛋

我什么时候写的这题？？？

![](https://xyix.github.io/images/wtf.png)