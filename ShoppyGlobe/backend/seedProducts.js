import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js"; // Update path if needed

dotenv.config();

const products = [
  {
    name: "Apple iPhone 15",
    price: 79999,
    description: "128GB, A16 Bionic chip, Super Retina XDR display.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Apple+iPhone+15",
    stockQuantity: 25,
  },
  {
    name: "Samsung Galaxy S24",
    price: 74999,
    description: "Dynamic AMOLED display with Galaxy AI features.",
    image:
      "https://dummyimage.com/600x600/111827/ffffff&text=Samsung+Galaxy+S24",
    stockQuantity: 20,
  },
  {
    name: "OnePlus 13",
    price: 59999,
    description: "Snapdragon flagship smartphone with fast charging.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=OnePlus+13",
    stockQuantity: 30,
  },
  {
    name: "Apple MacBook Air M3",
    price: 114999,
    description: "13-inch laptop powered by Apple's M3 chip.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=MacBook+Air+M3",
    stockQuantity: 10,
  },
  {
    name: "Dell XPS 15",
    price: 139999,
    description: "Premium Windows laptop with Intel Core Ultra processor.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Dell+XPS+15",
    stockQuantity: 8,
  },
  {
    name: "Sony WH-1000XM5",
    price: 26999,
    description: "Industry-leading wireless noise cancelling headphones.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Sony+WH1000XM5",
    stockQuantity: 18,
  },
  {
    name: "Apple AirPods Pro 2",
    price: 22999,
    description: "Active Noise Cancellation with Adaptive Transparency.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=AirPods+Pro+2",
    stockQuantity: 35,
  },
  {
    name: "JBL Flip 6",
    price: 9999,
    description: "Portable waterproof Bluetooth speaker with deep bass.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=JBL+Flip+6",
    stockQuantity: 22,
  },
  {
    name: "Samsung 55-inch 4K Smart TV",
    price: 58999,
    description: "Crystal UHD Smart TV with HDR support.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Samsung+4K+TV",
    stockQuantity: 12,
  },
  {
    name: "Logitech MX Master 3S",
    price: 9999,
    description: "Wireless ergonomic productivity mouse.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=MX+Master+3S",
    stockQuantity: 28,
  },
  {
    name: "Nike Air Max 270",
    price: 8999,
    description: "Comfortable running shoes with Air Max cushioning.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Nike+Air+Max+270",
    stockQuantity: 32,
  },
  {
    name: "Adidas Essentials Hoodie",
    price: 3499,
    description: "Soft cotton hoodie for everyday comfort.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Adidas+Hoodie",
    stockQuantity: 40,
  },
  {
    name: "Levi's 511 Slim Fit Jeans",
    price: 2999,
    description: "Classic slim fit denim jeans with stretch fabric.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Levis+Jeans",
    stockQuantity: 38,
  },
  {
    name: "Puma Sports T-Shirt",
    price: 1499,
    description: "Dry-fit training t-shirt for gym and running.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Puma+TShirt",
    stockQuantity: 55,
  },
  {
    name: "Casio G-Shock GA2100",
    price: 9499,
    description: "Shock resistant analog-digital wrist watch.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=GShock+Watch",
    stockQuantity: 18,
  },
  {
    name: "Wildcraft 35L Backpack",
    price: 2199,
    description: "Water-resistant backpack for travel and college.",
    image:
      "https://dummyimage.com/600x600/111827/ffffff&text=Wildcraft+Backpack",
    stockQuantity: 44,
  },
  {
    name: "PlayStation 5 Console",
    price: 54999,
    description: "Sony PlayStation 5 with ultra-fast SSD.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=PlayStation+5",
    stockQuantity: 9,
  },
  {
    name: "Xbox Series X",
    price: 52999,
    description: "Microsoft next-generation gaming console.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Xbox+Series+X",
    stockQuantity: 11,
  },
  {
    name: "Razer DeathAdder V3",
    price: 5999,
    description: "High-performance gaming mouse with optical sensor.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Razer+Mouse",
    stockQuantity: 26,
  },
  {
    name: "SteelSeries Apex Pro Keyboard",
    price: 15999,
    description: "Mechanical gaming keyboard with RGB lighting.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Gaming+Keyboard",
    stockQuantity: 15,
  },
  {
    name: "Amazon Kindle Paperwhite",
    price: 14999,
    description: "6.8-inch glare-free e-reader with adjustable warm light.",
    image:
      "https://dummyimage.com/600x600/111827/ffffff&text=Kindle+Paperwhite",
    stockQuantity: 20,
  },
  {
    name: "Mi 20000mAh Power Bank",
    price: 1999,
    description: "Fast charging power bank with dual USB output.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Power+Bank",
    stockQuantity: 60,
  },
  {
    name: "Prestige 5L Pressure Cooker",
    price: 2499,
    description:
      "Durable stainless steel pressure cooker for everyday cooking.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Pressure+Cooker",
    stockQuantity: 30,
  },
  {
    name: "Milton Thermosteel Bottle",
    price: 799,
    description: "1L insulated stainless steel water bottle.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Water+Bottle",
    stockQuantity: 75,
  },
  {
    name: "Philips Air Fryer",
    price: 8999,
    description: "Healthy cooking with rapid air technology.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Air+Fryer",
    stockQuantity: 18,
  },
  {
    name: "LG Microwave Oven",
    price: 12499,
    description: "28L convection microwave oven with auto cook menu.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Microwave",
    stockQuantity: 12,
  },
  {
    name: "Dyson V8 Vacuum Cleaner",
    price: 29999,
    description: "Cordless vacuum cleaner with powerful suction.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Vacuum+Cleaner",
    stockQuantity: 8,
  },
  {
    name: "Blue Star Air Purifier",
    price: 15999,
    description: "HEPA filter air purifier for clean indoor air.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Air+Purifier",
    stockQuantity: 14,
  },
  {
    name: "Ergonomic Office Chair",
    price: 12999,
    description: "Mesh office chair with adjustable lumbar support.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Office+Chair",
    stockQuantity: 16,
  },
  {
    name: "Modern Wooden Study Table",
    price: 6999,
    description: "Spacious study table with engineered wood finish.",
    image: "https://dummyimage.com/600x600/111827/ffffff&text=Study+Table",
    stockQuantity: 22,
  },
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Old products deleted");

    await Product.insertMany(products);
    console.log(`${products.length} products inserted successfully`);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedProducts();
