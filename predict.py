# predict.py
# running command python predict.py data/test_data.csv


import joblib
import pandas as pd
import sys

# Check for command line argument
if len(sys.argv) != 2:
    print("Usage: python predict.py <path_to_csv_file>")
    sys.exit(1)

csv_path = sys.argv[1]

# Load saved files
model = joblib.load("models/churn_model.pkl")
scaler = joblib.load("models/scaler.pkl")
encoders = joblib.load("models/encoders.pkl")

# Load new customer data
new_data = pd.read_csv(csv_path)

# Preprocess new data
if "customerID" in new_data.columns:
    new_data.drop("customerID", axis=1, inplace=True)

for column in new_data.columns:
    if column in encoders:
        # Make sure all categories exist in encoder
        new_data[column] = new_data[column].map(
            lambda x: x if x in encoders[column].classes_ else encoders[column].classes_[0]
        )
        new_data[column] = encoders[column].transform(new_data[column])

# Scale features
new_data_scaled = scaler.transform(new_data)

# Predict
predictions = model.predict(new_data_scaled)

# Map results
result_map = {1: "Customer going to be Churn", 0: "Customer going to be Stay"}
new_data["Churn_Prediction"] = [result_map[p] for p in predictions]

# Show results
print(new_data)

# Optionally save predictions
new_data.to_csv("data/predictions_output.csv", index=False)
print("Predictions saved to predictions_output.csv")
