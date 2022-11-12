process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const Cart = require("../modal/Carts");
const Product = require("../modal/Products");
const Project = require("../modal/Projects");
const server = require("../server");

chai.use(chaiHttp);

chai.use(chaiHttp);
//before run the test cleanup the database
beforeEach((done) => {
  Product.deleteMany({}, (err) => {});
  Cart.deleteMany({}, (err) => {});
  done();
});
//after run the test cleanup the database
afterEach((done) => {
  Product.deleteMany({}, (err) => {});
  Cart.deleteMany({}, (err) => {});
  done();
});

// Test the get Route
describe("Projects API", () => {
  describe("GET /api/Products", () => {
    Product.create(
      {
        name: "ABC",
        price: 123,
        qty: 12,
        supplierName: "EDF",
        createdBy: new Object("636513e13da718f981997aa9"),
      },
      (err) => {}
    );
    it("It should get all the projects", (done) => {
      chai
        .request(server)
        .get("/api/Customers/Products/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("numOfPages");
          res.body.should.have.property("products");
          res.body.should.have.property("numOfPages");
          done();
        });
    });
    it("It should not get all the tasks with invalid url", (done) => {
      chai
        .request(server)
        .get("/api/Customers/Productsdf/")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // Test the POST Route
  describe("POST /api/Customers/cart", () => {
    it("It should create a new project", (done) => {
      const cartItem = {
        supName: "ABC",
        price: 123,
        qty: 12,
        createdBy: new Object("636513e13da718f981997aa9"),
        pid: "dsd",
        total: 1000,
        userQty: 12,
        date: new Date("2022-10-10"),
        type: "sds",
      };
      chai
        .request(server)
        .post("/api/Customers/cart")
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgyNTc2MTIsImV4cCI6MTY2ODM0NDAxMn0.67JICz_108VFi6Uo-K3vh34wWPuuP7BxXoqvNav9VrM",
          { type: "bearer" }
        )
        .send(cartItem)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("carts").property("supName").eq("ABC");
          res.body.should.have.property("carts").property("price").eq(123);
          res.body.should.have.property("carts").property("qty").eq(12);
          res.body.should.have.property("carts").property("pid").eq("dsd");
          res.body.should.have.property("carts").property("total").eq(1000);
          res.body.should.have.property("carts").property("type").eq("sds");

          done();
        });
    });
    it("It should not create a new project without the projectManager property.", (done) => {
      const cartItem = {
        supName: "ABC",
        price: 123,
        qty: 12,
        createdBy: new Object("636513e13da718f981997aa9"),
        pid: "dsd",
        total: 1000,
        userQty: 12,
        date: new Date("2022-10-10"),
      };
      chai
        .request(server)
        .post("/api/Customers/cart")
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgyNTc2MTIsImV4cCI6MTY2ODM0NDAxMn0.67JICz_108VFi6Uo-K3vh34wWPuuP7BxXoqvNav9VrM",
          { type: "bearer" }
        )
        .send(cartItem)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq('{"msg":"Please provide type"}');
          done();
        });
    });
  });

  // Test the DELETE Route
  describe("DELETE /api/Projects/:id", () => {
    it("It should delete a existing project", (done) => {
      const cartItem = {
        supName: "ABC",
        price: 123,
        qty: 12,
        createdBy: new Object("6359888163355d2c85fe8fe9"),
        pid: "dsd",
        total: 1000,
        userQty: 12,
        date: new Date("2022-10-10"),
        type: "sds",
      };
      const res = new Cart(cartItem);
      const cid = res.id;
      chai
        .request(server)
        .delete("/api/Customers/cart/" + cid)
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgyNTc2MTIsImV4cCI6MTY2ODM0NDAxMn0.67JICz_108VFi6Uo-K3vh34wWPuuP7BxXoqvNav9VrM",
          { type: "bearer" }
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("carts");
          done();
        });
    });
    it("It should not delete a existing cart item when the cart item id is invalid", (done) => {
      const cartItem = {
        supName: "ABC",
        price: 123,
        qty: 12,
        createdBy: new Object("6359888163355d2c85fe8fe9"),
        pid: "dsd",
        total: 1000,
        userQty: 12,
        date: new Date("2022-10-10"),
        type: "sds",
      };
      const res = new Cart(cartItem);
      const cid = "6359888163355d2c85fe8f3";
      chai
        .request(server)
        .delete("/api/Customers/cart/" + cid)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          done();
        });
    });
  });
});
