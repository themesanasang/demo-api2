/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';
import * as crypto from 'crypto';
import * as express from 'express';
import { Router, Request, Response } from 'express';

import { UsersModel } from '../models/users';

const usersModel = new UsersModel();
const router: Router = Router();

router.get('/user', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to User  Api Server!', code: HttpStatus.OK });
});

router.get('/getUser' , async (req: Request, res: Response) => {
  try {
      let rs: any = await usersModel.getUser(req.db);
      res.send({ok: true, result: rs[0]})
  } catch (error) {
      res.send({ok: false, message: error.message})
  }
})

router.get('/getUserDetail/:id' , async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let rs: any = await usersModel.getUserDetail(req.db, id);
    res.send({ok: true, result: rs[0]})
  } catch (error) {
    res.send({ok: false, message: error.message})
  }
})

router.put('/update', async (req: Request, res: Response) => {
  let id = req.body.id;
  let fullname = req.body.fullname;
  let username = req.body.username;

  let data: any = {
      fullname: fullname,
      username: username,
  }

  try {
      await usersModel.updateUser(req.db,id,data);
      res.send({ok: true, message: 'update data success'})
  } catch (error) {
      res.send({ok: false, message: error.message})
  }

})

// save new request
router.post('/save', async (req: Request, res: Response) => {
 
  let username = req.body.username;
  let password = req.body.password;
  let encPassword = crypto.createHash('md5').update(password).digest('hex');
  let fullname = req.body.fullname;
  let created = moment().format('YYYY-MM-DD HH:mm:ss');
  let updated = moment().format('YYYY-MM-DD HH:mm:ss');

  let data: any = {};
  data.username = username;
  data.password = encPassword;
  data.fullname = fullname;
  data.created = created;
  data.updated = updated;

  try {
    await usersModel.saveUser(req.db, data);
    res.send({ ok: true, code: HttpStatus.OK });
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.OK });
  }

});

router.delete('/delete/:id' , async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    let rs: any = await usersModel.deleteUser(req.db, id);
    res.send({ok: true, result: rs[0]})
  } catch (error) {
    res.send({ok: false, message: error.message})
  }
})

export default router;