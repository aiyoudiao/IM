#!/bin/bash

# 遍历所有子目录，排除当前目录下的 .bit 文件夹
find . -type d -name ".bit" ! -path "./.bit" | while read gitdir; do
    # 获取父目录路径
    parentdir=$(dirname "$gitdir")
    # 重命名 .bit 为 .git
    mv "$gitdir" "$parentdir/.git"
    echo "Renamed $gitdir to $parentdir/.git"
done
