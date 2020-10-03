---
title: AGC016D 题解 - XOR Replace
date: 2020-09-13 18:33:01
tags:
---

[题目链接](https://atcoder.jp/contests/agc016/tasks/agc016_d)，[题目翻译](https://www.luogu.com.cn/problem/AT2388)

<!--more-->

经典 trick：往序列里放一个 $a_0=\bigoplus a_i$，那么对 $a_i$ 操作其实就是交换 $a_0$ 和 $a_i$。

题意变成：给出一个置换，求用尽可能少的步数生成这个置换。显然对于长度大于等于 $2$ 的循环，所需操作数是循环长度+1。长度为 $1$ 的循环不需要管。注意如果 $a_0$ 在某个长度大于等于 $2$ 的循环里，则我们可以少花两步让它和其他循环沟通再断开，答案 ``-=2``。

这么思博？注意 $a_i$ 可能相同！

考虑两个相等的 $a_i,a_j$，我们可以随时交换它们的目的地。如果它们在不同的两个循环，可以交换它们的目的地使得两个循环沟通，步数 -1。

<div style="width:70%;margin:auto"><img src="https://xyix.github.io/images/agc016d.png" alt=""></div>

因此考虑把 $a_i$ 相等的点缩起来。最终答案是**边数+连通块数**（考虑自环但是处在连通块里的点）

考虑对 $a_0$ 的特判。

- $a_0$ 所在连通块大小为 $1$。答案显然不变。

- $a_0$ 所在循环大小为 $1$，所在连通块大小大于等于 $2$。利用 $a_0$ 可以让步数减少 2，但是会让连通块大小 +1，故答案 ``-=1``。

- 否则，答案 ``-=2``。

代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxN=200005;
int N;
int A[maxN],B[maxN];int *d;
int idA[maxN],idB[maxN];
bool cmp(int u,int v){return d[u]<d[v];}
int mA[maxN],mB[maxN];
int fa[maxN],siz[maxN];int find(int x){return (fa[x]==x)?x:fa[x]=find(fa[x]);}
void merge(int x,int y){x=find(x),y=find(y);if(x==y) return;fa[x]=y,siz[y]+=siz[x];}

int main(){
	scanf("%d",&N);
	for(int i=1;i<=N;i++) scanf("%d",&A[i]),A[0]^=A[i],idA[i]=i;
	for(int i=1;i<=N;i++) scanf("%d",&B[i]),B[0]^=B[i],idB[i]=i;
	d=A;sort(idA,idA+N+1,cmp);d=B;sort(idB,idB+N+1,cmp);
	for(int i=0;i<=N;i++){
		if(i==0) mA[idA[i]]=1; else mA[idA[i]]=mA[idA[i-1]]+1-(A[idA[i]]==A[idA[i-1]]);
		if(i==0) mB[idB[i]]=1; else mB[idB[i]]=mB[idB[i-1]]+1-(B[idB[i]]==B[idB[i-1]]);
		if(A[idA[i]]!=B[idB[i]]){printf("-1\n");return 0;}
	} 
	for(int i=1;i<=N+1;i++) fa[i]=i,siz[i]=1;
	int ans=0;
	for(int i=0;i<=N;i++) merge(mA[i],mB[i]),ans+=(mA[i]!=mB[i]);
	for(int i=1;i<=N+1;i++) if(fa[i]==i&&siz[i]>=2) ans+=1;
	if(siz[find(mA[0])]!=1){
		if(mA[0]==mB[0]) ans-=1;
		else ans-=2;
	}
	printf("%d\n",ans);
}
```