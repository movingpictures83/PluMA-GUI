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
                    if "MT" in line: #to be removed after Trevor's fix
                        counter = counter - 1
                    output.append(line + ',' + categoriesList[counter] + '\n')
                else:
                    output.append(line + '\n')
    f.close()
    f = open(fname, 'w')
    f.writelines(output)
    f.close()
    print(categoriesList)

if __name__ == "__main__":
#os.system("scrapy crawl pluginNames -o results.csv -t csv")
    letsClean()
