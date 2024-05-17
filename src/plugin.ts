import type { Plugin } from "payload/config";

import { onInitExtension } from "./onInitExtension";
import type { PluginTypes } from "./types";

import MediaList from "./components/MediaList";

export const mediaGridPlugin =
	(pluginOptions: PluginTypes): Plugin =>
	(incomingConfig) => {
		let config = { ...incomingConfig };

		if (config.collections !== undefined) {
			const mediaCollection = config.collections.find(
				(collection) => collection.upload,
			);
			if (mediaCollection) {
				mediaCollection.admin = {
					...mediaCollection.admin,
					components: {
						...mediaCollection.admin?.components,
						views: {
							...mediaCollection.admin?.components?.views,
							List: {
								...mediaCollection.admin?.components?.views
									?.List,
								Component: MediaList,
							},
						},
					},
				};
			}
		}

		config.onInit = async (payload) => {
			if (incomingConfig.onInit) await incomingConfig.onInit(payload);
			onInitExtension(pluginOptions, payload);
		};

		return config;
	};
