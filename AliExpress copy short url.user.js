// ==UserScript==
// @name         AliExpress copy short url button
// @namespace    https://openuserjs.org/users/moped
// @license      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// @version      2.0.0
// @description  Adds a copy short url button to AliExpress item page. Copies a nice link instead of a long one.
// @author       moped
// @copyright    Apr 29, 2019, moped
// @include      *://www.aliexpress.com/item/*
// @run-at       document-end
// @icon         https://ae01.alicdn.com/images/eng/wholesale/icon/aliexpress.ico
// @grant        GM_addStyle
// @grant        GM_setClipboard
// ==/UserScript==

'use strict';

// icon: https://visualpharm.com/free-icons/link-595b40b85ba036ed117dd80a
var copyButton = '<a rel="nofollow" href="javascript: void(0);" ' +
				'id="copy-url" aria-label="Copy short url to clipboard" ' +
				'title="Copy short url to clipboard">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="22px" width="22px"><path d="M24.6,29.6c0.9,2.5,0.3,5.3-1.6,7.3l-6,6c-1.3,1.3-3.1,2-4.9,2c-1.9,0-3.6-0.7-4.9-2c-2.7-2.7-2.7-7.2,0-9.9l6-6 c1.3-1.3,3.1-2,4.9-2c0.8,0,1.6,0.1,2.3,0.4l1.5-1.5C20.7,23.3,19.3,23,18,23c-2.3,0-4.6,0.9-6.4,2.6l-6,6c-3.5,3.5-3.5,9.2,0,12.7 C7.4,46.1,9.7,47,12,47s4.6-0.9,6.4-2.6l6-6c2.8-2.8,3.3-6.9,1.7-10.2L24.6,29.6z M44.4,5.6C42.6,3.9,40.3,3,38,3s-4.6,0.9-6.4,2.6 l-6,6c-2.8,2.8-3.3,6.9-1.7,10.2l1.5-1.5C24.5,17.8,25.1,15,27,13l6-6c1.3-1.3,3.1-2,4.9-2c1.9,0,3.6,0.7,4.9,2 c2.7,2.7,2.7,7.2,0,9.9l-6,6c-1.3,1.3-3.1,2-4.9,2c-0.8,0-1.6-0.1-2.3-0.4L28.1,26c1.2,0.6,2.5,0.9,3.9,0.9c2.3,0,4.6-0.9,6.4-2.6 l6-6C47.9,14.9,47.9,9.1,44.4,5.6z M32.1,17.9c-0.2-0.2-0.4-0.3-0.7-0.3c-0.2,0-0.5,0.1-0.7,0.3L18,30.6c-0.4,0.4-0.4,1,0,1.4 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l12.7-12.7C32.5,18.9,32.5,18.3,32.1,17.9z"/></svg>' +
				'</a>';

function tryShortUrl(url) {
	return url.split("?")[0];
}

GM_addStyle('\
.product-action > #copy-url { margin-top: 12px; margin-left: 10px; }\
#copy-url { float: right; display: inline-block; height: 44px; line-height: 42px; border: 1px solid #e8e8e8; border-radius: 4px; transition: background-color .35s ease-in-out; }\
#copy-url > svg { margin: 10px; transition: fill .25s ease-in-out;}\
.copy-ok { background-color: #99cc00; }\
.copy-ok > svg, .copy-ko > svg { fill: white }\
');

var wrapper = document.querySelector('.product-action');
if( wrapper !== null ) wrapper.insertAdjacentHTML('beforeend', copyButton);

document.querySelector('#copy-url').addEventListener('click', function(event) {
	GM_setClipboard(tryShortUrl(document.location.href), 'text');
	this.classList.add("copy-ok");
	event.preventDefault();
});
