import {gql} from "@apollo/client";

export const GET_REQUISITION_GENERATED_REPORT = gql`
    query GetGeneratedReport($search: GetGeneratedReportInput) {
        get_generated_report(search: $search) {
            requisitionTasks {
                id
                reqStartDate
                reqType
                reqHiringManagerFirstName
                reqHiringManagerLastName
                reqHiringManagerEmail
                isBackfill
                reqFulfilledID
                reqJobCode
                reqJobTitle
                reqDepartment
                reqBusinessUnit
                reqLocationDescription
                task {
                    id
                    taskStatus
                }
            }
        }
    }
`;

export const GET_OFFBOARDING_GENERATED_REPORT = gql`
    query GetGeneratedReport($search: GetGeneratedReportInput) {
        get_generated_report(search: $search) {
            offboardingTasks {
                id
                offboardFirstName
                offboardLastName
                offboardEmail
                offboardEmployeeType
                offboardLocation
                hrTerminationCode
                hrTerminationType
                payrollEndDateTime
                payrollEndTimezone
                offboardEmployeeNumber
                transferFirstName
                transferLastName
                transferGdrive
                transferGcalendar
                task {
                    id
                    taskStatus
                    taskEndDate
                    taskScheduleType
                }
            }
        }
    }
`;

export const GET_ONBOARDING_GENERATED_REPORT = gql`
    query GetGeneratedReport($search: GetGeneratedReportInput) {
        get_generated_report(search: $search) {
            onboardingTasks {
                id
                onboardFirstName
                onboardLastName
                onboardEmail
                onboardNonLpEmail
                onboardEmployeeType
                reqId
                onboardManagerFirstName
                onboardManagerLastName
                onboardManagerEmail
                onboardCompany
                onboardJobTitle
                onboardBusinessUnit
                onboardDepartment
                onboardLocationDescription
                task {
                    id
                    taskStatus
                    taskScheduleDateTime
                    taskScheduleTimezone
                    taskEndDate
                    taskScheduleType
                }
            }
        }
    }
`;

export const GET_EMPLOYEES_GENERATED_REPORT = gql`
    query GetGeneratedReport($search: GetGeneratedReportInput) {
        get_generated_report(search: $search) {
            employees {
                id
                employeeType
                firstName
                lastName
                department
                businessUnit
                location
                managerEmail
                oktaLastLogin
                lastHireDate
                companyName
            }
        }
    }
`;
