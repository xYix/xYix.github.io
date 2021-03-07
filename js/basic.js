(function (win) {
    'use strict',
        // 格式： xyix.gitee.io/.../.../?tags=...+...&type=...&sortby=&page=
    win.isError = 0;
    win.post_per_page = 30;
    win.AnalyzeSearch = function (s) {
        let ret = {}, t, r;
        for (t of (s.startsWith('?') ? s.substr(1) : s).split('&'))
            if (r = t.split('='), r[1])
                ret[decodeURIComponent(r[0])] = decodeURIComponent(r[1]);
        return ret;
    }
    win.AnalyzePathname = function (s) {
        let ret = [], t;
        for (t of (s.startsWith('/') ? s.substr(1) : s).split('/'))
            if (t.match('[.]') === null && t !== 'D:' && t !== '%E8%BF%AB%E7%9C%9Fblog' && t !== '') ret[ret.length] = t;
        return ret;
    }
    win.AnalyzeTags = function (s) {
        if (s === undefined) return [];
        let ret = [], t;
        for (t of s.split('+'))
            ret[ret.length] = t;
        return ret;
    }
    //生成后继链接
    win.NextSearch = function (PrevSearch, deltaSearch) {
        let tmpSearch = {};
        for (var x in PrevSearch) if (x !== 'Tags')
            tmpSearch[x] = PrevSearch[x];
        else {
            tmpSearch[x] = [];
            for (let i = 0; i < PrevSearch.Tags.length; i++)
                tmpSearch[x][i] = PrevSearch[x][i];
        }
        if (deltaSearch.Tags !== undefined)
            for (let i = 0; i < deltaSearch.Tags.length; i++) if (tmpSearch.Tags.indexOf(deltaSearch.Tags[i]) === -1)
                tmpSearch.Tags[tmpSearch.Tags.length] = deltaSearch.Tags[i];
        if (deltaSearch.Type !== undefined) tmpSearch.Type = deltaSearch.Type;
        if (deltaSearch.Sortby !== undefined) tmpSearch.Sortby = deltaSearch.Sortby;
        if (deltaSearch.Page !== undefined) tmpSearch.Page = deltaSearch.Page;
        if (deltaSearch.Funval !== undefined) tmpSearch.Funval = deltaSearch.Funval;
        if (deltaSearch.ThemeColor !== undefined) tmpSearch.ThemeColor = deltaSearch.ThemeColor;
        return tmpSearch;
    }
    win.ezylanASearch = function (Search) {
        let ret = '?', flg = 1;
        if (Search.Type !== undefined) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'type=' + Search.Type;
        }
        if (Search.Tags.length !== 0) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'tags=';
            for (let i = 0; i < Search.Tags.length; i++) {
                if (i !== 0) ret += '+';
                ret += Search.Tags[i];
            }
        }
        if (Search.Sortby !== undefined) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'sortby=' + Search.Sortby;
        }
        if (Search.Page !== undefined) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'page=' + Search.Page;
        }
        if (Search.Funval !== undefined) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'funval=' + Search.Funval;
        }
        if (Search.ThemeColor !== undefined) {
            if (flg === 1) flg = 0; else ret += '&';
            ret += 'themecolor=' + Search.ThemeColor;
        }
        return ret;
    }
    win.InitAnalyze = function () {
        win.Pathname = win.AnalyzePathname(location.pathname);
        win.Search = win.AnalyzeSearch(location.search);
        win.Tags = win.AnalyzeTags(win.Search['tags']);
        win.Type = win.Search['type'];
        win.Sortby = win.Search['sortby'];
        if (win.Search['page'] === undefined) win.Page = 0;
        else win.Page = parseInt(win.Search['page']);
        win.Funval = win.Search['funval'];
        win.ThemeColor = win.Search['themecolor'];
        if (win.ThemeColor) {
            localStorage.setItem("themecolor", win.ThemeColor);
        }
        else {
            console.log(localStorage.getItem('themecolor'));
            if (localStorage.getItem('themecolor') === null || localStorage.getItem('themecolor') === undefined)
                localStorage.setItem("themecolor", 'Z');
            win.ThemeColor = localStorage.getItem('themecolor');
        }
        win.Postname = win.Search['postname'];
        if (win.Search['postid'] !== undefined) {
            win.Postname = win.archieve_list[parseInt(win.Search['postid'])-1].post_name;
            win.location.replace('/posts/?page=0&postname=' + win.Postname);
        }
        win.TrueSearch = {
            Tags: win.Tags,
            Type: win.Type,
            Sortby: win.Sortby,
            Page: win.Page,
            Funval: win.Funval,
            ThemeColor: win.ThemeColor,
        };
    }
    win.InitAnalyze();
    // win.putError = function () {
    //     let notfoundpage = '/404.html';
    //     if (win.ThemeColor !== undefined)
    //     notfoundpage = notfoundpage + '?themecolor=' + win.ThemeColor;
    //     win.location.replace(notfoundpage);
    // }
    win.AddText = function (tdata, ttext, eletag) {
        let Ttext = win.createElement(eletag);
        Ttext.textContent = ttext;
        Ttext.style = 'text-align: left; margin: 0';
        tdata.appendChild(Ttext);
    }
    win.WriteSideBar = function (data, title, funval) {
        let SideBar = win.createElement('div');
        SideBar.className = 'sidebar';
        let SideBarConBlock = win.createElement('div');
        SideBarConBlock.className = 'sidebar-content-block';
        let SideBarTitle = win.createElement('center');
        SideBarTitle.className = 'title';
        let SideBarTitleContent1 = win.createElement('h2');
        SideBarTitleContent1.textContent = '基金会超常组合数学部';
        SideBarTitle.appendChild(SideBarTitleContent1);
        
        let SCPblock = win.createElement('center');
        SCPblock.style = 'width: 70%';
        win.AddText(SCPblock, 'Surprising', 'p');
        win.AddText(SCPblock, 'Combinatorial', 'p');
        win.AddText(SCPblock, 'Proof', 'p');
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
        write_link('回到首页', '/' + win.ezylanASearch(win.TrueSearch));
        write_link('文章一览', '/archieve/' + win.ezylanASearch(win.TrueSearch));
        write_link('标签一览', '/tags/' + win.ezylanASearch(win.TrueSearch));
        write_link('一键清除 tag', location.pathname);
        let changecolor = location.pathname;
        if (win.ThemeColor === undefined || win.ThemeColor === 'Z')
            changecolor += win.ezylanASearch(win.NextSearch(win.TrueSearch,{ThemeColor: 'N'}));
        if (win.ThemeColor === 'Y')
            changecolor += win.ezylanASearch(win.NextSearch(win.TrueSearch,{ThemeColor: 'Z'}));
        if (win.ThemeColor === 'X')
            changecolor += win.ezylanASearch(win.NextSearch(win.TrueSearch,{ThemeColor: 'Y'}));
        if (win.ThemeColor === 'N')
            changecolor += win.ezylanASearch(win.NextSearch(win.TrueSearch,{ThemeColor: 'X'}));
        if (win.Postname !== undefined) {
            if (changecolor[changecolor.length - 1] === '/')
                changecolor += '?postname=' + win.Postname;
            else changecolor += '&postname=' + win.Postname;
        }
        write_link('更换主题颜色', changecolor);
        SideBarCon.appendChild(win.createElement('p'));
        write_link('关于作者 & 友链', '/posts/?page=0&postname=hello-world');
        write_link('luogu 上的x义x', 'https://www.luogu.com.cn/blog/zyxxs/');
        write_link('github 上的x义x', 'https://xyix.github.io');
        write_link('codeforces 上的x义x', 'https://codeforces.com/profile/Comet_Honeymoon');
        SideBarConBlock.appendChild(SideBarCon);
        win.Write_Daily_Message(SideBarConBlock);
        SideBar.appendChild(SideBarConBlock);
        data.appendChild(SideBar);
    }
    win.findpost = function (postname) {
        for (var i = 0; i < win.archieve_list.length; i = i + 1)
            if (win.archieve_list[i].post_name === postname) return win.archieve_list[i];
        return 'error';
    }
    // Title
    win.Title = [];
    if (win.Pathname.length === 0) win.Title[0] = '首页';
    else {
        if (win.Pathname[0] === 'archieve') win.Title[0] = '文章一览';
        if (win.Pathname[0] === 'posts') {
            win.Title[0] = '文章内容';
            win.Title[1] = win.findpost(win.Postname).post_chinese_name;
        }
        if (win.Pathname[0] === 'tags') win.Title[0] = '标签一览';
        if (win.Pathname[0] === 'help') win.Title[0] = '帮助';
        if (win.Pathname[0] === 'archieve') {
            if (win.Type !== undefined) {
                let nowlen = win.Title.length;
                win.Title[nowlen] = '分类为：';
                if (win.Type == 'solution') win.Title[nowlen] += '题解';
                else if (win.Type == 'algorithm') win.Title[nowlen] += '算法/知识点';
                else if (win.Type == 'other') win.Title[nowlen] += '游记/其他';
                else win.Title[nowlen] += '不明分类';
            }
            if (win.Tags.length !== 0) {
                let nowlen = win.Title.length;
                win.Title[nowlen] = '具有标签：';
                for (let i = 0; i < win.Tags.length; i += 1) {
                    if (win.tags_list[win.Tags[i]] !== undefined)
                        win.Title[nowlen] += win.tags_list[win.Tags[i]];
                    else win.Title[nowlen] += '不明标签';
                    if (i !== win.Tags.length - 1) win.Title[nowlen] += '，';
                }
            }
            let nowlen = win.Title.length;
            win.Title[nowlen] = '第 ' + (win.Page + 1) + ' 页';
        }
    }
    win.title = 'x义x 的 blog - ' + win.Title[0];
    win.WriteTitle2 = function (data) {
        let AddText = function (ttext, eletag) {
            let Ttext = win.createElement(eletag);
            Ttext.textContent = ttext;
            if(ttext === '高度机密') Ttext.style = 'color: #600; font-size: 400%; font-weight: bold; margin: 0';
            if(ttext === '你已经被警告过了。') Ttext.style = 'color: #600; font-size: 250%; font-weight: bold; margin: 0';
            let TTtext = win.createElement('center');
            TTtext.appendChild(Ttext);
            data.appendChild(TTtext);
        }
        if (win.isError === 1) {
            AddText('您似乎跃迁到了银河系之外', 'h1');
        }
        else if (win.Pathname.length === 0) {
            AddText('Ξ 警告：基金会资料库属于 Ξ', 'p');
            AddText('高度机密', 'p');
            AddText('Ξ 严禁未经授权的人员进行访问 Ξ', 'p');
            AddText('Ξ 肇事者将被监控、定位并处理 Ξ', 'p');
            data.appendChild(win.createElement('br'));
            AddText('Ξ 任何未经授权之人员访问文档将立即被模因抹杀触媒处决。Ξ', 'p');
            AddText('Ξ 在未接种合适模因疫苗的情況下向下滚动页面将立刻导致心脏骤停死亡。Ξ', 'p');
            AddText('你已经被警告过了。', 'p');
            for (let i = 0; i < 50; i += 1)
                data.appendChild(win.createElement('br'));
            let picblock = win.createElement('div');
            picblock.style = 'margin: auto; text-align: center';
                let mypic = win.createElement('img');
                mypic.src = 'https://xyix.gitee.io/images/deadly_meme.png';
                mypic.alt = '致命模因';
            picblock.appendChild(mypic);
            data.appendChild(picblock);
            for (let i = 0; i < 5; i += 1)
                data.appendChild(win.createElement('br'));
        }
        else {
            if (win.Pathname[0] === 'archieve') AddText('文章一览', 'h1');
            if (win.Pathname[0] === 'tags') AddText('标签一览', 'h1');
            if (win.Pathname[0] === 'help') AddText('帮助', 'h1');
            if (win.Pathname[0] === 'posts') AddText(win.findpost(win.Postname).post_chinese_name, 'h1');
            if (win.Pathname[0] === 'archieve') {
                if (win.Type !== undefined) {
                    let Typeinfo = '分类为：';
                    if (win.Type == 'solution') Typeinfo += '题解';
                    else if (win.Type == 'algorithm') Typeinfo += '算法/知识点';
                    else if (win.Type == 'other') Typeinfo += '游记/其他';
                    else Typeinfo += '不明分类';
                    AddText(Typeinfo, 'h3');
                }
                if (win.Tags.length !== 0) {
                    let Taginfo = '具有标签：';
                    for (let i = 0; i < win.Tags.length; i = i + 1) {
                        if (win.tags_list[win.Tags[i]] !== undefined)
                            Taginfo += win.tags_list[win.Tags[i]];
                        else Taginfo += '不明标签';
                        if (i !== win.Tags.length - 1) Taginfo += '，';
                    }
                    AddText(Taginfo, 'h3');
                }
                AddText('第 ' + (win.Page + 1) + ' 页', 'h3');
            }
        }
    }
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
        for (var Tag in win.tags_list) {
            let TagsRow = win.createElement('tr');
                let TagsRow1 = win.createElement('th');
                let TagsRow1a = win.createElement('a');
                TagsRow1a.href = '/archieve/' + win.ezylanASearch(win.NextSearch(win.TrueSearch, { Tags: [Tag], Page: 0 }));
                TagsRow1a.textContent = win.tags_list[Tag];
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
    win.archieve_id_style = 'width: 4%';
    win.archieve_title_style = 'width: 43%';
    win.archieve_type_style = 'width: 12%';
    win.archieve_tags_style = 'width: 29%';
    win.archieve_last_modi_style = 'width: 12%';
    win.WritePostinfo = function (data, postinfo) {
        let PostinfoBlock = win.createElement('tr');

        //编号
        let Postinfo_id = win.createElement('td');

        let Postinfo_id_p = win.createElement('p');
        Postinfo_id_p.textContent = postinfo.postid;
        Postinfo_id.appendChild(Postinfo_id_p);

        Postinfo_id.style = win.archieve_id_style;
        PostinfoBlock.appendChild(Postinfo_id);
        //标题
        let Postinfo_title = win.createElement('td');

        let Postinfo_title_a = win.createElement('a');

        if (location.search.length !== 0)
            Postinfo_title_a.href = '/posts/' + location.search + '&postname=' + postinfo.post_name;
        else Postinfo_title_a.href = '/posts/?postname=' + postinfo.post_name;
        Postinfo_title_a.textContent = postinfo.post_chinese_name;

        Postinfo_title.appendChild(Postinfo_title_a);

        Postinfo_title.style = win.archieve_title_style;
        PostinfoBlock.appendChild(Postinfo_title);
        //类型
        let Postinfo_type = win.createElement('td');
        if (postinfo.type_name !== 'none') {
            let Postinfo_type_a = win.createElement('a');
            Postinfo_type_a.href = '/archieve/' +
                win.ezylanASearch(win.NextSearch(win.TrueSearch, { Type: postinfo.type_name, Page: 0 }));
            if (postinfo.type_name === 'solution') Postinfo_type_a.textContent = '题解';
            else if (postinfo.type_name === 'algorithm') Postinfo_type_a.textContent = '算法/知识点';
            else Postinfo_type_a.textContent = '游记/其他';
            Postinfo_type.appendChild(Postinfo_type_a);
        }
        else {
            let Postinfo_type_p = win.createElement('p');
            Postinfo_type_p.textContent = '无';
            Postinfo_type.appendChild(Postinfo_type_p);
        }
        Postinfo_type.style = win.archieve_type_style;
        PostinfoBlock.appendChild(Postinfo_type);
        //标签
        let Postinfo_tags = win.createElement('td');
        Postinfo_tags.style = win.archieve_tags_style;
        for (let i = 0; i < postinfo.tag.length; i += 1) {
            let Postinfo_tags_a = win.createElement('a');
            Postinfo_tags_a.href = '/archieve/' +
                win.ezylanASearch(win.NextSearch(win.TrueSearch, { Tags: [postinfo.tag[i]], Page: 0 }));
            Postinfo_tags_a.textContent = win.tags_list[postinfo.tag[i]];
            if(postinfo.tag[i] === 'writing') Postinfo_tags_a.style = 'color: orange';
            if(postinfo.tag[i] === 'pigeon') Postinfo_tags_a.style = 'color: grey';
            Postinfo_tags.appendChild(Postinfo_tags_a);
            if (i !== postinfo.tag.length - 1) Postinfo_tags.appendChild(win.createTextNode(','));
        }
        if (postinfo.tag.length === 0) {
            let Postinfo_tags_p = win.createElement('p');
            Postinfo_tags_p.textContent = '无';
            Postinfo_tags.appendChild(Postinfo_tags_p);
        }
        PostinfoBlock.appendChild(Postinfo_tags);
        //修改时间
        let Postinfo_last_modi = win.createElement('td');
        Postinfo_last_modi.style = win.archieve_last_modi_style;
        let Postinfo_last_modi_p = win.createElement('p');
        Postinfo_last_modi_p.textContent = postinfo.last_modi;
        Postinfo_last_modi.appendChild(Postinfo_last_modi_p);
        PostinfoBlock.appendChild(Postinfo_last_modi);

        data.appendChild(PostinfoBlock);
    }

    //判断文章是否合法
    win.isLegalPost = function (postinfo, post_count) {
        if (win.Type !== undefined) {
            if (postinfo.type_name !== win.Type) return 0;
        }
        for (let i = 0; i < win.Tags.length; i += 1) {
            if (postinfo.tag.indexOf(win.Tags[i]) === -1) return 0;
        }
        post_count.value = post_count.value + 1;
        if (post_count.value <= win.Page * win.post_per_page) return 0;
        if (post_count.value > (win.Page + 1) * win.post_per_page) return 0;
        return 1;
    }

    //绘制 archieve 列表
    win.post_count = { value: 0 };
    win.WriteArchieve = function (data) {
        let ArchieveTable = win.createElement('table');
        ArchieveTable.border = '1'; ArchieveTable.rules = 'all'; ArchieveTable.style = 'width: 100%';
        ArchieveTable.className = 'mycenter';

        let ArchieveTitle = win.createElement('tr'); ArchieveTitle.style = 'width: 100%';

        let writeTh = function (text1, text2) {
            let Titleh = win.createElement('th');
            Titleh.style = text1;
            Titleh.appendChild(win.createTextNode(text2));
            ArchieveTitle.appendChild(Titleh);
        }

        writeTh(win.archieve_id_style, '编号');
        writeTh(win.archieve_title_style, '标题');
        writeTh(win.archieve_type_style, '分类');
        writeTh(win.archieve_tags_style, '标签');
        writeTh(win.archieve_last_modi_style, '修改时间');

        ArchieveTable.appendChild(ArchieveTitle);

        for (let i = 0; i < win.archieve_list.length; i += 1)
            if (win.isLegalPost(win.archieve_list[i], win.post_count)) {
                win.WritePostinfo(ArchieveTable, win.archieve_list[i]);
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
    win.WritePageButton = function (data, pcount, pper_page) {
        let ButtonBlock = document.createElement('div');
        ButtonBlock.className = 'button-block';
        let PagePrev = win.createElement('button');
        if (win.Page !== 0) {
            PagePrev.style = 'float: left;background-color: #ffffff;cursor: pointer;';
            PagePrev.onmouseover = function () { this.style = 'float: left;background-color: #dddddd;cursor: pointer;'; }
            PagePrev.onmouseout = function () { this.style = 'float: left;background-color: #ffffff;cursor: pointer;'; }
            PagePrev.onclick = function () {
                location.replace(location.pathname + win.ezylanASearch(win.NextSearch(win.TrueSearch, { Page: win.Page - 1 })));
            }
            PagePrev.textContent = '<<上一页';
        }
        else {
            PagePrev.style = 'float: left;background-color: #ffffff;';
            PagePrev.textContent = '已经到顶了';
        }
        ButtonBlock.appendChild(PagePrev);
        let PageSucc = win.createElement('button');
        if ((win.Page + 1) * pper_page < pcount.value) {
            PageSucc.style = 'float: right;background-color: #ffffff;cursor: pointer;';
            PageSucc.onmouseover = function () { this.style = 'float: right;background-color: #dddddd;cursor: pointer;'; }
            PageSucc.onmouseout = function () { this.style = 'float: right;background-color: #ffffff;cursor: pointer;'; }
            PageSucc.onclick = function () {
                location.replace(location.pathname + win.ezylanASearch(win.NextSearch(win.TrueSearch, { Page: win.Page + 1 })));
            }
            PageSucc.textContent = '下一页>>';
        }
        else {
            PageSucc.style = 'float: right;background-color: #ffffff;';
            PageSucc.textContent = '已经到底了';
        }
        ButtonBlock.appendChild(PageSucc);
        data.appendChild(ButtonBlock);
    }

    //绘制文章内容
    win.WriteBlog = function (data, postinfo) {
        let Blog = win.createElement('iframe');
        Blog.style.opacity = 1.0;
        Blog.frameBorder = 1;
        Blog.className = 'inline-blog';
        if(postinfo.post_name === 'combinatorics') {
            Blog.src = '/images/%E7%BB%84%E5%90%88%E8%AE%A1%E6%95%B0%E5%92%8C%E7%94%9F%E6%88%90%E5%87%BD%E6%95%B0.pdf';
            Blog.scrolling = "yes";
            Blog.opacity = 1.0;
            Blog.onload = function () {
                Blog.style.height = document.body.offsetHeight * 0.8;
            }
        }
        else {
            Blog.src = '/posts/posts/' + postinfo.post_name + ".html";
            Blog.scrolling = "no";
            Blog.onload = function () {
                Blog.style.height = Blog.contentDocument.body.scrollHeight;
                setInterval(()=>Blog.style.height = Blog.contentDocument.body.scrollHeight,200);
            }
        }
        data.appendChild(Blog);
    }

    //文章下面的小标签列表
    win.WriteTagsList2 = function (data, postinfo) {
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
        for (var i = 0; i < postinfo.tag.length; i += 1) {
            var Tag = postinfo.tag[i];
            let TagsRow = win.createElement('tr');
            let TagsRow1 = win.createElement('th');
            let TagsRow1a = win.createElement('a');
            TagsRow1a.href = '/archieve/' + win.ezylanASearch(win.NextSearch(win.TrueSearch, { Tags: [Tag], Page: 0 }));
            let TagsRow1strong = win.createElement('strong');
            TagsRow1strong.textContent = win.tags_list[Tag];
            TagsRow1a.appendChild(TagsRow1strong);
            if(Tag === 'writing') TagsRow1a.style = 'color: orange';
            if(Tag === 'pigeon') TagsRow1a.style = 'color: grey';
            TagsRow1.appendChild(TagsRow1a);
            TagsRow.appendChild(TagsRow1);
            let TagsRow2 = win.createElement('th');
            let TagsRow2p = win.createElement('p');
            TagsRow2p.textContent = Tag;
            TagsRow2.appendChild(TagsRow2p);
            TagsRow.appendChild(TagsRow2);
            TagsTable.appendChild(TagsRow);
        }
        if (postinfo.tag.length === 0) {
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
