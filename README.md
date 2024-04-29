# Fastfood UI

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Class Descriptions](#class-descriptions)
- [Dependencies](#dependencies)

## Project Overview

This project is a frontend application for managing restaurants and orders in a fast-food establishment. It provides a user interface for managers to create,update and display restaurants, as well as for customers to creating orders.

### Features

- **Restaurant Management**: Create, display, and edit restaurant details.
- **Order Management**: Create, display, and edit customer orders.
- **Role-based Authentication**: Differentiate between restaurant owners and customers using role-based authentication.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```sh
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```sh
   cd <project_directory>
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

## Usage

After installation, start the development server:

```sh
npm start
```

Access the application in your web browser at http://localhost:3001.

## Project Structure

The project structure is organized as follows:

- `src/`: Contains all source code files.
  - `packages/`: Packages directory.
    - `app/`: Main application directory.
      - `App.js`: Main application component.Routing the pages.    
      - `components/`: Reusable components used across different views.
        - `Layout.js`: Defines the layout structure for different pages.
      - `navbar/`: Reusable Navbar.
        - `Navbar.js`: Navigation bar component.
      - `error/`: Contains components related to error handling.
        - `NotFoundPage.js`: Component for displaying a 404 error page.
      - `login/`: Contains components for login functionality.
        - `Login.js`: Login component.
      - `order/`: Contains components related to order management.
        - `OrderCreation.js`: Component for creating a new order.
        - `OrderDisplay.js`: Component for displaying order details.
        - `EditOrder.js`: Component for editing an existing order.
      - `restaurant/`: Contains components related to restaurant management.
        - `RestaurantCreation.js`: Component for creating a new restaurant.
        - `RestaurantDisplay.js`: Component for displaying restaurant details.
        - `EditRestaurant.js`: Component for editing an existing restaurant.
      - `theme/`: Contains theme-related files.
        - `ThemeProvider.js`: ThemeProvider so that we can use the same theme within the application. 
    - `index.js`: Entry point of the application.
- `public/`: Contains static assets and HTML template for the application.
- `node_modules/`: Contains project dependencies.
- `package.json`: Manifest file containing project metadata and dependencies.
- `README.md`: Project documentation.

## Class Descriptions

- `Login`: Renders the login page and handles user authentication.
- `Layout`: Defines the layout structure for different pages by wrapping them with a common layout component.
- `RestaurantCreation`: Allows restaurant owners to create a new restaurant.
- `OrderCreation`: Allows customers to create a new order.
- `RestaurantDisplay`: Displays details of a restaurant.
- `OrderDisplay`: Displays details of an order.
- `NotFoundPage`: Displays a 404 error page when a route is not found.

## Dependencies

- **React**: JavaScript library for building user interfaces.
- **Material-UI**: React component library implementing Google's Material Design.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Router DOM**: Declarative routing for React applications.
- **Docker**: Containerization platform for building, shipping, and running applications.
