import React, { ReactNode, ReactElement } from "react";
import { ContentSegment, StreamableContent } from "@/lib/types/terminal";

/**
 * Serializes ReactNode content into text segments
 * Flattens the structure to get total character count
 */
export function serializeContent(node: ReactNode): StreamableContent {
  const segments: ContentSegment[] = [];
  let currentIndex = 0;

  function traverse(node: ReactNode): void {
    if (typeof node === "string") {
      if (node.length > 0) {
        segments.push({
          type: "text",
          text: node,
          startIndex: currentIndex,
          endIndex: currentIndex + node.length,
        });
        currentIndex += node.length;
      }
      return;
    }

    if (typeof node === "number") {
      const text = node.toString();
      segments.push({
        type: "text",
        text,
        startIndex: currentIndex,
        endIndex: currentIndex + text.length,
      });
      currentIndex += text.length;
      return;
    }

    if (React.isValidElement(node)) {
      const element = node as ReactElement;
      const { children } = element.props;

      if (children) {
        React.Children.forEach(children, (child) => traverse(child));
      }
      return;
    }

    if (Array.isArray(node)) {
      node.forEach((child) => traverse(child));
      return;
    }
  }

  traverse(node);

  return {
    segments,
    totalLength: currentIndex,
  };
}

/**
 * Reconstructs partial content by cloning the tree and revealing text progressively
 */
export function reconstructContent(
  originalNode: ReactNode,
  visibleLength: number,
  showCursor: boolean,
): ReactNode {
  let currentIndex = 0;
  let cursorAdded = false;

  function cloneWithLimit(node: ReactNode): ReactNode {
    // If cursor already added, don't process more
    if (cursorAdded) {
      return null;
    }

    // Handle string content
    if (typeof node === "string") {
      if (node.length === 0) return node;

      const remainingChars = visibleLength - currentIndex;
      if (remainingChars <= 0) {
        return null;
      }

      const visibleText = node.slice(0, remainingChars);
      currentIndex += visibleText.length;

      // Add cursor if we cut this text short
      if (visibleText.length < node.length && showCursor && !cursorAdded) {
        cursorAdded = true;
        return (
          <>
            {visibleText}
            <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-terminal-primary animate-blink align-middle ml-0.5">
              ▋
            </span>
          </>
        );
      }

      return visibleText;
    }

    // Handle number content
    if (typeof node === "number") {
      const text = node.toString();
      const remainingChars = visibleLength - currentIndex;
      if (remainingChars <= 0) {
        return null;
      }

      const visibleText = text.slice(0, remainingChars);
      currentIndex += visibleText.length;

      if (visibleText.length < text.length && showCursor && !cursorAdded) {
        cursorAdded = true;
        return (
          <>
            {visibleText}
            <span className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-terminal-primary animate-blink align-middle ml-0.5">
              ▋
            </span>
          </>
        );
      }

      return visibleText;
    }

    // Handle React elements
    if (React.isValidElement(node)) {
      const element = node as ReactElement;
      const { children, ...props } = element.props;

      if (!children) {
        return React.cloneElement(element, props);
      }

      // Process children
      const newChildren: ReactNode[] = [];
      React.Children.forEach(children, (child) => {
        if (cursorAdded) return;
        const clonedChild = cloneWithLimit(child);
        if (clonedChild !== null && clonedChild !== undefined && clonedChild !== false) {
          newChildren.push(clonedChild);
        }
      });

      // If no children were visible, don't render this element
      if (newChildren.length === 0 && currentIndex === 0) {
        return null;
      }

      // Add cursor at end if we've shown everything and need cursor
      if (
        showCursor &&
        !cursorAdded &&
        currentIndex >= visibleLength &&
        newChildren.length > 0
      ) {
        cursorAdded = true;
        newChildren.push(
          <span
            key="cursor"
            className="inline-block w-1.5 sm:w-2 h-3.5 sm:h-4 bg-terminal-primary animate-blink align-middle ml-0.5"
          >
            ▋
          </span>,
        );
      }

      return React.cloneElement(element, props, ...newChildren);
    }

    // Handle arrays
    if (Array.isArray(node)) {
      const newArray: ReactNode[] = [];
      node.forEach((child, idx) => {
        if (cursorAdded) return;
        const clonedChild = cloneWithLimit(child);
        if (clonedChild !== null && clonedChild !== undefined && clonedChild !== false) {
          newArray.push(
            React.isValidElement(clonedChild)
              ? React.cloneElement(clonedChild as ReactElement, { key: idx })
              : clonedChild,
          );
        }
      });
      return newArray;
    }

    return node;
  }

  const result = cloneWithLimit(originalNode);

  return result;
}
