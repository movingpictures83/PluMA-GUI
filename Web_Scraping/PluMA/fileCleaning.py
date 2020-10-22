import subprocess
import os

def letsClean():
    fname = 'results.csv'
    f = open(fname)
    categoriesList = ["File Converters", "Stats/Visualization", "Transformations", "Dissimilarity", "Correlation", "Centrality", "Clustering", "Time Series", "External Tools", "Miscellaneaous"]
    output = []
    counter = 0
    for line in f:
        if not "Name" in line:
            if not ",Short Description,Language" in line:
                if ",," in line:
                    counter = counter + 1
                if "File Converters,Stats/Visualization,Transformations" in line:
                    break
                line = line.strip('\r\n')
                if not ",," in line:
                    output.append(line + ',' + categoriesList[counter] + '\n')
                else:
                    output.append(line + '\n')
    f.close()
    f = open(fname, 'w')
    f.writelines(output)
    f.close()
    print(categoriesList)

   


print("File has been executed")


if(os.path.isfile('./results.csv')):
    os.remove('./results.csv')
#Source: https://pymotw.com/2/subprocess/
subprocess.call(['scrapy crawl pluginNames -o results.csv -t csv'], shell=True)
letsClean()
