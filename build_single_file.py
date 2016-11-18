#!/usr/bin/env python3
import os


html_file = open('multifile/dominion.html', 'r')
template = html_file.readlines()
html_file.close()


def insert_files(output, input_filenames, wrap=''):
    prefix = 'multifile/'

    if wrap:
        output.write('<%s>' % wrap)
    for filename in input_filenames:
        with open(prefix + filename, 'r') as input_file:
            for line in input_file:
                output.write(line)
    if wrap:
        output.write('</%s>' % wrap)


if not os.path.isdir('singlefile/'):
    os.mkdir('singlefile/')


with open('singlefile/dominion.html', 'w') as output:
    for line in template:
        if '<script' in line:
            continue
        elif '<link rel="stylesheet"' in line:
            continue
        elif '</head>' in line:
            insert_files(output, ('style.css',), wrap='style')
        elif '</body>' in line:
            js_files = ('cards.js', 'scripts.js')
            insert_files(output, js_files, wrap='script')
        elif '<title>' in line:
            line = line.replace('(Development) ', '');
        output.write(line)


