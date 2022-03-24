# wordsearch

## Prepare wordlist with vim

* Download libreoffice dic files https://github.com/LibreOffice/dictionaries/
* Open in vim
* set fenc=utf-8 , set fileformat=unix
* save
* remove trailing slashes and following chars with :% s/\/.*$//
* remove lines with dots :g/\./d
* digits :g/\d/d 
* hyphens :g/-/d
* apostroph :g/'/d
* Umlauts :g/äöüÄÖÜß/d
* Delete all lines not 5 letters wide using vim command :v/^.\{-5}$/d
* Convert lowercase ggVGu
* remove duplicates :% sort u
