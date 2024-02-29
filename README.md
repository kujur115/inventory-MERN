# Inventory Management System - MERN Stack
This repository contains the source code for an inventory management system that is built using the MERN stack. 
The application allows users to manage their inventory, by adding, editing, or deleting items. 
It also has features like user authentication and authorization, searching and filtering inventory items, and viewing 
detailed information about each inventory item.

## Table of Contents
- [Features](##features)
- [Tech Stack](##tech-stack)
- [Installation](##installation)
- [Usage](##usage)
- [Contributing](##contributing)
## Features
- User authentication and authorization
- Add, edit, and delete inventory items
- View detailed information about each inventory item
- Search and filter inventory items
- Responsive design for optimal use on desktop and mobile devices
## Tech Stack
- **Frontend:** React, Redux, Bootstrap
- **Backend:** Node.js, Express, MongoDB
- **API:** RESTful
- **Authentication:** JWT
- **State Management:** Redux Toolkit
## Installation
1. Clone the repository:
    ```
    git clone https://github.com/kujur115/inventory-MERN.git
    ```
2. Install the dependencies for the frontend:
    ```
    cd inventory-MERN/client
    npm install
    ```
3. Install the dependencies for the backend:
    ```
    cd ../server
    npm install
    ```
4. Create a .env file in the server directory and add the following:
    ```
    MONGODB_URI=<your-mongodb-connection-string>
    SECRET=<your-secret-key>
    ```
5. Start the frontend and backend servers:
   ```
    # in the client directory
    npm start
    
    # in the server directory
    npm run dev
    ```
## Usage
- Access the application by visiting ```http://localhost:3000``` in your web browser.
- Log in or sign up to access the inventory management features.
## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
