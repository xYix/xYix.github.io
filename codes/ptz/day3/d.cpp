#include<iostream>
#include<cstdio>
#include<cstring>
#include<queue>
#include<bitset>
#define N 4010
using namespace std;
bool vis[N][N];
struct node{
    int l,r;
    node(int L=0,int R=0):l(L),r(R){}
    bool operator <(const node a)const{return r-l>a.r-a.l;}
}p[N*N];
int c[N][N],lim,n;
priority_queue<node>q;
bitset<N>R[N],L[N];
bool check(int l,int r){return !vis[l][r] && c[l][r]<=lim && (l==r-1 || vis[l+1][r-1]);}
void push(int l,int r)
{
    if(vis[l][r]) return;
    vis[l][r]=true;R[l].set(r);L[r].set(l);q.push(node(l,r));
}
void dfs(int l,int r)
{
    if(l==1 && r==n){printf("%d\n",lim);exit(0);}
    if(l>1 && r<n && check(l-1,r+1)) push(l-1,r+1);
    auto v=(~R[l])&R[r+1];
    for(int i=v._Find_first();i<v.size();i=v._Find_next(i)) push(l,i);
    v=(~L[r])&L[l-1];
    for(int i=v._Find_first();i<v.size();i=v._Find_next(i)) push(i,r);
}
int read()
{
    int x=0,c=0;
    for(c=getchar();!isdigit(c);c=getchar());
    for(;isdigit(c);c=getchar()) x=x*10+c-'0';
    return x;
}
int main()
{
    n=read();
    for(int i=1;i<=n;i++)
        for(int j=i+1;j<=n;j+=2)
        {
            c[i][j]=read();
            p[c[i][j]]=node(i,j);
        }
    for(lim=1;;lim++)
    if(check(p[lim].l,p[lim].r))
    {
        push(p[lim].l,p[lim].r);
        while(!q.empty()){auto v=q.top();q.pop();dfs(v.l,v.r);}
    }
    return 0;
}