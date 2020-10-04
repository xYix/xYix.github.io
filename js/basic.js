(function(win){
    'use strict',
    // 格式： xyix.gitee.io/.../.../?tags=...+...&type=...&sortby=&page=
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
            if(t.match('[.]') === null && t !== 'D:' && t !== '%E8%BF%AB%E7%9C%9Fblog') ret[ret.length] = t;
		return ret;
    }
    win.AnalyzeTags = function (s){
        if(s === undefined) return [];
        let ret = [], t;
        for (t of s.split('+'))
            ret[ret.length] = t;
		return ret;
    }
    win.WriteSideBar = function (data,title){
        let SideBar=document.createElement('div');
        SideBar.className='sidebar';
            let SideBarConBlock=document.createElement('div');
            SideBarConBlock.className='sidebar-content-block';
                let SideBarTitle=document.createElement('center');
                SideBarTitle.className='title';
                    let SideBarTitleContent1=document.createElement('h1');
                    SideBarTitleContent1.textContent='x义x 的自制 BLOG';
                SideBarTitle.appendChild(SideBarTitleContent1);
                let SideBarTitleContent2=document.createElement('p');
                for(let i=0;i<title.length;i=i+1){
                    if(i==0) SideBarTitleContent2.appendChild(document.createTextNode('您现在在：'+title[i]));
                    else SideBarTitleContent2.appendChild(document.createTextNode(title[i]));
                    if(i<title.length-1) SideBarTitleContent2.appendChild(document.createElement('br'));
                }
                SideBarTitle.appendChild(SideBarTitleContent2);
                SideBarConBlock.appendChild(SideBarTitle);
                let SideBarCon=document.createElement('div');
                SideBarCon.className='content';
                        let Text1=document.createElement('strong');
                        Text1.textContent='· 回到首页';
                    let aText1=document.createElement('a');
                    aText1.setAttribute('href','/');
                    aText1.appendChild(Text1);
                SideBarCon.appendChild(aText1);
                SideBarCon.appendChild(document.createElement('p'));
                        let Text2=document.createElement('strong');
                        Text2.textContent='· 文章一览';
                    let aText2=document.createElement('a');
                    aText2.setAttribute('href','/archieve/');
                    aText2.appendChild(Text2);
                SideBarCon.appendChild(aText2);
                SideBarCon.appendChild(document.createElement('p'));
                        let Text3=document.createElement('strong');
                        Text3.textContent='· 标签一览';
                    let aText3=document.createElement('a');
                    aText3.setAttribute('href','/tags/');
                    aText3.appendChild(Text3);
                SideBarCon.appendChild(aText3);
                SideBarCon.appendChild(document.createElement('p'));
                        let Text4=document.createElement('strong');
                        Text4.textContent='· 网义云音乐';
                    let aText4=document.createElement('a');
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
    if(win.Page === undefined) win.Page = 0;
    // Title
    win.Title=[];
    if(win.Pathname.length === 0) win.Title[0]='首页';
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
            Ttext.textContent = ttext;
            let TTtext=twin.createElement('center');
            TTtext.appendChild(Ttext);
            tdata.appendChild(TTtext);
        }
        if(win.Pathname.length === 0) AddText(win,data,'公告','h1');
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
})(document);