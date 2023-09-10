import { useState } from 'react';
import {useSearchParams} from "react-router-dom";

// ----------------------------------------------------------------------

export default function useTabs(defaultValues) {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTab, setCurrentTab] = useState(searchParams.get('active') || defaultValues || '');

  return {
    currentTab,
    onChangeTab: (event, newValue) => {
      setSearchParams(`active=${newValue}`)
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
