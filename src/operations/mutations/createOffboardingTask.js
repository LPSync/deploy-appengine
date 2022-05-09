import {gql} from "@apollo/client";

export const CREATE_OFFBOARDING_TASK = gql`
  mutation CreateOffboardingTask($input: LpsyncTaskInput) {
    createOffboardingTask(input: $input) {
      id
      taskType
      taskStatus
      taskScheduleType
      taskScheduleDateTime
      taskScheduleTimezone
      taskScheduleEpochTime
      taskSendNotification
      taskCreatedDateTime
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
        payrollEpochTime
        payrollEndTimezone
        payrollNote
      }
    }
  }
`;
