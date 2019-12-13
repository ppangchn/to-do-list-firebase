import { objectType, inputObjectType } from 'nexus';
import { TodoListItem } from './TodoList';

export const User = objectType({
	name: 'User',
	definition(t) {
		t.string('id', { description: 'Id of the user' });
		t.string('name', { description: 'Name of the user' });
		t.string('username', { description: 'Username of the user' });
		t.string('password', { description: 'Password of the user' });
		t.list.field('todoList', { type: TodoListItem, nullable: true });
	},
});

export const UserCreateInput = inputObjectType({
	name: 'UserCreateInput',
	definition(t) {
		t.string('name', { description: 'Name of the user' });
		t.string('username', { description: 'Username of the user' });
		t.string('password', { description: 'Password of the user' });
	},
});

export const UserWhereUniqueInput = inputObjectType({
	name: 'UserWhereUniqueInput',
	definition(t) {
		t.string('id', { description: 'Id of the user' });
		t.string('username', { description: 'Username of the user' });
	},
});
