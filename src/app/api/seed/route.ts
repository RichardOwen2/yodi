import { NextResponse } from "next/server";

import prisma from "@/backend/libs/prismadb";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";

export async function GET(request: Request) {
  try {
    const user = [
      {
        id: `user-${nanoid(16)}`,
        username: "admin",
        email: "admin@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "seller1",
        email: "seller1@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "seller2",
        email: "seller2@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "seller3",
        email: "seller3@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "seller4",
        email: "seller4@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "user1",
        email: "user1@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "user2",
        email: "user2@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
      {
        id: `user-${nanoid(16)}`,
        username: "user3",
        email: "user3@yodi.com",
        password: await bcrypt.hash("1234567890", 10),
        phoneNumber: "085123951013",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
      },
    ];
  
    await prisma.user.createMany({
      data: user
    });
  
    await Promise.all(user.map(async ({ id }) => {
      await prisma.userAddress.create({
        data: {
          id: `address-${nanoid(16)}`,
          userId: id,
          label: "Home",
          city: "balikpapan",
          postalCode: "76114",
          address: "Jl. Soekarno Hatta blok 99",
        }
      });
    }));
  
    const seller = [
      {
        id: `seller-${nanoid(16)}`,
        userId: user[4].id,
        city: "balikpapan",
        address: "Jalan yang pernah ada",
        soldCount: 1324,
        verifiedAt: new Date(),
      },
      {
        id: `seller-${nanoid(16)}`,
        userId: user[1].id,
        city: "samarinda",
        address: "Jalan yang pernah ada",
        soldCount: 2421,
        verifiedAt: new Date(),
      },
      {
        id: `seller-${nanoid(16)}`,
        userId: user[2].id,
        city: "bekasi",
        address: "Jalan yang pernah ada",
        soldCount: 3455,
        verifiedAt: new Date(),
      },
      {
        id: `seller-${nanoid(16)}`,
        userId: user[3].id,
        city: "jakarta",
        address: "Jalan yang pernah ada",
        soldCount: 8111,
        verifiedAt: new Date(),
      },
    ]
  
    await prisma.seller.createMany({
      data: seller,
    });
  
    await Promise.all(seller.map(async ({ id }) => {
      await prisma.bank.create({
        data: {
          userId: id,
          bankName: "BCA",
          bankNumber: `${Math.floor(Math.random() * 100000000000000000000)}`,
          ownerName: "Hengki Agong",
        },
      });
    }));
  
    await prisma.admin.create({
      data: {
        id: `admin-${nanoid(16)}`,
        userId: user[0].id,
      },
    });
  
    const shipper = [
      {
        id: `shipper-${nanoid(16)}`,
        name: "Gojek",
        price: 13200,
        city: "balikpapan",
      },
      {
        id: `shipper-${nanoid(16)}`,
        name: "AriqJek",
        price: 20000,
        city: "balikpapan",
      },
      {
        id: `shipper-${nanoid(16)}`,
        name: "DylanJek",
        price: 6000,
        city: "balikpapan",
      },
      {
        id: `shipper-${nanoid(16)}`,
        name: "HengkiJek",
        price: 500,
        city: "balikpapan",
      }
    ]
  
    await prisma.shipper.createMany({
      data: shipper,
    });
  
    const item = [
      {
        id: `item-${nanoid(16)}`,
        owner: seller[0].id,
        title: "Baju PDI Merakyat",
        description: "Baju PDI Merakyat",
        sold: 12,
        verifiedAt: new Date(),
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
        itemImage: [
          "https://cf.shopee.co.id/file/sg-11134201-23010-j9v96z5uc7lv14",
          "https://pdiperjuangan-jabar.com/wp-content/uploads/2018/08/krisdayanti.jpeg",
          "https://cdn0-production-images-kly.akamaized.net/MwmlUIoPkU5t3bpr5fqv4wHu4EI=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4202080/original/013047600_1666614414-Ekspresi_Ganjar_Pranowo_Usai_Pertemuan_di_DPP_PDIP-Faizal-3.jpg",
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[0].id,
        title: "Baju PDI Asik dan mantap",
        description: "Baju PDI asikk dan Merakyat",
        sold: 6,
        verifiedAt: new Date(),
        itemImage: [
          "https://media.karousell.com/media/photos/products/2019/09/26/kaos_lengan_panjang_pdi_perjuangan_ukuran__l_1569455015_8d787cce_progressive.jpg",
          "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/10/5/312a6c57-7d07-4ffe-b9a0-057b57f5cd00.jpg",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[0].id,
        title: "Baju PDI santuyy",
        description: "Baju PDI Merakyat banget",
        sold: 1,
        verifiedAt: new Date(),
        itemImage: [
          "https://suryakepri.com/wp-content/uploads/2019/08/WhatsApp-Image-2019-08-08-at-18.16.26.jpeg",
          "https://cf.shopee.co.id/file/sg-11134201-22110-vmav8qb7uejvf8",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[1].id,
        title: "Baju Perindo mantap santuy",
        description: "Baju Perindo Merakyat",
        sold: 3,
        verifiedAt: new Date(),
        itemImage: [
          "https://1.bp.blogspot.com/-gy7SMX9RKq4/WjaNEDiS5vI/AAAAAAAAA-w/BJUqy6YE7rAFlEyA77pLAxjlA0oyxJKMACLcBGAs/s1600/IMG-20171217-WA0020.jpg",
          "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhlmxgLFj3OIdZNX44Ew8iIR0mmpgYsWPxvMksme1VEisWECSo8k3sSLTdiYHJeF2mIGSfyM2_9UiZfbpeOODgLO8QYnvIQlV2B7nKIYuHL7ph49YTIJhaF8FZhqZZbgI6TELK6tIbOUrKWyzO0OPEMbez4UQSwvxtMqh-Tj7ai8jmBnscwSqVEhB_p/s1280/IMG-20220811-WA0002.jpg",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[1].id,
        title: "Baju Perinddoooo jaya",
        description: "Baju jay jaya jaya",
        sold: 16,
        verifiedAt: new Date(),
        itemImage: [
          "https://innews.co.id/wp-nnnnn,s/uploads/2022/08/Screenshot_20220824_191150-1.jpg",
          "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/12/22/0535d138-74b5-48c0-82a6-79268ad222ff.jpg",
          "https://bungonews.net/wp-content/uploads/2023/03/IMG-20230305-WA0031.jpg",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[2].id,
        title: "Baju PDI Merakyat",
        description: "Baju PDI Merakyat",
        sold: 12,
        verifiedAt: new Date(),
        itemImage: [
          "https://cf.shopee.co.id/file/sg-11134201-23010-j9v96z5uc7lv14",
          "https://pdiperjuangan-jabar.com/wp-content/uploads/2018/08/krisdayanti.jpeg",
          "https://cdn0-production-images-kly.akamaized.net/MwmlUIoPkU5t3bpr5fqv4wHu4EI=/1200x1200/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/4202080/original/013047600_1666614414-Ekspresi_Ganjar_Pranowo_Usai_Pertemuan_di_DPP_PDIP-Faizal-3.jpg",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
      {
        id: `item-${nanoid(16)}`,
        owner: seller[2].id,
        title: "Baju Nasdem Dylan",
        description: "Dylan sayang nasdem",
        sold: 12,
        verifiedAt: new Date(),
        itemImage: [
          "https://i.pinimg.com/736x/b3/4c/f0/b34cf04c4610df159887df452679e619.jpg",
          "https://pbs.twimg.com/media/DdyRMYyVMAAIV2a.jpg",
        ],
        itemVariant: [
          {
            label: "XL",
            price: 68000,
            stock: 41,
          },
          {
            label: "L",
            price: 60000,
            stock: 41,
          },
          {
            label: "S",
            price: 57000,
            stock: 41,
          },
        ],
      },
    ]
  
    await Promise.all(item.map(async (data) => {
      await prisma.item.create({
        data: {
          id: data.id,
          owner: data.owner,
          title: data.title,
          description: data.description,
          sold: data.sold,
          verifiedAt: data.verifiedAt,
        },
      });
  
      await Promise.all(data.itemImage.map(async (image) => {
        await prisma.itemImage.create({
          data: {
            itemId: data.id,
            image,
          },
        });
      }));
  
      await Promise.all(data.itemVariant.map(async ({ label, price, stock }) => {
        await prisma.itemVariant.create({
          data: {
            id: `itemVariant-${nanoid(16)}`,
            itemId: data.id,
            label,
            price,
            stock,
          },
        });
      }));
    }));
  
    return NextResponse.json({
      message: "done seeding",
    });
  } catch (error) {
    console.log(error);

    await prisma.user.deleteMany();
    await prisma.seller.deleteMany();
    await prisma.bank.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.item.deleteMany();

    return NextResponse.json({
      message: "Error Seeding",
    }, { status: 500 });
  }
}