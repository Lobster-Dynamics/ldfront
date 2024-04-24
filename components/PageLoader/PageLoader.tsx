import { LoadingSpinner } from "./LoadingSpinner";

export default function PageLoader() {
	return (
		<div className="flex flex-grow items-center justify-center">
			<LoadingSpinner size={100} />
		</div>
	);
}
