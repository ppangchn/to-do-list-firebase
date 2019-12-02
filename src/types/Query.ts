import { queryType, idArg, stringArg, booleanArg, arg } from 'nexus';
import { User, UserWhereUniqueInput } from './User';
import { fetchUserById } from '../resolvers/User';

export const Query = queryType({
	definition(t) {
		t.field('user', {
			type: User,
			nullable: true,
			args: { where: arg({ type: UserWhereUniqueInput }) },
			resolve: (parent, { where }) => fetchUserById({ where }),
		}),
			t.field('users', {
				type: User,
				nullable: true,
				args: { where: arg({ type: UserWhereUniqueInput }) },
				resolve: (parent, { where }) => fetchUserById({ where }),
			});
	},
});
