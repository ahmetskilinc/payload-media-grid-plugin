import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Media from "./collections/Media";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mediaGridPlugin } from "../../src/index";
import sharp from "sharp";
import ClientBriefs from "./collections/ClientBriefs";

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || "",
	admin: {
		user: Users.slug,
	},
	editor: lexicalEditor({}),
	collections: [Media, ClientBriefs, Users],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	plugins: [
		mediaGridPlugin({
			collections: {
				[Media.slug]: true,
				[ClientBriefs.slug]: true,
			},
		}),
	],
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	sharp,
});
