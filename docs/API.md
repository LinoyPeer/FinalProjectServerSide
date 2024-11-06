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
| lockUntil | | `Date` |  Default value null |
| failedLoginAttempts | | `Number` |  Default value 0 |
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
#### Example Request Body:
```json
{
    "name": {
        "first": "BUSINESS",
        "middle": "USER",
        "last": "FOR DECOMONTATION"
    },
    "phone": "050-1234567",
    "email": "BUSINESS@gmail.com",
    "password": "securePassword123",
    "image": {
        "url": "https://via.placeholder.com/150",
        "alt": "Profile Image"
    },
    "address": {
        "state": "Tel Aviv",
        "country": "Israel",
        "city": "Tel Aviv",
        "street": "Shinkin",
        "houseNumber": "3",
        "zip": "12345"
    },
    "isAdmin": false,
    "isBusiness": false
}
```

### 3. **GET User by ID**

- **Endpoint:** `/users/:id`
- **Method:** `GET`
- **Authentication:** Required Required (Admin only)
- **Response:**
  - Returns a single user object corresponding to the specified `id`.

### 4. **POST Login**

- **Endpoint:** `/users/login`
- **Method:** `POST`
- **Request Body:**
  - Fields: `email`, `password`.
- **Response:**
  - Returns a token if the login is successful.
#### Example Request Body:
```json
{
    "email": "BUSINESS@gmail.com",
    "password": "securePassword123"
}
```
### 5. **PUT Edit User**

- **Endpoint:** `/users/:id`
- **Method:** `PUT`
- **Authentication:** Required (user's own info of admin only)
- **Request Body:**
  - Fields: Any editable fields in `User`.
- **Response:**
  - Returns the updated user object.

```json
{
        "name": {
            "first": "linoy edit user",
            "middle": "pe'er",
            "last": "example",
            "_id": "670e63bdbee8c2f3831a5a3d"
        },
        "phone": "050-1234567",
        "email": "linoy.peer@example.com",
        "password": "$2a$10$cfYRoE1LixspWoptbaedlOeQ/G/zF8C.CA7XhMI7IkVMeg5HAT.mS",
        "image": {
            "url": "https://via.placeholder.com/150",
            "alt": "profile image",
            "_id": "670e63bdbee8c2f3831a5a3e"
        },
        "address": {
            "state": "Tel Aviv",
            "country": "israel",
            "city": "tel aviv",
            "street": "shinkin",
            "houseNumber": 3,
            "zip": 12345,
            "_id": "670e63bdbee8c2f3831a5a3f"
        },
        "isAdmin": false,
        "isBusiness": false,
        "createdAt": "2024-10-15T12:44:45.917Z",
        "__v": 0
    }
```

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
- **Authentication:** Required (Admin only)
- **Response:**
  - Returns a confirmation message for the deleted user.

---

## Posts API

**Base endpoint:** `/posts`

### 1. **POST Create Post**

- **Endpoint:** `/posts`
- **Method:** `POST`
- **Authentication:** Required (Business users or admin only)
- **Request Body:**
  - Fields: `title`, `description`, `image`, `bizNumber`, `likes`, `comments`.
- **Response:**
  - Returns the created post object.
```json
{
  "title": "create new post Garden Flowers",
  "postStatus": "Spring is here and the flowers are blooming everywhere! Loving the vibrant colors and fresh smells of nature.",
  "image": {
    "url": "https://images.app.goo.gl/HymjtKTWAMRbjqmw8",
    "alt": "Flower garden"
  },
  "user_id": "67262ddbe519deea9c89c8e0"
}
```
### 2. **GET All Posts**

- **Endpoint:** `/posts`
- **Method:** `GET`
- **Response:**
  - Returns an array of Post objects.

### 3. **GET User’s Posts**

- **Endpoint:** `/posts/my-posts`
- **Method:** `GET`
- **Authentication:** Required (user's posts or admin only)
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
- **Authentication:** Required (user's post or admin only)
- **Request Body:**
  - Fields: `title`, `description`, `image`, `bizNumber`.
- **Response:**
  - Returns the updated post object.

### Example Request
```json
{
  "title": "Delightful Garden Flowers",
  "postStatus": "Spring is here and the flowers are blooming everywhere! Loving the vibrant colors and fresh smells of nature.",
  "image": {
    "url": "https://images.app.goo.gl/HymjtKTWAMRbjqmw8",
    "alt": "Flower garden"
  },
  "user_id": "67262ddbe519deea9c89c8e0"
}
```

### 6. **PATCH Like Post**

- **Endpoint:** `/posts/:id`
- **Method:** `PATCH`
- **Authentication:** Required (Business users only)
- **Response:**
  - Adds/removes a like by the authenticated user.
  - Returns the post object with updated likes.

### 7. **DELETE Post**

- **Endpoint:** `/posts/:id`
- **Method:** `DELETE`
- **Authentication:** Required (user's post or admin only)
- **Response:**
  - Returns a confirmation message for the deleted post.

### 8. **PATCH Update Post's Biz Number**

- **Endpoint:** `/posts/:id`
- **Method:** `PATCH`
- **Authentication:** Required (Business users only)
- **Request Body:**
  - `bizNumber`: 7-digit number (between 1000000 and 9999999)
- **Response:**
  - Returns the updated post object with the new `bizNumber`.
```json
{
    "newBizNumber":4584122
}
```
### 9. **Add Comment to a Post**

### Endpoint
- **POST** `/posts/:id/comments`
- **Authentication:** Required (Business users or admin only)
- **Request Body:**
  - `comments`: string
- **Response:**
  - Returns an array of comments .
- **Description**
Adds a new comment to the specified post. Each comment is added as a string within an array of comments for the post.

- **Request Parameters**
- `id` (String): Unique identifier of the post to which the comment will be added.

- **Request Body**
- `comment` (String): The comment text to be added.
### Example Request
```json
{
    "comment": "This is a new comment"
}
```
### Responses
- **201 Created**: Returns the updated post object with the new comment.
- **400 Bad Request**: If there’s an issue with the request, such as a missing or invalid comment or post ID.
- **404 Not Found**: If the post with the specified ID does not exist.



## Additional Notes

Status Codes: Each endpoint will return the appropriate status code (200 for confirmations, 201 for creating new records, 400 for general request errors, 403 for unauthorized access, and 404 when the requested record is not found).

Authentication: Actions that require permissions will be secured with JWT for authorized users, and actions that require additional permissions, such as Admin status, will require further validation from the server.

### Headers:
```plaintext
x-auth-token (admin): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI2MmRkYmU1MTlkZWVhOWM4OWM4ZTAiLCJpc0FkbWluIjpmYWxzZSwiaXNCdXNpbmVzcyI6dHJ1ZSwiaWF0IjoxNzMwOTA4NDQ3fQ.StOfKt95oF4-FTaO8SBfMCAt9Ud_5vTAnSpRshsBWUM

x-auth-token (business): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzJiYjkyOWRmMTc1M2VjMjYyNTI3OTMiLCJpc0FkbWluIjpmYWxzZSwiaXNCdXNpbmVzcyI6ZmFsc2UsImlhdCI6MTczMDkxODcwMX0.r_dXTrIUB1XzNw0ERfNbxf-maq8pPr-PjLpYcoW4ijA

x-auth-token (guest): eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzJiYjhlZmRmMTc1M2VjMjYyNTI3OGMiLCJpc0FkbWluIjpmYWxzZSwiaXNCdXNpbmVzcyI6ZmFsc2UsImlhdCI6MTczMDkxODY1Mn0.GedCvlfQzd-jQSOuJptK3gMb3qsQjePifPvkFRBrB7w
---