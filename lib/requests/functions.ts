import axiosClient from "@/config/axiosClient";
import { axiosConfig } from "@/config/axiosConfig";
import { UUID } from "crypto";
import { mutate } from "swr";
import { ErrorAlert } from "../alerts/alerts";

export default async function handleItemDrop(
	directoryId: UUID | string,
	newDirectoryId: UUID | string,
	itemId: UUID | string,
) {
	const config = axiosConfig();
	if (!config) return;

	const data = {
		directory_id: directoryId,
		new_directory_id: newDirectoryId,
		item_id: itemId,
	};

	try {
		await axiosClient.put("/directory/move_item", data, config);
		mutate(`/directory/get_directory/${directoryId}`);
	} catch (error) {
		await ErrorAlert(
			"Error al mover el archivo",
			"Intente de nuevo más tarde",
		);
	}
}
