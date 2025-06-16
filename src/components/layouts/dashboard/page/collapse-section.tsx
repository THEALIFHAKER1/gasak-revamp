import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";

interface CollapseSectionProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export function CollapseSection({
  title,
  children,
  defaultOpen = true,
  className,
}: CollapseSectionProps) {
  return (
    <div className={className}>
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultOpen ? "item-1" : undefined}
        className="w-full"
      >
        <AccordionItem value="item-1" className="border-none">
          <AccordionTrigger className="px-0 py-3 text-lg font-semibold hover:no-underline">
            {title}
          </AccordionTrigger>
          <AccordionContent className="rounded-lg border p-1">
            {children}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
