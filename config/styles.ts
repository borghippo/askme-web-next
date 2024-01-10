// Abbreviations for commonly used Tailwind style combinations

import { create } from "zustand";

interface Styles {
  message: string;
  summaryLink: string;
  summaryLinkName: string;
  settings: string;
  checkbox: string;
  label: string;
  textInput: string;
}

export const getStyles = create<Styles>()((set) => ({

  // error message and loading message
  message: "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",

  // search results: document summary and related document links
  summaryLink: "group flex items-center gap-x-1 hover:cursor-pointer",

  // search results: text of document summary and related document links
  summaryLinkName: "text-sm font-medium group-hover:underline",

  // user settings: menu drawer
  settings: "menu min-h-full w-75 bg-base-200 p-2 text-base-content",

  // user settings: checkbox in the menu
  checkbox: "checkbox checkbox-sm",

  // user settings: individual setting (input element plus label)
  label: "label justify-start gap-x-4",

  // user settings: text input
  textInput: "bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-10 p-1",

}));
