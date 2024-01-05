import json
# import pymysql  # Example for MySQL
import mysql.connector

# connection = pymysql.connect(host='localhost', user='root', password='', database='preprocessed_db')
connection = mysql.connector.connect(host='localhost',
                                     user='root',
                                     password='',
                                     database='preprocessed_db')

with open('./backend/datasets/combined_data.json', 'r') as f:
    data = json.load(f)

cursor = connection.cursor()

for item in data:
    columns = ', '.join(item.keys())
    values = ', '.join(['%s'] * len(item))
    print(values)
    # sql = f"INSERT INTO myData ({columns}) VALUES ({values})"
    # cursor.execute(sql, tuple(item.values()))

connection.commit()

cursor.close()
connection.close()
