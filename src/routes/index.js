const express=require("express");
const v1ApiRoutes = require('./v1/index');

const route=express.Router();

route.use('/v1',v1ApiRoutes);

module.exports=route;