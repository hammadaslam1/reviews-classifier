import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import StandardScaler
import json

# Load the dataset from a JSON file
with open('C:/Hammad Aslam/BS IT (post ADP)/3rd Semester/Capstone Project/Project/backend/datasets/categories/allFiles/computers_laptops.json', 'r') as f:
    data = json.load(f)

# Convert JSON data to pandas DataFrame
df = pd.DataFrame(data[28]['reviews'])
df = df.dropna()
# Split the data into features (X) and target variable (y)
X = df.drop('review_helpfulness', axis=1)  # Features
y = df['review_helpfulness']  # Target variable

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Scale the features using StandardScaler
scaler = StandardScaler()
print(f"X_train:{X_train}")
print(f"X_test:{X_test}")
print(f"y_train:{y_train}")
print(f"y_test:{y_test}")

X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train a Random Forest Regressor model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Make predictions on the test set
y_pred = model.predict(X_test_scaled)

# Evaluate the model using MSE
mse = mean_squared_error(y_test, y_pred)
print(f'MSE: {mse}')

# Use the model to predict helpfulness scores for new reviews


def predict_helpfulness(features):
    features_scaled = scaler.transform([features])
    return model.predict(features_scaled)[0]


# Example usage:
features = [1, 2, 3, 4, 5]  # Replace with actual feature values
helpfulness_score = predict_helpfulness(features)
print(f'Helpfulness score: {helpfulness_score}')
