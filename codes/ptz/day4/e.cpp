/*
the vast starry sky,
bright for those who chase the light.
*/
#include<bits/stdc++.h>
using namespace std;
typedef long long ll;
typedef pair<int,int> pii;
#define mk make_pair
const int inf=(int)1e9;
const ll INF=(ll)5e18;
const int MOD=998244353;
int _abs(int x){return x<0 ? -x : x;}
int add(int x,int y){x+=y; return x>=MOD ? x-MOD : x;}
int sub(int x,int y){x-=y; return x<0 ? x+MOD : x;}
#define mul(x,y) (ll)(x)*(y)%MOD
void Add(int &x,int y){x+=y; if(x>=MOD) x-=MOD;}
void Sub(int &x,int y){x-=y; if(x<0) x+=MOD;}
void Mul(int &x,int y){x=mul(x,y);}
int qpow(int x,int y){int ret=1; while(y){if(y&1) ret=mul(ret,x); x=mul(x,x); y>>=1;} return ret;}
void checkmin(int &x,int y){if(x>y) x=y;}
void checkmax(int &x,int y){if(x<y) x=y;}
void checkmin(ll &x,ll y){if(x>y) x=y;}
void checkmax(ll &x,ll y){if(x<y) x=y;}
#define out(x) cerr<<#x<<'='<<x<<' '
#define outln(x) cerr<<#x<<'='<<x<<endl
#define sz(x) (int)(x).size()
inline int read(){
    int x=0,f=1; char c=getchar();
    while(c>'9'||c<'0'){if(c=='-') f=-1; c=getchar();}
    while(c>='0'&&c<='9') x=(x<<1)+(x<<3)+(c^48),c=getchar();
    return x*f;
}
const int N=1000005;
int n,m,len[N];
vector<int> v[N],G[N];
namespace DSU{
    int fa[N];
    void init(){for(int i=1;i<=m;i++) fa[i]=i;}
    int getfather(int x){return fa[x]==x ? x : fa[x]=getfather(fa[x]);}
    void unite(int x,int y){fa[getfather(x)]=getfather(y);}
}
vector<int> seq[N],seq0;
bool cmp(int x,int y){return sz(v[x])>sz(v[y]);}

int t[N],col[N];
bool cmp2(int x,int y){return t[x]<t[y];}
void solve(int id){
    sort(seq[id].begin(),seq[id].end(),cmp);
    seq0=v[seq[id][0]];
    for(auto &i : seq[id]){
        for(auto &u : v[i]) t[u]++;
    }
    sort(seq0.begin(),seq0.end(),cmp2);
    for(int i=0;i<sz(seq0);i++) col[seq0[i]]=(i&1),t[seq0[i]]=0;
}

int main()
{
    n=read(); m=read();
    for(int i=1;i<=m;i++){
        len[i]=read(); v[i].resize(len[i]);
        for(int j=0;j<len[i];j++) v[i][j]=read(),G[v[i][j]].push_back(i);
    }
    DSU::init();
    for(int i=1;i<=n;i++){
        for(int j=1;j<sz(G[i]);j++) DSU::unite(G[i][0],G[i][j]);
    }
    for(int i=1;i<=m;i++) seq[DSU::getfather(i)].push_back(i);
    for(int i=1;i<=m;i++) if(i==DSU::getfather(i)) solve(i); 
    for(int i=1;i<=n;i++) printf("%d ",col[i]);
    return 0;
}