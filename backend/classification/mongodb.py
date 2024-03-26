import os
# import pymongo
import json

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# db = myclient['OpinioMine']


json_dir = './backend/datasets/categories/allFiles'


for filename in os.listdir(json_dir):
    if filename.endswith('.json'):
        with open(json_dir+'/'+filename, 'r') as f:
            data = json.load(f)
            print(filename)
            print(len(data))
        # collection_name = os.path.splitext(filename)[0]  # Use filename as collection name
        # collection = db[collection_name]
        # with open(os.path.join(json_dir, filename), 'r') as file:
        #     data = json.load(file)
        #     collection.insert_many(data)

print('sent successfully')