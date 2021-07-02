import gql from 'graphql-tag';

export default gql`
    query getMemberActivity(
        $type: String!
        $limit: Int
        $nextToken: String
    ) {
        getMemberActivity(
            type: $type
            limit: $limit
            nextToken: $nextToken
        ) {
            items {
                date
                hours
                title
                notes
            }
            nextToken
        }
    }
`;