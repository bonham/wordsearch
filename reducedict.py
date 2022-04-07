#!/usr/bin/env python3
import argparse
import re

parser = argparse.ArgumentParser()
parser.add_argument('dictfile',help="hunspell dict file")
args = parser.parse_args()

fname = args.dictfile

# regexes
r_comment = re.compile(r'^#')
r_white = re.compile(r'^\s*$')
r_dontwant = re.compile(r'[-|/.0123456789\']')
r_umlaut = re.compile(r'[äöüÄÖÜß]')

r_whitestrip = re.compile(r'^(\S+)\s+.*')

result = set()
with open(fname,"r",encoding="utf-8") as f:

  for l in f:

    # strip whitespace left and right
    line = l.strip()

    # strip right part if there is whitespace in the middle
    m = r_whitestrip.search(line)
    if m:
      line = m.group(1)
    
    # empty line
    if len(line) == 0:
      continue

    # comments at start
    if r_comment.search(line):
      continue

    # still whitespace in line?
    if r_white.search(line):
      raise RuntimeError("can not happen >{}<".format(line))

    # unwanted characters in line
    if r_dontwant.search(line):
      continue

    # german ß will be converted to SS 
    lineu = line.upper()
    
    # umlaute eliminieren
    if r_umlaut.search(lineu):
      continue
    
    if(len(lineu) == 5):
      result.add(lineu)
      

for o in sorted(result):
  print(o)
    
