import dic_DE from "raw-loader!../assets/de_DE_frami-five.txt";
import dic_US from "raw-loader!../assets/en_US-five.txt";
import dic_HU from "raw-loader!../assets/hu_HU-five.txt";
import dic_NL from "raw-loader!../assets/nl_NL-five.txt";
import { WordListFilter } from '@/lib/WordListFilter.js'

const dicts = {}
dicts["EN"] = dic_US
dicts["DE"] = dic_DE
dicts["HU"] = dic_HU
dicts["NL"] = dic_NL

const wordLists = {}

for (const l in dicts) {
  const fileContent = dicts[l]
  const lineArray = fileContent.split("\n")
  wordLists[l] = new WordListFilter(lineArray).convertToUpperCase()
}

export { wordLists }
