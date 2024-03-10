import json


def filter_records(edata):
    filtered_data = []
    # print(data)
    for product_data in edata:
        # print(product_data["reviews"])
        has_review_body = False
        rev = []
        # print(product_data["reviews"])
        product_data['product_title'] = list(
            set(product_data['product_title']))
        product_data['all_products_href'] = list(
            set(product_data['all_products_href']))
        product_data['product_rating_points'] = list(
            set(product_data['product_rating_points']))
        product_data['product_ratings'] = list(
            set(product_data['product_ratings']))
        product_data['product_price'] = list(
            set(product_data['product_price']))
        product_data['product_images_src'] = list(
            set(product_data['product_images_src']))
        product_data['product_description'] = list(
            set(product_data['product_description']))
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
with open('./backend/datasets/categories/womens_fashion/women_casual_jackets.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Combine records (if applicable)
# ...

# Filter records without review bodies
filtered = filter_records(data)

print(len(filtered))

# Write the filtered data to a new JSON file
with open('./backend/datasets/categories/womens_fashion/women_casual_jackets.json', 'w', encoding='utf-8') as f:
    json.dump(filtered, f, indent=4)
