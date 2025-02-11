import { graphql } from "react-relay";

const query = graphql`
  query homeQuery {
    viewer {
      topRepositories(
        first: 12
        orderBy: { direction: DESC, field: UPDATED_AT }
      ) {
        edges {
          node {
            id
            name
            description
            owner {
              login
            }
          }
        }
      }
    }
  }
`;
