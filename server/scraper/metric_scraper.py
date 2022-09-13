#!/usr/bin/env python
# coding: utf-8

#Importamos lo necesario para el Web scraper
import requests
from bs4 import BeautifulSoup as soup
import pymongo
from pymongo import MongoClient
import sys

headers = {'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:100.0) Gecko/20100101 Firefox/100.0'}

client = MongoClient(sys.argv[1])
db = client["TfgDb"]
collection = db["companyMetrics"]

companies = ["telefonica", "hp", "bbva", "deloitte", "ey", "kpmg", "movistar", "ms", "santander", "westcon"]

glassdoor_urls = ["Telefónica-Opiniones-E3511", "HP-Inc-Opiniones-E1093161", "BBVA-Opiniones-E1237", "Deloitte-Opiniones-E2763", 
       "EY-Opiniones-E2784", "KPMG-Opiniones-E2867", "Movistar-Opiniones-E1164794", "Management-Solutions-Opiniones-E114695",
       "Santander-Opiniones-E828048", "Westcon-Comstor-Opiniones-E11239"]

indeed_urls = ["Telefonica", "HP", "Bbva", "Deloitte", "Ey", "Kpmg", "Movistar", "Management-Solutions", "Santander", "Westcon-comstor"]

ratings = []

for i in range(len(companies)):

       htmlGlassDoor = requests.get(f'https://www.glassdoor.es/Opiniones/{glassdoor_urls[i]}.htm', headers = headers)
       bsObjGlassDoor = soup(htmlGlassDoor.content,'html.parser')
       ratingGlassDoor = bsObjGlassDoor.find('div',{'class':'v2__EIReviewsRatingsStylesV2__ratingNum v2__EIReviewsRatingsStylesV2__large'}).text.strip()
       ratings.append((float(ratingGlassDoor)*10)/5)

       htmlIndeed = requests.get(f'https://es.indeed.com/cmp/{indeed_urls[i]}/reviews')
       bsObjIndeed = soup(htmlIndeed.content,'html.parser')
       ratingIndeed = bsObjIndeed.find('span',{'class':'css-1vlfpkl e1wnkr790'}).text.strip()[0:3]
       ratings.append((float(ratingIndeed.replace(',', '.'))*10)/5)

       collection.update_one({ "company_name" : companies[i] }, { "$set": { "rating" : ratings } }, upsert = True )

       print(ratings)

       ratings.clear()
