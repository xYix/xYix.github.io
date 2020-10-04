(function(win){
    'use strict',
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
            if(t.match('[.]') === null) ret[ret.length] = t;
		return ret;
    }
    win.WriteSideBar = function (data,title){
        let SideBar=document.createElement('div');
        SideBar.className='sidebar';
            let SideBarTitle=document.createElement('center');
            SideBarTitle.className='title';
                let SideBarTitleContent1=document.createElement('h1');
                SideBarTitleContent1.textContent='x义x 的自制 BLOG';
            SideBarTitle.appendChild(SideBarTitleContent1);
                let SideBarTitleContent2=document.createElement('h3');
                SideBarTitleContent2.textContent='您现在在：'+title;
            SideBarTitle.appendChild(SideBarTitleContent2);
        SideBar.appendChild(SideBarTitle);
            let SideBarConBlock=document.createElement('div');
            SideBarConBlock.className='content-block';
                let SideBarCon=document.createElement('div');
                SideBarCon.className='content';
                    let xYixSign=document.createElement('p');
                    xYixSign.className='lil-p';
                    xYixSign.textContent='……就算是单程票，也是可以的吧？';
                SideBarCon.appendChild(document.createElement('center').appendChild(xYixSign));
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
    win.Title='';
    if(win.Pathname.length === 0) win.Title='首页';
    else{
        if(win.Pathname[0] === 'achieve' && win.Pathname.length === 1) win.Title='文章一览';
        if(win.Pathname[0] === 'tags' && win.Pathname.length === 1) win.Title='标签一览';
        if(win.Pathname[0] === 'songlist' && win.Pathname.length === 1) win.Title='网义云音乐';
        if(win.Pathname.length !== 1){
            if(win.Pathname[0] === 'achieve'){
                win.Title='分类：';
                if(win.Pathname[1] === 'solution')
                    win.Title+='题解';
                if(win.Pathname[1] === 'algorithm')
                    win.Title+='算法/知识点';
                if(win.Pathname[1] === 'other')
                    win.Title+='游记/其他';
            }
            if(win.Pathname[0] === 'tags'){
                win.Title='标签：'+win.tags_list[win.Pathname[1]];
            }
        }
    }
    win.title='x义x 的 blog - '+win.Title;
})(document);