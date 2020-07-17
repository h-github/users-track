class User {
  firstName: string;
  lastName: string;
  age: number;
  email: string;

  constructor(user: any) {
    this.firstName = user.firstName;
    this.lastName = user.firstName;
    this.age = user.age;
    this.email = user.email;
  }
}

export default User;
