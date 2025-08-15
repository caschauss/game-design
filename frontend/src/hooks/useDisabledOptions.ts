import { useCallback, useState } from "react";

export interface MinimalQuestionData {
  correct: string;
  options: { short: string }[];
}

/**
 * Kapselt die komplette Logik zum Deaktivieren von Antwortoptionen
 * (z. B. für Power-Ups wie "fiftyfifty" oder Random Events wie "skipWrong").
 */
export function useDisabledOptions() {
  const [disabledOptions, setDisabledOptions] = useState<string[]>([]);

  const resetDisabled = useCallback(() => setDisabledOptions([]), []);

  const disableRandomWrong = useCallback(
    (questionData: MinimalQuestionData, count: number) => {
      if (!questionData) return;
      const wrongOptions = questionData.options.filter(
        (opt) => opt.short !== questionData.correct,
      );
      const shuffled = [...wrongOptions].sort(() => 0.5 - Math.random());
      const toDisable = shuffled.slice(0, count).map((o) => o.short);
      setDisabledOptions(toDisable);
    },
    [],
  );

  const applyFiftyFifty = useCallback(
    (questionData: MinimalQuestionData | null) => {
      if (!questionData) return;
      disableRandomWrong(questionData, 2);
    },
    [disableRandomWrong],
  );

  const applySkipWrong = useCallback(
    (questionData: MinimalQuestionData | null) => {
      if (!questionData) return;
      disableRandomWrong(questionData, 1);
    },
    [disableRandomWrong],
  );

  const isDisabled = useCallback(
    (key: string) => disabledOptions.includes(key),
    [disabledOptions],
  );

  return {
    disabledOptions,
    isDisabled,
    applyFiftyFifty,
    applySkipWrong,
    resetDisabled,
  };
}
