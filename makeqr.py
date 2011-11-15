#!/usr/bin/env python
import pyqrnative
import argparse
import re
import pdb

parser = argparse.ArgumentParser()

parser.add_argument(
    '-s',
    '--size',
    dest='size',
    type=int,
    help='QR code version')

parser.add_argument(
    '-d',
    '--data',
    dest='data',
    type=str,
    help='QR code data')

args = parser.parse_args()

qr = pyqrnative.QRCode(args.size, pyqrnative.QRErrorCorrectLevel.L)
qr.addData(args.data)

qr.make()

im = qr.makeImage()

#im.show()
#pdb.set_trace()
im.thumbnail((100, 100))

im.save(
    open('img/' + re.sub(r'[^\w]', '-', args.data) + '.png', 'w'))

