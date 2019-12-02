import { queryType, stringArg, makeSchema } from 'nexus';
import { GraphQLServer } from 'graphql-yoga';
import { Query } from './types/Query';
import { Mutation } from './types/Mutation';

const schema = makeSchema({
	types: [Query, Mutation],
	outputs: {
		schema: __dirname + '/generated/schema.graphql',
		typegen: __dirname + '/generated/typings.ts',
	},
});

const server = new GraphQLServer({
	schema,
});

server.start(() => `Server is running on http://localhost:4000`);
