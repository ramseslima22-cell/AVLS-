@echo off
setlocal
cd /d "%~dp0..\.."
if exist "%LocalAppData%\Programs\Python\Python311\python.exe" (
  "%LocalAppData%\Programs\Python\Python311\python.exe" "%~dp0render_final.py" %*
) else (
  py -3 "%~dp0render_final.py" %*
)
exit /b %errorlevel%
