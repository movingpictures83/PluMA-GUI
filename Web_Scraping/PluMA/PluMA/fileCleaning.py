import subprocess
import os
from datetime import date
import re

def letsClean():
    fname = 'results.csv'
    f = open(fname)
    categoriesList = ["File Converters", "Stats/Visualization", "Transformations", "Dissimilarity", "Correlation", "Centrality", "Clustering", "Time Series", "External Tools", "Miscellaneaous"]
    output = []
    counter = 0
    for line in f:
        if not "Name,Description,Language,Link,Time" in line:
            if not ",Short Description,Language,," in line:
                if ",,,," in line:
                    counter = counter + 1
                if "File Converters,Stats/Visualization,Transformations" in line:
                    break
                line = line.strip('\r\n')
                if 'href=""' in line:
                    m = re.search('href=""(.+?)""', line)
                    if m:
                        n = line.split(",", 3)
                        line = n[0] + "," + n[1] + "," + n[2] + "," + m.group(1)
                if not ",," in line:
                    output.append(line + ',' + categoriesList[counter] + '\n')
                else:
                    output.append(line + '\n')
    f.close()
    f = open(fname, 'w')
    output.append(date.today().strftime("%B %d, %Y"))
    f.writelines(output)
    f.close()
    print(categoriesList)

if(os.path.isfile('./results.csv')):
    os.remove('./results.csv')
#Source: https://pymotw.com/2/subprocess/
subprocess.call('scrapy crawl pluginNames -o results.csv -t csv', shell=True)
letsClean()

