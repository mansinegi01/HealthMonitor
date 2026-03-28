from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io

app = FastAPI()

# Allow requests from your React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
model = load_model("brain_tumor_model.h5")
CLASS_TYPES = ['glioma', 'meningioma', 'notumor', 'pituitary']

@app.get("/")
def root():
    return {"message": "Brain Tumor Detection API is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read and preprocess image
    contents = await file.read()
    img = Image.open(io.BytesIO(contents)).convert("RGB")
    img = img.resize((150, 150))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = model.predict(img_array)
    label = CLASS_TYPES[np.argmax(prediction)]
    confidence = float(np.max(prediction))

    return {
        "result": label,
        "confidence": round(confidence * 100, 2)
    }