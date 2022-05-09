import { gql } from "@apollo/client";

export const UPDATE_TASK_SUBSCRIPTION = gql`
  subscription updateTaskSubscription {
    updateTaskSubscription {
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
      taskScheduleEpochTime
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
        unassignLicense
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
