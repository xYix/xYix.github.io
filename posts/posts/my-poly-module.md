---
title: 我的多项式板子
date: 2020-09-23 15:00:15
tags:
- 多项式
- $\color{red}精品$
---

常数巨大

<!--more-->

目前有的东西：

# 常规

- NTT
- 卷积
- 求逆
- 求导，积分
- Ln
- Exp
- Power
- 多点求值（**Multi**point **Eval**uation）
- 快速插值（**Int**er**po**lation）
- 快速阶乘/整式递推

# 任意模数

暂无。

# 下降幂

暂无。

# 历次 UPD

## 9.23

- 建立了本页。
- 单位根改为用 log 个 vector 存，NTT 时直接操作指针，大大优化了寻址速度。
- 增加了快速插值。

## 10.13

- 新增整式递推。由于参数复杂，目前使用标准读入获取参数。

```cpp
#include<bits/stdc++.h>
#define ll long long
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
vector<Z> W[maxK],iW[maxK];
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
	for(int k=0;k<maxK;k++){
		Z w=qpow(g,(p-1)>>k),iw=qpow(ig,(p-1)>>k);
		W[k].resize(1<<k);iW[k].resize(1<<k);
	    W[k][0]=iW[k][0]=1;
	    for(int i=1;i<(1<<k);i++)
	        W[k][i]=W[k][i-1]*w,
	        iW[k][i]=iW[k][i-1]*iw;
    }
    fac[0]=ifac[0]=fac[1]=ifac[1]=inv[1]=1;
    for(int i=2;i<maxN;i++)
    	fac[i]=fac[i-1]*i,
    	inv[i]=(p-p/i)*inv[p%i],
    	ifac[i]=ifac[i-1]*inv[i];
}
int R[maxN];

void NTT(Z d[],bool flg,int n0){
    int x=1,len=0;while(x<n0) x<<=1,len++;
    for(int i=0;i<x;i++){
        R[i]=(R[i>>1]>>1)|((i&1)<<(len-1));
        if(i<R[i]) swap(d[i],d[R[i]]);
    }
    for(int i=1,k=1;i<x;i<<=1,k++)
    for(int j=0;j<x;j+=(i<<1)){
    	Z *a0=d+j,*a1=d+j+i,*w=(flg?iW[k].data():W[k].data()),tmp;
	    for(int k=0;k<i;k++,a0++,a1++,w++){
	    	tmp=(*a1)*(*w),*a1=*a0-tmp,*a0+=tmp;
	    }
	}
    if(flg){
        Z invx=qpow(x,p-2);
        for(int i=0;i<x;i++) d[i]=d[i]*invx;
    }
}

struct Poly:vector<Z>{
	using vector<Z>::vector;
	void DFT(int n0){if(this->size()<n0) resize(n0);NTT(this->data(),0,n0);}
	void iDFT(int n0){if(this->size()<n0) resize(n0);NTT(this->data(),1,n0);}
	Poly slice(int n){return Poly(this->data(),this->data()+n);}
};

Poly Conv(Poly d1,Poly d2,int n0){
	if(n0<=32){
		d1.resize(n0);d2.resize(n0);
		for(int i=n0-1;i>=0;i--){
			Z tmp=0;
			for(int j=0;j<=i;j++) tmp+=d1[i-j]*d2[j];
			d1[i]=tmp;
		}
		return d1;
	}
	int x=1;while(x<n0) x<<=1;
	d1.DFT(x);d2.DFT(x);
	for(int i=0;i<x;i++) d1[i]*=d2[i];
	d1.iDFT(x);d1.resize(n0);
	return d1;
}
Poly Add(Poly d1,Poly d2){
	d1.resize(max(d1.size(),d2.size()));d2.resize(d1.size());
	for(int i=0;i<d1.size();i++) d1[i]+=d2[i];
	return d1;
}
Poly Inv(Poly d,int n0){
	Poly ans;ans.resize(n0);ans[0]=qpow(d[0],p-2);
	for(int n=2;n<=n0;n<<=1){
        Poly P(ans.data(),ans.data()+n),Q(d.data(),d.data()+n);
        P.DFT(n),Q.DFT(n);
		for(int i=0;i<n;i++) Q[i]*=P[i];Q.iDFT(n);
		for(int i=0;i<(n>>1);i++) Q[i]=0;Q.DFT(n);
        for(int i=0;i<n;i++) P[i]*=Q[i];P.iDFT(n);
        for(int i=(n>>1);i<n;i++) ans[i]=-P[i];
    }
	ans.resize(n0);return ans;
}
Poly Der(Poly d,int n0){
	Poly ans;ans.resize(n0);
	for(int i=0;i<n0-1;i++) ans[i]=d[i+1]*(i+1);
	return ans;
}
Poly Int(Poly d,int n0){
	Poly ans;ans.resize(n0);
	for(int i=n0-2;i>=0;i--) ans[i+1]=d[i]*inv[i+1];
	return ans;
}
Poly Ln(Poly d,int n0){
	return Int(Conv(Der(d,n0),Inv(d,n0),n0<<1),n0);
}
Poly Exp(Poly d,int n0){
	Poly ans;
	if(n0==1){ans.push_back(1);return ans;}
	ans=Exp(d,n0>>1);ans.resize(n0);
	Poly lnans=Ln(ans,n0);
	for(int i=0;i<n0;i++) lnans[i]=d[i]-lnans[i];
	lnans[0]+=1;ans=Conv(ans,lnans,n0<<1);
	ans.resize(n0);
	return ans;
}
Poly Pow(Poly d,int n0,int k){
	Poly tmppow,ans;
	int pos=-1;Z a0;
	for(int i=0;i<n0;i++) if(d[i].x!=0){pos=i;break;}
	if(pos==-1){ans.resize(n0);return ans;}a0=qpow(d[pos],p-2);
	tmppow.resize(n0);for(int i=0;i<n0-pos;i++) tmppow[i]=d[i+pos]*a0;
	tmppow=Ln(tmppow,n0);for(int i=0;i<n0;i++) tmppow[i]*=k;
	ans=Exp(tmppow,n0);a0=qpow(d[pos],k);
	for(int i=n0-1;i>=1LL*k*pos;i--) ans[i]=ans[i-1LL*k*pos]*a0;
	for(int i=min(1LL*k*pos-1,(ll)n0-1);i>=0;i--) ans[i]=0; 
	return ans;
} 
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
	void Get_G(int x,int l,int r){
		if(l==r){ans.push_back(G[x][0]);return;}
		int mid=(l+r)>>1,N0=(r-l+1)>>1;
		reverse(V[x<<1|1].begin(),V[x<<1|1].end());
		V[x<<1|1]=Conv(V[x<<1|1],G[x],N0<<1);
		G[x<<1].resize(N0);copy(V[x<<1|1].begin()+N0,V[x<<1|1].end(),G[x<<1].begin());
		reverse(V[x<<1].begin(),V[x<<1].end());
		V[x<<1]=Conv(V[x<<1],G[x],N0<<1);
		G[x<<1|1].resize(N0);copy(V[x<<1].begin()+N0,V[x<<1].end(),G[x<<1|1].begin());
		Get_G(x<<1,l,mid);Get_G(x<<1|1,mid+1,r);
	}
	void clear(int x,int l,int r){
		V[x].clear();G[x].clear();
		if(l==r) return;
		int mid=(l+r)>>1;clear(x<<1,l,mid);clear(x<<1|1,mid+1,r);
	}
	Poly Solve(Poly dF,Poly dA){
		int N0=calc(max(dF.size(),dA.size()+1));
		F=dF,A=dA;F.resize(N0);A.resize(N0);
		Get_V(1,0,N0-1);
		Poly invSV=Inv(V[1],N0);
		reverse(invSV.begin(),invSV.end());
		invSV=Conv(invSV,F,N0<<1);G[1].resize(N0);
		copy(invSV.begin()+N0-1,invSV.end()-1,G[1].begin());
		Get_G(1,0,N0-1);
		clear(1,0,N0-1);
		Poly tans=ans;ans.clear();tans.resize(A.size());A.clear();F.clear();
		return tans;
	}
}
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

namespace PolyRec{
	int N,B,M,D;
	Poly P[8];
	Z getP(int k,Z x){Z mul=1,ans=0;for(int i=0;i<=D;i++,mul*=x) ans+=mul*P[k][i];return ans;}
	struct Mat{
		Z a[8][8];
		Mat(){}
		Mat(Z l){for(int i=0;i<M;i++) a[i][i]=l;}
		bool iszero(){for(int i=0;i<M;i++)for(int j=0;j<M;j++)if(a[i][j].x) return 0;return 1;}
	};
	Mat operator +(const Mat a,const Mat b){
		Mat c=a;for(int i=0;i<M;i++)for(int j=0;j<M;j++)c.a[i][j]+=b.a[i][j];return c;
	}
	Mat operator -(const Mat a){Mat c;for(int i=0;i<M;i++)for(int j=0;j<M;j++)c.a[i][j]=p-a.a[i][j];return c;}
	Mat operator -(const Mat a,const Mat b){return a+-b;}
	Mat operator *(const Mat a,const Z l){Mat c=a;for(int i=0;i<M;i++)for(int j=0;j<M;j++) c.a[i][j]*=l;return c;}
	Mat operator *(const Mat a,const Mat b){
		Mat c;
		for(int i=0;i<M;i++)
		for(int j=0;j<M;j++)
		for(int k=0;k<M;k++)
			c.a[i][k]+=a.a[i][j]*b.a[j][k];
		return c;
	}
	Mat& operator +=(Mat &a,const Mat b){return a=a+b;} 
	Mat& operator -=(Mat &a,const Mat b){return a=a-b;}
	Mat& operator *=(Mat &a,const Z l){return a=a*l;} 
	Mat& operator *=(Mat &a,const Mat b){return a=a*b;}  
	int M0;
	Mat getM(Z x){
		x+=M0;
		Mat c;if(M!=1) c.a[1][0]=getP(0,x);
		for(int i=1;i<M;i++) c.a[i+1][i]=c.a[1][0];
		for(int i=0;i<M;i++) c.a[i][M-1]=p-getP(M-i,x);
		return c;
	}
	
	struct POLY:vector<Mat>{
		using vector<Mat>::vector;
		void DFT(int n0){
			if(this->size()<n0) resize(n0);
			Poly tmp;tmp.resize(n0);
			for(int i=0;i<M;i++)
			for(int j=0;j<M;j++){
				for(int k=0;k<n0;k++) tmp[k]=this->data()[k].a[i][j];
				tmp.DFT(n0);
				for(int k=0;k<n0;k++) this->data()[k].a[i][j]=tmp[k];
			}
		}
		void iDFT(int n0){
			if(this->size()<n0) resize(n0);
			Poly tmp;tmp.resize(n0);
			for(int i=0;i<M;i++)
			for(int j=0;j<M;j++){
				for(int k=0;k<n0;k++) tmp[k]=this->data()[k].a[i][j];
				tmp.iDFT(n0);
				for(int k=0;k<n0;k++) this->data()[k].a[i][j]=tmp[k];
			}
		}
	};
	
	int w;
	POLY F;
	void ADD1(){
		for(int k=0;k<=D*w;k++) F[k]*=getM(k*B+w);
		for(int j=1;j<=D;j++){
			F.push_back(Mat(1));
			for(int i=0;i<=w;i++) F[D*w+j]*=getM((D*w+j)*B+i);
		}
		w++;
	}
	Z preS[maxN],sufS[maxN],invS;
	Poly _g;
	POLY LIP(Z k){
		POLY ans;
		int x=1;while(x<=2*D*w) x<<=1;
		ans.resize(x);_g.resize(x);
		for(int i=0;i<x;i++) ans[i]=Mat(),_g[i]=0;
		//get G : inv k-D*w~k+D*w
		for(int i=0;i<=2*D*w;i++) _g[i]=(Z)i+k-D*w;
		preS[0]=_g[0];for(int i=1;i<=2*D*w;i++) preS[i]=preS[i-1]*_g[i];
		sufS[2*D*w]=_g[2*D*w];for(int i=2*D*w-1;~i;i--) sufS[i]=sufS[i+1]*_g[i];
		invS=qpow(preS[2*D*w],p-2);
		for(int i=0;i<=2*D*w;i++){_g[i]=invS;if(i!=0) _g[i]*=preS[i-1];if(i!=2*D*w) _g[i]*=sufS[i+1];}
		//get F
		for(int i=0;i<=D*w;i++){
			ans[i]=F[i]*ifac[i]*ifac[D*w-i];
			if((D*w-i)&1) ans[i]=-ans[i];
		}
		//main part
		ans.DFT(x);_g.DFT(x);
		for(int i=0;i<x;i++) ans[i]*=_g[i];
		ans.iDFT(x);_g.iDFT(x);
		Z mul=preS[D*w];
		for(int i=0;i<=D*w;i++) ans[i]=ans[i+D*w]*mul,mul*=_g[i]*(k+i+1);
		ans.resize(D*w+1);
		return ans;
	}
	POLY G;
	void MUL2(){
		if(w==0) return;
		G=LIP(D*w+1);for(int i=0;i<D*w;i++) F.push_back(G[i]);
		w<<=1;
		G=LIP(qpow(B,p-2)*(w>>1));
		for(int i=0;i<=D*w;i++) F[i]*=G[i];
	}
	
	Z A[7];
	Z _Solve(){
		w=0;F.clear();F.push_back(Mat(1));
		for(int i=19;~i;i--){
			MUL2();
			if((B>>i)&1) ADD1();
		}
		Mat ans=Mat(1);
		for(int i=0;i<=D*B;i++) ans*=F[i];
		for(int i=B*(D*B+1);i<=N;i++) ans*=getM(i);
		//ans=M(m)*...*M(n)
		//{a_j} * ans = P_0(m)*P_0(m+1)*...*P_0(n)*a_n
		Z ANS=0;
		for(int i=0;i<M;i++) ANS+=A[i]*ans.a[i][M-1];
		return ANS;
	}
	void Solve(){
		scanf("%d%d%d",&N,&M,&D);M0=M;
		for(int i=0;i<M;i++) scanf("%d",&A[i]);
		for(int i=0;i<=M;i++){
			P[i].resize(D+1);
			for(int j=0;j<=D;j++) scanf("%d",&P[i][j]);
		}
		N-=M;B=max(sqrt(N/D)-1,0.0);
		Z ANS=_Solve();
		M=1;for(int i=0;i<=D;i++) P[1][i]=p-P[0][i];A[0]=1;
		ANS*=qpow(_Solve(),p-2);
		printf("%d\n",ANS);
	}
}

int main(){
	init(); //important
}
```
