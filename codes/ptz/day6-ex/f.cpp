#include<bits/stdc++.h>
using namespace std;

set<int> S;
int n;
int c[100005];

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) scanf("%d", &c[i]);
    int ans = 0;
    for (int i = 1; i <= n; i++) if (!S.count(c[i])) {
        if (i + 1 <= n && c[i + 1] == c[i]) ans++, S.insert(c[i]);
        else if (i + 2 <= n && c[i + 2] == c[i]) ans++, S.insert(c[i]);
    }
    printf("%d\n", ans);
}