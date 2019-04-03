@echo off
pushd "%~dp0"
:loop
fontforge -script getChars.sh "%~1" 1> log.txt
shift
if not "%1" == "" goto loop
pause
:end