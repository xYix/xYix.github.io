(function (win) {
    'use strict';
    if (win.ThemeColor === undefined || win.ThemeColor === 'Z') {
        if (win.funval === 'sayonara')
            win.querySelector('body').style='--main-color: #1a5a40; --dark-main-color: #36c48e';
        else win.querySelector('body').style='--main-color: #36c48e; --dark-main-color: #1a5a40';
    }
    if (win.ThemeColor === 'Y') {
        if (win.funval === 'sayonara')
            win.querySelector('body').style='--main-color: #753432; --dark-main-color: #ea6965';
        else win.querySelector('body').style='--main-color: #ea6965; --dark-main-color: #753432';
    }
    if (win.ThemeColor === 'X') {
        if (win.funval === 'sayonara')
            win.querySelector('body').style='--main-color: #1e5f77; --dark-main-color: #3dbeee';
        else win.querySelector('body').style='--main-color: #3dbeee; --dark-main-color: #1e5f77';
    }
    if (win.ThemeColor === 'N') {
        if (win.funval === 'sayonara')
            win.querySelector('body').style='--main-color: #7f415b; --dark-main-color: #ff83b7';
        else win.querySelector('body').style='--main-color: #ff83b7; --dark-main-color: #7f415b';
    }
})(document);