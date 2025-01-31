# Menu Management
## Assignemnt NodeJS Backend

This is a Node.js backend server for managing menu items categorized into Categories, Subcategories, and Items. The server provides APIs to create, retrieve, update, and search these entities.

## Features
- Create, get, update, and delete categories, subcategories, and items.
- Search items by name or ID.
- API documentation with Postman.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/) or a cloud MongoDB service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Postman](https://www.postman.com/) To test the API endpoints

## Installation

Follow these steps to run the application locally:

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/item-management-api.git
cd item-management-api
```

### 2. Clone the Repository

```bash
npm install
```

### 3. Setup Environment Variables

Create a .env file in the root directory and add your MongoDB URI:

```bash
MONGO_URI=mongodb://<your_mongo_connection_string>
PORT=5000
```

## Running the Application

Once the dependencies are installed and the .env file is configured, run the application with the following command:

```bash
npm start
```

The application will be running on http://localhost:5000.

To run the server in development mode with live reloading:

```bash
npm run dev
```

## API Endpoints

### Categories

- **GET** `/api/categories`
Retrieve all categories.

- **GET** `/api/categories/search?id=<categoryId>` or `/api/categories/search?name=<categoryName>`
Retrieve a category by ID or name.

- **POST** `/api/categories`
Create a new category.
Body: `{ name: string, image: string, description: string, taxApplicability: boolean, tax: number, taxType: string }`

- **PUT** `/api/categories/:idOrName`
Update a category's details.

### Subcategories

- **GET** `/api/subcategories`
Retrieve all subcategories.

- **GET** `/api/subcategories/search?id=<subcategoryId>` or `/api/subcategories/search?name=<subcategoryName>`
Retrieve a subcategory by ID or name.

- **GET** `/api/subcategories/category/:categoryIdOrName`
Get all subcategories under a specific category.

- **POST** `/api/subcategories`
Create a new subcategory under a category.
Body: `{ name: string, image: string, description: string, taxApplicability: boolean, tax: number }`

- **PUT** `/api/subcategories/:idOrName`
Update a subcategory's details.

### Items

- **GET** `/api/items`
Retrieve all items.

- **GET** `/api/items/search?id=<itemId>` or `/api/items/search?name=<itemName>`
Retrieve an item by ID or name.

- **GET** `/api/items/category/:categoryId`
Get all items under a category.

- **GET** `/api/items/subcategory/:subcategoryId`
Get all items under a subcategory.

- **POST** `/api/items`
Create a new item.
Body: `{ name: string, image: string, description: string, taxApplicability: boolean, tax: number, baseAmount: number, discount: number, totalAmount: number }`

- **PUT** `/api/items/:idOrName`
Update an item’s details.

### Search

- **GET** `/api/items/search?name=<itemName>`
Search for an item by name.

## Code Structure

Here is an overview of the project structure:
```bash
.
├── config/
│   └── db.js              # Database connection setup (MongoDB)
├── controllers/
│   ├── categoryController.js  # Logic for category-related API routes
│   ├── subcategoryController.js # Logic for subcategory-related API routes
│   └── itemController.js      # Logic for item-related API routes
├── models/
│   ├── categoryModel.js      # Category model schema (MongoDB)
│   ├── subcategoryModel.js   # Subcategory model schema
│   └── itemModel.js          # Item model schema
├── routes/
│   ├── categoryRoutes.js     # Routes for category-related API
│   ├── subcategoryRoutes.js  # Routes for subcategory-related API
│   └── itemRoutes.js         # Routes for item-related API
├── .env                     # Environment variables (MongoDB URI, PORT, etc.)
├── server.js                # Main entry point for the application
└── package.json             # Project dependencies and scripts
```

## Questions & Answers

### Q1. Which database did you choose and why?

I chose MongoDB because it is a flexible NoSQL database that fits well with the hierarchical structure of categories, subcategories, and items, allowing easy expansion and scalability.

### Q2. 3 things I learned from this assignment:

- How to set up a Node.js backend server with Express and MongoDB.
- The importance of building RESTful APIs for managing resources in an organized manner.
- How to handle different CRUD operations effectively with proper validation.

### Q3. What was the most difficult part of the assignment?

The most difficult part was managing the relationships between categories, subcategories, and items efficiently, especially ensuring that data is correctly updated and retrieved.

### Q4. What would you have done differently given more time?

Given more time, I would add additional features like pagination for fetching large sets of data, implement authentication/authorization, and enhance error handling across all endpoints.


