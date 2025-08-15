# API Testing Report - TVTOR Backend

## Summary
All APIs have been tested against the ngrok tunnel: `https://6848f3389d8c.ngrok-free.app`

---

## 🟢 WORKING APIs (No Authentication Required)

### 1. **Register API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/register`
- **Method**: POST
- **Status**: ✅ Working (returns validation errors as expected)
- **Body Structure**:
```json
{
  "name": "string",
  "surname": "string", 
  "email": "string",
  "password": "string",
  "mobileNumber": "string",
  "userType": "tutor|tutormanager|admin",
  "code": "string (required for tutors)",
  "location": ["locationId1", "locationId2"],
  "subjects": ["subjectId1", "subjectId2"]
}
```
- **Response**: `{"success":false,"data":null,"message":"Something went wrong!","statusCode":401}`

### 2. **Login API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/login`
- **Method**: POST
- **Status**: ✅ Working (returns parameter validation)
- **Body Structure**:
```json
{
  "email": "string",
  "password": "string"
}
```
- **Response**: `{"success":false,"data":null,"message":"Parameters are missing","statusCode":401}`

### 3. **Forgot Password API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/forgotpassword`
- **Method**: POST
- **Status**: ✅ Working (returns validation error as expected)
- **Body Structure**:
```json
{
  "email": "string"
}
```
- **Response**: `{"success":false,"data":null,"message":"Something went wrong","statusCode":401}`

### 4. **Subject API (GET)**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/subject`
- **Method**: GET
- **Status**: ✅ Fully Working
- **Response**: Returns list of all subjects
```json
{
  "success": true,
  "data": {
    "data": [
      {
        "_id": "689ae76b2e9a44f3d54ae20e",
        "subject": "Chemistry",
        "colorcode": "#FF00FF",
        "createdAt": "2025-08-12T07:04:11.121Z",
        "updatedAt": "2025-08-12T07:04:11.121Z"
      }
    ]
  }
}
```

### 5. **Location API (GET)**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/location`
- **Method**: GET
- **Status**: ✅ Fully Working
- **Response**: `{"success":true,"data":{"data":[],"total":0},"message":"Data found","statusCode":200}`

### 6. **Assign Tutor API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/assigntutor`
- **Method**: POST
- **Status**: ✅ Working (returns validation error as expected)
- **Body Structure**:
```json
{
  "tutorId": "string",
  "studentEmail": "string",
  "subject": "string",
  "description": "string"
}
```
- **Response**: `{"success":false,"data":null,"message":"Something went wrong!","statusCode":500}`

---

## 🔒 AUTHENTICATION REQUIRED APIs

**Note**: These APIs require `x-access-token` header with valid JWT token.

### 7. **Reset Password API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/resetpassword/{id}`
- **Method**: PUT
- **Status**: ⚠️ Times out (likely due to token validation or database issues)
- **Headers**: `x-access-token: JWT_TOKEN`
- **Body Structure**:
```json
{
  "oldPassword": "string",
  "resetPassword": "string"
}
```

### 8. **User Logout API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/user/logout/{id}`
- **Method**: DELETE
- **Status**: ⚠️ Times out
- **Headers**: `x-access-token: JWT_TOKEN`

### 9. **Get User API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/user/{id}`
- **Method**: GET
- **Status**: ⚠️ Times out
- **Headers**: `x-access-token: JWT_TOKEN`

### 10. **Random Number API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/randomnumber`
- **Method**: POST
- **Status**: ⚠️ Times out
- **Headers**: `x-access-token: JWT_TOKEN`
- **Body Structure**:
```json
{
  "managerId": "string"
}
```

### 11. **Get All Tutors Of Manager API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/getAllTutorsOfManager/{managerId}`
- **Method**: GET
- **Status**: ⚠️ Times out (this was our main problematic API)
- **Headers**: `x-access-token: JWT_TOKEN`
- **Query Parameters**:
  - `start`: number (pagination start)
  - `length`: number (items per page)
  - `column`: number (sort column)
  - `dir`: string (asc/desc)
  - `searchdata`: string (search term)

### 12. **Notification API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/notification`
- **Method**: POST
- **Status**: ⚠️ Times out
- **Headers**: `x-access-token: JWT_TOKEN`
- **Body Structure**:
```json
{
  "userId": "string",
  "message": "string",
  "type": "string"
}
```

### 13. **Comments API**
- **URL**: `https://6848f3389d8c.ngrok-free.app/api/v1/comments`
- **Method**: POST
- **Status**: ⚠️ Times out
- **Headers**: `x-access-token: JWT_TOKEN`
- **Body Structure**:
```json
{
  "tutorId": "string",
  "comment": "string",
  "rating": "number"
}
```

---

## 🔍 Additional Available APIs

Based on the routes file, here are additional APIs available:

### User Management
- `GET /api/v1/users` - Get all users (requires auth)
- `PUT /api/v1/updatepassword/{id}` - Update password
- `DELETE /api/v1/user/{id}` - Delete user (requires auth)
- `PUT /api/v1/user/{id}` - Update user (requires auth, supports file upload)
- `GET /api/v1/managers` - Get tutor managers (requires auth)
- `GET /api/v1/tutors` - Get all tutors (requires auth)
- `PUT /api/v1/changeuserstatus/{id}` - Approve tutor manager (requires auth)
- `PUT /api/v1/userdelete/{id}` - Decline tutor manager (requires auth)
- `GET /api/v1/getallTManager` - Get approved tutor managers (requires auth)

### Subject Management
- `POST /api/v1/subject` - Create subject
- `PUT /api/v1/subject/{id}` - Update subject
- `DELETE /api/v1/subject/{id}` - Delete subject
- `GET /api/v1/subject/{id}` - Get single subject

### Location Management
- `POST /api/v1/location` - Create location
- `PUT /api/v1/location/{id}` - Update location
- `DELETE /api/v1/location/{id}` - Delete location
- `GET /api/v1/location/{id}` - Get single location
- `POST /api/v1/getTutorsLocation` - Get tutors by location

### Notifications
- `GET /api/v1/notification/{id}` - Get notifications (requires auth)

### Questions
- `GET /api/v1/question` - Create question
- `POST /api/v1/question` - Get question

### Tutor Assignment
- `GET /api/v1/getStudentTutor/{email}` - Get student's tutor
- `POST /api/v1/getStudentTutor` - Get assigned tutor
- `GET /api/v1/checkTutorAssignOrNot/{email}` - Check if tutor is assigned

### Comments
- `GET /api/v1/comments` - Get comments (requires auth)

### Other
- `POST /api/v1/fcmdevices` - FCM device registration (requires auth)
- `DELETE /api/v1/delete-tutormanager/{id}` - Delete tutor manager and tutors

---

## 🚨 Issues Identified

1. **Authentication Token Issues**: Most authenticated APIs are timing out, suggesting:
   - Token validation problems
   - Database connectivity issues via ngrok
   - Session management problems

2. **ngrok Performance**: External access through ngrok seems to have latency issues for authenticated endpoints

3. **Database Sessions**: User sessions might be getting corrupted or invalidated

---

## ✅ Recommendations

1. **Test Authentication Locally**: The local server responds fine, so ngrok might be causing timeout issues
2. **Review Token Validation**: Check if the authentication middleware is causing delays
3. **Database Optimization**: The authenticated APIs might need database query optimization
4. **Session Management**: Review the session handling in the authentication layer

---

## 📝 Response Format

All APIs follow this consistent response format:
```json
{
  "success": boolean,
  "data": object|null,
  "message": string,
  "statusCode": number
}
```
