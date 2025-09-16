# Fullstack Todo App

This is a fullstack Todo application built with **Node.js, Express.js, MySQL, EJS, HTML, CSS, and JavaScript**.  
The original front-end is based on a tutorial by [Coding2Go](https://www.youtube.com/watch?v=THEKW1gITJI&t=2115s).  
I added a **backend** with Node.js and MySQL, integrated EJS templating, and made minor CSS improvements.

---

## Features

### Backend (My Contributions)

- Persistent storage of todos with MySQL
- Add, update (toggle completion), and delete todos
- Input validation to prevent empty todos
- Async database operations with proper error handling
- Dynamic rendering with EJS

### Frontend (Based on Coding2Go)

- Responsive layout for desktop, tablet, and mobile
- Interactive UI with checkboxes and delete buttons
- Clean and simple design

---

## Setup Instructions

1. **Backend Setup (Node.js + MySQL)**

   - Navigate to the Node.js folder:

     ```bash
     cd backend-todo-app
     ```

   - Install dependencies:

     ```bash
     npm install
     ```

   - Configure the database:

     - Open `util/database.js`
     - Update your MySQL server credentials (`host`, `user`, `password`, `database`)

   - Start the backend server:

     ```bash
     npm start
     ```

   - Open the browser at `http://localhost:3000/`

     

