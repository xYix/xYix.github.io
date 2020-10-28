---
title: 数据结构学习笔记
date: 2020-09-03 15:09:05
tags:
- 数据结构
- 分块
- 毒瘤
- $\color{green}咕咕$
---

再不学就要变成时代的眼泪了（悲）

<!--more-->

# 莫队二次离线

特征：神必的区间询问，连莫队都难以处理。

## [P5047 [Ynoi2019模拟赛]Yuno loves sqrt technology II](https://www.luogu.com.cn/problem/P5047)

首先有一个 naive 的做法是大力莫队+树状数组，很显然它是 $O(n\sqrt n\log n)$ 的

每次移动的时候我们都询问 $[l,r]$ 中有多少数比 $a[r]$ 大，首先应当想到差分，而 $[1,r]$ 中有多少比 $a[r]$ 大非常的 simple，可以忽略。这样变成了有 $n\sqrt n$ 个询问和 $n$ 次修改的问题，那么分块即可

但是这样空间是 $O(n\sqrt n)$ 的。考虑每次移动右端点都连续移动了一个区间，直接只存这个区间就可以了

代码如下

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN=100005,maxM=100005;
int N,M,A[maxN],A1[maxN],n;
int inb[maxN],len;
struct Qs{
	int l,r,id;
	bool operator <(const Qs b)const{return inb[l]<inb[b.l]||(inb[l]==inb[b.l]&&r<b.r);}
}Q[maxM];

ll sl[maxN],sr[maxN];

int C[maxN];
void chn(int x,int k){for(;x<=n;x+=x&-x) C[x]+=k;}
int qst(int x){int tmp=0;for(;x;x-=x&-x) tmp+=C[x];return tmp;} 

int lnkl[maxM];
int prel[maxM],befr[maxM],aftr[maxM],idl[maxM],cntl;
int flgl[maxM];
void addl(int l,int r0,int r1,int id,int flg){
	prel[++cntl]=lnkl[l],befr[cntl]=r0,aftr[cntl]=r1,idl[cntl]=id,flgl[cntl]=flg,lnkl[l]=cntl;
}
int lnkr[maxM];
int prer[maxM],befl[maxM],aftl[maxM],idr[maxM],cntr;
int flgr[maxM];
void addr(int r,int l0,int l1,int id,int flg){
	prer[++cntr]=lnkr[r],befl[cntr]=l0,aftl[cntr]=l1,idr[cntr]=id,flgr[cntr]=flg,lnkr[r]=cntr;
}

ll ANS[maxM];

int INB[maxN],LEN;
int beg[400];
ll lzy[400];
ll val[maxN];

int main(){
	scanf("%d%d",&N,&M);len=sqrt(N);
	for(int i=1;i<=N;i++) scanf("%d",&A[i]),A1[i]=A[i],inb[i]=(i-1)/len+1;
	sort(A1+1,A1+N+1);n=unique(A1+1,A1+N+1)-A1-1;
	for(int i=1;i<=N;i++) A[i]=lower_bound(A1+1,A1+n+1,A[i])-A1; 
	for(int i=1;i<=M;i++) scanf("%d%d",&Q[i].l,&Q[i].r),Q[i].id=i;
	sort(Q+1,Q+M+1);
	
	for(int i=1;i<=N;i++) sl[i]=sl[i-1]+i-1-qst(A[i]),chn(A[i],1);
	memset(C,0,sizeof(C));
	for(int i=N;i;i--) sr[i]=sr[i+1]+qst(A[i]-1),chn(A[i],1);
	
	int l=1,r=0;
	for(int i=1;i<=M;i++){
		if(r<Q[i].r)
			ANS[Q[i].id]+=sl[Q[i].r]-sl[r], 
			addl(l,r+1,Q[i].r,Q[i].id,0),r=Q[i].r;
		if(r>Q[i].r)
			ANS[Q[i].id]+=sl[Q[i].r]-sl[r], 
			addl(l,Q[i].r+1,r,Q[i].id,1),r=Q[i].r; 
		if(l<Q[i].l)
			ANS[Q[i].id]+=sr[Q[i].l]-sr[l], 
			addr(r,l,Q[i].l-1,Q[i].id,1),l=Q[i].l;
		if(l>Q[i].l)
			ANS[Q[i].id]+=sr[Q[i].l]-sr[l], 
			addr(r,Q[i].l,l-1,Q[i].id,0),l=Q[i].l;
	}
	
	LEN=sqrt(n);
	for(int i=1;i<=n;i++){
		INB[i]=(i-1)/LEN+1;
		if(INB[i-1]!=INB[i]) beg[INB[i]]=i;
	}
	beg[INB[n]+1]=n+1;INB[n+1]=INB[n]+1;
	
	for(int i=1;i<=N;i++){
		for(int e=lnkl[i];e;e=prel[e]){
			int r0=befr[e],r1=aftr[e],id=idl[e],flg=flgl[e];
			for(int k=r0;k<=r1;k++)
				if(flg) ANS[id]+=(ll)lzy[inb[A[k]+1]]+val[A[k]+1];
				else ANS[id]-=(ll)lzy[inb[A[k]+1]]+val[A[k]+1];
		}
		for(int j=1;j<=inb[A[i]]-1;j++) lzy[j]++;
		for(int j=beg[inb[A[i]]];j<=A[i];j++)
			val[j]++; 
	}
	memset(lzy,0,sizeof(lzy));
	memset(val,0,sizeof(val));
	
	for(int i=N;i>=1;i--){
		for(int e=lnkr[i];e;e=prer[e]){
			int l0=befl[e],l1=aftl[e],id=idr[e],flg=flgr[e];
			for(int k=l0;k<=l1;k++)
				if(flg) ANS[id]+=lzy[inb[A[k]-1]]+val[A[k]-1];
				else ANS[id]-=lzy[inb[A[k]-1]]+val[A[k]-1];
		}
		for(int j=inb[A[i]]+1;j<=inb[n];j++) lzy[j]++;
		for(int j=A[i];j<beg[inb[A[i]]+1];j++)
			val[j]++; 
	}
	
	for(int i=1;i<=M;i++)
		ANS[Q[i].id]+=ANS[Q[i-1].id];
	for(int i=1;i<=M;i++)
		printf("%lld\n",ANS[i]);
	
	return 0;
}
```

## [P4887 【模板】莫队二次离线（第十四分块(前体)）](https://www.luogu.com.cn/problem/P4887)

和上题差不多的套路，问题在于如何 $O(1)$ 查询一个集合里和 $x$ 异或后有 $k$ 个 1。注意到值域很小，设 $x\text{ xor }y=z$ 且 $|z|=k$，修改时我们直接爆枚 $z$ 把他贡献给 $z\text{ xor }y$ 就好了。

代码如下，又是 930ms 卡过去的……今天也是大常数的一天呢

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN=100005;

int N,M,K,len;
int siz[16384];
int Z[16384],tot;

int A[maxN],inb[maxN];
ll Fr[maxN],Fl[maxN];
int cnt[16384];
void init(){for(int i=0;i<16384;i++) cnt[i]=0;}
void Inc(int x){for(register int i=0;i<tot;i++) cnt[x^Z[i]]++;}
struct Qs{
	int l,r,id;
	bool operator <(const Qs b)const{return inb[l]<inb[b.l]||(inb[l]==inb[b.l]&&r<b.r);}
}B[maxN];
ll ANS[maxN];

struct Qss{
	int l,r,id;bool flg;
};vector<Qss> Cl[maxN],Cr[maxN];
void addl(int x,int l,int r,int id,bool flg){Cl[x].push_back((Qss){l,r,id,flg});}
void addr(int x,int l,int r,int id,bool flg){Cr[x].push_back((Qss){l,r,id,flg});}

int main(){
//	freopen("P4887.in","r",stdin);
//	freopen("WA.out","w",stdout);
	scanf("%d%d%d",&N,&M,&K);len=sqrt(N);
	for(int i=0;i<16384;i++){
		siz[i]=siz[i>>1]+(i&1);
		if(siz[i]==K) Z[tot++]=i;
	}
	for(int i=1;i<=N;i++) inb[i]=(i-1)/len+1,scanf("%d",&A[i]);
	for(int i=1;i<=M;i++) scanf("%d%d",&B[i].l,&B[i].r),B[i].id=i;
	sort(B+1,B+M+1);
	
	int L=1,R=0;
	for(int i=1;i<=M;i++){
		if(R<B[i].r) addl(L,R+1,B[i].r,B[i].id,1),R=B[i].r;
		if(L>B[i].l) addr(R,B[i].l,L-1,B[i].id,1),L=B[i].l;
		if(R>B[i].r) addl(L,B[i].r+1,R,B[i].id,0),R=B[i].r; 
		if(L<B[i].l) addr(R,L,B[i].l-1,B[i].id,0),L=B[i].l;
	}
	
	init();
	for(int i=1;i<=N;i++){
		for(int j=0;j<Cl[i].size();j++){
			ll tmp=0;for(int x=Cl[i][j].l;x<=Cl[i][j].r;x++) tmp+=cnt[A[x]];
			if(Cl[i][j].flg) ANS[Cl[i][j].id]-=tmp;else ANS[Cl[i][j].id]+=tmp;
		}
		Fr[i]=Fr[i-1]+cnt[A[i]];
		Inc(A[i]);
	}
	init();
	for(int i=N;i;i--){
		for(int j=0;j<Cr[i].size();j++){
			ll tmp=0;for(int x=Cr[i][j].l;x<=Cr[i][j].r;x++) tmp+=cnt[A[x]];
			if(Cr[i][j].flg) ANS[Cr[i][j].id]-=tmp;else ANS[Cr[i][j].id]+=tmp;
		}
		Fl[i]=Fl[i+1]+cnt[A[i]];
		Inc(A[i]);
	}
	
	L=1,R=0;
	for(int i=1;i<=M;i++){
		if(R<B[i].r) ANS[B[i].id]+=Fr[B[i].r]-Fr[R],R=B[i].r;
		if(L>B[i].l) ANS[B[i].id]+=Fl[B[i].l]-Fl[L],L=B[i].l;
		if(R>B[i].r) ANS[B[i].id]+=Fr[B[i].r]-Fr[R],R=B[i].r;
		if(L<B[i].l) ANS[B[i].id]+=Fl[B[i].l]-Fl[L],L=B[i].l;
	}
	
	for(int i=1;i<=M;i++) ANS[B[i].id]+=ANS[B[i-1].id];
	for(int i=1;i<=M;i++) printf("%lld\n",ANS[i]);
}
```

# 普通分块

普通是相对而言的（

## [P5046 [Ynoi2019模拟赛]Yuno loves sqrt technology I](https://www.luogu.com.cn/problem/P5046)

考虑分块。首先肯定要每块都排序。

考虑怎么询问。

- 边角 $\leftrightarrow$ 边角

对于两个边角间，直接暴力归并即可。不需要重新排序，从块内有序序列里抽出属于边角的元素即可。

对于边角到自身，显然可以预处理。

预处理无，查询时 $O(B)$。

- 边角 $\leftrightarrow$ 整块

考虑处理 $f_{i,u}$ 是 $a_i$ 和块 $u$ 的答案。直接每个块和整个序列归并即可。再做一下前缀和就可以 $O(B)$ 查询。

预处理 $O(\dfrac{N}{B}(N+B))$，查询时 $O(B)$。

- 整块内

考虑处理 $g_{u,v}$ 是 $u$ 的开头到 $v$ 的结尾这段序列的答案。

有 $g_{u,v}=g_{u,v-1}+g_{u+1,v}-g_{u+1,v-1}+\text{ans}(u,v)$

大力 $O(\dfrac{N^2}{B^2}B)$ 归并即可。查询 $O(1)$。

代码如下，日常 991ms 过题……习惯了习惯了

```cpp
#include<bits/stdc++.h>
#pragma GCC optimize("Ofast")
#pragma GCC optimize("unroll-loops")
#pragma GCC target("sse,sse2,sse3,ssse3,sse4,popcnt,abm,mmx,avx,tune=native")
#define ll long long
#define register
using namespace std;

const int maxN=100005,LEN=450; 
int N,M,len;
int inb[maxN];int beg[LEN];
int A[maxN],sA[maxN],As[maxN],ssA[maxN],Ass[maxN];
int rev[maxN];

ll f[LEN][maxN];
ll g[LEN][LEN];
ll pre[maxN],suf[maxN];
ll C[maxN];
void chn(int x,int k){for(int x1=x;x1<=N;x1+=x1&-x1) C[x1]+=k;}
ll qst(int x){ll ans=0;for(int x1=x;x1;x1-=x1&-x1) ans+=C[x1];return ans;}

int tL[maxN],lL,tR[maxN],lR;
class istream{
	char buf[15000003],*s;
	public:
		inline istream(){
//#ifndef ONLINE_JUDGE
//			freopen("P5046.in","r",stdin);
//#endif
			buf[fread(s=buf,1,15000001,stdin)]='\n';
		}
		template<typename T>
		inline void operator>>(T&rhs){
			for(rhs=0;!isdigit(*s);++s);
			while(isdigit(*s))rhs=rhs*10+(*s++&15);
		}
}in;

int main(){
//	freopen("WA.out","w",stdout);
	in>>N;in>>M;len=300;
	for(int i=1;i<=N;i++) inb[i]=(i-1)/len+1,beg[inb[i]]=beg[inb[i]]?beg[inb[i]]:i;
	beg[inb[N+1]=inb[N]+1]=N+1;
	for(int i=1;i<=N;i++) in>>A[i],ssA[i]=sA[i]=A[i],rev[A[i]]=i;
	sort(ssA+1,ssA+N+1);
	for(int i=1;i<=N;i++) Ass[i]=rev[ssA[i]];
	for(int i=1;i<=inb[N];i++){
		for(int j=1;j<=N;j++)
			f[i][j]=f[i-1][j];
		sort(sA+beg[i],sA+beg[i+1]); 
		for(int j=beg[i];j<beg[i+1];j++) As[j]=rev[sA[j]];
		int j0=beg[i],j1=1;
		while(j0<beg[i+1]||j1<=N)
			if(j0<beg[i+1]&&(sA[j0]<ssA[j1]||j1>N))
				j0++;
			else{
				int pos=Ass[j1];
				if(pos<beg[i]) f[i][pos]+=j0-beg[i];
				else if(pos>=beg[i+1]) f[i][pos]+=beg[i+1]-j0;
				j1++;
			}
		
		ll tmp=0;
		for(int j=beg[i];j<beg[i+1];j++) pre[j]=(tmp+=j-beg[i]-qst(A[j])),chn(A[j],1);
		for(int j=beg[i];j<beg[i+1];j++) suf[j]=tmp,chn(A[j],-1),tmp-=qst(A[j]);
		g[i][i]=pre[beg[i+1]-1];
		for(int j=beg[i];j<beg[i+1];j++)
			f[i][j]+=pre[j]-(j==beg[i]?0:pre[j-1])+suf[j]-(j==beg[i+1]-1?0:suf[j+1]);
	}
	for(int d=2;d<=inb[N];d++)
	for(int i=1;i+d-1<=inb[N];i++){
		int l=i,r=i+d-1;
		g[l][r]=g[l][r-1]+g[l+1][r]-g[l+1][r-1];
		int j0=beg[l],j1=beg[r];
		while(j0<beg[l+1]||j1<beg[r+1])
			if(j0<beg[l+1]&&(sA[j0]<sA[j1]||j1>=beg[r+1]))
				j0++;
			else g[l][r]+=beg[i+1]-j0,j1++;
	}
	
	ll lstans=0;
	while(M--){
		ll xl,xr;in>>xl;in>>xr;
		int L=xl^lstans,R=xr^lstans;lstans=0;
		if(inb[L]==inb[R]){
			lstans=pre[R]-(L==beg[inb[L]]?0:pre[L-1]);
			lL=lR=0;
			for(int j=beg[inb[L]];j<beg[inb[L]+1];j++){
				if(As[j]<L) tL[++lL]=sA[j];
				if(As[j]>=L&&As[j]<=R) tR[++lR]=sA[j]; 
			}
			int j0=1,j1=1;
			while(j0<=lL||j1<=lR)
				if(j0<=lL&&(tL[j0]<tR[j1]||j1>lR))
					j0++;
				else lstans-=lL+1-j0,j1++;
		}
		else{
			lstans=g[inb[L]+1][inb[R]-1]+suf[L]+pre[R];
			for(int j=L;j<beg[inb[L]+1];j++)
				lstans+=f[inb[R]-1][j];
			for(int j=beg[inb[R]];j<=R;j++)
				lstans+=f[inb[R]-1][j];
			for(int j=L;j<beg[inb[L]+1];j++)
				lstans-=f[inb[L]][j];
			for(int j=beg[inb[R]];j<=R;j++)
				lstans-=f[inb[L]][j];
			lL=lR=0;
			for(int j=beg[inb[L]];j<beg[inb[L]+1];j++)
				if(As[j]>=L) tL[++lL]=sA[j];
			for(int j=beg[inb[R]];j<beg[inb[R]+1];j++)
				if(As[j]<=R) tR[++lR]=sA[j];
			int j0=1,j1=1;
			while(j0<=lL||j1<=lR)
				if(j0<=lL&&(tL[j0]<tR[j1]||j1>lR))
					j0++;
				else lstans+=lL+1-j0,j1++;
		}
		printf("%lld\n",lstans);//lstans=0;
	}
}
```

## [P4117 [Ynoi2018]五彩斑斓的世界](https://www.luogu.com.cn/problem/P4117)

看上去每次操作后值域都在减小。考虑给每个块开一个桶，设当前最大值为 $m$。

- $2x>m$

把值域的后一半往前面合并，显然每个值合并完立即消失。

- $2x\le m$

把值域的前一半往后面合并，然后打一个区间减 lazytag。显然每个值合并完还是立即消失。

这样总共 $N$ 个值也就最多只会被操作 $N$ 次。

考虑边角的时候怎么做，显然暴力重构就好了，不过因为要重构我们需要把桶改成并查集。

但是这样空间看似是 $n\sqrt n$ 的。发现每块完全独立，直接离线下来对每块单独操作就行了。

tip：并查集不按秩合并会死人的……

tip：寻址比我想象中的慢得多……

```cpp
#include<bits/stdc++.h>
using namespace std;

class Fastinput{
	char buf[1 << 21], *p1 = buf, *p2 = buf, c;
	public:
		char inline mygetc() {
			return p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, 1 << 21, stdin), p1 == p2) ? EOF : *(p1++);
		}
		template<typename T> void read(T &x) {
			bool neg = 0; c = mygetc();
			for(x = 0; !isdigit(c); c = mygetc()) if(c == '-') neg = 1;
			while(isdigit(c)) x = x * 10 + (c & 15), c=mygetc();
			if(neg) x = -x;
		}
}Fin;

const int maxN = 1000005, len = 1500;

struct Qs{
	int QL, QR, QX; bool Qtyp;
}B[maxN >> 1];
int ANS[maxN >> 1];

int N, M; int beg[maxN / len + 100], inb[maxN];
int lzy, mx;

int fa[len + 5], siz[len + 5], val[len + 5], lav[maxN];
int A[maxN]; 
int find(int x) {return (fa[x] == x) ? x : fa[x] = find(fa[x]);}
void inline merge(int x, int y) {
	int u = lav[x], v = lav[y]; lav[x] = lav[y] = val[u] = val[v] = 0;
	if(siz[u] > siz[v]) swap(u, v);
	if(!v) return;
	if(u) siz[v] += siz[u], siz[u] = 0, fa[u] = v;
	val[lav[y] = v] = y;
}

void inline init(int L, int R) {
	for(int j = 1; j <= R - L; j++) {
		int p = A[j + L - 1]; mx = max(mx, p);
		if(!lav[p]) lav[p] = j, fa[j] = j, siz[j] = 1, val[j] = p;
		else fa[j] = lav[p], siz[lav[p]]++;
	}
}

int main(){
	Fin.read(N), Fin.read(M);
	for(int i = 1; i <= N; i++)
		Fin.read(A[i]), inb[i] = (i - len >= 1) ? inb[i - len] + 1 : 1, 
		beg[inb[i]] = beg[inb[i]] ? beg[inb[i]] : i;
	beg[inb[N + 1] = inb[N] + 1] = N + 1;
	for(int i = 1; i <= M; i++){
		int tmp; Fin.read(tmp); B[i].Qtyp = tmp - 1;
		Fin.read(B[i].QL), Fin.read(B[i].QR), Fin.read(B[i].QX);
	}
	
	for(int d = 1; d <= inb[N]; d++) {
		lzy = mx = 0;
		memset(lav, 0, sizeof(lav)); memset(siz, 0, sizeof(siz));
		memset(fa, 0, sizeof(fa)); memset(val, 0, sizeof(val));
		init(beg[d], beg[d + 1]);
		for(int i = 1; i <= M; i++) {
			int x = B[i].QX, L = B[i].QL, R = B[i].QR, iL = inb[L], iR = inb[R];
			if(B[i].Qtyp) {
				if(x + lzy > 1000000) continue;
				if(iL + 1 <= d && d <= iR - 1)
					ANS[i] += siz[lav[x + lzy]];
				else if(iL == d || iR == d) {
					for(int j = max(L, beg[d]); j < beg[d + 1] && j <= R; j++) 
						if(val[find(j - beg[d] + 1)] - lzy == x) ANS[i]++;
				}
			}
			else{
				if(x >= mx) continue;
				if(iL + 1 <= d && d <= iR - 1)
					if(2 * x > mx) {
						for(int j = lzy + x + 1; j <= lzy + mx; j++) merge(j, j - x);
						mx = min(x, mx);
					}
					else {
						for(int j = lzy + 1; j <= lzy + x; j++) merge(j, j + x);
						lzy += x; mx -= x;
					}
				else if(iL == d || iR == d) {
					for(int j = 1; j <= beg[d + 1] - beg[d]; j++)
						lav[A[j + beg[d] - 1] = val[find(j)]] = 0, A[j + beg[d] - 1] -= lzy;
					for(int j = 1; j <= beg[d + 1] - beg[d]; j++)
						siz[j] = fa[j] = val[j] = 0;
					for(int j = max(L, beg[d]); j < beg[d + 1] && j <= R; j++)
						if(A[j] > x) A[j] -= x;
					lzy = mx = 0;
					init(beg[d], beg[d + 1]);
				}
			}
		}
	}
	for(int i = 1; i <= M; i++) if(B[i].Qtyp == 1) printf("%d\n", ANS[i]);
}
```

