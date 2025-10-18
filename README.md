# PulseShop

PulseShop is a secure mobile e-commerce application built with React Native. It features biometric authentication, real-time product browsing, and offline capabilities for seamless shopping experiences.

## 🚀 Features

- **Secure Authentication**: Login  with biometric unlock
- **Auto-Lock Security**: Auto-locks after 10s of inactivity or app backgrounding
- **Offline Support**: Products remain visible offline with MMKV caching
- **Superadmin Controls**: Designated users can delete products
- **Modern UI**: Clean, responsive design with pull-to-refresh

## 🛠 Tech Stack

- **React Native** with TypeScript
- **React Navigation** for routing
- **React Query** for data fetching and caching
- **Redux Toolkit** for state management
- **MMKV** for secure storage and cache persistence
- **React Native Biometrics** for authentication
- **Expo** for development

## 📱 Screens

1. **Login Screen** - Secure authentication with biometric fallback
2. **Home Screen (All Products)** - Browse all products with search and pull-to-refresh
3. **Specific Category Screen** - Filtered product view by category (i made this dedciated screen for listing categories and filtering by them products as more dynamic instead of listing only one)


## 🚀 Setup & Installation

### Installation Steps

1. **Clone the repository**
git clone <repository-url>
cd PulseShop


2. **Install Required Packages**
npm install

3. **Create Env File At root of the project**

4. **Prebuild Platform Files**
android -> npx expo prebuild --platform android --clean
ios -> npx expo prebuild --platform ios --clean

5. **Run Build**
android -> npm run android
ios -> npm run ios

## SuperAdmin User
username : emilys
password : emilyspass

