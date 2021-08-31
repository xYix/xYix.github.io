#include<iostream>
#include<cstdio>
#include<cstring>
#include<vector>
#include<unordered_set>
#define N 500010
#define C 26
using namespace std;
typedef long long ll;
int n;
struct node{
    int i,j,p;
    node(int i=0,int j=0,int p=0):i(i),j(j),p(p){}
    bool operator ==(const node a)const{return i==a.i && j==a.j && p==a.p;}
    bool operator <(const node a)const{return i==a.i?j<a.j:i<a.i;}
};
vector<node>run;
char s[N];
namespace runs{
    const int B=2333,mod1=1019260817,mod2=1000000009;
    struct P{
        int x,y;
        P(int X,int Y):x(X),y(Y){}
        P(int X=0):x(X),y(X){}
    }hs[N],bs[N];
    P operator +(P a,P b){return P((a.x+b.x)%mod1,(a.y+b.y)%mod2);}
    P operator -(P a,P b){return P((a.x-b.x+mod1)%mod1,(a.y-b.y+mod2)%mod2);}
    P operator *(P a,P b){return P(1ll*a.x*b.x%mod1,1ll*a.y*b.y%mod2);}
    bool operator ==(P a,P b){return a.x==b.x && a.y==b.y;}
    P get(int l,int r){return hs[r]-hs[l-1]*bs[r-l+1];}
    void init()
    {
        bs[0]=1;
        for(int i=1;i<=n;i++) hs[i]=hs[i-1]*B+P(s[i]-'a'+1),bs[i]=bs[i-1]*B;
    }
    int lcp(int x,int y)
    {
        int l=1,r=n-max(x,y)+1;
        while(l<=r)
        {
            int mid=(l+r)>>1;
            if(get(x,x+mid-1)==get(y,y+mid-1)) l=mid+1;
            else r=mid-1;
        }
        return r;
    }
    int lcs(int x,int y)
    {
        int l=1,r=min(x,y);
        while(l<=r)
        {
            int mid=(l+r)>>1;
            if(get(x-mid+1,x)==get(y-mid+1,y)) l=mid+1;
            else r=mid-1;
        }
        return r;
    }
    bool cmp(int l1,int l2){int l=lcp(l1,l2);return s[l1+l]<s[l2+l];}
    int nxt[N];
    unordered_set<ll>st;
    void lyndon(bool ell)
    {
        nxt[n]=0;
        for(int i=n-1;i;i--)
        {
            nxt[i]=i+1;
            for(;nxt[i] && cmp(nxt[i],i)==ell;nxt[i]=nxt[nxt[i]]);
        }
    }
    void make_runs()
    {
        for(int k=n-1;k;k--)
        if(nxt[k])
        {
            int dl=lcs(k,nxt[k]),dr=lcp(k,nxt[k]),p=nxt[k]-k;
            int l=k-dl+1,r=nxt[k]+dr-1;
            if(dl+dr<=p || st.count(1ll*r*N+l)) continue;
            st.insert(1ll*r*N+l);
            run.push_back(node(l,r,p));
        }
    }
    void make()
    {
        init();
        lyndon(0);make_runs();
        lyndon(1);make_runs();
    }
}
namespace SAM{
    vector<int>g[N*2];
    int ch[N*2][C],fa[N*2],len[N*2],las=1,cnt=1;
    bool ed[N*2];
    int insert(int c)
    {
        int p=las,q=las=++cnt;len[q]=len[p]+1;
        for(;p && !ch[p][c];p=fa[p]) ch[p][c]=q;
        if(!p) fa[q]=1;
        else
        {
            int np=ch[p][c];
            if(len[np]==len[p]+1) fa[q]=np;
            else
            {
                int nq=++cnt;
                fa[nq]=fa[np];len[nq]=len[p]+1;
                fa[np]=fa[q]=nq;
                memcpy(ch[nq],ch[np],sizeof(ch[nq]));
                for(;p && ch[p][c]==np;p=fa[p]) ch[p][c]=nq;
            }
        }
        return q;
    }
    ll ans=0;
    ll C2(ll x){return x*(x+1)/2;}
    int dfs(int u)
    {
        int s=ed[u];
        for(int v:g[u]) s+=dfs(v);
        ans+=1ll*(len[u]-len[fa[u]])*C2(s);
        return s;
    }
    ll work()
    {
        for(int i=1;i<=n;i++) ed[insert(s[i]-'a')]=true;
        for(int i=2;i<=cnt;i++) g[fa[i]].push_back(i);
        dfs(1);
        return ans;
    }
}
ll ans[N],c[N];
int main()
{
    scanf("%s",s+1);n=strlen(s+1);
    runs::make();
    for(auto u:run)
    {
        for(int d=u.p;d<=u.j;d+=u.p)
        {
            if(u.i+d*2>u.j) break;
            ans[1]+=u.j-(u.i+d*2)+1;
            c[1]++;c[u.j-(u.i+d*2)+2]--;
        }
    }
    for(int i=1;i<=n;i++) ans[i+1]+=ans[i]-c[i],c[i+1]+=c[i];
    for(int i=1;i<=n;i++) ans[i]+=n-i+1;
    ans[0]=SAM::work();
    for(int i=1;i<=n;i++) ans[0]-=ans[i];
    for(int i=0;i<=n;i++) printf("%lld ",ans[i]);
    return 0;
}