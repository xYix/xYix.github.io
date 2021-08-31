#include<iostream>
#include<cstdio>
#include<cstring>
#define N 310
using namespace std;
int f[N][N][N];//f[l][r][a] : 使区间 [l,r] 回文，删 a 个 0，最少要删几个 1
char s[N];
int a[N],w[2];
void chkmin(int &x,int y){x=min(x,y);}
int main()
{
    int n;
    scanf("%d%s",&n,s+1);
    for(int i=1;i<=n;i++) a[i]=s[i]-'0',w[a[i]]++;
    memset(f,0x3f,sizeof(f));
    if(n%2==0)
    {
        if(w[0]&1){puts("-1");return 0;}
        for(int i=1;i<n;i++) if(a[i]==a[i+1]) f[i][i+1][0]=0;
        for(int i=1;i<=n;i++) f[i][i][!a[i]]=a[i];
    }
    else
    {
        if(w[0]&1)
        {
            for(int i=1;i<=n;i++) if(a[i]==0) f[i][i][0]=0;
        }
        else
        {
            for(int i=1;i<=n;i++) if(a[i]==1) f[i][i][0]=0;
        }
    }
    for(int l=n;l;l--)
        for(int r=l;r<=n;r++)
            for(int i=0;i<=r-l+1;i++)
            if(f[l][r][i]<=n)
            {
                if(l!=1 && r!=n && a[l-1]==a[r+1]) chkmin(f[l-1][r+1][i],f[l][r][i]);
                if(l!=1) chkmin(f[l-1][r][i+!a[l-1]],f[l][r][i]+a[l-1]);
                if(r!=n) chkmin(f[l][r+1][i+!a[r+1]],f[l][r][i]+a[r+1]);
            }
    for(int l=1;l<n;l++)
        for(int r=l;r<=n;r++)
            for(int i=1;i<=r-l+1;i++) chkmin(f[l][r][i],f[l][r][i-1]);
    int c[2]={0,0};
    int ans=(n+1)/2;
    for(int i=1;i<=n;i++)
    {
        for(int j=0;j<=c[0];j+=2)
            for(int k=0;k<=c[1];k+=2)
                if(f[i][n][c[0]-j]<=c[1]-k) chkmin(ans,c[0]+c[1]-j/2-k/2);
        c[a[i]]++;
    }
    printf("%d\n",ans);
    return 0;
}