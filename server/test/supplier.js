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
        createdBy: new Object("6359888163355d2c85fe8fe9"),
      },
      (err) => {}
    );
    it("It should get all the projects", (done) => {
      chai
        .request(server)
        .get("/api/getProducts")
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgwODg1NzAsImV4cCI6MTY2ODE3NDk3MH0.-M5UWIgeBrTjXqUQAeSAzgWiLHgQOL95F2MBsX6Rx_Y",
          { type: "bearer" }
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("numOfPages");
          res.body.should.have.property("products");
          res.body.should.have.property("numOfPages");
          done();
        });
    });
    it("It should not get all the products with invalid url", (done) => {
      chai
        .request(server)
        .get("/api/getProduct/")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  // Test the POST Route
  describe("POST /api/createProduct", () => {
    it("It should create a new project", (done) => {
      const product = {
        name: "ABC",
        price: 123,
        qty: 12,
        supplierName: "EDF",
        createdBy: new Object("6359888163355d2c85fe8fe9"),
      };
      chai
        .request(server)
        .post("/api/createProduct")
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgwODg1NzAsImV4cCI6MTY2ODE3NDk3MH0.-M5UWIgeBrTjXqUQAeSAzgWiLHgQOL95F2MBsX6Rx_Y",
          { type: "bearer" }
        )
        .send(product)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("products").property("name").eq("ABC");
          res.body.should.have.property("products").property("price").eq(123);
          res.body.should.have.property("products").property("qty").eq(12);
          res.body.should.have
            .property("products")
            .property("supplierName")
            .eq("EDF");

          done();
        });
    });
    it("It should not create a new project without the price.", (done) => {
      const product = {
        name: "ABC",
        qty: 12,
        supplierName: "EDF",
        createdBy: new Object("6359888163355d2c85fe8fe9"),
      };
      chai
        .request(server)
        .post("/api/createProduct")
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgwODg1NzAsImV4cCI6MTY2ODE3NDk3MH0.-M5UWIgeBrTjXqUQAeSAzgWiLHgQOL95F2MBsX6Rx_Y",
          { type: "bearer" }
        )
        .send(product)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq('{"msg":"Please provide all values."}');
          done();
        });
    });
  });

  // Test the DELETE Route
  describe("DELETE /api/Projects/:id", () => {
    it("It should delete a existing project", (done) => {
      const product = {
        name: "ABC",
        price: 123,
        qty: 12,
        supplierName: "EDF",
        createdBy: new Object("6359888163355d2c85fe8fe9"),
      };
      const res = new Product(product);
      const cid = res.id;
      chai
        .request(server)
        .delete("/api/deleteProducts/" + cid)
        .auth(
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzU5ODg4MTYzMzU1ZDJjODVmZThmZTkiLCJpYXQiOjE2NjgwODg1NzAsImV4cCI6MTY2ODE3NDk3MH0.-M5UWIgeBrTjXqUQAeSAzgWiLHgQOL95F2MBsX6Rx_Y",
          { type: "bearer" }
        )
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          done();
        });
    });
    it("It should not delete a existing cart item when the cart item id is invalid", (done) => {
      const product = {
        name: "ABC",
        price: 123,
        qty: 12,
        supplierName: "EDF",
        createdBy: new Object("6359888163355d2c85fe8fe9"),
      };
      const res = new Product(product);
      const cid = "6359888163355d2c85fe8f3";
      chai
        .request(server)
        .delete("/api/deleteProducts/" + cid)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          done();
        });
    });
  });
});
