// ==UserScript==
// @name         Arxiv Utils
// @match        https://arxiv.org/pdf/*
// @grant        GM_openInTab
// @grant        GM_download
// @grant        GM_setClipboard
// @version      1.0
// @description  Add buttons to (1) open a sharable abstract page and (2) download with the file name being the title of the paper and (3) open the ar5iv page
// @author       Syzygianinfern0
// ==/UserScript==

(function () {
    'use strict';

    // Function to extract the title from the abstract page
    function getTitle() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", window.location.href.replace('/pdf/', '/abs/'), false);
        xhr.send();
        var parser = new DOMParser();
        var doc = parser.parseFromString(xhr.responseText, "text/html");
        var title = doc.querySelector('h1.title.mathjax').textContent.trim();
        return title.replace(/\s+/g, ' ');
    }

    // Create the buttons element
    var buttons = document.createElement('div');
    buttons.style.position = 'fixed';
    buttons.style.top = '10px';
    buttons.style.left = '200px';
    buttons.style.zIndex = '9999';
    buttons.style.display = 'flex';
    buttons.style.flexDirection = 'row';
    buttons.style.gap = '10px';
    document.body.appendChild(buttons);

    // Create the "Open Abstract" button element
    var openAbstractButton = document.createElement('button');
    openAbstractButton.textContent = 'Open Abstract';
    openAbstractButton.style.padding = '10px';
    openAbstractButton.style.border = 'none';
    openAbstractButton.style.borderRadius = '5px';
    openAbstractButton.style.background = '#008CBA';
    openAbstractButton.style.color = 'white';
    openAbstractButton.style.cursor = 'pointer';
    buttons.appendChild(openAbstractButton);

    // Create the "Save PDF" button element
    var savePdfButton = document.createElement('button');
    savePdfButton.textContent = 'Save PDF';
    savePdfButton.style.padding = '10px';
    savePdfButton.style.border = 'none';
    savePdfButton.style.borderRadius = '5px';
    savePdfButton.style.background = '#008CBA';
    savePdfButton.style.color = 'white';
    savePdfButton.style.cursor = 'pointer';
    buttons.appendChild(savePdfButton);

    // Add click event listener to the "Open Abstract" button
    openAbstractButton.addEventListener('click', function () {
        var url = window.location.href.replace('/pdf/', '/abs/');
        GM_openInTab(url, { active: true, insert: true });
    });

    // Add click event listener to the "Save PDF" button
    savePdfButton.addEventListener('click', function () {
        var title = getTitle();
        title = title.replace(/^title:\s*/i, '').replace(/\s+/g, ' ')
        GM_setClipboard(title);
        var filename = title + '.pdf';
        GM_download(window.location.href, filename);
    });

    // Create the "Open Ar5iv" button element
    var openAr5ivButton = document.createElement('button');
    openAr5ivButton.textContent = 'Open Ar5iv';
    openAr5ivButton.style.padding = '10px';
    openAr5ivButton.style.border = 'none';
    openAr5ivButton.style.borderRadius = '5px';
    openAr5ivButton.style.background = '#008CBA';
    openAr5ivButton.style.color = 'white';
    openAr5ivButton.style.cursor = 'pointer';
    buttons.appendChild(openAr5ivButton);

    // Add click event listener to the "Open Ar5iv" button
    openAr5ivButton.addEventListener('click', function () {
        var ar5ivUrl = window.location.href.replace('arxiv.org', 'ar5iv.org');
        GM_openInTab(ar5ivUrl, { active: true, insert: true });
    });

})();