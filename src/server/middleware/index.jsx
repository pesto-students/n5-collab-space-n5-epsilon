import nextConnect from 'next-connect'
import databaseMiddleware from "./database";

export function createHandler(...middleware) {
    return  nextConnect().use(databaseMiddleware, ...middleware);
  
  }