#include<iostream>
#include<cstdio>
#include<cstring>
#include<algorithm>
#include<map>
#define N 100010
#define mod 1000000007
using namespace std;
int c[N<<2],mx[N<<2],a[N],n;
int ksm(int a,int b=mod-2)
{
    int r=1;
    for(;b;b>>=1,a=1ll*a*a%mod) if(b&1) r=1ll*r*a%mod;
    return r;
}
void build(int u,int l,int r){mx[u]=-2000000001;int mid=(l+r)>>1;if(l!=r) build(u<<1,l,mid),build(u<<1|1,mid+1,r);}
void insert(int u,int l,int r,int p)
{
    if(l==r){mx[u]=a[l];c[u]=1;return;}
    int mid=(l+r)>>1;
    if(p<=mid) insert(u<<1,l,mid,p);
    else insert(u<<1|1,mid+1,r,p);
    mx[u]=max(mx[u<<1],mx[u<<1|1]);c[u]=c[u<<1]+c[u<<1|1];
}
int qry(int u,int l,int r,int L,int R)
{
    if(L<=l && r<=R) return c[u];
    int mid=(l+r)>>1;
    if(R<=mid) return qry(u<<1,l,mid,L,R);
    if(L>mid) return qry(u<<1|1,mid+1,r,L,R);
    return qry(u<<1,l,mid,L,R)+qry(u<<1|1,mid+1,r,L,R);
}
int qry_l(int u,int l,int r,int p,int v)
{
    if(l>p || mx[u]<v) return -1;
    if(l==r) return l;
    int mid=(l+r)>>1;
    int x=qry_l(u<<1|1,mid+1,r,p,v);
    if(x==-1) return qry_l(u<<1,l,mid,p,v);
    return x;
}
int qry_r(int u,int l,int r,int p,int v)
{
    if(r<p || mx[u]<v) return -1;
    if(l==r) return l;
    int mid=(l+r)>>1;
    int x=qry_r(u<<1,l,mid,p,v);
    if(x==-1) return qry_r(u<<1|1,mid+1,r,p,v);
    return x;
}
int b[N],k;
map<pair<int,int>,int>mp;
int main()
{
    scanf("%d%d",&n,&k);++k;
    for(int i=1;i<=n;i++) scanf("%d",&a[i]),b[i]=i;
    a[0]=a[n+1]=k;
    build(1,0,n+1);
    insert(1,0,n+1,0);insert(1,0,n+1,n+1);
    sort(b+1,b+n+1,[&](int x,int y){return a[x]>a[y];});
    int ans=1;
    for(int i=1;i<=n;i++)
    {
        int p=b[i],l=qry_l(1,0,n+1,p,k-a[p]),r=qry_r(1,0,n+1,p,k-a[p]);
        ans=1ll*ans*(qry(1,0,n+1,l,r)-1)%mod;
        insert(1,0,n+1,p);
        if(i!=1 && a[b[i]]!=a[b[i-1]]) mp.clear();
        ans=1ll*ans*ksm(++mp[make_pair(l,r)])%mod;
    }
    printf("%d\n",ans);
    return 0;
}