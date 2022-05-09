import {gql} from "@apollo/client";

export const GET_TASK = gql`
  query GetTask($search: String!) {
    get_task(search: $search) {
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
        transferGdataStudio
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
        payrollEpochTime
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
      badgeRequestTask {
        badgeRequestName
        badgeRequestType
        badgeRequestIconName
        badgeRequestIconImg
      }
    }
  }
`;
