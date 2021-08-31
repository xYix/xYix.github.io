#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef double db;

const int pi = acos(-1), eps = 1e-14;
db dis(db xs, db ys, db xt, db yt) {
    return (xt - xs) * (xt - xs) + (yt - ys) * (yt - ys);
}
struct circ {
    db xO, yO;
    db r;
    bool isine(db x, db y) {
        return dis(x, y, xO, yO) <= r * r + 1e-14;
    }
    bool isin(db x, db y) {
        return dis(x, y, xO, yO) < r * r - 1e-14;
    }
};

db xs, ys, xt, yt;
int n;
db l[100005]; db sl[100005];
db pre_maxl[100005], suf_maxl[100005];

/*
5 6 42 56
4 21 34 12 13
*/

db InterSec(const circ u, const circ v) {
    db Odis = sqrt(dis(u.xO, u.yO, v.xO, v.yO));
    if (u.r + Odis <= v.r) return -1e20;
    if (v.r + Odis <= u.r || v.r + u.r <= Odis) return -1e20;
    db p = atan2(v.yO - u.yO, v.xO - u.xO);
    db q = acos((u.r * u.r + Odis * Odis - v.r * v.r) / (2 * u.r * Odis));
    db l = p - q, r = p + q;
    // printf("%.3lf : %.3lf\n", dis(v.xO, v.yO, u.xO + u.r * cos(l), u.yO + u.r * sin(l)), v.r * v.r);
    // assert(dis(v.xO, v.yO, u.xO + u.r * cos(l), u.yO + u.r * sin(l)) == v.r * v.r);
    return max(u.yO + u.r * sin(l), u.yO + u.r * sin(r));
}

int main() {
    scanf("%lf%lf%lf%lf", &xs, &ys, &xt, &yt);
    scanf("%d", &n);
    for (int i = 1; i <= n; i++)
        scanf("%lf", &l[i]), sl[i] = sl[i - 1] + l[i],
        pre_maxl[i] = max(pre_maxl[i - 1], l[i]);
    for (int i = n; i; i--)
        suf_maxl[i] = max(suf_maxl[i + 1], l[i]);
    db ans = -1e20;
    circ cs0, cs1, ct0, ct1;
    cs0.xO = cs1.xO = xs, cs0.yO = cs1.yO = ys;
    ct0.xO = ct1.xO = xt, ct0.yO = ct1.yO = yt;
    for (int p = 0; p <= n; p++) {
        cs1.r = sl[p], cs0.r = max(0.0, 2 * pre_maxl[p] - sl[p]);
        ct1.r = sl[n] - sl[p], ct0.r = max(0.0, 2 * suf_maxl[p + 1] - sl[n] + sl[p]);
        ans = max(ans, InterSec(cs0, ct0));
        ans = max(ans, InterSec(cs0, ct1));
        ans = max(ans, InterSec(cs1, ct0));
        ans = max(ans, InterSec(cs1, ct1));
        db qaqx = xs, qaqy = ys + cs1.r;
        if (cs1.isine(qaqx, qaqy) && ct1.isine(qaqx, qaqy) && !cs0.isin(qaqx, qaqy) && !ct0.isin(qaqx, qaqy))
            ans = max(ans, qaqy);
        qaqx = xt, qaqy = yt + ct1.r;
        if (cs1.isine(qaqx, qaqy) && ct1.isine(qaqx, qaqy) && !cs0.isin(qaqx, qaqy) && !ct0.isin(qaqx, qaqy))
            ans = max(ans, qaqy);
    }
    if (ans < -1e18) printf("IMPOSSIBLE\n");
    else printf("%.7lf\n", ans);
}