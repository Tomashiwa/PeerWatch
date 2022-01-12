# PeerWatch
> This repository only contains the files for PeerWatch's frontend. You may access the backend repository [here](https://github.com/Tomashiwa/PeerWatch-backend).

## Overview

This project is a web application to allow users to watch YouTube videos together and chat to one another. The video will kept in sync for all users in the same room.

![image](https://user-images.githubusercontent.com/15318860/140597009-ae8ed7e9-ea93-4d7d-b3f8-63898eabcde0.png)

Production Website: https://peerwatch.netlify.app/

**Backend is hosted on a Heroku's free-tier dyno, delay is expected when interacting with backend**

##### Installation Guide

1. Clone this repo.
2. Run `npm install` at root directory
3. Run `npm run start`
4. Access the application through http://localhost:3000

##### Technology stack

-   Frontend: React
-   Backend: MySQL + Express JS + Redis
-   Key packages: React Player + Socket io + Material UI + Styled-components

##### Browser Support

| Browser | Google Chrome | Mozilla Firefox | Microsoft Edge | Opera         | Safari    |
| ------- | ------------- | --------------- | -------------- | ------------- | --------- |
| Version | 95.0.4638.69  | 94.0.1          | 95.0.1020.40   | 74.0.3911.139 | Mojave 12 |

-   This project is developed on Chrome but works on all listed browsers
-   Limited support for mobile resolutions
