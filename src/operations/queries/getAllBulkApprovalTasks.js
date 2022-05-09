import {gql} from "@apollo/client";

export const GET_ALL_BULK_APPROVAL_TASKS = gql`
  query GetAllBulkApprovalTasks($filters: PageFilters) {
      get_all_bulk_approval_tasks(filters: $filters) {
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
        offboardEmployeeType
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
        payrollEpochTime
        payrollEndTimezone
        payrollEndDateTime
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
        onboardPoNumber
        onboardJobCode
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
        firstApprovalBypass
        isGoogleAccountNeeded
        onboardingOktaGroups {
            oktaGroupId
            oktaGroupName
        }
      }
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
        reqFulfilled
        reqFulfilledID
      }
    }
  }
`;
