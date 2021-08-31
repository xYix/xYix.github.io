#include <algorithm>
#include <bitset>
#include <cassert>
#include <cmath>
#include <cstdio>
#include <cstring>
#include <cstdlib>
#include <ctime>
#include <functional>
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
typedef long long ll;
typedef pair<int, int> pii;
#define gc() getchar()
//#define gc() (p1 == p2 && (p2 = (p1 = buf) + fread(buf, 1, 1 << 21, stdin), p1 == p2) ? EOF : *p1++)
char buf[1 << 21], *p1 = buf, *p2 = buf;
template <class T> void read(T &x)
{
    x = 0; int c = gc(); int flag = 0;
    while (c < '0' || c > '9') flag |= (c == '-'), c = gc();
    while (c >= '0' && c <= '9') x = (x << 3) + (x << 1) +(c ^ 48), c = gc();
    if (flag) x = -x;
}
template <class T> bool checkmax(T &a, T b){return a < b ? a = b, 1 : 0;}
template <class T> bool checkmin(T &a, T b){return b < a ? a = b, 1 : 0;}
int ten[100], C;
char dp[43][7][7][7][7][7][7][7][7], method[43][7][7][7][7][7][7][7][7];
void init()
{
	ten[0] = 1; for (int i = 1; i <= 50; ++i) ten[i] = ten[i - 1] * 3 % 7;
	dp[0][0][0][0][0][0][0][0][0] = 1;
	for (int i = 0; i < 42; ++i)
	{
		for (int e0 = 0; e0 < 7; ++e0)
		{
			for (int e1 = 0; e1 < 7; ++e1)
			{
				for (int e2 = 0; e2 < 7; ++e2)
				{
					for (int e3 = 0; e3 < 7; ++e3)
					{
						for (int e4 = 0; e4 < 7; ++e4)
						{
							for (int e5 = 0; e5 < 7; ++e5)
							{
								int e6 = i - e0 - e1 - e2 - e3 - e4 - e5;
								if (0 <= e6 && e6 < 7)
								{
									for (int x = 0; x < 7; ++x) if (dp[i][e0][e1][e2][e3][e4][e5][e6][x])
									{
										if (e0 < 6) dp[i + 1][e0 + 1][e1][e2][e3][e4][e5][e6][(x + ten[i + 1] * 0) % 7] = 1;
										if (e1 < 6) dp[i + 1][e0][e1 + 1][e2][e3][e4][e5][e6][(x + ten[i + 1] * 1) % 7] = 1;
										if (e2 < 6) dp[i + 1][e0][e1][e2 + 1][e3][e4][e5][e6][(x + ten[i + 1] * 2) % 7] = 1;
										if (e3 < 6) dp[i + 1][e0][e1][e2][e3 + 1][e4][e5][e6][(x + ten[i + 1] * 3) % 7] = 1;
										if (e4 < 6) dp[i + 1][e0][e1][e2][e3][e4 + 1][e5][e6][(x + ten[i + 1] * 4) % 7] = 1;
										if (e5 < 6) dp[i + 1][e0][e1][e2][e3][e4][e5 + 1][e6][(x + ten[i + 1] * 5) % 7] = 1;
										if (e6 < 6) dp[i + 1][e0][e1][e2][e3][e4][e5][e6 + 1][(x + ten[i + 1] * 6) % 7] = 1;
										if (e0 < 6) method[i + 1][e0 + 1][e1][e2][e3][e4][e5][e6][(x + ten[i + 1] * 0) % 7] = 0;
										if (e1 < 6) method[i + 1][e0][e1 + 1][e2][e3][e4][e5][e6][(x + ten[i + 1] * 1) % 7] = 1;
										if (e2 < 6) method[i + 1][e0][e1][e2 + 1][e3][e4][e5][e6][(x + ten[i + 1] * 2) % 7] = 2;
										if (e3 < 6) method[i + 1][e0][e1][e2][e3 + 1][e4][e5][e6][(x + ten[i + 1] * 3) % 7] = 3;
										if (e4 < 6) method[i + 1][e0][e1][e2][e3][e4 + 1][e5][e6][(x + ten[i + 1] * 4) % 7] = 4;
										if (e5 < 6) method[i + 1][e0][e1][e2][e3][e4][e5 + 1][e6][(x + ten[i + 1] * 5) % 7] = 5;
										if (e6 < 6) method[i + 1][e0][e1][e2][e3][e4][e5][e6 + 1][(x + ten[i + 1] * 6) % 7] = 6;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

void solve()
{
	int org[10] = {0}, c[7] = {0}, p = -1;
	for (int i = 0; i < 10; ++i) scanf("%d", &org[i]), c[i % 7] += org[i];
	for (int i = 0; i < 7; ++i) if (c[i] >= 7) p = i;

	vector<pii> ans;
	function<int(ll)> calc = [&](ll lim)
	{
		if (lim < 0) return 0;
		int o = 0;
		for (int i = 0; i <= lim % 6; ++i) o += ten[i];
		return o % 7;
	};

	function<int(int, ll, ll)> range = [&](int u, ll l, ll r)
	{
		return (u * calc(r) % 7 - u * calc(l - 1) % 7 + 7) % 7;
	};

	function<void(int, int)> append = [&](int u, int num)
	{
		if (num == 0) return;
		if (u > 2)
		{
			if (num) ans.push_back(m_p(u, num));
		}
		else
		{
			loop:;
			if (org[u] == 0)
			{
				if (num) ans.push_back(m_p(u + 7, num)), org[u + 7] -= num;
			}
			else
			{
				int o = min(num, org[u]);
				if (o) ans.push_back(m_p(u, o));
				num -= o, org[u] -= o;
				if (num == 0) return;
				goto loop;
			}
		}
	};

	function<void()> print = [&]()
	{
		printf("%d\n", sz(ans));
		//int x = 0;
		for (int i = 0; i < sz(ans); ++i)
		{
			printf("%d %d\n", ans[i].second, ans[i].first);
			//for (int j = 1; j <= ans[i].second % 6; ++j) x = (x * 3 + ans[i].first) % 7;
		}
		//outln(x);
		//assert(x == 0);
	};
	if (p == -1)
	{
		int sum = 0;
		for (int i = 0; i < 7; ++i) sum += c[i];
		if (dp[sum][c[0]][c[1]][c[2]][c[3]][c[4]][c[5]][c[6]][0] == 0)
		{
			printf("-1\n");
			return;
		}
		for (int i = sum, w = 0; i >= 1; --i)
		{
			int o = method[i][c[0]][c[1]][c[2]][c[3]][c[4]][c[5]][c[6]][w];
			--c[o];
			w = (w - o * ten[i] % 7 + 7) % 7;
			append(o, 1);
		}
		print();
		return;
	}
	ll tot = 0;
	for (int i = 0; i < 7; ++i) if (i != p) tot += c[i];
	if (tot == 0)
	{
		if (p != 0 && (c[p] % 6)) printf("-1\n");
		else append(p, c[p]), print();
		return;
	}
	
	if (tot == 1)
	{
		int q = -1, now = 0;
		for (int i = 0; i < 7; ++i) if (i != p && c[i]) q = i;
		int delta = (q - p + 7) % 7;
		for (int i = 0; i < (c[p] + 1) % 6; ++i) now = (now + ten[i]) % 7;
		now = now * p % 7;
		for (int i = 0; i < 6; ++i)
		{
			int cur = (now + delta * ten[i]) % 7;
			if (cur == 0)
			{
				append(p, c[p] - i);
				append(q, 1);
				append(p, i);
				print();
				return;
			}
		}
		printf("-1\n");
		return;
	}

	int A = -1, B = -1;
	c[p] -= 7;
	for (int i = 0; i < 7; ++i) if (i != p && c[i]) {A = i, --c[i]; break;}
	for (int i = 0; i < 7; ++i) if (i != p && c[i]) {B = i, --c[i]; break;}
	ll cnt = 0; int now = 0;
	now = (now + range(A, cnt, cnt)) % 7, cnt++;
	now = (now + range(B, cnt, cnt)) % 7, cnt++;
	for (int i = 6; i >= 0; --i) now = (now + range(i, cnt, cnt + c[i] - 1)) % 7, cnt += c[i];
	now = (now + range(p, cnt, cnt + 6)) % 7, cnt += 7;
	int seq[7] = {0}, coef[7] = {0};
	for (int i = 0; i < 7; ++i) seq[i] = p;
	for (int i = 0; i < 7; ++i) coef[i] = ten[(cnt - i - 1) % 6];
	for (int i = 0, w = (A - p + 7) % 7; i < 7; ++i)
	{
		if ((now + (coef[i] - 1 + 7) * w % 7) % 7 == 0)
		{
			swap(seq[i], A);
			goto ed;
		}
	}
	{
		int wa = (A - p + 7) % 7, wb = (B - p + 7) % 7;
		for (int i = 0; i < 7; ++i) for (int j = 0; j < 7; ++j) if (i != j)
		{
			int na = (coef[i] + 6) * wa % 7;
			int nb = (coef[j] + 4) * wb % 7;
			if ((now + na + nb) % 7 == 0)
			{
				swap(seq[i], A);
				swap(seq[j], B);
				goto ed;
			}
		}
	}
	ed: ;
	for (int i = 0; i < 7; ++i) append(seq[i], 1);
	for (int i = 0; i < 7; ++i) append(i, c[i]);
	append(B, 1); append(A, 1);
	print();
}

int main()
{
	init();
	int t; scanf("%d", &t);
	for (C = 1; C <= t; ++C)
	{
		solve();
	}
	return 0;
}
