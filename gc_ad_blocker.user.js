// ==UserScript==
// @name           GC ad blocker
// @namespace      2Abendsegler
// @version        0.1
// @description    Advertising blocker on www.geocaching.com
// @include        http*://www.geocaching.com/*
// @include        http*://labs.geocaching.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @icon           https://raw.githubusercontent.com/2Abendsegler/GC_ad_blocker/master/images/gc_ad_blocker_logo.png
// @updateURL      https://github.com/2Abendsegler/GC_ad_blocker/raw/master/gc_ad_blocker.user.js
// @copyright      2Abendsegler
// @author         2Abendsegler
// @license        GNU General Public License v3.0
// ==/UserScript==

try {
    $('#ctl00_uxBanManWidget').children().remove();
    $('#div-message-center-ad').remove();
    $('#ctl00_ContentBody_divContentSide').children().remove();
    $('#ctl00_ContentBody_uxBanManWidget').children().remove();
    $('#Content aside:not(#DashboardSidebar .advertisment) not(#leaderboard-ad)').children().remove();
    $('#Content aside#DashboardSidebar .advertisment').children().remove();
    $('#Content aside #leaderboard-ad').remove();
} catch (e) {gc_error("error", e);}

function gc_error(modul, err) {
    var txt = "ERROR - " + modul + " - " + document.location.href + ": " + err.message + "\nStacktrace:\n" + err.stack + (err.stacktrace ? ("\n" + err.stacktrace) : "");
    if (typeof(console) != "undefined") console.error(txt);
}
