import mysql.connector

try:
    connection = mysql.connector.connect(host='localhost',
                                         database='preprocessed_db',
                                         user='root',
                                         password='')

    mySql_Create_Table_Query = """CREATE TABLE Laptop (
                             Id int(11) NOT NULL,
                             PRIMARY KEY (Id)) """

    cursor = connection.cursor()
    result = cursor.execute(mySql_Create_Table_Query)
    print("Laptop Table created successfully ")

except mysql.connector.Error as error:
    print("Failed to create table in MySQL: {}".format(error))
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")