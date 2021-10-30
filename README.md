#JRL ARCHIVES

JRL Archives is a FullStack vintage fashion e-commerce website where authenticated USERS can browse and select vintage clothing, add the items to a cart, checkout and leave reviews; and ADMINS can add, delete and update the information of products and users.

##Team Members
Jonathan, Riviere, Luna

##Featured Functionality 
* Checkout (implemented with Stripe API)
* Order History 
* Guest Cart
* User Settings 
* Browse by Brands 
* Admin-Only Users & Products Table, with Sorting and Pagination

##Design Highlights -- Implemented with Material UI (documentation)
* Product Grid and Product Cards
* NavBar Drop-down Menu
* Home Page Slide show

###Tech Stacks that we used:
* Node
* Express
* React/Redux
* JSON Web Token 
* Webpack
* Postgres
* Sequelize
* Material UI
* Stripe API
* Google Map API

##What We Learned:
###TEAMWORK 
* Discuss together  — UI/UX design, High-level system design / files structure, having a mock early on is super useful
* Each Teammate work on the Vertical change of a single component
* Using Trello

###ERROR HANDLING and CLEANING CODE 
* To prevent errors in deployment 
* Making Dynamic Routes—> More efficient coding

###LEARNING WHILE CODING
We learnt: Stripe API, MUI (Table, Grid, Slide Show, Drop-down Menu), Google Map


##Future Improvements:
* Filtering/Sorting/Pagination for Products Page
* Searching for Products 
* Responsive Design for Mobile Devices 

============================================================

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

  1.  `heroku create` or `heroku create your-app-name` if you have a
      name in mind.
  2.  `heroku config:set JWT=<your secret here!>` to set a secret for JWT signing

Database Setup

  3.  `heroku addons:create heroku-postgresql:hobby-dev` to add
      ("provision") a postgres database to your heroku dyno (This creates your production database)

  4.  `heroku config:set SEED=true` to get heroku to sync and seed your database

  5.   note everytime your app restarts, the database tables will be dropped and re-created. To avoid this you can `config:unset SEED`


* **If you already have a Heroku app...**

  1.  `heroku git:remote your-app-name` You'll need to be a
      collaborator on the app.


Now, you should be deployed!
