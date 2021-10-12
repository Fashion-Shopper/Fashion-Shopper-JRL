"use strict";
const productSeedData = require("./product-seed-data.json");

const {
  db,
  models: { User, Product, Brand },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users...
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  console.log(`seeded ${users.length} users`);

  // Creating Products...
  // Note (Riv): Mapping over data from seed.json file, creating data for db.
  const products = await Promise.all(
    productSeedData.map((product) => Product.create(product))
  );

  // Creating Brands...
  const brands = await Promise.all([
    Brand.create({
      name: "Comme des Garcons",
    }),
    Brand.create({
      name: "Helmut Lang",
    }),
    Brand.create({
      name: "Issey Miyake",
    }),
    Brand.create({
      name: "Junya Watanabe",
    }),
    Brand.create({
      name: "Kapital",
    }),
    Brand.create({
      name: "Raf Simons",
    }),
    Brand.create({
      name: "Undercover",
    }),
    Brand.create({
      name: "Yohji Yamamoto",
    }),
  ]);

  // Creating Product/Brand Associations...
  // Note (Riv): Mapping over products, connecting each product to respective brand.
  brands.forEach((brand) =>
    products.forEach((product) => {
      if (product.brandName === brand.name) product.brandId = brand.id;
    })
  );

  // Saving Product and Brand data..
  products.forEach((product) => product.save());
  brands.forEach((brand) => brand.save());

  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
