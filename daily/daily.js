'use strict';
{
    const DAILY_MESSAGES=[
        'IMOliver&喝喝粥 分杯NOI2021',
        '今天也是x义x被卡常的一天',
        '网页开发怎么这么难啊啊啊啊啊',
        '不要干这种事情，群众的阿鲁巴是雪亮的',
        '“为什么说【】的学生被严重压迫？”“你看，他们已经开始讲起政治笑话了！”',
        '数数是好的，并且没有任何坏处',
    ];
    function Write_Daily_Message(data){
        let daily_message=document.createElement('p');
        daily_message.textContent=DAILY_MESSAGES[Math.floor(Math.random()*DAILY_MESSAGES.length)];
        data.appendChild(daily_message);
    }
    Write_Daily_Message(document.querySelector('.content-block'));
}