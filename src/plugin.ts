import type { Plugin } from "payload/config";
import { onInitExtension } from "./onInitExtension";
import type { PluginTypes } from "./types";

import MediaGrid from "./components/MediaGrid";

export const mediaGridPlugin =
	(pluginOptions: PluginTypes): Plugin =>
	(incomingConfig) => {
		if (pluginOptions.enabled === false) {
			return incomingConfig;
		}

		const config = {
			...incomingConfig,
			collections: (incomingConfig.collections || []).map(
				(collection) => {
					if (!pluginOptions.collections[collection.slug]) {
						return collection;
					}

					return {
						...collection,
						admin: {
							...collection.admin,
							components: {
								...collection.admin?.components,
								views: {
									...collection.admin?.components?.views,
									List: {
										...collection.admin?.components?.views
											?.List,
										Component: MediaGrid,
									},
								},
							},
						},
					};
				},
			),
		};

		config.onInit = async (payload) => {
			if (incomingConfig.onInit) await incomingConfig.onInit(payload);
			onInitExtension(pluginOptions, payload);
		};

		return config;
	};
