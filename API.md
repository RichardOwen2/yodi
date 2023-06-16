# DOKUMENTASI API YODI

## Template Response =

<br>

### Success => 

<br>

```JS
// Response code 200, 201
{
  status: "success",
  data: (if data exist),
  message: (if message exist),
} 
```

<br>

### Fail => 

<br>

```JS
// Response code 400, 401, 403, 404
{
  status: "fail",
  message: errorMessage
}
```

<br>

### Error => 

<br>

```JS
// Response code 500
{
  status: 'error',
  message: 'Terjadi kesalahan pada server kami',
} 
```

<br>

### Database Error => 

<br>

```JS
// Response code 503
{
  status: 'error',
  message: 'Database service unavailable',
} 
```

<br>

---

## GUEST 

<br>

Common Fail :

- **POST** => Body request tidak sesuai

<br>

### REGISTER

<br>

> POST API/REGISTER

Body Request : 
```TS
{
  username: string,
  email: string,
  password: string,
}
```

Response Data = 
```TS
{
  token: string,
}
```

*fail* :
- Username dan email sudah pernah dipakai
- email tidak valid
- password kurang dari 8 karakter


### LOGIN

<br>

> POST API/LOGIN

Body Request : 
```TS
{
  email: string,
  password: string,
}
```

Response = 
```TS
{
  token: string,
}
```

*fail*:
- Kredensial salah

<br>

### Mendapatkan Data Item 

*(hanya menampilkan item yang sudah diverifikasi oleh admin dan akun yang berstatus aktif)*

<br>

> GET API/ITEM?page=x&itemCount=x&search=x&seller=x

<br>

*OTOMATIS DIURUTKAN BERDASARKAN CREATED_AT*

<br>

jika tidak memberi query page atau itemCount maka akan default 
```TS
page = 1, itemCount = 5
page -> number
itemCount -> number
search -> string | undefined (berdasarkan title)
seller -> string | undefined
```

Response Data = 
```TS
{
  items: [
    {
      seller: {
        city: string,
        user: {
          username: string,
          image: string | null
        }
      },
      id: string,
      title: string,
      description: string,
      sold: number,
      itemImage: [
        {
          image: string
        },  // hanya 1
      ],
      itemVariant: [
        {
          price: number
        },
        { ... }  // terurut dari yang termurah ke termahal
      ],
      _count: {
        itemVariant: number
      }
    },
    { ... }
  ]
}
```

*fail* :
- page dan itemCount kurang dari 1
- page dan itemCount bukan number

<br>

### Mendapatkan Data Item Berdasarkan list seller

<br>

> GET SELLER/ITEM?sellerPage=x&sellerItemCount=x&itemItemCount=x

<br>

*NOTE : UNTUK FITUR SEARCH PADA SELLER GUNAKAN API GET API/ITEM?page=x&itemCount=x&search=x&seller=x*

<br>

*DIURUTKAN BERDASARKAN JUMLAH BARANG YANG BERHASIL TERJUAL*

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

sellerPage = 1
sellerItemCount = 10
itemItemCount = 3

sellerPage -> number
sellerItemCount -> number
itemCount -> number
```

Response Data = 
```TS
{
  sellers: [
    {
      id: string;
      city: string;
      user: {
        username: string;
        image: string | null;
      };
      item: [
        {
          id: string,
          title: string,
          description: string,
          sold: number,
          itemImage: [
            {
              image: string
            }, // hanya 1
          ],
          itemVariant: [
            {
              price: number
            },
            { ... } // terurut dari yang termurah ke termahal
          ],
          _count: {
            itemVariant: number
          }
        },
        { ... }
      ]
    },
    { ... }
  ],
}
```

<br>


### Mendapatkan Data Item By Id 
*(hanya menampilkan item yang sudah diverifikasi oleh admin dan akun yang berstatus aktif)*

<br>

> GET API/ITEM/[id]

<br>

Response Data = 
```TS
{
  item: {
    seller: {
      city: string,
      user: {
        username: string,
        image: string | null
      }
    },
    id: string,
    title: string,
    description: string,
    sold: number,
    itemImage: [
      {
        image: string
      },
      { ... }
    ],
    itemVariant: [
      {
        id: string,
        label: string,
        price: number,
        stock: number
      },
      { ... }
    ],
  }
}
```

*fail*:
- item tidak ditemukan


<br>

### Mendapatkan data diri seller by id

<br>

> GET API/SELLER/[id]

<br>

Response Data = 
```TS
{
  seller: {
    id: string;
    user: {
      username: string;
      image: string | null;
    };
    city: string;
    soldCount: number;
  }
}
```

*fail* :
- id tidak ditemukan
- seller tidak terverifikasi


<br>

### Mendapatkan item by seller id

<br>

> GET API/SELLER/[id]/ITEM

<br>

Response Data = 
```TS
[
    {
      item: {
        id: string;
        itemImage: [
          {
            image: string
          }, // image hanya muncul 1
        ],
        itemVariant: [
          {
            price: number;
          }, // price diurutkan berdasarkan termurah
          { ... }
        ],
        title: string;
      }
    },
    { ... },
]
```
<br>

### Mendapatkan Top Seller

<br>

> GET API/SELLER/TOP

<br>

Response Data = 
```TS
{
  sellers: [
    id: string,
    city: string,
    user: {
      select: {
        username: string,
        image: string,
      }
    },
    { ... }
  ] // mendapatkan 6 item
}
```

<br>

### Mendapatkan Shipper

<br>

> GET API/SHIPPER

<br>

Response Data = 
```TS
{
  shippers: [
    {
      city: string,
      price: number,
      name: string,
    },
    { ... }
  ]
}
```
<br>

---

<br>

## USER

<br>

### Common Fail :

<br>

- Token tidak ada
- User diban
- *POST* => Body request tidak sesuai

<br>


### Mendapatkan data diri 
*(khusus route ini bisa diakses bahkan jika user terbanned)*

<br>

> GET API/USER/ME 

<br>

Response Data = 
```TS
{
  username: string,
  status: enum(ACTIVE/BANNED),
  email: string,
  phoneNumber: string | null,
  image: string | null,
  createdAt: Date,
  updatedAt: Date,
}
```
<br>


### Melakukan edit/ Menambahkan data diri 
*(username, phoneNumber, photoProfile)*

<br>

> PUT API/USER/ME

<br>

Request Body = 
```TS
{
  username: string | undefined,
  image: string | undefined,
  phoneNumber: string | undefined,
}
```

*Semua key optional tetapi harus mengisikan salah satunya*

<br>

*fail*:
- username sudah digunakan *(jika mengisi username)*
- phoneNumber berisikan value selain angka *(angka bentuk string) (jika mengisi phoneNumber)*

<br>

### Menambahkan alamat pengiriman

<br>

> POST API/USER/ME/ADDRESS

<br>

Body Request = 
```TS
{
  label: string,
  city: string,
  address: string,
  postalCode: string,
  note: string | undefined
}
```


```TS
Response Message: "Berhasil menambahkan alamat"
```
<br>

### Mendapatkan list alamat pengiriman

<br>

> GET API/USER/ME/ADDRESS

<br>

```TS
Response Data = {
  address: [
    {
      id: string,
      label: string;
      city: string;
      postalCode: string;
      address: string;
      note: string | null;
    },
    { ... }
  ]
}
```

<br>

### Mengedit alamat pengiriman

<br>

> PUT API/USER/ME/ADDRESS

<br>

```TS
Body Request = {
  addressId: string,
  label: string | undefined,
  city: string | undefined,
  postalCode: string | undefined,
  address: string | undefined,
  note: string | undefined
}
```

*Semua key optional tetapi harus mengisikan salah satunya*

<br>

```TS
Response Message: "Berhasil mengedit alamat"
```

*fail* :
- Bukan address miliknya

<br>

### Menghapus alamat pengiriman

<br>

> DELETE API/USER/ME/ADDRESS

<br>

```TS
Body Request = {
  addressId: string
}
```

```TS
Response Message: "Berhasil menghapus alamat"
```

*fail*:
- Bukan address miliknya

<br>

### Mengajukan diri menjadi seller

<br>

>POST API/USER/UPGRADE

<br>


```TS
Request Body = {
  city: string;
  address: string;
  bankName: string;
  bankNumber: string;
  ownerName: string;
}
```

```TS
Response Message = "Berhasil mengajukan akun seller"
```

*fail*:
- Sudah pernah mengajukan diri
- Role akun bukan user
- Bank Number minimal 8
- User belum menambahkan nomor telephone

<br>

### Mendapatkan item di cart

<br>

> GET API/USER/CART

<br>

```TS
Response Data = 
  cart: [
      {
          id: string,
          item: {
              id: string,
              title: string,
              seller: {
                  city: aa,
                  user: {
                      username: string,
                      image: null
                  }
              },
              itemImage: [
                  {
                      image: string
                  }, // hanya 1
              ]
          },
          cartVariant: [
              {
                  id: true,
                  amount: number,
                  itemVariant: {
                      label: string,
                      price: number
                  }
              },
              { ... }
          ]
      },
      { ... }
  ]
```

*note : jika seller sewaktu-waktu tekena banned, item dlm cart tidak akan ditampilkan*


<br>

### Menambahkan item di cart (dapat menambahkan variasi item keitem jika item sudah ad dicart)

<br>

> POST API/USER/CART

<br>

```TS
Body Request = {
  itemId: string,
  itemVariant: [
    {
      id: string ( id => itemVariantId),
      amount: number
    },
    { ... }
  ]
}
```

*note jika variasi item sudah ad tetapi ditambahkan lgi maka yang tertambah hanya amountnya*

<br>

```TS
Response Message = `Berhasil menambahkan ${title} didalam cart`
```

*fail* : 
- Amount lebih besar dari stock item yang tersedia
- amount kurang dari 1
- Item tidak ditemukan
- Seller terbanned

<br>

### Mengubah amount item di cart

<br>

> PUT API/USER/CART

<br>

```TS
Body Request = {
  cartId: string,
  itemVariant: [
    {
      id: string ( id => itemVariantId),
      amount: number
    },
    { ... }
  ]
}
```

```TS
Response Message = `Berhasil melakukan edit jumlah ${title} didalam cart`
```

*fail* : 
- Amount lebih besar dari stock item yang tersedia
- amount kurang dari 1
- Cart item tidak ditemukan
- Jika mencoba update cart dengan amount yang sama, api akan ttp success tetapi tidak merubah database
- Seller terbanned

<br>

### Menghapus itemVariant dalam cart

<br>

> DELETE API/USER/CART

<br>

```TS
Body Request = {
  cartId: true,
  cartVariant: true
}
``` 

```TS
Response Message = `Berhasil menghapus ${title} didalam cart`
```

*fail* :
- item tidak ditemukan
- amount kurang dari 1

<br>

*note :*
- *dapat dihapus meskipun seller terbanned*
- *jika semua variant item dihapus maka cart terhapus otomatis*

<br>

### Melakukan checkout/order dengan cart

<br>

> POST API/USER/CART/ORDER

<br>

```TS
Body Request = {
  cartId: string,
  cartVariant: string[] | undefined, (array kosong tidak diterima)
  itemNote: string,
  addressId: string,
  shipperId: string,
}
```

```TS
  Response Message = message: `Berhasil melakukan order ${title}`
```

*fail* :
  - user harus sudah mendaftarkan nomor telephone
  - cart tidak ditemukan
  - stock item tidak cukup

<br>

### Mendapatkan list item checkout/order

<br>

> GET API/USER/ORDER?page=x&itemCount=x&search=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

page = 1
itemCount = 5

page -> number
itemCount -> number
search -> string | undefined
search -> berdasarkan title
```

```TS
Response Data = orders: [
    {
        id: string,
        title: string,
        price: number (generate otomatis sebagai total harga),
        amount: number,
        createdAt: Date,
        itemOrderVariant: [
            {
                label: string,
                amount: number,
                price: number
            },
            { ... }
        ],
        itemOrderStatus: [
            {
                status: PAYMENT (default),
                createdAt: Date
            }
        ],
        itemOrderImage: [
            {
                image: string
            } // hanya 1
        ],
        seller: {
            city: string,
            user: {
                username: string,
                image: string | null
            }
        }
    },
    { ... }
]
```

<br>

### Melakukan checkout/order item

<br>

> POST API/USER/ORDER

<br>

```TS
Body Request = {
  itemId: string,
  itemNote: string,
  addressId: string,
  shipperId: string,
  itemVariant: [
    {
      id: string, (id => itemVariantId)
      amount: number
    },
    { ... }
  ]
}
```

```TS
Response Message = `Berhasil melakukan checkout ${title}`
```


*fail* :
- item tidak ditemukan
- amount melebihi stock item
- amount kurang dari 1
- seller terbanned
- user harus sudah mendaftarkan nomor telephone

<br>

### Melakukan request payment

<br>

> POST API/USER/PAYMENT

<br>

```TS
Body Request = {
  orderId: string;
}
```

```TS
Response Data = {
  token: string;
  redirect_url: string;
}
```

*fail* :
- jika sudah ada payment yang berlangsung dan belum expire
- order tidak ditemukan
- user tidak memiliki akses order

<br>

### Menyelesaikan Orderan

<br>

> API/USER/ORDER/[Id]/CONFIRM

*id => orderId*

<br>

```TS
Response Message = `Berhasil menyelesaikan orderan ${title}`
```

<br>

*fail* :
- status order belum "arrive"
- order tidak ditemukan
- user tidak memiliki akses order


<br>

### Mendapatkan Item Request yang dilakukan

<br>

> GET API/USER/REQUEST

<br>

```TS
Response Data = {
  --- sosil dulu bang
}
```

<br>

### Melakukan Request Item

<br>

> POST API/USER/REQUEST

<br>

```TS
Body Request = {
  itemId: string;
  image: string[]; (image dari inputan user)
  itemNote: string;
  variant: {
    id: string; (id => itemVariantId)
    amount: number;
  }[];
  shipperId: string;
  addressId: string;
}
```

```TS
Response Message = `Berhasil melakukan request ${itemName}`
```

*fail* :
- Item tidak ditemukan
- Address tidak ditemukan
- Shipper tidak ditemukan


<br>

---
<br>


## SELLER

<br>

### Common fail :
- Token tidak ada
- User bukan seller
- Seller belum di verifikasi
- Seller diban
- *POST* => Body request tidak sesuai

<br>

### Mendapatkan data diri akun seller (khusus route ini bisa diakses bahkan jika user terbanned)

<br>

> GET API/PARTNER/ME

<br>

```TS
Response Data = user: {
    id: string,
    userId: string,
    verifiedAt: string,
    createdAt: Date,
    updatedAt: Date
}
```

<br>

*fail* :
- Akun seller tidak ditemukan (belum pernah diajukan)

<br>

### Mengajukan Item Penjualan

<br>

> POST API/PARTNER/ITEM

<br>

```TS
Body Request : {
  title: string,
  description: string | undefined,
  images: [
      string, ...
  ],
  itemVariant: [
      {
          label: string,
          price: number > 1000,
          stock: number > 1
      },
      { ... }
  ]
}
```

```TS
Response Message = "Berhasil mengajukan item penjualan"
```

<br>

### Mendapatkan list semua item yang diajukan

<br>

> GET API/PARTNER/ITEM?page=x&itemCount=x&search=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

page = 1
itemCount = 5

page -> number | undefined
itemCount -> number | undefined
search -> string | undefined
search -> berdasarkan title
```

```TS
Response Data = {
  items: [
    {
      id: string,
      title: string,
      description: string,
      verifiedAt: Date | null,
      createdAt: Date,
      updatedAt: Date,
      itemImage: [
        {
          image: string,
        }, // hanya menampilkan 1
      ],
      _count: {
        itemVariant: number,
        cart: number
      }
    },
    { ... }
  ]
}
```

*fail* :
- page dan itemCount kurang dari 1
- page dan itemCount bukan number

<br>

### Mendapatkan Item by Id

<br>

> GET API/PARTNER/ITEM/[id]

*id => itemId*

<br>

```TS
Response Data = {
  item: {
    id: string,
    title: string,
    description: string,
    verifiedAt: Date | null,
    createdAt: Date,
    updatedAt: Date,
    itemImage: [
      {
        image: string
      },
      { ... }
    ],
    itemVariant: [
      {
        label: string,
        price: number,
        stock: number
      },
      { ... }
    ]
  }
}
```

*fail* :
- Item tidak ditemukan

<br>

### Mendapatkan list semua item yang sudah diverifikasi

<br>

> GET API/PARTNER/ITEM?page=x&itemCount=x&search=x&verified=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

page = 1,
itemCount = 5

page -> number | undefined
itemCount -> number | undefined
search -> string | undefined
verified -> string apapun

search -> berdasarkan title
```

```TS
Response Data = {
  items: [
    {
      id: string,
      title: string,
      description: string,
      verifiedAt: Date,
      createdAt: Date,
      updatedAt: Date,
      itemImage: [
        {
          image: string,
        }, // hanya menampilkan 1
      ],
      _count: {
        itemVariant: number,
        cart: number
      }
    },
    { ... }
  ]
}
```

*fail* :
- page dan itemCount kurang dari 1
- page dan itemCount bukan number

<br>

### Mendapatkan Semua Orderan Item

<br>

> GET API/PARTNER/ORDER?page=x&itemCount=x

*(hanya menampilkan orderan yang telah dibayarkan)*

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

page = 1,
itemCount = 5

page -> number | undefined
itemCount -> number | undefined
```

<br>

```TS
// Beritahu untuk kebutuhan data lainnya
// untuk sekarang masih default database
Response Data = [
  {
    id: string,
    userId: string,
    sellerId: string,
    title: string,
    description: string,
    itemNote: string,
    city: string,
    address: string,
    postalCode: string,
    addressNote: string?,
    shipper: string,
    shipperPrice: number,
    price: number,
    amount: number,
    createdAt: Date,
    updatedAt: Date,
  },
  { ... }
]
```
<br>

*fail* :
- page dan itemCount kurang dari 1
- page dan itemCount bukan number

<br>

### Mendapatkan Orderan Item By Id

<br>

> GET API/PARTNER/ORDER/[id]

*id => orderId*

<br>

```TS
// Beritahu untuk kebutuhan data lainnya
// untuk sekarang masih default database
Response Data = {
  id: string,
  userId: string,
  sellerId: string,
  title: string,
  description: string,
  itemNote: string,
  city: string,
  address: string,
  postalCode: string,
  addressNote: string?,
  shipper: string,
  shipperPrice: number,
  price: number,
  amount: number,
  createdAt: Date,
  updatedAt: Date,
}
```

<br>

### Mengganti Status Orderan

<br>

> POST API/PARTNER/ORDER/[id]/(enum)

*id => orderId*

<br>

```TS
Note : Gunakanlah aturan dan urutan yang ada

database enum =>

enum OrderStatus {
  PAYMENT             @map("Menunggu pembayaran")
  SELLER_VERIFICATION @map("Verifikasi Seller")
  PRODUCT_PROCESS     @map("Pesanan diproses")
  READY               @map("Pesanan siap diantar")
  SHIPPING            @map("Pesanan sedang diantar")
  ARRIVE              @map("Pesanan sudah sampai tujuan")
  DONE                @map("Pesanan selesai")
  CANCEL              @map("Pesanan dibatalkan")
  REJECT              @map("Pesanan ditolak")
}

API enum =>
SELLER_VERIFICATION to PRODUCT_PROCESS === /VERIFY
PRODUCT_PROCESS to READY === /READY
READY to SHIPPING === /SHIPPING
SHIPPING to ARRIVE === /ARRIVE

example = 
SELLER_VERIFICATION to PRODUCT_PROCESS
API ROUTE => (POST API/PARTNER/ORDER/[id]/VERIFY)
```

<br>

```TS
Response Message = `Berhasil mengubah status ${item}`
```

<br>

*fail* :
- orderan tidak ditemukan
- orderan bukan milik seller

<br>

---

<br>

## ADMIN

<br>

### Common fail :
- Token tidak ada
- User bukan admin

<br>

### Meverifikasi akun seller

> POST API/ADMIN/SELLER/[id]/VERIFY

*id => sellerId*

<br>

```TS
Response Message = "Seller berhasil diverifikasi"
```

*fail*:
- Seller tidak ditemukan
- Seller sudah diverifikasi

<br>

### Mendapatkan semua akun

<br>

> GET API/ADMIN/ACCOUNT?page=x&itemCount=x&search=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default 

page = 1
itemCount = 5

page -> number | undefined
itemCount -> number | undefined
search -> string | undefined
search -> berdasarkan username/email
```

```TS
Response Data = accounts: [
  {
    id: string,
    username: string,
    status: enum(ACTIVE/BANNED),
    email: string,
    image: string | null,
    phoneNumber: string | null,
    createdAt: Date,
    updatedAt: Date,
    seller: {
      id: string,
      verifiedAt: string | null,
    } | null
  },
  { ... }
]
```

<br>

### Mendapatkan akun by id

<br>

> GET API/ADMIN/ACCOUNT/[id]

*id => userId*

<br>

```TS
Response Data = accounts: {
  id: string,
  username: string,
  status: enum(ACTIVE/BANNED),
  email: string,
  image: string | null,
  phoneNumber: string | null,
  createdAt: Date,
  updatedAt: Date,
  seller: {
    id: string,
    verifiedAt: Date | null,
  } | null
}
```

<br>

### Mendapatkan semua akun seller

<br>

> GET API/ADMIN/SELLER?page=x&itemCount=x&search=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default page = 1

itemCount = 5
page -> number | undefined
itemCount -> number | undefined
search -> string | undefined
search -> berdasarkan username/email
```

```TS
Response Data = accounts: [
  {
    id: string,
    city: string,
    verifiedAt: string | null,
    createdAt: Date,
    user: {
      username: string,
      status: enum(ACTIVE/BANNED),
      email: string,
    }
  },
  { ... }
]
```

<br>

### Mendapatkan akun seller by id

<br>

> GET API/ADMIN/SELLER/[id]

*id => sellerId*

<br>

```TS
Response Data = {
  account: {
    id: string,
    city: string,
    address: string,
    verifiedAt: string | null,
    updateAt: Date,
    createdAt: Date,
    user: {
      username: string,
      status: enum(ACTIVE/BANNED),
      email: string,
      phoneNumber: string | null,
      image: string | null,
    },
    bank: {
      bankName: string,
      bankNumber: string,
      ownerName: string
    }
  }
}
```

<br>

*fail*:
- seller tidak ditemukan

<br>

### Melakukan ban terhadap akun

> POST API/ADMIN/ACCOUNT/[id]/BAN

*id => userId*

<br>

```TS
Response Message = "Berhasil melakukan ban terhadap akun"
```

*fail*:
- Akun tidak ada
- Akun sudah dibanned

<br>

### Melakukan unban terhadap akun

<br>

> POST API/ADMIN/ACCOUNT/[id]/UNBAN

*id => userId*

```TS
Response Message = "Berhasil melakukan unban terhadap akun"
```

*fail*:
- Akun tidak ada
- Akun berstatus aktif

<br>

### Meverifikasi item seller

<br>

> POST API/ADMIN/ITEM/[id]/VERIFY

*id => itemId*

<br>

```TS
Response Message = "Item berhasil di verifikasi"
```

*fail*:
- Item tidak ditemukan
- Item sudah diverifikasi

<br>

### Mendapatkan semua item

<br>

> GET API/ADMIN/ITEM?page=x&itemCount=x&search=x

<br>

```TS
jika tidak memberi query page atau itemCount maka akan default page = 1

itemCount = 5
page -> number | undefined
itemCount -> number | undefined
search -> string | undefined
search -> berdasarkan username/email
```

```TS
Response Data = {
  items: [
    {
      id: string,
      title: string,
      verifiedAt: Date | null,
      createdAt: Date,
      updatedAt: Date,
      itemImage: [
        {
          image: string,
        },
        { ... }
      ],
      seller: {
        id: string,
        city: string,
        verifiedAt: Date,
        user: {
          username: string,
          email: string,
          status: enum(ACTIVE/BANNED)
        }
      },
      _count: {
        itemVariant: number
      }
    },
    { ... }
  ]
}
```

<br>

### Mendapatkan item by id

<br>

> GET API/ADMIN/ITEM/[id]

*id => itemId*

```TS
Response Data = {
  item: {
    id: string,
    title: string,
    verifiedAt: Date | null,
    createdAt: Date,
    updatedAt: Date,
    itemImage: [
      {
        image: string
      },
      { ... }
    ],
    seller: {
      id: string,
      city: string,
      verifiedAt: Date | null,
      user: {
        username: string,
        email: string,
        status: enum(ACTIVE/BANNED)
      }
    },
    itemVariant: [
      {
        label: string,
        price: number,
        stock: number
      },
      { ... }
    ]
  }
}
```

*fail* :
- jika item tidak ditemukan

<br>

### Menambahkan shipper

<br>

> POST API/ADMIN/SHIPPER

<br>

```TS
Body Request = {
  name: string,
  price: number > 1000,
  city: string,
}
```

```TS
Response Message = "Berhasil menambahkan shipper"
```

<br>

### Mengedit Shipper

<br>

> PUT API/ADMIN/SHIPPER

<br>

```TS
Body Request = {
  id: string, (id => shipperId)
  name: string | undefined, 
  price: number > 1000 | undefined,
  city: string | undefined,
}
```

*Semua key optional tetapi harus mengisikan salah satunya*

<br>

```TS
Response Message = "Berhasil mengedit shipper"
```

<br>

### Menghapus Shipper

<br>

> DELETE API/ADMIN/SHIPPER

<br>

```TS
Body Request: {
  id: string (id => shipperId)
}
```

```TS
Response Message = "Berhasil menghapus shipper"
```

<br>

### Mendapatkan Shipper

<br>

  > Baca dokumentasi get shipper di guest


<br>

---

<br>

## MIDTRANS

<br>

### Melakukan Konfirmasi Payment

<br>

> POST API/USER/PAYMENT/NOTIFICATION

note: *only hit this api in beta version*

```TS
Body Request = {
  order_id: string;
  transaction_id: string;
  payment_type: string;
  gross_amount: number;
  transaction_time: Date;
  currency: string;
  signature_key: string;
} 

// (Menyesuaikan dengan API DOCS MIDTRANS)
```

```TS
Response Message = `${body.order_id} payment verified`
```
