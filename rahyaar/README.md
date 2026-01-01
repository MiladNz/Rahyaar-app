# Rahyaar 

**Rahyaar** is a travel booking platform built as a learning project with ready backend.
The project focuses on modern **Next.js App Router**, clean frontend architecture, and Responsive Design.

online at : https://rahyaar-app.vercel.app/

## Tech Stack

* **Next.js 15 (App Router)**
* **React 19**
* **Tailwind CSS**
* **TanStack React Query**
* **Zustand** (State Management)
* **React Hook Form + Yup**
* **Sonner** (Toast Notifications)
* **Swiper**
* **Next Themes** (Dark / Light mode)



## 📁 Project Structure

```
Rahyaar-app
├── rahyaar/                     # Frontend (Next.js)
│   ├── app/                     # App Router
│   │   ├── actions/
│   │   │   └── getTourById.js
│   │   ├── api/                 # Next.js Route Handlers
│   │   │   ├── auth/
│   │   │   ├── basket/[tourId]/route.js
│   │   │   ├── logout/route.js
│   │   │   ├── order/route.js
│   │   │   └── user/
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useTours.js
│   │   ├── payment-success/
│   │   │   ├── page.js
│   │   │   └── PaymentSuccessContent.js
│   │   ├── providers/
│   │   │   ├── QueryProvider.js
│   │   │   └── ThemeProvider.js
│   │   ├── tours/[id]/reserve/page.js
│   │   ├── tours/[id]/TourClientWrapper.js
│   │   ├── user/profile/page.js
│   │   ├── error.js
│   │   ├── not-found.js
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── globals.css
│   │
│   ├── assets/
│   ├── components/
│   │   ├── auth/LoginModal.js
│   │   ├── footer/Footer.js
│   │   ├── header/Header.js
│   │   ├── profile/
│   │   │   ├── ProfileContent.js
│   │   │   ├── UserTours.js
│   │   │   └── UserTransactions.js
│   │   ├── search/
│   │   │   ├── ClearSearchBtn.js
│   │   │   ├── SearchForm.js
│   │   │   └── SearchSection.js
│   │   ├── sections/
│   │   │   ├── CallBanner.js
│   │   │   ├── Hero.js
│   │   │   └── WhyUs.js
│   │   ├── tour/
│   │   │   ├── TourCard.js
│   │   │   ├── TourDetails.js
│   │   │   └── TourList.js
│   │   └── ui/
│   │
│   ├── public/
│   ├── schema/                  # Yup validation schemas
│   │   ├── bankSchema.js
│   │   ├── emailSchema.js
│   │   ├── loginSchema.js
│   │   ├── profileSchema.js
│   │   ├── reserveSchema.js
│   │   └── searchSchema.js
│   │
│   ├── services/
│   │   └── api.js               # Base API URL
│   ├── store/
│   │   ├── useAuthStore.js
│   │   └── useModalStore.js
│   ├── utils/
│   ├── middleware.js
│   ├── next.config.js
│   ├── package.json
│   └── .env.local
│
├── rahyaar-api/                 # Backend (Node.js + Express)
├── liara.json                   # Liara deploy config
└── README.md
```


## Features

* Tour listing & details
* Tour reservation flow
* Authentication (JWT-based)
* User profile & transactions
* Loading & error handling
* Toast notifications
* Dark / Light mode
* Clean, scalable architecture


## Author

**Milad Nz**
GitHub: [@MiladNz](https://github.com/MiladNz)





