import type { Plugin } from "payload/config";
import { onInitExtension } from "./onInitExtension";
import type { CollectionOptions, PluginTypes } from "./types";

import MediaGrid from "./components/MediaGrid";

export const mediaGridPlugin =
	(pluginOptions: PluginTypes): Plugin =>
	(incomingConfig) => {
		const collectionsToShowGrid: PluginTypes["collections"] =
			Object.entries(pluginOptions.collections).reduce(
				(acc, [slug]) => ({
					[slug]: {},
				}),
				{} as Record<string, CollectionOptions>,
			);

		const config = {
			...incomingConfig,
			collections: (incomingConfig.collections || []).map(
				(collection) => {
					if (!collectionsToShowGrid[collection.slug]) {
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
