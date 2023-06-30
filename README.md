# Catering App

The Catering App is a web application built using Java/Spring for the backend and Angular for the frontend. It is designed to streamline catering operations by providing features for managing menus, orders, and customer information.
It is my first FullStack web application!

## Features

- **Menu Management**: Create, update, and delete menus with details such as name, description, price, and available options (e.g., vegetarian, gluten-free).
- **Order Management**: Place and manage customer orders, including selecting items from menus, specifying quantities, and adding special instructions.
- **Customer Management**: Maintain customer information, including contact details, order history, and preferences.
- **Authentication and Authorization**: Secure user authentication and role-based authorization for accessing different application features.

## Technologies Used

- **Backend**: Java with the Spring framework, including Spring Boot, Spring MVC, and Spring Data JPA.
- **Frontend**: Angular framework with TypeScript, HTML, and CSS.
- **Database**: Use any relational database supported by Spring Data JPA (e.g., MySQL, PostgreSQL).
- **Authentication**: Implement authentication and authorization using Spring Security and JSON Web Tokens (JWT).
- **RESTful API**: Communicate between the frontend and backend using RESTful APIs.
- **Dependency Management**: Use Maven for backend and npm for frontend to manage project dependencies.
- **Unit Testing**: Write unit tests for backend services and frontend components using JUnit and Jasmine/Karma, respectively.

## Prerequisites

To set up and run the Catering App locally, ensure you have the following installed:

- Java Development Kit (JDK) 11 or higher
- Maven build tool
- Node.js and npm (Node Package Manager)
- Angular CLI (Command Line Interface)
- Your preferred IDE for Java development (e.g., IntelliJ, Eclipse)
- Any relational database server (e.g., MySQL, PostgreSQL)

## Getting Started

Follow these steps to get the Catering App up and running:

1. Clone the repository:

```shell
git clone https://github.com/your-username/your-repo.git
```

2. Set up the backend:

   - Import the backend project into your IDE.
   - Configure the database connection in `application.properties` or `application.yml`.
   - Build and run the backend project using Maven or your IDE.

3. Set up the frontend:

   - Open a terminal and navigate to the frontend directory:

   ```shell
   cd your-repo/frontend
   ```

   - Install the frontend dependencies:

   ```shell
   npm install
   ```

   - Start the Angular development server:

   ```shell
   ng serve
   ```

4. Access the Catering App:

   - Open a web browser and visit [http://localhost:4200](http://localhost:4200).

## Configuration

Both the backend and frontend may have configuration files that can be customized to suit your environment or requirements. Refer to the respective documentation for more details.
