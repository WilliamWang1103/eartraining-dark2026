#!/bin/bash

# 音程听辨练习 - 本地服务器启动脚本

# 切换到项目目录
cd /Users/renfang/APP_EarTrainingPractice_test

# 显示启动信息
echo "====================================="
echo "  音程听辨练习 - 本地服务器"
echo "====================================="
echo ""
echo "正在启动服务器..."
echo "访问地址: http://localhost:8000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "====================================="
echo ""

# 启动 HTTP 服务器
python3 -m http.server 8000
