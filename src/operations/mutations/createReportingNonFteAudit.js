import { gql } from "@apollo/client";

export const CREATE_REPORTING_NONFTE_AUDIT = gql`
  mutation CreateReportingNonFteAudit($input: ReportingNonFTEAuditInput) {
    createReportingNonFteAudit(input: $input) {
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
