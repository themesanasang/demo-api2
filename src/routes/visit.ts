/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as zeroFill from 'zero-fill';
import { VisitModel } from '../models/visit';

const visitModel = new VisitModel();
const router: Router = Router();




router.post('/opd', async (req: Request, res: Response) => {

  

    let y= moment().format('YYYY');
    let n = parseInt(y)+543;
    let v = n.toString().substring(2);
    let m = moment().format('MMDDHHmmss');

    let vn = v+m;
    let hn = req.body.hn;
    let staff = req.body.staff;
    let vstdate = moment().format('YYYY-MM-DD');
    let vsttime = moment().format('HH:mm:ss');

    let data: any = {
        vn: vn,
        hn: hn,
        vstdate: vstdate,
        vsttime: vsttime,
        staff: staff
    };

    await visitModel.saveOpd(req.db, data);

    res.send({ok: true, message: 'insert data success'})

})

router.post('/ipd', async(req: Request, res: Response) => {

    let rs: any = await visitModel.getLastAn(req.db);

    let y= moment().format('YYYY');
    let n = parseInt(y)+543;
    let v = '0'+n.toString().substring(2);
    
    let an: any;
    if(rs[0].length === 0){
        an = v + zeroFill(6,1)
    }else{
        an = rs[0][0].an;
    }
    let hn = req.body.hn;
    let regdate = moment().format('YYYY-MM-DD');
    let regtime = moment().format('HH:mm:ss');
    let staff = req.body.staff;

    let data: any = {
        an: an,
        hn: hn,
        regdate: regdate,
        regtime: regtime,
        staff: staff
    }

    try {
        await visitModel.saveIpd(req.db, data);
        res.send({ok: true, message: 'insert data success',an: an})
    } catch (error) {
        res.send(error.message)
    }
   
})

router.put('/discharge', async (req: Request, res: Response) => {
    let an = req.body.an;

    let dchdate = moment().format('YYYY-MM-DD');
    let dchtime = moment().format('HH:mm:ss');

    let data: any = {
        dchdate: dchdate,
        dchtime: dchtime
    }

    try {
        await visitModel.discharge(req.db,an, data);
        res.send({rs: true, message: 'dischage success'})
    } catch (error) {
        res.send({ok: false, message: error.message})
    }   

})

router.get('/getOPDDetail/:id' , async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      let rs: any = await visitModel.getOPDDetail(req.db, id);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
})

router.get('/getIPDDetail/:id' , async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      let rs: any = await visitModel.getIPDDetail(req.db, id);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
})

router.delete('/delete/:id' , async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      let rs: any = await visitModel.deleteOPD(req.db, id);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
})

router.delete('/ipd/delete/:id' , async (req: Request, res: Response) => {
    try {
      let id = req.params.id;
      let rs: any = await visitModel.deleteIPD(req.db, id);
      res.send({ok: true, result: rs[0]})
    } catch (error) {
      res.send({ok: false, message: error.message})
    }
})

router.get('/opd' , async (req: Request, res: Response) => {
    try {
        let rs: any = await visitModel.opd(req.db);
        res.send({ok: true, result: rs[0]})
    } catch (error) {
        res.send({ok: false, message: error.message})
    }
})
router.get('/ipd' , async (req: Request, res: Response) => {
    try {
        let rs: any = await visitModel.ipd(req.db);
        res.send({ok: true, result: rs[0]})
    } catch (error) {
        res.send({ok: false, message: error.message})
    }
})
export default router;

