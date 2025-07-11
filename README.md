# 📁 Byte-Nest (File Uploader App)

A full-stack web application for securely uploading, downloading, and managing files. Users can register, log in, upload files, delete files, and download them anytime.

## 🚀 Features

* 🔐 User Registration & Login (Authentication)
* 📤 Upload Files
* 📥 Download Files
* ❌ Delete Files
* 🌐 Responsive UI with DaisyUI & Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend:

* **React with ts**
* **Tailwind CSS**
* **DaisyUI** (UI components built on Tailwind)

### Backend:

* **Node.js**
* **Express.js**
* **MongoDB** with **Mongoose**
* **Cloudinary** for store files like image, raw etc.
* **dotenv** for environment variable management

---

## 📁 Project Structure

```
project-root/
├── Client/                # React frontend
│   ├── public/
│   └── src/
│   │     ├── components/
│   │     ├── pages/
│   │     └── App.tsx
│   └── .env               # Environment variables
│  
├── Server/                # Node.js backend
│  └── src/               
│  │     ├── controllers/
│  │     ├── models/
│  │     ├── routes/
│  │     ├── app.js
│  │     └── server.js
│  └── .env                # Environment variables
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yash-8-bit/ByteNest.git
cd  ByteNest
```

### 2. Setup Backend

```bash
cd Server
pnpm install
pnpm run dev
```

### 3. Setup Frontend

```bash
cd Client
pnpm install
pnpm run dev
```

---

## 🔐 Environment Variables

Ensure the following environment variables are set in your backend `.env` file:

| Variable                | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `PORT`                  | Port on which the backend runs                   |
| `MONGODB_URI`           | MongoDB connection string                        |
| `JWT_SECRET`            | Secret key for JWT authentication                |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for file storage           |
| `CLOUDINARY_API_KEY`    | Cloudinary API key for authentication            |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret for file management        |
| `ORIGIN_URL`            | Allowed origin URL for CORS requests             |
| `DBURI`                 | The MongoDB URI for the database                 |

Ensure the following environment variables are set in your backend `.env` file:

| Variable                | Description                                      |
| ----------------------- | ------------------------------------------------ |
| `VITE_API_URL`          | API URL used in the frontend (for Vite proxying) |

---

## 🧠 Future Improvements

* 🔄 Pagination for uploaded files
* 🧾 File previews (images, text)
* ⏳ Upload progress bar
* 🔗 Shareable download links

---

## 📄 License

This project is licensed under the [MIT License](https://github.com/yash-8-bit/ByteNest/blob/main/LICENSE).

---