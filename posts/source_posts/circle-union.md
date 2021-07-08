---
title: 圆面积并的靠谱做法
---

我们来解释一下如下的**斯托克斯公式**：
$$
\int_Md\omega=\int_{\part M}\omega
$$
其中 $M$ 是一个 $n$ 维**流形**（你可以理解为超区域），$\part M$ 是它的**有向边界**，$\omega$ 是一个定义在 $M$ 上的 $n-1$-形式。

### Q1. $n-1$-形式是什么意思？

首先，我们认为一个光滑函数 $f$ 是一个 0-形式。

一个 $n$-形式 大概长这样：$fdx_1dx_2...dx_n$。其中 $dx_i$ 之间不是普通的乘法而是**楔积** $\land$，它满足反交换律
$$
dx_1\land dx_2=-dx_2\land dx_1
$$

> ~~原来这就是叉积一般重载成异或的原因吗？！远古时期程序员人均数学系可能性微存~~

### Q2. 如何对 $n-1$-形式求微分？

对于一个 $k$-形式 $\omega=fdx_I$，定义
$$
d\omega=\sum_{i=1}^n\dfrac{\part f}{\part x_i}dx_i\land dx_I
$$
比如我们取 $\omega =xdy$ 就有 $d\omega=dx\land dy$。

### Q3. 如何对 $n$-形式求积分？

这里的积分指的是在区域 $M$ 上积分，记为 $\int_M$。积分法则很简单：你可以把 $dx\land dy$ 看成面积微元，那么这就变成我们比较熟悉的积分了。注意 $dx\land dy$ 和 $dy\land dx$ 并不相等：它们差了 $-1$。

## 具体操作

考虑求一些圆的并 $M$ 的面积，那么直接取 $d\omega=dx\land dy,\omega=xdy$ 即可发现斯托克斯公式的左边就是面积。

> 不过其实 $d\omega=dx\land dy$ 的 $\omega$ 不止一个，比如 $-ydx,\dfrac 12(xdy-ydx)$ 之类的都可以。下面以 $\omega=xdy$ 为例。

右边写出来是
$$
\int_{\part M}xdy
$$
由于积分是可加的，所以我们只需要把每一段连续的边界，也就是一段段圆弧，全部加起来即可。下面考虑圆弧 $(x_0+\cos\theta r,y_0+\sin\theta r),r\in(\alpha,\beta)$。
$$
r\int_{\alpha}^{\beta}(x_0\cos\theta+r\cos^2\theta )d\theta\\
=rx_0(\sin\beta-\sin\alpha)+r^2\int_{\alpha}^{\beta}\dfrac{(\cos2\theta+1)}{4}d2\theta\\
=rx_0(\sin\beta-\sin\alpha)+\dfrac {r^2}{4}(\sin 2\beta-\sin 2\alpha+2\beta-2\alpha)
$$
可以发现这里面又有 $\alpha$ 又有 $\sin\alpha$，三角函数必然是逃不掉了（悲）

## 更具体的操作

那么问题来了，如何找出边界呢？只需要对每个点，求出其他所有圆和它的交点，排个序处理一下就可以得到其“暴露在外”的部分了。

代码如下。

```cpp
#include<bits/stdc++.h>
typedef double db;
using namespace std;

struct Vec {
	db x, y;
	Vec () { x = 0; y = 0; }
	Vec (db x0, db y0) : x(x0), y(y0) {};
	db arg() { return atan2(y, x); }
	db norm() { return x * x + y * y; }
	Vec operator +(const Vec v) const { return {x + v.x, y + v.y}; }
	Vec operator -(const Vec v) const { return {x - v.x, y - v.y}; }
};
Vec operator *(const db l, const Vec u) { return {l * u.x, l * u.y}; }
struct Circ {
	Vec O; db r;
};

const db eps = 1e-9, pi = acos(-1);
bool ge(const db u, const db v) { return u + eps > v; }
bool gne(const db u, const db v) { return u > v + eps; }
bool le(const db u, const db v) { return u < v + eps; }
bool lne(const db u, const db v) { return u + eps < v; }
bool eq(const db u, const db v) { return abs(u - v) < eps; }

db Dis(const Vec u, const Vec v) {
	return sqrt((u - v).norm());
}

int n;
Circ c[1005];

db calc(const Circ u, db tht) {
	return u.r * u.O.x * sin(tht) + u.r * u.r / 4 * (sin(2 * tht) + 2 * tht);
}
db ans;
void solve(int i) {
	vector<pair<db, int> > tht;
	tht.push_back(make_pair(pi, 0));
	int cnt = 0;
	for(int j = 1; j <= n; j++) if(j != i) {
		#define u c[i]
		#define v c[j]
		db Odis = Dis(u.O, v.O);
		if(le(u.r + Odis, v.r)) return;
		if(le(v.r + Odis, u.r) || le(v.r + u.r, Odis)) continue;
		db p = (Vec){v.O.x - u.O.x, v.O.y - u.O.y}.arg();
		db q = acos((u.r * u.r + Odis * Odis - v.r * v.r) / (2 * u.r * Odis));
		db l = p - q, r = p + q;
		if(lne(l, -pi)) l += 2 * pi; if(gne(r, pi)) r -= 2 * pi;
		if(l > r) cnt++;
		tht.push_back(make_pair(l, 1)); tht.push_back(make_pair(r, -1));
	}
	sort(tht.begin(), tht.end());
	if(cnt == 0) ans += calc(c[i], tht[0].first) - calc(c[i], -pi);
	for(int j = 0; j < tht.size(); cnt += tht[j++].second)
		if(j && cnt == 0) ans += calc(c[i], tht[j].first) - calc(c[i], tht[j - 1].first);
}

vector<int> c_[1005];

int main() {
	int n_; scanf("%d", &n_);
	for(int i = 1; i <= n_; i++) c_[i].resize(3), scanf("%d%d%d", &c_[i][0], &c_[i][1], &c_[i][2]);
	sort(c_ + 1, c_ + n_ + 1); n_ = unique(c_ + 1, c_ + n_ + 1) - c_ - 1;
	n = n_;
	for(int i = 1; i <= n; i++) c[i].O.x = c_[i][0], c[i].O.y = c_[i][1], c[i].r = c_[i][2];
	for(int i = 1; i <= n; i++) solve(i);
	printf("%.3lf\n", ans);
}
```

## 例题和扩展

### [圆形](https://uoj.ac/problem/419)

垃圾题，动态维护“暴露在外”的部分即可。

### 球面圆面积并

参见论文集 2020 中 zrf 的部分。