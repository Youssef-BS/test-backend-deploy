// server.js
const express = require('express');
const sequelize = require('./config');
const Product = require('./Models/Products');
const Market = require('./Models/Market')
const Category = require('./Models/Category')
const Subcategory = require('./Models/Subcategory')
const userRoutes = require('./Routes/userRoutes');
const newsroomRoutes = require('./Routes/newsroomRoutes');
const featuredProductRoutes = require('./Routes/featuredProductRoutes');
const ProductRoutes = require('./Routes/ProductRoute')
const WishlistRoute = require('./Routes/WishlistRoute')
const CartRoute = require('./Routes/CartRoute')
const SubSubcategory = require('./Models/SubSubcategory');
const Newsroom = require('./Models/Newsroom')
const FeaturedProduct = require('./Models/FeaturedProduct');
const User = require('./Models/User')
const OrderHistory = require('./Models/OrderHistory')
const Order = require('./Models/Order')
const Cart = require("./Models/Cart")
const CartProduct = require('./Models/CartProduct')
const OrderProduct = require('./Models/Orderproduct')
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const Wishlist = require('./Models/Wishlist');
const WishlistProduct = require('./Models/WishlistProduct');
const authRoutes = require('./Routes/authRoutes');
const projectRoutes = require('./Routes/projectRoutes');
const Gallery = require('./Models/Gallery');
const Project = require('./Models/Project');
const ProjectProduct = require('./Models/projectProduct');
const projectProductRoutes = require('./Routes/projectProductRoutes');
const ProductRelation = require('./Models/ProductRelation');
const productRelationsRouter = require('./Routes/productRelationRoutes')
const orderRoutes = require('./Routes/orderRoutes')

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    Category.belongsTo(Market);
    Market.hasMany(Category)

    Project.hasMany(Gallery, { as: 'galleries', foreignKey: 'ProjectId' });
    Gallery.belongsTo(Project, { foreignKey: 'ProjectId' });

    Subcategory.belongsTo(Category);
    Category.hasMany(Subcategory)
    SubSubcategory.belongsTo(Subcategory)
    Subcategory.hasMany(SubSubcategory)


    Product.belongsTo(Category);
    Product.belongsTo(Subcategory);
    Product.belongsTo(SubSubcategory);
    Product.belongsTo(Market);
    SubSubcategory.hasMany(Product)
    Subcategory.hasMany(Product)
    Category.hasMany(Product)
    Newsroom.belongsTo(Product)
    Product.hasMany(Newsroom);
    FeaturedProduct.belongsTo(Product)
    Product.hasMany(FeaturedProduct);
    User.hasMany(Order);

Order.belongsTo(User);
Order.hasMany(OrderHistory);
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

OrderHistory.belongsTo(Order);
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartProduct });
Product.belongsToMany(Cart, { through: CartProduct });
CartProduct.belongsTo(Product)
Cart.hasMany(CartProduct)
User.hasOne(Wishlist)
Wishlist.belongsTo(User)
Wishlist.belongsToMany(Product, { through: WishlistProduct });
Product.belongsToMany(Wishlist, { through: WishlistProduct });
Wishlist.hasMany(WishlistProduct)
WishlistProduct.belongsTo(Product)

ProjectProduct.belongsTo(Project, { foreignKey: 'projectId' });
ProjectProduct.belongsTo(Product, { foreignKey: 'productId' });
Project.hasMany(ProjectProduct, { foreignKey: 'projectId' });
Product.hasMany(ProjectProduct, { foreignKey: 'productId' });



Product.belongsToMany(Product, {
  as: 'RelatedProducts',
  through: ProductRelation,
  foreignKey: 'productId',
  otherKey: 'relatedProductId',
});

Product.belongsToMany(Product, {
  as: 'RelatedTo',
  through: ProductRelation,
  foreignKey: 'relatedProductId',
  otherKey: 'productId',
});



  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

  sequelize.sync()
  .then(() => {
    console.log('Market model synced with database');
  })
  .catch((error) => {
    console.error('Error syncing Market model with database:', error);
  });
  app.use(cors());

  app.use(express.json());

  app.use("/pro",ProductRoutes)
  app.use("/cart",CartRoute)
  app.use("/wishlist",WishlistRoute)
  app.use("/auth",authRoutes)
  app.use('/user', userRoutes);
  app.use('/projects' , projectRoutes);
  app.use("/project-product", projectProductRoutes)
  app.use('/newsrooms', newsroomRoutes);
  app.use('/featured-products', featuredProductRoutes);
  app.use('/productRelation', productRelationsRouter);
  app.use('/order', orderRoutes);
 /* const insertMarkets = async () => {
    try {
      // Insert the first market
      await Market.create({
        name: 'FOS Technologies',
        image: 'uploads/thumbnails/categories_0_cat_image_172.png.thumb_40x37.png'
      });
  
      // Insert the second market
      await Market.create({
        name: 'Intelligent Audio',
        image: 'uploads/thumbnails/categories_0_cat_image_173.png.thumb_47x37.png'
      });
  
      console.log('Markets inserted successfully.');
    } catch (error) {
      console.error('Error inserting markets:', error);
    }
  };
  
  insertMarkets();

  async function insertData() {
    try {
   
      // Insert products
      const product2 = await Product.create({
        code: "L006793",
        title: "FOS Ares Profile",
        description: "Professional low noise Led profile moving head for stages and theater applications, high power 600W LED engine module, 4-55° linear zoom, intelligent fan, noise 45dB, Framing system: 4 Blades with +/-45° rotation, Color system: CMY + independent CTO, Animation wheel, Iris, 7 interchangeable rotating and 7 static gobos, 6 dichroic color filters, 4-facet prism, 0-100% linear frost, Linear Dimmer 0-100%, 32kg.",
        image: "https://www.fos-lighting.eu/uploads/products_0_image_2748.jpg",
        extra_image: [
          "https://www.fos-lighting.eu/uploads/products_1_image_2748.jpg",
          "https://www.fos-lighting.eu/uploads/products_2_image_2748.jpg",
          "https://www.fos-lighting.eu/uploads/products_3_image_2748.jpg",
          "https://www.fos-lighting.eu/uploads/products_4_image_2748.jpg",
          "https://www.fos-lighting.eu/uploads/products_5_image_2748.jpg"
        ],
        price: 2498,
        availability: "Out of stock",
        stock_eta: "in the last week of April 2024",
        features: "https://www.youtube.com/embed/PAhbZ_wBZUQ",
        technical_details: {
          technical_details_1: {
            technical_details_title: "Product description",
            technical_details_description: "Profile moving head, with maximum light shaping capabilities, and CRI: ≥ 70 suitable for event, theater, and tv applications, Intelligent fan, noise levels from 45 DB. Modular design for easy production, testing, and maintenance. X / Y positioning is smooth and accurate, ±1°, Magnetic encoder technology. Lens diameter 149 with up to 53.5 degrees linear smooth zoom. 4 blades move smoothly, and bi-directional control."
          },
          technical_details_2: {
            technical_details_title: "Light Source / Optics",
            technical_details_description: "High Power 600 Watt LED, with an approximate lifespan of 20,000 hours. Motorized zoom from 4.5 to 53.5 degrees. Linear dimming & 4 dimmer curves."
          },
          technical_details_3: {
            technical_details_title: "Mechanical effects",
            technical_details_description: "CMY & CTO linear color mixing system. 6x dichroic color & rainbow effect. Slide-in and continuous rotating animation wheel. 7x interchangeable rotating gobos. 7x fixed gobos. Soft edge and hard edge frost filters with immediate or linear insertion. 4-Facet rotating prism. Motorized iris with linear control (5 to 100%)."
          },
          technical_details_4: {
            technical_details_title: "Framing System",
            technical_details_description: "4x blades with insertion and angle control of +/- 45 degrees. Full coverage of the light path. A single blade can block the light output completely. Rotation of the framing system from 0 to 45 degrees."
          },
          technical_details_5: {
            technical_details_title: "Technical Specifications",
            technical_details_description: "CRI ≥ 70, suitable for events. Input voltage: AC100 - 240 Volt. Maximum power consumption: 800W. 3 & 5 pin XLR for DMX connection. DMX Control with 29, 34 or 37 CH. IP20, for indoor use only. Working temperature from 0 to 45 degrees Celsius. Cooling fan smart control, noise levels from 45 to 57 dB. Dimensions: 374 x 355 x 736 mm. Net weight: 32 Kg."
          },
          technical_details_6: {
            technical_details_title: "Packing Details",
            technical_details_description: "Carton box for 1 pc: 71 x 61 x 72 cm - 35 kg"
          }
        },
        MarketId: 1, // Assuming market 1
        CategoryId: 1, // Assuming category 1
        SubcategoryId: 1 // Assuming subcategory 1
      });
  
      const product1 = await Product.create({
        code: "L005586",
        title: "FOS Triton",
        description: "Professional Beam/Spot/Wash moving head, 360w High Brightness White Led, Beam angle: 3°to 36 ° motorized zoom, 10-60 ° frost mode ,Linear CMY+CTO, Color wheel: 10+1 colors, 7 custom interchangeable rotating gobo, 6 fixed gobos, Rotating 8 facets prism, Powercon In/out ,Low noise operation , 21kg.",
        image: "https://www.fos-lighting.eu/uploads/products_0_image_662.jpg",
        extra_image: [
          "https://www.fos-lighting.eu/uploads/products_1_image_662.jpg",
          "https://www.fos-lighting.eu/uploads/products_2_image_662.jpg",
          "https://www.fos-lighting.eu/uploads/products_3_image_662.jpg",
          "https://www.fos-lighting.eu/uploads/products_4_image_662.jpg",
          "https://www.fos-lighting.eu/uploads/products_5_image_662.jpg"
        ],
        price: 1473,
        availability: "Out of stock",
        stock_eta: "in the 4rth week of March 2024",
        features: "https://www.youtube.com/embed/wOtnnheHn6g",
        technical_details: {
          technical_details_1: {
            technical_details_title: "Light Source / Optics",
            technical_details_description: "Light source: 360 Watt LED, 5800 K Life span: 50,000 hours (approximate). Linear zoom from 3,6 to 36 degrees. Motorized focus."
          },
          technical_details_2: {
            technical_details_title: "Effects",
            technical_details_description: "Linear dimming and strobe effects. Linear CTO and CMY color mixing system. 1 Rotating Gobo wheel with 7 interchangeable Gobos Rotating Gobos Dimensions : external diameter: 26mm, internal diameter: 15mm 1 Static Gobo wheel with 6 fixed Gobos. 1 color wheel with 10 dichroic colors (includes CTO & CTB color correction filters). Frost filter. 8F prism. Motorized zoom and focus. Selectable Pan and Tilt ranges: 540/630/360 degrees Pan & 270/180/90 degrees Tilt."
          },
          technical_details_3: {
            technical_details_title: "Control",
            technical_details_description: "DMX Control with 20 or 18 channels. Auto function with 9 internal programs. Sound mode."
          },
          technical_details_4: {
            technical_details_title: "Installation / Dimension Details",
            technical_details_description: "Power supply: AC 90 - 260 Volt, 50/60 Hz. Power consumption: 500W Dimensions: 379 x 255 x 585 mm Packaging dimensions: 510 x 470 x 650 mm Net weight: 21,5 Kgs Gros weight: 24 Kgs"
          }
        },
        MarketId: 1,
        CategoryId: 1,
        SubcategoryId: 1,
        extra_video: "https://www.youtube.com/embed/0oY-Q_XiW1o"
      });
  
      console.log("Data inserted successfully!");
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  }
  
  insertData();
  */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
