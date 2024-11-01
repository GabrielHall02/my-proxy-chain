#!/bin/sh
kill -9 `ps -ef | grep "index.js" | grep -v grep | awk '{print $2}'`

