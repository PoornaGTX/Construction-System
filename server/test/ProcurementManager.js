process.env.NODE_ENV = "test";

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require("chai-http");
const Project = require("../modal/Projects");
const server = require("../server");

chai.use(chaiHttp);

chai.use(chaiHttp);
//before run the test cleanup the database
beforeEach((done) => {
  Project.deleteMany({}, (err) => {});
  done();
});
//after run the test cleanup the database
afterEach((done) => {
  Project.deleteMany({}, (err) => {});
  done();
});

// Test the get Route
describe("Projects API", () => {
  describe("GET /api/projects", () => {
    Project.create(
      {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      },
      (err) => {}
    );
    it("It should get all the projects", (done) => {
      chai
        .request(server)
        .get("/api/Projects/")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("numOfPages");
          res.body.should.have.property("totalProjects");
          res.body.should.have.property("projects");
          done();
        });
    });
    it("It should not get all the tasks", (done) => {
      chai
        .request(server)
        .get("/Projects")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test the POST Route
  describe("POST /api/projects", () => {
    it("It should create a new project", (done) => {
      const newProject = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      };
      chai
        .request(server)
        .post("/api/Projects")
        .send(newProject)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("projects")
            .property("projectEstimatedCost")
            .eq(1200);
          res.body.should.have
            .property("projects")
            .property("projectLocation")
            .eq("ABC");
          res.body.should.have
            .property("projects")
            .property("projectName")
            .eq("NEW_PROJECT");
          res.body.should.have
            .property("projects")
            .property("projectManager")
            .eq("abc@gmail.com");
          done();
        });
    });
    it("It should not create a new project without the projectManager property.", (done) => {
      const newProject = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
      };
      chai
        .request(server)
        .post("/api/Projects")
        .send(newProject)
        .end((err, res) => {
          res.should.have.status(400);
          res.text.should.be.eq('{"msg":"Please provide all values."}');
          done();
        });
    });
  });

  // Test the PATCH Route
  describe("PATCH /api/Projects/:id", () => {
    it("It should update a existing project", (done) => {
      const project = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      };

      const updatedProject = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "UPDATED PROJECT",
        projectDeadLine: new Date("2022-10-10"),
      };
      const res = new Project(project);
      const pid = res.id;
      chai
        .request(server)
        .patch("/api/Projects/" + pid)
        .send(updatedProject)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("UpdatedProject");
          done();
        });
    });

    it("It should not update a existing project without the project deadline", (done) => {
      const project = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      };

      const updatedProject = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "UPDATED PROJECT",
      };
      const res = new Project(project);
      const pid = res.id;
      chai
        .request(server)
        .patch("/api/Projects/" + pid)
        .send(updatedProject)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.text.should.be.eq('{"msg":"Please Provide All Values."}');
          done();
        });
    });
  });

  // Test the DELETE Route
  describe("DELETE /api/Projects/:id", () => {
    it("It should delete a existing project", (done) => {
      const project = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      };
      const res = new Project(project);
      const pid = res.id;
      chai
        .request(server)
        .delete("/api/Projects/" + pid)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          done();
        });
    });
    it("It should not delete a existing project when the project in is invalid", (done) => {
      const project = {
        projectEstimatedCost: 1200,
        projectLocation: "ABC",
        projectName: "NEW_PROJECT",
        projectManager: "abc@gmail.com",
      };
      const res = new Project(project);
      const pid = res.id;
      chai
        .request(server)
        .delete("/api/Projects/" + pid + "1")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("msg");
          done();
        });
    });
  });
});
