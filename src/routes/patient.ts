/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { PatienttModel } from '../models/patient';
import { hermesNever } from '@generic-ui/hermes';

const patientModel = new PatienttModel();
const router: Router = Router();


router.get('/uuid', async (req: Request, res: Response) => {
    try {
        let rs: any = await patientModel.uuId(req.db);

        res.send(rs[0][0].p_guid)
    } catch (error) {
        
    }
});

router.get('/getPatient' , async (req: Request, res: Response) => {
    try {
        let rs: any = await patientModel.getPatient(req.db);
        res.send({ok: true, result: rs[0]})
    } catch (error) {
        res.send({ok: false, message: error.message})
    }
})

router.get('/getPatientDetail/:hn' , async (req: Request, res: Response) => {
    try {
      let hn = req.params.hn;
      let rs: any = await patientModel.getPatientDetail(req.db, hn);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
  })

router.post('/save', async (req: Request, res: Response) => {

    let rs: any = await patientModel.uuId(req.db);
    let p_guid = rs[0][0].p_guid;

    let hn = req.body.hn;
    let cid = req.body.cid;
    let fullname = req.body.fullname;
    let sex = req.body.sex;
    let staff = req.body.staff;
    let created = moment().format('YYYY-MM-DD HH:mm:ss');
    let updated = moment().format('YYYY-MM-DD HH:mm:ss');

    let data: any = {
        p_guid: p_guid,
        hn: hn,
        cid: cid,
        fullname: fullname,
        sex: sex,
        staff: staff,
        created: created,
        updated: updated,
    };

    await patientModel.savePatient(req.db, data);

    res.send({ok: true, result: 'insert data success'})

})

router.put('/update', async (req: Request, res: Response) => {
    let hn = req.body.hn;
    let fullname = req.body.fullname;
    let cid = req.body.cid;
    

    let data: any = {
        fullname: fullname,
        cid: cid,
    }

    try {
        await patientModel.update(req.db,hn,data);
        res.send({ok: true, message: 'update data success'})
    } catch (error) {
        res.send({ok: false, message: error.message})
    }

})

router.delete('/delete/:hn' , async (req: Request, res: Response) => {
    try {
      let hn = req.params.hn;
      let rs: any = await patientModel.deletePatient(req.db, hn);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
})

export default router;

