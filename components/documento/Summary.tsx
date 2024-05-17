import { Section } from "@/types/ModelTypes";
import React from "react";

interface SummaryProps {
    summary: Section[];
}   


export default function Summary({ summary }: SummaryProps) {
  return (
    <div className="p-10 overflow-y-auto w-full">
      {summary.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-bold font-mono">{section.title}</h2>
          <p className="text-xl font-mono">{section.body}</p>
        </div>
      ))}
    </div>
  );
}
