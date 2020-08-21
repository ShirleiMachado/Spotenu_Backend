import  IdGenerator  from "../sevices/IdGenerator";
import { UserDatabase } from "../data/UserDatabase";
import HashManager from "../sevices/HashManager";
import Authenticator from "../sevices/Authenticator";

export class UserBusiness {

  async signup(name: string, nickname:string, email: string,
    password: string, role:string) {

        if (!name || !email || !password || !role || !nickname)
        {
          throw new Error("Invalid input");
        }
        if (email.indexOf("@") === -1) {
          throw new Error("Invalid email address");
        }
        if (password.length < 6) {
          throw new Error("Password must have at least 6 characters");
        }
        if (role === "ADMIN") {
          throw new Error("Error creating user. Please check your system administrator.")
        }

    const hashManager = new HashManager();
    const cipherText = await hashManager.hash(password);

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDatabase = new UserDatabase();
    await userDatabase.CreateUser(id, name, nickname, email, cipherText, role);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({id, role})
    
    return accessToken
  }

  async signupAdmin(name: string, nickname:string, email: string,
    password: string, role:string, token:string) {

        if (!name || !email || !password || !role || !nickname)
        {
          throw new Error("Invalid input");
        }
        if (email.indexOf("@") === -1) {
          throw new Error("Invalid email address");
        }
        if (password.length < 10) {
          throw new Error("Password must have at least 10 characters");
        }
       

      const userAuthenticator = new Authenticator();
      const authenticationData = userAuthenticator.getData(token);
      const userRole = authenticationData.role;

      if(userRole !== "ADMIN") {
        throw new Error("Access Denied")
      }


    const hashManager = new HashManager();
    const cipherText = await hashManager.hash(password);

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDatabase = new UserDatabase();
    await userDatabase.CreateUser(id, name,  nickname, email, cipherText, role);

    const authenticator = new Authenticator();
    const accessToken = authenticator.generateToken({id, role})

    return accessToken
  }

  public async login(nickname:string,  password: string) {
    if (!password || !nickname)
      {
        throw new Error("Invalid user");
      }
      const userDatabase = new UserDatabase();
      const user = await userDatabase.getUserNickname(nickname)
      const hashManager = new HashManager();
      const hashCompare = await hashManager.compare(password, user.getPassword());

      if (!hashCompare) {
        throw new Error("Invalid Password!");

     }
        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({id: user.getId(), role: user.getRole()})

        return accessToken
    }
};