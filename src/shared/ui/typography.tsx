import React from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

export default function Typography({
  className = "",
  tag,
  children,
}: {
  className?: string;
  tag: TypographyTag;
  children: React.ReactNode;
}) {
  function getClassName() {
    switch (tag) {
      case "h1":
        return "text-4xl font-bold";
      case "h2":
        return "text-3xl font-bold";
      case "h3":
        return "text-2xl font-bold";
      case "h4":
        return "text-xl font-bold";
      case "h5":
        return "text-lg font-bold";
      case "h6":
        return "text-base font-bold";
      case "p":
        return "text-base";
      case "span":
        return "text-base";
      default:
        return "text-base";
    }
  }
  const Tag = tag;
  return <Tag className={getClassName() + " " + className}>{children}</Tag>;
}
