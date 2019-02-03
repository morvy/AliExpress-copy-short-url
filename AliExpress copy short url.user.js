// ==UserScript==
// @name         AliExpress copy short url button
// @namespace    https://openuserjs.org/users/moped
// @version      0.1.0
// @description  Adds a copy short url button to AliExpress item page. Copies a nice link instead of a long one.
// @author       moped
// @copyright    Feb 02, 2019, moped
// @include		 *://www.aliexpress.com/item/*
// @run-at       document-end
// @icon         https://ae01.alicdn.com/images/eng/wholesale/icon/aliexpress.ico
// @grant        none
// @license      GPL-3.0+; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==

'use strict';

// icon: https://visualpharm.com/free-icons/link-595b40b85ba036ed117dd80a
var copyButton = '<a rel="nofollow" href="javascript: void(0);" ' +
				'class="copy-url" aria-label="Copy short url to clipboard" ' +
				'title="Copy short url to clipboard">' +
				'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" height="22px" width="22px"><path d="M24.6,29.6c0.9,2.5,0.3,5.3-1.6,7.3l-6,6c-1.3,1.3-3.1,2-4.9,2c-1.9,0-3.6-0.7-4.9-2c-2.7-2.7-2.7-7.2,0-9.9l6-6 c1.3-1.3,3.1-2,4.9-2c0.8,0,1.6,0.1,2.3,0.4l1.5-1.5C20.7,23.3,19.3,23,18,23c-2.3,0-4.6,0.9-6.4,2.6l-6,6c-3.5,3.5-3.5,9.2,0,12.7 C7.4,46.1,9.7,47,12,47s4.6-0.9,6.4-2.6l6-6c2.8-2.8,3.3-6.9,1.7-10.2L24.6,29.6z M44.4,5.6C42.6,3.9,40.3,3,38,3s-4.6,0.9-6.4,2.6 l-6,6c-2.8,2.8-3.3,6.9-1.7,10.2l1.5-1.5C24.5,17.8,25.1,15,27,13l6-6c1.3-1.3,3.1-2,4.9-2c1.9,0,3.6,0.7,4.9,2 c2.7,2.7,2.7,7.2,0,9.9l-6,6c-1.3,1.3-3.1,2-4.9,2c-0.8,0-1.6-0.1-2.3-0.4L28.1,26c1.2,0.6,2.5,0.9,3.9,0.9c2.3,0,4.6-0.9,6.4-2.6 l6-6C47.9,14.9,47.9,9.1,44.4,5.6z M32.1,17.9c-0.2-0.2-0.4-0.3-0.7-0.3c-0.2,0-0.5,0.1-0.7,0.3L18,30.6c-0.4,0.4-0.4,1,0,1.4 c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l12.7-12.7C32.5,18.9,32.5,18.3,32.1,17.9z"/></svg>';

function tryShortUrl(url) {
    var newUrl = url;
    newUrl = newUrl.replace(/item\/.+\/([0-9_]+\.html).*/, "item/link/$1");
    newUrl = newUrl.replace(/store\/product\/.+\/([0-9_]+\.html).*/, "store/product/link/$1");

	return newUrl;
}

// https://somethingididnotknow.wordpress.com/2013/07/01/change-page-styles-with-greasemonkeytampermonkey/
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// http://stackoverflow.com/a/30810322/2350423
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg + ': ' + text);
  } catch (err) {
    console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}

addGlobalStyle('\
#j-product-action-block > .product-action-main { display: inline-block; }\
.copy-url { float: right; display: inline-block; height: 44px; line-height: 42px; border: 1px solid #e8e8e8; border-radius: 4px; } .copy-url > svg { margin: 10px; }\
');

document.querySelector('#j-product-action-block').insertAdjacentHTML('beforeend', copyButton);

document.querySelector('.copy-url').addEventListener('click', function(event) {
	copyTextToClipboard(tryShortUrl(document.location.href));
    return false;
});