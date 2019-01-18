@echo off
chcp 65001
set DEBUG=electron-builder
call .\node_modules\.bin\electron-builder --dir
echo 探测是否为amd64架构
ren "dist\win-unpacked\era-js-launcher.exe" "Era.js Launcher.exe"
echo 探测是否为i386架构
ren "dist\win-ia32-unpacked\era-js-launcher.exe" "Era.js Launcher.exe"
pause