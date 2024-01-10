# Building a Twitter-like Backend Service - Omnipractice 🚀

## Objective:
The objective of this project was to develop a backend service emulating Twitter functionalities using a robust tech stack and modern methodologies. The service comprises key features including user authentication, message posting, following users, and retrieving personalized feeds.

## Technologies Used:

- **Database**: MongoDB - Utilized MongoDB's aggregation pipeline for optimized feed retrieval, ensuring efficient data fetching and manipulation. 🔄

- **Server**: AWS EC2 t2.micro instance - Deployed the backend service on a scalable and reliable AWS server. ☁️

## Technologies:

 - **Node.js**: Employed for the server-side logic, utilizing its non-blocking I/O model for efficient handling of concurrent requests.⚙️
- **Typescript and Javascript**: Leveraged Typescript for statically typed code, ensuring better code quality and readability. 📝

## Packages Utilized:

- **Joi**: Employed for request payload validations, enhancing the security and reliability of the service. 🔒
- **Mongoose**: Used Mongoose models for seamless interaction with the MongoDB database, providing a structured approach to data modeling. 🏗️
- **Nodemon**: Facilitated automatic server restarts during development, enhancing the development workflow. 🔄
- **Moment.js**: Utilized for efficient date and time manipulation, ensuring accurate timestamp management within the service. 🕒
- **bcrypt.js**: Employed for hashing passwords, enhancing user data security.  🔐
- **jsonwebtoken**: Utilized for generating and validating JSON web tokens, enabling secure authentication for each request. 🎫

## Service Architecture:

- **Routes**: Defined the API endpoints to handle incoming requests. 🛣️

- **Validations**: Ensured the validation of incoming requests, utilizing Joi for data validation, thus preventing malformed or malicious requests. ✅

- **Controller Layer**: Redirected incoming requests to their respective services, maintaining separation of concerns and enhancing code modularity. 🎯

- **Service Layer**: Contained the core business logic, executing database operations and orchestrating functionalities like user authentication, message posting, following users, and feed retrieval. 🛠️

- **Models**: Defined Mongoose models representing collections in the MongoDB database and facilitated the connection between the application and the database. 🗃️

- **Interfaces**: Employed types and interfaces to ensure type safety and maintain code clarity throughout the service. 🧩

## Optimization Highlights:

- **MongoDB Aggregation Pipeline**: Leveraged the power of MongoDB's aggregation pipeline to effectively fetch and manipulate data, particularly optimizing the feed retrieval process. This facilitated efficient chronological ordering and aggregation of messages for personalized feeds.
Conclusion:
The successful completion of this project has resulted in a robust Twitter-like backend service. The utilization of modern technologies, optimized database querying, and a well-structured architectural approach has ensured a scalable, secure, and performant solution. The service encompasses essential functionalities while prioritizing data security, validation, and code maintainability. 📈

## Conclusion:
The successful completion of this project has resulted in a robust Twitter-like backend service. The utilization of modern technologies, optimized database querying, and a well-structured architectural approach has ensured a scalable, secure, and performant solution. The service encompasses essential functionalities while prioritizing data security, validation, and code maintainability.  🎉



