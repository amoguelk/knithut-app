import { useState, useEffect } from 'react';

const useWip = (wips, setWips, wipId) => {
  const [pattern, setPattern] = useState(null);

  const handleSetPattern = (newPattern) => {
    const wipsCopy = { ...wips };
    wipsCopy[wipId].pattern = newPattern;
    setWips(wipsCopy);
  };

  useEffect(() => {
    setPattern(wips?.[wipId]?.pattern ?? null);
  }, [wips, wipId]);

  return { pattern, handleSetPattern };
};

export default useWip;
