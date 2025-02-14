# ✨ Savannah Photo App Documentation

**Version**: 1.0.0  
**Author**: Ian Mathews 
**Last Updated**: 07/02/2025
**Live Site**: https://savannah-photo-app.vercel.app/  

## 📌 Overview  
The **Savannah Photo App** is a **full-stack web application** that allows users to:  
- ✅ Register and log in to manage their albums and photos  
- ✅ Upload photos, like, comment, and delete them  
- ✅ View other users' albums and photos  
- ✅ Edit photo titles and manage their content  

**Access Restrictions:**  
- ❌ Only authenticated users (active sessions) can **create their own albums** and **edit or delete their own photos**.  
- ❌ Users **cannot edit or delete other users' albums or photos**.  

The backend is built with **Node.js, Express, and MongoDB**, while the frontend is powered by **Next.js and Tailwind CSS**.  

---  

## 📌 Tech Stack  
| **Component** | **Technology** |
|--------------|---------------|
| **Frontend** | Next.js, React, Tailwind CSS |
| **Backend**  | Node.js, Express.js, Mongoose |
| **Database** | MongoDB Atlas |
| **State Management** | Redux Toolkit |
| **Image Uploads** | Cloudinary |
| **Deployment** | Backend on **Render**, Frontend on **Vercel** |
| **Authentication** | JWT (JSON Web Token) |
| **Docker Support** | Yes |

---  

## 📌 Features  
### 🛡️ User Authentication  
- Users can **sign up, log in, and manage sessions** securely  
- Authentication is handled via **JWT tokens**  
- User sessions are **protected**  

### 🌟 Album & Photo Management  
- Users can **create, edit, and delete albums**  
- Users can **upload images** to Cloudinary  
- Users can **like and comment** on photos  
- Users can **edit photo titles**  
- **Users cannot edit or delete other users' albums or photos**  

### 🛠️ Navigation & UI  
- **Modern UI design** with Tailwind CSS and ShadCN UI components  
- **Protected routes** ensure unauthorized users can't access private data  

---  

## 📌 Installation & Setup  
### 💡 1. Clone the Repository  
```sh
git clone https://github.com/your-repo/savannah-photo-app.git
cd savannah-photo-app
```

### 💡 2. Backend Setup  
```sh
cd backend
npm install
```

Create a `.env` file in the `backend/` folder with:  
```env
MONGO_URI=mongodb+srv://your-mongodb-uri
JWT_SECRET=your-secret-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
PORT=5000
```
Start the backend:  
```sh
npm run dev
```
**Backend runs on:**  
`http://localhost:5000`

### 💡 3. Frontend Setup  
```sh
cd frontend
npm install
```
Create a `.env.local` file in `frontend/` with:  
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```
Start the frontend:  
```sh
npm run dev
```
**Frontend runs on:**  
`http://localhost:3000`

---  

## 📌 Deployment  
### 💡 Backend Deployment (Render)  
1. Push backend code to GitHub  
2. Create a **new Web Service** on [Render](https://render.com/)  
3. Set **Build Command**:  
   ```sh
   npm install
   ```
4. Set **Start Command**:  
   ```sh
   npm start
   ```
5. Add environment variables (`MONGO_URI`, `JWT_SECRET`, `CLOUDINARY_*`)  
6. **Deploy!**  

Backend URL Example:  
```
https://your-backend.onrender.com
```

### 💡 Frontend Deployment (Vercel)  
1. Push frontend code to GitHub  
2. Go to [Vercel](https://vercel.com/) and create a new project  
3. Select the **frontend repository**  
4. Add environment variables (`NEXT_PUBLIC_API_URL`)  
5. **Deploy!**  

Frontend URL Example:  
```
https://your-frontend.vercel.app
```

---  

## 📌 API Reference  
All API endpoints are **documented in Postman**.  
👉 **View API Documentation Here** → [Postman API Collection](https://team-maabara-bunifu.postman.co/workspace/Savannah-Photo-App-Workspace~2d13895d-8ac1-406d-b9db-13b1b82467b6/collection/28493118-19b95d3d-2bca-42f6-8af8-b300b0dd6b07?action=share&creator=28493118)  

---  

## 📌 Docker Setup  
You can run the entire application using Docker.

### 💡 1. Build and Run Everything with Docker Compose  
```sh
docker-compose up --build
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000/api`  

---  

## 📌 Security & Best Practices  
- **Environment Variables:** Store API keys, JWT secrets, and database credentials in `.env` files.  
- **CORS Policy:** Only allow frontend to communicate with backend via `CORS` settings.  
- **Validation:** Ensure inputs are sanitized before storing in the database.  

---  

## 📌 Conclusion  
🚀 **Savannah Photo App** is a complete **MERN-stack** solution with authentication, image uploads, and social features.  
- ✅ Successfully **deployed backend on Render** and **frontend on Vercel**.  
- ✅ Uses **MongoDB Atlas for database storage** and **Cloudinary for image uploads**.  
- ✅ API documentation is available on **Postman**.  

**Enjoy using Savannah Photo App!** 🚀🔥  

