const EmployeeTypes = {
  BPO: "Partner: BPO",
  DELIVERY: "Partner: Delivery",
  // FIXED_PRICE: "Partner: Fixed Price",
  INDIVIDUAL: "Contractor: Individual",
  SALES: "Partner: Sales (Reseller)",
  TECHNICAL: "Partner: Technical",
  FULL_TIME: "Full Time"
};

export const isFinancialEmployeeType = employeeType =>
  employeeType === EmployeeTypes.BPO ||
  employeeType === EmployeeTypes.TECHNICAL;

export const isFullTimeEmployee = (type) => (type === EmployeeTypes.FULL_TIME)
  || (type === (EmployeeTypes.FULL_TIME + " Employee"));

export default EmployeeTypes;
