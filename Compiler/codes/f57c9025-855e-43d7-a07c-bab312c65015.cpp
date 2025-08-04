#include <iostream>
#include <string>
#include <algorithm> // for std::reverse

using namespace std;

int main() {
    string s;
    cin >> s;

    string reversed_s = s;
    reverse(reversed_s.begin(), reversed_s.end());

    if (s == reversed_s) {
        cout << "Palindrome" << endl;
    } else {
        cout << "Not Palindrome" << endl;
    }

    return 0;
}