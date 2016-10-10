@echo off
:loop
fontforge -script otf2ttf.sh "%~1"
shift
if not "%1" == "" goto loop
pause
:end