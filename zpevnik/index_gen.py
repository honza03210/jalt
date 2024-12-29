import os

rough = [name for name in os.listdir('.')]
names = []
for name in rough:
    if ".py" in name or ".html" in name:
        continue
    names.append(name)

with open("zpevnik.html", 'w') as file:
    file.write('<!DOCTYPE html>\n<html lang="cs">\n\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1" />\n<title>.</title>\n</head>\n<body style="display: flex; flex-direction: column">\n')

    for name in names:
        file.write('<a href="zpevnik/' + name + '">' + name + '</a>\n')

    file.write('</body>\n</html>\n')
