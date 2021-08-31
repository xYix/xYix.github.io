#include <algorithm>
#include <bitset>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <ctime>
#include <iomanip>
#include <iostream>
#include <map>
#include <queue>
#include <set>
#include <vector>
#define setIO(x) freopen(x".in", "r", stdin), freopen(x".out", "w", stdout)
#define closefile fclose(stdin), fclose(stdout)
#define m_p make_pair
#define sz(x) (int)x.size()
#define see(x) cerr << x << " "
#define seeln(x) cerr << x << endl
#define out(x) cerr << #x << " = " << x << " "
#define outln(x) cerr << #x << " = " << x << endl
#define outarr(x, l, r) {cerr<< #x"[" << l << " ~ " << r << "] = "; for (int _i = l; _i <= r; ++_i) cerr << x[_i] << " "; cerr << endl;}
using namespace std;
typedef long long ull;
typedef pair<int, int> pii;
template <class T> bool checkmax(T &a, T b){return a < b ? a = b, 1 : 0;}
template <class T> bool checkmin(T &a, T b){return b < a ? a = b, 1 : 0;}
const int N = 400005;
int n, deg[N];
int A[N << 1], B[N << 1];
struct rec
{
	int lx, ly, rx, ry;
}a[N];
int sx[N << 1], sy[N << 1], tx = 0, ty = 0;
ull Tri;
ull c2(int x){return (ull)x * (x - 1) / 2;}
ull c3(int x){return (ull)x * (x - 1) * (x - 2) / 6;}

void init()
{
	scanf("%d", &n);
	for (int i = 1; i <= n; ++i)
	{
		scanf("%d%d%d%d", &a[i].lx, &a[i].rx, &a[i].ly, &a[i].ry);
		sx[++tx] = a[i].lx, sx[++tx] = a[i].rx;
		sy[++ty] = a[i].ly, sy[++ty] = a[i].ry;
	}
	sort(sx + 1, sx + tx + 1), sort(sy + 1, sy + ty + 1);
	tx = unique(sx + 1, sx + tx + 1) - sx - 1;
	ty = unique(sy + 1, sy + ty + 1) - sy - 1;
	for (int i = 1; i <= n; ++i)
	{
		a[i].lx = lower_bound(sx + 1, sx + tx + 1, a[i].lx) - sx;
		a[i].rx = lower_bound(sx + 1, sx + tx + 1, a[i].rx) - sx;
		a[i].ly = lower_bound(sy + 1, sy + ty + 1, a[i].ly) - sy;
		a[i].ry = lower_bound(sy + 1, sy + ty + 1, a[i].ry) - sy;
		//printf("Polygon\n%d %d\n%d %d\n%d %d\n%d %d\n...\n", a[i].lx, a[i].ly, a[i].rx, a[i].ly, a[i].rx, a[i].ry, a[i].lx, a[i].ry);
	}
	for (int i = 1; i <= n; ++i) A[a[i].lx] = i, B[a[i].rx] = i;
}

namespace solver0
{
	int cnt = 0;
	struct bit1
	{
		int C[N];
		void update(int x, int c)
		{
			if (x > ty || x < 0) return;
			while (x <= ty) C[x] += c, x += (x & (-x));
		}

		int query(int x)
		{
			if (x > ty || x < 0) return 0;
			int ans = 0;
			while (x) ans += C[x], x -= (x & (-x));
			return ans;
		}
		
		void clear()
		{
			for (int i = 1; i <= ty; ++i) C[i] = 0;
		}
	}cl;

	struct bit2
	{
		int C[N];
		void update(int x, int c)
		{
			if (x > ty || x < 0) return;
			while (x) C[x] += c, x -= (x & (-x));
		}

		int query(int x)
		{
			if (x > ty || x < 0) return 0;
			int ans = 0;
			while (x <= ty) ans += C[x], x += (x & (-x));
			return ans;
		}
		
		void clear()
		{
			for (int i = 1; i <= ty; ++i) C[i] = 0;
		}
	}cr;

	void aseg(int l, int r, int c)
	{
		cnt += c;
		cl.update(r, c); cr.update(l, c);
	}

	int qseg(int l, int r)
	{
		return cnt - cr.query(r + 1) - cl.query(l - 1);
	}

	void clear()
	{
		cnt = 0;
		cl.clear(); cr.clear();
	}

	void main()
	{
		clear();
		for (int i = 1; i <= tx; ++i)
		{
			if (A[i])
			{
				int u = A[i];
				aseg(a[u].ly, a[u].ry, 1);
			}
			else
			{
				int u = B[i];
				aseg(a[u].ly, a[u].ry, -1);
				deg[u] += qseg(a[u].ly, a[u].ry);
			}
		}
		clear();
		for (int i = 1; i <= tx; ++i)
		{
			if (A[i])
			{
				int u = A[i];
				deg[u] -= qseg(a[u].ly, a[u].ry);
			}
			else
			{
				int u = B[i];
				deg[u] += qseg(a[u].ly, a[u].ry);
				aseg(a[u].ly, a[u].ry, 1);
			}
		}
		clear();
	}
}

namespace solver1
{
	vector<pii> buc[N << 1];
	struct seg
	{
		ull sum[N << 3][4], tag[N << 3];
		void push_up(int x)
		{
			for (int i = 1; i < 4; ++i) sum[x][i] = sum[x << 1][i] + sum[x << 1 | 1][i];
		}
	
		void build(int x, int l, int r)
		{
			sum[x][0] = r - l + 1;
			tag[x] = sum[x][1] = sum[x][2] = sum[x][3] = 0;
			if (l == r) return;
			int mid = (l + r) >> 1;
			build(x << 1, l, mid); build(x << 1 | 1, mid + 1, r);
		}

		void push_tag(int x, ull c)
		{
			tag[x] += c;
			sum[x][3] += 3 * c * sum[x][2] + 3 * c * c * sum[x][1] + c * c * c * sum[x][0];
			sum[x][2] += 2 * c * sum[x][1] + c * c * sum[x][0];
			sum[x][1] += c * sum[x][0];
		}

		void push_down(int x)
		{
			if (tag[x])
			{
				push_tag(x << 1, tag[x]);
				push_tag(x << 1 | 1, tag[x]);
				tag[x] = 0;
			}
		}

		void update(int x, int l, int r, int L, int R, ull c)
		{
			if (L <= l && r <= R)
			{
				push_tag(x, c);
				return;
			}
			push_down(x);
			int mid = (l + r) >> 1;
			if (L <= mid) update(x << 1, l, mid, L, R, c);
			if (R > mid) update(x << 1 | 1, mid + 1, r, L, R, c);
			push_up(x);
		}
	}T;

	ull doit()
	{
		T.build(1, 1, ty);
		ull res = 0;
		for (int i = 1; i <= tx; ++i) buc[i].clear();
		for (int i = 1; i <= n; ++i)
		{
			if (a[i].ly <= a[i].ry - 1)
			{
				buc[a[i].lx].push_back(m_p(i, 1));
				buc[a[i].rx].push_back(m_p(i, -1));
			}
		}
		for (int i = 1; i <= tx; ++i)
		{
			for (auto &w : buc[i])
			{
				int c = w.second, idx = w.first;
				int l = a[idx].ly, r = a[idx].ry - 1;
				T.update(1, 1, ty, l, r, c);
			}
			res += T.sum[1][3] - T.sum[1][2] * 3 + T.sum[1][1] * 2;
		}
		return res;
	}

	void main()
	{
		Tri += doit();
		for (int i = 1; i <= n; ++i) ++a[i].lx;
		Tri -= doit();
		for (int i = 1; i <= n; ++i) ++a[i].ly;
		Tri += doit();
		for (int i = 1; i <= n; ++i) --a[i].lx;
		Tri -= doit();
		Tri /= 6;
	}
}

void solve()
{
	solver0::main();
	solver1::main();
	ull X = 0, Y = 0;
	for (int i = 1; i <= n; ++i)
	{
		X += c2(deg[i]);
		Y += c2(n - 1 - deg[i]);
	}
	ull ans = (X + Y - 2 * Tri - c3(n)) / 2;
	printf("%llu\n", ans);
}

int main()
{
	init();
	solve();
	return 0;
}
