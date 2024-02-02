import pymongo
import json

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
db = myclient.local

# print(db)

with open('./backend/datasets/aaaa.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

mydb = myclient["hammad"]
mycol = mydb["customers"]

mydict = { "name": "John", "address": "Highway 37" }

# with open('./backend/datasets/categories/electronics/camera_and_photo.json', 'w') as f:
#     json.dump(mydict, f, indent=4)
for item in data:
    mycol.insert_one(item)
    print(item)

print(myclient.list_database_names())


dblist = myclient.list_database_names()
if "local" in dblist:
    print("The database exists.")