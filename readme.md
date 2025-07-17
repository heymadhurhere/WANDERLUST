# Wanderlust

Wanderlust is a full-stack web application that allows users to browse, add, and manage vacation rental listings. It is built with Node.js, Express, and MongoDB, and it features a RESTful API for handling listings.

## Features

* **View All Listings:** Browse through a comprehensive list of available rental properties.
* **View Listing Details:** See more information about a specific property, including its description, price, and location.
* **Create New Listings:** Add new properties to the database.
* **Edit Existing Listings:** Update the information for any given property.
* **Delete Listings:** Remove properties from the database.

## Technologies Used

* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **ODM:** Mongoose
* **Templating Engine:** EJS
* **Middleware:** method-override

## Getting Started

### Prerequisites

* Node.js installed
* MongoDB installed and running

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/wanderlust.git](https://github.com/your-username/wanderlust.git)
    cd wanderlust
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up the database:**
    * Make sure your MongoDB server is running.
    * The application connects to a MongoDB database named `wanderlust` at `mongodb://127.0.0.1:27017/wanderlust`. You can change this URL in `app.js` and `init/index.js` if needed.

4.  **Initialize the database with sample data:**
    ```sh
    node init/index.js
    ```

5.  **Start the server:**
    ```sh
    node app.js
    ```
    The server will start on port 8080.

## Project Structure

```
.
├── app.js              # Main application file
├── init
│   ├── data.js         # Sample data for listings
│   └── index.js        # Database initialization script
├── models
│   └── listing.js      # Mongoose schema for listings
├── package-lock.json   # Exact versions of dependencies
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

## API Routes

The following are the main routes available in the application:

| HTTP Method | Path                  | Description                      |
| :---------- | :-------------------- | :------------------------------- |
| `GET`       | `/listings`           | Get all listings                 |
| `GET`       | `/listings/new`       | Show form to create a new listing|
| `GET`       | `/listings/:id`       | Get a single listing by ID       |
| `POST`      | `/listings`           | Create a new listing             |
| `GET`       | `/listings/:id/edit`  | Show form to edit a listing      |
| `PUT`       | `/listings/:id`       | Update a listing by ID           |
| `DELETE`    | `/listings/:id`       | Delete a listing by ID           |
```