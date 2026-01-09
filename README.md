# 📱 Chat App – Frontend

A real-time mobile chat application built with **React Native** and **Expo**, featuring real-time messaging via **Socket.IO**, offline support, and a clean, modern UI.

This repository contains the **frontend (mobile)** part of the project.

---

## ✨ Features

- 🔐 Authentication (JWT-based)
- 💬 Real-time 1-to-1 messaging (Socket.IO)
- 📨 Message history with pagination
- 📴 Offline message support (planned)
- 🔔 Unread message count
- 👥 Conversation & chat list
- 🎨 Modern UI with system-based theming
- 📱 iOS & Android support via Expo

---

## 🛠 Tech Stack

- **React Native**
- **Expo**
- **TypeScript**
- **Nativewind**
- **Socket.IO Client**
- **Context API** (Global State Management)
- **Gifted Chat**
- **Axios**

---

## 📂 Project Structure

```
/
├── components/ # Reusable UI components
├── context/ # Global state (Auth, Chats, Socket, ChatScreen)
├── hooks/ # Custom hooks (useChat, useChatSocket, etc.)
├── services/ # API service layer
├── types/ # TypeScript types & interfaces
├── utils/ # Helpers (socket, constants)
└── app/ # Layouts and routes using Expo Router
```

---

## 🔌 Real-Time Communication

- Uses **Socket.IO** for real-time messaging
- Conversations are joined via rooms (`conversationId`)
- Events:
  - `join_conversation`
  - `leave_conversation`
  - `message:new`
  - `send_message`

Unread message count and last message are updated in real-time via socket listeners.

---

## 📴 Offline Support (In Progress)

Planned behavior:

- Messages are stored locally when offline
- Pending messages are sent automatically once connection is restored
- User is notified when messages are synced

---

## 🚧 Todo / Roadmap

The project is still under active development.

- [ ] 📸 Image messaging
  - [ ] Local image storage (device)
  - [ ] Server-side image upload
- [ ] 📴 Offline usage
  - [ ] Store messages locally
  - [ ] Auto-sync when online
- [ ] 👥 Friend management
  - [ ] Remove friend
- [ ] 📬 Message features
  - [ ] Read receipts
  - [ ] Typing indicators
- [ ] 🔔 Push notifications
- [ ] Update Android UI
- [ ] 🧪 Testing

---

## ▶️ Getting Started

### 1️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 2️⃣ Start the app

```bash
npx expo start
```

Run on:

- İOS Simulator
- Andriod Emulator
- Physical device via Expo Go

---

## ⚙️ Environment Variables

Create a `.env`file:

```env
# Write your ip address of your computer
# If you write localhost there it wont work
EXPO_PUBLIC_API_URL:http://192.168.1.1:3000
```

---

## 🔗 Backend

The backend is built separately using NestJS, PostgreSQL, and Socket.IO.

👉 Backend repository: [Project Link](https://github.com/AhmetFM/chatter-be)

---

## 📌 Notes

- This project is under active developtment.
- Architecture focuses on scalability and clean separation of concerns.
- Context API is used instead of external state libraries for simplicity.
