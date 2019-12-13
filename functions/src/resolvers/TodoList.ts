import firebaseApp from '../firebase';

const db = firebaseApp.firestore!();
const todoListCollection = db.collection('todoList');
const userCollection = db.collection('users');

export const createTodoListItemByUser = async (data: any, userId: any) => {
	const { description, isCompleted } = data;
	const userRef = await userCollection.doc(userId);
	const user = await userRef
		.get()
		.then(doc => {
			if (!doc.exists) {
				throw new Error(`No such user found for id: ${userId}`);
			}
			return doc.data();
		})
		.catch(err => {
			throw new Error('Error getting document ' + err);
		});
	const todoListItem = await todoListCollection.add({ description, isCompleted });
	const { todoList = [] }: any = user;
	todoList.push(todoListItem);
	userRef.set({ todoList }, { merge: true });
	return todoListItem;
};
