import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness"
import {BaseDataBase} from "../data/BaseDatabase"

export class UserController {
  public async signupUser(req: Request, res: Response) {
    try {
      const userData = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
      };
    
      const userBusiness = new UserBusiness();
      const accessToken = await userBusiness.signup(userData.name, userData.nickname, 
      userData.email, userData.password, userData.role);

      res.status(200).send({
        token: accessToken,
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    
      
    }
    BaseDataBase.destroyConnection();
  }

  public async signupAdmin(req: Request, res: Response) {
    try {
      const userData = {
        name: req.body.name,
        nickname: req.body.nickname,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
        token: req.headers.token as string
      };        
       
      const userBusiness = new UserBusiness();
      const accessToken = await userBusiness.signupAdmin(userData.name, userData.nickname, 
      userData.email, userData.password, userData.role, userData.token);


        res.status(200).send({
        token: accessToken,
      });
    } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    
      
    }
    BaseDataBase.destroyConnection();
  }

  public async login(req: Request, res: Response) {
    try {
      const userData = {
        nickname: req.body.nickname,
        password: req.body.password
      };
      const userBusiness = new UserBusiness();
      const accessToken = await userBusiness.login(userData.nickname, userData.password)
      res.status(200).send({
        token: accessToken,
      });
      } catch (e) {
      res.status(400).send({
        message: e.message,
      });
    
      
    }
    BaseDataBase.destroyConnection();
}
  };