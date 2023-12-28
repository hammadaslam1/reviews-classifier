import json

def filter_records(data):
    filtered_data = []
    for product_data in data:
        has_review_body = False
        # print(product_data["reviews"])
        for review in product_data["reviews"][7]:
            print(review)# Handle potential missing "reviews" key
            if review:  # Check for non-empty review body
                has_review_body = True
                break

        if has_review_body:
            filtered_data.append(product_data)

    return filtered_data

# ... (Rest of the code remains the same)
# Load the JSON data
with open('combined_data.json', 'r') as f:
    data = json.load(f)

# Combine records (if applicable)
# ...

# Filter records without review bodies
filtered_data = filter_records(data)

# Write the filtered data to a new JSON file
with open('combined_data.json', 'w') as f:
    json.dump(filtered_data, f, indent=4)
