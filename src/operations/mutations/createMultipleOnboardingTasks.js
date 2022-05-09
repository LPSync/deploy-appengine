import {gql} from "@apollo/client";

export const CREATE_MULTIPLE_ONBOARDING_TASKS = gql`
  mutation CreateMultipleOnboardingTasks($input: [LpsyncTaskInput]) {
    createMultipleOnboardingTasks(input: $input) {
      id
      taskType
      taskStatus
      taskScheduleType
      taskScheduleEpochTime
      taskScheduleDateTime
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
