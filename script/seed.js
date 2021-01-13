'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    title: 'erat tortor sollicitudin',
    author: 'Anastassia Dallaghan',
    price: 860,
    quantity: 14,
    genre: 'Sci-fi',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.'
  },
  {
    title: 'quis turpis eget elit sodales',
    author: 'Ricky Derx',
    price: 2402,
    quantity: 1,
    genre: 'Nonfiction',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {
    title: 'nibh quisque id',
    author: 'Ermin Thecham',
    price: 491,
    quantity: 96,
    genre: 'Young Adult',
    description:
      'Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.\n\nCras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.'
  },
  {
    title: 'nulla tellus in sagittis dui vel',
    author: 'Fanya Somerlie',
    price: 2861,
    quantity: 13,
    genre: 'Sci-fi',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {
    title: 'odio porttitor id consequat in consequat ut nulla sed accumsan',
    author: 'Kirsti Gruczka',
    price: 2238,
    quantity: 71,
    genre: 'Sci-fi',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.'
  },
  {
    title:
      'interdum mauris non ligula pellentesque ultrices phasellus id sapien in',
    author: 'Moises Silverstone',
    price: 2594,
    quantity: 83,
    genre: 'Fiction',
    description:
      'Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.\n\nMorbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem.\n\nFusce consequat. Nulla nisl. Nunc nisl.'
  },
  {
    title: 'faucibus cursus urna ut tellus nulla',
    author: 'Jaimie Pocklington',
    price: 842,
    quantity: 37,
    genre: 'Nonfiction',
    description:
      'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.\n\nVestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.'
  },
  {
    title: 'duis faucibus accumsan odio curabitur convallis duis consequat dui',
    author: 'Kathye Peattie',
    price: 1699,
    quantity: 77,
    genre: 'Mystery',
    description:
      'Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.'
  },
  {
    title: 'ligula nec sem duis aliquam convallis nunc proin at',
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
    title:
      'ultrices enim lorem ipsum dolor sit amet consectetuer adipiscing elit',
    author: 'Tudor Redon',
    price: 1477,
    quantity: 3,
    genre: 'Other',
    description:
      'Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {
    title: 'interdum mauris non ligula pellentesque',
    author: 'Darius Sturridge',
    price: 1189,
    quantity: 82,
    genre: 'Other',
    description:
      'Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.\n\nPhasellus in felis. Donec semper sapien a libero. Nam dui.'
  },
  {
    title: 'fusce lacus purus aliquet at feugiat non pretium',
    author: 'Dulci Batterson',
    price: 2203,
    quantity: 4,
    genre: 'Nonfiction',
    description:
      'In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.\n\nSuspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'
  },
  {
    title:
      'sapien iaculis congue vivamus metus arcu adipiscing molestie hendrerit at',
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
    title: 'suspendisse potenti cras in purus',
    author: 'Salvador Pirolini',
    price: 1614,
    quantity: 14,
    genre: 'Nonfiction',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.\n\nEtiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.'
  },
  {
    title: 'urna ut tellus nulla',
    author: 'Georgie Spellecy',
    price: 233,
    quantity: 42,
    genre: 'Fiction',
    description:
      'Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.'
  },
  {
    title: 'vivamus in felis eu sapien cursus vestibulum',
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
    title: 'platea dictumst aliquam augue quam sollicitudin',
    author: 'Nicolis Van Arsdalen',
    price: 960,
    quantity: 55,
    genre: 'Nonfiction',
    description:
      'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.'
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

    await Promise.all(
      products.map(product => {
        return Product.create(product)
      })
    )

    console.log(`seeded ${products.length} products`)
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
