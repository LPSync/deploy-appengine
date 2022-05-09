import { gql } from "@apollo/client";

export const ADD_OFFBOARDING_HR_INFORMATION = gql`
  mutation CreateOffboardingTask($input: HrInformationInput) {
    addOffboardingHrInformation(input: $input) {
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
            payrollEndDateTime
            payrollEndTimezone
            payrollEpochTime
            payrollNote
        }
     
    }
}`;
