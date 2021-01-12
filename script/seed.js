'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

const products = [
  {
    title: 'nulla integer pede justo lacinia eget tincidunt eget tempus vel',
    author: 'Davita Bleasdale',
    price: 70.83,
    quantity: 58,
    genre: 'Other',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
  },
  {
    title: 'posuere felis sed lacus morbi sem mauris laoreet',
    author: 'Sabra Posvner',
    price: 83.65,
    quantity: 29,
    genre: 'Nonfiction',
    description:
      'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.'
  },
  {
    title: 'accumsan tellus nisi eu',
    author: 'Arny Harfleet',
    price: 32.88,
    quantity: 90,
    genre: 'Children',
    description:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.\n\nDuis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.'
  },
  {
    title: 'amet consectetuer adipiscing elit',
    author: 'Jeremias Bolger',
    price: 41.24,
    quantity: 78,
    genre: 'Sci-fi',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.'
  },
  {
    title: 'donec ut dolor morbi vel lectus in quam',
    author: 'Laurie Orbine',
    price: 31.04,
    quantity: 19,
    genre: 'Other',
    description:
      'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.'
  },
  {
    title: 'massa quis augue',
    author: 'Tommy Farndale',
    price: 4.55,
    quantity: 37,
    genre: 'Other',
    description:
      'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.\n\nPhasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.'
  },
  {
    title: 'leo pellentesque ultrices mattis odio donec vitae',
    author: 'Skipper Beall',
    price: 51.41,
    quantity: 80,
    genre: 'Romance',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.\n\nProin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
  },
  {
    title: 'id consequat in consequat ut nulla sed accumsan felis ut',
    author: 'Bess Spearing',
    price: 81.46,
    quantity: 21,
    genre: 'Other',
    description: 'In congue. Etiam justo. Etiam pretium iaculis justo.'
  },
  {
    title:
      'consectetuer adipiscing elit proin risus praesent lectus vestibulum quam',
    author: 'Donnamarie Vallentine',
    price: 68.49,
    quantity: 20,
    genre: 'Sci-fi',
    description:
      'Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit.'
  },
  {
    title: 'eget massa tempor convallis nulla neque libero convallis',
    author: 'Miltie Gaitung',
    price: 49.73,
    quantity: 25,
    genre: 'Other',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    title: 'nec euismod scelerisque quam turpis adipiscing lorem vitae',
    author: 'Bradford Wille',
    price: 70.55,
    quantity: 59,
    genre: 'Children',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.'
  },
  {
    title: 'ut dolor morbi vel lectus',
    author: 'Woodman McSpirron',
    price: 83.49,
    quantity: 91,
    genre: 'Nonfiction',
    description:
      'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.'
  },
  {
    title: 'ornare imperdiet sapien',
    author: 'Othelia Hillam',
    price: 71.34,
    quantity: 64,
    genre: 'Children',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.\n\nInteger ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.'
  },
  {
    title: 'ante ipsum primis in',
    author: 'Sampson Kitcherside',
    price: 49.02,
    quantity: 39,
    genre: 'Young Adult',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.\n\nMaecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.'
  },
  {
    title: 'at ipsum ac tellus semper interdum mauris',
    author: 'Maribel Culshew',
    price: 32.35,
    quantity: 25,
    genre: 'Fiction',
    description:
      'Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst.'
  },
  {
    title: 'risus praesent lectus vestibulum quam sapien',
    author: 'Dolly Goatman',
    price: 43.23,
    quantity: 26,
    genre: 'Young Adult',
    description:
      'Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius.'
  },
  {
    title: 'luctus et ultrices posuere cubilia curae',
    author: 'Prentiss Edinborough',
    price: 75.79,
    quantity: 47,
    genre: 'Young Adult',
    description:
      'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.'
  },
  {
    title: 'vel sem sed',
    author: 'Clementius Klulisek',
    price: 31.99,
    quantity: 86,
    genre: 'Mystery',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.'
  },
  {
    title: 'in lectus pellentesque at nulla suspendisse potenti',
    author: 'Thurstan McNeil',
    price: 33.36,
    quantity: 31,
    genre: 'Sci-fi',
    description:
      'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.'
  },
  {
    title: 'et magnis dis parturient montes nascetur ridiculus mus etiam',
    author: 'Adan Andrichak',
    price: 82.72,
    quantity: 53,
    genre: 'Sci-fi',
    description:
      'Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.'
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
