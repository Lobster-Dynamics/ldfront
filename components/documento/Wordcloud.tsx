
import Image from "next/image";

export default function Wordcloud(){


return (

<div className="overflow-y-auto flex justify-center items-center h-full">

        <Image
          src="/wordcloud.png"
          alt="WordCloud"
          width={200}
          height={200} 
          className="w-6/12"
        />

</div>



);

}