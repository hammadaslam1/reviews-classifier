import os
# import pymongo
import json
import finalSentiment
import inputArrays

# array = inputArrays.get_context()
array = inputArrays.electronics()
# array = inputArrays.clothing()
# array = inputArrays.shoes()
# print(array)
# myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# db = myclient['OpinioMine']
uniPath = "F:/react projects/reviews-classifier/backend/datasets/categories/allFiles"
homePath = "C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/allFiles"
json_dir = homePath
# json_dir = uniPath
count = 0
for filename in os.listdir(json_dir):
    if filename.endswith(".json"):
        # with open(json_dir + "/" + filename, "r") as f:
        #     count = 0
        #     data = json.load(f)
        #     print(filename)
        #     for item in data:
        #         count += len(item["reviews"])
        #     print(count)

        if filename == "appliances.json":
            file = json_dir + "/" + filename
            print(filename)
            count = finalSentiment.final(file, file, array, filename, count)
            # array = inputArrays.electronics
            print(count)
        # collection_name = os.path.splitext(filename)[0]  # Use filename as collection name
        # collection = db[collection_name]
        # with open(os.path.join(json_dir, filename), 'r') as file:
        #     data = json.load(file)
        #     collection.insert_many(data)

print("sent successfully")
