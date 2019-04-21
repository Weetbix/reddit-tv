# Reddit TV

## About

Reddit TV is a free and open source **Android TV** app for browsing and playing videos.
Written in modern Javascript using React Native and MobX.

## Current state

The development of this in React Native is **currently blocked** by a few issues relating to RN support on android TV devices. These issues make it impossible to create an android TV app in react native that follows basic navigational standards of the TV platform.

These two remaining issues could be work around by creating your own navigation system and hooking into the TVEventHandler events for left/right, and telling the scroll views to update.

See:

- https://github.com/facebook/react-native/issues/20100
- https://github.com/facebook/react-native/issues/20099

fixed:

- https://github.com/facebook/react-native/issues/19917
- https://github.com/facebook/react-native/issues/20924
- https://github.com/facebook/react-native/issues/21233

## Preview:

![reddit-tv2](https://user-images.githubusercontent.com/492636/45848282-1ef02500-bd2e-11e8-9755-b1262b71f2c6.gif)

## Developing

Follow the usual React Native dev steps to get this up and going. Note: You should download an AndroidTV simulator image to run this on.
