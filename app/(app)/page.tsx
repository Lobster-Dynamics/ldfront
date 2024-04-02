"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {

    const router = useRouter()
    router.push('/login')
    

  return (
    <div className=" ">
    
                <h1>HOla</h1>
    </div>
  );
}
