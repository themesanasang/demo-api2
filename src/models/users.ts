import knex, { Knex } from 'knex'

export class UsersModel {

  saveUser(db: Knex, data: any) {
    return db('user')
      .insert(data);
  }

  getUser(db: Knex) {
    const sql = "select id, username, fullname, date_format(created, '%d-%m-%Y') as created from user"
  
    return db.raw(sql);
  }

  getUserDetail(db: Knex, id: any) {
    const sql = "select id, username, fullname, date_format(created, '%d-%m-%Y') as created from user where id="+id+""
  
    return db.raw(sql);
  }

  updateUser(db: Knex, id: any, data: any) {
    return db('user')
    .where({id: id})
    .update(data)
  }

  deleteUser(db: Knex, id: any) {
    return db('user')
    .where({id: id})
    .delete()
  }

}