import request from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "../api/index.js";

dotenv.config();

describe("Stock Price Tracker API - Happy Path Tests", () => {
  let authCookie = "";
  const testUser = {
    firstName: "Test",
    lastName: "User",
    username: "Test User",
    email: `test${Date.now()}@example.com`, // Unique email for each test run
    password: "password123",
  };

  beforeAll(async () => {
    // Connect to test database
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO);
    }
  });

  afterAll(async () => {
    // Clean up: delete test user if needed
    // await mongoose.connection.close();
  });

  describe("1. User Signup (POST /api/auth/signup)", () => {
    it("should successfully create a new user account", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(testUser)
        .expect("Content-Type", /json/)
        .expect(201);

      expect(response.body).toBeDefined();
      expect(response.body.success).not.toBe(false);
    });

    it("should reject duplicate email signup", async () => {
      const response = await request(app)
        .post("/api/auth/signup")
        .send(testUser)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("exist");
    });
  });

  describe("2. User Login (POST /api/auth/signin)", () => {
    it("should successfully log in with valid credentials", async () => {
      const response = await request(app)
        .post("/api/auth/signin")
        .send({
          email: testUser.email,
          password: testUser.password,
        })
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body._id).toBeDefined();
      expect(response.body.email).toBe(testUser.email);
      expect(response.body.password).toBeUndefined(); // Password should not be returned

      // Store cookie for subsequent tests
      authCookie = response.headers["set-cookie"];
      expect(authCookie).toBeDefined();
    });

    it("should reject login with invalid password", async () => {
      const response = await request(app)
        .post("/api/auth/signin")
        .send({
          email: testUser.email,
          password: "wrongpassword",
        })
        .expect("Content-Type", /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should reject login with non-existent email", async () => {
      const response = await request(app)
        .post("/api/auth/signin")
        .send({
          email: "nonexistent@example.com",
          password: "password123",
        })
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body.success).toBe(false);
    });
  });

  describe("3. Stock Symbol Search (GET /api/stock/quote)", () => {
    it("should successfully fetch stock data for valid symbol (AAPL)", async () => {
      const response = await request(app)
        .get("/api/stock/quote?symbol=AAPL")
        .set("Cookie", authCookie)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.symbol).toBe("AAPL");
      expect(response.body.currentPrice).toBeDefined();
      expect(response.body.openPrice).toBeDefined();
      expect(response.body.highPrice).toBeDefined();
      expect(response.body.lowPrice).toBeDefined();
      expect(typeof response.body.currentPrice).toBe("number");
    });

    it("should successfully fetch stock data for valid symbol (TSLA)", async () => {
      const response = await request(app)
        .get("/api/stock/quote?symbol=TSLA")
        .set("Cookie", authCookie)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body).toBeDefined();
      expect(response.body.symbol).toBe("TSLA");
      expect(response.body.currentPrice).toBeDefined();
    });

    it("should handle invalid stock symbol gracefully", async () => {
      const response = await request(app)
        .get("/api/stock/quote?symbol=INVALIDXYZ123")
        .set("Cookie", authCookie)
        .expect("Content-Type", /json/)
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("not found");
    });

    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .get("/api/stock/quote?symbol=AAPL")
        .expect("Content-Type", /json/)
        .expect(401);

      expect(response.body.success).toBe(false);
    });

    it("should require stock symbol parameter", async () => {
      const response = await request(app)
        .get("/api/stock/quote")
        .set("Cookie", authCookie)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain("required");
    });
  });

  describe("4. User Logout (GET /api/auth/signout)", () => {
    it("should successfully log out user", async () => {
      const response = await request(app)
        .get("/api/auth/signout")
        .set("Cookie", authCookie)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(response.body.success).not.toBe(false);
    });
  });
});
