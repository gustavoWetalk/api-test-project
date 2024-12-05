import { movieRoutes } from "../../routes/movie.routes";

const request = require("supertest");
const express = require("express");

movieRoutes.post("/", function (req, res) {
  res.status(201).json({
    title: "Alice no país das maravilhas",
    duration: 2,
    release_date: "2010-06-10T00:00:00.000Z",
  });
});

request(movieRoutes)
  .post("/")
  .expect("Content-Type", "application/json; charset=utf-8")
  .expect(200)
  .end(function (err) {
    if (err) throw err;
  });
