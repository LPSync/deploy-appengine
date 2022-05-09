import { gql } from "@apollo/client";

export const GET_ACTIVE_TASKS = gql`
  query GetActiveTasks {
    get_active_tasks {
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
      taskSendNotification
      taskEndDate
      taskApprovalStatus
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
        onboardLocationDescription
        onboardManagerId
        onboardManagerEmail
        onboardManagerFirstName
        onboardManagerLastName
        onboardBusinessUnit
        onboardDepartment
        onboardOfficeNumber
        onboardMobileNumber
        onboardDevice
        reqId
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
