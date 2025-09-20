from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
import joblib

app = FastAPI()

# Dummy models for illustration
price_model = None
quality_model = None

class PriceInput(BaseModel):
    features: List[float]

class QualityInput(BaseModel):
    features: List[float]

@app.on_event("startup")
def load_models():
    global price_model, quality_model
    try:
        price_model = joblib.load("price_model.pkl")
    except:
        price_model = None
    try:
        quality_model = joblib.load("quality_model.pkl")
    except:
        quality_model = None

@app.post("/predict-price")
def predict_price(data: PriceInput):
    if price_model is None:
        raise HTTPException(status_code=503, detail="Price model not loaded")
    pred = price_model.predict([data.features])
    return {"predicted_price": float(pred[0])}

@app.post("/detect-quality-anomaly")
def detect_quality_anomaly(data: QualityInput):
    if quality_model is None:
        raise HTTPException(status_code=503, detail="Quality model not loaded")
    pred = quality_model.predict([data.features])
    return {"anomaly": bool(pred[0])}
