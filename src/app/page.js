import { Suspense } from "react";

async function getData() {
  const res = await fetch("https://dummyjson.com/todos");

  if (!res.ok) {
    throw new Error("failed to fecth data");
  }

  return res.json();
}



export default async function Home() {
  const todos = await getData();

  console.log(todos);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
        
     

     
    </main>
  );
}
