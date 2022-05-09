import { gql } from "@apollo/client";

export const GET_REPORTING_NONFTE_AUDITS = gql`
  query GetReportingNonfteAudits {
    get_reporting_nonfte_audits {
      id
      auditorUsername
      auditUserFirstName
      auditUserLastName
      auditUserEmail
      auditUserStatus
      auditUserInformation
      auditCompleted
    }
  }
`;
