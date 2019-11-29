// ==UserScript==
// @name           GC ad blocker
// @namespace      2Abendsegler
// @version        0.4
// @description    Advertising blocker on www.geocaching.com
// @include        http*://www.geocaching.com/*
// @include        http*://labs.geocaching.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @icon           https://raw.githubusercontent.com/2Abendsegler/GC_ad_blocker/master/images/gc_ad_blocker_logo.png
// @updateURL      https://github.com/2Abendsegler/GC_ad_blocker/raw/master/gc_ad_blocker.user.js
// @copyright      2Abendsegler
// @author         2Abendsegler
// @license        GNU General Public License v2.0
// ==/UserScript==

try {
    $('#ctl00_uxBanManWidget').children().remove();
    $('#div-message-center-ad').remove();
    $('#ctl00_ContentBody_divContentSide').children().remove();
    $('#ctl00_ContentBody_uxBanManWidget').children().remove();

    // account/dashboard, play/souvenircampaign/hiddencreatures
    $('#Content aside .advertisement').remove();

    // play/friendleague
    $('#Content aside #leaderboard-ad').remove();

    // account/lists, account/drafts
    $('#Content aside.sidebar-ad #lists-hub-ad').remove();
    $('#Content aside.sidebar-ad #draft-hub-ad').remove();
    $('#Content aside.sidebar-ad .contact').remove();

    // plan/lists
    function lists(waitCount) {
        if ($('aside.sidebar')[0]) {
            var style = document.createElement('style');
            style.innerHTML = 'aside.sidebar {width: 160px; height: 600px;}';
            style.type = 'text/css';
            $('head')[0].appendChild(style);
            $('aside.sidebar').children().remove();
        } else {waitCount++; if (waitCount <= 100) setTimeout(function(){lists(waitCount);}, 100);}
    }
    function buildObserverBody() {
        var observerBody = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                lists(0);
            });
        });
        var target = document.querySelector('body');
        var config = { attributes: true, childList: true, characterData: true };
        observerBody.observe(target, config);
    }
    function checkForBuildObserverBody(waitCount) {
        if ($('body')[0]) {
            if ($('.gcad_buildObserverBody')[0]) return;
            $('body').addClass('gcad_buildObserverBody');
            buildObserverBody();
        } else {waitCount++; if (waitCount <= 200) setTimeout(function(){checkForBuildObserverBody(waitCount);}, 50);}
    }
    function buildObserverButtons() {
        var observerButtons = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                lists(0);
                checkForBuildObserverBody(0);
            });
        });
        var target = document.querySelector('.desktop-nav-display');
        var config = { attributes: true, childList: true, characterData: true };
        observerButtons.observe(target, config);
    }
    function checkForBuildObserverButtons(waitCount) {
        if ($('.gc-button-group')[0]) buildObserverButtons();
        else {waitCount++; if (waitCount <= 200) setTimeout(function(){checkForBuildObserverButtons(waitCount);}, 50);}
    }
    if (document.location.href.match(/\/plan\/lists/)) {
        lists(0);
        checkForBuildObserverBody(0);
        checkForBuildObserverButtons(0);
    }

} catch (e) {gc_error("error", e);}

function gc_error(modul, err) {
    var txt = "ERROR - " + modul + " - " + document.location.href + ": " + err.message + "\nStacktrace:\n" + err.stack + (err.stacktrace ? ("\n" + err.stacktrace) : "");
    if (typeof(console) != "undefined") console.error(txt);
}
