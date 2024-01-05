import json

def combine_records(data):
    combined_data = {}
    for item in data:
        product_title = item['product_title']
        # combined_data.setdefault(product_title, {})
        for key, value in item.items():
            # if key == 'product_title':
            #     continue  # Skip the title key
            if key in ['reviews', 'reviewer_name', 'review_title', 'review_rating', 'reviewer_country_date', 'purchased_product', 'review_status', 'review_body', 'review_helpfulness']:
                # combined_data[product_title].setdefault('reviews', {}).update({key: value})  # Group review attributes
                continue
            else:
                # combined_data[product_title].setdefault(key, []).append(value)
                print(item['product_title'][0])
                # print(item)
                # Group other attributes
    return list(combined_data.values())

# ... (Rest of the code remains the same)
# Load the JSON data
with open('./backend/datasets/combined_data.json', 'r') as f:
    data = json.load(f)

# Combine records
combined_data = combine_records(data)

# Restructure the reviews section
# restructured_reviews = []
# for product_data in combined_data:
#     for review_group in product_data["reviews"]:
#         review = {}
#         for item in review_group:
#             print(type(item))
#             review[item["key"]] = item["value"]
#         restructured_reviews.append(review)

# Replace the original reviews section with the restructured data
# for product_data in combined_data:
#     product_data["reviews"] = restructured_reviews

# Write the combined data to a new JSON file
with open('./backend/datasets/new_data.json', 'w') as f:
    json.dump(combined_data, f, indent=4)