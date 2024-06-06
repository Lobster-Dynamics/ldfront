import { Tab } from "@/types/AppTypes";
import { DirectoryDetails, DirectoryItemDetails, UserAuth, Document, ExplicacionFragmento } from "@/types/ModelTypes";
import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow, TextSearch, LucideIcon, Component } from "lucide-react";
import { Paper, GraphViz, Summary, WordCloud, Keywords, Chat, Explicacion } from "@/components/documento";
import { UUID } from "crypto";

function _parseJWT(token: string) {
	return JSON.parse(atob(token.split(".")[1]));
}

export function loadUserAuthData(data: any): UserAuth {
	const tokenData = _parseJWT(data.token);
	return {
		token: data.token,
		refreshToken: data.refreshToken,
		name: data.name,
		lastname: data.lastname,
		email: tokenData.email,
		rootDirectoryId: data.root_directory_id,
		uid: tokenData.user_id,
	};
}

export function loadDirectoryData(data: any): DirectoryDetails {
	const containedItems: DirectoryItemDetails[] = data?.contained_items.map(
		(item: any) => {
			return {
				extension: item.extension,
				id: item.item_id,
				type: item.item_type,
				name: item.name,
				ownerId: item.owner_id,
				ownerName: item.owner_name,
				uploadDate: item.upload_date,
			};
		},
	);
	return {
		id: data.id,
		name: data.name,
		ownerId: data.owner_id,
		ownerName: data.owner_name,
		items: containedItems,
		path: data.path,
		shared: data.shared,
		uploadDate: data.upload_date,
	};
}

export function loadSelectedTab(): {
	[key: string]: string;
} {
	const selectedTabStorage = localStorage.getItem("selectedTab");

	if (selectedTabStorage === null) {
        // Save the selected tab in localStorage
		localStorage.setItem(
			"selectedTabs",
			JSON.stringify({
				left: "left-1",
				rightTop: "right-top-1",
				rightBottom: "right-bottom-1",
			}),
		);
	}

	return JSON.parse(localStorage.getItem("selectedTabs")!);
}

export function loadTabsData(
	data: Document | undefined,
	explanation: ExplicacionFragmento[] | undefined,
	documentId: string | UUID,
): { [key: string]: Tab[] } {
	const tabStorage = localStorage.getItem("tabs");

	// TODO: Implement measures for users manipulating localStorage (not a priority)

	if (tabStorage === null) {
		localStorage.setItem(
			"tabs",
			JSON.stringify({
				left: [
					{ id: "left-1", content: "Documento" },
					{ id: "left-2", content: "Grafo" },
					{ id: "left-3", content: "Explicación" },
				],
				rightTop: [
					{ id: "right-top-1", content: "Chat" },
					{ id: "right-top-2", content: "Resumen" },
				],
				rightBottom: [
					{ id: "right-bottom-1", content: "Word Cloud" },
					{ id: "right-bottom-2", content: "KeyConcepts" },
				],
			}),
		);
	}

	const tabs: {
		[key: string]: Tab[];
	} = JSON.parse(localStorage.getItem("tabs")!);

	// Remove Explanation tab if there are no explanations
	if (explanation && explanation.length === 0) {
		tabs.left = tabs.left.filter(
			(tab: Tab) => tab.content !== "Explicación",
		);
	}

	// Add icons to tabs and its components with its data
	for (const key in tabs) {
		tabs[key].forEach((tab: Tab) => {
			tab.Icon = _getTabIcon(tab.content);
			tab.component = _getTabComponent(
				tab.content,
				data,
				explanation,
				documentId,
			);
		});
	}

	return tabs;
}

function _getTabIcon(componentName: string): LucideIcon {
	switch (componentName) {
		case "Documento":
			return ScrollText;
		case "Grafo":
			return Workflow;
		case "Explicación":
			return TextSearch;
		case "Chat":
			return MessageSquare;
		case "Resumen":
			return BookOpen;
		case "Word Cloud":
			return Cloud;
		case "KeyConcepts":
			return List;
		default:
			return Component;
	}
}

function _getTabComponent(
	componentName: string,
	documentData: Document | undefined,
	explanations: ExplicacionFragmento[] | undefined,
	documentId: string | UUID,
): JSX.Element {
	if (!documentData) {
		return <h1>Cargando...</h1>;
	}

	switch (componentName) {
		case "Documento":
			return (
				<Paper
					title={documentData.name}
					parse={documentData.parsed_llm_input.content}
				/>
			);
		case "Grafo":
			return (
				<GraphViz
					key_concepts={documentData.key_concepts}
					relationships={documentData.relationships}
				/>
			);
		case "Explicación":
			return explanations ? (
				<Explicacion explicaciones={explanations} id={documentId} />
			) : (
				<h1>Cargando...</h1>
			);
		case "Chat":
			return <Chat id={documentId} />;
		case "Resumen":
			return <Summary summary={documentData?.summary.secctions} />;
		case "Word Cloud":
			return (
				<WordCloud documentId={documentId} width={500} height={500} />
			);
		case "KeyConcepts":
			return (
				<Keywords
					documentId={documentId}
					keywords={documentData?.key_concepts}
				/>
			);
		default:
			return <></>;
	}
}
