import { gql } from "@apollo/client";

export const GET_AUDITOR_NONFTE_REPORTS = gql`
  query GetAuditorNonfteReports {
    get_auditor_nonfte_reports {
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
