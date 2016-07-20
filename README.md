Cordova Request Location Accuracy Plugin Example
================================================

This repo contains an example project which illustrates use of the [Cordova Request Location Accuracy Plugin](https://github.com/dpa99c/cordova-plugin-request-location-accuracy) for Android and iOS.


## Contents
* [Downloading](#downloading)
* [Building and running](#building-and-running)
* [Pre-built Android app](#pre-built-android-app)
* [License](#license)

**Android:**
[![Example app demo](https://j.gifs.com/KRL8Mb.gif)](https://www.youtube.com/watch?v=pbNdnMDRstg)

**iOS:**
[![Example iOS app screencapture](https://j.gifs.com/1woNPj.gif)](https://www.youtube.com/watch?v=PBZKH7u5RlQ)
 
# Downloading

To download the example project, clone it using git:

    $ git clone https://github.com/dpa99c/cordova-plugin-request-location-accuracy-example.git

# Building and running

**IMPORTANT:** Note that this plugin is intended for use in a **native** Android or iOS environment.
It will **NOT** work in a browser-emulated Cordova environment, for example by running `cordova serve` or using the [Ripple emulator](https://github.com/ripple-emulator/ripple).

To run the example app, connect a Android/iOS device and execute the following commands from the project root.

- Install the platform into the project:

    `$ cordova platform add android`
    `$ cordova platform add ios`

- Build and run the project:

    `$ cordova run android`
    `$ cordova run ios`

# Pre-built Android app
If you're unable to build the project or just want to try it out, [here is the app as a pre-built Android APK installer](build/cordova-plugin-request-location-accuracy-example.apk)


# License
================

The MIT License

Copyright (c) 2016 Dave Alden (Working Edge Ltd.)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.