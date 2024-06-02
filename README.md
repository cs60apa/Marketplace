# Lupleg Marketplace - README

## Description

- A marketplace for buying and selling products. Users can create an account, login, and post products for sale. Users can also view products for sale and purchase them.
- When a user purchases a product, the product is removed from the marketplace and the user who posted the product is credited with the purchase amount.

## Features

- User authentication
- User account creation
- User login
- User logout
- User account deletion
- Product creation
- Product viewing
- Product purchasing
- Product deletion

## Technologies

- JavaScript
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bcrypt.js
- Tailwind CSS
- Dotenv
- Express-session
- Connect-mongo
- Multer
- Cloudinary
- Nodemailer
- Express-validator
- Morgan
- Nodemon

## Installation

1. Clone the repository
2. Run `npm install` to install dependencies
3. Create a `.env` file in the root directory and add the following environment variables:

```
PORT=5000
MONGODB_URI=your_mongodb_uri
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SENDGRID_API_KEY=your_sendgrid_api_key
EMAIL_FROM=your_email
```

## Usage

1. Run `npm start` to start the server
2. Visit `http://localhost:5000/hello` in your browser (For testing purposes)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

```

```
