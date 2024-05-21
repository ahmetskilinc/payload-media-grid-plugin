"use client";

import { getTranslation } from "@payloadcms/translations";
import { Button } from "@payloadcms/ui/elements/Button";
import { DeleteMany } from "@payloadcms/ui/elements/DeleteMany";
import { EditMany } from "@payloadcms/ui/elements/EditMany";
import { Gutter } from "@payloadcms/ui/elements/Gutter";
import { ListControls } from "@payloadcms/ui/elements/ListControls";
import { ListSelection } from "@payloadcms/ui/elements/ListSelection";
import { Pagination } from "@payloadcms/ui/elements/Pagination";
import { PerPage } from "@payloadcms/ui/elements/PerPage";
import { Pill } from "@payloadcms/ui/elements/Pill";
import { PublishMany } from "@payloadcms/ui/elements/PublishMany";
import { SelectAll } from "@payloadcms/ui/elements/SelectAll";
import { SortColumn } from "@payloadcms/ui/elements/SortColumn";
import { useStepNav } from "@payloadcms/ui/elements/StepNav";
import { UnpublishMany } from "@payloadcms/ui/elements/UnpublishMany";
import { useWindowInfo } from "@payloadcms/ui/elements/WindowInfo";
import { SetViewActions } from "@payloadcms/ui/providers/Actions";
import { useComponentMap } from "@payloadcms/ui/providers/ComponentMap";
import { useConfig } from "@payloadcms/ui/providers/Config";
import { useListInfo } from "@payloadcms/ui/providers/ListInfo";
import { useListQuery } from "@payloadcms/ui/providers/ListQuery";
import { useSearchParams } from "@payloadcms/ui/providers/SearchParams";
import { SelectionProvider } from "@payloadcms/ui/providers/Selection";
import { useTranslation } from "@payloadcms/ui/providers/Translation";
import type { CollectionComponentMap } from "@payloadcms/ui/utilities/buildComponentMap";
import { formatDate } from "@payloadcms/ui/utilities/formatDate";
import Link from "next/link";
import { formatFilesize, isNumber } from "payload/utilities";
import React, { Fragment, useEffect } from "react";
import { Media } from "../../types";

import "./MediaGrid.scss";

const payloadBaseClass = "collection-list";
const baseClass = "media-grid";

const MediaGridClient = () => {
	const { setStepNav } = useStepNav();

	useEffect(() => {
		setStepNav([
			{
				label: "Media",
			},
		]);
	}, [setStepNav]);

	const { getComponentMap } = useComponentMap();

	const { Header, collectionSlug, hasCreatePermission, newDocumentURL } =
		useListInfo();

	const componentMap = getComponentMap({
		collectionSlug,
	}) as CollectionComponentMap;

	const {
		AfterList,
		AfterListTable,
		BeforeList,
		BeforeListTable,
		Description,
		actionsMap,
		fieldMap,
	} = componentMap || {};

	const {
		breakpoints: { s: smallBreak },
	} = useWindowInfo();

	const { i18n, t } = useTranslation();

	const { searchParams } = useSearchParams();
	const { data, defaultLimit, handlePageChange, handlePerPageChange } =
		useListQuery();

	const {
		admin: { dateFormat },
		routes: { admin: adminRoute },
		collections,
	} = useConfig();

	const collectionConfig = collections.find(
		(collection) => collection.slug === collectionSlug,
	);

	const { labels } = collectionConfig!;

	return (
		<div className={baseClass}>
			<SetViewActions actions={actionsMap?.List} />
			{BeforeList}
			<SelectionProvider docs={data.docs} totalDocs={data.totalDocs}>
				<Gutter
					className={`${payloadBaseClass}__wrap ${baseClass}__wrap`}
				>
					<header className={`${payloadBaseClass}__header`}>
						{Header || (
							<Fragment>
								<h1>{getTranslation(labels?.plural, i18n)}</h1>
								{hasCreatePermission && (
									<Pill
										aria-label={i18n.t(
											"general:createNewLabel",
											{
												label: getTranslation(
													labels?.singular,
													i18n,
												),
											},
										)}
										to={newDocumentURL}
									>
										{i18n.t("general:createNew")}
									</Pill>
								)}
								{!smallBreak && (
									<ListSelection
										label={getTranslation(
											collectionConfig!.labels.plural,
											i18n,
										)}
									/>
								)}
								{Description && (
									<div className={`${baseClass}__sub-header`}>
										{Description}
									</div>
								)}
							</Fragment>
						)}
					</header>
					<ListControls
						collectionConfig={collectionConfig!}
						fieldMap={fieldMap}
						enableColumns={false}
					/>
					{BeforeListTable}
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
									<Button
										key={doc.id}
										className={`${baseClass}__grid-card`}
										to={`${adminRoute}/collections/media/${doc.id}`}
										el="link"
										Link={Link}
										buttonStyle="none"
									>
										<div className={`${baseClass}__select`}>
											{/*
												TODO: Selecting single row doesnt work as cant provide ID to it
												previous was: <SelectRow id={doc.id} />
												And Select not working inside Next Link component
											*/}
											{/* <SelectRow /> */}
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
											<p>
												<span
													className={`${baseClass}__grid-title`}
												>
													{doc.filename}
												</span>
												{" - "}
												{formatFilesize(doc.filesize!)}
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
					{AfterListTable}
					{data.docs && data.docs.length > 0 && (
						<div className={`${payloadBaseClass}__page-controls`}>
							<Pagination
								hasNextPage={data.hasNextPage}
								hasPrevPage={data.hasPrevPage}
								limit={data.limit}
								nextPage={data.nextPage!}
								numberOfNeighbors={1}
								onChange={handlePageChange}
								page={data.page}
								prevPage={data.prevPage!}
								totalPages={data.totalPages}
							/>
							{data?.totalDocs > 0 && (
								<Fragment>
									<div
										className={`${payloadBaseClass}__page-info`}
									>
										{data.page! * data.limit -
											(data.limit - 1)}
										-
										{data.totalPages > 1 &&
										data.totalPages !== data.page
											? data.limit * data.page!
											: data.totalDocs}{" "}
										{t("general:of")} {data.totalDocs}
									</div>
									<PerPage
										handleChange={handlePerPageChange}
										limit={
											isNumber(searchParams?.limit)
												? Number(searchParams.limit)
												: defaultLimit!
										}
										limits={
											collectionConfig?.admin?.pagination
												?.limits!
										}
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
														typeof labels.plural ===
														"string"
															? getTranslation(
																	labels.plural,
																	i18n,
																)
															: ""
													}
												/>
												<div
													className={`${baseClass}__list-selection-actions`}
												>
													<EditMany
														collection={
															collectionConfig!
														}
														fieldMap={fieldMap}
													/>
													<PublishMany
														collection={
															collectionConfig!
														}
													/>
													<UnpublishMany
														collection={
															collectionConfig!
														}
													/>
													<DeleteMany
														collection={
															collectionConfig!
														}
													/>
												</div>
											</Fragment>
										</div>
									)}
								</Fragment>
							)}
						</div>
					)}
				</Gutter>
			</SelectionProvider>
			{AfterList}
		</div>
	);
};

export default MediaGridClient;
