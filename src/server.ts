import express from "express";
import User from "./models/User";

const app = express();

const port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let mockUsers: User[] = [
  {
    firstName: "John",
    lastName: "Smith",
    age: 30,
    email: "john.smith@test.com",
  },
  { firstName: "Alex", lastName: "Wood", age: 24, email: "alex.wood@test.com" },
];

const withMock = (
  operations: (users: User[]) => void,
  res: express.Response
) => {
  try {
    const users = mockUsers;

    operations(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
};

app.get("/api/users", (req: express.Request, res: express.Response) => {
  withMock(users => res.status(200).json(users), res);
});

app.post(
  "/api/users/add-user",
  (req: express.Request, res: express.Response) => {
    const newUser = new User(req.body);

    withMock(users => {
      users.push(newUser);
      res.status(200).json(users);
    }, res);
  }
);

app.delete(
  "/api/users/:email",
  (req: express.Request, res: express.Response) => {
    const email = req.params.email;

    withMock(users => {
      const filteredUsers = users.filter(user => user.email !== email);
      mockUsers = filteredUsers.slice(0);
      res.status(200).json(mockUsers);
    }, res);
  }
);

app.post("/api/users/:email", (req: express.Request, res: express.Response) => {
  const email = req.params.email;
  const updatedUser = new User(req.body);

  withMock(users => {
    const filteredUsers = users.filter(user => user.email !== email);
    mockUsers = [...filteredUsers, updatedUser]; /// later we can user mongodb updateOne
    res.status(200).json(mockUsers);
  }, res);
});

app.listen(port, () =>
  // tslint:disable-next-line: no-console
  console.log(`Server is listening to: http://localhost:${port}`)
);
