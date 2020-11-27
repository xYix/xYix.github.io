---
title: uoj91 题解 - 【集训队互测2015】最大异或和
---

~~紧策出的高质量好题~~

> **题目大意.** 有一行 $n\le 2000$ 个整数，均 $\le 2^m(m\le 2000)$，你需要支持
>
> - 区间异或上一个数 $w$
> - 区间修改为一个数 $w$
> - 从 $a_1,...,a_n$ 中选出任意多个数使其异或和最大，输出它
>
> 操作数 $\le 2000$。

下面把异或简记为 $+$，与简记为 $\cdot$ 或 $\times$。

显然我们需要维护线性基。**线性基是可以支持 $\mathbf{O(nm)}$ 删除/修改的。**先考虑修改一个元素的情况。

记原矩阵为 $A=(a_1,...,a_n)$，**消元过程**本身也是一个线性变换 $P$，记 $B=PA$。注意 $B$ 中除了作为基的行，还要留一些行记录曾经的**失败插入**（称为**非基行**），这些行在 $B$ 中值为 $0$（毕竟插入失败了），但是在 $P$ 中非零。你很快会知道这是为什么要保存它们。

当 $a_i\leftarrow a_i+w$，那么 $A\leftarrow A +(0,...,w,...,0)$，故 $B\leftarrow B+P(0,...,w,...,0)$，即
$$
b_j\leftarrow\begin{cases}b_j&(p_{j,i}=0)\\b_j+w&(p_{j,i}=1)\end{cases}
$$
为了消除 $w$，我们不妨用 $p_{J,i}=1$ 的某非基的一行 $J$ 把其他行消掉，即 $b_j\leftarrow b_j+b_{J},p_j\leftarrow p_j+p_J$，而 $b_J=w$，完全胜利，$b$ 没有被影响。我们再把工具人 $J$ 大力插回去即可。

那么问题来了，**如果不存在 $\mathbf J$ 呢？**我们得认真思考一下这个问题。考虑 $p_{j,i}=1$ 且主元最高的那一行，它就是 $a_i$ 被插入时的位置。存在非基的 $J$，这意味着 $J$ 的地位与它相同：如果 $J$ 早来一点它就入基了。从而不存在非基的 $J$ 说明 $a_i$ 是**不可替代**的，失去了 $a_i$ 令基的秩下降了。

我们先用一个 $p_{J',i}=1$ 且主元最低的一行 $J'$ 消掉其他行的 $p_{*,i}$（要求主元最低是为了保护其他行的主元），然后删掉 $J'$ 再重新插入。不会有非基行因此入基，因为秩必须下降。

原题的两种操作也就很显然了，只需要把 $a_i$ 改为其差分。

```cpp
#include<bits/stdc++.h>
using namespace std;

int N, M, Q;
typedef bitset<2005> Z;
Z A[2005], P[2005], B[2005];
int bas[2005];
void Insert(int id) {
	for(int i = M - 1; i >= 0; i--) if(B[id][i])
		if(bas[i] != -1) B[id] ^= B[bas[i]], P[id] ^= P[bas[i]];
		else { bas[i] = id; return; }
}
void Xor(int id, Z w) {
	if(w.none()) return;
	int J = -1;
	for(int j = 1; j <= N; j++) if(B[j].none() && P[j][id]) { J = j; break; }
	if(J == -1)
		for(int j = 0; j < M; j++) if(bas[j] != -1 && P[bas[j]][id]) { J = bas[j]; bas[j] = -1; break; }
	if(J == -1) { printf("QAQ\n"); exit(0); }
	for(int j = 1; j <= N; j++) if(j != J && P[j][id]) B[j] ^= B[J], P[j] ^= P[J];
	B[J] ^= w; Insert(J);
}

int main() {
	cin >> N >> M >> Q;
	for(int i = M - 1; i >= 0; i--) bas[i] = -1;
	for(int i = 1; i <= N; i++) cin >> A[i], B[i] = A[i] ^ A[i - 1], P[i][i] = 1, Insert(i);
	while(Q--) {
		int opt; cin >> opt;
		if(opt == 1) {
			int l, r; Z w; cin >> l >> r >> w;
			Xor(l, w); if(r + 1 <= N) Xor(r + 1, w);
			for(int i = l; i <= r; i++) A[i] ^= w;
		}
		if(opt == 2) {
			int l, r; Z w; cin >> l >> r >> w;
			Xor(l, A[l] ^ w); if(r + 1 <= N) Xor(r + 1, A[r] ^ w);
			for(int i = l + 1; i <= r; i++) Xor(i, A[i] ^ A[i - 1]);
			for(int i = l; i <= r; i++) A[i] = w;
		}
		if(opt == 3) {
			Z ans = 0;
			for(int i = M - 1; i >= 0; i--)
				if(!ans[i])
					if(bas[i] != -1) ans ^= B[bas[i]], printf("1");
					else printf("0");
				else printf("1");
			printf("\n");
		}
	}
}
```

