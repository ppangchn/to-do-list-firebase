import firebaseApp from '../../firebase';
import * as bcrypt from 'bcrypt';

const db = firebaseApp.firestore();
const userCollection = db.collection('users');

export const fetchUserById = async ({ where }) => {
	const { id } = where;
	const user = await userCollection
		.doc(id)
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
	const todoList = [];
	if (user.todoList) {
		for (const todoListItem of user.todoList) {
			const doc = await todoListItem.get();
			todoList.push(doc.data());
		}
	}
	return { ...user, id, todoList };
};

export const createUser = async ({ data }) => {
	const { password, ...restData } = data;
	const hash = await bcrypt.hash(password, 10);
	userCollection.add({ password: hash, ...restData });
	const user = await userCollection.add({ ...data });
	return user;
};

export const login = async ({ username, password }) => {
	const user = await userCollection
		.where('username', '==', username)
		.get()
		.then(snapshot => {
			if (snapshot.empty) {
				throw new Error(`No such user found for username: ${username}`);
			}
			let user = {};
			snapshot.forEach(doc => {
				user = { id: doc.id, ...doc.data() };
			});
			return user;
		});
	return user;
};
