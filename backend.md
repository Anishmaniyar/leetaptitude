# 🚀 Backend Architecture – Aptitude Practice App

---

# 🧱 1. Tech Stack & Dependencies

## Core

* Next.js (App Router – API routes)
* TypeScript

## Database

* PostgreSQL
* Prisma ORM
* @prisma/client

## Auth & Security

* jsonwebtoken (JWT auth)
* bcryptjs (password hashing)

## Validation

* zod (request validation)

## Utilities

* Custom:

  * asyncHandler
  * ApiResponse
  * ApiError

## Optional

* dayjs (date handling)

---

# 📦 2. Backend Architecture Overview

**Flow:**
Route → Middleware → Validator → Service → Prisma → Response

---

# 📁 3. Folder Structure

```
/src
  /app
    /api
      /auth
        /signup/route.ts
        /login/route.ts
        /me/route.ts
      /questions
        /route.ts
        /[id]/route.ts
      /attempt
        /route.ts
      /user
        /profile/route.ts
        /stats/route.ts

  /lib
    prisma.ts

  /utils
    asyncHandler.ts
    ApiResponse.ts
    ApiError.ts

  /middleware
    auth.middleware.ts

  /validators
    auth.validator.ts
    attempt.validator.ts
    question.validator.ts

  /services
    auth.service.ts
    question.service.ts
    attempt.service.ts
    user.service.ts

  /types
    index.ts
```

---

# ⚙️ 4. Core Backend Modules

## Auth Module

* Signup
* Login
* JWT verification

## User Module

* Profile data
* Stats (accuracy, streak, solved count)

## Question Module

* Fetch questions
* Filtering (category, difficulty, tags)
* Pagination

## Attempt Module

* Submit answer
* Validate correctness
* Store attempt
* Update stats

---

# 🗄️ 5. Database Schema (Prisma)

## User

```
id (PK)
name
email (unique)
password
role (user/admin)
createdAt
```

## UserStats

```
userId (FK)
totalSolved
totalCorrect
totalIncorrect
accuracy
currentStreak
lastActiveDate
```

## Question

```
id (PK)
title
description
type (mcq/numeric)
categoryId (FK)
difficultyId (FK)
createdAt
```

## Option

```
id (PK)
questionId (FK)
text
isCorrect
```

## Category

```
id (PK)
name
```

## Difficulty

```
id (PK)
level (easy/medium/hard)
```

## Tag

```
id (PK)
name
```

## QuestionTag

```
questionId (FK)
tagId (FK)
```

## Attempt

```
id (PK)
userId (FK)
questionId (FK)
selectedOptionId (nullable)
numericAnswer (nullable)
isCorrect
timeTaken
attemptedAt
```

---

# 🔐 6. Authentication System

## Signup

* Hash password using bcrypt
* Store user

## Login

* Validate credentials
* Return JWT token

## Middleware

* Extract token from header
* Verify JWT
* Attach user to request

---

# 🧪 7. Validation Layer (Zod)

* Validate request body before service call
* Separate schemas per module

Example:

```
attemptSchema:
- questionId
- selectedOptionId (optional)
- numericAnswer (optional)
- timeTaken
```

---

# ⚡ 8. API Endpoints

## Auth

```
POST /api/auth/signup
POST /api/auth/login
GET  /api/auth/me
```

## User

```
GET /api/user/profile
GET /api/user/stats
```

## Questions

```
GET /api/questions
GET /api/questions/:id
```

### Query Params

```
category
difficulty
tags
page
limit
```

---

## Attempt

```
POST /api/attempt
GET  /api/attempt/history
```

---

# 🔁 9. Core Flow (Practice)

1. Fetch questions
2. Open question
3. Submit answer
4. Backend:

   * Validate input
   * Check correctness
   * Store attempt
   * Update stats
5. Return result + explanation

---

# 🛡️ 10. Security

* Password hashing (bcrypt)
* JWT authentication
* Input validation (zod)
* Protected routes (middleware)

---

# ⚙️ 11. Utilities

## asyncHandler

* Wraps API routes
* Handles errors centrally

## ApiResponse

```
{
  success: boolean,
  message: string,
  data: any
}
```

## ApiError

* Custom error with status code

---

# 🚫 12. Not Included in MVP

* Leaderboards
* AI recommendations
* Advanced analytics
* Test system
* Community features

---

# 🎯 Final MVP Definition

User logs in → filters questions → solves → gets instant feedback → system tracks attempts → stats update

---
