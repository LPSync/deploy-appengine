import { gql } from "@apollo/client";

export const CREATE_LAPTOP_OPTION = gql`
  mutation CreateLaptopOption($input: OnboardingLaptopInput) {
    createLaptopOption(input: $input) {
        id
        laptopType
        laptopLanguage
        laptopAvailability
    }
  }
`;
