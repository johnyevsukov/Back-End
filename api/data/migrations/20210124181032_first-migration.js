exports.up = function(knex) {
  return knex.schema
    .createTable('users', (users) => {
      users.increments('user_id')
      users.string('user_username', 200).notNullable()
      users.string('user_password', 200).notNullable()
      users.string('user_email', 320).notNullable().unique()
      users.string('user_species', 200)
      users.date('user_birthday')
      users.string('user_location', 200)
      users.timestamps(false, true)
    })
    .createTable('posts', (posts) => {
      posts.increments('post_id')
      posts.string('post_text', 350).notNullable()
      posts.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
    .createTable('comments', (comments) => {
      comments.increments('comment_id')
      comments.string('comment_text', 350).notNullable()
      comments.integer('post_id')
      .unsigned()
      .notNullable()
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      comments.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
    .createTable('likes', (likes) => {
      likes.increments('like_id')
      likes.integer('post_id')
      .unsigned()
      .references('post_id')
      .inTable('posts')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      likes.integer('comment_id')
      .unsigned()
      .references('comment_id')
      .inTable('comments')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      likes.integer('user_id')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
    .createTable('connections', (connections) => {
      connections.increments('connection_id')
      connections.integer('connection_one')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      connections.integer('connection_two')
      .unsigned()
      .notNullable()
      .references('user_id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('connections')
    .dropTableIfExists('likes')
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('users')
}
