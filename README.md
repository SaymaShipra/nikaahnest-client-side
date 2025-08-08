# 💍 NikaahNest - Matrimony & Biodata Platform

NikaahNest is a full-stack matchmaking web application where users can create and explore marriage biodatas, send contact requests, manage favorites, and share their marriage success stories. Built with React, Firebase, Express, and MongoDB, this platform offers both regular and premium services with a seamless user experience.

## 🌐 Live Site URL

🔗 https://nikaahnest-hub.web.app/


<img src="https://i.ibb.co.com/4nsMDYJZ/Screenshot-2025-08-08-174145.png">

## 👨‍💼 Admin Credentials

- **Email:** admin@gmail.com
- **Password:** Admin123

---

## ✨ Website Features

1. **User Registration & Login**

   - Firebase authentication with both Email/Password and Google login options.

2. **Role-based Access Control**

   - Admin dashboard to promote/demote users to/from admin.
   - Only admins can access sensitive routes like user management.

3. **Dynamic Biodata Creation**

   - Users can create and update biodatas with photos, preferences, and personal details.

4. **Premium Upgrade Option**

   - Premium users get priority visibility and advanced access to features like contact details.

5. **Search & Filter System**

   - Easily search and filter biodatas based on religion, gender, district, and more.

6. **Favorites & Contact Requests**

   - Save favorite biodatas and send contact requests with one click.

7. **Admin Management Panel**

   - Search users by email, view their details, and assign/remove admin roles without loading the full user list.

8. **"Got Married" Success Stories**

   - Users can share their marriage success stories with photo uploads and descriptions.

9. **Responsive & Modern Design**

   - Built with MUI and Tailwind for a sleek, mobile-friendly interface.

10. **JWT & Secure API Integration**
    - All private API routes are protected using JWT stored in sessionStorage.

---

## 🛠 Tech Stack

- **Frontend:** React.js, Tailwind CSS, MUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** Firebase (Auth), Google Login
- **Hosting:** Firebase Hosting + Vercel (for server)

---

## 📁 Project Structure

📦 NikaahNest
├── client/ (React Frontend)
├── server/ (Express API)
├── README.md

---

## 📌 Admin Tools Highlight

- Search user by email (no need to fetch full user list)
- View user email, registration date, and role
- Toggle admin role directly with one click
- User not found alert with graceful error handling

---

> ✨ Feel free to contribute or suggest features to improve the platform!
