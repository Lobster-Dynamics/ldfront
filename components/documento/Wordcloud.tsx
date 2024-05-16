import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher } from '@/config/fetcher';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import Wordcloud from '@visx/wordcloud/lib/Wordcloud';

interface WordCloudProps {
  uuid: string;
  width: number;
  height: number;
}

export interface Word {
  [key: string]: any;
  text: string;
  value: number;
}

export interface WordData {
  text: string;
  value: number;
}

export default function WordCloud({ uuid, width, height }: WordCloudProps) {
  // Use SWR to fetch data from the endpoint
  const { data, error } = useSWR<Word[]>(`/document/generate_word_cloud/${uuid}`, fetcher);

  // State for spiral type and rotation
  const [spiralType, setSpiralType] = useState<'archimedean' | 'rectangular'>('archimedean');
  const [withRotation, setWithRotation] = useState(false);

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

  console.log(words)

  const colors = ["#AC73D9", "#8700BF", "#7B20C3", "#AEB1F8", "#6568BB"];

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [50, 100],
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const fixedValueGenerator = () => 0.5;

  return (
    <div className="flex h-full w-full py-4 items-center justify-center overflow-y-auto">
      <Wordcloud
        words={words}
        width={width}
        height={height}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={spiralType}
        rotate={withRotation ? () => Math.random() * 90 - 45 : 0}
        random={fixedValueGenerator}
        
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={colors[i % colors.length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>
    </div>
  );
}
