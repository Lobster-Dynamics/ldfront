import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import useSWR from 'swr';
import { fetcher } from '@/config/fetcher';
import { Word, Options } from 'react-wordcloud';

interface WordCloudProps {
  uuid: string;
}

export default function Wordcloud({ uuid }: WordCloudProps) {
  // Use SWR to fetch data from the endpoint
  const { data, error } = useSWR<Word[]>(
    `/document/generate_word_cloud/${uuid}`,
    fetcher
  );

  // Handle error and loading states
  if (error) {
    return <div>Error fetching word cloud data.</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  // Validate data structure to avoid rendering errors
  const words = data.map((item) => {
    if ('text' in item && 'value' in item) {
      return { text: item.text, value: item.value };
    } else {
      throw new Error("Invalid data structure");
    }
  });

  const options: Options = {
    colors: ["#AC73D9", "#8700BF", "#7B20C3", "#DBDEFF", "#AEB1F8", "#6568BB"],
    enableTooltip: true,
    deterministic: false,
    fontFamily: "inter",
    fontSizes: [35, 60],
    fontStyle: "normal",
    fontWeight: "normal",
    padding: 1,
    rotations: 3,
    rotationAngles: [0, 75],
    scale: "sqrt",
    transitionDuration: 1000,
    enableOptimizations: false,
    spiral: 'archimedean',
    svgAttributes: undefined,
    textAttributes: undefined,
    tooltipOptions: undefined
  };

  // Render the ReactWordcloud with the validated data
  return (
    <div className="flex h-full w-full py-4 items-center justify-center overflow-y-auto">
      <ReactWordcloud options={options} words={words} />
    </div>
  );
}