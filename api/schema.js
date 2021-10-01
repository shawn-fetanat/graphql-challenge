const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// App Type
const AppType = new GraphQLObjectType({
    name: 'App',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
    })
});

// Stage Type
const StageType = new GraphQLObjectType({
    name: 'Stage',
    fields: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
    })
});

// Event Type
const EventType = new GraphQLObjectType({
    name: 'Event',
    fields: () => ({
        id: {type: GraphQLString},
        appId: {type: GraphQLString},
        stageId: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        image: {type: GraphQLString},
        startsAt: {type: GraphQLInt},
        endsAt: {type: GraphQLInt},
    })
});


// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        app: {
            type: AppType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/apps/' + args.id)
                    .then(res => res.data);

            }
        },
        apps: {
            type: new GraphQLList(AppType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/apps')
                    .then(res => res.data);
            }
        },
        stage: {
            type: StageType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/stages/' + args.id)
                    .then(res => res.data);

            }
        },
        stages: {
            type: new GraphQLList(StageType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/stages')
                    .then(res => res.data);
            }
        },
        event: {
            type: EventType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/events/' + args.id)
                    .then(res => res.data);

            }
        },
        events: {
            type: new GraphQLList(EventType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/events')
                    .then(res => res.data);
            }
        }
    }
});

// Mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addApp: {
            type: AppType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/apps', {
                    name: args.name,
                })
                    .then(res => res.data);
            }
        },
        editApp: {
            type: AppType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/apps/' + args.id, args)
                    .then(res => res.data);
            }
        },
        deleteApp: {
            type: AppType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/apps/' + args.id)
                    .then(res => res.data);
            }
        },
        addStage: {
            type: StageType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/stages', {
                    name: args.name,
                })
                    .then(res => res.data);
            }
        },
        editStage: {
            type: StageType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: GraphQLString},
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/stages/' + args.id, args)
                    .then(res => res.data);
            }
        },
        deleteStage: {
            type: StageType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/stages/' + args.id)
                    .then(res => res.data);
            }
        },
        addEvent: {
            type: EventType,
            args: {
                appId: {type: new GraphQLNonNull(GraphQLString)},
                stageId: {type: new GraphQLNonNull(GraphQLString)},
                name: {type: new GraphQLNonNull(GraphQLString)},
                description: {type: new GraphQLNonNull(GraphQLString)},
                image: {type: new GraphQLNonNull(GraphQLString)},
                startsAt: {type: new GraphQLNonNull(GraphQLInt)},
                endsAt: {type: new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/events', {
                    appId: args.appId,
                    stageId: args.stageId,
                    name: args.name,
                    description: args.description,
                    image: args.image,
                    startsAt: args.startsAt,
                    endsAt: args.endsAt,
                })
                    .then(res => res.data);
            }
        },
        editEvent: {
            type: EventType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                appId: {type: GraphQLString},
                stageId: {type: GraphQLString},
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                image: {type: GraphQLString},
                startsAt: {type: GraphQLInt},
                endsAt: {type: GraphQLInt},
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/events/' + args.id, args)
                    .then(res => res.data);
            }
        },
        deleteEvent: {
            type: EventType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/events/' + args.id)
                    .then(res => res.data);
            }
        },
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
});
