import {gql} from "@apollo/client";

export const CREATE_ONBOARDING_TASK = gql`
  mutation CreateOnboardingTask($input: LpsyncTaskInput) {
    createOnboardingTask(input: $input) {
      id
      taskType
      taskStatus
      taskScheduleType
      taskScheduleEpochTime
      taskScheduleDateTime
      taskCreatedDateTime
      onboardingTask {
        onboardUsername
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
        firstApprovalBypass
        isDeviceNoteConfirmed
        isGoogleAccountNeeded
        reqId
        onboardingOktaGroups {
          oktaGroupId
          oktaGroupName
        }
        onboardingFinance {
          onboardingSalaryCurrency
          onboardingSalaryAmount
          onboardingSalaryPeriod
          onboardingContractMonths
          onboardingContractHoursPerWeek
        }
      }
    }
  }
`;
