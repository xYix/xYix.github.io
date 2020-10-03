---
title: 快速阶乘算法
date: 2020-09-01 19:48:23
tags:
- 数学
- 多项式
---

快速计算阶乘。

<!--more-->

# log方做法

把 $1\cdot 2\cdot 3\cdot\ldots\cdot n$ 分成长为 $B$ 的数段，显然每一段都是形如

$$\prod_{i=1}^B(x+i)$$

的东西，那么多点求值暴力刚出 $f(0),f(B),f(2B)...,f(B^2)$ 即可，复杂度 $O(\sqrt n\log ^2 n)$。

# log做法

我们设

$$
f(d,x)=\prod_{i=1}^d(x+i)
$$

要求的就是 $f(B,0),f(B,B),f(B,2B),...,f(B,B^2)$。

那么我们考虑从 $f(d,0),f(d,B),f(d,2B),...,f(d,dB)$ 倍增上去。

## $d\leftarrow d+1$

非常简单，$f(d+1,(d+1)B)$ 暴力算，其他的

$$
f(d+1,kB)=f(d,kB)(kB+d+1)
$$

显然 $O(d)$。

## $d\leftarrow 2d$

我们有

$$
f(2d,kB)=f(d,kB)f(d,kB+d)
$$

大概就是要算这样的一组东西

![](\images\fac.png)

设 $h(x)=f(Bx)$，那么其实就是要求两次

$$
h(k),h(k+1),...,h(k+d)
$$

具体来讲就是 $k=d+1$ 和 $\dfrac{d}{B}$。

拉格朗日插一插~~叉义叉~~得到

$$
h(j+k)=\sum_{i=0}^dh(i)\prod_{i'\neq i}\dfrac{j+k-i'}{i-i'}
$$

$$
h(j+k)=\prod_{i=0}^d(j+k-i)\sum_{i=0}^d\dfrac{h(i)}{i!(d-i)!(-1)^{d-i}}\dfrac{1}{j+k-i}
$$

前面那个双指针，后面那个卷积即可。注意 $k$ 可能不是整数所以 $j+k$ 可能巨大无比，卷积时注意移位。

## 后记

- [P5282 【模板】快速阶乘算法](https://www.luogu.com.cn/problem/P5282)

这题其实坠痛苦的是任意模数……

相信不会有神必出题人在 OI 赛场上出题不用 998244353 还不放 7 次的拆系数 FFT 过的吧，呐？

参考代码，不开 O2 过不了：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define int long long
#define db long double
using namespace std;

const int maxN=262144;
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
		ans[i]=(((ll)round(c1[i].r)%p<<30)%p+((ll)round(c2[i].r)%p<<15)%p+(ll)round(c2[i].i)%p)%p;
	for(int i=0;i<x;i++)
		a1[i].r=a1[i].i=0,b1[i].r=b1[i].i=0,a0[i].r=a0[i].i=0,b0[i].r=b0[i].i=0,c1[i].r=c1[i].i=0,c2[i].r=c2[i].i=0;
} 

int T;
int N,P,B;
void Init(){
	for(int i=0;i<maxN;i++)
        W[i]=Cpl(cos(i*Pi/(maxN>>1)),sin(i*Pi/(maxN>>1))),
        iW[i]=Cpl(cos(i*Pi/(maxN>>1)),-sin(i*Pi/(maxN>>1)));
}
int fac[maxN],inv[maxN],ifac[maxN];
void init(){
	inv[1]=fac[0]=fac[1]=ifac[0]=ifac[1]=1;
	for(int i=2;i<maxN;i++)
		fac[i]=1LL*fac[i-1]*i%P,
		inv[i]=1LL*(P-P/i)*inv[P%i]%P,
		ifac[i]=1LL*ifac[i-1]*inv[i]%P;
}
int qpow(int a,int k){
	int ans=1;
	while(k){
		if(k&1) ans=1LL*ans*a%P;
		a=1LL*a*a%P;
		k>>=1; 
	}
	return ans;
}

int d;
int F[maxN];

void ADD1(){
	for(int k=0;k<=d;k++) F[k]=1LL*F[k]*(k*B+d+1)%P;
	F[d+1]=1;
	for(int i=1;i<=d+1;i++) F[d+1]=1LL*F[d+1]*((d+1)*B+i)%P;
	d++;
}
int preS[maxN],sufS[maxN],invS;
int f[maxN],g[maxN];
void LIP(int h[],int ans[],int k){
	int x=1;while(x<4*d) x<<=1;
	for(int i=0;i<x;i++) f[i]=g[i]=0;
	//get G : inv k-d~k+d
	for(int i=0;i<=2*d;i++) g[i]=((i+k)%P-d+P)%P;
	preS[0]=g[0];for(int i=1;i<=2*d;i++) preS[i]=1LL*preS[i-1]*g[i]%P;
	sufS[2*d]=g[2*d];for(int i=2*d-1;~i;i--) sufS[i]=1LL*sufS[i+1]*g[i]%P;
	invS=qpow(preS[2*d],P-2);
	for(int i=0;i<=2*d;i++){
		g[i]=invS;
		if(i!=0) g[i]=1LL*g[i]*preS[i-1]%P;
		if(i!=2*d) g[i]=1LL*g[i]*sufS[i+1]%P;
	}
	//get F
	for(int i=0;i<=d;i++){
		f[i]=1LL*h[i]*ifac[i]%P*ifac[d-i]%P;
		if((d-i)&1) f[i]=(P-f[i])%P;
	}
	//main part
	Conv(f,g,ans,2*d,P);
	int mul=preS[d];
	for(int i=0;i<=d;i++) ans[i]=1LL*ans[i+d]*mul%P,mul=1LL*mul*g[i]%P*(i+1+k)%P;
}
int G[maxN];
void MUL2(){
	if(d==0) return;
	LIP(F,F+d+1,d+1);F[2*d+1]=0;
	d<<=1;
	LIP(F,G,1LL*(d>>1)*qpow(B,P-2)%P);
	for(int i=0;i<=d;i++) F[i]=1LL*F[i]*G[i]%P;
}

signed main(){
	Init();
	scanf("%d",&T);
//	T=5;
	while(T--){
		scanf("%lld%lld",&N,&P);
//		N=998244353,P=1000000007;
		B=sqrt(N);init();
		d=0;F[0]=1;
		for(int i=20;~i;i--){
			MUL2();
			if((B>>i)&1) ADD1();
		}
		int ans=1;
		for(int i=0;i<B;i++) ans=1LL*ans*F[i]%P;
		for(int i=B*B+1;i<=N;i++) ans=1LL*ans*i%P;
		printf("%lld\n",ans);
	}
}
```

- [#170. 阶乘 mod 大质数](https://loj.ac/problem/170)

请注意常数因子.jpg

参考代码：

```cpp
#include<bits/stdc++.h>
#define ll long long
#define int long long
#define db long double
using namespace std;

const int maxN=2097152,p=1000391835649ll,gg=7;
int ig;
ll mul(ll x,ll y){return ((((x>>20)*y%p)<<20)+(x&1048575)*y)%p;}
ll add(ll x,ll y){return (x+y)>=p?x+y-p:x+y;}
int W[maxN],iW[maxN];
int fac[maxN],ifac[maxN],inv[maxN];
int qpow(int a,int k){
    int ans=1;
    while(k){
        if(k&1) ans=mul(ans,a);
        a=mul(a,a);
        k>>=1;
    }
    return ans;
}
void init(){
	ig=qpow(gg,p-2);
	int w=qpow(gg,(p-1)/maxN),iw=qpow(ig,(p-1)/maxN);
    W[0]=iW[0]=1;
    for(int i=1;i<maxN;i++)
        W[i]=mul(W[i-1],w),
        iW[i]=mul(iW[i-1],iw);
    fac[0]=ifac[0]=fac[1]=ifac[1]=inv[1]=1;
    for(int i=2;i<maxN;i++)
    	fac[i]=mul(fac[i-1],i),
    	inv[i]=mul(p-p/i,inv[p%i]),
    	ifac[i]=mul(ifac[i-1],inv[i]);
}
int R[maxN];
void NTT(int d[],bool flg,int n0){
    int x=1,len=0;while(x<n0) x<<=1,len++;
    for(int i=0;i<x;i++){
        R[i]=(R[i>>1]>>1)|((i&1)<<(len-1));
        if(i<R[i]) swap(d[i],d[R[i]]);
    }
    for(int i=1,l=maxN/(i<<1);i<x;i<<=1,l>>=1)
    for(int j=0;j<x;j+=(i<<1))
    for(int k=0,u=0;k<i;k++,u+=l){
        int a0=d[j|k],a1=mul((flg?iW[u]:W[u]),d[j|i|k]);
        d[j|k]=add(a0,a1);d[j|i|k]=add(a0,-a1+p);
	}
    if(flg){
        int invx=qpow(x,p-2);
        for(int i=0;i<x;i++) d[i]=mul(d[i],invx);
    }
}

int T;
int N,B;

int d;
int F[maxN];

void ADD1(){
	for(int k=0;k<=d;k++) F[k]=mul(F[k],k*B+d+1);
	F[d+1]=1;
	for(int i=1;i<=d+1;i++) F[d+1]=mul(F[d+1],(d+1)*B+i);
	d++;
}
int preS[maxN],sufS[maxN],invS;
int f[maxN],g[maxN];
void LIP(int h[],int ans[],int k){
	int x=1;while(x<2*(d+1)) x<<=1;
	for(int i=0;i<x;i++) f[i]=g[i]=0;
	//get G : inv k-d~k+d
	for(int i=0;i<=2*d;i++) g[i]=add(add(i,k),-d+p);
	preS[0]=g[0];for(int i=1;i<=2*d;i++) preS[i]=mul(preS[i-1],g[i]);
	sufS[2*d]=g[2*d];for(int i=2*d-1;~i;i--) sufS[i]=mul(sufS[i+1],g[i]);
	invS=qpow(preS[2*d],p-2);
	for(int i=0;i<=2*d;i++){
		g[i]=invS;
		if(i!=0) g[i]=mul(g[i],preS[i-1]);
		if(i!=2*d) g[i]=mul(g[i],sufS[i+1]);
	}
	//get F
	for(int i=0;i<=d;i++){
		f[i]=mul(mul(h[i],ifac[i]),ifac[d-i]);
		if((d-i)&1) f[i]=add(p,-f[i]);
	}
	//main part
	NTT(f,0,x);NTT(g,0,x);
	for(int i=0;i<x;i++) ans[i]=mul(f[i],g[i]);
	NTT(ans,1,x);NTT(g,1,x);
	int mul0=preS[d];
	for(int i=0;i<=d;i++) ans[i]=mul(ans[i+d],mul0),mul0=mul(mul(mul0,g[i]),i+1+k);
}
int G[maxN];
void MUL2(){
	if(d==0) return;
	LIP(F,F+d+1,d+1);F[2*d+1]=0;
	d<<=1;
	LIP(F,G,mul(d>>1,qpow(B,p-2)));
	for(int i=0;i<=d;i++) F[i]=mul(F[i],G[i]);
}

signed main(){
	init();
	N=1000391835648LL;
	B=sqrt(N);
	d=0;F[0]=1;
	for(int i=20;~i;i--){
		MUL2();
		if((B>>i)&1) ADD1();
//		printf("check %d\n",i);
	}
	for(int i=1;i<=B;i++) F[i]=mul(F[i],F[i-1]);
	scanf("%d",&T);
	while(T--){
		scanf("%lld",&N);
		int k=N/B,ans;
		if(k==0) ans=1;else ans=F[k-1];
		for(int i=k*B+1;i<=N;i++) ans=mul(ans,i);
		printf("%lld\n",ans);
	}
}
```