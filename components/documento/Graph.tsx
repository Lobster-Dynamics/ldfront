import Image from "next/image";


export default function Graph() {
    

    return (
        <div className="w-full h-full">
            <Image
                src="grafo.png"
                alt="Grafo, falta cambiar"
                width={500}
                height={500}
                className="w-full h-full"
                />
    </div>
    );

}
