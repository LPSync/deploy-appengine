import { gql } from "@apollo/client";

export const GET_APPROVED_REQUISITIONS = gql`
  query GetApprovedRequisitions {
    get_approved_requisitions {
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
      requisitionTask {
        reqType
        reqStartDate
        reqHiringManagerFirstName
        reqHiringManagerLastName
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
        reqFulfilled
        reqFulfilledID
      }
    }
  }
`;
