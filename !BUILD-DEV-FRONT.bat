@echo off
title Main
chcp 65001
cls
call ./node_modules/.bin/webpack --display-error-details
call ./node_modules/.bin/electron .
pause
