#include<bits/stdc++.h>
using namespace std;

int n;
int sum;
vector<int> U, V;

int main() {
    cin >> n;
    
    cout << "? " << n << " ";
    for (int i = 1; i <= n; i++) cout << i << " ";
    cout << endl;
    
    cin >> sum;

    for (int d = 0; d < 29; d++) {
        int SU, SV;
        U.clear(), V.clear();
        for (int i = 1; i <= n; i++)
            if (rand() & 1) U.push_back(i);
            else V.push_back(i);
        
        cout << "? " << U.size() << " ";
        for (int u : U) cout << u << " ";
        cout << endl;
        cin >> SU;

        cout << "? "  << V.size() << " ";
        for (int u : V) cout << u << " ";
        cout << endl;
        cin >> SV;

        int dU = SU + SU + (sum - SU - SV);
        int dV = SV + SV + (sum - SU - SV);
        if (dU & 1) { cout << "! NO" << endl; return 0; }
        if (dV & 1) { cout << "! NO" << endl; return 0; }
    }
    cout << "! YES" << endl;
}