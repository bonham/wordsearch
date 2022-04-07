import dic_DE from "raw-loader!../assets/de.5.txt";
import dic_US from "raw-loader!../assets/en.5.txt";
import dic_HU from "raw-loader!../assets/hu.5.txt";
import dic_NL from "raw-loader!../assets/nl.5.txt";
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
