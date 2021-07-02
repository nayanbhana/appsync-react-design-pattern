import gql from 'graphql-tag';

export default gql`
    subscription onQuickLogAdded {
        saveQuickLogActivity {
            date
            hours
            title
            notes
            memberid
        }
    }
`;