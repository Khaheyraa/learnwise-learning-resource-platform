# **LearnWise – Personalized Learning Resource Review Platform**

**LearnWise** is a full-stack MERN-based web application where users can discover, add, review, rate, bookmark, and get personalized recommendations for trusted learning resources such as courses, books, tutorials, and documentation.

---

## **Tech Stack**

![React](https://img.shields.io/badge/Frontend-React.js-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express.js](https://img.shields.io/badge/API-Express.js-black)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![REST API](https://img.shields.io/badge/API-REST-blueviolet)

---

## **Project Overview**

Students and self-learners often waste time searching for high-quality learning resources.
**LearnWise** solves this problem by allowing users to add, review, rate, bookmark, and discover useful resources based on skill level, category, ratings, and recommendations.

---

## **Features**

* **User Registration and Login**
* **JWT Authentication**
* **Secure Password Hashing using bcryptjs**
* **Add Learning Resources**
* **View All Resources**
* **Search and Filter Resources**
* **Review and Rating System**
* **Bookmark Resources**
* **My Bookmarks Page**
* **Personalized Recommendations**
* **Dashboard with Statistics**
* **Responsive User Interface**

---

## **Skills Demonstrated**

* **Full Stack Web Development**
* **React.js Frontend Development**
* **Node.js and Express.js Backend Development**
* **MongoDB Atlas Database Integration**
* **REST API Development**
* **JWT Authentication**
* **CRUD Operations**
* **Frontend and Backend Integration**
* **Review and Rating Logic**
* **Bookmark System**
* **Personalized Recommendation Logic**
* **Real-world Debugging**

---

## **Project Structure**

```text
LearnWise-Project
│
├── backend
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
└── frontend
    ├── public
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    └── eslint.config.js
```

---

## **How to Run Locally**

### **Backend Setup**

```bash
cd LearnWise-Project/backend
npm install
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

### **Frontend Setup**

```bash
cd LearnWise-Project/frontend
npm install
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

or another port shown in the terminal.

---

## **Environment Variables**

Create a `.env` file inside the **backend** folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
```

---

## **API Highlights**

### **User APIs**

* **POST** `/api/users/register`
* **POST** `/api/users/login`
* **POST** `/api/users/bookmark`
* **GET** `/api/users/:userId/bookmarks`

### **Resource APIs**

* **POST** `/api/resources/add`
* **GET** `/api/resources`
* **POST** `/api/resources/:id/reviews`

---

## **Major Functional Modules**

### **Authentication**

Users can register and login securely using JWT authentication and password hashing.

### **Learning Resources**

Users can add learning resources with title, description, category, link, and difficulty level.

### **Reviews and Ratings**

Users can add reviews and ratings to help others identify useful resources.

### **Bookmarks**

Logged-in users can save important resources and view them later in the My Bookmarks page.

### **Personalized Recommendations**

Resources are recommended based on bookmarks, categories, ratings, and user activity.

### **Dashboard**

The dashboard displays useful statistics such as total resources, resource levels, reviews, and top-rated resources.

---

## **Author**

**Khaheyraa**

---
