"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface BaseProps {
  children: React.ReactNode;
}

interface RootCredenzaProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "dialog" | "sheet";
}

interface CredenzaProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const CredenzaContext = React.createContext<{
  isMobile: boolean;
  variant: "dialog" | "sheet";
}>({
  isMobile: false,
  variant: "dialog",
});

const useCredenzaContext = () => {
  const context = React.useContext(CredenzaContext);
  if (!context) {
    throw new Error(
      "Credenza components cannot be rendered outside the Credenza Context",
    );
  }
  return context;
};

const Credenza = ({
  children,
  variant = "dialog",
  ...props
}: RootCredenzaProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <CredenzaContext.Provider value={{ isMobile, variant }}>
        <Drawer {...props} autoFocus>
          {children}
        </Drawer>
      </CredenzaContext.Provider>
    );
  }

  if (variant === "sheet") {
    return (
      <CredenzaContext.Provider value={{ isMobile, variant }}>
        <Sheet {...props}>{children}</Sheet>
      </CredenzaContext.Provider>
    );
  }

  return (
    <CredenzaContext.Provider value={{ isMobile, variant }}>
      <Dialog {...props}>{children}</Dialog>
    </CredenzaContext.Provider>
  );
};

const CredenzaTrigger = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerTrigger className={className} {...props}>
        {children}
      </DrawerTrigger>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetTrigger className={className} {...props}>
        {children}
      </SheetTrigger>
    );
  }

  return (
    <DialogTrigger className={className} {...props}>
      {children}
    </DialogTrigger>
  );
};

const CredenzaClose = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerClose className={className} {...props}>
        {children}
      </DrawerClose>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetClose className={className} {...props}>
        {children}
      </SheetClose>
    );
  }

  return (
    <DialogClose className={className} {...props}>
      {children}
    </DialogClose>
  );
};

const CredenzaContent = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerContent className={className} {...props}>
        {children}
      </DrawerContent>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetContent className={className} {...props}>
        {children}
      </SheetContent>
    );
  }

  return (
    <DialogContent className={className} {...props}>
      {children}
    </DialogContent>
  );
};

const CredenzaDescription = ({
  className,
  children,
  ...props
}: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerDescription className={className} {...props}>
        {children}
      </DrawerDescription>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetDescription className={className} {...props}>
        {children}
      </SheetDescription>
    );
  }

  return (
    <DialogDescription className={className} {...props}>
      {children}
    </DialogDescription>
  );
};

const CredenzaHeader = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerHeader className={className} {...props}>
        {children}
      </DrawerHeader>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetHeader className={className} {...props}>
        {children}
      </SheetHeader>
    );
  }

  return (
    <DialogHeader className={className} {...props}>
      {children}
    </DialogHeader>
  );
};

const CredenzaTitle = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerTitle className={className} {...props}>
        {children}
      </DrawerTitle>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetTitle className={className} {...props}>
        {children}
      </SheetTitle>
    );
  }

  return (
    <DialogTitle className={className} {...props}>
      {children}
    </DialogTitle>
  );
};

const CredenzaBody = ({ className, children, ...props }: CredenzaProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const CredenzaFooter = ({ className, children, ...props }: CredenzaProps) => {
  const { isMobile, variant } = useCredenzaContext();

  if (isMobile) {
    return (
      <DrawerFooter className={className} {...props}>
        {children}
      </DrawerFooter>
    );
  }

  if (variant === "sheet") {
    return (
      <SheetFooter className={className} {...props}>
        {children}
      </SheetFooter>
    );
  }

  return (
    <DialogFooter className={className} {...props}>
      {children}
    </DialogFooter>
  );
};

export {
  Credenza,
  CredenzaTrigger,
  CredenzaClose,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaBody,
  CredenzaFooter,
};
