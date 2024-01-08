import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customError.js";
// import Job from "../models/JobModel.js";
import User from "../models/userModel.js";

const withValidationError = (validateValue) => {
  return [
    validateValue,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        if (errorMessage[0].startsWith("without updated value")) {
          next();
        }
        if (errorMessage[0].startsWith("unauthorized")) {
          throw new UnauthorizedError(errorMessage);
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateUpdateItemInput = withValidationError([
  body("name").notEmpty().withMessage("name is required."),
  body("type").notEmpty().withMessage("type is required."),
  body("status").notEmpty().withMessage("status is required."),
  body("price")
    .notEmpty()
    .withMessage("price is required.")
    .isNumeric()
    .withMessage("invalid price"),
  ,
  body("description").notEmpty().withMessage("description is required."),
]);

export const validateCreateOrderInput = withValidationError([
  body("phone")
    .notEmpty()
    .withMessage("phone is required.")
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid phone")
    .isNumeric()
    .withMessage("invalid phone"),
  body("creditCardNum")
    .notEmpty()
    .withMessage("credit card is required.")
    .isLength({ min: 14, max: 14 })
    .withMessage("invalid card number")
    .isNumeric()
    .withMessage("invalid card number"),
  body("creditCardExp")
    .notEmpty()
    .withMessage("credit card exp date is required.")
    .isLength({ min: 6, max: 6 })
    .withMessage("invalid exp date")
    .isNumeric()
    .withMessage("invalid exp date"),
  body("creditCardSecurityCode")
    .notEmpty()
    .withMessage("credit card security code is required.")
    .isLength({ min: 3, max: 3 })
    .withMessage("invalid security code")
    .isNumeric()
    .withMessage("invalid security code"),
  body("email")
    .notEmpty()
    .withMessage("email is required.")
    .isEmail()
    .withMessage("invalid email format."),
  body("firstName").notEmpty().withMessage("first name is required."),
  body("lastName").notEmpty().withMessage("last name is required."),
]);

export const validateAddItemInput = withValidationError([
  body("name").notEmpty().withMessage("name is required."),
  body("type").notEmpty().withMessage("type is required."),
  body("status").notEmpty().withMessage("status is required."),
  body("price")
    .notEmpty()
    .withMessage("price is required.")
    .isNumeric()
    .withMessage("invalid price"),
  ,
  body("description").notEmpty().withMessage("description is required."),
]);

export const validateRegisterInput = withValidationError([
  body("firstName").notEmpty().withMessage("first name is required."),
  body("lastName").notEmpty().withMessage("last name is required."),
  body("email")
    .notEmpty()
    .withMessage("email is required.")
    .isEmail()
    .withMessage("invalid email format.")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });

      if (user) {
        throw new BadRequestError("email already exists.");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required.")
    .isLength({ min: 8 })
    .withMessage("password should longer than 8 characters."),
]);

export const validateUpdateUserInput = withValidationError([
  body("phone")
    .optional({ checkFalsy: true })
    .isLength({ min: 10, max: 10 })
    .withMessage("invalid phone")
    .isNumeric()
    .withMessage("invalid phone"),
  body("birth")
    .optional({ checkFalsy: true })
    .isLength({ min: 8, max: 8 })
    .withMessage("invalid birth"),
]);
