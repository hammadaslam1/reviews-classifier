import json


def filter_records(data):
    filtered_data = []
    # print(data)
    for product_data in data:
        # print(product_data["reviews"])
        has_review_body = False
        rev = []
        # print(product_data["reviews"])
        for review in product_data["reviews"]:
            # print(review)
            # print(type(review))# Handle potential missing "reviews" key
            if review["review_body"] != "":  # Check for non-empty review body
                has_review_body = True
                rev.append(review)
                # break
        product_data["reviews"] = rev
        if has_review_body:
            filtered_data.append(product_data)

    return filtered_data


# ... (Rest of the code remains the same)
# Load the JSON data
with open('./backend/datasets/categories/allFiles/mens_wrist_watches.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Combine records (if applicable)
# ...

# Filter records without review bodies
filtered_data = filter_records(data)

print(len(filtered_data))

# Write the filtered data to a new JSON file
with open('./backend/datasets/categories/allFiles/mens_wrist_watches.json', 'w', encoding='utf-8') as f:
    json.dump(filtered_data, f, indent=4)
