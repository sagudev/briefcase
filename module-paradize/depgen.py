#!/usr/bin/env python3

import random as rnd
import sys
import os

LCA = "abcdefghijklmnopqrstuvwxyz"
UCA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
NATO = {
    "A": "Alpha",
    "B": "Bravo",
    "C": "Charlie",
    "D": "Delta",
    "E": "Echo",
    "F": "Foxtrot",
    "G": "Golf",
    "H": "Hotel",
    "I": "India",
    "J": "Juliett",
    "K": "Kilo",
    "L": "Lima",
    "M": "Mike",
    "N": "November",
    "O": "Oscar",
    "P": "Papa",
    "Q": "Quebec",
    "R": "Romeo",
    "S": "Sierra",
    "T": "Tango",
    "U": "Uniform",
    "V": "Victor",
    "W": "Whiskey",
    "X": "X-ray",
    "Y": "Yankee",
    "Z": "Zulu",
}
depth = 5

try:
    depth = int(sys.argv[1])
except IndexError:
    pass
except ValueError:
    ...

if depth > 25:
    depth = 25
if depth < 0:
    depth = 0

DEAD_LIB = ""

with open("dead_lib.js", "r", encoding="UTF-8") as fF:
    DEAD_LIB = fF.read()

import_text = """\
import { #varpath } from "/module-paradize/#path.js";

console.log(#varpath);
"""
file_text = """\
let #cur = #rnd;

#deadlib

export { #cur };
"""


def nato_conv(s: str) -> str | None:
    return NATO.get(s)


def gen_file_list(d: int) -> list[str]:
    fl = []
    for i in range(d + 1, depth):
        cd = "/".join(map(nato_conv, folders[: i + 1]))
        for f in LCA:
            fl.append(f"{cd}/{f}")
    # print(fl)
    return fl


def gen_imports(val: int, i: int) -> str:
    s = ""
    fl = gen_file_list(i)
    for _ in range(val):
        n = rnd.randint(0, len(fl) - 1)
        s += import_text.replace("#path", f"{fl[n]}").replace(
            "#varpath", fl[n].replace("/", "")
        )
        fl.pop(n)
    return s


folders = list(UCA[:depth])
paths = ["/".join(map(nato_conv, UCA[:d])) for d in range(1, depth + 1)]

try:
    os.makedirs("/".join(map(nato_conv, folders)))
except FileExistsError:
    # print("File or Dir already exists")
    pass

for i, path in enumerate(paths):
    for fn in list(LCA):
        s = ""
        if i < len(folders) - 1:
            s += gen_imports(rnd.randint(1, 10), i)
        with open(f"{path}/{fn}.js", "w", encoding="UTF-8") as f:
            s += file_text.replace(
                "#cur", "".join(map(nato_conv, UCA[: i + 1])) + fn
            ).replace("#deadlib", DEAD_LIB)
            f.write(s.replace("#rnd", str(rnd.randint(0, 10_000))))


index_imp = """\
import { #A#l } from "./#A/#l.js";
console.log(#A#l);

"""

with open("./index.js", "w", encoding="UTF-8") as f:
    for l in LCA:
        f.write(index_imp.replace("#A", nato_conv("A")).replace("#l", l))

# print(folders)
