#include<bits/stdc++.h>
using namespace std;

int n;
int a[1000005];
bool qaq[1000005];

int main() {
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) {
        scanf("%d", &a[i]);
        qaq[a[i]] = 1;
    }
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j * j <= a[i]; j++) if (a[i] % j == 0) {
            if ((j + a[i] / j) % 2 == 0)
                ans += qaq[(a[i] / j - j) / 2];
        }
    }
    printf("%d\n", ans);
}