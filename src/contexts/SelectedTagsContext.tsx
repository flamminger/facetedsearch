import React, { useContext, useState } from "react";

// define context
interface SelectedTagsContextProps {
  selectedTags: string[];
  setSelectedTags: React.Dispatch<React.SetStateAction<string[]>>;
  clearSelectedTags: () => void;
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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  return (
    <SelectedTagsContext.Provider
      value={{ selectedTags, setSelectedTags, clearSelectedTags }}
    >
      {children}
    </SelectedTagsContext.Provider>
  );
};
