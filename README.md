# 🍃 FOS Dashboard

A sleek, modern, and highly readable dashboard built for **FOS (Fruit of Sustainability)** to visualize key operational metrics — all designed with **Vite** + **Tailwind CSS** for blazing-fast performance and clean aesthetics.

---

## 🚀 Features
- **Today's Complaints Overview**  
  - Displays total complaints submitted today.
  - Shows new launches & complaint submission metrics.

- **Telephone Line Recordings Analysis**
  - **Lines Supported:** Line 1, Line 2, Line 3.
  - **Metrics Shown:**
    - Today's total calls & total call duration.
    - Last hour's call count & call duration.
    - Detailed breakdown of recent call records.

- **Clean, Minimal & Meaningful UI**
  - Designed for simplicity & focus on data.
  - Responsive & mobile-friendly layout.

---

## 🛠️ Tech Stack
- **Frontend:** [Vite](https://vitejs.dev/), [React](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend:** Node.js (for API & server-side logic)
- **Others:** Custom Components, API Integration

---

## 📂 Project Structure
src/
├── api/ # API requests
├── assets/ # Static assets (images/icons)
├── components/ # Reusable React components
├── App.jsx # Main app component
├── main.jsx # React entry point
│
server/ # Backend API (call records, etc.)
public/ # Static public files
vite.config.js # Vite configuration
tailwind.config.js # Tailwind config


---

## 📦 Installation & Setup
```bash
# Clone the repo
git clone https://github.com/qatada16/FOS-Dashboard-3.git

# Install dependencies
npm install

# Run the development server
npm run dev


For backend/server (inside /server folder):
cd server
npm install
node index.js


Crafted with ❤️ using Vite + Tailwind CSS.