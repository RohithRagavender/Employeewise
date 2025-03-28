# **User Management System**  

A **React-based User Management System** built using **Vite**, featuring a clean UI, smooth user experience, and API integration.  

🔗 **Live Demo**: https://deployin.netlify.app
---

## **📌 Features**  
✅ **User List** – Fetch and display user details from an API  
✅ **Search & Filter** – Case-insensitive search by name or email with **debouncing** for optimized performance  
✅ **Edit & Update** – Modify user details via a **modal form**  
✅ **Delete User** – Remove users with a confirmation message  
✅ **Pagination** – Handle large user lists efficiently  
✅ **Authentication** – Implements **token-based authentication** with local/session storage  
✅ **Responsive UI** – Fully mobile-friendly using **Material-UI**  
✅ **Error Handling** – Displays user-friendly error messages for API failures  
✅ **Optimized Performance** – Uses **debouncing** to reduce unnecessary API calls  

---

## **🛠 Tech Stack**  
| **Technology**  | **Usage** |
|-----------------|----------|
| **React (Vite)** | Frontend Framework |
| **React Router** | Client-side routing |
| **Material-UI**  | UI Components |
| **Axios**        | API Requests |
| **Debouncing (setTimeout)** | Optimized search performance |
| **Vercel / Netlify** | Deployment |

---

## **🚀 Installation & Setup**  

### **1️⃣ Clone the Repository**  
```sh
git clone https://github.com/RohithRagavender/User-Management.git
cd User-Management
```
  
### **2️⃣ Install Dependencies**  
```sh
npm install
```

### **3️⃣ Start the Development Server**  
```sh
npm run dev
```
📌 **App runs on:** `http://localhost:5173`  

---

## **🌐 Deployment**  

### **Deploying to Vercel**  
1. Install Vercel CLI  
   ```sh
   npm install -g vercel
   ```
2. Deploy the project  
   ```sh
   vercel
   ```
3. Follow the setup instructions and get your live link!  

### **Deploying to Netlify**  
1. Install Netlify CLI  
   ```sh
   npm install -g netlify-cli
   ```
2. Build the project  
   ```sh
   npm run build
   ```
3. Deploy to Netlify  
   ```sh
   netlify deploy --prod
   ```

---

## **📡 API Endpoints Used**  
| **Action**   | **Method** | **Endpoint**  |
|-------------|-----------|--------------|
| **Fetch Users** | `GET` | `https://reqres.in/api/users?page=1` |
| **Update User** | `PUT` | `https://reqres.in/api/users/:id` |
| **Delete User** | `DELETE` | `https://reqres.in/api/users/:id` |

---

## **🛠 How It Works**  
1. **User List** is fetched from an API and displayed in a **grid layout**.  
2. **Search Bar** filters users **dynamically** with a **debounce effect** to avoid excessive re-rendering.  
3. **Edit Modal** allows users to update their details, which is reflected instantly.  
4. **Delete Button** removes a user with a **confirmation prompt**.  
5. **Pagination** ensures efficient navigation between user records.  
6. **Authentication** checks for a valid session token and redirects unauthorized users to the login page.  

---

## **👨‍💻 Developer**  
👤 **Rohith Ragavender**  
🔗 GitHub: [RohithRagavender](https://github.com/RohithRagavender)  

---

## **📜 License**  
This project is **open-source** under the **MIT License**.  

---
