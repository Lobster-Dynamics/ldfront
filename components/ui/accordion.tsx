"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
    <AccordionPrimitive.Item
        ref={ref}
        className={cn("w-full", className)}
        {...props}
    />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex w-full">
        <div className="flex flex-1 items-center justify-start py-1 rounded-lg outline-none transition hover:cursor-pointer hover:bg-purpleFrida-700 hover:bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10 px-2">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "flex font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90",
                    className
                )}
                {...props}
            >
                <ChevronRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
            <Image
                src="/folder.png"
                alt="folder"
                width={25}
                height={25}
                className="self-center"
            />
            <p className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-base">{children}</p>
        </div>
    </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const CurrentAccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex w-full">
        <div className="flex flex-1 items-center justify-start py-1 rounded-lg outline-none transition cursor-pointer bg-purpleFrida-700 bg-opacity-10 focus:bg-purpleFrida-700 focus:bg-opacity-10 px-2">
            <AccordionPrimitive.Trigger
                ref={ref}
                className={cn(
                    "flex font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-90",
                    className
                )}
                {...props}
            >
                <ChevronRight className="ml-1 h-4 w-4 shrink-0 transition-transform duration-200" />
            </AccordionPrimitive.Trigger>
            <Image
                src="/folder.png"
                alt="folder"
                width={25}
                height={25}
                className="self-center"
            />
            <p className="ml-1 overflow-hidden overflow-ellipsis whitespace-nowrap text-base">{children}</p>
        </div>
    </AccordionPrimitive.Header>
));
CurrentAccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
        ref={ref}
        className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
        {...props}
    >
        <div className={cn("", className)}>{children}</div>
    </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, CurrentAccordionTrigger };
