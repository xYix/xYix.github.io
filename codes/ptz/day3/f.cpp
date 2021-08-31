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
#include <numeric>
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
#define outarr(x, l, r) {cerr << #x"[" << l << " ~ " << r << "] = "; for (int _i = l; _i <= r; ++_i) cerr << x[_i] << " "; cerr << endl;}
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
    while (c >= '0' && c <= '9') x = (x << 3) + (x << 1) + (c ^ 48), c = gc();
    if (flag) x = -x;
}
template <class T> bool checkmax(T &a, T b){return a < b ? a = b, 1 : 0;}
template <class T> bool checkmin(T &a, T b){return b < a ? a = b, 1 : 0;}
int p;
struct Z
{
	int x;
	Z(int x = 0):x(x){}
};
Z operator + (const Z &a, const Z &b){int o = a.x + b.x; return o >= p ? o - p : o;}
Z operator - (const Z &a, const Z &b){int o = a.x - b.x; return o < 0 ? o + p : o;}
Z operator * (const Z &a, const Z &b){return (ll)a.x * b.x % p;}
Z& operator += (Z &a, const Z &b){return a = a + b;}
Z& operator -= (Z &a, const Z &b){return a = a - b;}
Z& operator *= (Z &a, const Z &b){return a = a * b;}
Z qpow(Z a, int b){Z ans = 1; while (b) {if (b & 1) ans = ans * a; b >>= 1; a = a * a;} return ans;}
Z operator / (const Z &a, const Z &b){return a * qpow(b, p - 2);}
Z& operator /= (Z &a, const Z &b){return a = a / b;}
ostream& operator << (ostream &out, const Z &a){out << a.x; return out;}
Z a, b, c, d;

void init()
{
	scanf("%d%d%d%d", &a.x, &b.x, &c.x, &d.x);
}

bool check(int k)
{
	Z x = a + b;
	Z w = (a * (1 << k) - c) / x;
	if (w.x < (1 << k)) return 1;
	return 0;
}

void solve()
{
	if ((a + b).x != (c + d).x)
	{
		printf("-1\n");
		return;
	}
	if (a.x == c.x)
	{
		printf("0\n");
		return;
	}
	for (int i = 1; i <= 30; ++i)
	{
		if (check(i))
		{
			printf("%d\n", i);
			return;
		}
	}
	printf("-1\n");
}

int main()
{
    //setIO("");
	int t;
	scanf("%d%d", &p, &t);
	while (t--)
	{
    	init();
    	solve();
	}
    return 0;
}