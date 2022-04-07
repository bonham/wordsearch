# wordsearch

## prepare wordlist

* Download libreoffice dic and aff files https://github.com/LibreOffice/dictionaries/
* Install hunspell-tools on debian/ubuntu
* expand dict with `unmunch file.dic file.aff >mylang.txt`
* use python file [reducedict.py](reducedict.py) like `python3 reducedict.py mylang.txt >mylang.5.txt`

