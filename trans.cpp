#include<bits/stdc++.h>
#include<windows.h>
using namespace std;

string post_name,post_chinese_name,type_name;
string post_tag[20];int tag_cnt;
map<string,string> TAG;
string trash;

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

void PRINT_HEAD(string title){
	cout<<"<head><meta http-equiv=\"content-type\" content=\"text/html;charset=gbk\" /><meta charset=\"UTF-8\"><title>x��x �� blog - ����һ��</title><link rel=\"icon\" type=\"images/png\" sizes=\"32x32\" href=\"/images/favicon32.png\"><link rel=\"icon\" type=\"images/png\" sizes=\"32x32\" href=\"/images/favicon16.png\"><link rel=\"stylesheet\" href=\"/css/main.css\"></head>\n";
	cout<<"<div class=\"cover\"></div><div class=\"bodybody\"><div class=\"sidebar\"><div class=\"title\"><center><h1>x��x ������ BLOG</h1><p><h3>�������ڣ�"<<title<<"</h3></p></center>";
    cout<<"</div><div class=\"content-block\"><div class=\"content\"><center><p class=\"lil-p\">���������ǵ���Ʊ��Ҳ�ǿ��Եİɣ�</p></center><a href=\"/\"><strong>�� �ص���ҳ</strong></a>";
    cout<<"<p></p><a href=\"/archieve/\"><strong>�� ����һ��</strong></a><p></p><a href=\"/tags/\"><strong>�� ��ǩһ��</strong></a><p></p><a href=\"/songlist/\"><strong>�� ����������</strong></a></div><script type=\"text/javascript\" src=\"/daily/daily.js\" charset=\"UTF-8\"></script></div></div>";
}
void PRINT_POST_INFO(){
	cout<<"<tr><th><a href=\"/posts/"<<post_name<<".html\"><strong>"<<post_chinese_name<<"</strong></a></th>\n";
	
	if(type_name=="solution")
		cout<<"<th><a href=\"/archieve/solution/\"><strong>���</strong></a></th>\n";
	else if(type_name=="algorithm")
		cout<<"<th><a href=\"/archieve/algorithm/\"><strong>�㷨/֪ʶ��</strong></a></th>\n";
	else
		cout<<"<th><p>��</p></th>\n";
	
	if(tag_cnt==0) cout<<"<th><p>��</p></th>\n";
	else{
		cout<<"<th>";
		for(int i=1;i<=tag_cnt;i++){
			cout<<"<a href=\"/tags/"<<post_tag[i]<<"/\"><strong>";
			if(!TAG.count(post_tag[i])){cerr<<"ERROR tag not found "<<post_tag[i]<<"\n";exit(0);}
			cout<<TAG[post_tag[i]]<<"</strong></a>";
			if(i!=tag_cnt) cout<<",";
		}
		cout<<"</th>\n";
	}
}

int main(){
	/*
		list ��ʽ��
		- Ӣ����
		- ������ 
		- ����
		- ��ǩ�� 
		- ��ǩ 
	*/
	
	freopen("D:\\����blog\\tags\\list.txt","r",stdin);
	freopen("D:\\����blog\\js\\tags_list.js","w",stdout);
	cout<<"(function(win){\n	win.tags_list={};\n";
	string tmp_tag_name,tmp_tag_chinese_name;
	while(getline(cin,tmp_tag_name)){
		getline(cin,tmp_tag_chinese_name);
		tmp_tag_chinese_name=UTF8ToGB(tmp_tag_chinese_name.c_str());
		TAG[tmp_tag_name]=tmp_tag_chinese_name;
		cout<<"	win.tags_list['"<<tmp_tag_name<<"'] = '"<<GBToUTF8(tmp_tag_chinese_name.c_str())<<"';\n";
	}
	printf("})(document);");
	cin.clear();
	freopen("D:\\����blog\\archieve\\list.txt","r",stdin);
	freopen("D:\\����blog\\js\\archieve_list.js","w",stdout);
	cout<<"(function(win){\n	win.archieve_list=[];\n";
	int post_cnt=0;
	while(getline(cin,post_name)){
		post_cnt++;
		getline(cin,post_chinese_name);
		post_chinese_name=UTF8ToGB(post_chinese_name.c_str());
		getline(cin,type_name);
		cin>>tag_cnt;getline(cin,trash);
		for(int i=1;i<=tag_cnt;i++) getline(cin,post_tag[i]);
		cout<<"	win.archieve_list[win.archieve_list.length] = {\n";
		cout<<"		'postid' : '"<<post_cnt<<"',\n";
		cout<<"		'post_name' : '"<<post_name<<"',\n";
		cout<<"		'post_chinese_name' : '"<<GBToUTF8(post_chinese_name.c_str())<<"',\n";
		cout<<"		'type_name' : '"<<type_name<<"',\n";
		cout<<"		'tag' : [";
		for(int i=1;i<=tag_cnt;i++) cout<<"'"<<post_tag[i]<<"',";
		cout<<"],\n	};\n";
	}
	printf("})(document);");
} 
