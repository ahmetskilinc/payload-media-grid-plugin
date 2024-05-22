import { CollectionConfig } from "payload/types";

const ClientBriefs: CollectionConfig = {
	slug: "client-briefs",
	labels: {
		plural: "Client Briefs",
		singular: "Client Brief",
	},
	access: {
		read: () => true,
	},
	fields: [],
	upload: {
		disableLocalStorage: false,
		staticDir: "briefs",
		mimeTypes: [
			"application/pdf",
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
			"application/msword",
			"application/vnd.ms-powerpoint",
			"application/vnd.openxmlformats-officedocument.presentationml.presentation",
		],
	},
};

export default ClientBriefs;
