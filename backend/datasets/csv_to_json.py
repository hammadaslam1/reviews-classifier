import csv
import json

# Function to convert CSV to JSON
def csv_to_json(csv_file_path, json_file_path):
    data = []

    # Read CSV file
    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        # Convert each row to a dictionary and append to the list
        for row in csv_reader:
            data.append(row)

    # Write JSON file
    with open(json_file_path, 'w') as json_file:
        json_file.write(json.dumps(data, indent=4))

# Example usage
csv_file_path = 'C:/Users/GS/Documents/datasets/tools and home improvement/kitchen_bath_fixtures.csv'
json_file_path = './backend/datasets/categories/tools_and_home_improvement/kitchen_bath_fixtures.json'

csv_to_json(csv_file_path, json_file_path)
