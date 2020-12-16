---
title: 关于 FFT（旧文补档）
date: 2020-09-01 20:36:49
tags:
- 数学
- 多项式
---

另一种看待 FFT 的视角。不只是奇偶拆分。

<!--more-->

说是旧文补档其实我根本没存档，这篇完全是重写的……

下面切入正题。

# 单位根反演

首先定义 $\omega_n$ 是 $n$ 次单位根，满足 $\omega_n^{i}\neq 1\ (1\le i<n),\omega^{n}_n=1$。

考虑

$$
\sum_{i=0}^{n-1}\omega_{n}^{ik}
$$

由于 $\omega_{n}^{in}=1$，所以我们可以把 $k$ 模 $n$ 考虑。

对于 $1\le k<n$，有 $\omega_{n}^{k}\neq 1$，于是等比数列求和得到原式为

$$
\dfrac{1-\omega_{n}^{nk}}{1-\omega_{n}^k}=0
$$

而对于 $k=0$ 则显然有原式等于 $n$。于是我们得到单位根反演

$$
\boxed{[n|k]=\dfrac{1}{n}\sum_{i=0}^{n-1}\omega_{n}^{ik}}
$$

# 循环卷积

考虑循环卷积

$$
c_k=\sum_{(i+j)\bmod n=k}a_ib_j
$$

也就是说 $[n|i+j-k]$。应用我们刚刚得到的单位根反演：

$$
c_k=\dfrac 1 n\sum_{i,j}a_ib_j\sum_{d=0}^{n-1}\omega_{n}^{di+dj-dk}
$$

换求和号并整理得

$$
c_k=\dfrac{1}{n}\sum_{d=0}^{n-1}\omega_{n}^{-dk}\sum_{i}a_i\omega_{n}^{di}\sum_{i}b_i\omega_{n}^{di}
$$

我们从这个式子中发现了两种形式。设

$$
\boxed{A_d=\sum_{i=0}^{n-1}a_i\omega_{n}^{di}}
$$

这就是离散傅里叶变换 $\text{DFT}$。而

$$
\boxed{a_i=\dfrac 1 n\sum_{d=0}^{n-1}\omega_{n}^{-di}A_d}
$$

就是 $\text{DFT}^{-1}$。下面验证 $\text{DFT}^{-1}(\text{DFT}(a))=a$：

$$
\begin{aligned}\text{DFT}^{-1}(\text{DFT}(a))_i&=\dfrac{1}{n}\sum_{d=0}^{n-1}\omega_{n}^{-di}\sum_{j=0}^{n-1}a_j\omega_{n}^{dj}\\&=\sum_{j=0}^{n-1}a_j\dfrac{1}{n}\sum_{d=0}^{n-1}\omega_{n}^{d(j-i)}\\&=\sum_{j=0}^{n-1}a_j[n|j-i]\\&=a_i\end{aligned}
$$

$\text{DFT}(\text{DFT}^{-1})$ 类似，不表。

对于长度为 $2^k$ 的 DFT，我们都知道可以奇偶拆分来计算。对于长度不那么好的序列，我们需要一些技巧。

# Bluestein 算法（任意长度循环卷积）

请注意，虽然标题是*任意长度循环卷积*，但是仍然要求单位根 $\omega_{n}$ 存在（我们对 $\text{DFT}$ 的完全建立在单位根的性质上）推导，如果你使用的是 NTT 那么请千万注意这一点。

我们有

$$
di={d+i\choose 2}-{d\choose 2}-{i\choose 2}
$$

那么用它换掉 $\omega_n^{di}$，$\text{DFT}$ 就变为

$$
A_d=\omega_{n}^{-{d\choose 2}}\sum_{i=0}^{n-1}a_i\omega_{n}^{\tiny\begin{pmatrix}d+i\\2\end{pmatrix}-\begin{pmatrix}i\\2\end{pmatrix}}
$$

显然获得了一个卷积形式。~~用 DFT 优化卷积，再用卷积做 DFT~~

参考例题：

- [【HNOI2019】白兔之舞](https://loj.ac/problem/3058)

- [【CTSC2010】性能优化](https://www.luogu.com.cn/problem/P4191)

# 两次变一次优化

现在希望求 $\text{DFT}(a),\text{DFT}(b)$。下面介绍一种高妙操作，使得求这两个序列只需要一次 $\text{DFT}$。

首先记复数 $z=a+bi$ 的共轭为 $\text{conj}(z):=a-bi$。有一个显然的结论，读者自行验证：

$$\text{conj}(z_1z_2)=\text{conj}(z_1)\text{conj}(z_2)$$

（事实上 $\mathbb{C}$ 到自身的，保持加法和乘法都不变的，而且连续的映射似乎只有共轭？）

注意到下面两个事实：

- $\text{conj}(\omega_n^k)=\omega_{n}^{-k}$

- 如果 $\zeta=z_1+z_2i$，那么 $z_1=\dfrac{\zeta+\text{conj}(\zeta)}{2},z_2=\dfrac{\zeta-\text{conj}(\zeta)}{2i}$

构造 $p=a-bi,q=a+bi$。则有

$$
\text{conj}(\text{DFT}(p)_j)=\text{DFT}(q)_{-j}
$$

也就是说只要求出 $\text{DFT}(p)$，将其共轭再翻转就得到了 $\text{DFT}(q)$，也就得到了 $\text{DFT}(a),\text{DFT}(b)$。

七次变四次的拆系数任意模数 NTT 板子：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define db long double
using namespace std;

const int maxN=524288;
const db Pi=acos(-1);
struct Cpl{
    db r,i;
    Cpl(db r0=0,db i0=0){r=r0;i=i0;}
    Cpl operator +(const Cpl b)const{return Cpl(r+b.r,i+b.i);}
    Cpl operator -(const Cpl b)const{return Cpl(r-b.r,i-b.i);}
    Cpl operator *(const Cpl b)const{return Cpl(r*b.r-i*b.i,r*b.i+i*b.r);}
    bool operator ==(const Cpl b)const{return abs(r-b.r)<1e-8&&abs(i-b.i)<1e-8;}
}W[maxN],iW[maxN];
 
int R[maxN];
void FFT(Cpl d[],int n0,bool flg){
    int x=1,len=0;while(x<n0) x<<=1,len++;
    for(int i=0;i<x;i++){
        R[i]=(R[i>>1]>>1)|((i&1)<<(len-1));
        if(i<R[i]) swap(d[i],d[R[i]]);
    }
    for(int i=1,l=maxN/(i<<1);i<x;i<<=1,l>>=1)
    for(int j=0;j<x;j+=(i<<1))
    for(int k=0;k<i;k++){
        Cpl a0=d[j+k],a1=(flg?iW[l*k]:W[l*k])*d[j+i+k];
        d[j+k]=a0+a1;d[j+i+k]=a0-a1;
    }
    if(flg){
        for(int i=0;i<x;i++) d[i].r/=x,d[i].i/=x;
    }
}
Cpl tp[maxN],tq[maxN];
Cpl d1[maxN],d2[maxN];
void dbFFT(Cpl d1[],Cpl d2[],int n0,bool flg){
	for(int i=0;i<n0;i++) tp[i]=d1[i]+Cpl(0,1)*d2[i];
	FFT(tp,n0,flg);
	for(int i=0;i<n0;i++) tq[i]=Cpl(tp[i].r,-tp[i].i);
	reverse(tq+1,tq+n0);
	for(int i=0;i<n0;i++) d1[i]=(tp[i]+tq[i])*Cpl(0.5,0),d2[i]=(tp[i]-tq[i])*Cpl(0,-0.5);
}
Cpl a1[maxN],b1[maxN],a0[maxN],b0[maxN],c1[maxN],c2[maxN];
void Conv(int A[],int B[],int ans[],int n0,int p){
    int x=1;while(x<(n0<<1)) x<<=1;
	for(int i=0;i<x;i++) a1[i].r=A[i]>>15;
	for(int i=0;i<x;i++) b1[i].r=B[i]>>15;
	for(int i=0;i<x;i++) a0[i].r=A[i]&0x7fff;
	for(int i=0;i<x;i++) b0[i].r=B[i]&0x7fff;
	dbFFT(a1,b1,x,0);dbFFT(a0,b0,x,0);
	for(int i=0;i<x;i++)
		c1[i]=a1[i]*b1[i],
		c2[i]=a1[i]*b0[i]+a0[i]*b1[i]+a0[i]*b0[i]*Cpl(0,1);
	FFT(c1,x,1);FFT(c2,x,1);
	for(int i=0;i<x;i++)
		ans[i]=(((ll)(c1[i].r+0.5)%p<<30)%p+((ll)(c2[i].r+0.5)%p<<15)%p+(ll)(c2[i].i+0.5)%p)%p;
	for(int i=0;i<x;i++)
		a1[i].r=a1[i].i=0,b1[i].r=b1[i].i=0,a0[i].r=a0[i].i=0,b0[i].r=b0[i].i=0,c1[i].r=c1[i].i=0,c2[i].r=c2[i].i=0;
} 

int F[maxN],G[maxN],H[maxN];

void init(){
	for(int i=0;i<maxN;i++)
        W[i]=Cpl(cos(i*Pi/(maxN>>1)),sin(i*Pi/(maxN>>1))),
        iW[i]=Cpl(cos(i*Pi/(maxN>>1)),-sin(i*Pi/(maxN>>1)));
}

int main(){
	init();
	int N,M,P;
	scanf("%d%d%d",&N,&M,&P);
	for(int i=0;i<=N;i++) scanf("%d",&F[i]),F[i]%=P;
	for(int i=0;i<=M;i++) scanf("%d",&G[i]),G[i]%=P;
	Conv(F,G,H,max(N+1,M+1),P);
	for(int i=0;i<=N+M;i++) printf("%d ",H[i]); 
}
```

然而因为不明原因，这玩意比没优化前跑的慢……

一直以来的努力，全部木大（绝望）