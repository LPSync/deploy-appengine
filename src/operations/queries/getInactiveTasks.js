import { gql } from "@apollo/client";

export const GET_INACTIVE_TASKS = gql`
  query GetInactiveTasks {
    get_inactive_tasks {
      id
      oldTaskId
      taskType
      taskCreatedDateTime
      taskCreatorUsername
      taskCreatorFirstName
      taskCreatorLastName
      taskStatus
      taskScheduleType
      taskScheduleDateTime
      taskScheduleTimezone
      offboardingTask {
        id
        offboardUsername
        offboardFirstName
        offboardLastName
      }
      onboardingTask {
        id
        onboardUsername
        onboardEmail
        onboardFirstName
        onboardLastName
        onboardNonLpEmail
        onboardEmployeeType
        onboardJobTitle
        onboardCompany
        onboardLocation
        onboardManagerId
        onboardManagerEmail
        onboardDepartment
        onboardOfficeNumber
        onboardMobileNumber
        onboardDevice
        onboardingOktaGroups {
          oktaGroupId
          oktaGroupName
        }
      }
      requisitionTask {
        reqType
        reqStartDate
        reqHiringManagerEmail
        reqBusinessUnit
        reqDepartment
        reqLocation
        reqLocationDescription
        isBackfill
        reqBackfillFirstName
        reqBackfillLastName
        reqBackfillUsername
        reqCompanyCode
        reqParentMgmtCC
        reqManagementCC
        reqFunctionalAreaDesc
        reqCountryDesc
        reqJobCode
        reqJobTitle
        reqSpendCurrency
        reqSpendAmount
        reqSpendPeriod
        reqBonusAmount
        reqBonusType
        reqCommissionCurrency
        reqCommissionAmount
        reqContractMonths
        reqContractHoursPerWeek
        comments
      }
    }
  }
`;
