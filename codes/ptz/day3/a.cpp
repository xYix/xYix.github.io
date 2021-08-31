#include<iostream>
#include<cstdio>
#include<cstring>
#define N 200010
using namespace std;
int a[N];
int main()
{
    int t;
    scanf("%d",&t);
    while(t --> 0)
    {
        int n;scanf("%d",&n);
        for(int i=1;i<=n;i++) scanf("%d",&a[i]);
        int x=a[1];
        for(int i=2;i<=n;i++) x&=a[i];
        bool hv=false;
        for(int i=1;i<=n;i++) if(a[i]==x) hv=true;
        if(!hv){puts("-1");continue;}
        int m=n*2-1;
        printf("%d\n%d",m,a[1]);
        for(int i=2;i<=n;i++) printf(" %d %d",x,a[i]);
        puts("");
    }
    return 0;
}