---
title: 论如何通过 sone1
---

首先你需要一份**几乎**是正确的代码，比如[这一份](https://www.luogu.com.cn/paste/8da8wq4y)。

然后每隔 3000 次操作定期重构，你就过了……

以此纪念我失去的宝贵人生中的三天……

```cpp
#include<bits/stdc++.h>
#define il inline
using namespace std;

const int ninf = -2147483648, inf = 2147483647;
const int maxN = 200005;

struct Info {
	int mxx, mnn, sum, cnt;
	Info() : mxx(ninf), mnn(inf), sum(0), cnt(0) {}
	Info(int mxx0, int mnn0, int sum0, int cnt0) : mxx(mxx0), mnn(mnn0), sum(sum0), cnt(cnt0) {}
	il Info operator +(const Info b) const {return Info(max(mxx, b.mxx), min(mnn, b.mnn), sum + b.sum, cnt + b.cnt);}
	il Info &operator +=(const Info b) {return *this = *this + b;}
};
struct Tag {
	int chn; bool chna; int add;
	Tag() : chna(0), add(0) {}
	Tag(int chn0, bool chna0, int add0) : chn(chn0), chna(chna0), add(add0) {}
	il Tag operator +(const Tag b) const {return b.chna ? b : (chna ? Tag(chn + b.add, 1, 0) : Tag(0, 0, add + b.add));}
	il Tag &operator +=(const Tag b) {return *this = *this + b;}
	il bool isemp() {return !chna && !add;}
};
il Info operator +(const Info a, const Tag b) {
	return b.chna ?
			Info(b.chn, b.chn, b.chn * a.cnt, a.cnt) : 
			Info((a.mxx == ninf ? ninf : a.mxx + b.add), (a.mnn == inf ? inf : a.mnn + b.add), a.sum + b.add * a.cnt, a.cnt);
}
il Info &operator +=(Info &a, const Tag b) {return a = a + b;}
il int operator +(const int a, const Tag b) {return b.chna ? b.chn : a + b.add;}
il int &operator +=(int &a, const Tag b) {return a = a + b;}
/*
code by x_Yi_x (on most platforms) or pataphysicist (only on codeforces)
my blog : https://xyix.gitee.io (now using) or https://xyix.github.io (abandoned)
*/
#define fori01 for (int i = 0; i < 2; i++)
struct An {
	An *rc[2], *ic[2], *fa; //rc for Real Child, ic for Imaginary Child, fa = real fa
	Info rinfo, iinfo, tinfo;  //t for Total
	Tag rtag, itag;
	int val;
	bool rev, iin; //iin for Is Inner Node
	An() {
		fori01 rc[i] = ic[i] = NULL;
		fa = NULL;
		rinfo = iinfo = tinfo = Info();
		rtag = itag = Tag();
		rev = iin = val = 0; //not inner by default
	}
	il void reverse() {swap(rc[0], rc[1]); rev ^= 1;}
	il void rmodi(const Tag del) {if(iin) return; rtag += del; val += del; tinfo = (rinfo += del) + iinfo;}
	il void imodi(const Tag del) {itag += del; tinfo = rinfo + (iinfo += del);}
	il void pushup() {
		iinfo = Info();
		if(!iin) rinfo = Info(val, val, val, 1);
		else rinfo = Info();
		fori01 if(rc[i]) rinfo += rc[i] -> rinfo, iinfo += rc[i] -> iinfo;
		fori01 if(ic[i]) iinfo += ic[i] -> tinfo;
		tinfo = rinfo + iinfo;
	}
	il void pushdown() {
		if(rev) {fori01 if(rc[i]) rc[i] -> reverse(); rev = 0;}
		if(!rtag.isemp()) {fori01 if(rc[i]) rc[i] -> rmodi(rtag); rtag = Tag();}
		if(!itag.isemp()) {
			fori01 if(rc[i]) rc[i] -> imodi(itag);
			fori01 if(ic[i]) ic[i] -> rmodi(itag), ic[i] -> imodi(itag);
			itag = Tag();
		}
	}
	il bool isroot(bool typ) {
		if(typ) return !fa || !iin || !fa -> iin;
		return !fa || (fa -> rc[0] != this && fa -> rc[1] != this);
	}
	il An** c(bool typ, int i) {return typ ? &ic[i] : &rc[i];}
	il void conn(bool typ, int i, An *x) {if(x) x -> fa = this; *c(typ, i) = x;}
	void repl(An *x) { //replace this with x
		if(!fa) {if(x) x -> fa = fa; return;}
		fori01 if(fa -> rc[i] == this) {fa -> conn(0, i, x); return;}
		fori01 if(fa -> ic[i] == this) {fa -> conn(1, i, x); return;}
		cerr << "ERROR : node not found in father's sons\n"; exit(0);
	}
} T[maxN];
namespace index_pool {
	int stk[maxN], len;
	il void init(int n0) {for (int i = n0 + 1; i <= maxN - 5; i++) stk[++len] = i;}
	il int get_index() {return stk[len--];}
	il void recycle(int x) {stk[++len] = x;}
}
il int index(An *x) {return x - T;}
il An* newnode(bool iin) {int x = index_pool::get_index(); T[x].iin = iin; return &T[x];}
il void recycnode(An *x) {index_pool::recycle(index(x)); *x = An();}
il void rotate(bool typ, An *x) {
	An *y = x -> fa; bool k = (*(y -> c(typ, 0)) == x);
	x -> repl(*(x -> c(typ, k)));
	y -> repl(x);
	y -> fa = x; *(x -> c(typ, k)) = y;
	y -> pushup(); 
}
void splay(bool typ, An *x) {
	for(; !x -> isroot(typ); rotate(typ, x)) {
		An *y = x -> fa;
		if(!y -> isroot(typ))
			if((*y -> c(typ, 0) == x) ^ (*y -> fa -> c(typ, 0) == y)) rotate(typ, x); else rotate(typ, y);
	}
	x -> pushup();
}
void ins(An *x, An *y) { //insert y into x's splay of imaginary sons
	x -> pushdown();
	fori01 if(!x -> ic[i]) {x -> conn(1, i, y); return;}
	while(x -> ic[0] && x -> ic[0] -> iin) (x = x -> ic[0]) -> pushdown();
	An *z = newnode(1); z -> conn(1, 0, x -> ic[0]); z -> conn(1, 1, y); x -> conn(1, 0, z);
	splay(1, z);
}
void del(An *x) { //delete x from the splay of imaginary sons to which it belongs
	An *y = x -> fa;
	if(y -> iin) {
		y -> repl(*y -> c(1, *y -> c(1, 0) == x));
		splay(1, y -> fa);
		recycnode(y);
	}
	else x -> repl(NULL);
	x -> fa = NULL;
}
An *stk[maxN]; int len;
void access(An *x) {
	An* x0 = x;
	for (An *y = x; y; y = y -> fa) stk[++len] = y; while(len) stk[len--] -> pushdown();
	splay(0, x);
	if(x -> rc[1]) {
		An *y = x -> rc[1]; x -> rc[1] = y -> fa = NULL;
		ins(x, y); x -> pushup();
	}
	for(An *y; x -> fa; (x = y) -> pushup()) {
		for(y = x -> fa; y -> iin; y = y -> fa); splay(0, y);
		if(y -> rc[1]) x -> repl(y -> rc[1]), splay(1, x -> fa); else del(x);
		y -> conn(0, 1, x);
	}
	splay(0, x0);
}

il void makeroot(An *x) {access(x); x -> reverse();}
il An* findfa(An *x) {
	access(x); x -> pushdown(); if(x -> rc[0]) (x = x -> rc[0]) -> pushdown(); else return NULL;
	while(x && x -> rc[1]) (x = x -> rc[1]) -> pushdown();
	return x;
} 
il An* findroot(An *x) {while(x -> fa) x = x -> fa; return x;}
il An* cut(An *x) {An *y = findfa(x); if(y) {access(y); del(x); y -> pushup();} return y;}
il void link(An *x, An *y) {
	An *z = cut(x);
	if(findroot(x) != findroot(y)) z = y;
	if(z) access(z), ins(z, x), z -> pushup();
}
il void split(An *x, An *y) {makeroot(x); access(y);}
il void Modify_Chain(An *x, An *y, Tag del) {split(x, y); y -> rmodi(del);}
il Info Query_Chain(An *x, An *y) {split(x, y); return y -> rinfo;}
An *nowrt;
il void Modify_Subtree(An *x, Tag del) {
	makeroot(nowrt); access(x);
	x -> val += del;
	fori01 if(x -> ic[i]) x -> ic[i] -> rmodi(del), x -> ic[i] -> imodi(del);
	x -> pushup();
}
Info Query_Subtree(An *x) {
	makeroot(nowrt); access(x);
	Info ans = Info(x -> val, x -> val, x -> val, 1);
	fori01 if(x -> ic[i]) ans += x -> ic[i] -> tinfo;
	return ans;
}
void dfs(An *x) {
	x -> pushdown();
	fori01 if(x -> rc[i]) dfs(x -> rc[i]);
	fori01 if(x -> ic[i]) dfs(x -> ic[i]);
	x -> pushup();
}

int N, M;
vector<int> G[maxN];
void build(int x, int f) {for(auto y : G[x]) if(y != f) build(y, x), link(&T[y], &T[x]);}

int main() {
	scanf("%d%d", &N, &M);
	index_pool::init(N);
	for (int i = 1; i < N; i++) {int u, v; scanf("%d%d", &u, &v); G[u].push_back(v); G[v].push_back(u);}
	for (int i = 1; i <= N; i++) scanf("%d", &T[i].val), T[i].pushup();
	build(1, 0);
	int trt; scanf("%d", &trt); nowrt = &T[trt]; 
	while (M--) {
		int opt; scanf("%d", &opt);
		if(opt == 0 || opt == 5) {
			int x, v; scanf("%d%d", &x, &v);
			Modify_Subtree(T + x, opt == 0 ? Tag(v, 1, 0) : Tag(0, 0, v));
		}
		if(opt == 1) scanf("%d", &trt), nowrt = T + trt;
		if(opt == 2 || opt == 6) {
			int x, y, v; scanf("%d%d%d", &x, &y, &v);
			Modify_Chain(T + x, T + y, opt == 2 ? Tag(v, 1, 0) : Tag(0, 0, v)); 
		}
		if(opt == 3 || opt == 4 || opt == 11) {
			int x; scanf("%d", &x); Info ans = Query_Subtree(T + x);
			if(opt == 3) printf("%d\n", ans.mnn); if(opt == 4) printf("%d\n", ans.mxx); if(opt == 11) printf("%d\n", ans.sum);
		}
		if(opt == 7 || opt == 8 || opt == 10) {
			int x, y; scanf("%d%d", &x, &y); Info ans = Query_Chain(T + x, T + y);
			if(opt == 7) printf("%d\n", ans.mnn); if(opt == 8) printf("%d\n", ans.mxx); if(opt == 10) printf("%d\n", ans.sum);
		}
		if(opt == 9) {int x, y; scanf("%d%d", &x, &y); makeroot(nowrt); link(T + x, T + y);}
		if(M % 3000 == 0) makeroot(nowrt), dfs(nowrt); //important
	}
}

```

