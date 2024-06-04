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
homePath = "C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/reviews-classifier/backend/datasets/categories/allFiles"
json_dir = homePath
# json_dir = uniPath
count = 0
for filename in os.listdir(json_dir):
    if filename.endswith(".json"):

        if filename == "appliances.json":
            file = json_dir + "/" + filename
            print(filename)
            count = finalSentiment.final(file, file, array, filename, count)
            print(count)

print("sent successfully")
