import json
count = 0
with open('D:/amazon_mobiles.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    print(len(data))
    for review in data:
        count += len(review['reviews'])
        
    print(count)

