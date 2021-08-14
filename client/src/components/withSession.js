import React from 'react'
import { Query } from 'react-apollo'
import { GET_USER } from '../queries/queries'

const withSession = Component => props => (

    <Query query={GET_USER}>

        {({ data, loading, refetch }) => {

            if (loading) return null;
            console.log("data123: " + refetch)
            return (
                <Component {...props} refetch={refetch} session={data} />
            )
        }}
    </Query>

)

export default withSession;