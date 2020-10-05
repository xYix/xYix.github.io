(function(win){
    'use strict';
    const DAILY_MESSAGES=[
        'IMOliver&喝喝粥 分杯NOI2021',
        '今天也是x义x被卡常的一天',
        '网页开发怎么这么难啊啊啊啊啊',
        '群众的阿鲁巴是雪亮的',
        '数数是好的，并且没有任何坏处',
        'x义x想不出更多一言了',
        '如果你看到这条一言时文章一览里已经有了一篇标题为“AFO”的文章，请记住x义x……',
        '瑇是毛夫',
        'x义x是毛岳父',
        '据说x义x的常数比别人大一个 omega',
        '网义云音乐里的那些歌真的很好听啊！',
        'x锟斤拷x 锟斤拷锟斤拷锟斤拷 BLOG',
        '你强归你强，Siyuan 比你强',
        '你不能通过按住Enter来快速点击一个按钮。',
        'Siyuan 是我们的红太阳，没有她我们会死！',
        '世界的神秘在我眼前展开——可我却要止步于此。',
        '世界仿佛一台离心机。等到这一切的混乱和眩晕结束，你留下的思想结晶会是什么？',
        '曾经以为我们有相似的地方，后来才发现是平行线的同位角啊。',
        'アンドロメダアンドロメダ　答えておくれ　あなたとわたし　永久に逢えないの',
        'アンドロメダアンドロメダ　気づいておくれ　彼方の宇宙であなたに恋してる',
        'アンドロメダアンドロメダ　忘れておくれ　あなたと宇宙は本当によく似てる',
        'ベイビーベイビー　それでも飛んだ　あなたと夜をこえて　この手を　離したくないだけ',
        'ユーエンミー　22時の境界　安全圏からも抜け出して　今日はもう　眠りたくないだけ',
        'Uenmy 22:00 Boundary我今天不想睡了',
        '週末、ぼくらは月の裏側で　「なんにもないね」　なんて、くだらなくて笑いあうだろう',
        '終末、ぼくらは月の裏側で　傷つけあうのなんて馬鹿らしくて　笑いあうだろう',
        '拾った銀貨使って　ジュース買って　分けあって飲もう　「サイダーがいいな」',
        'エイリアン　わたしエイリアン　あなたの心を惑わせる',
        'サーチライト　避ける浮遊機　「まだあなたは全てを知りたい？」',
        'エイリアン　あなたのエイリアン　触れあえば傷は二度と消えない',
        'エイリアン　ふたりはエイリアン　高鳴る気持ちが抑えられない！　あなたは未確認生命体　異世界の果てまであなたが　好き',
        '2020/10/3：x义x 又在模拟赛上只会 T1',
        '2020/10/4：x义x 又在模拟赛上一道题都不会',
        '2020/10/5：x义x 被 T1 虐杀，没写出 T2，被 T3 虐杀',
        'Oura-Mugi Katsumi Hayashi数值指导　算术/知识　生成功能',
        '超真实数学　算术/知识　博览会理论',
    ];
    win.Write_Daily_Message = function (data){
        let message_box=document.createElement('center');
        let message_title=document.createElement('h3');
        message_title.textContent="一言";
        let daily_message=document.createElement('p');
        daily_message.textContent=DAILY_MESSAGES[Math.floor(Math.random()*DAILY_MESSAGES.length)];
        message_box.appendChild(message_title);
        message_box.appendChild(daily_message);
        data.appendChild(message_box);
    }
})(document);