#!/bin/bash

# 遍历所有子目录，排除当前目录下的 .git 文件夹
find . -type d -name ".git" ! -path "./.git" | while read gitdir; do
    # 获取父目录路径
    parentdir=$(dirname "$gitdir")
    # 重命名 .git 为 .bit
    mv "$gitdir" "$parentdir/.bit"
    echo "Renamed $gitdir to $parentdir/.bit"
done
