import scrapy
from scrapy import Spider
from scrapy.http import Request
from scrapy.loader import ItemLoader
from PluMA.items import PlumaItem

#import requests
from scrapy.crawler import CrawlerProcess


class PluginnamesSpider(Spider):
    name = 'pluginNames'
    allowed_domains = ['http://biorg.cis.fiu.edu/pluma/plugins/']
    start_urls = ['http://biorg.cis.fiu.edu/pluma/plugins/']
##    custom_settings = {"FEEDS" : {"results.csv" : {"format" : "csv"}}}

    def parse(self, response):
        categories = response.xpath('.//table/tr/a') 
        trs = categories.xpath('//tr') [1:]

        for tr in trs:
        
            # Obtain all plugin names
            name = tr.xpath('.//td[1]/u/a//text()').extract()
            description = tr.xpath('.//tr/td[2]//text()').extract()
            language = tr.xpath('.//td[3]//text()').extract()

            #Writes to text file.
            yield{
                'name' : name,
                'description' : description,
                'language' : language
            }

##        l = ItemLoader(item=PlumaItem(), response=response)
##
##        l.add_value('name', name)
##        l.add_value('description', description)
##        l.add_value('language', language)
##
##        return l.load_item()
            
        




  

