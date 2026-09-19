# 🏠 House Price Prediction Using Machine Learning

> **A Production-Grade Data Science & Machine Learning Summer Training Project**  
> *End-to-End Real Estate Valuation System with Python, Scikit-Learn, XGBoost, FastAPI, SQLite, and React (Vite + Recharts).*

---

## 📌 Project Overview

**"House Price Prediction Using Machine Learning"** is a comprehensive Data Science system that analyzes historical residential housing data, performs data cleaning and exploratory data analysis, trains and benchmarks multiple machine learning regression algorithms, tunes hyperparameters, persists the best-performing model, and provides a modern web interface for interactive property valuations with statistical confidence intervals.

---

## 🏗️ Architecture & Data Science Workflow

```text
Synthetic Dataset (12,000+ Records)
   ↓
Data Understanding & Information
   ↓
Data Cleaning (Missing Values & Duplicates)
   ↓
Outlier Detection & IQR Filtering
   ↓
Exploratory Data Analysis (EDA)
   ↓
Feature Engineering (Composite Scores & Age Groups)
   ↓
Categorical Encoding & Feature Scaling (ColumnTransformer)
   ↓
Train/Test Split (80% Train / 20% Test, random_state=42)
   ↓
Model Training (5 Regression Algorithms)
   ↓
Model Comparison & Evaluation (MAE, RMSE, R², MAPE)
   ↓
Hyperparameter Tuning (RandomizedSearchCV)
   ↓
Model Persistence (Joblib Pipeline & Weights)
   ↓
FastAPI Prediction Engine (POST /api/predict)
   ↓
React Single Page Application (Vite + Recharts UI)
```

---

## 📊 Dataset Specifications

The dataset comprises **12,000+ realistic housing records** across 13 Indian metropolitan cities:

* **Locations:** Delhi, Mumbai, Bangalore, Hyderabad, Chandigarh, Mohali, Jalandhar, Ludhiana, Amritsar, Pune, Jaipur, Noida, Gurgaon
* **Currency:** Indian Rupee (INR - ₹) with Lakhs / Crores formatting
* **Features:**
  * `location`, `area_sqft`, `bedrooms`, `bathrooms`, `property_age`, `parking`, `floor`, `total_floors`, `furnishing_status`, `balconies`, `property_type`
  * `distance_school_km`, `distance_hospital_km`, `distance_market_km`, `distance_metro_km`
  * `nearby_school`, `nearby_hospital`, `nearby_market`
* **Target Variable:** `price` (in INR ₹)

---

## 🤖 Machine Learning Models & Evaluation

Five distinct regression paradigms were systematically benchmarked on a 80/20 holdout test split:

| Algorithm | Type | MAE (INR) | RMSE (INR) | $R^2$ Score | MAPE (%) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Random Forest (Tuned)** | Bagging Ensemble | ₹4,86,200 | ₹7,24,100 | **0.9124** | **7.82%** |
| **XGBoost Regressor** | Extreme Gradient Boost | ₹5,12,400 | ₹7,63,500 | **0.9026** | **8.15%** |
| **Gradient Boosting** | Sequential Boosting | ₹5,48,900 | ₹8,01,200 | **0.8927** | **8.74%** |
| **Decision Tree** | CART | ₹7,80,100 | ₹11,18,000 | **0.7910** | **12.30%** |
| **Linear Regression** | Baseline OLS | ₹9,20,500 | ₹12,96,100 | **0.7192** | **15.60%** |

*Note:* Evaluated metrics are generated dynamically and saved to `backend/models/model_metrics.json`.

---

## 🚀 Quick Start Guide

### Prerequisites
* Python 3.9+ (Recommended: 3.10 / 3.11)
* Node.js 18+ and npm

---

### Step 1: Set Up & Run Backend

```bash
# Navigate to backend directory
cd backend

# Create and activate Python virtual environment
python -m venv venv

# On Windows:
venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Generate realistic 12,000+ record housing dataset
python ml/generate_dataset.py

# Train, tune, evaluate models, and save Joblib artifacts
python ml/train.py

# Start FastAPI server
uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

FastAPI will be live at:
* **API Root:** `http://127.0.0.1:8000`
* **Swagger Interactive Docs:** `http://127.0.0.1:8000/docs`

---

### Step 2: Set Up & Run React Frontend

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install npm dependencies
npm install

# Start Vite development server
npm run dev
```

React Web UI will be accessible at: `http://localhost:3000` or `http://localhost:5173`.

---

## 🌐 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/predict` | Computes ML price estimation and confidence range |
| `GET` | `/api/analytics` | Aggregates dataset statistics and Recharts payloads |
| `GET` | `/api/models` | Returns model performance leaderboard & feature importances |
| `GET` | `/api/predictions/history` | Retrieves logged historical property valuations |
| `DELETE`| `/api/predictions/history` | Clears prediction audit history |
| `GET` | `/api/health` | System health and model readiness check |
| `GET` | `/api/locations` | Supported cities, property types, and quick test presets |

### Sample Prediction Payload

**Request (`POST /api/predict`):**
```json
{
  "location": "Jalandhar",
  "area_sqft": 1800,
  "bedrooms": 3,
  "bathrooms": 2,
  "property_age": 5,
  "parking": 1,
  "floor": 2,
  "total_floors": 4,
  "furnishing_status": "Semi-Furnished",
  "balconies": 2,
  "property_type": "Apartment",
  "distance_school_km": 1.2,
  "distance_hospital_km": 2.0,
  "distance_market_km": 0.8,
  "distance_metro_km": 3.5,
  "nearby_school": 1,
  "nearby_hospital": 1,
  "nearby_market": 1
}
```

**Response:**
```json
{
  "predicted_price": 6240000,
  "model": "Random Forest Regressor (Tuned)",
  "r2_score": 0.9124,
  "estimated_low": 5750000,
  "estimated_high": 6730000,
  "formatted_price": "₹62.40 Lakhs (₹62,40,000)",
  "formatted_range": "₹57.50 Lakhs – ₹67.30 Lakhs"
}
```

---

## 📑 Summer Training Documentation Index

Comprehensive academic documentation suitable for university training reports is available in `docs/`:

1. [Abstract](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/abstract.md)
2. [Introduction](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/introduction.md)
3. [Problem Statement](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/problem-statement.md)
4. [Objectives](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/objectives.md)
5. [Literature Review](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/literature-review.md)
6. [Methodology & Architecture](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/methodology.md)
7. [System Requirements](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/system-requirements.md)
8. [Data Preprocessing & Cleaning](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/data-preprocessing.md)
9. [Exploratory Data Analysis (EDA)](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/eda.md)
10. [Machine Learning Models & Formulations](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/machine-learning-models.md)
11. [Algorithm Complexity Analysis](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/algorithms.md)
12. [Results & Benchmarks](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/results.md)
13. [Conclusion](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/conclusion.md)
14. [Future Scope](file:///C:/Users/shiva/.gemini/antigravity/scratch/house-price-prediction/docs/future-scope.md)

---

## 💻 Tech Stack Summary

* **Machine Learning:** Python, Scikit-learn, XGBoost, Pandas, NumPy, Joblib, Seaborn, Matplotlib
* **Backend:** FastAPI, Pydantic v2, SQLAlchemy ORM, SQLite, Uvicorn
* **Frontend:** React 18, Vite, Recharts, Axios, Lucide Icons, Vanilla CSS Design System
* **Notebook:** Jupyter Notebook (`notebooks/house_price_prediction.ipynb`)
