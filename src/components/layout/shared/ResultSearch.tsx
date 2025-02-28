"use client";

import { FC } from "react";

interface ResultSearchProps {
  onClose: () => void;
}

export const ResultSearch: FC<ResultSearchProps> = ({ onClose }) => {
  return (
    <div className="absolute top-full left-0 w-full mt-1 bg-white dark:bg-[#1b2532] rounded-md shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="max-h-96 overflow-y-auto">
        <div className="py-2">
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a3f59] cursor-pointer transition-colors duration-200">
            EC2 Instances
          </div>
          <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2a3f59] cursor-pointer transition-colors duration-200">
            S3 Buckets
          </div>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-2">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};