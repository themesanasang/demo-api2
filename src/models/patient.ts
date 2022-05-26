import knex, { Knex } from 'knex'

export class PatienttModel {

  savePatient(db: Knex, data: any) {
    return db('patient')
      .insert(data);
  }

  uuId(db: Knex){
      const sql = "SELECT upper(concat('{', UUID(), '}')) as p_guid";
      return db.raw(sql);
  }

  getPatient(db: Knex) {
    const sql = "select hn, cid, fullname, sex, staff, date_format(created, '%d-%m-%Y') as created from patient";
  
    return db.raw(sql);
  }

  getPatientDetail(db: Knex, hn: any) {
    const sql = "select hn, cid, fullname, sex, staff, date_format(created, '%d-%m-%Y') as created from patient where hn='"+hn+"'";
  
    return db.raw(sql);
  }

  update(db: Knex, hn: any, data: any) {
      return db('patient')
      .where({hn: hn})
      .update(data)
  }

  deletePatient(db: Knex, hn: any) {
    return db('patient')
    .where({hn: hn})
    .delete()
  }

}