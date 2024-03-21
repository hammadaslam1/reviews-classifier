import csv
import json
import re

csv_file_path = 'D:/amazon_mobiles.csv'
json_file_path = 'D:/amazon_mobiles.json'

# Function to convert CSV to JSON


# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json
# csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json csv_to_json


def csv_to_json(csv_file_path, json_file_path):
    dataCSV = []

    # Read CSV file
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)

        # Convert each row to a dictionary and append to the list
        for row in csv_reader:
            dataCSV.append(row)

    # Write JSON file
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(dataCSV, indent=4))


csv_to_json(csv_file_path, json_file_path)


# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py
# combine.py combine.py combine.py combine.py combine.py combine.py combine.py

def combine_records(data):
    combined_data = {}
    for item in data:
        product_title = item['product_name']
        combined_data.setdefault(product_title, {})
        print(product_title)
        for key, value in item.items():
            # if key in ['reviews', 'reviewer_name', 'review_title', 'review_rating', 'reviewer_country_date', 'purchased_product', 'review_status', 'review_body', 'review_helpfulness']:
            if key in ['reviews_name', 'review']:
                combined_data[product_title].setdefault(
                    'reviews', []).append({key: value})
            else:
                combined_data[product_title].setdefault(key, []).append(value)
    return list(combined_data.values())


# Load the JSON data
with open(json_file_path, 'r', encoding='utf-8') as f:
    dataCombine = json.load(f)

# Combine records
combined_data = combine_records(dataCombine)


# Write the combined data to a new JSON file
with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=4)


# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py
# renew.py renew.py renew.py renew.py renew.py renew.py renew.py


def refine_text(text):

    textList = []
    for item in text:
        # Remove HTML tags
        item = re.sub(r"<[^>]*>", "", item)

        # Remove programming symbols
        item = re.sub(r"[^\w\s]", " ", item)

        # Remove extra spaces
        item = re.sub(r"\s+", " ", item)

        textList.append(item)

    return textList


def transform_review(review_data):
    # print(review_data["reviewer_name"])
    # print(review_data)
    transformed_review = {
        "reviews_name": review_data["reviews_name"] if "reviews_name" in review_data else '',
        "review": review_data["review"] if "review" in review_data else '',
    }
    return transformed_review


def renew_records(original_data):
    transformed_data = []
    for product in original_data:
        # print(product)
        transformed_product = {
            "product_name": product["product_name"],
            "products_href": product["products_href"],
            "price": product["price"],
            "rating": product["rating"],
            "product_dimensions": product["product_dimensions"],
            "os_model": product["os_model"],
            "item_weight": product["item_weight"],
            "color": product["color"],
            "connectivity": product["connectivity"],
            "screen_display_size": product["screen_display_size"],
            "battery": product["battery"],
            "camera": product["camera"],
            "ram": product["ram"],
            "rom": product["rom"],
            "reviews": [transform_review(review) for review in product["reviews"]],
        }
        transformed_data.append(transformed_product)
        # print(transformed_data)
    return transformed_data


with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# renew records
renewed_data = renew_records(data)

with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(renewed_data, f, indent=4)


# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data
# remove_data remove_data remove_data remove_data remove_data remove_data


def filter_records(edata):
    filtered_data = []
    # print(data)
    for product_data in edata:
        # print(product_data["reviews"])
        has_review_body = False
        rev = []
        # print(product_data["reviews"])
        product_data['product_name'] = list(
            set(product_data['product_name']))
        product_data['products_href'] = list(
            set(product_data['products_href']))
        product_data['price'] = list(
            set(product_data['price']))
        product_data['rating'] = list(
            set(product_data['rating']))
        product_data['product_dimensions'] = list(
            set(product_data['product_dimensions']))
        product_data['os_model'] = list(
            set(product_data['os_model']))
        product_data['item_weight'] = list(
            set(product_data['item_weight']))
        product_data['color'] = list(
            set(product_data['color']))
        product_data['connectivity'] = list(
            set(product_data['connectivity']))
        product_data['screen_display_size'] = list(
            set(product_data['screen_display_size']))
        product_data['battery'] = list(
            set(product_data['battery']))
        product_data['camera'] = list(
            set(product_data['camera']))
        product_data['ram'] = list(
            set(product_data['ram']))
        product_data['rom'] = list(
            set(product_data['rom']))
        for review in product_data["reviews"]:
            # print(review)
            # print(type(review))# Handle potential missing "reviews" key
            if review["review"] != "":  # Check for non-empty review body
                has_review_body = True
                rev.append(review)
                # break
        product_data["reviews"] = rev
        if has_review_body:
            filtered_data.append(product_data)

    return filtered_data


# ... (Rest of the code remains the same)
# Load the JSON data
with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Combine records (if applicable)
# ...

# Filter records without review bodies
filtered = filter_records(data)

print(len(filtered))

# Write the filtered data to a new JSON file
with open(json_file_path, 'w', encoding='utf-8') as f:
    json.dump(filtered, f, indent=4)


# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv
# json to csv json to csv json to csv json to csv json to csv json to csv


# with open(json_file_path) as f:
#     dataJSON = json.load(f)
# headers = list(dataJSON[0].keys())
# with open('D:/newAmazon.csv', 'w', newline='', encoding='utf-8') as f:
#     writer = csv.DictWriter(f, fieldnames=headers)
#     writer.writeheader()
#     for row in dataJSON:
#         writer.writerow(row)
