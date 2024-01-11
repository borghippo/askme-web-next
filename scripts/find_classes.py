"""

Convenience script to list all values of className in HTML tags.

Lists only those that have more than one Tailwind style in them.

"""

import os

styles_file = 'config/styles.ts'


def search_file(fname: str):
    #print(fname)
    occurrences = []
    with open(fname) as fh:
        lineno = 0
        for line in fh:
            lineno += 1
            if 'className' in line:
                prefix, rest = line.split('className=', 1)
                #class_value, *rest = rest.split('>')
                if rest.startswith('{'):
                    class_value = rest[1:].split('}')[0]
                else:
                    class_value = rest.split('"')[1]
                occurrences.append((fname, lineno, class_value.strip()))
    return(occurrences)

def collect_occurrences():
    all_occurences = []
    for (root,dirs,files) in os.walk('.',topdown=True):
        if (root.startswith('./.git')
            or root.startswith('./.next')
            or root.startswith('./node_modules')):
            continue
        for file in files:
            if file.endswith('.tsx'):
                occurrences = search_file(os.path.join(root, file))
                all_occurences.extend(occurrences)
    return all_occurences

def convert_occurrences(occurrences: list) -> dict:
    class_to_file = {}
    for n, (fname, lineno, class_value) in enumerate(occurrences):
        #print(f'{n+1:3d}  {fname}:{lineno:d}  {class_value.strip()}')
        class_to_file.setdefault(class_value, []).append((fname, lineno))
    return class_to_file

def print_occurrences(occurrences: list):
    print()
    for class_value in sorted(occurrences):
        if (len(occurrences[class_value]) > 1
            and (' ' in class_value or class_value.startswith('styles.'))):
            print(class_value)
            for fname, lineno in occurrences[class_value]:
                print(f'    {fname}:{lineno}')

def print_styles():
    print()
    with open(styles_file) as fh:
        for line in fh:
            if ': "' in line:
                print(line.strip())


if __name__ == '__main__':

    occurrences = collect_occurrences()
    occurrences = convert_occurrences(occurrences)
    print_occurrences(occurrences)
    #print_styles()