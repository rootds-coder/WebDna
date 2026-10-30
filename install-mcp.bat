@echo off
setlocal
title WebDNA MCP Auto-Installer
echo ====================================================
echo    WebDNA MCP Auto-Installer (1-Click Setup)
echo ====================================================
echo.

where node >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is required to run the MCP server.
    echo Please install Node.js from https://nodejs.org
    echo After installing Node.js, run this file again!
    echo.
    pause
    exit /b 1
)

set "SETUP_PATH=%~dp0mcp-server\setup-mcp.mjs"
if not exist "%SETUP_PATH%" set "SETUP_PATH=%~dp0setup-mcp.mjs"

if exist "%SETUP_PATH%" (
    node "%SETUP_PATH%"
) else (
    echo [ERROR] Could not find setup-mcp.mjs.
    echo Please ensure this file is inside your WebDNA root folder.
)

echo.
pause
