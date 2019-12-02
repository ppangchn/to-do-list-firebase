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
				throw new Error(`No such user found for id: ${id}`);
			}
			return doc.data();
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
	const { username, password, ...restData } = data;
	const user = await userCollection
		.where('username', '==', username)
		.get()
		.then(async snapshot => {
			if (!snapshot.empty) {
				throw new Error(`Username ${username} has already taken`);
			}
			const hash = await bcrypt.hash(password, 10);
			return userCollection.add({ username, password: hash, ...restData });
		});

	return user;
};

export const login = async ({ username, password }) => {
	const user: any = await userCollection
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
	const valid = await bcrypt.compareSync(password, user.password);
	if (!valid) {
		throw new Error('Invalid Password');
	}
	return user;
};
