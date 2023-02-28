#!/bin/bash

# Pass the GitHub repository URL as the first argument and the path where you want to clone it as the second argument

git clone $1

cd $2

git checkout -b __test__

echo "arbitrary content" > newFile1.txt

git add newFile.txt

git_status=$(git status)

echo "$git_status"