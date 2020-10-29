(function(win){
    'use strict';
    const DAILY_MESSAGES=[
        //致敬经典
        'IMOliver&喝喝粥 分杯NOI2021',
        '拒绝虚假的膜拜，也拒绝真诚的膜拜（恼）',
        '你强归你强，Siyuan 比你强',
        '你不能通过按住 Enter 来快速点击一个按钮。',
        'Siyuan 是我们的红太阳，没有她我们会死！',
        'hehezhou 的小粉丝，姓叉，就叫 x义x 吧',
        'I could not have endured darkness even if I had never seen the sun.',
        //吐槽
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
        '2020/10/3：x义x 又在模拟赛上只会 T1',
        '2020/10/4：x义x 又在模拟赛上一道题都不会',
        '2020/10/5：x义x 被 T1 虐杀，没写出 T2，被 T3 虐杀',
        '2020/10/7：x义x 又不会单调队列了',
        '《草，为什么倒计时结束又是一个倒计时》',
        '即使被生活雷普，也要随时准备 一 转 攻 势',
        'Q：x义x 最常去的地方是？ A：满分提交 - 最慢。',
        '你当然可以直接 F12 然后看生成一言的 js。但是不断按 F5 看看有什么新的刷出来也别有一番趣味，不是吗？',
        //奇妙bug/翻译
        'x锟斤拷x 锟斤拷锟斤拷锟斤拷 BLOG',
        '快速计算方法 问题方案 多项目类型,Rakuraro Nikki',
        '胜井胜井发电功能 算术/知识 生成函数,数论',
        'Oura-Mugi Katsumi Hayashi数值指导 算术/知识 生成功能',
        'Uenmy 22:00 Boundary我今天不想睡了',
        //中二病发
        '世界的神秘在我眼前展开——可我却要止步于此。',
        '世界仿佛一台离心机。等到这一切的混乱和眩晕结束，你留下的思想结晶会是什么？',
        '曾经以为我们有相似的地方，后来才发现是平行线的同位角啊。',
        '有时候 x义x 会和别人聊天聊一半突然消失。他有可能只是不知道怎么回复了。',
        '很多人不知道随口乱说“加油”“努力点”是多严重的恶行。',
        '这些人没有同情心的吗？那我可真同情他们。',
        '离谱的比喻和根本不适用的“人生经验”什么的真的很讨厌啊。',
        '避群星而行之旅……那样的故事，明明听起来很好啊。',
        '你的勇敢无人知晓，你的坚持引人发笑。',
        'x义x 的人生目标：1. 机械化身体；2. 符号化思想和情感；3. 去月球。有趣的是，把它们倒过来就是 x义x 最讨厌的东西。',
        '为了应试牺牲掉严谨性的数学能够称为“数学”吗？',
        //膜拜
        '愿 hehezhou 指引我们找到救赎',
        '愿 瑇 指引我们找到启示',
        '我最喜欢的古人是苏轼，我最喜欢他《江城子·密州出猎》中的“会挽雕弓如满月，西北望，射天狼”，我能从中感受到他那种豪迈的气概，我也想迫切地感受这种豪迈的气概',
        'あなたはステラ　僕は瑇！',
        '愿 孔姥爷 不要再毒瘤',
        //歌词
            //Andromeda Andromeda
            'Andromeda Andromeda　答えておくれ　あなたとわたし　永久に逢えないの',
            'Andromeda Andromeda　気づいておくれ　彼方の宇宙であなたに恋してる',
            'Andromeda Andromeda　忘れておくれ　あなたと宇宙は本当によく似てる',
            //飞行少女
            'Baby Baby　それでも飛んだ　あなたと夜をこえて　この手を　離したくないだけ',
            'You and me　22時の境界　安全圏からも抜け出して　今日はもう　眠りたくないだけ',
            //Rocket Cider
            '週末、ぼくらは月の裏側で　「なんにもないね」　なんて、くだらなくて笑いあうだろう',
            '終末、ぼくらは月の裏側で　傷つけあうのなんて馬鹿らしくて　笑いあうだろう',
            '拾った銀貨使って　ジュース買って　分けあって飲もう　「サイダーがいいな」',
            //Strato Stella
            '「もしも、わたしが明日死んだら　全ての光が　なくなってしまいますように」',
            '街は　街は　淡い黄昏　空は　空は　朱色に染まる',
            'もしも彼女が　世界を愛していたら　そんなことを、そんなことを、考えてたよ',
            //Alien Alien
            'Alien　わたしAlien　あなたの心を惑わせる',
            'Searchlight　避ける浮遊機　「まだあなたは全てを知りたい？」',
            'Alien　あなたのAlien　触れあえば傷は二度と消えない',
            'Alien　ふたりはAlien　高鳴る気持ちが抑えられない！　あなたは未確認生命体　異世界の果てまであなたが　好き',
            //行星环
            '心があなたで鳴っている　それだけが確かだ　それだけでいいよ。',
            'そこに大体、愛が在るだけ',
            //太阳系 disco
            '星が舞っちゃって　胸が鳴っちゃって　気付けば彼方―――',
            '何もなくたって　何となくだって　星は巡って―――',
            'ほら水金だって地火木土天海も　ふたりの銀河で綺羅めいた、星ッ！',
            //彗星蜜月
            'キラキラ光る流星群　わたし想うは我爱你　星のまにまに逃避行　嗚呼、そんなstoryも　悪くないのさ',
            'neonの街からpreview　月世界までwon\'t be long　あの星の名も忘れたの　満つ月の飛行',
            '動かない信号の赤色　月世界まで我爱你　Moscowの海が旅の終わり　そこでお别れさ',
            '彗星honeymoon　あなたとrendezvous　恋しているのさ　ふたり',
            '愛してmon amour　いっそ、ふたりきり　どっか遠くへいこうか',
            '愛してmon amour　由縁なんてなくても　いいよ遠くへいこうか',
            '彗星honeymoon　果てまでrendezvous　そうさ今だけはふたり　ねえきいてmon amour　片道切符でも……　いいですよ？',
            '曖昧なairline　言葉はいらない　やっと出逢えた　あなたと',
            '夜が明けたら　何処へいこうか？　永久に出逢えぬ　あなたと',
            '星巡り　繰り返し　目指すは宇宙の　終着点さ',
            '星巡り　繰り返し　目指すは夢の　出発点さ',
            //晨星银河号
            '見上げた　(あなたの)　瞳が　(宇宙が)　キラキラって光る',
            'わたしの　(あなたの)　鼓動が　(鼓動が)　ドキドキって疾はやる',
            'ふたりの　(銀河で)　手と手が　(星と星が)　交わって恋は Galactica',
            '最後の　(夜明けは)　手と手が　(星と星が)　ほどけて君は Galactica',
            'いつだって愛は Romantica',
            //四有
            '人の子も どの子も 生まれが総て 宝籤外せば 孤独と無力',
            'THIS IS LIFE (WOW!)',
            '最低の犠牲者に愛を——',
            'どうしてこれをつくったの',
            'どうしてここまでほうっておいたの',
            'どうしてこのこをうんだの',
            'どうしてそこにうまれてしまったの',
            //string theocracy
            'Maybe we\'re all cold machines / stuffed in the human skins / with human sins / sewed up by the gods of cities',
            //Wildfire
            'my lungs are failing from inhaling / all the charcoal from this circle / of the hate and the lies',
            'Deny, Ignite, and Close Your Eyes.',
            'But I\'m a pyromaniac / and your veins are full of gas you\'re / burning higher, higher / I\'m storming this wildfire',
            //Echo
            'What the hell\'s going on / can someone tell me please / why am I switching faster than the channels on TV',
            'I am black then I\'m white / No! something isn\'t right / my enemy\'s invisible I don\'t know how to fight',
            'The trembling fear / is more than I can take / when I\'m up against / the echo in the mirror',
            'I\'m gonna burn my house down into an ugly black',
            'I\'m gonna run away now and never look back',
            //Let the maggots sing
            'Is this where I belong? / The furthest I could have gone?',
        //游戏台词
        'Fate Chosen',
        'Reroll Your Destiny',
        'Blood Laser Barrage',
        'I feel all', 'I know all', 'I am all',
        '不！熊！！！',
        '高塔沉睡了，那我也该睡了……',
        //迫害CF/XJ
        'Codeforces infrastructure is temporarily unavailable, we are working on fixing it.',
        'Rating changes for the last round are temporarily rolled back. They will be back soon.',
        '对不起，由于初试爆零，您无法查看题解，请下次努力',
        'ABNORMAL',
        'ACCESS DENIED',
        'Believe there is a great power silently working all things for good',
        '为什么不去看看 ×√ 日报呢？',
        '今天你 AC 了吗',
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