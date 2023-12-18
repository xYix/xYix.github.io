(function (win) {
    'use strict',
    findpost = function (postname) {
        for (var i = 0; i < archieve_list.length; i = i + 1)
            if (archieve_list[i].post_name === postname) return archieve_list[i];
        return undefined;
    }
    isban = function(postinfo) {
        for (let i = 0; i < postinfo.tag.length; i += 1)
            if (postinfo.tag[i] === 'ban') return 1;
        return 0;
    }
        // 格式： xyix.github.io/.../.../?tags=...+...&type=...&sortby=&page=
    win.isError = 0;
    win.post_per_page = 30;
    AnalyzeSearch = function (s) {
        let ret = {}, t, r;
        for (t of (s.startsWith('?') ? s.substr(1) : s).split('&'))
            if (r = t.split('='), r[1])
                ret[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
        return ret;
    }
    AnalyzePathname = function (s) {
        let ret = [], t;
        for (t of (s.startsWith('/') ? s.substr(1) : s).split('/'))
            if (t.match('[.]') === null && t !== 'D:' && t !== '%E8%BF%AB%E7%9C%9Fblog' && t !== '') ret.push(t);
        return ret;
    }
    AnalyzeTags = function (s) {
        if (s === undefined) return [];
        let ret = [], t;
        for (t of s.split('+'))
            ret.push(t);
        return ret;
    }
    //生成后继链接
    Reverse = function (s) {
        let t = '';
        for (var i in s) t = s[i] + t;
        return t;
    }
    NextSearch = function (PrevSearch, deltaSearch) {
        let tmpSearch = {};
        for (var x in PrevSearch) if (x !== 'Tags')
            tmpSearch[x] = PrevSearch[x];
        else {
            tmpSearch[x] = [];
            for (let i = 0; i < PrevSearch.Tags.length; i++)
                tmpSearch[x][i] = PrevSearch[x][i];
        }
        if (deltaSearch.Tags)
            for (let i = 0; i < deltaSearch.Tags.length; i++) if (tmpSearch.Tags.indexOf(deltaSearch.Tags[i]) === -1)
                tmpSearch.Tags.push(deltaSearch.Tags[i]);
        if (deltaSearch.Type) tmpSearch.Type = deltaSearch.Type;
        if (deltaSearch.Page !== undefined) tmpSearch.Page = deltaSearch.Page;
        if (deltaSearch.Funval) tmpSearch.Funval = deltaSearch.Funval;
        if (deltaSearch.ThemeColor) tmpSearch.ThemeColor = deltaSearch.ThemeColor;
        if (deltaSearch.Sortby) {
            if (tmpSearch.Sortby) {
                if (tmpSearch.Sortby != deltaSearch.Sortby && tmpSearch.Sortby != Reverse(deltaSearch.Sortby))
                    tmpSearch.Sortby = undefined;
            }
            if (tmpSearch.Sortby) {
                if (tmpSearch.Sortby === 'di' || (tmpSearch.Sortby === deltaSearch.Sortby && deltaSearch.Sortby != 'id'))
                    tmpSearch.Sortby = Reverse(tmpSearch.Sortby);
                else 
                    tmpSearch.Sortby = undefined;
            }
            else {
                if (deltaSearch.Sortby === 'id')
                    tmpSearch.Sortby = 'di';
                else 
                    tmpSearch.Sortby = deltaSearch.Sortby;
            }
        }
        if (deltaSearch.Searchfor) tmpSearch.Searchfor = deltaSearch.Searchfor;
        return tmpSearch;
    }
    ezylanASearch = function (Search) {
        let ret = '?';
        if (Search.Type)
            ret += '&type=' + Search.Type;
        if (Search.Tags.length !== 0) {
            ret += '&tags=';
            for (let i = 0; i < Search.Tags.length; i++) {
                if (i !== 0) ret += '+';
                ret += Search.Tags[i];
            }
        }
        if (Search.Sortby) 
            ret += '&sortby=' + Search.Sortby;
        if (Search.Page)
            ret += '&page=' + Search.Page;
        if (Search.Funval)
            ret += '&funval=' + Search.Funval;
        if (Search.Searchfor)
            ret += '&searchfor=' + Search.Searchfor;
        return ret;
    }
    win.Pathname = AnalyzePathname(location.pathname);
    win.Search = AnalyzeSearch(location.search);
    win.Tags = AnalyzeTags(win.Search['tags']);
    win.Tags.sort(function(a, b){ return tags_val[a] - tags_val[b]});
    win.Type = win.Search['type'];
    win.Sortby = win.Search['sortby'];
    if (win.Search['page'] === undefined) win.Page = 0;
    else win.Page = parseInt(win.Search['page']);
    win.Funval = win.Search['funval'];
    // win.Funval = 41; //April Fools
    win.Postname = win.Search['postname'];
    win.Postinfo = findpost(win.Postname);
    win.Searchfor = win.Search['searchfor'];

    if (win.Search['themecolor']) {
        localStorage.setItem("themecolor", win.Search['themecolor']);
        let newloc = location.pathname + ezylanASearch(
            {
                Tags: win.Tags,
                Type: win.Type,
                Sortby: win.Sortby,
                Page: win.Page,
                Funval: win.Funval,
            }
        );
        if (win.Postname) newloc += '&postname=' + win.Postname;
        location.replace(newloc);
    }
    if (localStorage.getItem('themecolor') === null || localStorage.getItem('themecolor') === undefined)
        localStorage.setItem("themecolor", 'Z');
    win.ThemeColor = localStorage.getItem('themecolor');

    win.isInside = 0;
    if (win.Funval && win.Funval != '41') {
        localStorage.setItem("isinside", win.Funval === 'oyasumi');
        let newloc = location.pathname + ezylanASearch(
            {
                Tags: win.Tags,
                Type: win.Type,
                Sortby: win.Sortby,
                Page: win.Page,
            }
        );
        if (win.Postname) newloc += '&postname=' + win.Postname;
        location.replace(newloc);
    }
    if (localStorage.getItem('isinside') === 'true') win.isInside = 1;

    if (win.Search['postid']) {
        win.Postname = archieve_list[parseInt(win.Search['postid'])-1].post_name;
        win.location.replace('/posts/?page=0&postname=' + win.Postname);
    }
    win.TrueSearch = {
        Tags: win.Tags,
        Type: win.Type,
        Sortby: win.Sortby,
        Page: win.Page,
        Funval: win.Funval,
        Searchfor: win.Searchfor
    };
    true_isban = function(postinfo) {
        if (isban(postinfo)) { if (win.isInside) return 0; return 1; }
        return 0;
    }

    win.TYPENAME = {'solution': '题解',
                    'algorithm': '笔记',
                    'other': '其他',
                    'journey': '游记',
                    'scp': 'SCP文档',
                    'library': '图书馆',
                    'flower': '鲜花',
                    'review': '测评'}
    win.SPECIALCOLOR = {'writing': 'orange',
                        'pigeon': 'grey',
                        'submit-answer': 'orange',
                        'interact': 'orange',
                        'commu': 'orange',
                        'safe': 'violet',
                        'euclid': 'violet',
                        'keter': 'violet',
                        'apollyon': 'violet',
                        'ero': 'red',
                        'suicide': 'red'}

    win.WriteSideBar = function (data, title, funval) {
        let AddText = function (tdata, ttext, eletag) {
            let Ttext = win.createElement(eletag);
            Ttext.textContent = ttext;
            Ttext.style = 'text-align: left; margin: 0';
            tdata.appendChild(Ttext);
        }
        let SideBar = win.createElement('div');
        SideBar.className = 'sidebar';
        let SideBarConBlock = win.createElement('div');
        SideBarConBlock.className = 'sidebar-content-block';
        let SideBarTitle = win.createElement('center');
        SideBarTitle.className = 'title';
            let SideBarIcon = win.createElement('img');
            SideBarIcon.src = '/images/scp-comb.png';
            if (win.isInside) SideBarIcon.src = '/images/scp-comb-2.png';
            SideBarIcon.alt = '';
            SideBarIcon.style = 'width: 120px';
            SideBarTitle.appendChild(SideBarIcon);

            let SideBarTitleContent1 = win.createElement('h2');
            SideBarTitleContent1.textContent = '基金会超常组合数学部';
            if (win.Funval === '41') 
                SideBarTitleContent1.textContent = '数据结构分裂者';
            if (win.isInside) 
                SideBarTitleContent1.textContent = '里世界';
            SideBarTitle.appendChild(SideBarTitleContent1);
        
            let SCPblock = win.createElement('center');
            SCPblock.style = 'width: 70%';
            if (win.Funval === '41') {
                AddText(SCPblock, '数点', 'p');
                AddText(SCPblock, '重构', 'p');
                AddText(SCPblock, '剖分', 'p');
            }
            else if (win.isInside) {
                AddText(SCPblock, '翻腾的记忆', 'p');
                AddText(SCPblock, '奔涌的感情', 'p');
                AddText(SCPblock, '万物皆有对偶', 'p');
            }
            else {
                AddText(SCPblock, 'Surprising', 'p');
                AddText(SCPblock, 'Combinatorial', 'p');
                AddText(SCPblock, 'Proof', 'p');
            }
        SideBarTitle.appendChild(SCPblock);
        
        let SideBarTitleContent2 = win.createElement('p');
        for (let i = 0; i < title.length; i = i + 1) {
            if (i == 0) SideBarTitleContent2.appendChild(win.createTextNode('您现在在：' + title[i]));
            else SideBarTitleContent2.appendChild(win.createTextNode(title[i]));
            if (i < title.length - 1) SideBarTitleContent2.appendChild(win.createElement('br'));
        }
        SideBarTitle.appendChild(SideBarTitleContent2);
        SideBarConBlock.appendChild(SideBarTitle);
        let SideBarCon = win.createElement('div');
        SideBarCon.className = 'content';
        let write_link = function(text1, text2) {
            let Text = win.createElement('p');
            Text.className = 'sidebar-link';
                let aText = win.createElement('a');
                aText.style = 'font-weight: bold';
                aText.textContent = '· ' + text1;
                aText.setAttribute('href', text2);
            Text.appendChild(aText);
            SideBarCon.appendChild(Text);
        }
        write_link('回到首页', '/' + ezylanASearch(win.TrueSearch));
        write_link('文章一览', '/archieve/' + ezylanASearch(win.TrueSearch));
        if (win.isInside === 0) {
            write_link('标签一览', '/tags/' + ezylanASearch(win.TrueSearch));
            write_link('一键清除 tag', location.pathname);
        }
        let changecolor = location.pathname;
        if (win.ThemeColor === undefined || win.ThemeColor === 'Z')
            changecolor += ezylanASearch(win.TrueSearch) + '&themecolor=N';
        if (win.ThemeColor === 'Y')
            changecolor += ezylanASearch(win.TrueSearch) + '&themecolor=Z';
        if (win.ThemeColor === 'X')
            changecolor += ezylanASearch(win.TrueSearch) + '&themecolor=Y';
        if (win.ThemeColor === 'N')
            changecolor += ezylanASearch(win.TrueSearch) + '&themecolor=X';
        if (win.Postname) {
            if (changecolor[changecolor.length - 1] === '/')
                changecolor += '?postname=' + win.Postname;
            else changecolor += '&postname=' + win.Postname;
        }
        write_link('更换主题颜色', changecolor);
        if (win.isInside === 0) {
            SideBarCon.appendChild(win.createElement('p'));
            write_link('关于作者 & 友链', '/posts/?page=0&postname=hello-world');
        }
        if (win.isInside) {
            changemode = location.pathname + ezylanASearch(win.TrueSearch) + '&funval=notoyasumi';
            if (win.Postname) changemode += '&postname=' + win.Postname;
            write_link('回到表世界', changemode);
        }
        SideBarConBlock.appendChild(SideBarCon);
        win.Write_Daily_Message(SideBarConBlock);
        SideBar.appendChild(SideBarConBlock);
        data.appendChild(SideBar);
    }
    // Title
    sort_text = {};
    sort_text['last_modi'] = '最近修改时间（降序）';
    sort_text['idom_tsal'] = '最近修改时间（升序）';
    sort_text['id'] = '文章编号（降序）';
    sort_text['di'] = '文章编号（升序）';
    win.Title = [];
    if (win.Pathname.length === 0) win.Title[0] = '首页';
    else {
        if (win.Pathname[0] === 'archieve') {
            win.Title[0] = '文章一览';
            if (win.Sortby)
                win.Title[1] = '排序方式：' + sort_text[win.Sortby];
        }
        if (win.Pathname[0] === 'posts') {
            win.Title[0] = '文章内容';
            if (win.Postinfo && !true_isban(win.Postinfo))
                win.Title[1] = win.Postinfo.post_chinese_name;
            else
                win.Title[1] = '未知文章';
        }
        if (win.Pathname[0] === 'tags') win.Title[0] = '标签一览';
        if (win.Pathname[0] === 'help') win.Title[0] = '帮助';
        if (win.Pathname[0] === 'archieve') {
            if (win.Type) {
                let nowlen = win.Title.length;
                win.Title[nowlen] = '分类为：' + win.TYPENAME[win.Type]
                // console.log(win.Type);
            }
            if (win.Tags.length !== 0) {
                let nowlen = win.Title.length;
                win.Title[nowlen] = '具有标签：';
                for (let i = 0; i < win.Tags.length; i += 1) {
                    if (tags_chinese[win.Tags[i]])
                        win.Title[nowlen] += tags_chinese[win.Tags[i]];
                    else win.Title[nowlen] += '不明标签';
                    if (i !== win.Tags.length - 1) win.Title[nowlen] += '，';
                }
            }
            if (win.Searchfor) {
                win.Title[win.Title.length] = '正在搜索子序列：' + win.Searchfor;
            }
            let nowlen = win.Title.length;
            win.Title[nowlen] = '第 ' + (win.Page + 1) + ' 页';
        }
    }
    if (win.Title[0] == '文章内容')
        win.title = 'x义x 的 blog - ' + win.Title[1];
    else win.title = 'x义x 的 blog - ' + win.Title[0];
    //绘制标签表格
    win.WriteTagsList = function (data) {
        let TagsBlock = win.createElement('center');
        let TagsTable = win.createElement('table');
        TagsTable.border = '1'; TagsTable.rules = 'all'; TagsTable.style = 'width: 70%';
        let TagsTitle = win.createElement('tr');
        let Titleh1 = win.createElement('th');
        Titleh1.style = 'width: 45%';
        Titleh1.appendChild(win.createTextNode('名称'));
        TagsTitle.appendChild(Titleh1);
        let Titleh2 = win.createElement('th');
        Titleh2.style = 'width: 55%';
        Titleh2.appendChild(win.createTextNode('英文名'));
        TagsTitle.appendChild(Titleh2);
        TagsTable.appendChild(TagsTitle);
        for (var i in tags_list) {
            let Tag = tags_list[i], TagsRow = win.createElement('tr');
                let TagsRow1 = win.createElement('th');
                let TagsRow1a = win.createElement('a');
                TagsRow1a.href = '/archieve/' + ezylanASearch(NextSearch(win.TrueSearch, { Tags: [Tag], Page: 0 }));
                TagsRow1a.textContent = tags_chinese[Tag];
                TagsRow1a.style = 'font-weight: bold';
                TagsRow1.appendChild(TagsRow1a);
                TagsRow.appendChild(TagsRow1);

                let TagsRow2 = win.createElement('th');
                let TagsRow2p = win.createElement('p');
                TagsRow2p.textContent = Tag;
                TagsRow2.appendChild(TagsRow2p);
                TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        TagsBlock.appendChild(TagsTable);
        data.appendChild(TagsBlock);
    }

    //绘制文章信息
    table_style = {'id': 'width: 4%', 'title': 'width: 43%', 'type': 'width: 12%', 'tags': 'width: 29%', 'last_modi': 'width: 12%'};
    table_text = {'id': '编号', 'title': '标题', 'type': '分类', 'tags': '标签', 'last_modi': '修改时间'};
    win.WritePostinfo = function (data, postinfo) {
        let PostinfoBlock = win.createElement('tr');

        //编号
        let Postinfo_id = win.createElement('td');

        let Postinfo_id_p = win.createElement('p');
        Postinfo_id_p.textContent = postinfo.postid;
        Postinfo_id.appendChild(Postinfo_id_p);

        Postinfo_id.style = table_style['id'];
        PostinfoBlock.appendChild(Postinfo_id);
        //标题
        let Postinfo_title = win.createElement('td');

        let Postinfo_title_a = win.createElement('a');

        if (location.search.length !== 0)
            Postinfo_title_a.href = '/posts/' + location.search + '&postname=' + postinfo.post_name;
        else Postinfo_title_a.href = '/posts/?postname=' + postinfo.post_name;
        Postinfo_title_a.textContent = postinfo.post_chinese_name;

        Postinfo_title.appendChild(Postinfo_title_a);

        Postinfo_title.style =table_style['title'];
        PostinfoBlock.appendChild(Postinfo_title);
        //类型
        let Postinfo_type = win.createElement('td');
        if (postinfo.type_name !== 'none') {
            let Postinfo_type_a = win.createElement('a');
            Postinfo_type_a.href = '/archieve/' +
                ezylanASearch(NextSearch(win.TrueSearch, { Type: postinfo.type_name, Page: 0 }));
            Postinfo_type_a.textContent = win.TYPENAME[postinfo.type_name]
            Postinfo_type.appendChild(Postinfo_type_a);
        }
        else {
            let Postinfo_type_p = win.createElement('p');
            Postinfo_type_p.textContent = '无';
            Postinfo_type.appendChild(Postinfo_type_p);
        }
        Postinfo_type.style =table_style['type'];
        PostinfoBlock.appendChild(Postinfo_type);
        //标签
        let havetag = 0;
        let Postinfo_tags = win.createElement('td');
        Postinfo_tags.style =table_style['tags'];
        for (let i = 0; i < postinfo.tag.length; i += 1) {
            if (postinfo.tag[i] === 'ban') continue;
            havetag = 1;
            let Postinfo_tags_a = win.createElement('a');
            Postinfo_tags_a.href = '/archieve/' +
                ezylanASearch(NextSearch(win.TrueSearch, { Tags: [postinfo.tag[i]], Page: 0 }));
            Postinfo_tags_a.textContent = tags_chinese[postinfo.tag[i]];
            if (postinfo.tag[i] in win.SPECIALCOLOR)
                Postinfo_tags_a.style = 'color: ' + win.SPECIALCOLOR[postinfo.tag[i]]
            Postinfo_tags.appendChild(Postinfo_tags_a);
            if (i !== postinfo.tag.length - 1) Postinfo_tags.appendChild(win.createTextNode(','));
        }
        if (havetag === 0) {
            let Postinfo_tags_p = win.createElement('p');
            Postinfo_tags_p.textContent = '无';
            Postinfo_tags.appendChild(Postinfo_tags_p);
        }
        PostinfoBlock.appendChild(Postinfo_tags);
        //修改时间
        let Postinfo_last_modi = win.createElement('td');
        Postinfo_last_modi.style =table_style['last_modi'];
        let Postinfo_last_modi_p = win.createElement('p');
        Postinfo_last_modi_p.textContent = postinfo.last_modi;
        Postinfo_last_modi.appendChild(Postinfo_last_modi_p);
        PostinfoBlock.appendChild(Postinfo_last_modi);

        data.appendChild(PostinfoBlock);
    }

    //判断文章是否合法
    isLegalPost = function (postinfo, post_count) {
        if (true_isban(postinfo)) return 0;
        if (win.Type) {
            if (postinfo.type_name !== win.Type) return 0;
        }
        for (let i = 0; i < win.Tags.length; i += 1) {
            if (postinfo.tag.indexOf(win.Tags[i]) === -1) return 0;
        }
        if (win.Searchfor) {
            let exp = '';
            for (let i = 0; i < win.Searchfor.length; i += 1)
                exp += win.Searchfor[i] + '[^]*';
            console.log(exp);
            if (postinfo.post_chinese_name.search(exp) == -1) return 0;
        }
        post_count.value = post_count.value + 1;
        if (post_count.value <= win.Page * win.post_per_page) return 0;
        if (post_count.value > (win.Page + 1) * win.post_per_page) return 0;
        return 1;
    }

    //绘制 archieve 列表
    win.post_count = { value: 0 };
    win.WriteArchieve = function (data) {
        if (win.Sortby === 'last_modi')
	        archieve_list.sort(function(a, b){ return b.last_modi_val - a.last_modi_val});
        else if (win.Sortby === 'idom_tsal') 
	        archieve_list.sort(function(a, b){ return a.last_modi_val - b.last_modi_val});
        else if (win.Sortby === 'di') 
	        archieve_list.sort(function(a, b){ return a.postid - b.postid});
        else 
	        archieve_list.sort(function(a, b){ return b.postid - a.postid});
        let ArchieveTable = win.createElement('table');
        ArchieveTable.border = '1'; ArchieveTable.rules = 'all'; ArchieveTable.style = 'width: 100%';
        ArchieveTable.className = 'mycenter';

        let ArchieveTitle = win.createElement('tr'); ArchieveTitle.style = 'width: 100%';

        let writeTh = function (qaq) {
            let Titleh = win.createElement('th');
            Titleh.style = table_style[qaq];
            if (qaq === 'last_modi' || qaq === 'id') {
                let Titleha = win.createElement('a');
                Titleha.textContent = table_text[qaq];
                if (win.Sortby === qaq) Titleha.textContent += "↑";
                if (win.Sortby === Reverse(qaq)) Titleha.textContent += "↓";
                Titleha.href = ezylanASearch(NextSearch(win.TrueSearch, { Sortby: qaq, Page: 0 }));
                Titleh.appendChild(Titleha);
            }
            else Titleh.appendChild(win.createTextNode(table_text[qaq]));
            ArchieveTitle.appendChild(Titleh);
        }

        writeTh('id');
        writeTh('title');
        writeTh('type');
        writeTh('tags');
        writeTh('last_modi');

        ArchieveTable.appendChild(ArchieveTitle);

        for (let i = 0; i < archieve_list.length; i += 1)
            if (isLegalPost(archieve_list[i], win.post_count)) {
                win.WritePostinfo(ArchieveTable, archieve_list[i]);
            }

        data.appendChild(ArchieveTable);
        if (win.post_count.value === 0) {
            let ErrorText = win.createElement('center');
            let ErrorText1 = win.createElement('h3');
            ErrorText1.textContent = '您的要求过于奇怪，什么都没有找到呢QAQ';
            ErrorText.appendChild(ErrorText1);
            data.appendChild(ErrorText);
        }
    }

    //绘制翻页按钮
    WritePageButton = function (data, pcount, pper_page) {
        let ButtonBlock = win.createElement('div');
        ButtonBlock.className = 'button-block';
        let PagePrev = win.createElement('button');
        if (win.Page !== 0) {
            PagePrev.style = 'float: left;background-color: rgb(255, 255, 255, var(--opa));cursor: pointer;';
            PagePrev.onmouseover = function () { this.style = 'float: left;background-color: rgb(221, 221, 221, var(--opa));cursor: pointer;'; }
            PagePrev.onmouseout = function () { this.style = 'float: left;background-color: rgb(255, 255, 255, var(--opa));cursor: pointer;'; }
            PagePrev.onclick = function () {
                location.replace(location.pathname + ezylanASearch(NextSearch(win.TrueSearch, { Page: win.Page - 1 })));
            }
            PagePrev.textContent = '<<上一页';
        }
        else {
            PagePrev.style = 'float: left;background-color: rgb(255, 255, 255, var(--opa));';
            PagePrev.textContent = '已经到顶了';
        }
        ButtonBlock.appendChild(PagePrev);
        let PageSucc = win.createElement('button');
        if ((win.Page + 1) * pper_page < pcount.value) {
            PageSucc.style = 'float: right;background-color: rgb(255, 255, 255, var(--opa));cursor: pointer;';
            PageSucc.onmouseover = function () { this.style = 'float: right;background-color: rgb(221, 221, 221, var(--opa));cursor: pointer;'; }
            PageSucc.onmouseout = function () { this.style = 'float: right;background-color: rgb(255, 255, 255, var(--opa));cursor: pointer;'; }
            PageSucc.onclick = function () {
                location.replace(location.pathname + ezylanASearch(NextSearch(win.TrueSearch, { Page: win.Page + 1 })));
            }
            PageSucc.textContent = '下一页>>';
        }
        else {
            PageSucc.style = 'float: right;background-color: rgb(255, 255, 255, var(--opa));';
            PageSucc.textContent = '已经到底了';
        }
        ButtonBlock.appendChild(PageSucc);
        data.appendChild(ButtonBlock);
    }

    //绘制搜索框
    SearchHint = [
        '主人今天要搜点什么……？',
        '别输奇怪的字符呀，搜索姬会坏掉的',
        '最好先搜索子串再点 tag 哦',
        '搜索姬做事很严谨，所以区分大小写！',
        '搜索姬只支持搜索标题中的子序列qaq',
    ];
    WriteSearchInput = function (data) {
        let InputForm = win.createElement('form');
        InputForm.action = '/archieve';
        InputForm.method = 'get';
        let InputBody = win.createElement('input');
        InputBody.style = 'float: right;';
        InputBody.type = 'text';
        InputBody.name = 'searchfor';
        InputBody.placeholder = SearchHint[Math.floor(Math.random()*SearchHint.length)];
        InputForm.appendChild(InputBody);
        data.appendChild(InputForm);
    }

    //绘制文章内容
    win.WriteErrorBlog = function (data) {
        let Ttext = document.createElement('h1');
        Ttext.textContent = '未知文章';
        Ttext.style = 'text-align: center';
        data.appendChild(Ttext);

        let Blog = win.createElement('iframe');
        Blog.style.opacity = 1.0;
        Blog.frameBorder = 1;
        Blog.className = 'inline-blog';
        Blog.src = '/posts/posts/404.html';
        Blog.scrolling = "no";
        Blog.onload = function () {
            Blog.style.height = Blog.contentDocument.body.scrollHeight;
            setInterval(()=>Blog.style.height = Blog.contentDocument.body.scrollHeight,200);
        }
        data.appendChild(Blog);
    }
    win.WriteBlog = function (data, postinfo) {
        if (postinfo === undefined) return win.WriteErrorBlog(data);
        if (true_isban(postinfo)) return win.WriteErrorBlog(data);

        let Ttext = document.createElement('h1');
        Ttext.textContent = postinfo.post_chinese_name;
        Ttext.style = 'text-align: center';
        data.appendChild(Ttext);
        
        let Blog = win.createElement('iframe');
        Blog.style.opacity = 1.0;
        Blog.frameBorder = 1;
        Blog.className = 'inline-blog';
        if (postinfo.postid === '45') {
            Blog.src = '/images/%E7%BB%84%E5%90%88%E8%AE%A1%E6%95%B0%E5%92%8C%E7%94%9F%E6%88%90%E5%87%BD%E6%95%B0.pdf';
            Blog.scrolling = "yes";
            Blog.opacity = 1.0;
            Blog.onload = function () {
                Blog.style.height = document.body.offsetHeight * 0.8;
            }
        }
        else if (postinfo.post_name === 'xj-404') {
            Blog.src = 'https://scpsandboxcn.wikidot.com/xj-404';
            Blog.scrolling = "yes";
            Blog.opacity = 1.0;
            Blog.onload = function () {
                Blog.style.height = document.body.offsetHeight * 0.8;
            }
        }
        else if (postinfo.post_name === 'xj-1998') {
            Blog.src = 'https://scpsandboxcn.wikidot.com/xj-1998';
            Blog.scrolling = "yes";
            Blog.opacity = 1.0;
            Blog.onload = function () {
                Blog.style.height = document.body.offsetHeight * 0.8;
            }
        }
        else {
            dangerlist = []
            for (tags in postinfo.tag)
                if (['ero', 'suicide'].indexOf(postinfo.tag[tags]) != -1)
                    dangerlist[dangerlist.length] = postinfo.tag[tags];
            
            if (dangerlist.length == 0 || win.isInside) {
                Blog.src = '/posts/posts/' + postinfo.post_name + ".html";
                Blog.scrolling = "no";
                Blog.onload = function () {
                    Blog.style.height = Blog.contentDocument.body.scrollHeight;
                    setInterval(()=>Blog.style.height = Blog.contentDocument.body.scrollHeight,200);
                }
            }
            else {
                Blog.src = '/posts/posts/404-warn.html?postname=' + postinfo.post_name + '&warn=';
                for (i in dangerlist) {
                    if (i != 0) Blog.src += '+';
                    Blog.src += dangerlist[i];
                }
                Blog.scrolling = "no";
                Blog.onload = function () {
                    Blog.style.height = Blog.contentDocument.body.scrollHeight;
                    setInterval(()=>Blog.style.height = Blog.contentDocument.body.scrollHeight,200);
                }
            }
        }
        data.appendChild(Blog);

        let TTtext = document.createElement('h1');
        TTtext.textContent = '标签';
        TTtext.style = 'text-align: center';
        data.appendChild(TTtext);

        let TagsBlock = document.createElement('center');
        let TagsTable = document.createElement('table');
        TagsTable.border = '1'; TagsTable.rules = 'all'; TagsTable.style = 'width: 70%';
        let TagsTitle = document.createElement('tr');
        let Titleh1 = document.createElement('th');
        Titleh1.style = 'width: 45%';
        Titleh1.appendChild(document.createTextNode('名称'));
        TagsTitle.appendChild(Titleh1);
        let Titleh2 = document.createElement('th');
        Titleh2.style = 'width: 55%';
        Titleh2.appendChild(document.createTextNode('英文名'));
        TagsTitle.appendChild(Titleh2);
        TagsTable.appendChild(TagsTitle);
        let havetag = 0;
        for (var i = 0; i < postinfo.tag.length; i += 1) {
            var Tag = postinfo.tag[i];
            if (Tag === 'ban') continue;
            havetag = 1;
            let TagsRow = document.createElement('tr');
            let TagsRow1 = document.createElement('th');
            let TagsRow1a = document.createElement('a');
            TagsRow1a.href = '/archieve/' + ezylanASearch(NextSearch(document.TrueSearch, { Tags: [Tag], Page: 0 }));
            let TagsRow1strong = document.createElement('strong');
            TagsRow1strong.textContent = tags_chinese[Tag];
            TagsRow1a.appendChild(TagsRow1strong);
            if (Tag in win.SPECIALCOLOR) TagsRow1a.style = 'color: ' + win.SPECIALCOLOR[Tag]
            TagsRow1.appendChild(TagsRow1a);
            TagsRow.appendChild(TagsRow1);
            let TagsRow2 = document.createElement('th');
            let TagsRow2p = document.createElement('p');
            TagsRow2p.textContent = Tag;
            TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        if (!havetag) {
            let TagsRow = document.createElement('tr');
            let TagsRow1 = document.createElement('th');
            let TagsRow1p = document.createElement('p');
            TagsRow1p.textContent = '这篇文章没有任何 tag';
            TagsRow1.appendChild(TagsRow1p);
            TagsRow.appendChild(TagsRow1);
            let TagsRow2 = document.createElement('th');
            let TagsRow2p = document.createElement('p');
            TagsRow2p.textContent = 'N/A';
            TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        TagsBlock.appendChild(TagsTable);
        data.appendChild(TagsBlock);
    }
})(document);
