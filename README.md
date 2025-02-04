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
![Screenshot 2025-02-04 180746](https://github.com/user-attachments/assets/b677453f-9640-458b-b97e-9e06b0def537)
![Screenshot 2025-02-04 180810](https://github.com/user-attachments/assets/6b27e78e-25d7-40d7-a0e9-725b31c69df4)
![Screenshot 2025-02-04 180828](https://github.com/user-attachments/assets/3ac0bbc2-e794-4b7b-bec6-f7726724d2c7)
![Screenshot 2025-02-04 180845](https://github.com/user-attachments/assets/cd61b2bb-3c84-48cc-93d6-aadf7b7067bf)
![Screenshot 2025-02-04 181231](https://github.com/user-attachments/assets/bc4a41bb-60f9-4f08-aec3-f5b9f8b4de4f)


## Contribution
Feel free to contribute! Fork the repo, make changes, and submit a pull request.


