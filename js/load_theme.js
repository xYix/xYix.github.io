(function (win) {
    'use strict';
    if (win.ThemeColor === undefined || win.ThemeColor === 'Z') {
        win.querySelector('body').style='--main-color: #36c48e; --dark-main-color: #1a5a40';
    }
    if (win.ThemeColor === 'Y') {
        win.querySelector('body').style='--main-color: #ea6965; --dark-main-color: #753432';
    }
    if (win.ThemeColor === 'X') {
        win.querySelector('body').style='--main-color: #3dbeee; --dark-main-color: #1e5f77';
    }
    if (win.ThemeColor === 'N') {
        win.querySelector('body').style='--main-color: #ff83b7; --dark-main-color: #7f415b';
    }
})(document);