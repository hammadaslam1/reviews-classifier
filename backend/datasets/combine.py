import json


def combine_records(data):
    combined_data = {}
    for item in data:
        product_title = item['product_title']
        combined_data.setdefault(product_title, {})
        print(product_title)
        for key, value in item.items():
            if key in ['reviews', 'reviewer_name', 'review_title', 'review_rating', 'reviewer_country_date', 'purchased_product', 'review_status', 'review_body', 'review_helpfulness']:
                combined_data[product_title].setdefault(
                    'reviews', []).append({key: value})
            else:
                combined_data[product_title].setdefault(key, []).append(value)
    return list(combined_data.values())


# Load the JSON data
with open('./backend/datasets/categories/allFiles/mens_wrist_watches.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Combine records
combined_data = combine_records(data)


# Write the combined data to a new JSON file
with open('./backend/datasets/categories/allFiles/mens_wrist_watches.json', 'w', encoding='utf-8') as f:
    json.dump(combined_data, f, indent=4)
