// ==UserScript==
// @name           GC ad blocker
// @namespace      2Abendsegler
// @version        0.10
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
    $('#ctl00_uxBanManWidget').css("visibility", "hidden");
    $('#ctl00_uxBanManWidget').css("height", 0);

    $('#div-message-center-ad').remove();
    $('#ctl00_ContentBody_divContentSide').children().remove();

    // Cache Listing
    $('#ctl00_ContentBody_uxBanManWidget').css("visibility", "hidden");
    $('#ctl00_ContentBody_uxBanManWidget').css("height", 0);

    // account/dashboard, play/souvenircampaign/hiddencreatures
    $('#Content .advertisement').remove();

    // play/friendleague
    $('#Content aside #leaderboard-ad').remove();

    // account/lists, account/drafts
    $('#Content aside.sidebar-ad #lists-hub-ad').remove();
    $('#Content aside.sidebar-ad #draft-hub-ad').remove();
    $('#Content aside.sidebar-ad .contact').remove();

    // Log View
    $('#log-view-page-ad').remove();

    // plan/lists
    function processLists(waitCount) {
        if ($('aside.sidebar')[0]) {
            var style = document.createElement('style');
            style.innerHTML = 'aside.sidebar {width: 160px; height: 600px;} .structure {margin-right: 0px; margin-left: 0px;}';
            style.type = 'text/css';
            $('head')[0].appendChild(style);
            $('aside.sidebar').children().remove();
        } else {waitCount++; if (waitCount <= 100) setTimeout(function(){processLists(waitCount);}, 100);}
    }
    // Build mutation observer for lists.
    function buildObserverLists() {
        var observerLists = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                processLists(0);
            });
        });
        var config = { attributes: true, childList: true, characterData: true };
        observerLists.observe($('#app-root')[0], config);
    }
    // Check if mutation observer can be build.
    function checkForBuildObserverLists(waitCount) {
        if ($('#app-root')[0]) {
            buildObserverLists();
        } else {waitCount++; if (waitCount <= 200) setTimeout(function(){checkForBuildObserverLists(waitCount);}, 50);}
    }
    if (document.location.href.match(/\/plan\/lists/)) {
        processLists(0);
        checkForBuildObserverLists(0);
    }
} catch (e) {gc_error("error", e);}

function gc_error(modul, err) {
    var txt = "ERROR - " + modul + " - " + document.location.href + ": " + err.message + "\nStacktrace:\n" + err.stack + (err.stacktrace ? ("\n" + err.stacktrace) : "");
    if (typeof(console) != "undefined") console.error(txt);
}
