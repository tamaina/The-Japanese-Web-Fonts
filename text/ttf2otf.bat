@echo off
pushd "%~dp0"
:loop
fontforge -script ttf2otf.sh "%~1" 2> log.txt
shift
if not "%1" == "" goto loop
pause
:end