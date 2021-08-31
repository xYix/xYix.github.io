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
const int N=55;
int n,a=0,b=0;
char s[N];
int ans[N];
void print(){puts("YES"); for(int i=1;i<=n;i++) printf("%d ",ans[i]);}
void check(){
    if((n==a&&n%2==0)||(n==3&&a==2)){
        puts("NO");
        exit(0);
    }
    if(a==0&&n&1){
        ans[1]=10000,ans[2]=5000;
        for(int i=3;i<=n;i++) ans[i]=1;
        print(); exit(0);
    }
}

int main()
{
    n=read(); scanf("%s",s+1);
    for(int i=1;i<=n;i++) if(s[i]=='Y') a++; else b++;
    check();
    if(a==1&&b&1){
        int bl=2;
        for(int i=1;i<=n;i++){
            if(s[i]=='Y') ans[i]=1000;
            else ans[i]=1+max(bl,0),bl--;
        }
        print(); return 0;
    }
    if(a&1){
        for(int i=1;i<=n;i++) if(s[i]=='Y') ans[i]=1; else ans[i]=2;
        print(); return 0;
    }
    if(b%2==0){
        for(int i=1;i<=n;i++) if(s[i]=='Y') ans[i]=2; else ans[i]=1;
        print(); return 0;
    }
    if(b==1){
        int bl=0;
        for(int i=1;i<=n;i++){
            if(s[i]=='Y'){
                if(!bl) ans[i]=a+1,bl=1;
                else ans[i]=1;
            }
            else ans[i]=a-1;
        }
    }
    else{
        int bl=1000;
        for(int i=1;i<=n;i++) if(s[i]=='Y') ans[i]=b+1500; 
        else ans[i]=1+max(bl,0),bl-=500;
    }
    print();
    return 0;
}