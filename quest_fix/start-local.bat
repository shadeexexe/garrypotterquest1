@echo off
setlocal
cd /d "%~dp0"

echo ================================================
echo   QUEST HARRY POTTER - EXPERIMENTARIY / LOCAL
echo ================================================

where node >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Node.js не найден. Установите Node.js LTS версии 20 или новее: https://nodejs.org/
  pause
  exit /b 1
)

where docker >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Docker не найден. Установите Docker Desktop: https://www.docker.com/products/docker-desktop/
  echo Затем запустите Docker Desktop и повторите запуск этого файла.
  pause
  exit /b 1
)

if not exist .env (
  powershell -NoProfile -ExecutionPolicy Bypass -Command "$secret = [Convert]::ToBase64String((1..48 | ForEach-Object { Get-Random -Maximum 256 } | ForEach-Object { [byte]$_ })); @('DATABASE_URL=postgresql://quest_user:local_quest_password_change_me@127.0.0.1:5432/quest','ADMIN_USERNAME=ExperementariumAdmin','ADMIN_PASSWORD=ExperementariumQuestGaggyPotter',('SESSION_SECRET=' + $secret)) | Set-Content -Encoding ASCII .env"
  echo [OK] Создан локальный файл .env.
)

echo [1/4] Запускаю локальную базу данных...
docker compose up -d
if errorlevel 1 goto failed
set /a attempts=0
:waitdb
set /a attempts+=1
docker compose exec -T database pg_isready -U quest_user -d quest >nul 2>nul
if not errorlevel 1 goto dbready
if %attempts% GEQ 30 goto failed
timeout /t 2 /nobreak >nul
goto waitdb
:dbready

echo [2/4] Устанавливаю зависимости...
call npm install
if errorlevel 1 goto failed

echo [3/4] Создаю таблицы базы данных...
call npx drizzle-kit push
if errorlevel 1 goto failed

echo [4/4] Запускаю сайт...
echo Главная страница: http://localhost:3000
echo Панель администратора: http://localhost:3000/admin
echo Логин: ExperementariumAdmin
echo Пароль: ExperementariumQuestGaggyPotter
call npm run dev
exit /b 0

:failed
echo.
echo [ERROR] Не удалось выполнить один из шагов. Проверьте сообщения выше.
pause
exit /b 1
