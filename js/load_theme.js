(function (win) {
    'use strict';
    if (win.ThemeColor === undefined || win.ThemeColor === 'Z') {
        if (win.Funval === 'sayonara')
            win.querySelector('body').style='--main-color: #1a5a40; --dark-main-color: #36c48e; --text-color: #aaaaaa; --opa: 0.3';
        else win.querySelector('body').style='--main-color: #36c48e; --dark-main-color: #1a5a40; --text-color: #555555; --opa: 0.7';
    }
    if (win.ThemeColor === 'Y') {
        if (win.Funval === 'sayonara')
            win.querySelector('body').style='--main-color: #753432; --dark-main-color: #ea6965; --text-color: #aaaaaa; --opa: 0.3';
        else win.querySelector('body').style='--main-color: #ea6965; --dark-main-color: #753432; --text-color: #555555; --opa: 0.7';
    }
    if (win.ThemeColor === 'X') {
        if (win.Funval === 'sayonara')
            win.querySelector('body').style='--main-color: #1e5f77; --dark-main-color: #3dbeee; --text-color: #aaaaaa; --opa: 0.3';
        else win.querySelector('body').style='--main-color: #3dbeee; --dark-main-color: #1e5f77; --text-color: #555555; --opa: 0.7';
    }
    if (win.ThemeColor === 'N') {
        if (win.Funval === 'sayonara')
            win.querySelector('body').style='--main-color: #7f415b; --dark-main-color: #ff83b7; --text-color: #aaaaaa; --opa: 0.3';
        else win.querySelector('body').style='--main-color: #ff83b7; --dark-main-color: #7f415b; --text-color: #555555; --opa: 0.7';
    }
    console.log(win.querySelector('body').style['--main-color']);
})(document);