import { CollectionConfig } from "payload/types";

const Users: CollectionConfig = {
	slug: "users",
	auth: true,
	admin: {
		useAsTitle: "email",
	},
	fields: [
		// Email added by default
		// Add more fields as needed
		{
			type: "upload",
			name: "photo",
			relationTo: "media",
		},
	],
};

export default Users;
