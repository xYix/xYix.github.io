(function(win){
    'use strict',
    // 格式： xyix.gitee.io/.../.../?tags=...+...&type=...&sortby=&page=
    win.isError = 0;
    win.post_per_page = 30;
    win.AnalyzeSearch = function (s){
        let ret = {}, t, r;
		for (t of (s.startsWith('?') ? s.substr(1) : s).split('&'))
			if (r = t.split('='), r[1])
				ret[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
		return ret;
    }
    win.AnalyzePathname = function (s){
        let ret = [], t;
        for (t of (s.startsWith('/') ? s.substr(1) : s).split('/'))
            if(t.match('[.]') === null && t !== 'D:' && t !== '%E8%BF%AB%E7%9C%9Fblog' && t !== '') ret[ret.length] = t;
            else if(t === '404.html') win.isError = 1;
		return ret;
    }
    win.AnalyzeTags = function (s){
        if(s === undefined) return [];
        let ret = [], t;
        for (t of s.split('+'))
            ret[ret.length] = t;
		return ret;
    }
    win.putError = function(){
        win.location.replace('/404.html');
    }
    //生成后继链接
    win.NextSearch = function (PrevSearch,deltaSearch){
        let tmpSearch={};
        for(var x in PrevSearch) if(x !== 'Tags')
            tmpSearch[x]=PrevSearch[x];
        else{
            tmpSearch[x]=[];
            for(let i=0;i<PrevSearch.Tags.length;i++)
                tmpSearch[x][i]=PrevSearch[x][i];
        }
        if(deltaSearch.Tags !== undefined)
            for(let i=0;i<deltaSearch.Tags.length;i++) if(tmpSearch.Tags.indexOf(deltaSearch.Tags[i]) === -1)
                tmpSearch.Tags[tmpSearch.Tags.length]=deltaSearch.Tags[i];
        if(deltaSearch.Type !== undefined) tmpSearch.Type=deltaSearch.Type;
        if(deltaSearch.Sortby !== undefined) tmpSearch.Sortby=deltaSearch.Sortby;
        if(deltaSearch.Page !== undefined) tmpSearch.Page=deltaSearch.Page;
        if(deltaSearch.Funval !== undefined) tmpSearch.Funval=deltaSearch.Funval;
        return tmpSearch;
    }
    win.ezylanASearch = function (Search){
        let ret = '?',flg = 1;
        if(Search.Type !== undefined){
            if(flg === 1) flg = 0;else ret += '&';
            ret += 'type=' + Search.Type;
        }
        if(Search.Tags.length !== 0){
            if(flg === 1) flg = 0;else ret += '&';
            ret += 'tags=';
            for(let i = 0;i<Search.Tags.length;i++){
                if(i !== 0) ret+='+';
                ret+=Search.Tags[i];
            }
        }
        if(Search.Sortby !== undefined){
            if(flg === 1) flg = 0;else ret += '&';
            ret += 'sortby=' + Search.Sortby;
        }
        if(Search.Page !== undefined){
            if(flg === 1) flg = 0;else ret += '&';
            ret += 'page=' + Search.Page;
        }
        if(Search.Funval !== undefined){
            if(flg === 1) flg = 0;else ret += '&';
            ret += 'funval=' + Search.Funval;
        }
        return ret;
    }
    win.InitAnalyze = function (){
        win.Pathname=win.AnalyzePathname(location.pathname);
        win.Search=win.AnalyzeSearch(location.search);
        win.Tags=win.AnalyzeTags(win.Search['tags']);
        win.Type=win.Search['type'];
        win.Sortby=win.Search['sortby'];
        if(win.Search['page'] === undefined) win.Page = 0;
        else win.Page=parseInt(win.Search['page']);
        win.Funval=win.Search['funval'];
        win.Postid=win.Search['postid']; //Postid 非常特殊，不保存
        win.Probname=win.Search['probname']; //整个 xjoi 都不保存任何 tag
        win.TrueSearch={
            Tags : win.Tags,
            Type : win.Type,
            Sortby : win.Sortby,
            Page : win.Page,
            Funval : win.Funval,
        };
    }
    win.InitAnalyze();
    win.WriteSideBar = function (data,title,funval){
        let SideBar=win.createElement('div');
        SideBar.className='sidebar';
            let SideBarConBlock=win.createElement('div');
            SideBarConBlock.className='sidebar-content-block';
                let SideBarTitle=win.createElement('center');
                SideBarTitle.className='title';
                    let SideBarTitleContent1=win.createElement('h1');
                    if(funval !== undefined|| win.Pathname[0] === 'xjoi'){
                        SideBarTitleContent1.textContent='×√OI';
                        if(win.Pathname[1] === 'fakenews') SideBarTitleContent1.textContent+='：新闻';
                        if(win.Pathname[1] === 'contest') SideBarTitleContent1.textContent+='：比赛';
                        if(win.Pathname[1] === 'problemset') SideBarTitleContent1.textContent+='：题库';
                    }
                    else SideBarTitleContent1.textContent='x义x 的自制 BLOG';
                SideBarTitle.appendChild(SideBarTitleContent1);
                    let SideBarTitleContent2=win.createElement('p');
                    if(funval !== undefined){ //彩蛋
                        SideBarTitleContent2.appendChild(win.createTextNode('离线评测系统'));
                        SideBarTitleContent2.appendChild(win.createElement('br'));
                        SideBarTitleContent2.appendChild(win.createTextNode('新版下线'));
                        SideBarTitleContent2.appendChild(win.createElement('br'));
                        SideBarTitleContent2.appendChild(win.createTextNode('since 2020'));
                    }
                    else{
                        for(let i=0;i<title.length;i=i+1){
                            if(i==0) SideBarTitleContent2.appendChild(win.createTextNode('您现在在：'+title[i]));
                            else SideBarTitleContent2.appendChild(win.createTextNode(title[i]));
                            if(i<title.length-1) SideBarTitleContent2.appendChild(win.createElement('br'));
                        }
                    }
                SideBarTitle.appendChild(SideBarTitleContent2);
                SideBarConBlock.appendChild(SideBarTitle);
                let SideBarCon=win.createElement('div');
                SideBarCon.className='content';
                        let Text1=win.createElement('strong');
                        Text1.textContent='· 回到首页';
                    let aText1=win.createElement('a');
                    aText1.setAttribute('href','/'+win.ezylanASearch(win.TrueSearch));
                    aText1.appendChild(Text1);
                SideBarCon.appendChild(aText1);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text2=win.createElement('strong');
                        Text2.textContent='· 文章一览';
                    let aText2=win.createElement('a');
                    aText2.setAttribute('href','/archieve/'+win.ezylanASearch(win.TrueSearch));
                    aText2.appendChild(Text2);
                SideBarCon.appendChild(aText2);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text3=win.createElement('strong');
                        Text3.textContent='· 标签一览';
                    let aText3=win.createElement('a');
                    aText3.setAttribute('href','/tags/'+win.ezylanASearch(win.TrueSearch));
                    aText3.appendChild(Text3);
                SideBarCon.appendChild(aText3);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text4=win.createElement('strong');
                        Text4.textContent='· 网义云音乐';
                    let aText4=win.createElement('a');
                    aText4.setAttribute('href','/songlist/'+win.ezylanASearch(win.TrueSearch));
                    aText4.appendChild(Text4);
                SideBarCon.appendChild(aText4);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text5=win.createElement('strong');
                        Text5.textContent='· 需要帮助？';
                    let aText5=win.createElement('a');
                    aText5.setAttribute('href','/help/'+win.ezylanASearch(win.TrueSearch));
                    aText5.appendChild(Text5);
                SideBarCon.appendChild(aText5);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text6=win.createElement('strong');
                        Text6.textContent='· 一键清除 tag';
                    let aText6=win.createElement('a');
                    aText6.setAttribute('href',location.pathname);
                    aText6.appendChild(Text6);
                SideBarCon.appendChild(aText6);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text7=win.createElement('strong');
                        Text7.textContent='· ×√OI';
                    let aText7=win.createElement('a');
                    aText7.setAttribute('href','/xjoi/'+win.ezylanASearch(win.TrueSearch));
                    aText7.appendChild(Text7);
                SideBarCon.appendChild(aText7);
            SideBarConBlock.appendChild(SideBarCon);
            win.Write_Daily_Message(SideBarConBlock);
        SideBar.appendChild(SideBarConBlock);
        data.appendChild(SideBar);
    }
    // Title
    win.Title=[];
    if(win.Pathname.length === 0)
        if(win.isError === 0) win.Title[0]='首页';
        else win.Title[0]='未知页面';
    else{
        if(win.Pathname[0] === 'archieve') win.Title[0]='文章一览';
        if(win.Pathname[0] === 'posts'){
            win.Title[0]='文章内容';
            win.Title[1]=win.archieve_list[win.Postid-1].post_chinese_name;
        }
        if(win.Pathname[0] === 'tags') win.Title[0]='标签一览';
        if(win.Pathname[0] === 'songlist') win.Title[0]='网义云音乐';
        if(win.Pathname[0] === 'help') win.Title[0]='帮助';
        if(win.Pathname[0] === 'xjoi'){
            win.Title[0]='×√OI',win.Title[1]='离线评测系统',
            win.Title[2]='新版下线',win.Title[3]='since 2020';
            if(win.Pathname[1] === 'problemset'){
                win.Title[0]+='：题库';
                win.Title[4]=win.Title[3];win.Title[3]=win.Title[2];win.Title[2]=win.Title[1];
                win.Title[1]='第 '+(win.Page+1)+' 页';
            }
            if(win.Pathname[1] === 'probs'){
                win.Title[0]+='：题目内容';
                win.Title[4]=win.Title[3];win.Title[3]=win.Title[2];win.Title[2]=win.Title[1];
                win.Title[1]=win.prob_chinese_name[win.Probname];
            }
            if(win.Pathname[1] === 'contest') win.Title[0]+='：比赛';
            if(win.Pathname[1] === 'fakenews') win.Title[0]+='：新闻';
            if(win.Pathname[1] === 'abnormal') win.Title[0]+='：评测记录';
        }
        if(win.Pathname[0] === 'archieve'){
            if(win.Type !== undefined){
                let nowlen=win.Title.length;
                win.Title[nowlen] = '分类为：';
                if(win.Type == 'solution') win.Title[nowlen] += '题解';
                else if(win.Type == 'algorithm') win.Title[nowlen] += '算法/知识点';
                else if(win.Type == 'other') win.Title[nowlen] += '游记/其他';
                else win.Title[nowlen] += '不明分类';
            }
            if(win.Tags.length !== 0){
                let nowlen=win.Title.length;
                win.Title[nowlen] = '具有标签：';
                for (let i = 0; i < win.Tags.length; i = i + 1){
                    if(win.tags_list[win.Tags[i]] !== undefined)
                        win.Title[nowlen] += win.tags_list[win.Tags[i]];
                    else win.Title[nowlen] += '不明标签';
                    if(i !== win.Tags.length - 1) win.Title[nowlen] += '，';
                }
            }
            let nowlen=win.Title.length;
            win.Title[nowlen] = '第 '+(win.Page+1)+' 页';
        }
    }
    win.title='x义x 的 blog - ' + win.Title[0];
    win.WriteTitle2 = function (data){
        let AddText = function (twin,tdata,ttext,eletag){
            let Ttext=twin.createElement(eletag);
            if(win.Funval !== undefined && eletag === 'h1') Ttext.textContent = '集天下毒瘤题 恶心天下人';
            else Ttext.textContent = ttext;
            let TTtext=twin.createElement('center');
            TTtext.appendChild(Ttext);
            tdata.appendChild(TTtext);
        }
        if(win.Pathname.length === 0)
            if(win.isError === 0) AddText(win,data,'公告','h1');
            else AddText(win,data,'您似乎跃迁到了银河系之外','h1');
        else{
            if(win.Pathname[0] === 'archieve') AddText(win,data,'文章一览','h1');
            if(win.Pathname[0] === 'tags') AddText(win,data,'标签一览','h1');
            if(win.Pathname[0] === 'songlist') AddText(win,data,'网义云音乐','h1');
            if(win.Pathname[0] === 'help') AddText(win,data,'帮助','h1');
            if(win.Pathname[0] === 'posts') AddText(win,data,win.archieve_list[win.Postid-1].post_chinese_name,'h1');
            if(win.Pathname[0] === 'xjoi'){
                if(win.Pathname[1] !== 'probs') AddText(win,data,'集天下毒瘤题 恶心天下人','h1');
                if(win.Pathname[1] === 'contest') AddText(win,data,'比赛列表','h2');
                if(win.Pathname[1] === 'problemset') AddText(win,data,'题目列表','h2');
                if(win.Pathname[1] === 'abnormal') AddText(win,data,'评测记录','h2');
                if(win.Pathname[1] === 'probs')
                    AddText(win,data,win.prob_chinese_name[win.Probname],'h1'),
                    AddText(win,data,'作者：'+win.prob_author[win.Probname],'p');
                if(win.Pathname[1] === 'fakenews'){
                    var d=new Date();
                    AddText(win,data,'×√日报','h2'),
                    AddText(win,data,'地球日期：'+d.getFullYear()+' 年 '+(d.getMonth()+1)+' 月 '+d.getDate()+' 日','h3'),
                    AddText(win,data,'奶油糖日期：'+Math.floor(Math.random()*10000)+' 年 '+Math.floor(Math.random()*23)+
                    ' 月 '+Math.floor(Math.random()*17)+' 日','h3');
                }
            }
            if(win.Pathname[0] === 'archieve'){
                if(win.Type !== undefined){
                    let Typeinfo = '分类为：';
                    if(win.Type == 'solution') Typeinfo += '题解';
                    else if(win.Type == 'algorithm') Typeinfo += '算法/知识点';
                    else if(win.Type == 'other') Typeinfo += '游记/其他';
                    else Typeinfo += '不明分类';
                    AddText(win,data,Typeinfo,'h3');
                }
                if(win.Tags.length !== 0){
                    let Taginfo = '具有标签：';
                    for (let i = 0; i < win.Tags.length; i = i + 1){
                        if(win.tags_list[win.Tags[i]] !== undefined)
                            Taginfo += win.tags_list[win.Tags[i]];
                        else Taginfo += '不明标签';
                        if(i !== win.Tags.length - 1) Taginfo += '，';
                    }
                    AddText(win,data,Taginfo,'h3');
                }
                AddText(win,data,'第 '+(win.Page+1)+' 页','h3');
            }
        }
    }
    //绘制标签表格
    win.WriteTagsList = function (data){
        let TagsBlock = win.createElement('center');
        let TagsTable = win.createElement('table');
        TagsTable.border='1';TagsTable.rules='all';TagsTable.style='width: 70%';
        let TagsTitle = win.createElement('tr');
            let Titleh1=win.createElement('th');
            Titleh1.style='width: 45%';
            Titleh1.appendChild(win.createTextNode('名称'));
        TagsTitle.appendChild(Titleh1);
            let Titleh2=win.createElement('th');
            Titleh2.style='width: 55%';
            Titleh2.appendChild(win.createTextNode('英文名'));
        TagsTitle.appendChild(Titleh2);
        TagsTable.appendChild(TagsTitle);
        for(var Tag in win.tags_list){
            let TagsRow=win.createElement('tr');
                let TagsRow1=win.createElement('th');
                let TagsRow1a=win.createElement('a');
                TagsRow1a.href='/archieve/'+win.ezylanASearch(win.NextSearch(win.TrueSearch,{Tags : [Tag],Page : 0}));
                let TagsRow1strong=win.createElement('strong');
                TagsRow1strong.textContent=win.tags_list[Tag];
                TagsRow1a.appendChild(TagsRow1strong);
                TagsRow1.appendChild(TagsRow1a);
            TagsRow.appendChild(TagsRow1);
                let TagsRow2=win.createElement('th');
                let TagsRow2p=win.createElement('p');
                TagsRow2p.textContent=Tag;
                TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        TagsBlock.appendChild(TagsTable);
        data.appendChild(TagsBlock);
    }
    //绘制文章信息
    win.WritePostinfo = function(data,postinfo){
        let PostinfoBlock=win.createElement('tr');
            let Postinfo_id=win.createElement('td');
            let Postinfo_id_c = win.createElement('center');
            let Postinfo_id_p=win.createElement('p');
            Postinfo_id_p.textContent=postinfo.postid;
            Postinfo_id_c.appendChild(Postinfo_id_p);
            Postinfo_id.appendChild(Postinfo_id_c);
        PostinfoBlock.appendChild(Postinfo_id);
            let Postinfo_title=win.createElement('td');
            let Postinfo_title_c=win.createElement('center');
            let Postinfo_title_a=win.createElement('a');
            if(location.search.length !== 0)
                Postinfo_title_a.href='/posts/'+location.search+'&postid='+postinfo.postid;
            else Postinfo_title_a.href='/posts/?postid='+postinfo.postid;
            Postinfo_title_a.textContent=postinfo.post_chinese_name;
            Postinfo_title_c.appendChild(Postinfo_title_a);
            Postinfo_title.appendChild(Postinfo_title_c);
        PostinfoBlock.appendChild(Postinfo_title);
            let Postinfo_type=win.createElement('td');
            let Postinfo_type_c = win.createElement('center');
            if(postinfo.type_name !== 'none'){
                let Postinfo_type_a=win.createElement('a');
                Postinfo_type_a.href='/archieve/'+
                    win.ezylanASearch(win.NextSearch(win.TrueSearch,{Type : postinfo.type_name,Page : 0}));
                if(postinfo.type_name === 'solution') Postinfo_type_a.textContent='题解';
                else if(postinfo.type_name === 'algorithm') Postinfo_type_a.textContent='算法/知识点';
                else Postinfo_type_a.textContent='游记/其他';
                Postinfo_type_c.appendChild(Postinfo_type_a);
            }
            else{
                let Postinfo_type_p=win.createElement('p');
                Postinfo_type_p.textContent='无';
                Postinfo_type_c.appendChild(Postinfo_type_p);
            }
            Postinfo_type.appendChild(Postinfo_type_c);
        PostinfoBlock.appendChild(Postinfo_type);
            let Postinfo_tags=win.createElement('td');
            let Postinfo_tags_c = win.createElement('center');
            for(let i=0;i<postinfo.tag.length;i=i+1){
                let Postinfo_tags_a=win.createElement('a');
                Postinfo_tags_a.href='/archieve/'+
                    win.ezylanASearch(win.NextSearch(win.TrueSearch,{Tags : [postinfo.tag[i]],Page : 0}));
                Postinfo_tags_a.textContent=win.tags_list[postinfo.tag[i]];
                Postinfo_tags_c.appendChild(Postinfo_tags_a);
                if(i!==postinfo.tag.length-1) Postinfo_tags_c.appendChild(win.createTextNode(','));
            }
            if(postinfo.tag.length === 0){
                let Postinfo_tags_p=win.createElement('p');
                Postinfo_tags_p.textContent='无';
                Postinfo_tags_c.appendChild(Postinfo_tags_p);
            }
            Postinfo_tags.appendChild(Postinfo_tags_c);
        PostinfoBlock.appendChild(Postinfo_tags);
            let Postinfo_last_modi = win.createElement('td');
            let Postinfo_last_modi_c = win.createElement('c');
            let Postinfo_last_modi_p = win.createElement('p');
            Postinfo_last_modi_p.textContent = postinfo.last_modi;
            Postinfo_last_modi_c.appendChild(Postinfo_last_modi_p);
            Postinfo_last_modi.appendChild(Postinfo_last_modi_c);
        PostinfoBlock.appendChild(Postinfo_last_modi);
        data.appendChild(PostinfoBlock);
    }
    //判断文章是否合法
    win.isLegalPost = function(postinfo,post_count){
        if(win.Type !== undefined){
            if(postinfo.type_name !== win.Type) return 0;
        }
        for(let i=0;i<win.Tags.length;i=i+1){
            if(postinfo.tag.indexOf(win.Tags[i]) === -1) return 0;
        }
        post_count.value=post_count.value+1;
        if(post_count.value<=win.Page*win.post_per_page) return 0;
        if(post_count.value>(win.Page+1)*win.post_per_page) return 0;
        return 1;
    }
    //绘制文章一览
    win.post_count={value : 0};
    win.WriteArchieve = function(data){
        let ArchieveTable = win.createElement('table');
        ArchieveTable.border='1'; ArchieveTable.rules='all'; ArchieveTable.style='width: 100%; table-layout: fixed';
        let ArchieveTitle = win.createElement('tr'); ArchieveTitle.style = 'width: 100%';
            let Titleh0=win.createElement('th');
            Titleh0.style='width: 2em';
            Titleh0.appendChild(win.createTextNode('编号'));
        ArchieveTitle.appendChild(Titleh0);
            let Titleh1=win.createElement('th');
            Titleh1.style='width: calc(50% - 6.5em - 15px)';
            Titleh1.appendChild(win.createTextNode('标题'));
        ArchieveTitle.appendChild(Titleh1);
            let Titleh2=win.createElement('th');
            Titleh2.style='width: 5.5em';
            Titleh2.appendChild(win.createTextNode('分类'));
        ArchieveTitle.appendChild(Titleh2);
            let Titleh3=win.createElement('th');
            Titleh3.style='width: calc(50% - 6.5em - 15px)';
            Titleh3.appendChild(win.createTextNode('标签'));
        ArchieveTitle.appendChild(Titleh3);
            let Titleh4=win.createElement('th');
            Titleh4.style='width: 5.5em';
            Titleh4.appendChild(win.createTextNode('修改时间'));
        ArchieveTitle.appendChild(Titleh4);
        ArchieveTable.appendChild(ArchieveTitle);
        for(let i=0;i<win.archieve_list.length;i=i+1)
            if(win.isLegalPost(win.archieve_list[i],win.post_count)){
                win.WritePostinfo(ArchieveTable,win.archieve_list[i]);
            }
        data.appendChild(ArchieveTable);
        if(win.post_count.value === 0){
            let ErrorText = win.createElement('center');
            let ErrorText1 = win.createElement('h3');
            ErrorText1.textContent='您的要求过于奇怪，什么都没有找到呢QAQ';
            ErrorText.appendChild(ErrorText1);
            data.appendChild(ErrorText);
        }
    }
    //绘制翻页按钮
    win.WritePageButton = function(data,pcount,pper_page){
        let ButtonBlock = document.createElement('div');
        ButtonBlock.className = 'button-block';
        let PagePrev = win.createElement('button');
        if(win.Page !== 0){
            PagePrev.style='float: left;background-color: #ffffff;cursor: pointer;';
            PagePrev.onmouseover = function(){this.style = 'float: left;background-color: #dddddd;cursor: pointer;';}
            PagePrev.onmouseout = function(){this.style = 'float: left;background-color: #ffffff;cursor: pointer;';}
            PagePrev.onclick = function (){
                location.replace(location.pathname+win.ezylanASearch(win.NextSearch(win.TrueSearch,{Page:win.Page-1})));
            }
            PagePrev.textContent = '<<上一页';
        }
        else{
            PagePrev.style='float: left;background-color: #ffffff;';
            PagePrev.textContent = '已经到顶了';
        }
        ButtonBlock.appendChild(PagePrev);
        let PageSucc = win.createElement('button');
        if((win.Page+1)*pper_page < pcount.value){
            PageSucc.style='float: right;background-color: #ffffff;cursor: pointer;';
            PageSucc.onmouseover = function(){this.style = 'float: right;background-color: #dddddd;cursor: pointer;';}
            PageSucc.onmouseout = function(){this.style = 'float: right;background-color: #ffffff;cursor: pointer;';}
            PageSucc.onclick = function (){
                location.replace(location.pathname+win.ezylanASearch(win.NextSearch(win.TrueSearch,{Page:win.Page+1})));
            }
            PageSucc.textContent = '下一页>>';
        }
        else{
            PageSucc.style='float: right;background-color: #ffffff;';
            PageSucc.textContent = '已经到底了';
        }
        ButtonBlock.appendChild(PageSucc);
        data.appendChild(ButtonBlock);
    }
    win.WriteBlog = function(data,postid){
        let Blog = win.createElement('iframe');
        Blog.frameBorder =1;
        Blog.className='inline-blog';
        Blog.src = '/posts/posts/'+win.archieve_list[postid].post_name+".html";
        Blog.scrolling = "no";
        Blog.onload = function () {
            Blog.style.height = Blog.contentDocument.body.scrollHeight;
        }
        data.appendChild(Blog);
    }
    win.WriteTagsList2 = function (data,postinfo){
        let TagsBlock = win.createElement('center');
        let TagsTable = win.createElement('table');
        TagsTable.border='1';TagsTable.rules='all';TagsTable.style='width: 70%';
        let TagsTitle = win.createElement('tr');
            let Titleh1=win.createElement('th');
            Titleh1.style='width: 45%';
            Titleh1.appendChild(win.createTextNode('名称'));
        TagsTitle.appendChild(Titleh1);
            let Titleh2=win.createElement('th');
            Titleh2.style='width: 55%';
            Titleh2.appendChild(win.createTextNode('英文名'));
        TagsTitle.appendChild(Titleh2);
        TagsTable.appendChild(TagsTitle);
        for(var i=0;i<postinfo.tag.length;i=i+1){
            var Tag=postinfo.tag[i];
            let TagsRow=win.createElement('tr');
                let TagsRow1=win.createElement('th');
                let TagsRow1a=win.createElement('a');
                TagsRow1a.href='/archieve/'+win.ezylanASearch(win.NextSearch(win.TrueSearch,{Tags : [Tag],Page : 0}));
                let TagsRow1strong=win.createElement('strong');
                TagsRow1strong.textContent=win.tags_list[Tag];
                TagsRow1a.appendChild(TagsRow1strong);
                TagsRow1.appendChild(TagsRow1a);
            TagsRow.appendChild(TagsRow1);
                let TagsRow2=win.createElement('th');
                let TagsRow2p=win.createElement('p');
                TagsRow2p.textContent=Tag;
                TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        if(postinfo.tag.length === 0) {
            let TagsRow = win.createElement('tr');
                let TagsRow1 = win.createElement('th');
                let TagsRow1p = win.createElement('p');
                TagsRow1p.textContent = '这篇文章没有任何 tag';
                TagsRow1.appendChild(TagsRow1p);
            TagsRow.appendChild(TagsRow1);
                let TagsRow2 = win.createElement('th');
                let TagsRow2p = win.createElement('p');
                TagsRow2p.textContent = 'N/A';
                TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        TagsBlock.appendChild(TagsTable);
        data.appendChild(TagsBlock);
    }
})(document);
