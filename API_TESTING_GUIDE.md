# 🧪 TVTOR Backend API Testing Guide

## 📋 **Testing Options Available**

I've created **3 different approaches** to test all your APIs systematically:

### **Option 1: Quick Shell Script Test** ⚡
```bash
# Run the automated shell script
./test-apis.sh
```
**Pros:** Fast, simple, works immediately  
**Cons:** Basic output, manual inspection needed

### **Option 2: Postman Collection** 🎯 *(RECOMMENDED)*
```bash
# Import this file into Postman:
TVTOR-API-Tests.postman_collection.json
```
**Pros:** Professional UI, easy debugging, save test cases  
**Cons:** Requires Postman installation

### **Option 3: Automated Node.js Test Suite** 🤖
```bash
# Run comprehensive automated tests
node test-apis.js
```
**Pros:** Detailed reporting, automatic pass/fail, comprehensive  
**Cons:** Requires additional dependencies

---

## 🚀 **Quick Start - Run Tests Now**

### **Immediate Testing (Shell Script)**
```bash
# Make sure your server is running
npm start

# In another terminal, run:
cd /Users/clustoxuser/Documents/personal_projects/tvtorbackend
./test-apis.sh
```

### **Comprehensive Testing (Node.js)**
```bash
# Run the automated test suite
node test-apis.js
```

---

## 📊 **API Endpoints Coverage**

### **✅ Authentication & User Management**
- `POST /register` - User registration
- `POST /login` - User authentication  
- `POST /forgotpassword` - Password reset
- `GET /users` - Get all users
- `GET /managers` - Get all managers (auth required)
- `GET /tutors` - Get all tutors (auth required)
- `GET /user/:id` - Get user by ID (auth required)
- `PUT /user/:id` - Update user (auth required)
- `DELETE /user/:id` - Delete user (auth required)

### **📚 Subject Management**
- `POST /subject` - Create subject
- `GET /subject` - Get all subjects
- `GET /subject/:id` - Get single subject
- `PUT /subject/:id` - Update subject
- `DELETE /subject/:id` - Delete subject

### **📍 Location Management**
- `POST /location` - Create location
- `GET /location` - Get all locations
- `GET /location/:id` - Get single location
- `PUT /location/:id` - Update location
- `DELETE /location/:id` - Delete location
- `POST /getTutorsLocation` - Get tutors by location

### **❓ Question Management**
- `GET /question` - Get questions
- `POST /question` - Create/process question

### **👨‍🏫 Tutor Assignment**
- `POST /assigntutor` - Assign tutor to student
- `GET /getStudentTutor/:email` - Get student's tutor
- `POST /getStudentTutor` - Get assigned tutor
- `GET /checkTutorAssignOrNot/:email` - Check assignment status

### **🔔 Notification System** *(Auth Required)*
- `POST /notification` - Create notification
- `GET /notification/:id` - Get user notifications

### **💬 Comment System** *(Auth Required)*
- `POST /comments` - Create comment
- `GET /comments` - Get all comments

### **🔧 Utility Endpoints**
- `POST /randomnumber` - Generate random number (auth required)
- `POST /fcmdevices` - Register FCM device (auth required)
- `DELETE /user/logout/:id` - User logout (auth required)

---

## 🎯 **Recommended Testing Strategy**

### **Phase 1: Basic Functionality**
1. Test server connectivity
2. Test subject and location CRUD operations (no auth needed)
3. Test question endpoints

### **Phase 2: Authentication Flow**
1. Register a test user
2. Login and get auth token
3. Test protected endpoints with token

### **Phase 3: Business Logic**
1. Test tutor assignment workflow
2. Test notification system
3. Test comment system

### **Phase 4: Edge Cases**
1. Test with invalid data
2. Test unauthorized access
3. Test missing parameters

---

## 🔍 **Using the Test Results**

### **Expected Success Scenarios:**
- ✅ Server connectivity works
- ✅ Basic CRUD operations (subjects, locations)
- ✅ User registration and login
- ✅ Token-based authentication

### **Common Issues to Check:**
- ❌ Database connection errors
- ❌ Missing required fields
- ❌ Authorization token issues
- ❌ File upload problems

---

## 📝 **Manual Testing with cURL Examples**

```bash
# Test basic connectivity
curl http://localhost:5000/

# Test subject creation
curl -X POST http://localhost:5000/api/v1/subject \
  -H "Content-Type: application/json" \
  -d '{"name":"Math","description":"Mathematics"}'

# Test user registration
curl -X POST http://localhost:5000/api/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 🛠 **Debugging Tips**

### **If Tests Fail:**
1. **Check server logs** - Look at the terminal running `npm start`
2. **Verify MongoDB** - Ensure MongoDB is running: `brew services list | grep mongodb`
3. **Check network** - Ensure port 5000 is not blocked
4. **Database state** - Some tests might fail if data already exists

### **Common Error Responses:**
- `401 Unauthorized` - Missing or invalid auth token
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Endpoint doesn't exist
- `500 Internal Server Error` - Server/database issue

---

## 📊 **Test Environment Setup**

### **Prerequisites:**
- ✅ Server running on port 5000
- ✅ MongoDB running and connected
- ✅ All dependencies installed

### **Test Data:**
The test scripts will create:
- Test users with random emails
- Test subjects and locations
- Test comments and notifications

**Note:** Test data will be stored in your development database.

---

## 🎉 **Getting Started**

**Choose your preferred testing method and run it now:**

```bash
# Option 1: Quick shell test
./test-apis.sh

# Option 2: Comprehensive automated test
node test-apis.js

# Option 3: Import Postman collection
# File: TVTOR-API-Tests.postman_collection.json
```

**Happy Testing! 🚀**
