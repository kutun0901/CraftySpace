# CraftySpace

Welcome to our Harry Potter-themed store, an online shopping site where you can find a variety of goods drawn from fantastical imagination universe. Our website, an clone of Etsy, sells a variety of goods, from handcrafted crafts to officially licensed goods. We provide everything you need, including wands, clothing, home decor, and even trendy fashion. Visit our website to learn more: [CraftySpace](https://craftyspace.onrender.com)


## This project is built with:
  * Back-end: Python, Postgres, Flask, SQLite
  * Front-end: JavaScript, React, Redux, HTML, CSS
  * Hosting: Render
  
## Wiki links:
  * [API documentation](https://github.com/kutun0901/CraftySpace/wiki/API-documentation)
  * [Database schema](https://github.com/kutun0901/CraftySpace/wiki/Database-Schema)
  * [Feature list](https://github.com/kutun0901/CraftySpace/wiki/MVP-List)
  
  
## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Landing Page

![Screen Shot 2023-03-31 at 11 01 17 AM](https://user-images.githubusercontent.com/113473441/229198213-77856a8b-507c-4f82-b280-0bf734e1cb31.png)


## Product details page

![Screen Shot 2023-03-31 at 11 15 31 AM](https://user-images.githubusercontent.com/113473441/229198522-9921e186-27a4-452c-b61d-b1feba374186.png)

## Shopping cart

![Screen Shot 2023-03-31 at 11 16 59 AM](https://user-images.githubusercontent.com/113473441/229198802-595d9482-97ab-4503-bb8f-34a5eb5b47e5.png)

## Manage product listings page

![Screen Shot 2023-03-31 at 11 22 34 AM](https://user-images.githubusercontent.com/113473441/229199849-8a5938ce-68f0-4a89-a631-a039a765d0c0.png)


## Future Implementation 
  * Search
  * Order
  * Categories
  * Favorites
  * AWS

