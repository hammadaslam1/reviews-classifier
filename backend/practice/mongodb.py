import os
# import pymongo
import json
import finalSentiment

# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# db = myclient['OpinioMine']


json_dir = 'F:/react projects/reviews-classifier/backend/datasets/categories/allFiles'
 

for filename in os.listdir(json_dir):
    if filename.endswith('.json'):
        # with open(json_dir+'/'+filename, 'r') as f:
        #     data = json.load(f)
        #     print(len(data))
        if filename=='camera_and_photo.json':
            file = json_dir + '/' + filename
            print(filename)
            finalSentiment.final(file, file)
        # collection_name = os.path.splitext(filename)[0]  # Use filename as collection name
        # collection = db[collection_name]
        # with open(os.path.join(json_dir, filename), 'r') as file:
        #     data = json.load(file)
        #     collection.insert_many(data)

print('sent successfully')