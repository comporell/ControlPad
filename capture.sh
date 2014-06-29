#!/bin/bash
ffmpeg -f video4linux2 -input_format mjpeg -r 15 -s 640x480 -i /dev/video0 -vframes 1 capture.jpg