// ==UserScript==
// @name           GC ad blocker
// @namespace      2Abendsegler
// @version        0.14
// @description    Advertising blocker on www.geocaching.com
// @match          https://www.geocaching.com/*
// @icon           https://raw.githubusercontent.com/2Abendsegler/GC_ad_blocker/master/images/gc_ad_blocker_logo.png
// @updateURL      https://github.com/2Abendsegler/GC_ad_blocker/raw/master/gc_ad_blocker.user.js
// @copyright      2Abendsegler
// @author         2Abendsegler
// @license        GNU General Public License v2.0
// ==/UserScript==

var start = function() {
    try {
        if (document.querySelector('head') && !document.querySelector('#GCAB')) {
            var css = '';
            // about/glossary, adopt, email/default, find/default, my/collection, my/geocaches, my/inventory, my/logs, my/myfriends, my/owned,
            // my/recentlyviewedcaches, my/souvenirs, my/statbar, my/statistics, my/subscription, my/travelbugs, my/userroutes, my/watchlist,
            // notify/default, notify/edit, p/, pocket/default, seek/, seek/nearest, track/details, track/geocoin, track/search, track/travelbug
            css += '#ctl00_uxBanManWidget {display: none !important; height: 0 !important;}';
            // account/dashboard
            css += '.advertisement {display: none !important;}';
            // account/drafts
            css += '.sidebar-ad {display: none !important;}';
            // geocache/ (Cache Listing), my/default (Old Dashboard)
            css += '#ctl00_ContentBody_uxBanManWidget {display: none !important; height: 0 !important;}';
            // live/log (Log View Cache and Trackable)
            css += '#log-view-page-ad {display: none !important; height: 0 !important;}';
            // live/geocache (Log Form Geocache)
            css += '#geocache-log-page-ad {display: none !important; height: 0 !important;}';
            // live/trackable (Log Form Trackable)
            css += '#trackable-log-page-ad {display: none !important; height: 0 !important;}';
            // plan/lists (and all detail pages)
            css += '#listhub-page-ad {display: none !important;}';
            css += '#list-details-page-ad {display: none !important;}';
            // play/leaderboard
            css += '#leaderboard-ad {display: none !important;}';

            var style = document.createElement('style');
            style.innerHTML = css;
            style.type = 'text/css';
            style.id = 'GCAB';
            document.getElementsByTagName('head')[0].appendChild(style);
        }
    } catch (e) {gc_error("error", e);}
}

function gc_error(modul, err) {
    var txt = "ERROR - " + modul + " - " + document.location.href + ": " + err.message + "\nStacktrace:\n" + err.stack + (err.stacktrace ? ("\n" + err.stacktrace) : "");
    if (typeof(console) != "undefined") console.error(txt);
}

start(this);