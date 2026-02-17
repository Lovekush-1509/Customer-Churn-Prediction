# train.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib

# loading data set for training
df = pd.read_csv("data/WA_Fn-UseC_-Telco-Customer-Churn.csv")


# \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\preprocessing data///////////////////////////////////////////////
# Drop customerID
df.drop("customerID", axis=1, inplace=True)

# Convert TotalCharges to numeric cuz the data may be in string
df["TotalCharges"] = pd.to_numeric(df["TotalCharges"], errors='coerce')
df.dropna(inplace=True) # drop row tht cantain NaN

# Encode categorical columns
label_encoders = {}

for column in df.columns:
    if df[column].dtype == 'object':
        le = LabelEncoder() # string values to numeric values
        df[column] = le.fit_transform(df[column])
        label_encoders[column] = le

# Split data
X = df.drop("Churn", axis=1)
y = df["Churn"]

# Scale features
scaler = StandardScaler() # give the model to ability to compare numerical value
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.2, random_state=42
) # splitted data into 80% for training data and 20% for testing


#\\\\\\\\\\\\\\\\\\\\\\\\\\\\\precprocessing end/////////////////////////////////////





#\\\\\\\\\\\\\\\\\\\\\\\\\\\\\training model/////////////////////////////////////

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train) # help model to find pattern from dataset

# Evaluate
y_pred = model.predict(X_test) # ask trained logistic model to predict


#\\\\\\\\\\\\\\\\\\\\\\\\\\\\\training end/////////////////////////////////////








print("Accuracy:", accuracy_score(y_test, y_pred)) #calculate (true prediction/total prediction)
print(classification_report(y_test, y_pred)) # give the report that contain [Precision,Recall,F1-score,Support]

# Save model + scaler + encoders
joblib.dump(model, "models/churn_model.pkl")
joblib.dump(scaler, "models/scaler.pkl")
joblib.dump(label_encoders, "models/encoders.pkl")

print("Model saved successfully!")
