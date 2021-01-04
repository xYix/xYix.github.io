---
title: ioi2020 集训队作业 AT 部分口胡（上）
---

你可能会很惊讶，标题是打错了吧，应该是 ioi2021 吧

但是 x义x 也很惊讶，他就是没做 ioi2020hw，可能是他太菜了

我奉 hhz 的圣旨来胡一下罢

- $\text{queuing}$：尚无题解
- $\color{blue}\text{skipped}$：题解~~口胡~~已完成，代码鸽了
- $\color{green}\text{accepted}$：题解已完成，代码已经通过
- $\color{red}\text{unsolved}$：xyx 认定此题他不会做，于是跳过

|  题号   |                            题目名                            |             状态             | 是否看题解 |
| :-----: | :----------------------------------------------------------: | :--------------------------: | :--------: |
| AGC020D | [Min Max Repetition](https://atcoder.jp/contests/agc020/tasks/agc020_d) | $\color{blue}\text{skipped}$ |     否     |
| AGC020E | [Encoding Subsets](https://atcoder.jp/contests/agc020/tasks/agc020_e) |      $\color{blue}\text{skipped}$      |     是     |
| AGC020F | [Arcs on a Circle](https://atcoder.jp/contests/agc020/tasks/agc020_f) | $\color{blue}\text{skipped}$ |     否     |
| AGC021E | [Ball Eat Chameleons](https://atcoder.jp/contests/agc021/tasks/agc021_e) |          $\color{blue}\text{skipped}$          | 是 |
| AGC021F | [Trinity](https://atcoder.jp/contests/agc021/tasks/agc021_f) | $\color{green}\text{accepted}$ | 否 |
| AGC022D | [Shopping](https://atcoder.jp/contests/agc022/tasks/agc022_d) | $\color{blue}\text{skipped}$ | 是 |
| AGC022E | [Median Replace](https://atcoder.jp/contests/agc022/tasks/agc022_e) | $\color{blue}\text{skipped}$ | 是 |
| AGC022F | [Checkers](https://atcoder.jp/contests/agc022/tasks/agc022_f) | $\color{green}\text{accepted}$ | 否 |
| AGC023D | [Go Home](https://atcoder.jp/contests/agc023/tasks/agc023_d) | $\color{green}\text{accepted}$ | 否 |
| AGC023E | [Inversions](https://atcoder.jp/contests/agc023/tasks/agc023_e) | $\color{blue}\text{skipped}$ | 是 |
| AGC023F | [01 on Tree](https://atcoder.jp/contests/agc023/tasks/agc023_f) | $\color{green}\text{accepted}$ | 否 |
| AGC024D | [Isomorphism Freak](https://atcoder.jp/contests/agc024/tasks/agc024_d) | $\color{blue}\text{skipped}$ | 否 |
| AGC024E | [Sequence Growing Hard](https://atcoder.jp/contests/agc024/tasks/agc024_e) | $\color{blue}\text{skipped}$ | 是 |
| AGC024F | [Simple Subsequence Problem](https://atcoder.jp/contests/agc024/tasks/agc024_f) | $\color{blue}\text{skipped}$ | 否 |
| AGC025D | [Choosing Points](https://atcoder.jp/contests/agc025/tasks/agc025_d) | $\color{blue}\text{skipped}$ | 否 |
| AGC025E | [Walking on a Tree](https://atcoder.jp/contests/agc025/tasks/agc025_e) | $\color{blue}\text{skipped}$ | 是 |
| AGC025F | [Addition and Andition](https://atcoder.jp/contests/agc025/tasks/agc025_e) | $\color{red}\text{unsolved}$ | 是 |
| AGC026D | [Histogram Coloring](https://atcoder.jp/contests/agc026/tasks/agc026_d) | $\color{blue}\text{skipped}$ | 否 |
| AGC026E | [Synchronized Subsequence](https://atcoder.jp/contests/agc026/tasks/agc026_e) | $\color{green}\text{accepted}$ | 是 |
| AGC026F | [Manju Game](https://atcoder.jp/contests/agc026/tasks/agc026_f) | $\color{blue}\text{skipped}$ | 否 |
| AGC027D | [Modulo Matrix](https://atcoder.jp/contests/agc027/tasks/agc027_d) | $\color{blue}\text{skipped}$ | 是 |
| AGC027E | [ABBreviate](https://atcoder.jp/contests/agc027/tasks/agc027_e) | $\color{green}\text{accepted}$ | 否 |
| AGC027F | [Grafting](https://atcoder.jp/contests/agc027/tasks/agc027_f) | $\color{green}\text{accepted}$ | 是 |
| AGC028C | [Min Cost Cycle](https://atcoder.jp/contests/agc028/tasks/agc028_c) | $\color{blue}\text{skipped}$ | 否 |
| AGC028D | [Chords](https://atcoder.jp/contests/agc028/tasks/agc028_d) | $\color{green}\text{accepted}$ | 否 |
| AGC028E | [High Elements](https://atcoder.jp/contests/agc028/tasks/agc028_e) | $\color{blue}\text{skipped}$ | 是 |
| AGC028F | [Reachable Cells](https://atcoder.jp/contests/agc028/tasks/agc028_e) | $\color{red}\text{unsolved}$ | 是 |

# AGC020D - 最大重复的最小值

怎么开幕雷击整了个构造

好像是个思博题，为啥数据范围开这么小

哦原来确实是个思博题，skip

# AGC020E - 加密子集

⑧会，爬了。

果然是个鬼乱搞。暴力 DP 复杂度是对的就离谱……据说状态数上界 $O(n^3+2^{\frac{n}{8}})$。

因为对出题人出乱搞的行为非常气愤，所以 skip 了。

# AGC020F - 圆上的弧

好像是个经典套路。显然离散情况是思博题，注意到 $N,C$ 巨小无比，而且 $l_i$ 全是整数，我们爆枚 $l_i$ 放置位置的小数部分的大小关系，每种情况发生概率都是 $\dfrac{1}{N!}$。

听起来要 inf 个分类讨论，不写了，skipskip 都可以 skip

# AGC021E - 球吃变色龙

球吃变色龙生草，⑧会，爬了

这个“两个方案不同当且仅当至少一次喂的球颜色不同”非常的怪。先考虑只有一条变色龙。把红球看成 +1，蓝球看成 -1，那么序列可以看成一条折线，终点必须是 $(k,0),(k,1),...$，而且不能经过 $(k-1,-1)$。把坐标系旋转 45 度易知答案大概是一个和组合数有关的式子。

但是多只变色龙的时候非常麻烦，因为投食序列不唯一。考虑枚举红球数量 $r$。$r<k-r$ 任意排列必然无解不讨论，$r\ge k-r+n$ 任意排列必然有解不讨论。

否则我们一定可以把一个序列“规范化”，每个变色龙要么是 +1 要么是 0，+1 的数量恰好是 $2r-k$。

+1 的变色龙显然可以以任意顺序吃，而 0 的变色龙等价于红蓝（否则可以丢到 +1 龙上）。也就是可以从原序列取出 $n+k-2r$ 个红蓝子序列，从而还等价于任意一个前缀 $\ge r-n$。于是还是一个折线问题，组合数搞一下就好了。

# AGC021F - 三位一体

题目名字好中二，不过我喜欢

> 话说如果以后各位看到了标题为“明星银河号”“彗星蜜月”或者“月光 music”的题的话不建议开，因为这三首我最喜欢的歌肯定是要留给三道最毒瘤的题的

列很少，考虑按列 DP。考虑插入一些行，这些行第一次出现黑格就是在这一列。然后分类讨论 BC 是新加的行还是原有的行。发现这 DP 是个卷积，然后就过了。

兄啊你这 F 怎么比 E 水这么多啊（疑惑）

```cpp
#include<bits/stdc++.h>
using namespace std;
 
const int p=998244353,maxN=1<<15,g=3,ig=332748118;
int W[maxN],iW[maxN];
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
 
int R[maxN];
void NTT(int d[],int n0,bool flg){
    int x=1,len=0;while(x<n0) x<<=1,len++;
    for(int i=0;i<x;i++){
        R[i]=(R[i>>1]>>1)|((i&1)<<(len-1));
        if(i<R[i]) swap(d[i],d[R[i]]);
    }
    for(int i=1,l=maxN/(i<<1);i<x;i<<=1,l>>=1)
    for(int j=0;j<x;j+=(i<<1))
    for(int k=0,u=0;k<i;k++,u+=l){
        int a0=d[j|k],a1=1LL*(flg?iW[u]:W[u])*d[j|i|k]%p;
        d[j|k]=(a0+a1)%p;d[j|i|k]=a0-a1+p;
    	if(d[j|i|k]>=p)d[j|i|k]-=p;
	}
    if(flg){
        int invx=qpow(x,p-2);
        for(int i=0;i<x;i++) d[i]=1LL*d[i]*invx%p;
    }
}
 
int N,M;
 
int F[205][maxN];
int G[maxN],H[maxN];
 
int C(int n,int m){
	if(n<m) return 0;
	return 1LL*fac[n]*ifac[m]%p*ifac[n-m]%p;
}
 
int main(){
	int w=qpow(g,(p-1)/maxN),iw=qpow(ig,(p-1)/maxN);
    W[0]=iW[0]=1;
    for(int i=1;i<maxN;i++)
        W[i]=1LL*W[i-1]*w%p,
        iW[i]=1LL*iW[i-1]*iw%p;
    inv[1]=ifac[0]=ifac[1]=fac[0]=fac[1]=1;
    for(int i=2;i<maxN;i++)
    	inv[i]=1LL*(p-p/i)*inv[p%i]%p,
    	fac[i]=1LL*fac[i-1]*i%p,
    	ifac[i]=1LL*ifac[i-1]*inv[i]%p;
    
    scanf("%d%d",&N,&M);
    F[0][0]=1;
    int n0=1;while(n0<((N+3)<<1)) n0<<=1;
    for(int j=1;j<=M;j++){
    	for(int i=0;i<n0;i++) G[i]=0;
    	for(int i=0;i<=N;i++) G[i]=1LL*F[j-1][i]*ifac[i]%p;
    	for(int i=0;i<n0;i++) H[i]=0;
    	for(int i=1;i<=N;i++) H[i]=ifac[i+2];
    	NTT(G,n0,0);NTT(H,n0,0);
    	for(int i=0;i<n0;i++) G[i]=1LL*G[i]*H[i]%p;
    	NTT(G,n0,1);
    	for(int i=0;i<=N;i++) F[j][i]=(1LL*fac[i+2]*G[i]%p+1LL*(1+i+C(i,2))%p*F[j-1][i]%p)%p;
	}
	
	int ans=0;
	for(int i=0;i<=N;i++) ans=(ans+1LL*C(N,i)*F[M][i]%p)%p;
	printf("%d\n",ans);
}
```

# AGC022D - 购物

⑧会，爬了

考虑可以把 $t_i$ 都模上 $2L$，这对我们的策略没有影响。那么对于一个商场

- 要么在下次车来就立即上车，时间上肯定比 $2L$ 优
- 否则车开一个来回一定可以，相当于跳过这个商场并获得 $2L$ 的惩罚

而能不能做到下次车来就立即上车还要看是从左边进还是从右边进。记左边可行为 $l_i=1$，右边可行为 $r_i=1$。

首先有一个方案是从商场 $1$ 开始统统 $2L$ 一直到 $n$，然后我们考虑调整这个方案。

考虑一个 $l_i=1$，我们当然可以利用这个性质，但是如果没有某个 $r=1$ 和它配合那还是白给。这引出下面的策略。

对于一个 $r_i =1, l_j =1, i <j$，我们发现可以在轮到 $i$ 之前先访问 $j$，这样 $j$ 的贡献就清零了，相当于合成了一个 $l=l_i,r=r_j$ 的新商场。接下来的策略就比较 naive（但是复杂）了。

又是大细节题，skip skip

# AGC022E - 中位数取代

⑧会，爬了

看起来是一个 DP 套 DP 的题，那么我们先考虑没有 $?$ 时的策略。首先 $000$ 必然先消掉。考虑 $01$ 和 $10$，因为 $000$ 已经没了所以拆掉它们并不赚，而直接消掉不亏，所以直接消掉。最后再考虑 $111$。

而这题还有个 $?$，我们考虑 DP。我们的策略是在手里持有几个元素（这样做的意义是，比如，如果手里有两个 $0$ 可能可以等下一个 $0$ 把它们消掉）。这几个元素可以看成一个栈。显然栈顶的 $1$ 没有意义（可以和 $0$ 一起消失，而且存着没用，等着变成 $111$ 坑自己吗），所以这个栈是一串 $0$ 和一串 $1$ 构成的。我们分析当新考虑一个元素会发生什么。

- 加入 $0$：如果栈顶是 $00$，消掉。如果栈顶是 $1$ 或 $10$ 先入栈。
- 加入 $1$：如果栈顶是 $0$，消掉。如果栈顶是 $11$，事实上这时胜局已定，因为即使接下来是糟糕如 $00100100100...$ 的情况最多也只能消掉栈中的两个 $1$。否则入栈。

你会发现栈的情况巨少无比，是一个自动机，于是 DP 即可。

# AGC022F - 棋子

考虑变换 $x,y\rightarrow 2y -x$。那么我们可以考虑在这时给 $x,y$ 新建一个父亲，左儿子是 $y$ 右儿子是 $x$，有点像重构树。那么每个点的贡献就只和根的路径上左向边的数量和右向边的数量有关，显然由于那个 $10^{100}$ 的存在贡献不同根的取值就不同。

考虑把树旋转 45 度，大概长成左图这个样子

<center><div style="width:90%;margin:auto"><img src="/images/at1.png" style="width: 70%" alt=""></div></center>

如果按照贡献是否相等决定点是否叠在一起就变成了右图。

我们考虑一行一行地把叶子分裂成两个儿子，设 ``f[i][j1][j2]`` 表示现在有 $i$ 个叶子在前几行故已经固定，$j_1$ 个叶子“活动”且贡献为负，$j_2$ 个叶子“活动”且贡献为正。转移非常 simple，而且显然行数可以隐去，$O(n^5)$ 可以通过。还有一个观察是 $j_1-j_2$ 相等意味着 DP 值相等，于是就优化到了 $O(n^4)$。

$O(n^5)$ 代码如下。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p = 1000000007, maxN = 105;
int N;
struct Z {int x; Z(int x0 = 0) : x(x0) {}};
int inline check(int x) { return x >= p ? x - p : x; }
Z operator+(const Z a, const Z b) { return check(a.x + b.x); }
Z operator-(const Z a, const Z b) { return check(a.x - b.x + p); }
Z operator*(const Z a, const Z b) { return 1LL * a.x * b.x % p; }
Z operator-(const Z a) { return check(p - a.x); }
Z &operator+=(Z &a, const Z b) { return a = a + b; }
Z &operator-=(Z &a, const Z b) { return a = a - b; }
Z &operator*=(Z &a, const Z b) { return a = a * b; }
Z fac[maxN], ifac[maxN], inv[maxN];
Z qpow(Z a, int k) {Z ans = 1; while (k) {if (k & 1) ans *= a; a *= a; k >>= 1;} return ans;}
void init() {
    fac[0] = ifac[0] = fac[1] = ifac[1] = inv[1] = 1;
    for (int i = 2; i < maxN; i++)
        fac[i] = fac[i - 1] * i, inv[i] = (p - p / i) * inv[p % i], ifac[i] = ifac[i - 1] * inv[i];
}

Z F[maxN][maxN][maxN];

int main(){
	init();
	scanf("%d", &N);
	F[0][1][0] = 1;
	for(int i = 0; i < N; i++)
	for(int j0 = 0; j0 <= N - i; j0++)
	for(int j1 = 0; j1 <= N - i - j0; j1++) if(j0 || j1){
		for(int tj0 = 0; tj0 <= N; tj0++)
		for(int tj1 = 0; tj1 <= N; tj1++) if(j0 - tj0 + tj1 >= 0 && j1 - tj1 + tj0 >= 0)
			F[i + j0 + j1][tj0][tj1] += F[i][j0][j1] * ifac[j0 - tj0 + tj1] * ifac[j1 - tj1 + tj0];
	}
	printf("%d\n", F[N][0][0] * fac[N]);
	
	return 0;
}

```

## 思考

如果 $x,y\rightarrow 2y-x$ 改为 $x,y\rightarrow 3y -2x$ 是否有多项式做法？（网格中的任意一点贡献不相同）

# AGC023D - 回家

第一轮投票显然是往人多的方向开，不妨设为左边。那么这会一直开到左边的人小于右边为止，然后又变换方向，如此反复……吗？

$N$ 号楼的人不可能对这种情况置之不理，如果有这种反复横跳导致时间延长的情况，他们一定会一直向左投。我们甚至可以证明，如果 $a_1>a_n$ 那么不管车的位置在哪，它一定先访问 $x_1$ 再访问 $x_n$。

- 如果 $x_{n-1}<s$，那么所有其他人都会向左投，而 $a_1>a_n$，故一定会向左开。
- 否则 $s<x_{n-1}$，此时访问 $x_{n}$ 前必然会先访问 $x_{n-1}$，这时会使得形势立即转化为上一种情况。

那么 $a_n$ 一定会跟 $a_1$ 的票，我们可以把它们合并。迭代这样的过程，直到 $S$ 不在目标区间内，这时所有人都达成共识。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

int N, S;
int X[100005]; ll A[100005];
ll ANS;
int Solve(int l, int r) {
	if(S < X[l]) return ANS += X[r] - S, r;
	if(S > X[r]) return ANS += S - X[l], l;
	if(A[l] >= A[r]) {
		A[l] += A[r];
		ANS += X[r] - X[Solve(l, r - 1)];
		return r;
	}
	else {
		A[r] += A[l];
		ANS += X[Solve(l + 1, r)] - X[l];
		return l;
	}
}

int main() {
	scanf("%d%d", &N, &S);
	for(int i = 1; i <= N; i++) scanf("%d%d", &X[i], &A[i]);
	Solve(1, N); 
	printf("%lld\n", ANS);
}
```

# AGC023E - 逆序对

⑧会，爬了

首先给一个 $a_i$ 序列求有多少个条件满足它这很简单，就是记 $c_i=\sum_j[a_j\ge i]$，则答案为 $\prod (cnt_i-n+i)$（一直往排序后 $\prod (a_i-i+1)$ 上去想，结果去世了……）。

那么考虑计算一对 $(i,j)\quad(i<j)$ 会在多少个排列中成为逆序对。

- $a_i= a_j$，$i,j$ 对称，就是总方案数 $/2$。
- $a_i<a_j$，当 $p_j\in (a_i,a_j]$ 时不会是逆序对，否则和上面一样。但是注意 $a_j$ 的改变会使 $cnt_i,i\in(a_i,a_j]$ 减 1，我们维护区间积和减一后的区间积，前缀积即可。
- $a_i>a_j$ 同理。

但是暴力枚举 $i,j$ 还是 $O(n^2)$ 的，我们只需要考虑 $a_i$ 作为 $\min$ 的次数即可。

# AGC023F - 树上的 01

显然有 $0$ 我们就会立即贪心的取掉，所以我们可以把 $0$ 绑定到它的最低的为 $1$ 的祖先处。这样每个 $1$ 都附带了一个权值 $a_i$，如果它是第 $j$ 个被取的，则贡献为 $ja_i$。

考虑合并 $a_i$ 序列。长度很短但是和很大的子节点有极大的“意向”立即接到父节点的末尾，而我们发现任何 $a_i$ 序列都可以通过合适的合并顺序达成，所以只要合适地处理合并即可。

下一步是量化“意向”，考察交换两个儿子对答案的影响容易得出一个合理的标准是 $\dfrac{\sum a_i}{|a|}$。从而我们只需要用一个堆维护它。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN = 200005;

int N, p[maxN], c[maxN], A[maxN];
struct node {
	ll s; int c, p; //scp 草 
	bool operator <(const node b) const {
		if(s * b.c != b.s * c) return s * b.c < b.s * c;
		if(p != b.p) return p < b.p;
		return c < b.c;
	}
}nowA[maxN]; priority_queue<node> Q, Q0;
ll ans;
int fa[maxN]; int find(int x) {return fa[x] == x ? x : fa[x] = find(fa[x]);}

int main() {
	scanf("%d", &N);
	for(int i = 2; i <= N; i++) scanf("%d", &p[i]);
	for(int i = 1; i <= N; i++) scanf("%d", &c[i]); c[0] = 1;
	for(int i = N; i; i--)
		if(!c[i]) A[p[i]] += A[i] + 1;
		else {
			int u = p[i]; while(!c[u]) u = p[u]; p[i] = u;
			Q.push(nowA[i] = (node){A[i], 1, i});
			fa[i] = i;
		}
	nowA[0] = (node){A[0], 1, 0};
	while(Q.size()) {
		node u = Q.top(); Q.pop();
		if(Q0.size() && Q0.top().p == u.p && Q0.top().c == u.c) {Q0.pop(); continue;}
		node v = nowA[fa[u.p] = find(p[u.p])];
//		cerr << "merge " << u.p << " -> " << p[u.p] << " : " << v.p << "\n";
		ans += v.c * u.s;
		nowA[v.p] = (node){u.s + v.s, u.c + v.c, v.p};
		if(v.p) Q.push(nowA[v.p]), Q0.push(v);
	}
	printf("%lld\n", ans);
}
```

# AGC024D - 同构怪

自动机怪（联想）

考虑如果两个点同构，我们来证明，它们中间的这条链是关于它的中点（可能是点也可能是边）对称的。假设不然，那么容易发现这时我们必须无限地加边来保持同构性，这是不可能的。

从而，我们得到一个根，这个根两边的点分别同构。

<center><div style="width:90%;margin:auto"><img src="/images/at2.png" style="width: 70%" alt=""></div></center>

对于边的情况，这时根已经是最高级的根，不会再变动；对于点的情况，在红色部分可能有一个更高的根。至少这告诉我们，这个图一定有一个根，一切对称都围绕它展开。

那么我们考虑最对称的情况当然是和根距离相等的点全部同构。那么根的选取也就不言而喻了。

接下来考虑让叶子数最小。这直接等价于相同深度的点度数相同。

暴力选取根即可。

# AGC024E - 生长序列 Hard

⑧会，爬了

$n\le 100$，模数任意，这很 AT……

显然这个序列组可以看成往一个序列里插入元素的过程，插入时序列里的下一个元素必须比当前插入的严格小，或者是插入在序列末尾。

考虑这样一个树形结构，每个节点有两个标记：权值 $w$ 和插入的时间 $t$。这样一棵树合法当且仅当对于任意 $u\rightarrow v, w_u>w_v,t_u<t_v$。

那么 DP 就很显然了。

# AGC024F - 基础子序列练习题

我们考虑一个串对它子序列的贡献，使用一个子序列自动机的模型。假设现在匹配到了 $s$，还剩 $t$ 可供匹配，则我们可以

- 立即结束匹配，$s$ 获得贡献 +1
- $s\leftarrow s + 0$，删掉 $t$ 前面的一串 $1$ 和第一个 $0$
- $s\leftarrow s +1$，删掉 $t$ 前面的一串 $0$ 和第一个 $1$

那么我们从 $\sum (\varnothing,t\in S)$ 开始，每走到 $(s,\varnothing)$ 便给 $s$ 的贡献 +1，又观察到 $|s|+|t|\le n$，DP 也就立即浮现了。

# AGC025D - 选点

怎么又是构造草

首先考虑如果只有一个 $D$ 怎么做。我们可以判掉 $D=4k+3$ 的情况，这时根本没有距离为 $\sqrt D$ 的点对。否则如果 $D=4k+2$，则两个距离为 $\sqrt D$  的点横纵坐标差都是奇数，故 4 中颜色内部不会有限制，取其中两种即可。如果 $D=4k+1$，类似，只需分两种颜色。否则 $D=4k$，讨论 $D/4$ 即可。

从而我们怎么样都能取至少一半，此题有两个 $D$ 会把网格分成 4 部分，最大的一部分必然 $\ge n^2$。

# AGC025E - 树上行

⑧会，爬了

显然有上界 $\sum_{i}\min(2,c_i=i\  \texttt{被经过的次数})$。这个上界是可以达到的：

考虑任意叶子 $u$。

- 如果 $c_u = 0$，直接删去 $u$。
- 如果 $c_u = 1$，$u$ 的答案与通过它的那条路径 $(u,u')$ 的方向无关，修改其为 $(fa(u),u')$。
- 否则，任意选取通过它的两条路径 $(u,u'_1),(u,u'_2)$，直到它们分叉，下面的所有元素都会被填满，于是可以只考虑分叉后的部分，它们的并恰好还是一条路径。

于是就 win 了。

# AGC025F - 和与与

⑧会，爬了

考虑如果只有两个同位置的 $(1,1)$，那么它们会一直往前进直到世界尽头。当然它们可能“撞上” $(0,1)$ 或 $(1,0)$ 导致错位，这时就不能往前进了。

然后你把一长串 $(1,1)$ 缩到一起，撞到 $(0,1),(1,0)$ 的时候暴力搞，然后复杂度就是对的了，小编也很惊讶，大概这就是均摊的魅力吧

具体见[myh 的题解](https://blog.csdn.net/qq_38609262/article/details/103265658)。

# AGC026D - 直方图染色

如果 $h_i$ 全一样，推到下一列只会简单地翻转，没有其他可能。只有一种情况例外：整一列完全是红蓝交替，此时才有可能选择翻转和不翻转。至于 $h_i$ 不同也~~胡了一下，感觉~~很简单。

# AGC026E - 同步序列

⑧会，爬了

为啥我 E 题全不会做啊，这是替身攻击吗

[兔的题解](https://www.luogu.com.cn/blog/PinkRabbit/solution-at3974)太详细了，懒得贺一遍了。

```cpp
#include<bits/stdc++.h>
using namespace std;

int N;
char s[6005];
int apos[3005], bpos[3005], id[6005], la, lb;
string F[6005];
int nxt[6005];

int main() {
	scanf("%d", &N); scanf("%s", s + 1);
//	N = 3000;
//	for(int i = 1; i <= N; i++) s[i] = 'a';
//	for(int i = N + 1; i <= N << 1; i++) s[i] = 'b';
	for(int i = 1; i <= N << 1; i++)
		if(s[i] == 'a') apos[id[i] = ++la] = i;
		else bpos[id[i] = ++lb] = i;
	id[apos[++la] = bpos[++lb] = N << 1 | 1] = N + 1;
	for(int i = 1, j = 1; i <= N; i++)
		while(j < apos[i] && j < bpos[i]) nxt[j++] = i;
	for(int i = N; i; i--) {
		if(apos[i] < bpos[i]) F[i] = "ab" + F[nxt[bpos[i]]];
		else {
			int j = i + 1, maxA = apos[i];
			while(j <= N && bpos[j] < maxA) maxA = max(maxA, apos[j]), j++;
			F[i] = F[j];
			for(int d = maxA; d >= bpos[i]; d--)
				if(s[d] == 'b' || (s[d] == 'a' && id[d] >= i)) F[i] = s[d] + F[i];
		}
		F[i] = max(F[i], F[i + 1]);
	}
	cout << F[1];
}
```

# AGC026F - 豆沙包游戏

牛逼题。

首先先手有一个策略是开始就选 $a_1$ 或 $a_n$，游戏也就立即结束，这个策略简称自爆。接下来考虑先手是否有更优的策略。

考虑一段操作，先手决定起点，后手决定方向。从而区间 DP 是显然的。

而我们发现如果先手让出先手的位置，原来的后手存在一个策略是立即自爆，使情况和先手自爆相同，这是不可接受的。故先手不会让出先手。

当 $n$ 为偶数，后手必然会抢走先手然后自爆，故没有更优策略。

接下来考虑 $n$ 为奇数。先手必会在某个区间 $[l,r]$ 选择自爆（当 $n=1$ 时只能自爆），此时贡献为 $[l,r]$ 的奇数位置之和 - 偶数位置之和。

考虑区间 $[l,r]$ 可不可以拿到，假设我们硬点了就要 $[l,r]$，那么每一次分割，都有一个权值 $\ge [l,r]$ 而且可以拿到的区间在分割线的另一边。这让我们想到先手可以定好整棵决策树，而后手不论选哪个叶子都 $\ge[l,r]$。

于是二分就立即浮现了，只需 DP 求是否有这样一个序列的划分，其中每一段权值都 $\ge k$。只需贪心地保留可行划分中前缀和最小者即可 $O(n)$ DP。

# AGC027D - 膜矩阵

构造，⑧会，爬了

考虑使相邻两个格子结果均为 $1$。考虑对格子黑白染色，然后使白格为周围 4 个黑格的 $\text{lcm} +1$。这时我们需要合理安排黑格的权值，否则白格的大小会爆炸。具体策略是给每条斜线一个权值，黑格权值为两条斜线权值之积（这样有公共点的黑格 $\text{gcd}$ 够大）。斜线的权值在质数里选即可。

# AGC027E - AB 摘要

**观察 1.** 手玩可以发现大量的串可以变为单个字符。

**观察 2.** $ab$ 交替的串不能进行任何操作。

**观察 3. ** 设一个串的权值为 $\sum (s_i = a\ ?\ 1: 2)\bmod 3$，则操作后权值不变。

**观察 4.** 如果不 $ab$ 交替，几乎必定（仅有的例外：$aaa,bbb$）存在一种操作方法使得操作结果不 $ab$ 交替。

也就是说任意串

- 要么可以变为 $a$
- 要么可以变为 $b$
- 要么可以变为 $ab,ba$ 中任选其一
- 要么 $ab$ 交替

回到原问题。若 $t$ 能被 $s$ 变成，则 $t$ 的每一个字符必然对应 $s$ 中的一段字符。又注意到 $ab/ba+s$ 必定可通过恰当地选择 $ab/ba$ 使其能转化为 $s$，这提示我们下面的判定方法：$s$ 可转变为 $t$ 当且仅当 $s$ 可划为不是 $ab$ 交替的数段，每段权值等于 $t$ 的对应字符。

DP 时为了保证 $t$ 唯一，总是选取尽量短的段。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p = 1000000007, maxn = 100005;

int n; char s[maxn];
int f[maxn], nxt[maxn][2];

int main() {
	scanf("%s", s + 1); n = strlen(s + 1);
	bool flg = 1;
	for(int i = 2; i <= n; i++) if(s[i] == s[i - 1]) { flg = 0; break; }
	if(flg) { printf("1\n"); return 0; }
	
	f[n + 1] = 1;
	nxt[n + 1][0] = nxt[n + 1][1] = nxt[n + 2][0] = nxt[n + 2][1] = n + 2;
	int sval = 0;
	for(int i = n; i; i--) {
		sval = (sval + s[i] - 'a' + 1) % 3;
		if(s[i] == 'a') nxt[i][0] = i + 1;
		else if(s[i + 1] == 'b') nxt[i][0] = i + 2;
		else nxt[i][0] = nxt[i + 2][0];
		if(s[i] == 'b') nxt[i][1] = i + 1;
		else if(s[i + 1] == 'a') nxt[i][1] = i + 2;
		else nxt[i][1] = nxt[i + 2][1];
		f[i] = (f[nxt[i][0]] + f[nxt[i][1]] + (sval == 0)) % p;
	}
	printf("%d\n", (f[1] - (sval == 0) + p) % p);
}
```

# AGC027F - 嫁接

⑧会，爬了

假如有一个不能动的根则会好做很多。我们直接枚举第一步操作了哪个节点和它操作到了哪里（注意它们不一定在 $B$ 中有边）。由于每个点至多操作一次，该点便可看作是一个根。下面所说的 $A,B$ 树上祖先关系皆以该点为根。

接下来有如下的观察：

**观察 1.** 若 $A$ 中某点不需要（也不能）被操作，而它的父亲却需要被操作，则必然无解。

**观察 2.** 某点若需要操作，则必定早于其 $A$ 中父亲被操作。（否则轮到其父亲时不能行动）

**观察 3.** 某点若需要操作，则必定晚于其 $B$ 中父亲被操作。（否则轮到其父亲时不能行动）

可见上面的限制就是全部了，直接拓扑排序即可。加上上面的暴力枚举，复杂度 $\Omicron (Tn^3)$。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int maxn = 55;
int n;
vector<int> Ta[maxn], Tb[maxn];
int fa[maxn], fb[maxn];

void dfs_(int x, int f[], const vector<int>g[]) {
	for(int y : g[x]) if(y != f[x]) f[y] = x, dfs_(y, f, g);
}
void dfsA(int x) { fa[x] = 0; dfs_(x, fa, Ta); }
void dfsB(int x) { fb[x] = 0; dfs_(x, fb, Tb); }

vector<int> g[maxn]; int deg[maxn];
int q[maxn], h, t;
bool c(int u) { return fa[u] != fb[u]; }
int calc() {
	int ans = 0;
	for(int i = 1; i <= n; i++) g[i].clear(), deg[i] = 0;
	for(int i = 1; i <= n; i++) {
		ans += c(i);
		if(fa[i] && !c(i) && c(fa[i])) return -1;
		if(fa[i] && c(i) && c(fa[i])) g[fa[i]].push_back(i), deg[i]++;
		if(fb[i] && c(i) && c(fb[i])) g[i].push_back(fb[i]), deg[fb[i]]++;
	}
	h = t = 0;
	for(int i = 1; i <= n; i++) if(c(i) && deg[i] == 0) q[++t] = i;
	while(h != t) {
		int u = q[++h];
		for(int v : g[u]) if(!--deg[v]) q[++t] = v;
	}
	if(t != ans) return -1;
	return ans + 1;
}

void solve() {
	scanf("%d", &n);
	for(int i = 1; i <= n; i++) Ta[i].clear(), Tb[i].clear();
	for(int i = 1; i < n; i++) {
		int u, v; scanf("%d%d", &u, &v);
		Ta[u].push_back(v), Ta[v].push_back(u);
	}
	for(int i = 1; i < n; i++) {
		int u, v; scanf("%d%d", &u, &v);
		Tb[u].push_back(v), Tb[v].push_back(u);
	}
	
	dfsA(1); dfsB(1);
	bool flg = 1;
	for(int i = 1; i <= n; i++) flg &= fa[i] == fb[i];
	if(flg) { printf("0\n"); return; }
	
	int ans = -1;
	for(int i = 1; i <= n; i++) if(Ta[i].size() == 1) {
		dfsB(i);
		for(int j = 1; j <= n; j++) if(i != j) {
			dfsA(j); fa[j] = i; fa[i] = 0;
			int tmp = calc();
			if(tmp != -1) ans = ans == -1 ? tmp : min(tmp, ans);
		}
	}
	printf("%d\n", ans);
}

int main() {
	int t; scanf("%d", &t);
	while(t--) {
		solve();
	}
}
```

# AGC028C - 最小代价哈密顿回路

考虑一个经典转化：

- 我们不强制取最小值，而是想选哪个选哪个，反正最终求出来肯定是一样的。

那么我们直接考虑每个点的贡献情况有 $4$ 种：

- $a,b$ 皆有贡献；
- $a,b$ 皆无贡献；
- 仅 $a$ 有贡献；
- 仅 $b$ 有贡献。

那么整个贡献情况能串成一条链，当且仅当：

- 前两种点的数量不为零且相等；
- 前两种点的数量为零，且后两种点有一种数量也为零。

大力特判即可。

# AGC028D - 弦

> 两个块不连通当且仅当存在一条线能把圆切成分别包含两块之一的两部分。那么我们所要计数的就是每条分割线存在的概率。

然后你就假了，原因是类似 ``3 3 1 2 3 4 5 6`` 的结构，分割线和连通块数可能不能一一对应。

不过这至少给了我们一点启发：在某个具体划分方案中我们可以用左右端点来唯一确定块，于是我们只需要考虑每个左右端点对存在的概率。剩下的工作就比较简单了，上述信息只需要一个容斥 DP 就可以求。

```cpp
#include<bits/stdc++.h>
using namespace std;

const int p = 1000000007;
int qpow(int a, int k) {
	int ans = 1;
	while(k) {
		if(k & 1) ans = 1LL * ans * a % p;
		a = 1LL * a * a % p;
		k >>= 1;
	}
	return ans;
}

int n;
int lnk[605];
int f[605][605];
int fac[605];

int main() {
	scanf("%d", &n);
	int k, tot; scanf("%d", &k); tot = n - k;
	while (k--) {
		int u, v; scanf("%d%d", &u, &v);
		lnk[u] = v, lnk[v] = u;
	}
	fac[0] = 1; for(int i = 1; i <= tot; i++) fac[i] = 1LL * fac[i - 1] * (2 * i - 1) % p;
	
	n *= 2;
	int ans = 0;
	for(int i = 1; i <= n; i++)
	for(int j = i + 1; j <= n; j += 2) {
		bool flg = 1; int cnt = 0;
		for(int k = i; k <= j; k++) {
			cnt += !lnk[k];
			if(lnk[k] && (lnk[k] < i || lnk[k] > j)) { flg = 0; break; }
		}
		if(!flg) continue;
		assert(cnt % 2 == 0);
		f[i][j] = fac[cnt / 2];
		cnt = 0;
		for(int k = j; k > i; k--) {
			cnt += !lnk[k];
			if(!(cnt & 1)) f[i][j] = (f[i][j] - 1LL * f[i][k - 1] * fac[cnt / 2] % p + p) % p;
		}
		cnt += !lnk[i];
		ans = (ans + 1LL * f[i][j] * fac[tot - cnt / 2] % p) % p;
	}
	printf("%d\n", ans);
}
```

# AGC028E - High 元素

⑧会，爬了

贪心地从前往后能取 $0$ 则取 $0$。问题来了，如何判定一个状况可以操作成合法？我们需要一些对“前缀最大值”的更深刻理解。

下面简记“是前缀最大值”为 High。（赛高尼 High 铁鸭子哒！）

**观察 1.** 若某元素在 $p$ 中 High，则它被分配后也一定 High。

**观察 2.** 若某元素在 $p$ 中不 High 却在分配后 High，则如果把它换到另一边就一定不 High。

那么，合法时如果两个序列皆有 $p$ 中不 High 却在分配后 High 的元素，则我们可以交换它们而不改变合法性。最终必有一个序列中（不妨认为是 $x$），High 的元素都在 $p$ 中就已经 High 了。

那么有：记 $u$ 为 $y$ 中填的已经 High 的元素的个数，$v$ 为 $y$ 中填的后来才 High 的元素的个数，则方案合法等价于 $2u+v$ 等于某一常数 $C$。

**观察 3.** 若 $C$ 能达成，则 $C-2$ 也必定能达成。

从而分别求出 $C$ 为奇数偶数时的最大值即可，可以使用线段树优化一个 DP。

# AGC028F - 可达方块

⑧会，爬了

题解没看懂 qaq

<center>
    <a href="/posts/?page=1&postid=75">to be continued...</a>
</center>

