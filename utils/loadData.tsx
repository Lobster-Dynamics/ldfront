import { Tab } from "@/types/AppTypes";
import { DirectoryDetails, DirectoryItemDetails, UserAuth, Document, ExplicacionFragmento } from "@/types/ModelTypes";
import { ScrollText, MessageSquare, List, Cloud, BookOpen, Workflow, TextSearch, LucideIcon, Component, FileText } from "lucide-react";
import { UUID } from "crypto";
import dynamic from "next/dynamic";

// Imports for dynamic imports (Only when client-side rendering)
const Paper = dynamic(() => import('@/components/documento').then(mod => mod.Paper), { ssr: false});
const GraphViz = dynamic(() => import('@/components/documento').then(mod => mod.GraphViz), { ssr: false});
const Summary = dynamic(() => import('@/components/documento').then(mod => mod.Summary), { ssr: false});
const WordCloud = dynamic(() => import('@/components/documento').then(mod => mod.WordCloud), { ssr: false});
const Keywords = dynamic(() => import('@/components/documento').then(mod => mod.Keywords), { ssr: false});
const Chat = dynamic(() => import('@/components/documento').then(mod => mod.Chat), { ssr: false});
const Explicacion = dynamic(() => import('@/components/documento').then(mod => mod.Explicacion), { ssr: false });
const FileViewer = dynamic(() => import('@/components/documento').then(mod => mod.FileViewer), { ssr: false });

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
	const selectedTabStorage = localStorage.getItem("selectedTabs");

	if (selectedTabStorage === null) {
        // Save the selected tab in localStorage
		localStorage.setItem(
			"selectedTabs",
			JSON.stringify({
				left: "Documento",
				rightTop: "Chat",
				rightBottom: "Nube de Palabras",
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
					{ id: "Documento", content: "Documento" },
					{ id: "Grafo", content: "Grafo" },
                    { id: "Visualizador", content: "Visualizador" },
					{ id: "Explanation", content: "Explicación" }
				],
				rightTop: [
					{ id: "Chat", content: "Chat" },
					{ id: "Resumen", content: "Resumen" },
				],
				rightBottom: [
					{ id: "Nube de Palabras", content: "Nube de Palabras" },
					{ id: "Conceptos", content: "Conceptos" },
				],
			}),
		);
	}

	const tabs: {
		[key: string]: Tab[];
	} = JSON.parse(localStorage.getItem("tabs")!);

	// Remove Explanation tab if there are no explanations
	if (explanation && explanation.length === 0) {
        for (const key in tabs)
            tabs[key] = tabs[key].filter((tab: Tab) => tab.content !== "Explicación");
	}
    // Remove Visualizador tab if the document is not a pdf
    if (data && data.document_url.split('/')[5].split('?')[0].split('.').pop() !== "pdf") {
        for (const key in tabs)
            tabs[key] = tabs[key].filter((tab: Tab) => tab.content !== "Visualizador");
    }

    // If tab "Explicación" was removed, and now there are explanations, add it back
    if (explanation && explanation.length > 0) {
        if (!tabs["left"].find((tab: Tab) => tab.content === "Explicación"))
            tabs["left"].push({ id: "Explicación", content: "Explicación" } as Tab);
    }
    // // If tab "Visualizador" was removed, and now there is support for it (File format), add it back
    if (data && data.document_url.split('/')[5].split('?')[0].split('.').pop() === "pdf") {
        if (!tabs["left"].find((tab: Tab) => tab.content === "Visualizador"))
            tabs["left"].push({ id: "Visualizador", content: "Visualizador" } as Tab);
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
		case "Nube de Palabras":
			return Cloud;
		case "Conceptos":
			return List;
        case "Visualizador":
            return FileText
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
		case "Nube de Palabras":
			return (
				<WordCloud documentId={documentId} width={500} height={500} />
			);
		case "Conceptos":
			return (
				<Keywords
					documentId={documentId}
					keywords={documentData?.key_concepts}
				/>
			);
        case "Visualizador":
            return <FileViewer documentUrl={documentData.document_url} />
		default:
			return <></>;
	}
}
