import React, { createContext } from "react";
import { AccordionItem } from "./AccordionItem";
import { AccordionWrapper } from "./AccordionWrapper";

interface AccordionContextType {
  expandedIndex: number | null;
  setExpandedIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

const Accordion = {
  Wrapper: AccordionWrapper,
  Item: AccordionItem,
};

// const Accordion: React.FC<{ children: React.ReactNode }> & {
//   Wrapper: typeof AccordionWrapper;
//   Item: typeof AccordionItem;
// } = ({ children }) => {
//   return <>{children}</>;
// };

// Accordion.Wrapper = AccordionWrapper;
// Accordion.Item = AccordionItem;

export default Accordion;
