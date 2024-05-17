import { buildConfig } from "payload/config";
import path from "path";
import Users from "./collections/Users";
import Media from "./collections/Media";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { mediaGridPlugin } from "../../src/index";
import sharp from "sharp";

export default buildConfig({
	secret: process.env.PAYLOAD_SECRET || "",
	admin: {
		user: Users.slug,
	},
	editor: lexicalEditor({}),
	collections: [Media, Users],
	typescript: {
		outputFile: path.resolve(__dirname, "payload-types.ts"),
	},
	plugins: [mediaGridPlugin({})],
	db: mongooseAdapter({
		url: process.env.DATABASE_URI || "",
	}),
	sharp,
});
