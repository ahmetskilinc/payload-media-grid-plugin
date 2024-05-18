import React from "react";
import MediaGridClient from "./MediaGrid.client";

const MediaGrid = (props: any) => {
	const copy = { ...props };

	delete copy["payload"];
	delete copy["i18n"];
	delete copy["collectionConfig"];

	return <MediaGridClient {...copy} />;
};

export default MediaGrid;
