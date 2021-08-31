#include <algorithm>
#include <cassert>
#include <cstdio>
#include <cstring>
#include <iostream>
#include <set>
#include <map>
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
const ll inf = 1000000000000000, M = 172;
int fib[] = {0, 1, 2, 3, 5, 8, 13, 21, 34};
int seq[] = {1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 6, 7, 7};
int f[M + 5];
int g[1000005], method[1000005];

void init()
{
	for (int i = 0; i < 24; ++i) seq[i] = fib[seq[i]];
	f[0] = 1;
	for (int i = 0; i < 24; ++i)
	{
		for (int j = M; j >= seq[i]; --j)
		{
			f[j] += f[j - seq[i]];
		}
	}
	memset(g, 0x3f, sizeof g);
	g[0] = 0;
	for (int i = 1; i <= M; ++i)
	{
		for (int j = 1000000; j >= f[i]; --j)
		{
			if (checkmin(g[j], g[j - f[i]] + 1))
			{
				method[j] = i;
			}
		}
	}
	for (int i = 1; i <= 1000000; ++i) if (g[i] > 5) cerr << i << " " << g[i] << endl;
}

void solve()
{
	int k; scanf("%d", &k);
	if (k == 1)
	{
		printf("1\n1\n");
		return;
	}
	--k;
	ll ans[40] = {0}; int len = 24;
	for (int i = 1; i <= len; ++i) ans[i] = seq[i - 1];
	ans[++len] = inf;
	while (k)
	{
		int u = method[k];
		ans[++len] = -inf - u;
		k -= f[u];
	}
	printf("%d\n", len);
	for (int i = 1; i <= len; ++i) printf("%lld ", ans[i]);
	printf("\n");
}

int main()
{
	srand(time(0));
	init();
	int t; scanf("%d", &t); while (t--) solve();
	return 0;
}