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
pii vis[100];
int k;
void init()
{
	scanf("%d", &k);
	for (int i = 3; i <= 20; ++i)
	{
		for (int j = 2; j + i <= 20; ++j)
		{
			int o = i * (i - 1) / 2 - 1 + j - 1 + 2 * (i - 1);
			vis[o] = m_p(i, j);
		}
	}
}

void solve()
{
	if (vis[k].first && vis[k].second)
	{
		int cli = vis[k].first, cha = vis[k].second;
		printf("%d %d\n", cli + cha, cli * (cli - 1) / 2 + cha + 1);
		for (int i = 1; i <= cli; ++i)
		{
			for (int j = i + 1; j <= cli; ++j)
			{
				printf("%d %d\n", i, j);
			}
		}
		printf("1 %d\n", cli + 1);
		for (int i = 1; i < cha; ++i)
		{
			printf("%d %d\n", cli + i, cli + i + 1);
		}
		printf("%d 2\n", cli + cha);
		return;
	}
	if (k == 1)
	{
		printf("2 1\n1 2\n");
		return;
	}
	if (k == 2)
	{
		printf("4 4\n1 2\n1 3\n2 3\n3 4\n");
		return;
	}
	printf("%d %d\n", k, k);
	for (int i = 1; i < k; ++i)
	{
		printf("%d %d\n", i, i + 1);
	}
	printf("%d 1\n", k);
}

int main()
{
	init();
   	solve();
    return 0;
}

