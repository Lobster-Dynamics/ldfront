
interface SidebarElementProps {
    Icon: JSX.Element;
    name: string;
    onClick: () => void;
    selected: boolean;
}


export default function SidebarElement({ Icon, name, onClick, selected }: SidebarElementProps) {
    return (
        <div
            onClick={onClick}
            className={`cursor-pointer flex flex-row items-center pl-5 py-2 rounded-lg hover:bg-purpleFrida-300 hover:bg-opacity-40 ${selected ? 'bg-gray-200' : ''}`}
        >
            <div className="mr-4">
                {Icon}
            </div>
            <p>
                {name}
            </p>
        </div>
    );
}

