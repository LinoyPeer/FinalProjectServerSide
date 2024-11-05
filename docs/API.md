# API Documentation

## Response Types

### User

| field | | type | notes |
| -- | -- | -- | -- |
| name | | `object` | |
| | first | `string` | |
| | middle | `string` | |
| | last | `string` | |
| phone | | `string` | Is a valid Israeli phone number |
| email | | `string` |Unique key |
| password | | `string` | Trimmed, required, and unique key |
| image | | `object` | Including an uniqe key |
| | url | `string` | |
| | alt | `string` | |
| adress | | `string` | Unique key |
| isAdmin | | `boolean` | Defaults to false |
| isBusiness | | `boolean` | Defaults to false |
| createdAt | | `string` | Automatically generated on create |
---
### Post

| Field|| Type| Notes|
|-------------|--------|----------|------------------------------------|
|title|| `object` | Uses default validation|
|description|| `string` | Max length is 1024 characters|
|image|| `object`||
|| url|`string`| URL of the image|
||alt|`string`|Alt text for the image|
|bizNumber||`number`|Required, between 1000000 and 9999999|
| likes||`array`| Array of strings (user IDs who liked the post)|
| comments||`array`| Array of strings (user comments)|
| createdAt||`date`| Automatically generated at creation|
| user_id||`objectId`|References the user who created the post, required|

---

## Users API

**Base endpoint:** `/users`

### 1. **GET All Users**

- **Endpoint:** `/users`
- **Method:** `GET`
- **Authentication:** Required (Admin only)
- **Response:**
  - Returns an array of User objects if the requester has Admin privileges.
  - Returns a `403 Forbidden` status if the requester is not an Admin.

### 2. **POST New User**

- **Endpoint:** `/users`
- **Method:** `POST`
- **Request Body:**
  - Fields: `name`, `phone`, `email`, `password`, `image`, `address`, `isAdmin`, `isBusiness`.
- **Response:**
  - Returns the created user object along with the user ID.

### 3. **GET User by ID**

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Authentication:** Required
- **Response:**
  - Returns a single user object corresponding to the specified `id`.

### 4. **POST Login**

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Request Body:**
  - Fields: `email`, `password`.
- **Response:**
  - Returns a token if the login is successful.

### 5. **PUT Edit User**

- **Endpoint:** `/users/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Request Body:**
  - Fields: Any editable fields in `User`.
- **Response:**
  - Returns the updated user object.

### 6. **PATCH Change User Status**

- **Endpoint:** `/users/:id/status`
- **Method:** `PATCH`
- **Authentication:** Required (Admin only)
- **Request Body:**
  - Fields: `isAdmin`, `isBusiness`.
- **Response:**
  - Returns the updated user status.

### 7. **DELETE User**

- **Endpoint:** `/users/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **Response:**
  - Returns a confirmation message for the deleted user.

---

## Posts API

**Base endpoint:** `/posts`

### 1. **POST Create Post**

- **Endpoint:** `/posts`
- **Method:** `POST`
- **Authentication:** Required (Business users only)
- **Request Body:**
  - Fields: `title`, `description`, `image`, `bizNumber`, `likes`, `comments`.
- **Response:**
  - Returns the created post object.

### 2. **GET All Posts**

- **Endpoint:** `/posts`
- **Method:** `GET`
- **Response:**
  - Returns an array of Post objects.

### 3. **GET User’s Posts**

- **Endpoint:** `/posts/my-posts`
- **Method:** `GET`
- **Authentication:** Required
- **Response:**
  - Returns an array of posts created by the authenticated user.

### 4. **GET Post by ID**

- **Endpoint:** `/posts/:id`
- **Method:** `GET`
- **Response:**
  - Returns a single post object corresponding to the specified `id`.

### 5. **PUT Update Post**

- **Endpoint:** `/posts/:id`
- **Method:** `PUT`
- **Authentication:** Required
- **Request Body:**
  - Fields: `title`, `description`, `image`, `bizNumber`.
- **Response:**
  - Returns the updated post object.

### 6. **PATCH Like Post**

- **Endpoint:** `/posts/:id`
- **Method:** `PATCH`
- **Authentication:** Required
- **Response:**
  - Adds/removes a like by the authenticated user.
  - Returns the post object with updated likes.

### 7. **DELETE Post**

- **Endpoint:** `/posts/:id`
- **Method:** `DELETE`
- **Authentication:** Required
- **Response:**
  - Returns a confirmation message for the deleted post.

---

## Additional Notes

- **Status Codes**: כל אנדפונט יחזיר את הסטטוס קוד המתאים (`200` לאישורים, `201` ליצירת רשומות חדשות, `400` לשגיאות כלליות בבקשה, `403` עבור אי אישור גישה, ו-`404` כשלא נמצאה הרשומה המבוקשת).
- **Authentication**: פעולות הדורשות הרשאות יהיו מאובטחות על ידי JWT עבור משתמשים מוסמכים, ופעולות הדורשות הרשאות נוספות כגון סטטוס מנהל (Admin) יצטרכו אימות נוסף מצד השרת.