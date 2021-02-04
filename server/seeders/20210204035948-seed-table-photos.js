'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Photos', [{
      imageUrl: "https://hatrabbits.com/wp-content/uploads/2017/01/random.jpg",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      imageUrl: "https://unsplash.com/photos/Wzj7rBxxMaw",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      imageUrl: "https://unsplash.com/photos/_9a-3NO5KJE",
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  
  ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down:  (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Photos', null, {})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
