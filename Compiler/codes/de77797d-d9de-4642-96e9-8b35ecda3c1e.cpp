#include <bits/stdc++.h>
using namespace std;

vector<vector<int>> tree;
int maxHeight = 0;

void dfs(int node, int parent, int height) {
    maxHeight = max(maxHeight, height);
    for (int child : tree[node]) {
        if (child != parent) {
            dfs(child, node, height + 1);
        }
    }
}

int main() {
    int n;
    cin >> n;

    tree.assign(10005, {}); // size based on constraint (1 ≤ u, v ≤ 10^4)

    for (int i = 0; i < n; i++) {
        int u, v;
        cin >> u >> v;
        tree[u].push_back(v);
        tree[v].push_back(u);
    }

    if (n == 0) {
        cout << 0 << endl;
        return 0;
    }

    dfs(1, -1, 0); // start from root node 1
    cout << maxHeight << endl;

    return 0;
}
