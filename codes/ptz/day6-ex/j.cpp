#include<iostream>
#include<cstdio>
#include<cstring>
#include<vector>
#include<map>
#include<algorithm>
#define N 100010
using namespace std;
map<pair<vector<int>,int>,int>mp;
bool dfs(vector<int> f,int fi)
{
    sort(f.begin(),f.end(),greater<int>());
    while(!f.empty() && !f.back()) f.pop_back();
    if(f.empty()) return false;
    if(mp.count(make_pair(f,fi))) return mp[make_pair(f,fi)];
    auto &u=mp[make_pair(f,fi)];
    if(fi!=1)
    {
        for(int i=0;i<f.size();i++)
        {
            f[i]--;
            if(!dfs(f,(fi+1)%3)) return u=true;
            f[i]++;
        }
        for(int i=0;i<f.size();i++)
        {
            int w=f[i];f[i]=0;
            if(!dfs(f,(fi+1)%3)) return u=true;
            f[i]=w;
        }
        return false;
    }
    else
    {
        for(int i=0;i<f.size();i++)
        {
            f[i]--;
            if(dfs(f,fi+1)) return u=true;
            f[i]++;
        }
        for(int i=0;i<f.size();i++)
        {
            int w=f[i];f[i]=0;
            if(dfs(f,fi+1)) return u=true;
            f[i]=w;
        }
        return u=false;
    }
}
vector<int>f;
char s[15],t[N];
int a[27];
int main()
{
    int n;
    scanf("%d%s%s",&n,s+1,t+1);
    // for(int i=1,c;i<=n;i++) scanf("%d",&c),a[c]++;
    // for(int i=1;i<=n;i++) t[i]='z';
    for(int i=1;i<=n;i++) a['z'-t[i]+1]++;
    if(a[1]>81) a[1]=a[1]%81;
    int c=0;
    for(int i=2;i<=26;i++) c+=a[i];
    if(c>2){puts("Lose");return 0;}
    for(int i=1;i<=26;i++)
        for(int j=0;j<a[i];j++) f.push_back(i);
    if(s[1]=='P') puts(dfs(f,0)?"Win":"Lose");
    else puts(dfs(f,1)?"Lose":"Win");
    return 0;
}