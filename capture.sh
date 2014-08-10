#!/bin/bash
##v4l2-ctl --set-fmt-video=pixelformat=1
##avconv -f video4linux2 -input_format mjpeg -s 640x480 -i /dev/video0 -vframes 1 capture.jpg
export LD_LIBRARY_PATH=~/launchpad/ControlPad/mjpg-streamer/
~/launchpad/ControlPad/mjpg-streamer/mjpg_streamer -i "input_uvc.so -d /dev/video0 " -o "output_http.so -w ./www -p 8090"
