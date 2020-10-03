---
title: 单纯形法学习笔记（搬运）
date: 2020-09-07 17:36:47
tags:
- 数学
- 线性代数
- 线性规划
- $\color{red}精品$
---

解决线性规划。不是多项式算法，但是跑的很快。

<!--more-->

我们容易把线性规划问题转化成如下的一般形式：

- 给出 $M$ 条互相线性无关的约束条件和 $N$ 个变量 $x_i$（$M<N$，否则不需要线性规划而是有不多于一个解），第 $i$ 条形如

$$
\sum a_{i,j}x_j=b_i
$$

- 同时要满足 $x_j\ge 0$。（如果有不需要满足这个非负限制的元素，则转化为两个 $x$ 的差）

- 求 $\max \sum c_ix_i$。

不过常见的线性规划一般是形如

$$
\sum a_{i,j}x_j\ge b_i
$$

这时加入 $M$ 个变量 $x_{N+1},x_{N+2},...,x_{N+M}$，得到

$$
\sum a_{i,j}x_j+x_{N+i}= b_i
$$

容易发现此时 $M<N$ 和线性无关的性质就自动满足了。

下面为了方便操作把它转化成矩阵的形式：

设 $A_{i,j}=a_{i,j},C_{1,i}=c_i,B_{i,1}=b_i,X_{i,1}=x_i$，则可以记成

$$
\begin{cases}AX=B\\x_i\ge 0\\\text{求}\max CX\end{cases}
$$

准备工作完成，接下来介绍单纯形法。

## 基解

首先把 $A$ 拆成 $N$ 个列向量 $P_i$。选出其中 $M$ 个，因为约束条件互相线性无关，所以可以把这几个 $P$ 作为基向量，把其他的 $P$ 用它们的线性组合表示。$P$ 对应的 $x$ 就称为基变量。

设基向量构成的矩阵为 $A_B$，非基向量构成的矩阵为 $A_N$。基变量组成的列向量为 $X_B$，非基变量组成的列向量为 $X_N$。于是约束可以写成

$$
(A_B\ A_N){X_B\choose X_N}=B
$$

即

$$
A_BX_B+A_NX_N=B
$$

两边乘以 $A_B^{-1}$，得

$$
X_B=A_{B}^{-1}B-A_{B}^{-1}A_NX_N
$$

我们称一类特殊的解，$X_{N}$ 全为 $0$ 的解，即 $X={A_{B}^{-1}B\choose 0}$ 的解，称为**基解**。还满足 $x\ge 0$ 的基解称为**基可行解**。

有一个结论：至少有一组使得 $CX$ 最大的 $X$ 是基解。于是我们只关心所有的基解就可以了。 

可是总共有 $C_{M}^{N}$ 个基解，总不能都求一遍吧……

我们的策略是，从某个基变量的选择方案开始不断调整。

## 判断一个方案是否是最优方案

显然，如果我们可以调整 $X_N$ 的值使得答案更小那么这个方案就不是最优方案。下面把 $X_N$ 看成变量。

$CX$ 可以拆成：

$$
C_BX_B+C_NX_N
$$

$$
C_B(A_{B}^{-1}B-A_{B}^{-1}A_NX_N)+C_NX_N
$$

$$
C_BA^{-1}_BB+(C_N-C_BA_B^{-1}A_N)X_N
$$

前面的 $C_BA_B^{-1}B$ 是常量。

好的，显然，如果 $C_N-C_BA_B^{-1}A_N$ 的元素都大于等于零，那么显然这就是一个最优方案。

## 调整

我们的调整方式是，找一个基内元素和基外元素并交换。

### 入基元素

$C_N-C_BA_B^{-1}A_N$ 系数最小的那个。设这个元素为 $x_d$。

### 出基元素

原来 $x_d$ 为 0，现在我们希望令它为 $x'_d$。当然其他基元素也会因此更改，我们看一下是什么情况。

把 $P_d$ 用当前基向量的线性组合表示：

$$
P_d=\sum y_iP_i
$$

即

$$
A_By=P_d
$$

再联系一下

$$
A_BX_B=B
$$

于是可以写出：

$$
A_B(X_B-x'_dy)+P_dx'_d=B
$$

即原来的基向量会变化成

$$
x'_i=x_i-x'_dy_i
$$

因为要满足 $x'_i\ge 0$，于是令 $x'_d=\min \dfrac {x_i}{y_i}$。这个 $x'_i=0$ 的元素就出基。

## 对偶问题

$$
\begin{cases}AX=B\\X\ge 0\\\text{求}\max CX\end{cases}
$$

和

$$
\begin{cases}A^TY=C^T\\Y\ge 0\\\text{求}\min B^TY\end{cases}
$$

的答案是相等的。这两个问题互为对偶问题。~~所以如果要求的是最小值你又懒得改板子的话可以直接对偶一下。~~

## 代码实现

别看我 BB 了一大堆代码倒是出人意料地短？

初始基即所有不实际存在的 $M$ 个变量。这里初始解是所有基变量全为 $b_i$，非基变量全为 0。（当 $b_i$ 不全大于等于 0 时这个解可能不合法，所以需要一些处理，下面讲）

如果 $b_i$ 不全大于等于 0，需要如下操作：

- 强行把基变量设为 $b_i$，非基变量设为 $0$。

- 重复下面的操作：

- 找一个值小于 0 的基变量 $u$ 和一个 $A[u][v]$ 为正的非基变量 $v$。``Pivot(u,v)`` 

- 如果找到了 $u$ 但找不到 $v$，原线性规划无解；如果找不到 $u$ 那么你已经找到了一个合法的初始解。

uoj\#179 代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;

const double eps=1e-8,inf=1e9;
const int maxM=25,maxN=25;
int N,M,typ;
double A[maxM][maxN];
int id[maxN+maxM],iid[maxN+maxM];

bool flg;
void Pivot(int u,int v){
	swap(id[u],id[v+N]);
    for(int i=0;i<=N;i++) if(i!=u) A[v][i]/=-A[v][u];
    A[v][u]=1/A[v][u];
    for(int i=0;i<=M;i++) if(i!=v&&abs(A[i][u])>eps){
        for(int j=0;j<=N;j++) if(j!=u) A[i][j]+=A[i][u]*A[v][j];
        A[i][u]*=A[v][u];
    } 
}
void Solve(){
	for(int i=1;i<=N;i++) id[i]=i;
    while(1){
        int u,v=0;
        for(int i=1;i<=M;i++) if(A[i][0]<-eps&&(v==0||A[i][0]<A[v][0])) v=i;
        if(!v) break;
        for(u=1;u<=N;u++) if(A[v][u]>eps) break;
        if(u>N){printf("Infeasible\n");flg=1;return;}
        Pivot(u,v);
    }
    while(1){
        int u,v=0;
        for(u=1;u<=N;u++) if(A[0][u]>eps) break;
		if(u>N) return; 
        for(int i=1;i<=M;i++) if(A[i][u]<-eps&&(v==0||A[i][0]/A[i][u]>A[v][0]/A[v][u])) v=i;
        if(!v){printf("Unbounded\n");flg=1;return;}
        Pivot(u,v);
    }
}

int main(){
	scanf("%d%d%d",&N,&M,&typ);
	for(int i=1;i<=N;i++) scanf("%lf",&A[0][i]);
	for(int i=1;i<=M;i++){
		for(int j=1;j<=N;j++) scanf("%lf",&A[i][j]),A[i][j]*=-1;
		scanf("%lf",&A[i][0]);
	}
	Solve();
	if(!flg) printf("%.9lf\n",A[0][0]);
	if(!flg&&typ){
		for(int i=N+1;i<=N+M;i++) iid[id[i]]=i;
		for(int i=1;i<=N;i++) if(iid[i]) printf("%.9lf ",A[iid[i]-N][0]);else printf("0.000000000 ");
	}
} 
```
