import EmployeeTypes from "../constants/EmployeeTypes";

const dateFormat = require("dateformat");
const regex = {
  number: /^(?=.*[0-9])[0-9]+$/,
  floatNumber: /^(?=.*[0-9])[.0-9]+$/,
  phoneNumber: /^(?=.*[0-9])[- +()0-9]+$/,
  name: /^[[A-Za-z][A-Za-z'\s\-,]+$/,
  date: /^\d{4}[-]\d{2}[-]\d{2}$/,
  email:
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};
const getNow = () => dateFormat(new Date(), "yyyy-mm-dd'T'HH:MM");

export const isEmpty = (value) => (!value ? "is missing" : "");

export const isMoreThan25Char = (value) => value?.length > 25 ? "is more than 25 characters" : "";

export const validateNameInput = (name) => {
 return !regex.name.test(name) ? "must contain letters only" : "";
}

export const validateEmailInput = (email) =>
  !regex.email.test(email) ? "is not valid" : "";

export const validatePhoneNumberInput = (num) =>
  !regex.phoneNumber.test(num) ? "is not correct" : "";

export const validateNumberInput = (num) =>
  !regex.number.test(num) ? "must contain numbers only" : "";

export const validateSalaryInput = (num) =>
  !regex.floatNumber.test(num) ? "must contain numbers only" : "";

export const validDateFormat = (date) => (!regex.date.test(date) ||
  ((new Date(date)).toString() === "Invalid Date") || ((new Date(date)).toString() === "NaN"))
  ? "is not valid date format, should be yyyy-mm-dd" : "";

export const isEmptyString = (num) => (num === "" ? "is missing" : "");

export const isPastDate = (date) => (date < getNow() ? "is a past date" : "");

export const isEmployeeType = (employeeType) => {
  const employeeTypes = Object.values(EmployeeTypes);
  return employeeTypes?.includes(employeeType) ? "" : `should be one of employeeTypes: "${employeeTypes?.join('", "')}"`;
}

export const isInArray = (array) => (value) => {
  return !(array?.length && value && array.includes(value)) ? "is not exist" : "";
}
