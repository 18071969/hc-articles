import request, { GraphQLClient, gql } from 'graphql-request'

export const getArticles = async () => {
    
    //const endpoint = 'https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}'
    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/wsyk3xr7l9gx'

    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            //authorization: 'Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}',
            authorization: 'Bearer fveXw0FvyPWmrP_Qz8S0ODAQ-Zwyk1xkc5P3-5TnAOQ',
        },
    })

    const articlesQuery = gql`
    {
        postCollection {
            total
            items {
            title
            subtitle
            date
            thumbImgAlt
            contentImgAlt
            excerpt
            layout
            stackbitUrlPath
            stackbitDir
            stackbitModelType
            thumbImgPath {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
            }
            contentImgPath {
                title
                description
                contentType
                fileName
                size
                url
                width
                height
            }
            sys{id}
            }
        }
    }
    `

    return graphQLClient.request(articlesQuery)

}


export const getArticle = async (slug) => {

    const endpoint = 'https://graphql.contentful.com/content/v1/spaces/wsyk3xr7l9gx'
    const graphQLClient = new GraphQLClient(endpoint, {
        headers: {
            authorization: 'Bearer fveXw0FvyPWmrP_Qz8S0ODAQ-Zwyk1xkc5P3-5TnAOQ',
        },
    })

    const articleQuery = gql`
    query getArticle ($slug: String!) {
        postCollection(where: {stackbit_url_path: $slug}) {
            items {
                title
                subtitle
                date
                thumbImgAlt
                contentImgAlt
                excerpt
                content
                layout
                stackbitUrlPath
                stackbitDir
                stackbitModelType
                thumbImgPath {
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                  }
                contentImgPath {
                    title
                    description
                    contentType
                    fileName
                    size
                    url
                    width
                    height
                  }
                sys{id}
            }
        }
    }
    `

    return graphQLClient.request(articleQuery, {slug})
}