'use strict';
{
    const DAILY_MESSAGES=[
        'IMOliver&喝喝粥 分杯NOI2021',
        '今天也是x义x被卡常的一天',
        '网页开发怎么这么难啊啊啊啊啊',
        '群众的阿鲁巴是雪亮的',
        '“为什么说【】的学生被严重压迫？”“你看，他们已经开始讲起政治笑话了！”',
        '数数是好的，并且没有任何坏处',
        'x义x想不出更多一言了',
        '如果你看到这条一言时文章一览里已经有了一篇标题为“AFO”的文章，请记住x义x……',
        '瑇是毛夫',
        'x义x是毛岳父',
        '据说x义x的常数比别人大一个 omega',
        '所以我终究是有罪的吗？',
        '所以我终究是善良的吗？',
        '网义云音乐里的那些歌真的很好听啊！',
        'x锟斤拷x 锟斤拷锟斤拷锟斤拷 BLOG',
        '你强归你强，Siyuan 比你强',
        '你不能通过按住Enter来快速点击一个按钮。',
        'Siyuan 是我们的红太阳，没有她我们会死！',
        '……就算是单程票，也是可以的哦。',
        '世界的神秘在我眼前展开——可我却要止步于此。',
        '世界仿佛一台离心机。等到这一切的混乱和眩晕结束，你留下的思想结晶会是什么？',
        '曾经以为我们有相似的地方，后来才发现是平行线的同位角啊。',
        'アンドロメダアンドロメダ　答えておくれ　あなたとわたし　永久に逢えないの',
        'アンドロメダアンドロメダ　気づいておくれ　彼方の宇宙であなたに恋してる',
        'アンドロメダアンドロメダ　忘れておくれ　あなたと宇宙は本当によく似てる',
        'ベイビーベイビー　それでも飛んだ　あなたと夜をこえて　この手を　離したくないだけ',
        'ユーエンミー　22時の境界　安全圏からも抜け出して　今日はもう　眠りたくないだけ',
    ];
    function Write_Daily_Message(data){
        let message_box=document.createElement('center');
        let message_title=document.createElement('h3');
        message_title.textContent="一言";
        let daily_message=document.createElement('p');
        daily_message.textContent=DAILY_MESSAGES[Math.floor(Math.random()*DAILY_MESSAGES.length)];
        message_box.appendChild(message_title);
        message_box.appendChild(daily_message);
        data.appendChild(message_box);
    }
    Write_Daily_Message(document.querySelector('.content-block'));
}