#include<bits/stdc++.h>
#include<windows.h>
using namespace std;

char* UTF8ToGB(const char* utf8)
{
	int len = MultiByteToWideChar(CP_UTF8, 0, utf8, -1, NULL, 0);
	wchar_t* wstr = new wchar_t[len+1];
	memset(wstr, 0, len+1);
	MultiByteToWideChar(CP_UTF8, 0, utf8, -1, wstr, len);
	len = WideCharToMultiByte(CP_ACP, 0, wstr, -1, NULL, 0, NULL, NULL);
	char* str = new char[len+1];
	memset(str, 0, len+1);
	WideCharToMultiByte(CP_ACP, 0, wstr, -1, str, len, NULL, NULL);
	if(wstr) delete[] wstr;
	return str;
}
char* GBToUTF8(const char* gb2312)
{
	int len = MultiByteToWideChar(CP_ACP, 0, gb2312, -1, NULL, 0);
	wchar_t* wstr = new wchar_t[len+1];
	memset(wstr, 0, len+1);
	MultiByteToWideChar(CP_ACP, 0, gb2312, -1, wstr, len);
	len = WideCharToMultiByte(CP_UTF8, 0, wstr, -1, NULL, 0, NULL, NULL);
	char* str = new char[len+1];
	memset(str, 0, len+1);
	WideCharToMultiByte(CP_UTF8, 0, wstr, -1, str, len, NULL, NULL);
	if(wstr) delete[] wstr;
	return str;
}

int main(){
	/*
		list 格式：
		- 英文名
		- 中文名 
		- 类型
		- 标签数 
		- 标签 
	*/
	
	freopen("D:\\迫真blog\\xjoi\\probs\\list.txt","r",stdin);
	freopen("D:\\迫真blog\\xjoi\\js\\prob_list.js","w",stdout);
	cout<<"(function(win){\n	win.prob_list={};\n";
	string prob_name,prob_chinese_name;
	while(getline(cin,prob_name)){
		getline(cin,prob_chinese_name);
		prob_chinese_name=UTF8ToGB(prob_chinese_name.c_str());
		cout<<"	win.prob_list['"<<prob_name<<"'] = '"<<GBToUTF8(prob_chinese_name.c_str())<<"';\n";
	}
	printf("})(document);");
} 
