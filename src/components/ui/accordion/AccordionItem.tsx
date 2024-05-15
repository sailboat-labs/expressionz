import { useContext, useRef } from "react";
import { AccordionContext } from "./Accordion";
import { AnimatePresence, motion } from "framer-motion";

export interface AccordionItemProps {
  index: number;
  children: () => React.ReactNode;
  renderTrigger?: (payload: TriggerRendererPayload) => React.ReactNode;
  triggerContent?: string;
}

export interface TriggerRendererPayload {
  handleToggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  index,
  children,
  renderTrigger,
  triggerContent = "Trigger",
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const { expandedIndex, setExpandedIndex } = useContext(AccordionContext)!;

  const handleToggle = () => {
    if (expandedIndex === index) {
      setExpandedIndex(null);
    } else {
      setExpandedIndex(index);
    }
  };

  const height = contentRef.current?.clientHeight;
  // console.log(height);

  return (
    <div>
      {renderTrigger ? (
        renderTrigger({ handleToggle })
      ) : (
        <button onClick={handleToggle} className="flex items-center gap-2">
          {expandedIndex === index ? "-" : "+"}
          {triggerContent}
        </button>
      )}

      <AnimatePresence>
        {expandedIndex === index && (
          <motion.div
            ref={contentRef}
            key="content"
            className="overflow-y-hidden"
            initial={{ height: 0 }}
            animate={{ height: height }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
