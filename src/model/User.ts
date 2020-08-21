export enum UserType {
    BAND = "BAND",
    PAYING_LISTENER = "PAYING_LISTENER",
    NO_PAYING_LISTENER = "NO_PAYING_LISTENER",
    ADMIN = "ADMIN"
  }
  
  export class User{
   
    constructor(
      private id: string,
      private name: string,
      private nickname: string,
      private email: string,      
      private password: string,
      private role: UserType
    ) {}
  
    getId(): string {
      return this.id;
    }
  
    getName(): string {
      return this.name;
    }
  
    getEmail(): string {
      return this.email;
    }
  
    getNickName(): string {
      return this.nickname;
    }
  
    getPassword(): string {
      return this.password;
    }
  
    getRole(): string {
      return this.role;
    }
  
    setId(id: string) {
      this.id = id;
    }
  
    setEmail(email: string) {
      this.email = email;
    }
  
    setName(name: string) {
      this.name = name;
    }
  
    setNickName(nickname: string) {
      this.nickname = nickname;
    }
   
   }