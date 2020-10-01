# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://docs.scrapy.org/en/latest/topics/item-pipeline.html


# useful for handling different item types with a single interface

import os


class PlumaPipeline(object):
    
    def process_item(self, item, spider):
        os.chdir('/Users/edwardpalermo/Desktop/Web_Scraping/PluMA/PluMA')

        if item['name'][0] :
            pluginName = item['name'][0]
            pluginDesc = item['description'][1]
            pluginLang = item['language'][1]
            

            #os.rename(pluginDesc, pluginLang)
            

        #return item

    
