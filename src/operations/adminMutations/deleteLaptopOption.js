import { gql } from "@apollo/client";

export const DELETE_LAPTOP_OPTION = gql`
  mutation DeleteLaptopOption($id: Int!) {
    deleteLaptopOption(id: $id) {
        id
        laptopType
        laptopLanguage
        laptopAvailability
    }
  }
`;
