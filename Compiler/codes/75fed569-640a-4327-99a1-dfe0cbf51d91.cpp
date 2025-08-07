#include<bits/stdc++.h>
using namespace std;
int main(){
  string s;
  cin>>s;
  int n=s.size();
bool flag=false;
  for(int i=0;i<(n/2);i++){
   if(s[i]!=s[n-i-1]){
     flag=true;
}
}
if(flag){
  cout<<"YES"<<endl;
}else{
  cout<<"NO"<<endl;
}
}