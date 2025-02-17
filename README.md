# AI Image Generator (MERN Stack)

## Overview
Welcome to the **AI Image Generator**, a full-stack web application that allows users to generate AI-powered images through text prompts. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with **Tailwind CSS** for styling.

## Features
- **AI Image Generation**: Users can input prompts, and the application generates images using the **Clipdrop API**.
- **Authentication & Authorization**: Secure user login and signup using **JWT and bcrypt**.
- **Payment Gateway**: Integrated **Razorpay** for seamless transactions.
- **User Dashboard**: View generated images and transaction history.
- **Logout Functionality**: Secure user session management.
- **Interactive UI**: Styled with **Tailwind CSS** and animated with **Framer Motion**.
- **Real-time Notifications**: Implemented using **React-Toastify**.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, React-Icons, React-Toastify, Axios
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT, bcrypt
- **Payments**: Razorpay
- **AI API**: Clipdrop API for image generation

## Installation & Setup
### Prerequisites
- Node.js installed
- MongoDB installed

### Clone the Repository
```bash
git clone https://github.com/subhransu-mishra/text-image-generator
cd text-image-generator
```

### Install Dependencies
#### Backend
```bash
cd server
npm install
```
#### Frontend
```bash
cd client
npm install
```

### Environment Variables
Create a `.env` file in the `server` directory and add:
```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
CLIPDROP_API_KEY=your_clipdrop_api_key
```

### Run the Project
#### Start Backend
```bash
cd server
nodemon index.js
```
#### Start Frontend
```bash
cd client
npm run dev
```

## Screenshots
![Screenshot 2025-02-17 220807](https://github.com/user-attachments/assets/c1b5e937-7493-40ac-a0a0-0978a4b252ca)
![Screenshot 2025-02-17 220744](https://github.com/user-attachments/assets/1ae6860f-a5f8-4163-9e79-667823d37e60)
![Screenshot 2025-02-17 221044](https://github.com/user-attachments/assets/887b9424-8dd8-40b9-af9a-221695dcc99c)
![Screenshot 2025-02-17 220633](https://github.com/user-attachments/assets/96839f5c-ccb3-4233-b7b7-93bbe934cb87)
![Screenshot 2025-02-17 220606](https://github.com/user-attachments/assets/7087be5e-45ca-4c5b-baa2-3b331c39745c)
![Screenshot 2025-02-17 220552](https://github.com/user-attachments/assets/778f8719-e336-47d6-8253-7b080b8fb72d)
![Screenshot 2025-02-17 220535](https://github.com/user-attachments/assets/3e894741-7ccd-45ed-85f7-023dd6c0ca8b)
![Screenshot 2025-02-17 220457](https://github.com/user-attachments/assets/7b50f0c3-09a8-4426-b397-a4ec5044a3f1)



## Contribution
Feel free to contribute! Fork the repo, make changes, and submit a pull request.


