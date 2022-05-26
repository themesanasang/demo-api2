import knex, { Knex } from 'knex'

export class VisitModel {

  saveOpd(db: Knex, data: any) {
    return db('opd')
      .insert(data);
  }

  saveIpd(db: Knex, data: any) {
    return db('ipd')
      .insert(data);
  }

  getLastAn(db: Knex){
      const sql = "SELECT an+1 as an from ipd ORDER BY an desc limit 1;";
      return db.raw(sql)
  }
  discharge(db: Knex, an: any, data: any) {
      return db('ipd')
      .where({an: an})
      .update(data)
  }

  getOPDDetail(db: Knex, vn: any) {
    const sql = "SELECT concat(vstdate) as vstdate, concat(vsttime) as vsttime, "+
    " o.vn, o.hn,p.fullname,p.cid,o.staff,u.fullname as uname from opd o "+
    " left join patient p on o.hn=p.hn "+
    " left join user u on o.staff=u.id "+
    " where vn='"+vn+"'"

    return db.raw(sql);
  }

  getIPDDetail(db: Knex, an: any) {
    const sql = "SELECT concat(regdate) as regdate, concat(regtime) as regtime, "+
    " i.an, i.hn,p.fullname,p.cid,i.staff,u.fullname as uname, i.dchdate, i.dchtime from ipd i "+
    " left join patient p on i.hn=p.hn "+
    " left join user u on i.staff=u.id "+
    " where an='"+an+"'"

    return db.raw(sql);
  }

  deleteOPD(db: Knex, vn: any) {
    return db('opd')
    .where({vn: vn})
    .delete()
  }

  deleteIPD(db: Knex, an: any) {
    return db('ipd')
    .where({an: an})
    .delete()
  }

  opd(db: Knex){
    const sql = "SELECT concat(vstdate) as vstdate, concat(vsttime) as vsttime, "+
    " o.vn, o.hn,p.fullname,p.cid,o.staff,u.fullname as uname from opd o "+
    " left join patient p on o.hn=p.hn "+
    " left join user u on o.staff=u.id "+
    " where vstdate = CURDATE()"

    return db.raw(sql);
  }

  ipd(db: Knex){
      const sql = " SELECT concat(regdate) as regdate, regtime, "+
      " concat(dchdate) as dchdate,i.dchtime, "+
      " i.an, i.hn,p.fullname,p.cid,i.staff,u.fullname as uname from ipd i "+
     " left join patient p on i.hn=p.hn "+
     " left join user u on i.staff=u.id "+
     " where regdate = CURDATE()"

     return db.raw(sql)
  }
}