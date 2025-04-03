import { useState, useEffect } from 'react';

const useWip = (wips, setWips, wipId) => {
  const [pattern, setPattern] = useState(null);
  const [stopwatch, setStopwatch] = useState(null);

  const handleSetPattern = (newPattern) => {
    const wipsCopy = { ...wips };
    wipsCopy[wipId].pattern = newPattern;
    setWips(wipsCopy);
  };

  const handleSetStopwatch = (newStopwatch) => {
    const wipsCopy = { ...wips };
    wipsCopy[wipId].stopwatch = newStopwatch;
    setWips(wipsCopy);
  };

  const handleDeleteWip = () => {
    const wipsCopy = { ...wips };
    delete wipsCopy[wipId];
    setWips(wipsCopy);
  };

  useEffect(() => {
    setPattern(wips?.[wipId]?.pattern ?? null);
    setStopwatch(wips?.[wipId]?.stopwatch ?? null);
  }, [wips, wipId]);

  return {
    pattern,
    handleSetPattern,
    stopwatch,
    handleSetStopwatch,
    handleDeleteWip,
  };
};

export default useWip;
