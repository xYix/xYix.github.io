#include <algorithm>
#include <cassert>
#include <cstdio>
#include <cstring>
#include <iostream>
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
#define outarr(x, l, r) {cerr << #x"[" << l << " ~ " << r << "] = "; for (int _i = l; _i <= r; ++_i) cerr << x[_i] << " "; cerr << endl;}
using namespace std;
typedef long long ll;
typedef pair<int, int> pii;
template <class T> bool checkmax(T &a, T b){return a < b ? a = b, 1 : 0;}
template <class T> bool checkmin(T &a, T b){return b < a ? a = b, 1 : 0;}
const int B = 17;
const int N = 100005;
int n, m, q;
vector<int> G[N];
int typ[N], pos[N], val[N], bel[N];
int hbit[18][1 << 18];
int qu[N], head = 1, tail = 0;
int deg[N];
int seq[N], len = 0;
int msk[N];
int a[N];
int ans[N], ans_siz = 0;
int Set[1 << 18], Min[1 << 18];

void topo()
{
	for (int i = 1; i <= n; ++i) if (deg[i] == 0) qu[++tail] = i;
	while (head <= tail)
	{
		int x = qu[head++];
		seq[++len] = x;
		for (auto &to : G[x])
		{
			if ((--deg[to]) == 0)
			{
				qu[++tail] = to;
			}
		}
	}
}

void init()
{
	scanf("%d%d%d", &n, &m, &q);
	for (int i = 1, x, y; i <= m; ++i)
	{
		scanf("%d%d", &x, &y);
		G[x].push_back(y);
		++deg[y];
	}
	for (int i = 1; i <= q; ++i)
	{
		scanf("%d%d", &typ[i], &pos[i]);
		if (typ[i] <= 2) scanf("%d", &val[i]);
		bel[i] = (i - 1) / B + 1;
	}
	for (int i = 1; i <= B; ++i)
	{
		for (int j = 0; j < (1 << i); ++j)
		{
			for (int k = 0; k < i; ++k) if (j >> k & 1) hbit[i][j] = k;
		}
	}
	topo();
}

pii buc[20];
int Map[20];
void run(int l, int r)
{
	int top = 0; 
	for (int i = l; i <= r; ++i) if (typ[i] <= 2) Map[top] = i, buc[top++] = m_p(typ[i], val[i]);
	Set[0] = Min[0] = -1;
	for (int i = 1; i < (1 << top); ++i)
	{
		Set[i] = Min[i] = -1;
		int o = hbit[top][i], u = i ^ (1 << o);
		if (buc[o].first == 1)
		{
			Set[i] = buc[o].second;
			Min[i] = -1;
		}
		else
		{
			Set[i] = Set[u];
			Min[i] = Min[u] == -1 ? buc[o].second : min(Min[u], buc[o].second);
		}
		//out(i); out(Set[i]); outln(Min[i]);
	}
	for (int i = 1; i <= n; ++i) msk[i] = 0;
	for (int i = 0; i < top; ++i) msk[pos[Map[i]]] |= (1 << i);
	//outarr(msk, 1, n);
	for (int i = 1; i <= n; ++i)
	{
		int u = seq[i];
		for (auto &to : G[u])
		{
			msk[to] |= msk[u];
		}
	}
	//outarr(msk, 1, n);
	for (int i = l; i <= r; ++i)
	{
		if (typ[i] == 3)
		{
			int u = pos[i], num = a[u];
			for (int j = 0; j < top; ++j)
			{
				if (Map[j] < i)
				{
					if (msk[u] >> j & 1)
					{
						if (buc[j].first == 1)
						{
							num = buc[j].second;
						}
						else
						{
							checkmin(num, buc[j].second);
						}
					}
				}
				else break;
			}
			ans[++ans_siz] = num;
		}
	}
	for (int i = 1; i <= n; ++i)
	{
		if (~Set[msk[i]]) a[i] = Set[msk[i]];
		if (~Min[msk[i]]) checkmin(a[i], Min[msk[i]]);
	}
}

void solve()
{
	for (int i = 1; i <= bel[q]; ++i)
	{
		int l = (i - 1) * B + 1, r = i * B;
		checkmin(r, q);
		run(l, r);
	}
	for (int i = 1; i <= ans_siz; ++i)
	{
		printf("%d\n", ans[i]);
	}
}

int main()
{
	init();
   	solve();
    return 0;
}
