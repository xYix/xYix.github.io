#include<bits/stdc++.h>
#include<windows.h>
using namespace std;

string post_name,post_chinese_name,type_name;
string post_tag[20];int tag_cnt;
map<string,string> TAG; map<string, string> TAG_VAL;
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

#include <sys/types.h>
#include <sys/stat.h>
#ifndef WIN32
#include <unistd.h>
#endif
 
#ifdef WIN32
#define stat _stat
#endif
 
time_t get_mtime(string filename) {
    struct stat result;
    if (stat(filename.c_str(), &result) == 0) {
        time_t mod_time = result.st_mtime;
        return mod_time;
    }
    return -1;
}
string Get_Mtime(string filename) {
	time_t T = get_mtime(filename);
	tm *ascT = localtime(&T);
	char Tbuf[60];
	strftime(Tbuf, sizeof(Tbuf), "%Y-%m-%d", ascT);
	string strTbuf(Tbuf, Tbuf + strlen(Tbuf));
	return strTbuf;
}

string site_name = "https://xyix.github.io/";
void PRINT_INDEX_INFO(string filename, string mdfile = "") {
	printf("	<url>\n		<loc>%s%s</loc>\n", site_name.c_str(), filename.c_str());
	string Tbuf;
	if (mdfile == "") Tbuf = Get_Mtime(filename);
	else Tbuf = Get_Mtime(mdfile), cerr << mdfile << " " << Tbuf << "\n";
	printf("		<lastmod>%s</lastmod>\n	</url>\n", Tbuf.c_str());
}

int main(){
	freopen("archieve/list.txt","r",stdin);
	freopen("js/archieve_list.js","w",stdout);
	cout<<"(function(win){\n	archieve_list=[];\n";
	int post_cnt=0;
	while(getline(cin,post_name)){
		post_cnt++;
		getline(cin,post_chinese_name);
		post_chinese_name=UTF8ToGB(post_chinese_name.c_str());
		getline(cin,type_name);
		cin>>tag_cnt;getline(cin,trash);
		for(int i=1;i<=tag_cnt;i++) getline(cin,post_tag[i]);
		sort(post_tag + 1, post_tag + tag_cnt + 1);
		cout<<"	archieve_list[archieve_list.length] = {\n";
		cout<<"		'postid' : '"<<post_cnt<<"',\n";
		cout<<"		'post_name' : '"<<post_name<<"',\n";
		cout<<"		'post_chinese_name' : '"<<GBToUTF8(post_chinese_name.c_str())<<"',\n";
		cout<<"		'type_name' : '"<<type_name<<"',\n";
		cout<<"		'last_modi' : '"<<(post_name == "combinatorics" ? "2021-02-28" : Get_Mtime("posts/source_posts/" + post_name + ".md"))<<"',\n";
		cout<<"		'tag' : [";
			for(int i=1;i<=tag_cnt;i++) cout<<"'"<<post_tag[i]<<"',";
		cout<<"],\n	};\n";
	}
	printf("	for (var i in archieve_list) archieve_list[i].tag.sort(function(a, b){ return tags_val[a] - tags_val[b]});\n");
	printf("for (var i in archieve_list) {\nlet u = archieve_list[i], qaq = u.last_modi.split('-');\nu.last_modi_val = qaq[0] * 100000000 + qaq[1] * 10000 + qaq[2];\n}\n");
	printf("})(document);");
	freopen("sitemap.xml","w",stdout);
	printf("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n");
	PRINT_INDEX_INFO("index.html");
		PRINT_INDEX_INFO("tags/index.html");
		PRINT_INDEX_INFO("archieve/index.html");
		cin.clear();
		freopen("archieve/list.txt","r",stdin);
		post_cnt=0;
		while(getline(cin,post_name)){
			post_cnt++;
			getline(cin,post_chinese_name);
			post_chinese_name=UTF8ToGB(post_chinese_name.c_str());
			getline(cin,type_name);
			cin>>tag_cnt;getline(cin,trash);
			for(int i=1;i<=tag_cnt;i++) getline(cin,post_tag[i]);
			sort(post_tag + 1, post_tag + tag_cnt + 1);
			PRINT_INDEX_INFO("posts/posts/" + post_name + ".html", "posts/source_posts/" + post_name + ".md");
		}
	printf("</urlset>");
} 
