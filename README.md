# HopeBridge Charity Server

**Name:** Ashmanpreet Kaur  
**Student ID:** 35189542

## Project Overview

This is a Node.js-based charity web server created as part of the ICT171 unit at Murdoch University. It allows users to visit a public-facing website and submit donation information. All donations are recorded in a local text file (`donations.txt`) for future reference.

The project demonstrates the following skills:

- Deployment on a cloud-based IaaS provider (DigitalOcean)
- Manual configuration of the server environment using SSH
- Use of Express.js to build a web server
- Handling form submissions and writing to a file
- Serving static files via the `public/` directory
- Optional setup of SSL/TLS (Certbot)

## Features

- Donation form with name and amount
- Records each donation with a timestamp
- Static homepage hosted via Express
- Runs persistently using PM2
- (Optional) SSL/TLS certificate manually installed

## How to Run Locally

1.  Clone the repository:

    ```bash
    git clone (https://github.com/Ashmn1629/hopebridge.git)
    cd hopebridge
    ```

2.  Install Dependencies

    ```bash
    npm install
    ```

3.  Run the Server

    ```bash
    node server.js
    ```

4.  Visit the Site

    ```bash
    Open your browser and go to: http://localhost:3000
    ```
