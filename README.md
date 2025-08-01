# HealthCare

HealthCare is a robust and comprehensive healthcare management system designed to streamline communication, appointment scheduling, and medical record management for patients, doctors, and administrators.

Built with modern technologies including Node.js, Express.js, Next.js, Prisma, PostgreSQL, and integrated real-time communication via Agora.io, HealthCare ensures a seamless experience for all users.

---

## Technologies Used

- **Frontend:** [Next.js](https://nextjs.org/)
- **Backend:** [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Real-time Communication:** [Agora.io (WebRTC)](https://www.agora.io/en/)
- **Authentication & Authorization:** Custom JWT/Auth strategy
- **Email Services:** Nodemailer (for sending prescriptions, confirmations)

---

## 👥 User Roles and Features

### 🔐 Admin
- **Account Management**
  - Create and manage doctor accounts.
- **Appointment Management**
  - Create & manage doctor appointment slots.
- **Analytics & Control**
  - View metadata, doctor profiles, and appointment histories.
  - Dashboard with analytics for appointments and system usage.
- **Multi-language Support**
  - Toggle and manage available language options.
- **Reminders & Notifications**
  - Send automated SMS appointment reminders.
- **Prescription**
  - Access downloadable prescription PDFs.

---

### 👨‍⚕️ Doctor
- **Appointments**
  - View upcoming appointments.
  - Set availability slots.
- **Patient Profile Access**
  - View diagnostic reports and medical history.
- **Prescription**
  - Generate/send prescriptions and notes to patients via email.

---

### 👤 Patient
- **Account & Profile**
  - Register, manage profile, and recover passwords securely.
- **Appointments**
  - Book, pay for, and confirm appointments with doctors.
- **Medical Records**
  - Upload test reports and access prescriptions.
- **Payments**
  - Pay consultation fees.
  - Get invoice and email confirmation.
- **Reviews**
  - Submit ratings/comments and manage past reviews.

---

## ⚙️ Key System Features

- ✅ Secure authentication and role-based authorization.
- 📅 Real-time appointment scheduling and management.
- 📧 Email notifications (prescriptions, invoices, confirmations).
- 🗂️ Patient profile management and history tracking.
- 💬 WebRTC-based video calling between doctor and patient.
- 💳 Payment gateway integration with timeout-based booking cancellation.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/mdnoyonhossain/HealthCare-Frontend
cd healthCare-frontend
npm install
npm run dev
```

### 2. Environment Configuration

```bash
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:5000/api/v1
NEXT_PUBLIC_VIDEO_CALL_APP_ID=your-agora-app-id
```

## 🌐 Live Demo

🚧 Coming soon...

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch (`git checkout -b feature/your-feature`)  
3. Commit your changes  
4. Open a Pull Request  

---

## 📫 Contact

**Developer:** [Noyon Hossain](https://noyonhossain.vercel.app/)