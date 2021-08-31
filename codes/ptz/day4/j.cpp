#include<bits/stdc++.h>
typedef double db;
using namespace std;

struct Vec {
	db x, y;
	Vec () { x = 0; y = 0; }
	Vec (db x0, db y0) : x(x0), y(y0) {};
	db arg() { return atan2(y, x); }
	db norm() { return x * x + y * y; }
	Vec operator +(const Vec v) const { return {x + v.x, y + v.y}; }
	Vec operator -(const Vec v) const { return {x - v.x, y - v.y}; }
};
Vec operator *(const db l, const Vec u) { return {l * u.x, l * u.y}; }
struct Circ {
	Vec O; db r;
};

const db eps = 1e-9, pi = acos(-1);
bool ge(const db u, const db v) { return u + eps > v; }
bool gne(const db u, const db v) { return u > v + eps; }
bool le(const db u, const db v) { return u < v + eps; }
bool lne(const db u, const db v) { return u + eps < v; }
bool eq(const db u, const db v) { return abs(u - v) < eps; }

db Dis(const Vec u, const Vec v) {
	return sqrt((u - v).norm());
}

const int maxn = 1005;
int n, nowI;
Circ c[maxn];
vector<db> phi;
db Lt[maxn], Rt[maxn]; bool qaq[maxn];

db calc(const Circ u, db tht) {
	return u.r * u.O.x * sin(tht) + u.r * u.r / 4 * (sin(2 * tht) + 2 * tht);
}
struct SegT {
    db sum[maxn << 2]; bool lzy[maxn << 2];
    void rev(int x) {
        sum[x] = -sum[x];
        lzy[x] ^= 1;
    }
    void pushup(int x) {
        sum[x] = sum[x << 1] + sum[x << 1 | 1];
    }
    void pushdown(int x) {
        if (!lzy[x]) return;
        rev(x << 1), rev(x << 1 | 1);
    }
    void build(int x, int l, int r) {
        lzy[x] = 0;
        if (l == r) {
            sum[x] = calc(c[nowI], phi[l]) - calc(c[nowI], phi[l - 1]);
            return;
        }
        int mid = (l + r) >> 1;
        build(x << 1, l, mid);
        build(x << 1 | 1, mid + 1, r);
        pushup(x);
    }
    void Update(int x, int l, int r, int L, int R) {
        if (L > R) return;
        if (L <= l && r <= R) return rev(x);
        pushdown(x);
        int mid = (l + r) >> 1;
        if (L <= mid) Update(x << 1, l, mid, L, R);
        if (R > mid) Update(x << 1 | 1, mid + 1, r, L, R);
        pushup(x);
    }
} T;
db ans[maxn];
void solve(int i) {
    phi.push_back(-pi); phi.push_back(pi);
    memset(qaq, 0, sizeof(qaq));
	for(int j = 1; j <= n; j++) if(j != i) {
		#define u c[i]
		#define v c[j]
		db Odis = Dis(u.O, v.O);
		if (le(u.r + Odis, v.r)) continue;
		if (le(v.r + Odis, u.r) || le(v.r + u.r, Odis)) continue;
        qaq[j] = 1;
		db p = (Vec){v.O.x - u.O.x, v.O.y - u.O.y}.arg();
		db q = acos((u.r * u.r + Odis * Odis - v.r * v.r) / (2 * u.r * Odis));
		db l = p - q, r = p + q;
		if(lne(l, -pi)) l += 2 * pi; if(gne(r, pi)) r -= 2 * pi;
        Lt[j] = l, Rt[j] = r;
        phi.push_back(l), phi.push_back(r);
	}
    nowI = i;
    sort(phi.begin(), phi.end());
    T.build(1, 1, phi.size() - 1);
    for (int j = 1; j <= n; j++) {
        if (qaq[j]) {
            int Lp = lower_bound(phi.begin(), phi.end(), Lt[j] - eps) - phi.begin();
            assert(phi[Lp] == Lt[j]);
            int Rp = lower_bound(phi.begin(), phi.end(), Rt[j] - eps) - phi.begin();
            assert(phi[Rp] == Rt[j]);
            if (Lp <= Rp) T.Update(1, 1, phi.size() - 1, Lp + 1, Rp);
            else 
                T.Update(1, 1, phi.size() - 1, 1, Rp),
                T.Update(1, 1, phi.size() - 1, Lp + 1, phi.size() - 1);
        }
        if (i <= j) ans[j] += T.sum[1];
    }
}

int main() {
	scanf("%d", &n);
	for(int i = 1; i <= n; i++) scanf("%lf%lf%lf", &c[i].O.x, &c[i].O.y, &c[i].r);
	for(int i = 1; i <= n; i++) solve(i), printf("%.6lf\n", ans[i]);
}