#include<bits/stdc++.h>
#include<windows.h>
using namespace std;

string tag_name,tag_chinese_name;

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

void PRINT_TAG_INFO(){
	cout<<"<tr><th><a href=\"/tags/"<<tag_name<<"/\"><strong>"<<tag_chinese_name<<"</strong></a></th><th>"<<tag_name<<"</th></tr>\n";
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
	
	freopen("D:\\迫真blog\\tags\\list.txt","r",stdin);
	freopen("D:\\迫真blog\\tags\\index.html","w",stdout);
	cout<<"<head><meta http-equiv=\"content-type\" content=\"text/html;charset=gbk\" /><meta charset=\"UTF-8\"><title>x义x 的 blog - 文章一览</title><link rel=\"icon\" type=\"images/png\" sizes=\"32x32\" href=\"/images/favicon32.png\"><link rel=\"icon\" type=\"images/png\" sizes=\"32x32\" href=\"/images/favicon16.png\"><link rel=\"stylesheet\" href=\"/css/main.css\"></head>\n";
	cout<<"<div class=\"cover\"></div><div class=\"title\"><h1>x义x 的自制 BLOG</h1><p>您现在在：标签一览</p></div>\n";
	cout<<"<div class=\"bodybody\"><div class=\"sidebar\"><div class=\"content-block\"><div class=\"content\"><center><p>……就算是单程票，也是可以的吧？</p></center><a href=\"/\"><strong>· 回到首页</strong></a><p></p><a href=\"/archieve/\"><strong>· 文章一览</strong></a><p></p><a href=\"/tags/\"><strong>· 标签一览</strong></a><p></p><a href=\"/songlist/\"><strong>· 网义云音乐</strong></a></div></div></div>\n";
	cout<<"<div class=\"post-block\"><div class=\"content-block\"><center><h1>标签一览</h1></center><center><table border=\"1\" style=\"width: 70%;\"><tr><th style=\"width: 40%\">名称</th><th style=\"width: 60%\">英文名</th></tr>\n";
	while(getline(cin,tag_name)){
		cerr<<"check "<<tag_name<<"\n";
		getline(cin,tag_chinese_name);
		tag_chinese_name=UTF8ToGB(tag_chinese_name.c_str());
		PRINT_TAG_INFO();
	}
	cout<<"</table></center></div></div></div>\n";
}
