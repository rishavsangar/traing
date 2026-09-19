@echo off
TITLE House Price Prediction - Machine Learning System Runner
echo =========================================================================
echo       House Price Prediction Using Machine Learning
echo       Summer Training Data Science Project Launcher
echo =========================================================================
echo.

echo [1/4] Checking Python Virtual Environment...
cd /d "%~dp0backend"
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)
call venv\Scripts\activate

echo [2/4] Installing / Verifying Python Dependencies...
pip install -r requirements.txt

echo [3/4] Generating Dataset and Training ML Models...
python ml/generate_dataset.py
python ml/train.py

echo [4/4] Starting FastAPI Backend Server on http://127.0.0.1:8000 ...
start "FastAPI Backend" cmd /k "venv\Scripts\activate && uvicorn app.main:app --reload --host 127.0.0.1 --port 8000"

echo.
echo Starting React Frontend...
cd /d "%~dp0frontend"
if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
)
start "React Frontend" cmd /k "npm run dev"

echo.
echo =========================================================================
echo System Launched Successfully!
echo  - Backend API & Docs: http://127.0.0.1:8000/docs
echo  - Frontend Web App:   http://localhost:3000
echo =========================================================================
pause
