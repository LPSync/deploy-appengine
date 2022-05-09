import {
  GET_EMPLOYEES_REPORTS_GENERATOR_INFO,
  GET_OFFBOARDING_REPORTS_GENERATOR_INFO,
  GET_ONBOARDING_REPORTS_GENERATOR_INFO,
  GET_REQUISITION_REPORTS_GENERATOR_INFO
} from "../../operations/queries/getReportGeneratorInfo";
import {
  GET_EMPLOYEES_GENERATED_REPORT,
  GET_OFFBOARDING_GENERATED_REPORT,
  GET_ONBOARDING_GENERATED_REPORT,
  GET_REQUISITION_GENERATED_REPORT
} from "../../operations/queries/getGeneratedReport";

const DEFAULT_NO_DATA_LABEL = 'No data';

export const getDefaultValue = (fieldType) => {
  switch (fieldType) {
    case 'multiselect':
      return [];
    default:
      return null;
  }
};

export const REPORT_GENERATOR_CONFIG = {
  reportTypes: {
    requisition: {
      selectsInfoQuery: GET_REQUISITION_REPORTS_GENERATOR_INFO,
      tableDataQuery: GET_REQUISITION_GENERATED_REPORT,
      fields: {
        reqStartDateFrom: {
          label: 'Planned Start Date Between',
          type: 'date'
        },
        reqStartDateTo: {
          label: 'And',
          type: 'date'
        },
        reqType: {
          label: 'Requisition Type',
          type: 'multiselect'
        },
        reqStatus: {
          label: 'Requisition Status',
          type: 'multiselect'
        },
        isBackfill: {
          label: 'BackFill',
          type: 'select',
          booleanItems: true
        },
        reqHiringManagerEmail: {
          label: 'Hiring Manager',
          type: 'multiselect',
          actualValue: ({ reqHiringManagerEmail }) => reqHiringManagerEmail,
          displayValue: ({ reqHiringManagerFirstName, reqHiringManagerLastName }) => `${reqHiringManagerFirstName} ${reqHiringManagerLastName}`
        },
        reqJobCode: {
          label: 'Job Code',
          type: 'multiselect'
        },
        reqBusinessUnit: {
          label: 'Business Unit',
          type: 'multiselect'
        },
        reqDepartment: {
          label: 'Department',
          type: 'multiselect'
        },
        reqLocationDescription: {
          label: 'Location',
          type: 'multiselect'
        },
        hasReqFulfilledID: {
          label: 'Has linked candidate',
          type: 'select',
          booleanItems: true,
          menuItems: [true, false]
        }
      },
      tableColumnsOptions: [
        {
          field: "id",
          headerName: "ID",
          width: 150,
          valueGetter: ({ row }) => row.task.id ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqStartDate",
          headerName: "Planned Start Date",
          width: 200,
          valueGetter: ({ row }) => row.reqStartDate ? new Date(row.reqStartDate) : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqType",
          headerName: "Requisition Type",
          width: 200,
          valueGetter: ({ row }) => row.reqType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "hiringManager",
          headerName: "Hiring Manager",
          width: 200,
          valueGetter: ({ row }) => row.reqHiringManagerFirstName && row.reqHiringManagerLastName ?
            `${row.reqHiringManagerFirstName} ${row.reqHiringManagerLastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqHiringManagerEmail",
          headerName: "Hiring Manager E-Mail",
          width: 200,
          valueGetter: ({ row }) => row.reqHiringManagerEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "isBackfill",
          headerName: "BackFill",
          width: 200,
          valueGetter: ({ row }) => row.isBackfill ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqFulfilledID",
          headerName: "Matched Candidate Number",
          width: 200,
          valueGetter: ({ row }) => row.reqFulfilledID ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqJobCode",
          headerName: "Job Code",
          width: 200,
          valueGetter: ({ row }) => row.reqJobCode ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqJobTitle",
          headerName: "Job Title",
          width: 200,
          valueGetter: ({ row }) => row.reqJobTitle ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqDepartment",
          headerName: "Department",
          width: 200,
          valueGetter: ({ row }) => row.reqDepartment ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqBusinessUnit",
          headerName: "Business Unit",
          width: 200,
          valueGetter: ({ row }) => row.reqBusinessUnit ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqLocationDescription",
          headerName: "Location",
          width: 200,
          valueGetter: ({ row }) => row.reqLocationDescription ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "status",
          headerName: "Status",
          width: 200,
          valueGetter: ({ row }) => row.task.taskStatus ?? DEFAULT_NO_DATA_LABEL
        },
      ]
    },
    offboarding: {
      selectsInfoQuery: GET_OFFBOARDING_REPORTS_GENERATOR_INFO,
      tableDataQuery: GET_OFFBOARDING_GENERATED_REPORT,
      fields: {
        offboardedFrom: {
          label: 'Offboarding between',
          type: 'date'
        },
        offboardedTo: {
          label: 'And',
          type: 'date'
        },
        payrollEndDateFrom: {
          label: 'Payroll end date between',
          type: 'date'
        },
        payrollEndDateTo: {
          label: 'And',
          type: 'date'
        },
        offboardingType: {
          label: 'Termination Type',
          type: 'multiselect'
        },
        offboardingStatus: {
          label: 'Offboarding Status',
          type: 'multiselect'
        },
        offboardEmployeeType: {
          label: 'Employment Type',
          type: 'multiselect'
        },
        offboardLocation: {
          label: 'Location',
          type: 'multiselect'
        },
        hrTerminationType: {
          label: 'HR Reason',
          type: 'multiselect'
        },
        hrTerminationCode: {
          label: 'HR Code',
          type: 'multiselect'
        },
      },
      tableColumnsOptions: [
        {
          field: "id",
          headerName: "ID",
          width: 150,
          valueGetter: ({ row }) => row.task.id ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "taskEndDate",
          headerName: "Offboarded Date",
          width: 320,
          valueGetter: ({ row }) => row.task.taskEndDate ? new Date(+row.task.taskEndDate) : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "terminationType",
          headerName: "Termination Type",
          width: 260,
          valueGetter: ({ row }) => row.task.taskScheduleType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "fullName",
          headerName: "Full Name",
          width: 200,
          valueGetter: ({ row }) => row.offboardFirstName && row.offboardLastName ? `${row.offboardFirstName} ${row.offboardLastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "offboardEmail",
          headerName: "E-Mail Address",
          width: 200,
          valueGetter: ({ row }) => row.offboardEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "offboardLocation",
          headerName: "Location",
          width: 200,
          valueGetter: ({ row }) => row.offboardLocation ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "offboardEmployeeType",
          headerName: "Employment Type",
          width: 270,
          valueGetter: ({ row }) => row.offboardEmployeeType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "hrTerminationCode",
          headerName: "HR Code",
          width: 200,
          valueGetter: ({ row }) => row.hrTerminationCode ? row.hrTerminationCode : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "hrTerminationType",
          headerName: "HR Reason",
          width: 200,
          valueGetter: ({ row }) => row.hrTerminationType ? row.hrTerminationType : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "payrollEndDate",
          headerName: "Payroll End Date",
          width: 200,
          valueGetter: ({ row }) => row.payrollEndDateTime && row.payrollEndTimezone ? `${new Date(row.payrollEndDateTime)} ${row.payrollEndTimezone}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "offboardEmployeeNumber",
          headerName: "Employee ID",
          width: 200,
          valueGetter: ({ row }) => row.offboardEmployeeNumber ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "transferToFullName",
          headerName: "Transfer To Name",
          width: 200,
          valueGetter: ({ row }) => row.transferFirstName && row.transferLastName && row.transferFirstName !== '-' && row.transferLastName !== '-'
            ? `${row.transferFirstName} ${row.transferLastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "transferGdrive",
          headerName: "Transfer Drive",
          width: 200,
          valueGetter: ({ row }) => row.transferGdrive ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "transferGCalendar",
          headerName: "Transfer Calendar",
          width: 200,
          valueGetter: ({ row }) => row.transferGcalendar ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "status",
          headerName: "Status",
          width: 200,
          valueGetter: ({ row }) => row.task.taskStatus ?? DEFAULT_NO_DATA_LABEL
        },
      ]
    },
    onboarding: {
      selectsInfoQuery: GET_ONBOARDING_REPORTS_GENERATOR_INFO,
      tableDataQuery: GET_ONBOARDING_GENERATED_REPORT,
      fields: {
        onboardedFrom: {
          label: 'Onboarded between',
          type: 'date'
        },
        onboardedTo: {
          label: 'And',
          type: 'date'
        },
        onboardCompany: {
          label: 'Company Name',
          type: 'multiselect'
        },
        onboardingType: {
          label: 'Onboarding Type',
          type: 'multiselect'
        },
        onboardingStatus: {
          label: 'Onboarding Status',
          type: 'multiselect'
        },
        onboardEmployeeType: {
          label: 'Employment Type',
          type: 'multiselect'
        },
        onboardJobTitle: {
          label: 'Job Title',
          type: 'multiselect'
        },
        onboardBusinessUnit: {
          label: 'Business Unit',
          type: 'multiselect'
        },
        onboardDepartment: {
          label: 'Department',
          type: 'multiselect'
        },
        onboardLocationDescription: {
          label: 'Location',
          type: 'multiselect'
        },
        hasReqId: {
          label: 'Has linked candidate',
          type: 'select',
          booleanItems: true,
          menuItems: [true, false]
        },
      },
      tableColumnsOptions: [
        {
          field: "id",
          headerName: "ID",
          width: 150,
          valueGetter: ({ row }) => row.task.id ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "reqStartDate",
          headerName: "Onboarded Date",
          width: 320,
          valueGetter: ({ row }) => (
            row.task.taskScheduleType === 'Scheduled' ?
              (row.task.taskScheduleDateTime && row.task.taskScheduleTimezone ? `${new Date(row.task.taskScheduleDateTime)} ${row.task.taskScheduleTimezone}` : DEFAULT_NO_DATA_LABEL) :
              (row.task.taskEndDate ? new Date(+row.task.taskEndDate) : DEFAULT_NO_DATA_LABEL)
          )
        },
        {
          field: "onboardingType",
          headerName: "Onboarding Type",
          width: 280,
          valueGetter: ({ row }) => row.task.taskScheduleType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "fullName",
          headerName: "Full Name",
          width: 250,
          valueGetter: ({ row }) => row.onboardFirstName && row.onboardLastName ? `${row.onboardFirstName} ${row.onboardLastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardEmail",
          headerName: "LP E-Mail Address",
          width: 250,
          valueGetter: ({ row }) => row.onboardEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardNonLpEmail",
          headerName: "Non-LP E-Mail Address",
          width: 250,
          valueGetter: ({ row }) => row.onboardNonLpEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardEmployeeType",
          headerName: "Employment Type",
          width: 250,
          valueGetter: ({ row }) => row.onboardEmployeeType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "managerName",
          headerName: "Manager Name",
          width: 250,
          valueGetter: ({ row }) => row.onboardManagerFirstName && row.onboardManagerLastName ?
            `${row.onboardManagerFirstName} ${row.onboardManagerLastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardManagerEmail",
          headerName: "Manager Email",
          width: 250,
          valueGetter: ({ row }) => row.onboardManagerEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardCompany",
          headerName: "Company",
          width: 250,
          valueGetter: ({ row }) => row.onboardCompany ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardJobTitle",
          headerName: "Job Title",
          width: 250,
          valueGetter: ({ row }) => row.onboardJobTitle ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardBusinessUnit",
          headerName: "Business Unit",
          width: 250,
          valueGetter: ({ row }) => row.onboardBusinessUnit ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardDepartment",
          headerName: "Department",
          width: 250,
          valueGetter: ({ row }) => row.onboardDepartment ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "onboardLocationDescription",
          headerName: "Location",
          width: 250,
          valueGetter: ({ row }) => row.onboardLocationDescription ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "status",
          headerName: "Status",
          width: 250,
          valueGetter: ({ row }) => row.task.taskStatus ?? DEFAULT_NO_DATA_LABEL
        },
      ]
    },
    employees: {
      selectsInfoQuery: GET_EMPLOYEES_REPORTS_GENERATOR_INFO,
      tableDataQuery: GET_EMPLOYEES_GENERATED_REPORT,
      fields: {
        employeeLastLoginFrom: {
          label: 'Last login date between',
          type: 'date'
        },
        employeeLastLoginTo: {
          label: 'And',
          type: 'date'
        },
        employeeLastHireFrom: {
          label: 'Last hire date between',
          type: 'date'
        },
        employeeLastHireTo: {
          label: 'And',
          type: 'date'
        },
        companyName: {
          label: 'Company Name',
          type: 'multiselect'
        },
        employeeType: {
          label: 'Employee Type',
          type: 'multiselect'
        },
        employeeManagerEmail: {
          label: 'Manager Email',
          type: 'multiselect'
        },
        employeeBusinessUnit: {
          label: 'Business Unit',
          type: 'multiselect'
        },
        employeeDepartment: {
          label: 'Department',
          type: 'multiselect'
        },
        employeeLocation: {
          label: 'Location',
          type: 'multiselect'
        },
      },
      tableColumnsOptions: [
        {
          field: "fullName",
          headerName: "Full Name",
          width: 280,
          valueGetter: ({ row }) => row.firstName && row.lastName ? `${row.firstName} ${row.lastName}` : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "companyName",
          headerName: "Company Name",
          width: 250,
          valueGetter: ({ row }) => row.companyName ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "employeeType",
          headerName: "Employee Type",
          width: 250,
          valueGetter: ({ row }) => 'Active' ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "employeeType",
          headerName: "Employee Type",
          width: 280,
          valueGetter: ({ row }) => row.employeeType ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "managerEmail",
          headerName: "Manager Email",
          width: 290,
          valueGetter: ({ row }) => row.managerEmail ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "companyName",
          headerName: "Company Name",
          width: 250,
          valueGetter: ({ row }) => row.companyName ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "department",
          headerName: "Department",
          width: 250,
          valueGetter: ({ row }) => row.department ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "businessUnit",
          headerName: "Business Unit",
          width: 250,
          valueGetter: ({ row }) => row.businessUnit ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "location",
          headerName: "Location",
          width: 250,
          valueGetter: ({ row }) => row.location ?? DEFAULT_NO_DATA_LABEL
        },
        {
          field: "employeeLastLogin",
          headerName: "Last Login Date",
          width: 520,
          valueGetter: ({ row }) => row.oktaLastLogin ? new Date(row.oktaLastLogin) : DEFAULT_NO_DATA_LABEL
        },
        {
          field: "employeeLastHire",
          headerName: "Last Hire Date",
          width: 520,
          valueGetter: ({ row }) => row.lastHireDate ? new Date(row.lastHireDate) : DEFAULT_NO_DATA_LABEL
        },
      ]
    },
  }
};
