import { ApolloServer } from 'apollo-server-express';
import { makeSchema } from 'nexus';
import { Query } from './types/Query';
import { Mutation } from './types/Mutation';

const functions = require('firebase-functions');
const express = require('express');

const schema = makeSchema({
	types: [Query, Mutation],
	outputs: {
		schema: __dirname + '/generated/schema.graphql',
		typegen: __dirname + '/generated/typings.ts',
	},
});

const gqlServer = () => {
	const app = express();

	const server = new ApolloServer({
		schema,
		introspection: true,
		playground: {
			endpoint: '/api',
		},
	});

	server.applyMiddleware({ app, path: '/', cors: true });

	return app;
};

const server = gqlServer();

export const api = functions.https.onRequest(server);
