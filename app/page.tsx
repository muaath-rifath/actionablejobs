"use client"
import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // You can implement your search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="flex  border border-gray-400 rounded-md overflow-hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="p-2 focus:outline-none flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
          Search
        </button>
      </div>
    </main>
  );
}