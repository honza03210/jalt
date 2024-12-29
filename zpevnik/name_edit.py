import os

names = [name for name in os.listdir('.')]
names = []
for name in rough:
    if ".py" in name or ".html":
        continue
    names.append(name)

for name in names:
    print(name)
    new = input('new: ')
    if not new:
        continue
    os.rename(name, new + '.pdf')
