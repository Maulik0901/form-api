import express, { Express } from 'express';
import dotenv from 'dotenv';
import {Database} from "./config/db";
import i18n from "./config/i18n";
import RouteApi from "./routes/index";
import bodyParser from "express";
import { ErrorRespones } from './interfaces/vendors/index';
dotenv.config();

const app: Express = express();
Database.init();

const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  
  var lang:any = "en";
  if(req.headers?.lang){
    lang = req.headers.lang;
  }
  i18n.setLocale(lang);
  next();
})

app.use('/',RouteApi);

app.use((err: any, req: any, res: any, next: any)=> {
  var errRes = new ErrorRespones(err.code,err.message,err.error);
  return res.status((errRes as ErrorRespones).status).json(errRes);
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

export default app;