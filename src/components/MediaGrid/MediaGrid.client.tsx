"use client";

import React, { Fragment, useState } from "react";
import { useWindowInfo } from "@payloadcms/ui/elements/WindowInfo";
import { DeleteMany } from "@payloadcms/ui/elements/DeleteMany";
import { EditMany } from "@payloadcms/ui/elements/EditMany";
import { Gutter } from "@payloadcms/ui/elements/Gutter";
import { ListControls } from "@payloadcms/ui/elements/ListControls";
import { ListSelection } from "@payloadcms/ui/elements/ListSelection";
import { SortColumn } from "@payloadcms/ui/elements/SortColumn";
import { Pagination } from "@payloadcms/ui/elements/Pagination";
import { PerPage } from "@payloadcms/ui/elements/PerPage";
import { Pill } from "@payloadcms/ui/elements/Pill";
import { PublishMany } from "@payloadcms/ui/elements/PublishMany";
import { UnpublishMany } from "@payloadcms/ui/elements/UnpublishMany";
import { ViewDescription } from "@payloadcms/ui/elements/ViewDescription";
import { Button } from "@payloadcms/ui/elements/Button";
import { SelectionProvider } from "@payloadcms/ui/providers/Selection";
import { useConfig } from "@payloadcms/ui/providers/Config";
import { useTranslation } from "@payloadcms/ui/providers/Translation";
import { formatDate } from "@payloadcms/ui/utilities/formatDate";
import { SelectRow } from "@payloadcms/ui/elements/SelectRow";
import { SelectAll } from "@payloadcms/ui/elements/SelectAll";

// TODO: DEFAULT LSIT FOR SELECTING EXISTING MEDIA. BUT NOT EXPORTED YET
// import DefaultList from "@payloadcms/ui/";

import { Media } from "../../types";
import { getTranslation } from "@payloadcms/translations";

import "./MediaGrid.scss";

const payloadBaseClass = "collection-list";
const baseClass = "media-grid";

const MediaGridClient = (props: any) => {
	const {
		data,
		// collection: {
		// 	labels: { plural: pluralLabel, singular: singularLabel },
		// },
		limit,
		collection,
		handlePageChange,
		handlePerPageChange,
		handleSearchChange,
		handleSortChange,
		handleWhereChange,
		hasCreatePermission,
		modifySearchParams,
		newDocumentURL,
		resetParams,
		titleField,
		customHeader,
	} = props;

	console.log(props);

	// TODO: DEFAULT LSIT FOR SELECTING EXISTING MEDIA
	if (customHeader != null) {
		// return <DefaultList {...props} />;
		return (
			<div>
				<h1>Hello World</h1>
			</div>
		);
	}

	const {
		breakpoints: { s: smallBreak },
	} = useWindowInfo();

	const { i18n, t } = useTranslation();

	const {
		admin: { dateFormat },
		routes: { admin: adminRoute },
	} = useConfig();

	return (
		<div className={baseClass}>
			{/* <Meta title={getTranslation(collection.labels.plural, i18n)} /> */}
			<SelectionProvider docs={data.docs} totalDocs={data.totalDocs}>
				<Gutter className={`${baseClass}__wrap`}>
					<header className={`${payloadBaseClass}__header`}>
						<Fragment>
							<h1>Media</h1>
							{hasCreatePermission && (
								<Pill
									// TODO: translations
									// aria-label={t(
									// 	"general:createNewLabel",
									// 	{
									// 		label: getTranslation(
									// 			singularLabel,
									// 			i18n,
									// 		),
									// 	},
									// )}
									to={newDocumentURL}
								>
									{/* TODO: translations */}
									{/* {t("general:createNew")} */}
									Create new
								</Pill>
							)}
							{!smallBreak && (
								<ListSelection
									label={
										// TODO: translations
										// typeof pluralLabel === "string"
										// 	? getTranslation(
										// 			pluralLabel,
										// 			i18n,
										// 		)
										// 	: ""
										"Media"
									}
								/>
							)}
							{!smallBreak && <ListSelection label={""} />}
						</Fragment>
					</header>
					{/* TODO: <ListControls/> doesnt accept collections?? */}
					{/* <ListControls
						collection={collection}
						handleSearchChange={handleSearchChange}
						handleSortChange={handleSortChange}
						handleWhereChange={handleWhereChange}
						modifySearchQuery={modifySearchParams}
						resetParams={resetParams}
						titleField={titleField}
						enableColumns={false}
					/> */}
					{!customHeader}
					<div className={`${baseClass}__sorting-header`}>
						<SelectAll />
						<SortColumn Label="File Name" name="filename" />
						<SortColumn Label="Alt Tag" name="alt" />
						<SortColumn Label="Created At" name="createdAt" />
						<SortColumn Label="Updated At" name="updatedAt" />
					</div>
					<div className={`${baseClass}__grid`}>
						{data.docs
							? data.docs.map((doc: Media) => (
									// TODO: change back to payload <Button />
									<a
										key={doc.id}
										className={`${baseClass}__grid-card`}
										href={`${adminRoute}/collections/media/${doc.id}`}
									>
										<div className={`${baseClass}__select`}>
											<SelectRow />
										</div>
										{doc.mimeType?.includes("image") ? (
											<img
												src={doc.url!}
												className={`${baseClass}__grid-media`}
											/>
										) : (
											<video
												src={doc.url!}
												autoPlay={true}
												muted={true}
												loop={true}
												playsInline={true}
												controls={false}
												className={`${baseClass}__grid-media`}
											/>
										)}
										<div
											className={`${baseClass}__grid-meta`}
										>
											<p
												className={`${baseClass}__grid-title`}
											>
												{doc.filename}
											</p>
											<p
												className={`${baseClass}__grid-alt`}
											>
												{doc.alt || "<No Alt Text>"}
											</p>
											<p
												className={`${baseClass}__grid-alt`}
											>
												{formatDate({
													date: doc.updatedAt,
													pattern: dateFormat,
													i18n: i18n,
												})}
											</p>
											<p
												className={`${baseClass}__grid-alt`}
											>
												{formatDate({
													date: doc.createdAt,
													pattern: dateFormat,
													i18n: i18n,
												})}
											</p>
										</div>
									</a>
								))
							: null}
					</div>
					{data.docs && data.docs.length > 0 && (
						<div className={`${payloadBaseClass}__page-controls`}>
							<Pagination
								// TODO: disableHistoryChange isnt a supported pro??
								// disableHistoryChange={modifySearchParams === false}
								hasNextPage={data.hasNextPage}
								hasPrevPage={data.hasPrevPage}
								limit={data.limit}
								nextPage={data.nextPage}
								numberOfNeighbors={1}
								onChange={handlePageChange}
								page={data.page}
								prevPage={data.prevPage}
								totalPages={data.totalPages}
							/>
							{data?.totalDocs > 0 && (
								<Fragment>
									<div
										className={`${payloadBaseClass}__page-info`}
									>
										{data.page * data.limit -
											(data.limit - 1)}
										-
										{data.totalPages > 1 &&
										data.totalPages !== data.page
											? data.limit * data.page
											: data.totalDocs}{" "}
										{t("general:of")} {data.totalDocs}
									</div>
									<PerPage
										handleChange={handlePerPageChange}
										limit={limit}
										limits={
											collection?.admin?.pagination
												?.limits
										}
										// TODO: modifySearchParams isnt a supported prop??
										// modifySearchParams={modifySearchParams}
										resetPage={
											data.totalDocs <= data.pagingCounter
										}
									/>
									{smallBreak && (
										<div
											className={`${payloadBaseClass}__list-selection`}
										>
											<Fragment>
												<ListSelection
													label={
														// TODO: translations
														// typeof pluralLabel ===
														// "string"
														// 	? getTranslation(
														// 			pluralLabel,
														// 			i18n,
														// 		)
														// 	: ""
														"Media"
													}
												/>
												{/* TODO: resetParams are not accepted props on <EditMany/> */}
												{/* <div
													className={`${baseClass}__list-selection-actions`}
												>
													<EditMany
														collection={collection}
														resetParams={
															resetParams
														}
													/>
													<PublishMany
														collection={collection}
														resetParams={
															resetParams
														}
													/>
													<UnpublishMany
														collection={collection}
														resetParams={
															resetParams
														}
													/>
													<DeleteMany
														collection={collection}
														resetParams={
															resetParams
														}
													/>
												</div> */}
											</Fragment>
										</div>
									)}
								</Fragment>
							)}
						</div>
					)}
				</Gutter>
			</SelectionProvider>
		</div>
	);
};

export default MediaGridClient;
