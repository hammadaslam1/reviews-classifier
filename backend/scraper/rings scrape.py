import csv
from bs4 import BeautifulSoup

# Read the HTML file
with open('Amazon.com _ rings.html', 'r', encoding='utf-8') as html_file:
    content = html_file.read()

# Parse the HTML content with BeautifulSoup
soup = BeautifulSoup(content, 'html.parser')

# Find all divs with the specified class
product_divs = soup.find_all('div', class_='puis-card-container s-card-container s-overflow-hidden aok-relative puis-expand-height puis-include-content-margin puis puis-vw0goty2ahaky2ds8ppx5s5mhw s-latency-cf-section puis-card-border')

# Open a CSV file for writing
with open('amazon_rings_info16.csv', 'w', newline='', encoding='utf-8') as csvfile:
    # Create a CSV writer object
    csv_writer = csv.writer(csvfile)

    # Write header to the CSV file
    csv_writer.writerow(['Name', 'Price', 'Rating', 'Reviews', 'Photo URL'])

    # Loop through each product div and extract information
    for product_div in product_divs:
        # Find the Name span
        name_span = product_div.find('span', class_='a-size-base-plus a-color-base a-text-normal')
        # Use a conditional statement to handle NoneType
        Name = name_span.text.strip() if name_span else ''

        # Find the Price div
        price_div = product_div.find('div', class_='a-row a-size-base a-color-base')
        # Use a conditional statement to handle NoneType
        Price = price_div.text.strip() if price_div else ''

        # Find the complete Rating
        rating_span = product_div.find('span', {'aria-label': True})
        # Use a conditional statement to handle NoneType
        Rating = rating_span['aria-label'] if rating_span else ''

        # Find the Reviews div
        reviews_span = product_div.find('span', class_='"a-size-base review-text"')
        # Use a conditional statement to handle NoneType
        Reviews = reviews_span.text.strip() if reviews_span else ''

        # Find the Photo URL
        photo_url = product_div.find('div', class_='s-product-image-container').find('img')['src']

        # Write the information to the CSV file
        csv_writer.writerow([Name, Price, Rating, Reviews, photo_url])

print("Scraping and writing to CSV completed.")
