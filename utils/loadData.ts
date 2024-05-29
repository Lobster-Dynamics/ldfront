import { DirectoryDetails, DirectoryItemDetails, PathItem, UserAuth } from "@/types/ModelTypes"

export function parseJWT(token: string) {
    return JSON.parse(atob(token.split('.')[1]))
}

export function loadUserAuthData(data: any): UserAuth {
    const tokenData = parseJWT(data.token)
    return {
        token: data.token,
        refreshToken: data.refreshToken,
        name: data.name,
        lastname: data.lastname,
        email: tokenData.email,
        rootDirectoryId: data.root_directory_id,
        uid: tokenData.user_id,
    }
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
        shared: data.shared
	};
}
