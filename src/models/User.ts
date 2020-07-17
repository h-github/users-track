import { v5 as uuidv5 } from "uuid";
class User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;

  constructor(user: any) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.age = user.age;
    this.email = user.email;
  }
}

export default User;
