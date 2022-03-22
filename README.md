# wordsearch

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Prepare wordlist with vim

* Download a text file, e.g. from http://www-personal.umich.edu/~jlawler/wordlist.html
* Open in vim
* set fenc=utf-8 , set fileformat=unix - save
* for libreoffice dic files https://github.com/LibreOffice/dictionaries/blob/master/de/de_DE_frami.dic
  * remove trailing slashes with :% s/\/.*$//
  * remove lines with trailing dot :g/\.$/d
* Delete all lines not 5 letters wide using vim command :v/^.\{-5}$/d
