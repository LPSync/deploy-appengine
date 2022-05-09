import { gql } from "@apollo/client";

export const CREATE_OFFBOARDING_TASK = gql`
  mutation CreateOffboardingTask($input: LpsyncTaskInput) {
    createOffboardingTask(input: $input) {
      id
      taskType
      taskCreatorUsername
      taskCreatorFirstName
      taskCreatorLastName
      taskStatus
      taskScheduleType
      taskScheduleDateTime
      taskScheduleTimezone
      taskScheduleEpochTime
      taskSendNotification
      offboardingTask {
        offboardUsername
        offboardFirstName
        offboardLastName
        offboardEmail
        offboardEmployeeType
        offboardEmployeeNumber
        offboardLocation
        offboardDepartment
        offboardOktaId
        transferUsername
        transferFirstName
        transferLastName
        transferEmail
        transferGdrive
        transferGcalendar
        transferAlias
        offboardingTransferAlias
        unassignLicense
        offboardingUnassignLicenses
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
        payrollEpochTime
        payrollEndTimezone
        payrollNote
      }
    }
  }
`;
