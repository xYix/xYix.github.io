---
title: ioi2020 集训队作业 AT 部分口胡
---

你可能会很惊讶，标题是打错了吧，应该是 ioi2021 吧

但是 x义x 也很惊讶，他就是没做 ioi2020hw，可能是他太菜了

我奉 hhz 的圣旨来胡一下罢

- $\text{queuing}$：尚无题解
- $\color{blue}\text{skipped}$：题解~~口胡~~已完成，代码鸽了
- $\color{green}\text{accepted}$：题解已完成，代码已经通过
- $\color{red}\text{unsolvable}$：xyx 认定此题不可做，于是跳过

请注意题目中文翻译中可能有一些极度信雅达的生草东西（

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
| AGC024E | [Sequence Growing Hard](https://atcoder.jp/contests/agc024/tasks/agc024_e) | $\text{queuing}$ |  |
| AGC024F | [Simple Subsequence Problem](https://atcoder.jp/contests/agc024/tasks/agc024_f) | $\color{blue}\text{skipped}$ | 否 |
| AGC025D | [Choosing Points](https://atcoder.jp/contests/agc025/tasks/agc025_d) | $\text{queuing}$ | |
| AGC025E | [Walking on a Tree](https://atcoder.jp/contests/agc025/tasks/agc025_e) | $\text{queuing}$ | |
| AGC025F | [Addition and Andition](https://atcoder.jp/contests/agc025/tasks/agc025_e) | $\text{queuing}$ | |

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

# AGC023E - 逆序

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

# AGC024E - 生长的序列 Hard

⑧会，爬了

$n\le 100$，模数任意，这很 AT……



# AGC024F - 基础子序列练习题

我们考虑一个串对它子序列的贡献，使用一个子序列自动机的模型。假设现在匹配到了 $s$，还剩 $t$ 可供匹配，则我们可以

- 立即结束匹配，$s$ 获得贡献 +1
- $s\leftarrow s + 0$，删掉 $t$ 前面的一串 $1$ 和第一个 $0$
- $s\leftarrow s +1$，删掉 $t$ 前面的一串 $0$ 和第一个 $1$

那么我们从 $\sum (\varnothing,t\in S)$ 开始，每走到 $(s,\varnothing)$ 便给 $s$ 的贡献 +1，又观察到 $|s|+|t|\le n$，DP 也就立即浮现了。

# AGC025D - 选点

# AGC025E - 树上行

# AGC025F - 和与与