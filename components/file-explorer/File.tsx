interface FileProps {
	name: string;
}

export default function File({ name }: FileProps) {
	return (
		<div className="bg-green-300 h-fit">
			<h1>{name}</h1>
		</div>
	);
}
