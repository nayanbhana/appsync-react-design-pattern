import gql from 'graphql-tag';

export default gql`
  mutation saveQuickLogActivity(
    $date: AWSDate!
    $hours: Float!
    $title: String!
    $notes: String
  ) {
    saveQuickLogActivity(
      date: $date
      hours: $hours
      title: $title
      notes: $notes
    ) {
      date
      hours
      title
      notes
      memberid
    }
  }
`;
