#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

int n;
char s[2005][2005];

int deg[2005];
bitset<2005> G[2005];
ll A, B, C, D;

void solve() {
    for (int i = 1; i <= n; i++)
        A += 1LL * deg[i] * (deg[i] - 1) * (deg[i] - 2) / 6,
        C += deg[i] * (deg[i] - 1) / 2;
    for (int i = 1; i <= n; i++)
    for (int j = i + 1; j <= n; j++) if (G[i][j])
        B += (deg[i] - 1) * (deg[j] - 1) - (G[i] & G[j]).count();
    for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++) if (G[i][j])
        D += (deg[i] - 2) * (G[i] & G[j]).count();
}

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
        scanf("%s", s[i] + 1);

    memset(deg, 0, sizeof(deg));
    for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        G[i][j] = s[i][j] == 'B',
        deg[i] += s[i][j] == 'B';
    solve();
    
    memset(deg, 0, sizeof(deg));
    for (int i = 1; i <= n; i++)
    for (int j = 1; j <= n; j++)
        G[i][j] = s[i][j] == 'Y',
        deg[i] += s[i][j] == 'Y';
    solve();

    D /= 2;
    C *= (n - 3);
    printf("%lld\n", -3 * A + (C - B) / 2 + D);
}