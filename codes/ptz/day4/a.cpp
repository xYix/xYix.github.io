#include<iostream>
#include<cstdio>
#include<cstring>
#include<cmath>
#include<map>
#define N 1000010
#define mod 998244353
#define ll long long
#define fi first
#define se second
using namespace std;
int x[N],y[N],d[N];
int ksm(int a,long long b=mod-2)
{
    int r=1;
    for(;b;b>>=1)
    {
        if(b&1) r=1ll*r*a%mod;
        a=1ll*a*a%mod;
    }
    return r;
}
int rev[N*4];
int get_rev(int n)
{
    int lim=1,l=0;
    while(lim<=n*2) lim<<=1,l++;
    for(int i=0;i<lim;i++)
    rev[i]=(rev[i>>1]>>1)|((i&1)<<(l-1));
    return lim;
}
const double pi=acos(-1);
struct xu{
    double s,x;
    xu(double S=0.0,double X=0.0):s(S),x(X){};
    xu operator +(const xu a){return xu(s+a.s,x+a.x);}
    xu operator -(const xu a){return xu(s-a.s,x-a.x);}
    xu operator *(const xu a){return xu(s*a.s-x*a.x,s*a.x+x*a.s);}
};

void fft(xu a[],int n,int opt)
{
    for(int i=1;i<n;i++) if(i<rev[i]) swap(a[i],a[rev[i]]);
    for(int i=1;i<n;i<<=1)
    {
        xu omg(cos(pi/i),opt*sin(pi/i));
        for(int j=0;j<n;j+=i*2)
        {
            xu c(1,0);
            for(int k=0;k<i;k++,c=c*omg)
            {
                xu n1=a[j+k],n2=c*a[i+k+j];
                a[j+k]=n1+n2;
                a[i+j+k]=n1-n2;
            }
        }
    }
    if(opt==1) return;
    for(int i=0;i<n;i++)
    {
        a[i].s=a[i].s/n;
        a[i].x=a[i].x/n;
    }
}
ll f[N*2];int c[N*2];
xu a[N*4];
map<pair<int,int>,int>gc;
int main()
{
    int n,m;
    scanf("%d%d",&n,&m);
    for(int i=1;i<=m;i++)
    {
        scanf("%d%d",&x[i],&y[i]);
        if(x[i]>y[i]) swap(x[i],y[i]);
        if(x[i]==y[i]){d[x[i]]++;continue;}
        d[x[i]]++,d[y[i]]++;
        gc[make_pair(x[i],y[i])]++;
    }
    for(auto p:gc)
    {
        int v=d[p.fi.fi]+d[p.fi.se];
        for(int i=v-p.se;i<v;i++) c[i]++;
    }
    for(int i=1;i<=n;i++) a[d[i]].s++;
    int lim=get_rev(n+1);
    fft(a,lim,1);
    for(int i=0;i<lim;i++) a[i]=a[i]*a[i];
    fft(a,lim,-1);
    for(int i=1;i<=2*n;i++) f[i]=(ll)(a[i].s+0.5);
    for(int i=1;i<=n;i++) f[d[i]*2]--;
    for(int i=1;i<=2*n;i++) f[i]/=2;
    for(int i=2*n;i>=1;i--) f[i]+=f[i+1];
    int q;scanf("%d",&q);
    while(q --> 0)
    {
        int k;scanf("%d",&k);
        printf("%lld\n",f[k+1]-c[k]);
    }
    return 0;
}