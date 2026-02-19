# COMP3133 – Assignment 1 (Employee Management System Backend)

**Student Name:** Joel Chandra Paul  
**Student ID:** 101512597  

## Tech Stack
- Node.js + Express
- Apollo Server (GraphQL)
- MongoDB Atlas (Mongoose)
- Cloudinary (employee photo storage)
- Postman (testing)

## Setup Instructions
1. Install dependencies:
   ```bash
   npm install

2. Create a .env file in the project root:

    MONGO_URI=your_mongodb_atlas_connection_string
    PORT=4000
    JWT_SECRET=your_long_secret

    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret

3. Run the server:
    npm run dev

Endpoints
- GraphQL: http://localhost:4000/graphql
- Photo Upload (REST): http://localhost:4000/upload/employee-photo

Sample Login (for marking)
- Email: admin@comp3133.com
- Password: Admin123
   