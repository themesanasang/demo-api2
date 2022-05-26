import knex, { Knex } from 'knex'

export class Login {
  login(db: Knex, username: string, password: string) {
    return db('user')
      .where('username', username)
      .where('password', password)
      .limit(1);

  }

}