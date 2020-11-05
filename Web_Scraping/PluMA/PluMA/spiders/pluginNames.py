import scrapy
from scrapy import Spider
from scrapy.http import Request
from scrapy.loader import ItemLoader
from PluMA.items import PlumaItem
#import requests
from scrapy.crawler import CrawlerProcess
import string

import os.path, time

class PluginnamesSpider(scrapy.Spider):
    name = 'pluginNames'
    allowed_domains = ['http://biorg.cis.fiu.edu/pluma/plugins/']
    start_urls = ['http://biorg.cis.fiu.edu/pluma/plugins/']
    custom_settings = {'FEED_URI' : 'results.csv'}
   
    def parse(self, response):
        tables = response.xpath('//div[contains(@id,"bigcolumn")]//table')
        trs = tables.xpath('//tr')[4:]

        cycle = 0
        for tr in trs:
            # Obtain all plugin details
            name = tr.xpath('normalize-space(.//td[1]//u//text())').extract_first()
            description = tr.xpath('normalize-space(.//td[2]//text())').extract_first()
            language = tr.xpath('normalize-space(.//td[3]//text())').extract_first()
            link = tr.xpath('.//td//u//a').extract_first()
            


            if (name == "AbundCSV2NOA"):
                cycle = cycle + 1

            if (cycle == 2):
                break
                
            #Writes to text file.  
            yield{
                'Name' : name,
                'Description' : description,
                'Language' : language,
                'Link' : link,
            }
        # t =  time.ctime(os.path.getmtime("results.csv"))
        # yield{
        #         'Time': t,
        #     }


        


# To run code:
# Go to directory
# cd /Users/edwardpalermo/Desktop/seniorProject2/PluMA/PluMA-GUI/Web_Scraping/PluMA

# In terminal type the following to execute:
# scrapy crawl pluginNames -o results.csv -t csv


##    def parse_details(self, response):
##
##        l = ItemLoader(item=PlumaItem(), response=response)    
##        l.add_value('Name', name)
##        l.add_value('Description', description)
##        l.add_value('Language', language) 
##        return l.load_item()
##            
        

##SCRAPY TOOL TESTS PATHS
#All tables and rows.
#response.xpath('//div[contains(@id,"bigcolumn")]//table//text()').extract()

#fFirst row
#tr.xpath('.//td//text()').extract()

# Name of row.
# tr.xpath('.//td[1]//text()').extract()


  

