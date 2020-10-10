程 序 填 空

下面的程序输入 $n$ 个点，输出一个最高 $n-1$ 次的多项式，恰好这 $n$ 个点都在这个点上。请你补全它。你还要保证它的复杂度为 $O(n\log ^2n)$。

由于代码很长，所以建议把代码复制到 IDE，浏览器用来看选项。~~当然你想 swap 一下也可以~~

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
	void iDFT(int n0){if(this->size()<n0) resize(n0);_______(1)_______;}
	Poly slice(int n){return Poly(this->data(),this->data()+n);}
};

Poly Conv(Poly d1,Poly d2,int n0){
	if(n0<=32){
		d1.resize(n0);d2.resize(n0);
		for(int i=n0-1;i>=0;i--){
			Z tmp=0;
			for(int j=0;j<=i;j++) _______(2)_______;
			d1[i]=tmp;
		}
		return d1;
	}
	int x=1;while(x<n0) x<<=1;
	d1.DFT(x);d2.DFT(x);
	for(int i=0;i<x;i++) d1[i]*=d2[i];
	d1.iDFT(x);_______(3)_______;
	return d1;
}
Poly Add(Poly d1,Poly d2){
	d1.resize(max(d1.size(),d2.size()));d2.resize(d1.size());
	for(int i=0;i<d1.size();i++) d1[i]+=d2[i];
	return d1;
}
//ans <- 2*ans-d*ans*ans
Poly Inv(Poly d,int n0){
	Poly ans;ans.resize(n0);ans[0]=qpow(d[0],p-2);
	for(int n=2;n<=n0;n<<=1){
        Poly P(ans.data(),ans.data()+n),Q(d.data(),d.data()+n);
        P.DFT(n),Q.DFT(n);
		for(int i=0;i<n;i++) Q[i]*=P[i];Q.iDFT(n);
		for(int i=0;i<_______(4)_______;i++) Q[i]=0;Q.DFT(n);
        for(int i=0;i<n;i++) P[i]*=Q[i];P.iDFT(n);
        for(int i=(n>>1);i<n;i++) ans[i]=-P[i];
    }
	ans.resize(n0);return ans;
}
Poly Der(Poly d,int n0){
	Poly ans;ans.resize(n0);
	for(int i=0;i<n0-1;i++) _______(5)_______;
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
namespace MultiEval{
	Poly F,A;
	Poly V[maxN<<2],G[maxN<<2];
	Poly ans;
	void Get_V(int x,int l,int r){
		if(l==r){V[x].push_back(1);V[x].push_back(-A[l]);return;}
		int mid=(l+r)>>1;
		Get_V(x<<1,l,mid);Get_V(x<<1|1,mid+1,r);
		V[x]=Conv(V[x<<1],V[x<<1|1],_______(6)_______);
	}
	void Get_G(int x,int l,int r){
		if(l==r){ans.push_back(G[x][0]);return;}
		int mid=(l+r)>>1,N0=(r-l+1)>>1;
		reverse(V[x<<1|1].begin(),V[x<<1|1].end());
		V[x<<1|1]=Conv(V[x<<1|1],G[x],N0<<1);
		G[x<<1].resize(N0);copy(V[x<<1|1].begin()+N0,V[x<<1|1].end(),G[x<<1].begin());
		reverse(V[x<<1].begin(),V[x<<1].end());
		_______(7)_______;
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
		copy(_______(8)_______,invSV.end()-1,G[1].begin());
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
		Poly derSV=Der(V[1],_______(9)_______);derSV.resize(N0);
		Poly nY=MultiEval::Solve(derSV,X);
		for(int i=0;i<N0;i++) Y[i]=Y[i]*qpow(nY[i],p-2);
		Get_U(1,0,N0-1);
		Poly ans=U[1];ans.resize(dX.size());
		clear(1,0,N0-1);X.clear();Y.clear();
		return ans;
	}
}

int N;
Poly X,Y;

int main(){
	_______(10)_______; //important
	scanf("%d",&N);X.resize(N);Y.resize(N);
	for(int i=0;i<N;i++) scanf("%d%d",&X[i].x,&Y[i].x);
	X=Intpo::Solve(X,Y);
	for(int i=0;i<N;i++) printf("%d ",X[i].x);
}
```

1.
A.``NTT(this->data(),n0,1)``

B.``NTT(data(),n0,1)``

C.``NTT(this->data(),1,n0)``

D.``NTT(this->data(),0,n0)``

2.

A.``tmp+=d1[i-j]*d2[j];``

B.``tmp+=d1[i-j]*d2[i-j];``

C.``tmp*=d1[i-j]+d2[j];``

D.``tmp+=d1[j]*d2[j]``

3.

A.``d1.resize(n0<<1);``

B.``d1.resize(n0);``

C.``d1.size()=n0;``

D.``d1.size()=n0<<1;``

4.

A.``sqrt(n)``

B.``n``

C.``(n>>1)``

D.``(n<<1)``

5.

A.``ans[i]=d[i]*i``

B.``ans[i]=d[i+1]*i``

C.``ans[i]=d[i]*(i+1)``

D.``ans[i]=d[i+1]*(i+1)``

6.

A.``F.size()``

B.``r-l+1``

C.``A.size()``

D.``r-l+2``

7.

A.``V[x<<1]=Conv(V[x<<1],G[x<<1|1],N0)``

B.``V[x<<1|1]=Conv(V[x<<1|1],G[x],N0)``

C.``V[x<<1|1]=Conv(V[x<<1|1],G[x<<1],N0<<1)``

D.``V[x<<1]=Conv(V[x<<1],G[x],N0<<1)``

8.

A.``invSV.begin()+N0-1``

B.``invSV.begin()+N0-2``

C.``invSV.end()-N0``

D.``invSV.end()-N0+1``

9.

A.``N0``

B.``N0-1``

C.``N0+1``

D.``N0>>1``

10.

A.``printf("ZKAKIOI");``

B.``init();``

C.``p=998244353;``

D.``Intpo::Solve(X,Y);``