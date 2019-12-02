import {
	objectType,
	queryType,
	idArg,
	stringArg,
	mutationType,
	inputObjectType,
	booleanArg,
	arg,
} from 'nexus';

export const TodoListItem = objectType({
	name: 'TodoListItem',
	definition(t) {
		t.string('id', { description: 'Id of the todolist item' });
		t.string('description', { description: 'Description of the todo list item' });
		t.boolean('isCompleted', { description: 'Completed status of todo list item' });
	},
});

export const TodoListItemCreateInput = inputObjectType({
	name: 'TodoListItemCreateInput',
	definition(t) {
		t.string('description', { description: 'Description of the todo list item' });
		t.boolean('isCompleted', { description: 'Completed status of the todo list item' });
	},
});
