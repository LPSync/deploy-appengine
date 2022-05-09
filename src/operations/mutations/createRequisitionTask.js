import { gql } from "@apollo/client";

export const CREATE_REQUISITION_TASK = gql`
  mutation CreateRequisitionTask($input: LpsyncTaskInput) {
    createRequisitionTask(input: $input) {
      id
      taskType
      taskStatus
      taskScheduleType
      taskCreatedDateTime
      requisitionTask {
        reqType
        reqStartDate
        reqHiringManagerEmail
        reqHiringManagerFirstName
        reqHiringManagerLastName
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
