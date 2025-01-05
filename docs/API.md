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
| | path | `string` | | 
| | alt | `string` | |
| adress | | `string` | Unique key |
| isAdmin | | `boolean` | Defaults to false |
| isBusiness | | `boolean` | Defaults to false |
| createdAt | | `string` | Automatically generated on create |
| lockUntil | | `Date` |  Default value null |
| bio | | `string` |  Default value 'Welcome to my InstaPost profile page' |
| failedLoginAttempts | | `Number` |  Default value 0 |
---
### Post

| Field|| Type| Notes|
|-------------|--------|----------|------------------------------------|
|title|| `object` | taken from the object name of users collection|
|path|| `string` | Max length is 1024 characters|
|image|| `object`||
|| path|`string`| formData type of request|
||alt|`string`|Alt text for the image|
|bizNumber||`number`|Required, between 1000000 and 9999999|
| likes||`array`| Array of strings (user IDs who liked the post)|
| comments||`array`| Array of strings (user comments)|
| createdAt||`date`| Automatically generated at creation|
| user_id||`objectId`|References the user who created the post, required|

---

### ChatRoom
| Field| Type|Notes                                          |
|--------------|----------|------------------------------------------------|
| _id| `string` | Unique identifier for the chat|
| users|`array`| Array of user IDs who are part of the chat|
| createdAt| `date`| Automatically generated at creation|
| updatedAt | `date`| Automatically updated when changes occur |
| lastMessage| `string` | Reference to the last message ID in the chat|
| __v | `number` | Version key used by MongoDB for internal use   |

---

### Message

| Field| Type | Notes|
|--------------|-----------|-----------------------------------------------|
| _id | `string`  | Unique identifier for the message|
| chatRoom | `string`  | Reference to the chat room (chat ID)|
| content| `string`  | The content of the message  |
| sender| `string`  | Reference to the sender's user ID |
| timestamp| `date`| Timestamp when the message was sent |
| __v | `number`  | Version key used by MongoDB for internal use  |


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
        "path": "https://via.placeholder.com/150",
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
    "isBusiness": true
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
  - Returns an error if the login is unsuccessful.
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

#### Example Request Body:
```json
{
        "name": {
            "first": "linoy edit user",
            "middle": "pe'er",
            "last": "example",
        },
        "phone": "050-1234567",
        "email": "linoy.peer@example.com",
        "password": "$2a$10$S",
        "image": {
            "path": "https://via.placeholder.com/150",
            "alt": "profile image",
        },
        "address": {
            "state": "Tel Aviv",
            "country": "israel",
            "city": "tel aviv",
            "street": "shinkin",
            "houseNumber": 3,
            "zip": 12345,
        },
    }
```

### 6. **PATCH Change User Status**

- **Endpoint:** `users/:id/status`
- **Method:** `PATCH`
- **Authentication:** Required (Admin only)
- **Request Body:**
  - Fields: `isBusiness`.
- **Response:**
  - Returns the updated user status (business or guest).

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
  - Fields: `title`, `postStatus`, `image`, `bizNumber`, `likes`, `comments`.
- **Response:**
  - Returns the created post object.

  #### Example Response Body:
```json
{
    "_id": "675f135cf7f2fd8e1c464a3a",
    "postStatus": "my first post ❗",
    "image": {
        "path": "http://localhost:8181/uploads/1734284124745.png",
        "alt": "default alt",
        "_id": "675f135cf7f2fd8e1c464a3b"
    },
    "bizNumber": 5894752,
    "likes": [
        "675f1259f7f2fd8e1c4649f6"
    ],
    "user_id": "675f12d5f7f2fd8e1c464a1d",
    "chat_id": "675f135cf7f2fd8e1c464a39",
    "createdAt": "2024-12-15T17:35:24.788Z",
    "title": "ofek _ 25",
    "__v": 36,
    "comments": [
        {
            "userName": {
                "first": "linoy",
                "middle": "_",
                "last": "peer"
            },
            "userId": "675f1259f7f2fd8e1c4649f6",
            "userImage": "http://localhost:8181/uploads/1734283865742.jpg",
            "comment": "🤗",
            "commentId": "6761422fdcfb7bb3217698f9",
            "createdAt": "2024-12-17T09:19:43.737Z",
            "_id": "6761422fdcfb7bb3217698fd"
        }
    ]
}
```
### 2. **GET All Posts**

- **Endpoint:** `/posts`
- **Method:** `GET`
- **Response:**
  - Returns an array of Post objects.

```json
[
    {
        "_id": "675f135cf7f2fd8e1c464a3a",
        "postStatus": "My first post 🎉",
        "image": {
            "path": "http://localhost:8181/uploads/1734284124745.png",
            "alt": "default image",
            "_id": "675f135cf7f2fd8e1c464a3b"
        },
        "bizNumber": 5894752,
        "likes": [
            "675f1259f7f2fd8e1c4649f6"
        ],
        "user_id": "675f12d5f7f2fd8e1c464a1d",
        "chat_id": "675f135cf7f2fd8e1c464a39",
        "createdAt": "2024-12-15T17:35:24.788Z",
        "title": "Shlomi _ 30",
        "__v": 36,
        "comments": [
            {
                "userName": {
                    "first": "Yael",
                    "middle": "_",
                    "last": "Cohen"
                },
                "userId": "675f1259f7f2fd8e1c4649f6",
                "userImage": "http://localhost:8181/uploads/1734283865742.jpg",
                "comment": "💬",
                "commentId": "6761422fdcfb7bb3217698f9",
                "createdAt": "2024-12-17T09:19:43.737Z",
                "_id": "6761422fdcfb7bb3217698fd"
            }
        ]
    },
    {
        "_id": "675f135cf7f2fd8e1c464a3b",
        "postStatus": "New experiences 🚀",
        "image": {
            "path": "http://localhost:8181/uploads/1734284124746.png",
            "alt": "new image",
            "_id": "675f135cf7f2fd8e1c464a3c"
        },
        "bizNumber": 5894753,
        "likes": [
            "675f1259f7f2fd8e1c4649f7"
        ],
        "user_id": "675f12d5f7f2fd8e1c464a1e",
        "chat_id": "675f135cf7f2fd8e1c464a40",
        "createdAt": "2024-12-16T10:25:10.123Z",
        "title": "Maor _ 28",
        "__v": 42,
        "comments": [
            {
                "userName": {
                    "first": "Michal",
                    "middle": "_",
                    "last": "Rosenblum"
                },
                "userId": "675f1259f7f2fd8e1c4649f7",
                "userImage": "http://localhost:8181/uploads/1734283865743.jpg",
                "comment": "😎",
                "commentId": "6761422fdcfb7bb3217698fa",
                "createdAt": "2024-12-18T08:13:32.569Z",
                "_id": "6761422fdcfb7bb3217698fe"
            }
        ]
    }
]
```
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
  - Fields: `title`, `postStatus`, `image`, `bizNumber`.
- **Response:**
  - Returns the updated post object.


### 6. **PATCH Like Post**

- **Endpoint:** `/posts/:id`
- **Method:** `PATCH`
- **Authentication:** Required (Business users only)
- **Response:**
  - Adds/removes a like by the authenticated user.
  - Returns the post object with updated likes.

  #### Example Request Body (after clicking like): 
```json
{
    "_id": "675f135cf7f2fd8e1c464a3a",
    "postStatus": "my first post ❗",
    "image": {
        "path": "http://localhost:8181/uploads/1734284124745.png",
        "alt": "default alt",
        "_id": "675f135cf7f2fd8e1c464a3b"
    },
    "bizNumber": 5894752,
      "likes": [
            "675f1259f7f2fd8e1c4649f6"
        ],
    "user_id": "675f12d5f7f2fd8e1c464a1d",
    "chat_id": "675f135cf7f2fd8e1c464a39",
    "createdAt": "2024-12-15T17:35:24.788Z",
    "title": "ofek _ 25",
    "__v": 36,
    "comments": [
        {
            "userName": {
                "first": "linoy",
                "middle": "_",
                "last": "peer"
            },
            "userId": "675f1259f7f2fd8e1c4649f6",
            "userImage": "http://localhost:8181/uploads/1734283865742.jpg",
            "comment": "🤗",
            "commentId": "6761422fdcfb7bb3217698f9",
            "createdAt": "2024-12-17T09:19:43.737Z",
            "_id": "6761422fdcfb7bb3217698fd"
        }
    ]
}
```


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

  #### Example Request Body:
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
- **postStatus**
Adds a new comment to the specified post. Each comment is added as a string within an array of comments for the post.

- **Request Parameters**
- `id` (String): Unique identifier of the post to which the comment will be added.

- **Request Body**
- `comment` (String): The comment text to be added.
#### Example Request Body:
```json
{
    "comment": "This is a new comment"
}
```
#### Example Comment Part Response Body:
```json
    "comments": [
        {
            "userName": {
                "first": "linoy",
                "middle": "_",
                "last": "peer"
            },
            "userId": "6775bd9e7ad080e88541c5af",
            "userImage": "http://localhost:8181/uploads/1735769502322.jpg",
            "comment": "WOW!",
            "commentId": "6777d47656ecab9d05fe1976",
            "createdAt": "2025-01-03T12:13:42.769Z",
            "_id": "6777d47656ecab9d05fe197a"
        },
    ]
```
### Responses
- **201 Created**: Returns the updated post object with the new comment.
- **400 Bad Request**: If there’s an issue with the request, such as a missing or invalid comment or post ID.
- **404 Not Found**: If the post with the specified ID does not exist.
- **403 Unauthorized**: If the post with the specified ID does not exist.



## Additional Notes

Status Codes: Each endpoint will return the appropriate status code (200 for confirmations, 201 for creating new records, 400 for general request errors, 403 for unauthorized access, and 404 when the requested record is not found).

Authentication: Actions that require permissions will be secured with JWT for authorized users, and actions that require additional permissions, such as Admin status, will require further validation from the server.

### Headers:
```plaintext
x-auth-token : token of logged user