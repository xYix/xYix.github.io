(function (win) {
    'use strict';
    let winbody = win.querySelector('body');
    if (win.ThemeColor === undefined || win.ThemeColor === 'Z') {
        if (win.Funval === 'sayonara')
            winbody.style='--main-color: #1a5a40; --dark-main-color: #36c48e;';
        else winbody.style='--main-color: #36c48e; --dark-main-color: #1a5a40;';
    }
    if (win.ThemeColor === 'Y') {
        if (win.Funval === 'sayonara')
            winbody.style='--main-color: #753432; --dark-main-color: #ea6965;';
        else winbody.style='--main-color: #ea6965; --dark-main-color: #753432;';
    }
    if (win.ThemeColor === 'X') {
        if (win.Funval === 'sayonara')
            winbody.style='--main-color: #1e5f77; --dark-main-color: #3dbeee;';
        else winbody.style='--main-color: #3dbeee; --dark-main-color: #1e5f77;';
    }
    if (win.ThemeColor === 'N') {
        if (win.Funval === 'sayonara')
            winbody.style='--main-color: #7f415b; --dark-main-color: #ff83b7;';
        else winbody.style='--main-color: #ff83b7; --dark-main-color: #7f415b;';
    }
    if (win.Funval === 'sayonara')
        winbody.style.setProperty("--opa", 0.3),
        winbody.style.setProperty("--text-color", '#bbbbbb'),
        winbody.style.setProperty("--outside-display", 'none'),
        winbody.style.setProperty("--inside-display", 'default');
    else 
        winbody.style.setProperty("--opa", 0.7),
        winbody.style.setProperty("--text-color", '#555555'),
        winbody.style.setProperty("--outside-display", 'default'),
        winbody.style.setProperty("--inside-display", 'none');
})(document);