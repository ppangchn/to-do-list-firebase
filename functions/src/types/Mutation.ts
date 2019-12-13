import { idArg, stringArg, mutationType, arg } from 'nexus';
import { User, UserCreateInput } from './User';
import { TodoListItem, TodoListItemCreateInput } from './TodoList';
import { createUser, login } from '../resolvers/User';
import { createTodoListItemByUser } from '../resolvers/TodoList';
// import { DocumentReference } from '@google-cloud/firestore';

export const Mutation = mutationType({
	definition(t) {
		t.field('createUser', {
			type: User,
			args: { data: arg({ type: UserCreateInput }) },
			resolve: (parent, { data }) => <any>createUser(data),
		}),
			t.field('login', {
				type: User,
				args: {
					username: stringArg({ nullable: false }),
					password: stringArg({ nullable: false }),
				},
				resolve: (parent, { username, password }) => login(username, password),
			}),
			t.field('createTodoListItemByUser', {
				type: TodoListItem,
				args: {
					data: arg({ type: TodoListItemCreateInput }),
					userId: idArg({ nullable: false }),
				},
				resolve: (parent, { data, userId }) => <any>createTodoListItemByUser(data, userId),
			});
	},
});
