---
title: AGC038E 题解 - Gachapon
date: 2020-09-04 18:47:28
tags:
- 数学
- 生成函数
- 概率期望
- 计数
---

[题目链接](https://atcoder.jp/contests/agc038/tasks/agc038_e)，[题目翻译](https://www.luogu.com.cn/problem/AT5202)

<!--more-->

虽然这个容斥非常诱人，但是不管容斥硬上也是可以的。

考虑

$$
\begin{aligned}P(X\le n)&=n![x^n]\prod_{i=0}^{N-1}\sum_{j=B_i}\dfrac{(\dfrac{A_i}{S}x)^j}{j!}\\&=n![x^n]\prod_{i}\left(e^{\frac{A_i}{S}x}-\sum_{j=0}^{B_i-1}\dfrac{(\dfrac{A_i}{S}x)^j}{j!}\right)\end{aligned}
$$

可以观察到它应该有这样的形式

$$
n![x^n]\sum_{i=0}^SP_i(x)e^{\frac{i}{S}x}
$$

显然 $P$ 是可以大力 DP 得出的。

答案应该是

$$
\begin{aligned}\sum_{n=0}^{\infty}P(X>n)&=\sum_{n=0}^{\infty}1-n![x^n]\sum_{i=0}^SP_i(x)e^{\frac{i}{S}x}\\&=-\sum_{n=0}^{\infty}n![x^n]\sum_{i=0}^{S-1}P_i(x)e^{\frac{i}{S}x}\end{aligned}
$$

是时候拆掉 $[x^n]$ 了。设 $P_{i,j}=[x^j]P_i(x),T=\sum B$。

$$
-\sum_{n=0}^{\infty}n!\sum_{i=0}^{S-1}\sum_{j=0}^TP_{i,j}\dfrac{i^{n-j}}{S^{n-j}(n-j)!}
$$

$$
\boxed{-\sum_{i=0}^{S-1}\sum_{j=0}^TP_{i,j}\left(\dfrac{i}{S}\right)^{-j}\sum_{n=0}^{\infty}\left(\dfrac{i}{S}\right)^n\dfrac{n!}{(n-j)!}}
$$

设后面那个东西是 $j!F_j(\dfrac{i}{S})$，也就是说

$$
\begin{aligned}F_j(x)&=\sum_{i=0}^{\infty}{i\choose j}x^i\\&={0\choose j}+\sum_{i=1}^{\infty}\left({i-1\choose j}+{i-1\choose j-1}\right)x^i\\&=xF_j(x)+xF_{j-1}(x)\end{aligned}
$$

$$
\boxed{F_j(x)=\dfrac{x}{1-x}F_{j-1}(x)}
$$

显然有 $F_0(x)=\dfrac{1}{1-x}$，递推即可。

注意特判 $x=0$。

代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p=998244353;
int qpow(int a,int k){
	int ans=1;
	while(k){
		if(k&1) ans=1LL*ans*a%p;
		a=1LL*a*a%p;
		k>>=1;
	}
	return ans;
}

int N;
int fac[405],ifac[405],inv[405];
int A[405],S,iS,B[405],T; 

int P[405][405];int G[405];

int main(){
	fac[0]=fac[1]=ifac[0]=ifac[1]=inv[1]=1;
	for(int i=2;i<=400;i++)
		inv[i]=1LL*(p-p/i)*inv[p%i]%p,
		fac[i]=1LL*fac[i-1]*i%p,
		ifac[i]=1LL*ifac[i-1]*inv[i]%p;
	scanf("%d",&N);
	for(int i=0;i<N;i++) scanf("%d%d",&A[i],&B[i]),S+=A[i],T+=B[i]-1;
	iS=qpow(S,p-2);
	
	P[0][0]=1;int tS=0,tT=0;
	for(int i=0;i<N;i++){
		for(int j=0,mul=1;j<=B[i]-1;j++) G[j]=1LL*mul*ifac[j]%p,mul=1LL*mul*A[i]%p*iS%p;
		tS+=A[i];tT+=B[i]-1;
		for(int j=tS;j>=0;j--){
			for(int k=tT;k>=0;k--){
				int tmp=0;
				for(int kk=0;kk<=B[i]-1&&kk<=k;kk++)
					tmp=(tmp+1LL*G[kk]*P[j][k-kk]%p)%p;
				P[j][k]=(p-tmp)%p;
			}
			if(j>=A[i]) for(int k=0;k<=tT;k++) P[j][k]=(P[j][k]+P[j-A[i]][k])%p;
		}
	}
	int ans=0;
	for(int i=0;i<S;i++){
		int x=1LL*i*iS%p,ix=qpow(x,p-2);
		int F=qpow(1-x+p,p-2),FF=F;
		for(int j=0;j<=T;j++){
			ans=(ans+1LL*P[i][j]*fac[j]%p*F%p)%p;
			F=1LL*F*FF%p;
		}
	}
	printf("%d\n",(p-ans)%p);
}
```