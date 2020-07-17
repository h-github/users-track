"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("./models/User"));
const app = express_1.default();
const port = process.env.PORT || 8080;
app.use(express_1.default.static(__dirname));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
let mockUsers = [
    {
        firstName: "John",
        lastName: "Smith",
        age: 30,
        email: "john.smith@test.com",
    },
    { firstName: "Alex", lastName: "Wood", age: 24, email: "alex.wood@test.com" },
];
const withMock = (operations, res) => {
    try {
        const users = mockUsers;
        operations(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching data", error });
    }
};
app.get("/api/users", (req, res) => {
    withMock(users => res.status(200).json(users), res);
});
app.post("/api/users/add-user", (req, res) => {
    const newUser = new User_1.default(req.body);
    withMock(users => {
        users.push(newUser);
        res.status(200).json(users);
    }, res);
});
app.delete("/api/users/:email", (req, res) => {
    const email = req.params.email;
    withMock(users => {
        const filteredUsers = users.filter(user => user.email !== email);
        mockUsers = filteredUsers.slice(0);
        res.status(200).json(mockUsers);
    }, res);
});
app.post("/api/users/:email", (req, res) => {
    const email = req.params.email;
    const updatedUser = new User_1.default(req.body);
    withMock(users => {
        const filteredUsers = users.filter(user => user.email !== email);
        mockUsers = [...filteredUsers, updatedUser]; /// later we can user mongodb updateOne
        res.status(200).json(mockUsers);
    }, res);
});
app.listen(port, () => 
// tslint:disable-next-line: no-console
console.log(`Server is listening to: http://localhost:${port}`));
//# sourceMappingURL=server.js.map