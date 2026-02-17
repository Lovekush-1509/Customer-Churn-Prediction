# Customer Churn Prediction

## Overview
This project predicts whether a customer will **churn (leave the company)** or **stay** using machine learning.  
It is built using **Python**, **scikit-learn**, and the **Telco Customer Churn dataset** from Kaggle.

**Churn:** When a customer stops using a company’s service.  

The model uses features such as:  
- Customer demographics (gender, senior citizen status, etc.)  
- Account information (tenure, contract type, monthly charges)  
- Services used (Internet, phone, streaming, tech support, etc.)  

---

## Features

- **Data Preprocessing:**  
  - Handle missing values  
  - Convert categorical features into numeric using `LabelEncoder`  
  - Scale numeric features for better model performance  

- **Model Training:**  
  - Logistic Regression classifier  
  - Split data into training and testing sets  
  - Evaluate model with accuracy, precision, recall, and F1-score  

- **Churn Prediction:**  
  - Load new customer data from CSV  
  - Encode and scale features  
  - Predict churn and save results to a CSV file  

- **Modular Project Structure:**  
  - `preprocessing.py` → Data cleaning, encoding, scaling  
  - `train_model.py` → Model training and saving  
  - `predict_model.py` → Make predictions on new data  
  - `main.py` → Run the full workflow  

---

## Project Structure


```
Customer-Churn-Prediction/
│
├── data/
│ └── WA_Fn-UseC_-Telco-Customer-Churn.csv
| └──test_data.dsv
├── models/
│ ├── churn_model.pkl
│ ├── scaler.pkl
│ └── encoders.pkl
├── main/train_model.py
├── predict_model.py
├── requirements.txt 
```


# How To Run
```git clone https://github.com/Lovekush-1509/Customer-Churn-Prediction.git ```

``` cd Customer-Churn-Prediction ```

# train data using command
``` python main.py ```

# Prediction
```python predict.py <data_set location>```