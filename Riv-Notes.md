General Notes:

- client/store/products.js: should we chanage setProducts to \_setProducts? To keep things consistent
- ProductCard.js: Should we keep .99? or just change the json price data and add the .99?

Refactoring:

- Migrating Brands info (name, desc) to seperate seed.json file similar to producat-seed-data.json

Building Specific Product Page:

- [x] Create specificProduct Component
- [x] Sequelize
- [x] App.js: add Route
- [x] Make sure specific product is factored into action/thunk creators, store etc.

Building Brands Pages:

PART 1: All Brands Page

- [ ] Create Brands Component
- [ ] Sequelize
- [ ] App.js: add Route
- [ ] Make sure brands is factored into action/thunk creators, store etc.

PART 2: Single Brand Page

- [ ] Create singleBrand Component
- [ ] Sequelize
- [ ] App.js: add Route
- [ ] Make sure single brand is factored into action/thunk creators, store etc.

Building Admin Functionality:

- [ ] Add Routes for admin-specific pages
- [ ] Add admin-only apis
