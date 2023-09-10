import {useState} from 'react';
import {useSearchParams} from "react-router-dom";

// ----------------------------------------------------------------------

export default function useTabsNew(defaultValues, state='active') {
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTab, setCurrentTab] = useState(searchParams.get(state) || defaultValues || '');

  return {
    currentTab,
    onChangeTab: (event, newValue) => {
      setSearchParams(state === "subActive" ? `active=${searchParams.get('active')}&subActive=${newValue}` : `active=${newValue}`)
      setCurrentTab(newValue);
    },
    setCurrentTab,
  };
}
