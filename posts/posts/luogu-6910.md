---
title: luoguP6910 题解 - [ICPC2015 WF]Pipe Stream
---

> **题目大意.**
>
> 有一个质点从原点出发以恒定但未知的速度 $v$ 向前运动，你可以随时询问当前时刻质点位置是否 $\ge x$，但是两次询问的间隔不能小于 $s$，而且要满足 $x\le L$。
>
> 已知 $v_1\le v\le v_2$，求至少几次询问一定可以把速度大小的绝对误差精确到 $\Delta v$，或者报告无解。

为了方便，我们把时间轴收缩为 $\dfrac 1 s$，即 $t\mapsto \dfrac{t}{s}$，$v\mapsto sv$。

**观察 1.** 每次询问恰好隔 1s。立刻问显然不比等一会再问劣。

**观察 2.** 如果没有 $L$ 的限制，答案即为 $\log_2\Big\lceil\dfrac{v_2-v_1}{\Delta v}\Big\rceil$。只需要把 $[v_1,v_2]$ 拆成长度为 $\Delta v$ 的数段，然后二分。

现在有了 $L$ 的限制，还是考虑如上分段，但是第 $i$ 次切分的位置 $v$ 必须保证 $v\le \dfrac{L}{i}$。考虑二分的分治树，我们的目的是让分治树尽可能平衡且不落入 $v>\dfrac{L}{i}$ 的禁区。也可以说是让 $n_i$（第 $i$ 次操作时的区间数）更快地达到 $\Big\lceil\dfrac{v_2-v_1}{\Delta v}\Big\rceil$。另记当前处理的分治区间为 $[v_1,u_i]$。

考虑转移到下一次操作，$i+1$ 次操作及之后，我们无法得知任何与 $>\dfrac{L}{i+1}$ 的部分有关的信息，故我们必须已经完全切分好它们，这需要我们匀一些区间出来，具体来说是 $n_f=\Big\lceil\dfrac{\max(u_i-\frac{L}{i+1}-\Delta v,0)}{\Delta v}\Big\rceil$；剩下的区间都可以切一刀，于是
$$
n_{i+1}=2(n_i-n_f)\\
u_{i+1}=u_i-n_f\Delta v
$$

```cpp
#include<bits/stdc++.h>
using namespace std;

double L, vL, vR, delv;

int main() {
	int T; scanf("%d", &T);
	while(T--) {
		double s; scanf("%lf%lf%lf%lf%lf", &L, &vL, &vR, &delv, &s);
		vL *= s; vR *= s; delv *= s;
		double u = vR; int n = 1;
		for(int i = 0; ; i++) {
			if(n <= 0) { printf("impossible\n"); break; }
			if(delv * n >= u - vL) { printf("%d\n", i); break; }
			int nf = ceil(max(u - L / (i + 1) - delv, 0.0) / delv);
			n = 2 * (n - nf);
			u -= nf * delv;
		}
	}
}
```

