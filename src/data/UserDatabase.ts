import { BaseDataBase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/band";


export class UserDatabase extends BaseDataBase {
  public static TABLE_NAME = "USERS";

  public async CreateUser(
    id: string,
    name: string,
    nickname:string,
    email: string,
    password: string,
    role: string
  ): Promise<void> {
    await this.getconnection()
      .insert({
        id,
        name,
        nickname,
        email,
        password,
        role
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getUserNickname(nickname: string): Promise<User> {
    const result = await this.getconnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ nickname});
    const data = result[0];
    const user = new User(data.id, data.name, data.nickname, data.email, data.password, data.role);
    return user;
  }

  public async getPassword(password: string): Promise<any> {
    const result = await this.getconnection()
    .select("*")
    .from(UserDatabase.TABLE_NAME)
    .where({ password });

    return result[0];
  }

  public async getUserById(id: string): Promise<any> {
    const result = await this.getconnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ id });

    return result[0];
  }

  public async deleteUser(id: string): Promise<void> {
    await this.getconnection().raw(`
    DELETE FROM ${UserDatabase.TABLE_NAME} WHERE id = "${id}"`);
  }

  public async createBands(
    id: string,
    name: string,
    nickname:string,
    email: string,
    password: string,
    description: string,
    isApproved: boolean = false,
    role: string
  ): Promise<void> {
    await this.getconnection()
      .insert({
        id,
        name,
        nickname,
        email,
        password,
        description,
        isApproved,
        role
      })
      .into(UserDatabase.TABLE_NAME);
  }

  public async getAllBand(): Promise<Band[]> {
    try{
      const result = await this.getconnection()
      .select("name", "nickname", "email", "isApproved")
      .from(UserDatabase.TABLE_NAME)
      .where({ role:"BAND"});
   
       return result;
       
    } catch(err) {
      throw new Error(err.sqlMessage || err.message)
    }
  }
  public async toApprove(nickname:string) {
    try {
      await this.getconnection()
      .update({isApproved: "1"})
      .from(UserDatabase.TABLE_NAME)
      .where({nickname})
    } catch (error) {
      throw new Error(error.sqlMessage || error.message)
    }
  }
  
}
