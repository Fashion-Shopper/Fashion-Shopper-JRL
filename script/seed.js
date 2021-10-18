"use strict";
const productSeedData = require("./product-seed-data.json");

const {
  db,
  models: { User, Product, Brand },
} = require("../server/db");
const Order = require("../server/db/models/Order");

//for images/avatar
const path = require('path');
const fs = require('fs');
const OrderItem = require("../server/db/models/OrderItem");

//To Work On Later 
// const loadImage = (imagePath) =>{
//   return new Promise((res, rej)=> {
//     fs.readFile(imagePath, 'base64', (err,data)=>{
//     if(err){
//       rej(err);
//     }
//     else{
//       res(`data:image/png;base64,${data.toString()}`); //?
//     }
//   })
// })
// }


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
    User.create({ username: "murphy", password: "123", isAdmin: true }),
  ]);

  // const cody = users[0]

  console.log(`seeded ${users.length} users`);
  //avatar
  //Later 
  // cody.avatar = await loadImage(__dirname, 'square.png')

  // Creating Products...
  // Note (Riv): Mapping over data from seed.json file, creating data for db.
  const products = await Promise.all(
    productSeedData.map((product) => Product.create(product))
  );

  // Creating Brands...
  const brands = await Promise.all([
    Brand.create({
      name: "Comme des Garcons",
      description:
        "Comme Des Garçons in french simply means 'like boys', with the brand of the same phrase being created by the Japanese mastermind Rei Kawakubo. She first founded the label in 1969 in Tokyo and it quickly began to gain popularity in the 70’s. CDG released its first menswear line in 1978 with their first ever runway show in Paris a few years later in 1981. The brand was often associated with a thrashed-punk style and many of her early collections were well received during the 80’s and 90’s despite her uncommon creative style. From early on, CDG had many different sub-labels under their umbrella such as CDG Homme Plus and CDG Noir, but by the early 2000’s designers like Junya Watanabe and Fumitu Ganryu had their own lines under the CDG label as well. Each of these lines has its own purpose, while other lines were specific to wallets, fragrances, jewelry, and swimwear. With the creation of Dover Street Market in 2004, the CDG Play line gained popularity quickly and offered casual streetwear catering to a younger audience in a more accessible price range. The Play line is one of the most recognizable lines from CDG as most of the T-shirts and hoodies are usually decorated with their unsophisticated yet classic heart with eyes logo originally created by Filip Pagowski. The success of CDG eventually led to their first collaboration with the footwear giant Converse in 2009 which has continued since with them releasing many new editions of the shoes. In more recent years, Comme Des Garçons has done collaborations with streetwear and designer brands like Supreme, Louis Vuitton, and Nike, the company has become one of the most successful 'anti-fashion houses' in the industry.",
    }),
    Brand.create({
      name: "Helmut Lang",
      description:
        "Established in 1986, Austrian designer Helmut Lang's namesake label came to define the stripped-down, post-grunge luxury of the 90’s. A pioneer in minimalism, artist collaborations, and challenges to industry orthodoxy, the label and its signature denim, deconstructed tailoring, and high-tech fabrics became the uniform of the decade’s creative class. Independent of Lang since 2005, the label relaunched in 2017 as an interdisciplinary collective overseen by editor-in-residence Isabella Burley. Channelling the forward-thinking spirit of its founder, the label’s contemporary iteration takes a highly dynamic and unconventional approach to ready-to-wear. Engaging a new generation of creatives to reinterpret Lang’s legacy, the label’s modern menswear takes shapes across a series of capsule collections and multi-disciplinary collaborations. The label’s newly minted Re-Edition initiative re-introduces Lang’s most iconic garments to a modern audience, while its Artist Series sees archival photo prints from some of the century’s most subversive artists appear across signature t-shirts, posters, and memorabilia. Lang’s signature asymmetric blazers and jackets, structural shirting, and cut-out knitwear hang alongside re-imagined ‘Logo Hack’ t-shirts, hoodies, and sweatshirts, and one-of-a-kind pieces created by a revolving roster of today’s most provocative visual artists.",
    }),
    Brand.create({
      name: "Issey Miyake",
      description:
        "For almost 5 decades, Issey Miyake has been pioneering the concept of modern Japanese heritage in fashion. As a survivor of post World War II trauma, Issey Miyake was born into the destruction of his country and participated in its rise and redemption. After his studies, Miyake would travel to Paris then New York to accumulate experiences and ideas to build his fashion empire. His Western travels would land him back in Tokyo, where he established his namesake brand that would ultimately revolutionize Japanese fashion and global fashion as a whole. Miyake has spent the past 5 decades reinforcing his design motifs: texture, shape, fabric, proportions, and technology. He blends these motifs with his equilibrium balance of Eastern and Western heritage. Miyake often references his Western experiences but never forgets his Eastern roots, creating a different world for his garments to exist in. The commercial success of Issey Miyake has never tampered with the design foundations of the legacy brand. His groundbreaking Pleats collection, first introduced in 1989, are still fashion essentials for every woman's and men’s wardrobe every season in the 21st century. Miyake’s fascination with industrial processes and manufacturing has influenced his designs and their futuristic technological elements. His collections not only look phenomenal, they also serve technical purposes for the individual and their style. Images from Universe of Fashion vividly showcase the beauty of Miyake’s designs and his intricate creative expression through clothing. The way each fabric and material lays on the body and stack on each other is intentional and purposeful, as if Miyake is designing for the future. That explains why Issey Miyake is such a pioneer of modern day fashion. His curiosity is never satisfied.",
    }),
    Brand.create({
      name: "Junya Watanabe",
      description:
        "Junya Watanabe is a Japanese fashion designer who originally studied under Comme des Garcons designer, Rei Kawakubo. A graduate of Bunka Fashion College in Tokyo in 1984, he began his career as a patternmaker at CDG and was soon promoted to chief designer of the Tricot line, followed by CDG Homme. He started his own line under the label, called Junya Watanabe Comme des Garcons, in 1993 and began showing in Paris. As is his mentor, Watanabe is renowned for his innovative and distinctly avant-garde, technically brilliant style in his experiments with cutting-edge fabrics, original tailoring and complex draping.",
    }),
    Brand.create({
      name: "Kapital",
      description:
        "Putting their own unique spin onto American, Japanese and a variety of other cultures' clothing, Kapital has carved a niche in the Japanese denim industry since their founding in 1985. Rather than following the path of many Japanese denim brands and producing exact replicas of vintage Levi’s, Kapital produced items that fit a certain theme, time period, or cultural idea, while still keeping the production quality of reproduction brands. Slowly but steadily Kapital has built a reputation for quality products, with extremely unique offerings too boot. From the Kountry lines boro remakes, too the sought after Century denim products, the labels offerings often change somewhat season too season, with unique takes being offered in addition too their core line of products. In recent years with the explosion of archive items and fashion coming out of Japan through sites such as Yahoo Japan and Mercari, a wider audience has been exposed too Kapital and their unique offerings. From rappers, to the avant garde enthusiast, Kapital has something to offer for everyone. From pre-distressed products too those that will age over time, Kapital has cemented themselves as a staple of the Japanese Americana fashion scene, and their pieces will likely remain in circulation for decades too come.",
    }),
    Brand.create({
      name: "Raf Simons",
      description:
        "After studying fashion at Antwerp’s Royal Academy, Belgian designer Raf Simons launched his namesake menswear collection in 1995. Immersed in the counterculture of the early ‘90s, Simons pioneered collections that captured the energy of the city’s underground. Inspired by music, sportswear, and youth culture, Simons pairs a minimalist aesthetic with futuristic prints and color schemes in a relentlessly modern blend of high-end materials and fresh interpretations of classic designs. Pop art graphics, collaged photo prints, and playful text detailing inform the brand’s varied and eclectic offerings. With a distinct and innovative style, Raf Simons continues to create collections with a charmingly rebellious spirit.",
    }),
    Brand.create({
      name: "Undercover",
      description:
        "Jun Takahashi’s Undercover embodies the quintessence of Japanese cool, channeling raw-edged rebellion and dramatic high-concept elegance to produce an inimitable vision that fascinates in its dualities. Takahashi founded the label in 1990 as a student at Tokyo's Bunka Academy of Fashion, eschewing the conventional apprenticeship most young Japanese designers are expected to undertake. Such irreverence carried his early punk-inflected work, which quickly found support and mentorship from Comme des Garçons’ Rei Kawakubo. Operating under the maxim “We Make Noise Not Clothes,” Undercover uses an unexpected combination of materials, colors, and cuts to dissolve the binaries between high and low, avant-garde and utilitarian, and macabre and beautiful. With a diverse and alluring oeuvre, Undercover generates a coherently surrealist universe, one which Takahashi continues to expand upon one collection at a time.",
    }),
    Brand.create({
      name: "Yohji Yamamoto",
      description:
        "Yohji Yamamoto was born in Tokyo and grew up working with his mother for her dress tailoring business. At first he earned a degree in Law, but after graduating it was his mom’s tailoring work that led him to study fashion design at the Bunka Fashion College, eventually graduating in 1969. After discovering fashion from his mother at a young age, Yamamoto has now been revered as a master tailor known for his experimental interpretation of the Japanese aesthetic. The first Yohji runway shows were held in Tokyo in the late 70’s and he eventually had Paris and New York debuts during the early 80’s. These first fashion week shows drew in large crowds and Yamamoto began to gain traction in the press. By the early 90’s Yamamoto had developed a dark avant-garde lifestyle that was extremely appealing to many; Long draped dresses, almost sculptural jackets, and large hats are all staple pieces to both his mens and womenswear lines. Yamamoto does not design his clothing based on any trends in fashion, he simply uses his own inspiration and outlook to make his ideas come to life. Alongside both Yohji Yamamoto Mens and Womens collections and sub-label 'Y’s', 'Y-3' was created in 2003 acting as an experimental sportswear line. Yohji Yamamoto is the godfather of Japanese fashion in a sense, paving his own lane, doing what he does best, and not veering off track, which is why he is such an emblematic fashion designer.",
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

  //Testing orders
  Order.create({ userId: users[0].id })
  Order.create({ userId: users[1].id })

  OrderItem.create({ orderId: 1, productId: 1, quantity: 3 })
  OrderItem.create({ orderId: 1, productId: 2, quantity: 5 })

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
