#!/bin/bash

export expression=$1
export bold="\033[1m"
export end="\033[0m"

echo "\n==> ${bold}Search term is \"$expression\"$end"

echo "\n${bold}`pwd`/$end"
grep -n -e $expression *.ts *.tsx .env.local

echo "\n${bold}components/$end"
grep -n -r -e $expression components

echo "\n${bold}config/$end"
grep -n -r -e $expression config

echo "\n${bold}pages/$end"
grep -n -r -e $expression pages

echo "\n${bold}{store,styles,utils}/$end"
grep -n -r -e $expression {store,styles,utils}

echo
