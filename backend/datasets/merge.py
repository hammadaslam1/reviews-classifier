import json

# Read the contents of the first JSON file
with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/mens_fashion/mens_smart_watches.json', 'r') as file1:
    data1 = json.load(file1)

# Read the contents of the second JSON file
with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/mens_fashion/mens_wrist_watches.json', 'r') as file2:
    data2 = json.load(file2)

# Merge the dictionaries
# merged_data = {**data1, **data2}
merged_data = data1 + data2

# Write the merged data to a new JSON file
with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/mens_fashion/mens_watches.json', 'w') as outfile:
    json.dump(merged_data, outfile, indent=4)
