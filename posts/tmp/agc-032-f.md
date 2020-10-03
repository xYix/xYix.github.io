---
title: AGC032F 题解 - One Third
date: 2020-09-13 20:25:19
tags:
- 概率期望
---

[题目链接](https://atcoder.jp/contests/agc032/tasks/agc032_f)，[题目翻译](https://www.luogu.com.cn/problem/AT4521)

<!--more-->

考虑辐角，要求的就是 $\min|a-b-\dfrac{2\pi}{3}|$，也就是 $a$ 和 $b+\dfrac{2\pi}3$ 的距离。

考虑把原点集旋转 $\dfrac{2\pi}3$，称为类型 $1$，原点集就是类型 $0$，因为对称肯定是好的我们再复制一个旋转了 $\dfrac{4\pi}3$ 的点集称为类型 $2$。

然后有一个巧妙的转化：考虑把这个圆平均分成三份，显然这三份是几乎等价的，而且每个点在某一份的像只有一个，因此我们只考虑某一份即可。为了防止答案跨份，我们以某一刀比如第一刀作为我们考虑的这一份的边界。

转化成如下问题：

> 从 $(0,\dfrac{2\pi}3)$ 中均匀随机 $n-1$ 个实数，和 $0,\dfrac{2\pi}{3}$ ``sort`` 后排成一个序列 $a_0,a_1,...,a_n$，$t_0=0,t_n=1$，其他 $t_i$ 在 $\{0,1,2\}$ 中均匀随机，求
>
>$$\min_{t_i\neq t_j}|a_i-a_j|$$

首先，取到最小值的 $i,j$ 一定相邻，否则我们取一个在 $i,j$ 之间的元素，它的类型不可能同时等于 $i$ 和 $j$，于是我们得到了一个更小的答案。（这个结论也保证了现在答案不会跨份而且没必要特判 $i=0,j=n$）

接下来你可能需要一些[关于离散型随机变量的知识](https://xyix.github.io/2020/09/01/probability-expectation/#%E8%BF%9E%E7%BB%AD%E6%83%85%E5%BD%A2%E4%B8%8B%E7%9A%84%E9%9A%8F%E6%9C%BA%E5%8F%98%E9%87%8F)。我们介绍一个结论：在 $(0,1)$ 中随机 $n-1$ 个数，加上 $0,1$，两两差的绝对值的最小值的期望为 $\dfrac 1{n^2}$。证明如下。

> 设这个最小值为 $X$。考虑计算 $P(X\ge x)$，即 $\forall i,a_{i+1}-a_i\ge x$ 的概率。
>
> 不妨记$b_{i}=a_{i}-ix$，那么就有 $b_{i+1}-b_{i}\ge 0$。显然 $b_n=1-nx$。
>
> 显然一个 $a_i$ 序列和 $b_i$ 序列一一对应，那么 $a$ 满足条件的概率就是 $b$ 满足对应条件的概率：满足 $b_i$ 均落在 $(0,1-nx)$ 的概率。显然 $b_i$ 是在 $(-ix,1-ix)$ 内均匀随机，完全包含我们的目标区间，于是概率就是
>
> $$(1-nx)^n$$
>
> 应用一下整数期望公式：
> 
> $$\text{E}X=\int_0^{\frac 1 n}(1-nx)^n\text{dx}=\dfrac 1{n^2}$$

那么假设我们已经确定了 $X_1$ 为最小值，也就可以按上面的方法求出次小值 $\text{E}(X_2|X_1)=X_1+\dfrac{1-nX_1}{(n-1)^2}$，根据全期望公式得 $\text{E}X_2=\dfrac{1}{n^2}+\dfrac{n}{(n-1)}$。

以此类推有

$$\boxed{\text{E}X_k=\dfrac{1}{n}\sum_{i=1}^k\dfrac{1}{n-i+1}}$$

回到原问题。显然类型 $t$ 非常独立，于是最小值能取的概率为 $\dfrac 2 3$，最小值不能取而次小值能取的概率为 $\dfrac 2 9$……注意第 $n$ 小值，如果前 $n-1$ 小值全不能取，那么此时前缀的类型全是 0，后缀的类型全是 1，于是第 $n$ 小值必然能取，概率就是 $\dfrac 1{3^{n-1}}$。

于是这题就做完了。

代码如下：

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxN=1000005,p=1000000007;
int N;
int H[maxN];
int fac[maxN],ifac[maxN],inv[maxN];
int qpow(int a,int k){
    int ans=1;
    while(k){
        if(k&1) ans=1LL*ans*a%p;
        a=1LL*a*a%p;
        k>>=1;
    }
    return ans;
}
void inline check(int &x){x-=p,x+=x>>31&p;}
void init(){
    fac[0]=ifac[0]=fac[1]=ifac[1]=inv[1]=H[1]=1;
    for(int i=2;i<maxN;i++)
    	fac[i]=1LL*fac[i-1]*i%p,
    	inv[i]=1LL*(p-p/i)*inv[p%i]%p,
    	ifac[i]=1LL*ifac[i-1]*inv[i]%p,
    	check(H[i]=H[i-1]+inv[i]);
}

int main(){
	init();
	scanf("%d",&N);
	int ans=0;
	for(int i=1,mul=inv[3];i<=N;i++,mul=1LL*mul*inv[3]%p){
		if(i==N) mul=3LL*mul%p*inv[2]%p;
		check(ans+=1LL*inv[N]*(H[N]-H[N-i]+p)%p*mul%p*2%p);
	}
	printf("%d\n",1LL*ans*inv[3]%p);
}
```