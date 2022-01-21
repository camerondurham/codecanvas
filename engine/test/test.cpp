#include<iostream>
#include<algorithm>

typedef unsigned int uint;

using namespace std;

int main() {
	string inp = "hello world";

	if(inp.length() > 1){

		for(uint start = 0, end = inp.length() - 1; start < end; start++, end--){
			std::swap(inp[start], inp[end]);
		}
	}
	std::cout<< inp;
}
