@echo off
echo Starting NEET Study Assistant...
echo.
echo [1/2] Starting Backend Server...
start "NEET Backend" cmd /k "python backend/main.py"
echo Backend started on port 8000
echo.
echo [2/2] Starting Frontend Server...
start "NEET Frontend" cmd /k "python -m http.server 8080"
echo Frontend started on port 8080
echo.
echo Opening Application...
timeout /t 3
start http://localhost:8080
echo.
echo Done! Keep the terminal windows open while using the app.
