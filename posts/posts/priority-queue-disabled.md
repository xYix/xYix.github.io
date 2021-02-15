---
title: 一个有趣的，吊打单调队列的 trick
---

首先来看一道[高质量好题](https://atcoder.jp/contests/jag2018summer-day2/tasks/jag2018summer_day2_d?lang=en)：

> **题目大意.**
>
> 现在有一个背包。你要支持以下操作：
>
> - 添加一个物品。
> - 删去现存的最早加入的物品。
> - 查询当前所有物品做循环 max 卷积的结果（简而言之就是物品体积取模的背包）
>
> **强制在线**。
>
> 模数 $\le 500$，$Q\le 100000$。反正就是带 log 过不了。

显然询问时物品总是形成一个区间。

这个 trick 的核心思路是这样的：设一堆关键点，然后预处理前后缀，询问时合并。为了强在，关键点是动态设置的。

好了，你已经懂了，接下来看代码吧。

```cpp
#include<bits/stdc++.h>
typedef long long ll;
using namespace std;

//长的离谱的解密器
#include <cstdint> //uint8_t, uint32_t

class Crypto {
public:    
    Crypto() {
        sm = cnt = 0;
        seed();
    }

    int decode(int z) {
        z ^= next();
        z ^= (next() << 8);
        z ^= (next() << 16);
        z ^= (next() << 22);
        return z;
    }

    void query(long long z) {
        const long long B = 425481007;
        const long long MD = 1000000007;
        cnt++;
        sm = ((sm * B % MD + z) % MD + MD) % MD;
        seed();
    }
private: 
    long long sm;
    int cnt;

    uint8_t data[256];
    int I, J;

    void swap_data(int i, int j) {
        uint8_t tmp = data[i];
        data[i] = data[j];
        data[j] = tmp;    
    }

    void seed() {
        uint8_t key[8];
        for (int i = 0; i < 4; i++) {
            key[i] = (sm >> (i * 8));
        }
        for (int i = 0; i < 4; i++) {
            key[i+4] = (cnt >> (i * 8));
        }

        for (int i = 0; i < 256; i++) {
            data[i] = i;
        }
        I = J = 0;

        int j = 0;
        for (int i = 0; i < 256; i++) {
            j = (j + data[i] + key[i%8]) % 256;
            swap_data(i, j);
        }
    }

    uint8_t next() {
        I = (I+1) % 256;
        J = (J + data[I]) % 256;
        swap_data(I, J);
        return data[(data[I] + data[J]) % 256];
    }
} qaq;

const int maxn = 100005;

int p, q, n, L = 1;
int w[maxn], v[maxn];
int norm(int x) { return x >= p ? x - p : x; }
struct stk {
	ll f[maxn][505];
	int len;
	stk () {
		len = 0;
		memset(f[0], 192, sizeof(f[0]));
		f[0][0] = 0;
	}
	void pop() { --len; }
	void push(int id) {
		len++;
		memcpy(f[len], f[len - 1], sizeof(f[0]));
		for (int i = 0; i < p; i++)
			f[len][norm(i + v[id])] = max(f[len][norm(i + v[id])], f[len - 1][i] + w[id]);
	}
} pre, suf;

int getnum() {
	int x; scanf("%d", &x);
	return qaq.decode(x);
}

int main() {
	scanf("%d%d", &p, &q);
	while (q--) {
		int opt = getnum();
		if (opt == 1) {
			n++; v[n] = getnum() % p, w[n] = getnum();
			suf.push(n);
		}
		else {
			getnum(), getnum();
			if(pre.len == 0) {
				suf.len = 0;
				for (int i = n; i >= L; i--) pre.push(i);
			}
			L++; pre.pop();
		}
		
		int l = getnum() + p, r = getnum() + p;
		ll *f1 = pre.f[pre.len], *f2 = suf.f[suf.len];
		static int Q[maxn], h, t;
		static ll g[1005], ans;
		h = 1; t = 0; ans = -1;
		for (int i = 0; i < p + p; i++) g[i] = f1[norm(i)];
		for (int i = l + 1; i <= r; i++) {
			while (h <= t && g[Q[t]] < g[i]) t--;
			Q[++t] = i;
		}
		for (int i = p - 1; i >= 0; i--) {
			while (h <= t && i + Q[h] < l) h++;
			while (h <= t && g[Q[t]] <= g[r - i]) t--;
			Q[++t] = r - i;
			ans = max(ans, f2[i] + g[Q[h]]);
		}
		printf("%lld\n", ans); qaq.query(ans);
	}
}
```

