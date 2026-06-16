# API Configuration Documentation

## Endpoint
**Base URL**: `https://jsonplaceholder.typicode.com`

### Available Endpoints
- **Users**: `/users` - Get all users/students
- **Posts**: `/posts` - Get all posts
- **Comments**: `/comments` - Get all comments

---

## API Service Usage

### Import API Config
Add this to your HTML file before using API functions:
```html
<script src="js/api-config.js"></script>
```

### Available Methods

#### 1. Get All Users
```javascript
const users = await apiService.getUsers();
```

#### 2. Get User by ID
```javascript
const user = await apiService.getUserById(1);
```

#### 3. Search Users by Keyword
```javascript
const results = await apiService.searchUsers("John");
```

#### 4. Get User Posts
```javascript
const posts = await apiService.getUserPosts(1);
```

---

## User Object Structure
```javascript
{
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: { lat: "-37.3159", lng: "81.1496" }
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: { name: "Romaguera-Crona", ... }
}
```

---

## Current Implementation
- **search.html** uses API service to fetch and search users
- **api-config.js** provides centralized API management
- All errors are caught and displayed user-friendly messages

---

## Notes
- JSONPlaceholder is a fake/mock API - perfect for testing
- All requests timeout after 10 seconds
- Search filters by: name, email, username, phone, company, and address
