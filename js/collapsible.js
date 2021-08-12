// 实验作，里面套公式会比较痛苦
setopa = function(data, i) {
    data.style.opacity = 0.05 * i;
};
myclick = function() {
    if (this.my_brother.style.display === 'none') {
        this.my_brother.opacity = 0.0;
        this.my_brother.style = 'display: block';
        this.textContent = this.showtext;
        for (let i = 0; i < 20; i++)
            setTimeout(() => { setopa(this.my_brother, i); }, i * 10);
    }
    else this.my_brother.style = 'display: none',
        this.textContent = this.hidetext;
};
loadCollapsible = function() {
    let lis = document.querySelectorAll('.collapsible');
    for (var i = 0; i < lis.length; i++) {
        colla = lis[i];
        console.log(colla.childNodes);
        let coshow = colla.childNodes[1], 
            cohide = colla.childNodes[3];
        coshow.style = 'color: #ea6965; cursor: pointer;';
        cohide.style = 'display: none';
        coshow.onmouseover = function () { this.style = 'text-decoration: underline; color: #753432; cursor: pointer;'; }
        coshow.onmouseout = function () { this.style = 'text-decoration: none; color: #ea6965; cursor: pointer;'; }
        coshow.hidetext = coshow.textContent;
        coshow.showtext = coshow.id;
        coshow.my_brother = cohide;
        coshow.onclick = myclick;
    }
};