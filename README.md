## Wine Shope


## Idea
Wine Shop app is an application that allows authorized users to create new products. Unauthorized user could buy products. Authorized users could create, edit and delete products created by themself.

## Public part
* Unauthorized user
  * User has access to register page.
  * User has access to login page.
  * User has access to shope page.
  * Shope page list all products in wine shope.
  * User has access to cart page.
## Private part
* Authorized user
  * User could add a new product.
  * User has access to all created products by themself.
## Functionality
* Add product
  * All input fields are required.
  * Choose a file from file system and upload it to cloudinary storage.
* Products
  * Unauthorized part 'shop' page list all products in wine shop.
  * Authorized part 'my products' page list only logged in user.
  * Authorized and unauthorized users has access to details for each product after click over product card.
  * Only Unauthorized users could add product to cart and complete order.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Server Project setup
```
npm install
```
## Start server REST API
```
npm start
```

## Client Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and minifies for production
```
npm run build
```

### Run unit tests
```
npm run test
```

### Remove the single build dependency from your project
```
npm run eject
```

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**


