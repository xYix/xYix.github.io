---
title: AGC016F 题解 - Games on DAG
date: 2020-09-12 16:28:08
tags:
- 博弈论
---

[题目链接](https://atcoder.jp/contests/agc016/tasks/agc016_f)，[翻译链接](https://www.luogu.com.cn/problem/AT2390)

<!--more-->

博弈论有益身心健康~

首先两个石子是两个独立的子游戏，我们只需要求 $\text{SG}(1)=\text{SG}(2)$ 的方案数。

考虑 $1,2$ 都先手必败的情况。这时候枚举 $\text{SG}$ 值为 0 的子集 $\{1,2\}\subseteq A$，$B=N/A$。考虑边的情况。显然 $A$ 内部没有边，$B$ 内部可以任意有边，每个 $B$ 到 $A$ 至少一条边，$A$ 到 $B$ 任意有边。

那么 $1,2$ 的 $\text{SG}$ 不是 0 该怎么办呢？考虑抽掉所有的 0，然后 $B$ 集合的 $\text{SG}$ 已经默认都有至少一条边连向 $0$，而且 $B$ 集合内部没有任何 $0$，冷静分析一下就会发现这相当于 $B$ 集合的 $\text{SG}$ **全体加一**。

子集 DP 即可。代码如下。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p=1000000007;
void inline check(int &x){x-=p,x+=x>>31&p;}
int N,M;
int pow2[250];
int g[15][15];
int G[15][32768];

int F[32768];

int main(){
	scanf("%d%d",&N,&M);
	pow2[0]=1;for(int i=1;i<250;i++) check(pow2[i]=pow2[i-1]+pow2[i-1]);
	for(int i=1;i<=M;i++){
		int u,v;scanf("%d%d",&u,&v);u--;v--;
		g[u][v]=1;
	}
	for(int u=0;u<N;u++)
	for(int v=0;v<N;v++)
	for(int s=0;s<(1<<N);s++) if((s>>v)&1)
		G[u][s]+=g[u][v];
	for(int s=0;s<(1<<N);s++) if((s&3)==3){
		for(int A=s;A;A=(A-1)&s) if((A&3)==0){
			int B=s^A,tmp=F[B];
			for(int u=0;u<N;u++) if((B>>u)&1)
				tmp=1LL*tmp*(pow2[G[u][A]]-1)%p;
			for(int u=0;u<N;u++) if((A>>u)&1)
				tmp=1LL*tmp*pow2[G[u][B]]%p;
			check(F[s]+=tmp);
		}
		for(int A=s;A;A=(A-1)&s) if((A&3)==3){
			int B=s^A,tmp=1;
			for(int u=0;u<N;u++) if((B>>u)&1)
				tmp=1LL*tmp*(pow2[G[u][A]]-1)%p*pow2[G[u][B]]%p;
			for(int u=0;u<N;u++) if((A>>u)&1)
				tmp=1LL*tmp*pow2[G[u][B]]%p;
			check(F[s]+=tmp);
		}
	}
	printf("%d\n",(pow2[M]-F[(1<<N)-1]+p)%p);
}
```
