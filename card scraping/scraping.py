import requests
from bs4 import BeautifulSoup
from selenium import webdriver
from pymongo import MongoClient
from bson.binary import Binary
import time
import re
import os
from collections import defaultdict


#Function to scrape card info from the page
def scrape_card(html, collection, parallel_flag = False, parallel = None):
    soup = BeautifulSoup(html, "html.parser")

    image_url = soup.find('div', class_='sc-dWyRdj iiabyU frontside')

    if image_url:
        img_src = image_url.find('img').get('src')

        image_response = requests.get(img_src)

        image_data = Binary(image_response.content)

        divs = []
        for div in soup.find_all('div', class_='sc-djyMRm kNzA-dt'):
            divs.append(div)

        #Has no description
        if not divs[0].find('span'):
            description = ""
            code = divs[0].text
            set = code[:4]
            #If this is a parallel, append P and the number art to the name
            if parallel_flag:
                name = divs[1].text + f' P{parallel}'
            else:
                name = divs[1].text
            
        
        #Trigger card effect
        elif divs[1].text.split(' ')[0] == '[Trigger]':
            description = divs[0].find('span').get_text() + '\n' + divs[1].text
            code = divs[2].text
            set = code[:4]

            if parallel_flag:
                name = divs[3].text + f' P{parallel}'
            else:
                name = divs[3].text
        
        #Description is available
        else:
            description = divs[0].find('span').get_text()
            code = divs[1].text
            set = code[:4]
            if parallel_flag:
                name = divs[2].text + f' P{parallel}'
            else:
                name = divs[2].text

        doc = {
            "set"    : set,
            "code"   : code,
            "name"   : name,
            "img_src": img_src,
            "img"    : image_data,
            "effect" : description,
        }

        return collection.insert_one(doc)
    
    return False

        
#Function to scrape all possible cards from a url
def scrape_url(set_num, url, start = 1, end = 122):
    collection = db[f'OP{str(set_num).zfill(2)}']

    for i in range(start, end):
        new_url = url + f'{str(set_num).zfill(2)}-{str(i).zfill(3)}/'

        driver.get(new_url)

        time.sleep(5)

        html = driver.page_source

        if scrape_card(html, collection):
            scrape_parallel(new_url, collection)

    return
    
#Function to get parallel arts if available
def scrape_parallel(url, collection):
     #Check for parallel arts starting from 1
    parallel = 1

    new_url = url[:len(url)-1] + f'_p{parallel}/'

    while parallel <= 100:
        driver.get(new_url)

        time.sleep(3)

        html = driver.page_source

        if not scrape_card(html, collection, True, parallel):
            return

        parallel += 1
        new_url = new_url[:len(new_url)-2]+f'{parallel}/'

    return


def scrape_missing(missing_list, url):
    for card in missing_list:

        collection = db[f'{card[:4]}']

        
        new_url = url + f'{card}/'

        driver.get(new_url)

        time.sleep(5)

        html = driver.page_source

        if scrape_card(html, collection):
            scrape_parallel(new_url, collection)

    return

#Get missing one piece cards
def get_missing():
    missing = []
    lengths = [121, 121, 123, 119, 119, 119, 119, 119, 119, 119, 119]
    for i in range(1, 12):
        collection = db[f"OP{str(i).zfill(2)}"]
        ids = set(collection.distinct("code"))

        for j in range(1, lengths[i-1]+1):
            code = f"OP{str(i).zfill(2)}-{str(j).zfill(3)}"

            
            if code not in ids:
                missing.append(code)
    
    return missing

client = MongoClient("mongodb+srv://waewing24:ohHcTjLCKpCI9hKe@bindr.ihsxekr.mongodb.net/?retryWrites=true&w=majority&appName=Bindr")
db = client['One_Piece_TCG']
# driver = webdriver.Firefox()  # Or Firefox, Edge, etc.


# codings = defaultdict(str)

# for (root, dirs, files) in os.walk(directory):
#     # print(f'\nRoot: {root}', f'\nDirs: {dirs}', f'\nFiles: {files}')

#     for file in files:
#         test = file.split(r".png")
#         code, name = test[0].split(r"_")
#         name = '"Gang"'.join(name.split('Gang'))
#         name = '"Captain"'.join(name.split('Captain'))
#         path =  '/'.join(root.split('\\')[-2::]) + f'/{file}'
        
#         codings[code + name] = './' + path

# codings['Captain John'] = './images/OP07/OP07-082_Captain John.png'

for i in range(2, 12):
    collection = db[f"OP{str(i).zfill(2)}"]

    for document in collection.find():
        try:
            # print(codings[document['code'] + document['name']])
            collection.update_one({'code' : document['code'], 'name': document['name']}, {'$set' : {'img_src' : 'https://optcg-images.s3.us-east-2.amazonaws.com' + document['img_src'][1:]}})

        except Exception as e:
            print(f'An error has occured: {e}')

    
         
# print(missing)

# scrape_missing(missing, 'https://onepiece.gg/cards/')

# for i in range(9, 12):
#     scrape_url(i, 'https://onepiece.gg/cards/OP', 1, 124)