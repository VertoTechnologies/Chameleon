// components/SearchResultsContainer.tsx
'use client'
import React, { useState } from 'react';
import UserProfile from './searchresults';

// Dummy data for demonstration
const dummyData = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  nativeLanguages: ['Urdu'],
  fluentLanguages: ['Urdu', 'English'],
  learningLanguages: ['German'],
}));

const ITEMS_PER_PAGE = 6; // Number of items to show per page

const SearchResultsContainer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(dummyData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedData = dummyData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-full px-4 py-6">
      <div className="grid gap-4">
        {selectedData.map((item) => (
          <UserProfile key={item.id} user={item} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SearchResultsContainer;
