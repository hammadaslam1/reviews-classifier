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
    with open(json_file_path, 'w', encoding='utf-8') as json_file:
        json_file.write(json.dumps(data, indent=4))

# Example usage
csv_file_path = './backend/scraper/amazon_rings_info16.csv'
json_file_path = './backend/scraper/amazon_rings_info16.json'

csv_to_json(csv_file_path, json_file_path)
