import { prisma } from "@/app/lib/prisma";

async function main() {
  console.log("Seed start");

  const brands = await Promise.all([
    prisma.brand.create({
      data: {
        name: "ROG",
        logoUrl: "https://ibb.co/cXMsWfmQ",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Logitech",
        logoUrl: "https://ibb.co/8gCb6LZp",
      },
    }),
    prisma.brand.create({
      data: {
        name: "JBL",
        logoUrl: "https://ibb.co/Ld0PvBrg",
      },
    }),
    prisma.brand.create({
      data: {
        name: "AOC",
        logoUrl: "https://ibb.co/HfZgWcFW",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Razer",
        logoUrl: "https://ibb.co/KpbHnfzx",
      },
    }),
    prisma.brand.create({
      data: {
        name: "Rexus",
        logoUrl: "https://ibb.co/fG4mpH3n",
      },
    }),
  ]);

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "mice",
        description:
          "Discover the convenience and precision of navigating your computer—explore a wide range of mice that will boost your comfort and productivity every day.",
        imageUrl: "https://ibb.co/mCBKk2h1",
      },
    }),
    prisma.category.create({
      data: {
        name: "keyboards",
        description:
          "Experience fast, comfortable typing with keyboards designed to boost productivity and suit all your computing needs.",
        imageUrl: "https://ibb.co/zTDNLrVF",
      },
    }),
    prisma.category.create({
      data: {
        name: "monitors",
        description:
          "See every detail with vibrant, sharp monitors perfect for work, entertainment, and creative projects.",
        imageUrl: "https://ibb.co/NdRLyYf9",
      },
    }),
    prisma.category.create({
      data: {
        name: "headphones",
        description:
          "Enjoy immersive sound quality and comfort with headphones made for music, calls, and gaming.",
        imageUrl: "https://ibb.co/LDdkTjj8",
      },
    }),
    prisma.category.create({
      data: {
        name: "webcams",
        description:
          "Stay connected with clear, reliable webcams ideal for video calls, streaming, and online meetings.",
        imageUrl: "https://ibb.co/qYwmCQzH",
      },
    }),
  ]);

  await prisma.product.createMany({
    data: [
      {
        name: "Logitech G PRO X SUPERLIGHT 2",
        description:
          "Ultra-lightweight mouse with improved HERO 2 sensor and durable optical switches.",
        price: 149.99,
        stock: 57,
        brandId: brands[1].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Logitech G502 X PLUS",
        description:
          "High-performance wireless mouse with RGB and advanced HERO sensor.",
        price: 179.99,
        stock: 63,
        brandId: brands[1].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Logitech MX Master 3S",
        description:
          "Precision wireless mouse designed for productivity and comfort.",
        price: 99.99,
        stock: 47,
        brandId: brands[1].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Razer DeathAdder V4 Pro",
        description:
          "Ultra-lightweight ergonomic wireless mouse for esports performance.",
        price: 149.99,
        stock: 72,
        brandId: brands[4].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Razer Viper V3 Pro",
        description: "Wireless ultra-lightweight mouse with 35K DPI sensor.",
        price: 169.99,
        stock: 54,
        brandId: brands[4].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Razer Naga V2 Pro",
        description: "Highly programmable MMO mouse with modular side panels.",
        price: 159.99,
        stock: 8,
        brandId: brands[4].id,
        categoryId: categories[0].id,
        imageUrls: [
          "https://ibb.co/RpR8w3FY",
          "https://ibb.co/8Lk736fV",
          "https://ibb.co/Tqxz7Tjr",
        ],
      },
      {
        name: "Rexus K9E Gaming Keyboard",
        description:
          "Full-size gaming keyboard with rainbow LED and anti-ghosting feature.",
        price: 59.99,
        stock: 57,
        brandId: brands[5].id,
        categoryId: categories[1].id,
        imageUrls: [
          "https://ibb.co/BKfv2Zbp",
          "https://ibb.co/sBxcxm9",
          "https://ibb.co/bjCLkcht",
        ],
      },
      {
        name: "Rexus Legionare MX5.2 TKL",
        description:
          "Compact mechanical gaming keyboard with multiple switch and LED options.",
        price: 79.99,
        stock: 17,
        brandId: brands[5].id,
        categoryId: categories[1].id,
        imageUrls: [
          "https://ibb.co/BKfv2Zbp",
          "https://ibb.co/sBxcxm9",
          "https://ibb.co/bjCLkcht",
        ],
      },
      {
        name: "Logitech G715",
        description:
          "Tenkeyless mechanical keyboard with dedicated media keys and volume knob.",
        price: 169.99,
        stock: 107,
        brandId: brands[1].id,
        categoryId: categories[1].id,
        imageUrls: [
          "https://ibb.co/BKfv2Zbp",
          "https://ibb.co/sBxcxm9",
          "https://ibb.co/bjCLkcht",
        ],
      },
      {
        name: "Logitech G915 X LIGHTSPEED",
        description:
          "Wireless low-profile mechanical keyboard with RGB and macro keys.",
        price: 249.99,
        stock: 33,
        brandId: brands[1].id,
        categoryId: categories[1].id,
        imageUrls: [
          "https://ibb.co/BKfv2Zbp",
          "https://ibb.co/sBxcxm9",
          "https://ibb.co/bjCLkcht",
        ],
      },
      {
        name: "Razer Huntsman V3 Pro",
        description:
          "Ultra-responsive analog optical keyboard with adjustable actuation.",
        price: 149.99,
        stock: 42,
        brandId: brands[4].id,
        categoryId: categories[1].id,
        imageUrls: [
          "https://ibb.co/BKfv2Zbp",
          "https://ibb.co/sBxcxm9",
          "https://ibb.co/bjCLkcht",
        ],
      },
      {
        name: "ASUS ROG Swift OLED PG32UCDP",
        description: "4K OLED gaming monitor, 240Hz, G-SYNC compatible",
        price: 1499.99,
        stock: 93,
        brandId: brands[0].id,
        categoryId: categories[2].id,
        imageUrls: [
          "https://ibb.co/ynjZGQ0V",
          "https://ibb.co/7dbgSWQm",
          "https://ibb.co/TMJSzYD8",
        ],
      },
      {
        name: "ASUS ROG Strix XG27AQWMG",
        description: "QHD OLED, 280Hz refresh rate, ultra-fast 0.03ms response",
        price: 1199.99,
        stock: 19,
        brandId: brands[0].id,
        categoryId: categories[2].id,
        imageUrls: [
          "https://ibb.co/ynjZGQ0V",
          "https://ibb.co/7dbgSWQm",
          "https://ibb.co/TMJSzYD8",
        ],
      },
      {
        name: "Logitech G32 Gaming Monitor",
        description: "1440p, 165Hz IPS panel, RGB lighting.",
        price: 429.99,
        stock: 1,
        brandId: brands[1].id,
        categoryId: categories[2].id,
        imageUrls: [
          "https://ibb.co/ynjZGQ0V",
          "https://ibb.co/7dbgSWQm",
          "https://ibb.co/TMJSzYD8",
        ],
      },
      {
        name: "AOC 24G2",
        description: "Full HD gaming monitor, 165Hz, FreeSync IPS panel.",
        price: 229.99,
        stock: 61,
        brandId: brands[3].id,
        categoryId: categories[2].id,
        imageUrls: [
          "https://ibb.co/ynjZGQ0V",
          "https://ibb.co/7dbgSWQm",
          "https://ibb.co/TMJSzYD8",
        ],
      },
      {
        name: "AOC CQ32G4VE",
        description: "QHD curved VA panel, 180Hz refresh rate, HDR10.",
        price: 399.99,
        stock: 7,
        brandId: brands[3].id,
        categoryId: categories[2].id,
        imageUrls: [
          "https://ibb.co/ynjZGQ0V",
          "https://ibb.co/7dbgSWQm",
          "https://ibb.co/TMJSzYD8",
        ],
      },
      {
        name: "Razer BlackShark V2 Pro",
        description:
          "Wireless gaming headset with THX Spatial Audio and noise-cancelling mic.",
        price: 179.99,
        stock: 12,
        brandId: brands[4].id,
        categoryId: categories[3].id,
        imageUrls: [
          "https://ibb.co/XrZHHz4t",
          "https://ibb.co/5XzrDhrX",
          "https://ibb.co/nqxxgcB5",
        ],
      },
      {
        name: "Razer Kraken V4 Pro",
        description:
          "Wireless headset with HyperSense haptics and 7.1 surround sound.",
        price: 229.99,
        stock: 422,
        brandId: brands[4].id,
        categoryId: categories[3].id,
        imageUrls: [
          "https://ibb.co/XrZHHz4t",
          "https://ibb.co/5XzrDhrX",
          "https://ibb.co/nqxxgcB5",
        ],
      },
      {
        name: "Razer Barracuda X",
        description:
          "Lightweight wireless headset for multi-platform gaming and clear sound.",
        price: 99.99,
        stock: 2,
        brandId: brands[4].id,
        categoryId: categories[3].id,
        imageUrls: [
          "https://ibb.co/XrZHHz4t",
          "https://ibb.co/5XzrDhrX",
          "https://ibb.co/nqxxgcB5",
        ],
      },
      {
        name: "JBL Quantum 800",
        description:
          " Wireless gaming headset with JBL QuantumSURROUND and detachable mic.",
        price: 159.99,
        stock: 14,
        brandId: brands[2].id,
        categoryId: categories[3].id,
        imageUrls: [
          "https://ibb.co/XrZHHz4t",
          "https://ibb.co/5XzrDhrX",
          "https://ibb.co/nqxxgcB5",
        ],
      },
      {
        name: "JBL Quantum 400",
        description:
          "Wired gaming headset with JBL QuantumSOUND and memory foam ear cushions.",
        price: 99.99,
        stock: 37,
        brandId: brands[2].id,
        categoryId: categories[3].id,
        imageUrls: [
          "https://ibb.co/XrZHHz4t",
          "https://ibb.co/5XzrDhrX",
          "https://ibb.co/nqxxgcB5",
        ],
      },
      {
        name: "Logitech Brio 4K",
        description:
          "Premium 4K webcam with HDR, autofocus, and 5x digital zoom.",
        price: 199.99,
        stock: 17,
        brandId: brands[1].id,
        categoryId: categories[4].id,
        imageUrls: ["https://ibb.co/MDQgWS5T", "https://ibb.co/ZpfmFd9g"],
      },
      {
        name: " Logitech C920",
        description:
          "Popular 1080p webcam with excellent video quality and auto light correction.",
        price: 69.99,
        stock: 4,
        brandId: brands[1].id,
        categoryId: categories[4].id,
        imageUrls: ["https://ibb.co/MDQgWS5T", "https://ibb.co/ZpfmFd9g"],
      },
      {
        name: "Razer Kiyo Pro",
        description:
          "Ultra HD 1080p webcam with adaptive light sensor and ring light.",
        price: 179.99,
        stock: 44,
        brandId: brands[4].id,
        categoryId: categories[4].id,
        imageUrls: ["https://ibb.co/MDQgWS5T", "https://ibb.co/ZpfmFd9g"],
      },
      {
        name: "Rexus QX-300",
        description:
          "Simple 720p webcam with noise-reducing mic and flexible clip.",
        price: 39.99,
        stock: 488,
        brandId: brands[5].id,
        categoryId: categories[4].id,
        imageUrls: ["https://ibb.co/MDQgWS5T", "https://ibb.co/ZpfmFd9g"],
      },
      {
        name: "Rexus QX-600",
        description:
          "HD 1080p webcam, adjustable field of view with built-in stereo mic.",
        price: 59.99,
        stock: 34,
        brandId: brands[5].id,
        categoryId: categories[4].id,
        imageUrls: ["https://ibb.co/MDQgWS5T", "https://ibb.co/ZpfmFd9g"],
      },
    ],
  });

  console.log("Seed End");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
