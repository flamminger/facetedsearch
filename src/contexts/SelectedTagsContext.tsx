import React, { useContext, useState } from "react";

// define context
interface SelectedTagsContextProps {
  selectedTags: Set<string>;
  setSelectedTags: React.Dispatch<React.SetStateAction<Set<string>>>;
  clearSelectedTags: () => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  isTagSelected: (tag: string) => boolean;
}

const SelectedTagsContext = React.createContext<
  SelectedTagsContextProps | undefined
>(undefined);

// hook for further usage
export function useSelectedTags() {
  const context = useContext(SelectedTagsContext);
  if (!context) {
    throw new Error(
      "useSelectedTags must be used within a SelectedTagsProvider"
    );
  }
  return context;
}

// provider
interface SelectedTagsProviderProps {
  children: React.ReactNode;
}

export const SelectedTagsProvider = ({
  children,
}: SelectedTagsProviderProps) => {
  const [selectedTags, setSelectedTags] = useState(new Set<string>());

  const clearSelectedTags = () => {
    setSelectedTags(new Set<string>());
  };

  const addTag = (tag: string) =>
    setSelectedTags((prevTags) => new Set(prevTags).add(tag));

  const removeTag = (tag: string) =>
    setSelectedTags((prevTags) => {
      const newTags = new Set(prevTags);
      newTags.delete(tag);
      return newTags;
    });

  const isTagSelected = (tag: string) => selectedTags.has(tag);

  return (
    <SelectedTagsContext.Provider
      value={{
        selectedTags,
        setSelectedTags,
        clearSelectedTags,
        addTag,
        removeTag,
        isTagSelected,
      }}
    >
      {children}
    </SelectedTagsContext.Provider>
  );
};
