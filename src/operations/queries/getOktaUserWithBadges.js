import {gql} from "@apollo/client";

export const GET_OKTA_USER_WITH_BADGES = gql`
  query GetOktaUserWithBadges($search: String!) {
    get_okta_user_with_badges(search: $search) {
      user {
        id
        email
        employeeNumber
        employeeType
        department
        firstName
        jobTitle
        lastName
        location
        managerOktaId
        managerEmail
        managerEmployeeNumber
        photo
        userName
        totalDirectReports
        totalFullTimeDirects
        totalContractorDirects
        totalPartnerDirects
        tovutiUserId
        lastLogin
      }
      badges {
        id
        badgeName
        badgeType
        badgeIcon {
          badgeIconImg
        }
      }
    }
  }
`;
