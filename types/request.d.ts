import { Application, Request, Response, NextFunction } from "express";

export interface Requests {
  request: Request;
  response: Response;
  error?: Error;
  next?: NextFunction;
}
