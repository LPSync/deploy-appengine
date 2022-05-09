import { gql } from "@apollo/client";

export const GET_REQUISITION_REPORTS_GENERATOR_INFO = gql`
    query GetReportGeneratorFieldsInfo($reportType: String) {
        get_report_generator_fields_info(reportType: $reportType) {
            reqType
            reqStatus
            isBackfill
            reqHiringManagerEmail {
                reqHiringManagerEmail,
                reqHiringManagerFirstName,
                reqHiringManagerLastName,
            }
            reqJobCode
            reqBusinessUnit
            reqDepartment
            reqLocationDescription
        }
    }
`;

export const GET_ONBOARDING_REPORTS_GENERATOR_INFO = gql`
    query GetReportGeneratorFieldsInfo($reportType: String) {
        get_report_generator_fields_info(reportType: $reportType) {
            onboardingType
            onboardingStatus
            onboardEmployeeType
            onboardCompany
            onboardJobTitle
            onboardBusinessUnit
            onboardDepartment
            onboardLocationDescription
        }
    }
`;

export const GET_OFFBOARDING_REPORTS_GENERATOR_INFO = gql`
    query GetReportGeneratorFieldsInfo($reportType: String) {
        get_report_generator_fields_info(reportType: $reportType) {
            offboardingType
            offboardingStatus
            offboardEmployeeType
            offboardLocation
            hrTerminationType
            hrTerminationCode
        }
    }
`;

export const GET_EMPLOYEES_REPORTS_GENERATOR_INFO = gql`
    query GetReportGeneratorFieldsInfo($reportType: String) {
        get_report_generator_fields_info(reportType: $reportType) {
            employeeType
            employeeManagerEmail
            employeeBusinessUnit
            employeeDepartment
            employeeLocation
            companyName
        }
    }
`;
