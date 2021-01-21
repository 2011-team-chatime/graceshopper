/* eslint-disable no-unused-vars */
'use strict'

const db = require('../server/db')
const {User, Product, Order} = require('../server/db/models')

const users = [
  {
    name: 'Alasdair',
    isAdmin: true,
    address: '4012 Lillian Crossing',
    paymentinfo: '5602234373317821',
    email: 'admin@bookshopper.com',
    password: '12345*'
  },
  {
    name: 'Valerie',
    isAdmin: true,
    address: '93072 Rutledge Plaza',
    paymentinfo: '3586511504697618',
    email: 'Valerie@163.com',
    password: '12345*'
  },
  {
    name: 'Madelle',
    isAdmin: false,
    address: '044 Pankratz Lane',
    paymentinfo: '5018362002671975',
    email: 'user@gmail.com',
    password: '12345*'
  },
  {
    name: 'Elga',
    isAdmin: false,
    address: '27402 Kings Circle',
    paymentinfo: '30067489591878',
    email: 'epagen3@yahoo.co.jp',
    password: 'CbUK79N'
  },
  {
    name: 'Abbie',
    isAdmin: false,
    address: '64182 Dunning Terrace',
    paymentinfo: '490303719463391393',
    email: 'aostridge4@indiatimes.com',
    password: 'VzcweD9ekf'
  },
  {
    name: 'Lian',
    isAdmin: false,
    address: '084 Prairie Rose Terrace',
    paymentinfo: '5641824930213021601',
    email: 'lgarstang5@google.co.jp',
    password: '342kdf3v44I'
  },
  {
    name: 'Sophia',
    isAdmin: false,
    address: '0 Washington Center',
    paymentinfo: '337941782593445',
    email: 'sskones6@wix.com',
    password: 'Vt8mGE'
  },
  {
    name: 'Brannon',
    isAdmin: false,
    address: '31583 Dorton Junction',
    paymentinfo: '201629618494606',
    email: 'bpenticost7@woothemes.com',
    password: 'QdatAlhvFLE'
  },
  {
    name: 'Wadsworth',
    isAdmin: false,
    address: '0 Mayer Street',
    paymentinfo: '3532824150232092',
    email: 'walywin8@auda.org.au',
    password: 'p8b4l9a9'
  },
  {
    name: 'Daryn',
    isAdmin: false,
    address: '1371 Center Trail',
    paymentinfo: '560222818743423576',
    email: 'dtooze9@latimes.com',
    password: 'y06sfM'
  },
  {
    name: 'Wilden',
    isAdmin: false,
    address: '09 Grim Terrace',
    paymentinfo: '201833552477888',
    email: 'walbrook@wiki.org',
    password: '123pass'
  },
  {
    name: 'Bertie',
    isAdmin: false,
    address: '059 Starling Court',
    paymentinfo: '6763980783515512129',
    email: 'bmangonb@photobucket.com',
    password: 'zFXKzyi'
  },
  {
    name: 'Rolf',
    isAdmin: false,
    address: '0 Atwood Hill',
    paymentinfo: '6761225333652914',
    email: 'rdudnyc@barnesandnoble.com',
    password: 'CtJQLD'
  },
  {
    name: 'Waly',
    isAdmin: false,
    address: '930 Oneill Lane',
    paymentinfo: '3529254881270150',
    email: 'wwallbuttond@yandex.ru',
    password: 'foMIG5gLc5'
  },
  {
    name: 'Katy',
    isAdmin: false,
    address: '73 Truax Parkway',
    paymentinfo: '3556412360966906',
    email: 'kaitkine@archive.org',
    password: 'LZUHabwYYsdU'
  },
  {
    name: 'Emmalynn',
    isAdmin: false,
    address: '4 Scofield Plaza',
    paymentinfo: '3554233973391866',
    email: 'esprittf@facebook.com',
    password: 'G2s67ng'
  },
  {
    name: 'Brandy',
    isAdmin: false,
    address: '260 Monica Junction',
    paymentinfo: '5048375147725799',
    email: 'bpetticrowg@kickstarter.com',
    password: 'TBcUfGTa'
  },
  {
    name: 'Timothee',
    isAdmin: false,
    address: '58 Village Green Crossing',
    paymentinfo: '503898765858114321',
    email: 'ttyeh@guardian.co.uk',
    password: 'mBf3zSJ6v'
  },
  {
    name: 'Hercules',
    isAdmin: false,
    address: '305 Northland Hill',
    paymentinfo: '3554035745855809',
    email: 'halbasinii@squarespace.com',
    password: 'HDye3tD'
  },
  {
    name: 'Vikki',
    isAdmin: false,
    address: '2 Arizona Crossing',
    paymentinfo: '3536775468232040',
    email: 'vfenichj@sina.com.cn',
    password: 'lpSdWhc'
  }
]

const products = [
  {
    title: 'erat tortor',
    author: 'Anastassia Dallaghan',
    price: 860,
    quantity: 14,
    genre: 'Sci-fi',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.'
  },
  {
    title: 'quis turpis',
    author: 'Ricky Derx',
    price: 2402,
    quantity: 1,
    genre: 'Nonfiction',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {
    title: 'nibh id',
    author: 'Ermin Thecham',
    price: 491,
    quantity: 96,
    genre: 'Young Adult',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'nulla tellus',
    author: 'Fanya Somerlie',
    price: 2861,
    quantity: 13,
    genre: 'Sci-fi',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {

    title: 'odio porttitor',
    author: 'Kirsti Gruczka',
    price: 2238,
    quantity: 71,
    genre: 'Sci-fi',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    title: 'interdum mauris',
    author: 'Moises Silverstone',
    price: 2594,
    quantity: 83,
    genre: 'Fiction',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    title: 'faucibus cursus',
    author: 'Jaimie Pocklington',
    price: 842,
    quantity: 37,
    genre: 'Nonfiction',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.'
  },
  {

    title: 'duis faucibus',
    author: 'Kathye Peattie',
    price: 1699,
    quantity: 77,
    genre: 'Mystery',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {

    title: 'ligula nec',
    author: 'Ryan Woollard',
    price: 1214,
    quantity: 44,
    genre: 'Mystery',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.'
  },
  {
    title: 'at nunc commodo',
    author: 'Anton Barnish',
    price: 1132,
    quantity: 93,
    genre: 'Fiction',
    description:
      'In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.'
  },
  {
    title: 'ultrices enim lorem',
    author: 'Tudor Redon',
    price: 1477,
    quantity: 3,
    genre: 'Other',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {

    title: 'interdum',
    author: 'Darius Sturridge',
    price: 1189,
    quantity: 82,
    genre: 'Other',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {
    title: 'fusce lacus purus',
    author: 'Dulci Batterson',
    price: 2203,
    quantity: 4,
    genre: 'Nonfiction',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'
  },
  {
    title: 'sapien iaculis at',
    author: 'Cynthia Broinlich',
    price: 2821,
    quantity: 70,
    genre: 'Other',
    description:
      'Sed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.'
  },
  {
    title: 'consequat lectus in est',
    author: 'Channa Halpen',
    price: 1858,
    quantity: 68,
    genre: 'Young Adult',
    description:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
  },
  {
    title: 'suspendisse potenti',
    author: 'Salvador Pirolini',
    price: 1614,
    quantity: 14,
    genre: 'Nonfiction',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.'
  },
  {
    title: 'urna ut tellus',
    author: 'Georgie Spellecy',
    price: 233,
    quantity: 42,
    genre: 'Fiction',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.'
  },
  {
    title: 'vivamus in felis',
    author: 'Brett Osichev',
    price: 2406,
    quantity: 45,
    genre: 'Other',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'ipsum praesent blandit',
    author: 'Maurits English',
    price: 1095,
    quantity: 14,
    genre: 'Young Adult',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'platea dictumst',
    author: 'Nicolis Van Arsdalen',
    price: 960,
    quantity: 55,
    genre: 'Nonfiction',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
  }
]

const orders = [
  {
    status: 'inCart',
    userId: 1
  },
  {
    status: 'inCart',
    userId: 2
  },
  {
    status: 'inCart',
    userId: 3
  },
  {
    status: 'inCart',
    userId: 4
  },
  {
    status: 'inCart',
    userId: 5
  },
  {
    status: 'inCart',
    userId: 6
  },
  {
    status: 'inCart',
    userId: 7
  },
  {
    status: 'inCart',
    userId: 8
  },
  {
    status: 'inCart',
    userId: 9
  },
  {
    status: 'inCart',
    userId: 10
  },
  {
    status: 'inCart',
    userId: 11,
    total: 3753
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  try {
    // const users = await Promise.all([
    //   User.create({email: 'cody@email.com', password: '123'}),
    //   User.create({email: 'murphy@email.com', password: '123'}),
    // ])
    const allUsers = await Promise.all(
      users.map(user => {
        return User.create(user)
      })
    )

    const allProducts = await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    const allOrders = await Promise.all(
      orders.map(order => {
        return Order.create(order)
      })
    )

    const [
      product1,
      product2,
      product3,
      product4,
      product5,
      product6,
      product7,
      product8,
      product9,
      product10,
      product11,
      product12,
      product13,
      product14,
      product15,
      product16,
      product17,
      product18,
      product19,
      product20
    ] = allProducts

    const [
      order1,
      order2,
      order3,
      order4,
      order5,
      order6,
      order7,
      order8,
      order9,
      order10,
      order11
    ] = allOrders

    await order11.setProducts([product1, product2, product3])

    console.log(`seeded ${products.length} products`)
    console.log(`seeded ${users.length} users`)
    console.log(`seeded successfully`)
  } catch (error) {
    console.log('There was a problem seeding db: ', error.message)
  }
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
