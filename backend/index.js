import express from "express";
import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/db/index.js";
import cors from "cors"




dotenv.config({
  path: "./.env",
});


connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("hii i am chirag ");
    });

    app.on("error", (error) => {
      console.log(`Application Errors :  ${error}`);
      //   throw error
      process.exit(1);
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `SERVER IS RUNNING AT PORTNUMBER : http://localhost:${process.env.PORT || 8000}`
      );
    });
  })
  .catch((err) => {
    console.log(`MONGODB CONNECTION FAILED :: src/index.js :: ${err}`);
  });