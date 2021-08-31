#include <bits/stdc++.h>
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
const int mod = 1000000000 + 7;
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
const int N = 200005;
int n, m, ga, gb;
int a[N], b[N];
int A[N], B[N];
set<int> F;
int gcd(int x, int y){return y ? gcd(y, x % y) : x;}
void factor(int x)
{
	for (int i = 2; i * i <= x; ++i)
	{
		if (x % i == 0)
		{
			F.insert(i);
			while (x % i == 0) x /= i;
		}
	}
	if (x > 1) F.insert(x);
}

Z run(int p)
{
	for (int i = 1; i <= n; ++i)
	{
		A[i] = 0;
		while (a[i] % p == 0) ++A[i], a[i] /= p;
	}
	for (int i = 1; i <= m; ++i)
	{
		B[i] = 0;
		while (b[i] % p == 0) ++B[i], b[i] /= p;
	}
	sort(A + 1, A + n + 1); sort(B + 1, B + m + 1);
	int pa = n, pb = m;
	while (1)
	{
		if (B[pb] < A[1])
		{
			Z ans = 1, o = 1;
			for (int i = 1; i <= pb; ++i) ans *= (A[1] + 1);
			for (int i = 1; i <= pa; ++i) if (A[i] == A[1]) o *= (A[1] + 1);
			ans += o - 1;
			return ans;
		}
		if (A[pa] < B[1])
		{
			Z ans = 1, o = 1;
			for (int i = 1; i <= pa; ++i) ans *= (B[1] + 1);
			for (int i = 1; i <= pb; ++i) if (B[i] == B[1]) o *= (B[1] + 1);
			ans += o - 1;
			return ans;
		}
		if (B[1] == B[pb])
		{
			int c = B[1];
			Z wa = 1, wb = 1;
			for (int i = 1; i <= pa; ++i) if (A[i] <= c) wa *= (c + 1);
			for (int i = 1; i <= pb; ++i) wb *= (c + 1);
			return wa + wb - 1;
		}
		if (A[1] == A[pa])
		{
			int c = A[1];
			Z wa = 1, wb = 1;
			for (int i = 1; i <= pb; ++i) if (B[i] <= c) wb *= (c + 1);
			for (int i = 1; i <= pa; ++i) wa *= (c + 1);
			return wa + wb - 1;
		}
		if (A[pa] < B[pb]) --pb;
		else if (A[pa] > B[pb]) --pa;
		else --pa, --pb;
	}
}

void init()
{
	scanf("%d%d", &n, &m);
	for (int i = 1; i <= n; ++i) scanf("%d", &a[i]), ga = gcd(ga, a[i]);
	for (int i = 1; i <= m; ++i) scanf("%d", &b[i]), gb = gcd(gb, b[i]);
	factor(ga); factor(gb);
}

void solve()
{
	Z ans = 1;
	for (auto &x : F)
	{
		ans *= run(x);
	}
	printf("%d\n", ans.x);
}

int main()
{
	init();
	solve();
	return 0;
}
