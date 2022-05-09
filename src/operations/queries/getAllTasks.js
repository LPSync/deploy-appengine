import {gql} from "@apollo/client";

export const GET_ALL_TASKS = gql`
  query GetAllTasks($filters: FiltersInput) {
    get_all_tasks(filters: $filters) {
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
      taskApprovals {
        id
        approvalStage
        approvalStatus
        approvalDateTime
        approvalUsername
        approvalFirstName
        approvalLastName
        approvalEmail
        approvalNote
      }
      offboardingTask {
        id
        offboardUsername
        offboardFirstName
        offboardLastName
        transferUsername
        transferFirstName
        transferLastName
        transferGdrive
        transferGcalendar
        transferAlias
        offboardingTransferAlias {
          id
          aliasName
        }
        unassignLicense
        offboardingUnassignLicenses {
          id
          licenseName
        }
        unassignDevice
        offboardingUnassignDevices {
          id
          deviceManager
          deviceName
          deviceId
          deviceSerialNumber
          deviceModel
        }
        hrTerminationCode
        hrTerminationType
        payrollEndDateTime
        payrollEndTimezone
        payrollNote
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
