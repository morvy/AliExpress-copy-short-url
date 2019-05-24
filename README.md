# AliExpress copy short url
Adds a copy short url button to AliExpress item page. Copies a nice link instead of a long one.

This userscript requires [Tampermonkey](https://tampermonkey.net) extension to work which is available for all popular browsers including Chrome, Firefox, Edge

## Changelog

### 2.1.0
- improved detection of short url by parsing *amphtml* link from source code
  - in some cases url in address bar includes full description which is causing long "short" urls
  - if *amphtml* is not present, will use url from address bar
  
### 2.0.0
- compatibility with latest changes on Aliexpress
  - removed /store/product/ as everything is now redirected to /item/
  - reusing GM functions for adding styles and working with clipboard

### 1.1.1
- fixed URL include in description, was missing /store/product/

### 1.1.0
- Copy to clipboard action now has visual confirmation
  - turns green if copied to clipboard
  - turns red if unsuccessful

### 1.0.0
- Public @ https://openuserjs.org/scripts/moped/AliExpress_copy_short_url_button

### 0.1.0
- initial release
