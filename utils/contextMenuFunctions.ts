import { RefObject } from "react";

export const handleRightClick = (
	event: React.MouseEvent<HTMLDivElement, MouseEvent>,
	setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setMenuPosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>,
): void => {
	event.preventDefault();
	const selection = window.getSelection();
	if (selection && selection.rangeCount > 0) {
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Assume a fixed size for the context menu
		// Alternatively, you can dynamically get the size of the context menu if it's rendered already
		const contextMenuWidth = 200; // Adjust this to your context menu's width
		const contextMenuHeight = 150; // Adjust this to your context menu's height

		let x = event.clientX;
		let y = event.clientY;

		// Adjust if near right edge
		if (x + contextMenuWidth > viewportWidth) {
			x = viewportWidth - contextMenuWidth - 10; // 10px padding from edge
		}

		// Adjust if near bottom edge
		if (y + contextMenuHeight > viewportHeight) {
			y = viewportHeight - contextMenuHeight - 10; // 10px padding from edge
		}
		setMenuVisible(true);
		setMenuPosition({
			x: x,
			y: y,
		});
	}
};

export const openContextMenuButton = (
	buttonRef: RefObject<HTMLButtonElement>,
	setMenuVisible: React.Dispatch<React.SetStateAction<boolean>>,
	setMenuPosition: React.Dispatch<
		React.SetStateAction<{ x: number; y: number }>
	>,
) => {
	if (buttonRef.current) {
		const rect = buttonRef.current.getBoundingClientRect();

		// Get viewport dimensions
		const viewportWidth = window.innerWidth;
		const viewportHeight = window.innerHeight;

		// Assume a fixed size for the context menu
		// Alternatively, you can dynamically get the size of the context menu if it's rendered already
		const contextMenuWidth = 200; // Set this to your context menu's width
		const contextMenuHeight = 150; // Set this to your context menu's height

		let x = rect.left;
		let y = rect.bottom;

		// Adjust if near right edge
		if (x + contextMenuWidth > viewportWidth) {
			x = viewportWidth - contextMenuWidth - 10; // 10px padding from edge
		}

		// Adjust if near bottom edge
		if (y + contextMenuHeight > viewportHeight) {
			y = viewportHeight - contextMenuHeight - 10; // 10px padding from edge
		}

		setMenuVisible(true);
		setMenuPosition({
			x: x,
			y: y,
		});
	}
};
