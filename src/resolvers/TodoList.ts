import firebaseApp from '../../firebase';

const db = firebaseApp.firestore();
const todoListCollection = db.collection('todoList');
const userCollection = db.collection('users');

export const createTodoListItemByUser = async ({ data, userId }) => {
	const { description, isCompleted } = data;
	const userRef = await userCollection.doc(userId);
	const user = await userRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				throw new Error('No such document!');
			}
			return doc.data();
		})
		.catch(err => {
			throw new Error('Error getting document ' + err);
		});
	const todoListItem = await todoListCollection.add({ description, isCompleted });
	const { todoList = [] } = user;
	todoList.push(todoListItem);
	userRef.set({ todoList }, { merge: true });
	return todoListItem;
};
