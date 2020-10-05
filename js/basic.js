(function(win){
    'use strict',
    // 格式： xyix.gitee.io/.../.../?tags=...+...&type=...&sortby=&page=
    win.isError = 0;
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
    win.WriteSideBar = function (data,title,funval){
        let SideBar=win.createElement('div');
        SideBar.className='sidebar';
            let SideBarConBlock=win.createElement('div');
            SideBarConBlock.className='sidebar-content-block';
                let SideBarTitle=win.createElement('center');
                SideBarTitle.className='title';
                    let SideBarTitleContent1=win.createElement('h1');
                    if(funval !== undefined) SideBarTitleContent1.textContent='XJOI';
                    else SideBarTitleContent1.textContent='x义x 的自制 BLOG';
                SideBarTitle.appendChild(SideBarTitleContent1);
                    let SideBarTitleContent2=win.createElement('p');
                    if(funval !== undefined){ //彩蛋
                        SideBarTitleContent2.appendChild(win.createTextNode('在线评测系统'));
                        SideBarTitleContent2.appendChild(win.createElement('br'));
                        SideBarTitleContent2.appendChild(win.createTextNode('新版上线'));
                        SideBarTitleContent2.appendChild(win.createElement('br'));
                        SideBarTitleContent2.appendChild(win.createTextNode('since 2009'));
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
                    aText1.setAttribute('href','/');
                    aText1.appendChild(Text1);
                SideBarCon.appendChild(aText1);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text2=win.createElement('strong');
                        Text2.textContent='· 文章一览';
                    let aText2=win.createElement('a');
                    aText2.setAttribute('href','/archieve/');
                    aText2.appendChild(Text2);
                SideBarCon.appendChild(aText2);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text3=win.createElement('strong');
                        Text3.textContent='· 标签一览';
                    let aText3=win.createElement('a');
                    aText3.setAttribute('href','/tags/');
                    aText3.appendChild(Text3);
                SideBarCon.appendChild(aText3);
                SideBarCon.appendChild(win.createElement('p'));
                        let Text4=win.createElement('strong');
                        Text4.textContent='· 网义云音乐';
                    let aText4=win.createElement('a');
                    aText4.setAttribute('href','/songlist/');
                    aText4.appendChild(Text4);
                SideBarCon.appendChild(aText4);
            SideBarConBlock.appendChild(SideBarCon);
            win.Write_Daily_Message(SideBarConBlock);
        SideBar.appendChild(SideBarConBlock);
        data.appendChild(SideBar);
    }
    win.Pathname=win.AnalyzePathname(location.pathname);
    win.Search=win.AnalyzeSearch(location.search);
    win.Tags=win.AnalyzeTags(win.Search['tags']);
    win.Type=win.Search['type'];
    win.Sortby=win.Search['sortby'];
    win.Page=win.Search['page'];
    win.Funval=win.Search['funval'];
    if(win.Page === undefined) win.Page = 0;
    win.TrueSearch={
        Tags : win.Tags,
        Type : win.Type,
        Sortby : win.Sortby,
        Page : win.Page,
        Funval : win.Funval,
    };
    // Title
    win.Title=[];
    if(win.Pathname.length === 0)
        if(win.isError === 0) win.Title[0]='首页';
        else win.Title[0]='未知页面';
    else{
        if(win.Pathname[0] === 'archieve') win.Title[0]='文章一览';
        if(win.Pathname[0] === 'tags') win.Title[0]='标签一览';
        if(win.Pathname[0] === 'songlist') win.Title[0]='网义云音乐';
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
        }
    }
    win.title='x义x 的 blog - ' + win.Title[0];
    win.WriteTitle2 = function (data){
        let AddText = function (twin,tdata,ttext,eletag){
            let Ttext=twin.createElement(eletag);
            if(win.Funval !== undefined && eletag === 'h1') Ttext.textContent = '集天下英才 育天下人';
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
            }
        }
    }
    win.WriteTagsList = function (data){
        let TagsBlock = win.createElement('center');
        let TagsTable = win.createElement('table');
        TagsTable.border='1';TagsTable.rules='all';TagsTable.style='width: 70%';
        let TagsTitle = win.createElement('tr');
            let Titleh1=win.createElement('th');
            Titleh1.style='width: 40%';
            Titleh1.appendChild(win.createTextNode('名称'));
        TagsTitle.appendChild(Titleh1);
            let Titleh2=win.createElement('th');
            Titleh2.style='width: 60%';
            Titleh2.appendChild(win.createTextNode('英文名'));
        TagsTitle.appendChild(Titleh2);
        TagsTable.appendChild(TagsTitle);
        for(var Tag in win.tags_list){
            let TagsRow=win.createElement('tr');
                let TagsRow1=win.createElement('th');
                let TagsRow1a=win.createElement('a');
                TagsRow1a.href='/archieve/?tags='+Tag;
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
    win.NextSearch = function (PrevSearch,deltaSearch){
        for(var Tag in deltaSearch.Tags) if(PrevSearch.Tags.indexOf(Tag) === -1)
            PrevSearch.Tags[PrevSearch.Tags.length]=Tag;
        PrevSearch.Type=deltaSearch.Type;
        PrevSearch.Sortby=deltaSearch.Sortby;
        PrevSearch.Page=deltaSearch.Page;
        PrevSearch.Funval=deltaSearch.Funval;
        return PrevSearch;
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
})(document);