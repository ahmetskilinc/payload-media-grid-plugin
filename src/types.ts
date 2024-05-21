export interface PluginTypes {
	collections: Record<string, Omit<CollectionOptions, "adapter"> | true>;
	/**
	 * Whether or not to enable the plugin
	 *
	 * Default: true
	 */
	enabled?: boolean;
}

export interface CollectionOptions {}

export interface Media {
	id: string;
	alt?: string | null;
	updatedAt: string;
	createdAt: string;
	url?: string | null;
	thumbnailURL?: string | null;
	filename?: string | null;
	mimeType?: string | null;
	filesize?: number | null;
	width?: number | null;
	height?: number | null;
}
