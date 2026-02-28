from flask import Flask, request
import pandas as pd
from predict import predictForBackend
import os


app = Flask(__name__)



@app.route("/")
def hello_world():
    return "<p>Hello jii, server running</p>"

# customerID,gender,SeniorCitizen,Partner,Dependents,tenure,PhoneService,MultipleLines,InternetService,OnlineSecurity,OnlineBackup,DeviceProtection,TechSupport,StreamingTV,StreamingMovies,Contract,PaperlessBilling,PaymentMethod,MonthlyCharges,TotalCharges
@app.route('/pre',methods = ['POST'])
def predict_churn():
    if 'file' not in request.files: return "No File Found", 400
    print("file found")
    file = request.files['file']
    filename = 'data/test.csv'
    f = pd.read_csv(file);
    f.to_csv(filename,index=False)

    predictForBackend(filename)

    path = 'data/predictions_output.csv'
    df = pd.read_csv(path)
    jsn = df.to_json(orient='records')
    return jsn


    
# app.run(debug=True)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', debug=True)