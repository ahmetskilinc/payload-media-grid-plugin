"use client";

import React, { Fragment } from "react";
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

// import Meta from "payload/dist/admin/components/utilities/Meta";
// import type { Props } from "payload/dist/admin/components/views/collections/List/types";

import classes from "./MediaList.module.scss";
import { Media } from "../../types";
import { getTranslation } from "@payloadcms/translations";

const baseClass = "collection-list";

export const MediaListClient = (props: any) => {
	const {
		data,
		collection: {
			labels: { plural: pluralLabel, singular: singularLabel },
		},
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

	const {
		breakpoints: { s: smallBreak },
	} = useWindowInfo();

	const { i18n, t } = useTranslation();

	const {
		admin: { dateFormat },
		routes: { admin: adminRoute },
	} = useConfig();

	return (
		<div className="collection-list">
			{/* <Meta title={getTranslation(collection.labels.plural, i18n)} /> */}
			<SelectionProvider docs={data.docs} totalDocs={data.totalDocs}>
				<Gutter className={`${baseClass}__wrap`}>
					<header className={`${baseClass}__header`}>
						{customHeader && customHeader}
						{!customHeader && (
							<Fragment>
								<h1>Media</h1>
								{hasCreatePermission && (
									<Pill
										aria-label={t(
											"general:createNewLabel",
											{
												label: getTranslation(
													singularLabel,
													i18n,
												),
											},
										)}
										to={newDocumentURL}
									>
										{t("general:createNew")}
									</Pill>
								)}
								{!smallBreak && (
									<ListSelection
										label={
											typeof pluralLabel === "string"
												? getTranslation(
														pluralLabel,
														i18n,
													)
												: ""
										}
									/>
								)}
								{!smallBreak && <ListSelection label={""} />}
							</Fragment>
						)}
					</header>
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

					<div className={classes.SortingHeader}>
						<SelectAll />
						<SortColumn Label="File Name" name="filename" />
						<SortColumn Label="Alt Tag" name="alt" />
						<SortColumn Label="Created At" name="createdAt" />
						<SortColumn Label="Updated At" name="updatedAt" />
					</div>

					<div className={classes.MediaGrid}>
						{props.data.docs
							? props.data.docs.map((doc: Media) => (
									<Button
										key={doc.id}
										className={classes.MediaGridCard}
										el={"link"}
										buttonStyle="none"
										to={`${adminRoute}/collections/media/${doc.id}`}
									>
										<div
											className={
												classes.MediaGridCardSelect
											}
										>
											<SelectRow />
										</div>
										{doc.mimeType?.includes("image") ? (
											doc.mimeType.includes("svg") ? (
												<img
													src={doc.url!}
													className={
														classes.MediaGridCardMedia
													}
												/>
											) : null
										) : (
											<video
												src={doc.url!}
												autoPlay={true}
												muted={true}
												loop={true}
												playsInline={true}
												controls={false}
												className={
													classes.MediaGridCardMedia
												}
											/>
										)}
										<div className={classes.MediaCardMeta}>
											<p
												className={
													classes.MediaGridCardTitle
												}
											>
												{doc.filename}
											</p>
											<p
												className={
													classes.MediaGridCardAlt
												}
											>
												{doc.alt || "<No Alt Text>"}
											</p>
											<p
												className={
													classes.MediaGridCardAlt
												}
											>
												{formatDate({
													date: doc.updatedAt,
													pattern: dateFormat,
													i18n: i18n,
												})}
											</p>
											<p
												className={
													classes.MediaGridCardAlt
												}
											>
												{formatDate({
													date: doc.createdAt,
													pattern: dateFormat,
													i18n: i18n,
												})}
											</p>
										</div>
									</Button>
								))
							: null}
					</div>
					{data.docs && data.docs.length > 0 && (
						<div className={`${baseClass}__page-controls`}>
							<Pagination
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
									<div className={`${baseClass}__page-info`}>
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
										// modifySearchParams={modifySearchParams}
										resetPage={
											data.totalDocs <= data.pagingCounter
										}
									/>
									{smallBreak && (
										<div
											className={`${baseClass}__list-selection`}
										>
											<Fragment>
												<ListSelection
													label={
														typeof pluralLabel ===
														"string"
															? getTranslation(
																	pluralLabel,
																	i18n,
																)
															: ""
													}
												/>
												{/* <div className={`${baseClass}__list-selection-actions`}>
													<EditMany collection={collection} resetParams={resetParams} />
													<PublishMany collection={collection} resetParams={resetParams} />
													<UnpublishMany collection={collection} resetParams={resetParams} />
													<DeleteMany collection={collection} resetParams={resetParams} />
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
