import { gql } from "@apollo/client";

export const CREATE_ONBOARDING_TASK = gql`
  mutation CreateOnboardingTask($input: LpsyncTaskInput) {
    createOnboardingTask(input: $input) {
      id
      taskType
      taskCreatorUsername
      taskCreatorFirstName
      taskCreatorLastName
      taskStatus
      taskScheduleType
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
        onboardManagerId
        onboardManagerEmail
        onboardDepartment
        onboardOfficeNumber
        onboardMobileNumber
        onboardDevice
        firstApprovalBypass
        onboardingOktaGroups {
          oktaGroupId
          oktaGroupName
        }
      }
    }
  }
`;
