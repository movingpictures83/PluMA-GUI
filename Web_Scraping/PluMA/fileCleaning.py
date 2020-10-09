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
                break;
            output.append(line)
f.close()
f = open(fname, 'w')
f.writelines(output)
f.close()
print(categoriesList)
