import { CurrencyDollarIcon } from "@heroicons/react/24/outline";
import * as React from "react";

export interface ISupportButtonProps {
  classes: string;
}

export function SupportButton({ classes }: ISupportButtonProps) {
  return (
    <a
      href="https://www.buymeacoffee.com/aaronguernsey"
      rel="noreferrer"
      target="_blank"
      className={`flex justify-center items-center mr-3 text-white bg-emerald-500 hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:focus:ring-emerald-700 ${
        classes ?? ""
      }`}
    >
      <CurrencyDollarIcon className="mr-2 h-5 w-5 cursor-pointer dark:stroke-white" />
      <span className="text-base">Support</span>
    </a>
  );
}
