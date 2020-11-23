---
title: luoguP2305 题解 - [NOI2014]购票
---

首先有 simple 的斜率优化
$$
\begin{aligned}
F_u&=\min_{d_u-d_v\le l}F_ v+p_u(d_u-d_v)+q_u\\
&=p_ud_u+q_u+\min_{d_u-d_v\le l}F_v-p_ud_v
\end{aligned}
$$

$$
\begin{aligned}
F_{v1}\prec F_{v_2}&\Leftrightarrow F_{v1}-p_ud_{v1}<F_{v_2}-p_ud_{v2}\\
&\Leftrightarrow F_{v1}-F_{v2}<p_u(d_{v1}-d_{v2})\\
&\Leftrightarrow (d_{v1}<d_{v2})\operatorname{xor}\left(\dfrac{F_{v1}-F_{v2}}{d_{v1}-d_{v2}}<p_u\right)
\end{aligned}
$$

# 假做法

先考虑链上的情况。

容易想到的一个做法是从左到右依次求 DP 值，只维护一个单调栈，这时你会发现 $l_u$ 的限制在这里出了大问题，简单来说就是 $d_v\ge d_u-l_u$ 这部分的凸包不等于完整的凸包的 $d_v\ge d_u-l_u$ 这部分，而是可能出现如下的情况：

<div style="width:70%;margin:auto"><img src="/images/uoj-7.png" alt=""></div>

注意其中的 * 点。所以我们必须使用数据结构同时维护一批单调栈，比较高妙的做法是树状数组维护后缀和（允许甚至利用了信息不完整的节点）。

搬到树上时：插入时暴力弹栈，撤销时暴力操作。然而由于这是一棵树所以复杂度是假的，由于 CCF 一贯的德性所以没被卡。

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN = 200005;

struct Vec {
	ll x, y;
	Vec operator -(const Vec b) const { return (Vec){x - b.x, y - b.y}; }
	bool operator <(const Vec b) const { return x < b.x; }
	long double slp() { return ((long double)y) / x; }
};

struct Edge { int v; ll c; }; vector<Edge> G[maxN];
int N, t;
ll P[maxN], Q[maxN], Lim[maxN], F[maxN];
ll dis[maxN]; int dep[maxN];
ll calc(Vec v, int u) { return v.y + 1LL * (dis[u] - v.x) * P[u] + Q[u]; }

struct Opt { Vec val; int typ, tag; };
Vec Pn_[maxN * 40]; Opt Op_[maxN * 40];
struct my_stk {
	int lP, lOp;
	Vec *Pn; Opt *Op;
	my_stk () { lP = -1; lOp = -1; }
	Opt& Op_top() { return Op[lOp]; }
	Vec& top() { return Pn[lP]; }
	Vec& sec_top() { return Pn[lP - 1]; }
	void Push(const Vec d, const int id) { lOp++; Op_top() = (Opt){Pn[++lP] = d, 0, id}; }
	void Pop(const int id) { lOp++; Op_top() = (Opt){Pn[lP--], 1, id}; }
	void Insert(const Vec d, const int id) {
		while(lP >= 1 && (top() - sec_top()).slp() >= (d - top()).slp()) Pop(id);
		Push(d, id);
	}
	void CtrlZ(const int id) {
		while(lOp >= 0 && Op_top().tag == id) {
			if(Op_top().typ) Pn[++lP] = Op_top().val;
			else lP--;
			lOp--;
		}
	}
	ll Query(const int id) {
		if(lP == -1) return 1e18;
		if(lP == 0 || (Pn[1] - Pn[0]).slp() > P[id]) return calc(Pn[0], id);
		int L = 1, R = lP;
		while(L < R) {
			int mid = (L + R) >> 1;
			if((Pn[mid + 1] - Pn[mid]).slp() < P[id]) L = mid + 1;
			else R = mid;
		}
		return calc(Pn[L], id);
	}
} C[maxN];
void All_insert(int x, const Vec d, const int id) { for(; x <= N; x += x & -x) C[x].Insert(d, id); }
void All_CtrlZ(int x, const int id) { for(; x <= N; x += x & -x) C[x].CtrlZ(id); }
ll All_Query(int x, const int id) {
	ll ans = 1e18;
	for(; x; x -= x & -x) ans = min(ans, C[x].Query(id));
	return ans;
}
void init_stk() {
	C[1].Pn = Pn_; C[1].Op = Op_;
	for(int i = 1; i < N; i++) C[i + 1].Pn = C[i].Pn + (i & -i) * 2, C[i + 1].Op = C[i].Op + (i & -i) * 2;
}

ll vdis[maxN];
void Solve(int x) {
	vdis[dep[x]] = dis[x];
	if(x == 1) F[x] = 0;
	else {
		int Lp = lower_bound(vdis, vdis + dep[x], dis[x] - Lim[x]) - vdis;
		F[x] = All_Query(N - Lp, x);
	}
	All_insert(N - dep[x], (Vec){dis[x], F[x]}, x);
	for(Edge e : G[x]) {
		dep[e.v] = dep[x] + 1;
		dis[e.v] = dis[x] + e.c;
		Solve(e.v);
	}
	All_CtrlZ(N - dep[x], x);
}

int main() {
	scanf("%d%d", &N, &t);
	init_stk();
	for(int i = 2; i <= N; i++) {
		int fa; ll fav; scanf("%d%lld%lld%lld%lld", &fa, &fav, &P[i], &Q[i], &Lim[i]);
		G[fa].push_back((Edge){i, fav});
	}
	Solve(1);
	for(int i = 2; i <= N; i++) printf("%lld\n", F[i]);
}
```

# 真做法

还是先考虑链上的情况。

这次我们使用 CDQ 分治，先处理左半边，把右半边按 $d_u-l_u$ 从大到小排序，从左到右建出左边的凸包。

搬到树上时只需要把普通分治换成点分治。

众所周知，点分治常数比树状数组小

<div style="width:70%;margin:auto"><img src="/images/uoj-7777.png" alt=""></div>

```cpp
#include<bits/stdc++.h>
#define ll long long
using namespace std;

const int maxN = 200005;

struct Vec {
	ll x, y;
	Vec operator -(const Vec b) const { return (Vec){x - b.x, y - b.y}; }
	bool operator <(const Vec b) const { return x < b.x; }
	long double slp() { return ((long double)y) / x; }
};

int fa[maxN]; vector<int> G[maxN];
int N, t;
ll P[maxN], Q[maxN], Lim[maxN], F[maxN];
ll dis[maxN];
ll calc(Vec v, int u) { return v.y + 1LL * (dis[u] - v.x) * P[u] + Q[u]; }


struct my_stk {
	int lP;
	Vec Pn[maxN];
	void clear() { lP = -1; }
	Vec& top() { return Pn[lP]; }
	Vec& sec_top() { return Pn[lP - 1]; }
	void Push(const Vec d) { Pn[++lP] = d; }
	void Pop() { lP--; }
	void Insert(const Vec d) {
		while(lP >= 1 && (sec_top() - top()).slp() <= (top() - d).slp()) Pop();
		Push(d);
	}
	ll Query(const int id) {
		if(lP == -1) return 1e18;
		if(lP == 0 || (Pn[1] - Pn[0]).slp() < P[id]) return calc(Pn[0], id);
		int L = 1, R = lP;
		while(L < R) {
			int mid = (L + R) >> 1;
			if((Pn[mid + 1] - Pn[mid]).slp() > P[id]) L = mid + 1;
			else R = mid;
		}
		return calc(Pn[L], id);
	}
} C;

void init(int x, int f) { dis[x] += dis[f]; for(int y : G[x]) init(y, x); }
bool used[maxN];
int s[maxN], z[maxN], rt;
void get_s(int x) { s[x] = 1; for(int y : G[x]) if(!used[y]) get_s(y), s[x] += s[y]; }
void get_rt(int x, int S) {
	z[x] = S - s[x];
	for(int y : G[x]) if(!used[y]) get_rt(y, S), z[x] = max(z[x], s[y]);
	if(z[x] < z[rt]) rt = x;
}

struct node {
	int p; ll v;
	bool operator < (const node b) const { return v > b.v; }
}; vector<node> nlis;
void get_dis(int x) {
	nlis.push_back((node){x, dis[x] - Lim[x]});
	for(int y : G[x]) if(!used[y]) get_dis(y);
}
void get_F(int x, Vec d) {
	if(d.x >= dis[x] - Lim[x]) F[x] = min(F[x], calc(d, x));
	for(int y : G[x]) if(!used[y]) get_F(y, d);
}

void DFZ(int x) {
	get_s(x); rt = 0; get_rt(x, s[x]);
	int trt = rt;
	used[trt] = 1;
	if(x != rt) {
		DFZ(x);
		nlis.clear(); get_dis(trt); sort(nlis.begin(), nlis.end());
		C.clear(); int y = fa[trt];
		for(node u : nlis) {
			while(y != fa[x] && dis[y] >= u.v) C.Insert((Vec){dis[y], F[y]}), y = fa[y];
			F[u.p] = min(F[u.p], C.Query(u.p));
		}
	}
	for(int y : G[trt]) if(!used[y]) get_F(y, (Vec){dis[trt], F[trt]}), DFZ(y);
}

int main() {
	scanf("%d%d", &N, &t);
	for(int i = 2; i <= N; i++) {
		scanf("%d%lld%lld%lld%lld", &fa[i], &dis[i], &P[i], &Q[i], &Lim[i]);
		G[fa[i]].push_back(i);
		F[i] = 1e18;
	}
	init(1, 0);
	z[0] = 0x3f3f3f3f;
	DFZ(1);
	for(int i = 2; i <= N; i++) printf("%lld\n", F[i]);
}
```

