# 📚 English Learning App

Ứng dụng học tiếng Anh fullstack gồm **Backend** (Node.js/Express/MongoDB) và **Frontend** (React/Vite).

---

## ✨ Tính năng

- ✏️ **CRUD Lesson**: Thêm, sửa, xóa, xem bài học
- 🔐 **Xác thực & phân quyền** với JWT (Access Token + Refresh Token)
- 🤖 **AI hỗ trợ kỹ năng Writing** (tích hợp Google Gemini API)
- ☁️ **Upload hình ảnh/video** với Cloudinary

---

## 📂 Cấu trúc thư mục

english-learning-app-test/
│── backend/ # API server (Node.js/Express)
│── frontend/ # Giao diện web (React/Vite)
│── .gitignore
│── README.md

yaml
Sao chép
Chỉnh sửa

---

## 🚀 Yêu cầu trước khi cài đặt

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MongoDB** (cài local hoặc dùng MongoDB Atlas)
- **Git**

---

## ⚙️ Cài đặt

### 1️⃣ Clone dự án

```bash
git clone https://github.com/NguyenTanTai76/learn-eng-AI.git
cd learn-eng-AI
2️⃣ Cài dependencies
Backend
bash
Sao chép
Chỉnh sửa
cd backend
npm install
Frontend
bash
Sao chép
Chỉnh sửa
cd ../frontend
npm install
📄 Cấu hình môi trường
Backend (backend/.env.example)
env
Sao chép
Chỉnh sửa
PORT=8080
MONGODB_URI=mongodb://localhost:27017/rabbitDatabase

JWT_SECRET=your_jwt_secret_key
ACCESS_TOKEN_SECRET=your_access_secret
REFRESH_TOKEN_SECRET=your_refresh_secret

GEMINI_API_KEY=your_gemini_api_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
Frontend (frontend/.env.example)
env
Sao chép
Chỉnh sửa
VITE_API_URL_USER=http://localhost:8080/api/users
VITE_API_URL_TEXT=http://localhost:8080/api/text
VITE_API_URL_LESSON=http://localhost:8080/api/lessons
Tạo file .env từ .env.example
bash
Sao chép
Chỉnh sửa
# Backend
cd backend
cp .env.example .env

# Frontend
cd ../frontend
cp .env.example .env
Điền giá trị thật vào .env cho phù hợp.
Không commit file .env vì đã được ẩn trong .gitignore.

▶️ Chạy dự án
Chạy Backend
bash
Sao chép
Chỉnh sửa
cd backend
npm run dev
Mặc định chạy ở: http://localhost:8080

Chạy Frontend
Mở terminal mới:

bash
Sao chép
Chỉnh sửa
cd frontend
npm run dev
Mặc định chạy ở: http://localhost:5173
```
