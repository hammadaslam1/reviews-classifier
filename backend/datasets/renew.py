import json
import re


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
        "reviews": review_data["reviews"] if "reviews" in review_data else '',
        "reviewer_name": review_data["reviewer_name"] if "reviewer_name" in review_data else '',
        "review_title": review_data["review_title"] if "review_title" in review_data else '',
        "review_rating": review_data["review_rating"] if "review_rating" in review_data else '',
        "reviewer_country_date": review_data["reviewer_country_date"] if "reviewer_country_date" in review_data else '',
        "purchased_product": review_data["purchased_product"] if "purchased_product" in review_data else '',
        "review_status": review_data["review_status"] if "review_status" in review_data else '',
        "review_body": review_data["review_body"] if "review_body" in review_data else '',
        "review_helpfulness": review_data["review_helpfulness"] if "review_helpfulness" in review_data else '',
    }
    return transformed_review


def combine_records(original_data):
    transformed_data = []
    for product in original_data:
        transformed_product = {
            "product_title": refine_text(product["product_title"]),
            "all_products_href": product["all_products_href"],
            "product_rating_points": product["product_rating_points"],
            "product_ratings": product["product_ratings"],
            "product_price": product["product_price"],
            "product_images_src": product["product_images_src"],
            "product_description": refine_text(product["product_description"]),
            "reviews": [transform_review(review) for review in product["reviews"]],
        }
        transformed_data.append(transformed_product)
        # print(transformed_data)
    return transformed_data


with open('./backend/datasets/combined_data.json', 'r') as f:
    data = json.load(f)

# combine records
combined_data = combine_records(data)

with open('./backend/datasets/renew.json', 'w') as f:
    json.dump(combined_data, f, indent=4)