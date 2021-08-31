#include <algorithm>
#include <cstdio>
#include <cstring>
#include <functional>
#include <iostream>
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
const int N = 1005;
int n;
int a[N], b[N], c[N];
int seq[N << 1];

void init()
{
	scanf("%d", &n);
	for (int i = 1; i <= n; ++i) scanf("%d", &a[i]);
	for (int i = 1; i <= n; ++i) scanf("%d", &b[i]);
	sort(a + 1, a + n + 1), sort(b + 1, b + n + 1);
}

void solve()
{
	int w = 0, ansa = 0, ansb = 0;
	for (int r = n; r >= 1; --r)
	{
		if (b[1] > a[r]) {ansb += r; break;}
		if (a[1] > b[r]) {ansa += r; break;}
		if (w == 0)
		{
			int d = -n, pos = 0;
			for (int i = 1; i <= r; ++i) if (b[r] > a[i])
			{
				int j = lower_bound(b + 1, b + r + 1, a[i]) - b;
				c[i] = j;
				if (checkmax(d, i - j)) pos = i;
			}
			ansb++, w = 1;
			for (int i = 1, o = 0; i <= r; ++i) if (i != pos) a[++o] = a[i];
			for (int i = 1, o = 0; i <= r; ++i) if (i != c[pos]) b[++o] = b[i];
		}
		else
		{
			int d = -n, pos = 0;
			for (int i = 1; i <= r; ++i) if (a[r] > b[i])
			{
				int j = lower_bound(a + 1, a + r + 1, b[i]) - a;
				c[i] = j;
				if (checkmax(d, i - j)) pos = i;
			}
			ansa++, w = 0;
			for (int i = 1, o = 0; i <= r; ++i) if (i != pos) b[++o] = b[i];
			for (int i = 1, o = 0; i <= r; ++i) if (i != c[pos]) a[++o] = a[i];
		}
		int len = 0;
		for (int i = 1; i < r; ++i) seq[++len] = a[i];
		for (int i = 1; i < r; ++i) seq[++len] = b[i];
		sort(seq + 1, seq + len + 1);
		for (int i = 1; i < r; ++i) a[i] = lower_bound(seq + 1, seq + len + 1, a[i]) - seq;
		for (int i = 1; i < r; ++i) b[i] = lower_bound(seq + 1, seq + len + 1, b[i]) - seq;
	}
	printf("%d\n", ansa);
}

int main()
{
    init();
   	solve();
    return 0;
}