#include<bits/stdc++.h>
#define ppc __builtin_popcount
#define ctz __builtin_ctz
typedef unsigned short u16;
typedef unsigned int u32;
typedef unsigned long long u64;

// g = 10279
u32 f2n_[16] = {0x0001u, 0x2827u, 0x392bu, 0x8000u, 0x20fdu, 0x4d1du, 0xde4au, 0x0a17u, 0x3464u, 0xe3a9u, 0x6d8du, 0x34bcu, 0xa921u, 0xa173u, 0x0ebcu, 0x0e69u};
u32 n2f_[16] = {0x0001u, 0x8ff5u, 0x6cbfu, 0xa5beu, 0x761au, 0x8238u, 0x4f08u, 0x95acu, 0xf340u, 0x1336u, 0x7d5eu, 0x86e7u, 0x3a47u, 0xe796u, 0xb7c3u, 0x0008u};
u32 f2n(u32 x) { u32 hx = 0; for (; x; x &= x - 1) hx ^= f2n_[ctz(x)]; return hx; }
u32 n2f(u32 x) { u32 hx = 0; for (; x; x &= x - 1) hx ^= n2f_[ctz(x)]; return hx; }

u16 exp_[65536 * 2 + 10], ln_[65536];
void init() {
    u32 x = exp_[0] = 1;
    for (int i = 1; i < 65535; i++) exp_[i] = (u16)(x = (x << 1) ^ (x < 0x8000u ? 0 : 0x1681fu));
    for (int i = 0; i < 65535; i++) ln_[exp_[i] = f2n(exp_[i])] = i;
    memcpy(exp_ + 65535, exp_, 131070);
    memcpy(exp_ + 131070, exp_, 20);
}

u16 p_(const u16 a, const u16 b) { return a && b ? exp_[ln_[a] + ln_[b]] : 0; }
u16 Hp_(const u16 a, const u16 b) { return a && b ? exp_[ln_[a] + ln_[b] + 3] : 0; }
u16 H_(const u16 a) { return exp_[ln_[a] + 3]; }
u16 HH_(const u16 a) { return exp_[ln_[a] + 6]; }

u32 p(const u32 a, const u32 b) {
	u16 u1 = a & 65535, v1 = b & 65535, u2 = a >> 16, v2 = b >> 16, e = p_(u1, v1);
	return ((u32)(e ^ p_(u1 ^ u2, v1 ^ v2)) << 16) ^ Hp_(u2, v2) ^ e;
}
u32 H(const u32 a) {
	u16 u1 = a & 65535, u2 = a >> 16;
	return ((u32)H_(u1 ^ u2) << 16) ^ HH_(u2);
}

u32 qpow(u32 a, u32 k) {
	u32 ans = 1;
	while (k) {
		if (k & 1) ans = p(ans, a);
		a = p(a, a);
		k >>= 1;
	}
	return ans;
}

long long n; int k;
u32 K[131072], B[20]; int e[20], cnt;
u32 tmp[262144];
void mul() {
    memset(tmp, 0, sizeof(tmp));
    for (int i = 0; i < k; i++)
    for (int j = 0; j < cnt; j++)
        tmp[i + e[j]] ^= p(K[i], B[j]);
}

int main() {
	init(); //important
    scanf("%d%lld", &k, &n); k--; n--;
    for (int i = 0; i < k; i++) scanf("%u", &K[i]);
    B[cnt] = 1, e[cnt++] = 0;
    for (int i = 1; i <= 5; i++)
        scanf("%u", &B[cnt]), e[cnt++] = i;
    for (int i = 1; i <= 5; i++)
        scanf("%u", &B[cnt]), e[cnt++] = k - i + 1;
    mul();
    for (int i = 0; i < k; i++) K[i] = tmp[i];

    while (n) {
        mul();
        for (int i = 0; i < k; i++) K[i] = tmp[i + i + (n & 1)];
        for (int i = 0; i < cnt; i++) B[i] = p(B[i], B[i]);
        n >>= 1;
    }
    printf("%u\n", K[0]);
}