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
    custom_settings = {'FEED_URI' : 'results.csv'}

    def parse(self, response):
        categories = response.xpath('.//table/tr/a') 
        trs = categories.xpath('//tr') [1:]

        for tr in trs:
        
            # Obtain all plugin names
            name = tr.xpath('.//td/u/a//text()').extract()
            description = tr.xpath('.//tr/td//text()').extract()
            language = tr.xpath('.//td//text()').extract()

            #Writes to text file.
##            yield{
##                'Name' : name,
##                'Description' : description,
##                'Language' : language
##            }

    #def parse_details(self, response):

            l = ItemLoader(item=PlumaItem(), response=response)

            #l.add_value('Name', name)
            #l.add_value('Description', description)
            l.add_value('Language', language)

            return l.load_item()

        return 
            
        




  

