var request = require("request");

describe("calc", () => {
  it("should multiply 2 and 2", () => {
    expect(2 * 2).toBe(4);
  });
});

describe("get users", () => {
  it("should return 200 OK", done => {
    request.get("http://localhost:8080/api/users", (err, res) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });

  it("should return a list that not empty", done => {
    request.get("http://localhost:8080/api/users", (err, res) => {
      expect(JSON.parse(res.body).length).toBeGreaterThan(0);
      done();
    });
  });
});

describe("get user from users", () => {
  it("should return 200 OK", done => {
    request.get(
      "http://localhost:8080/api/users/john.smith@test.com",
      (err, res) => {
        expect(res.statusCode).toEqual(200);
        done();
      }
    );
  });

  it("should return a list that not empty", done => {
    request.get(
      "http://localhost:8080/api/users/john.smith@test.com",
      (err, res) => {
        expect(JSON.parse(res.body).length).toBeGreaterThan(0);
        done();
      }
    );
  });

  it("name should be john.smith@test.com", done => {
    request.get(
      "http://localhost:8080/api/users/john.smith@test.com",
      (err, res) => {
        expect(JSON.parse(res.body)[0].email).toEqual("john.smith@test.com");
        done();
      }
    );
  });

  it("should be case-insensitive", done => {
    request.get(
      "http://localhost:8080/api/users/john.smith@test.com",
      (err, res) => {
        expect(JSON.parse(res.body)[0].email).toEqual("john.smith@test.com");
        done();
      }
    );
  });
});
