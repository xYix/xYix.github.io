#include <algorithm>
#include <cassert>
#include <cstdio>
#include <cstring>
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
const int mod = 998244353;
struct Z
{
	int x;
	Z(int x = 0):x(x){}
};
Z operator + (const Z &a, const Z &b){int o = a.x + b.x; return o >= mod ? o - mod : o;}
Z operator - (const Z &a, const Z &b){int o = a.x - b.x; return o < 0 ? o + mod : o;}
Z operator * (const Z &a, const Z &b){return (ll)a.x * b.x % mod;}
Z& operator += (Z &a, const Z &b){return a = a + b;}
Z& operator -= (Z &a, const Z &b){return a = a - b;}
Z& operator *= (Z &a, const Z &b){return a = a * b;}
Z qpow(Z a, int b){Z ans = 1; while (b) {if (b & 1) ans = ans * a; b >>= 1; a = a * a;} return ans;}
Z operator / (const Z &a, const Z &b){return a * qpow(b, mod - 2);}
Z& operator /= (Z &a, const Z &b){return a = a / b;}
ostream& operator << (ostream &out, const Z &a){out << a.x; return out;}
const int N = 2000005;
char s[N << 1], t[N << 1];
int n, m;
int a[N], b[N], c[N], d[N];
int sa[N][4], sb[N][4], sc[N][4], sd[N][4];

void init()
{
	scanf("%d%s%s", &n, s + 1, t + 1), m = n + n + 1;
	for (int i = 1, o = 1; i <= m; i += 2, ++o) a[o] = (s[i] == '?' ? 3 : s[i] - 'A');
	for (int i = 2, o = 1; i <= m; i += 2, ++o) c[o] = (s[i] == '?' ? 3 : s[i] - 'A');
	for (int i = 1, o = 1; i <= m; i += 2, ++o) b[o] = (t[i] == '?' ? 3 : t[i] - 'A');
	for (int i = 2, o = 1; i <= m; i += 2, ++o) d[o] = (t[i] == '?' ? 3 : t[i] - 'A');
	m = n + 1;
	for (int i = 1; i <= m; ++i) memcpy(sa[i], sa[i - 1], sizeof sa[i]), sa[i][a[i]]++;
	for (int i = 1; i <= m; ++i) memcpy(sb[i], sb[i - 1], sizeof sb[i]), sb[i][b[i]]++;
	for (int i = 1; i <= n; ++i) memcpy(sc[i], sc[i - 1], sizeof sc[i]), sc[i][c[i]]++;
	for (int i = 1; i <= n; ++i) memcpy(sd[i], sd[i - 1], sizeof sd[i]), sd[i][d[i]]++;
}

Z E(int k)
{
	for (int i = 1; i <= n; ++i)
	{
		if (c[i] != 3 && c[i] != k) return 0;
		if (d[i] != 3 && d[i] != k) return 0;
	}
	for (int i = 1; i <= n + 1; ++i)
	{
		if (a[i] == k) return 0;
		if (b[i] == k) return 0;
	}
	int k1 = (k + 1) % 3, k2 = (k + 2) % 3;
	Z ans = 0;
	//out(k1); outln(k2);
	for (int r = 0; r < 2; ++r)
	{
		for (int i = 1; i <= m - 1; ++i)
		{
			if (sa[i][k2] > 0 || sa[m][k1] > sa[i][k1]) continue;
			if (sb[i][k1] > 0 || sb[m][k2] > sb[i][k2]) continue;
			ans += 1;
		}
		swap(k1, k2);
	}
	return ans;
}

bool check(int A, int C, int B, int D)
{
	for (int i = 1; i <= m; ++i)
	{
		if (a[i] != 3 && a[i] != A) return 0;
		if (b[i] != 3 && b[i] != B) return 0;
	}
	for (int i = 1; i <= n; ++i)
	{
		if (c[i] != 3 && c[i] != C) return 0;
		if (d[i] != 3 && d[i] != D) return 0;
	}
	return 1;
}

Z calc(int A, int B, int C)
{
	Z ans = 1;
	for (int i = 1; i <= m; ++i) if (a[i] != 3 && a[i] != A) return 0;
	for (int i = 1; i <= m; ++i) if (b[i] != 3 && b[i] != B) return 0;
	for (int i = 1; i <= n; ++i) if (d[i] != 3 && d[i] != C) return 0;
	for (int i = 1; i <= n; ++i) if (c[i] == A) return 0;
	int ok = 0;
	for (int i = 2; i <= n; ++i) if (c[i] != c[1]) ok = 1;
	if (!ok) return 0;
	for (int i = 1; i <= n; ++i) if (c[i] == 3) ans *= 2;
	return ans;
}

void solve()
{
	Z ans = 0;
	for (int c = 0; c < 3; ++c) ans += E(c);
	//outln(ans);
	for (int i = 0; i < 3; ++i) for (int j = 0; j < 3; ++j) if (i != j)
	{
		for (int k = 0; k < 3; ++k) for (int l = 0; l < 3; ++l) if (k != l)
		{
			if (i == k) continue;
			if (i == l && j == k) continue;
			if (check(i, j, k, l)) ans += 1;
		}
	}
	//outln(ans);
	for (int i = 0; i < 3; ++i) for (int j = 0; j < 3; ++j) if (i != j) ans += calc(3 - i - j, i, j);
	//outln(ans);
	for (int i = 1; i <= n; ++i)
	{
		swap(c[i], d[i]);
		for (int j = 0; j < 4; ++j) swap(sc[i][j], sd[i][j]);
	}
	for (int i = 1; i <= m; ++i)
	{
		swap(a[i], b[i]);
		for (int j = 0; j < 4; ++j) swap(sa[i][j], sb[i][j]);
	}
	for (int i = 0; i < 3; ++i) for (int j = 0; j < 3; ++j) if (i != j) ans += calc(3 - i - j, i, j);
	//outln(ans);
	printf("%d\n", ans.x);
}

int main()
{
	int t; scanf("%d", &t); while (t--)
	{
    	init();
   		solve();
	}
    return 0;
}
