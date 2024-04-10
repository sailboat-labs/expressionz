import { useState } from "react";
import { AccordionContext } from "./Accordion";

interface AccordionProps {
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

export const AccordionWrapper: React.FC<AccordionProps> = ({
  children,
  defaultExpanded,
}) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(
    defaultExpanded ? 0 : null,
  );

  return (
    <AccordionContext.Provider value={{ expandedIndex, setExpandedIndex }}>
      {children}
    </AccordionContext.Provider>
  );
};
