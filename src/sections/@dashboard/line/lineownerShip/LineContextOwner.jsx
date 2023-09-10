import useTabs from "../../../../hooks/useTabs";
import {Box, Tab, Tabs} from "@mui/material";
import RealPersonForm from "./RealPersonForm";
import LegalPersonForm from "./LegalPersonForm";
import React from "react";

const LineContextOwner = ({line}) => {

    const {currentTab, onChangeTab} = useTabs(line?.legalType == -1 ? 'real' : line?.legalType == 0 ? 'real' : 'legal');

    const PERSON_TABS = [
        {
            value: 'real',
            label: 'حقیقی',
        },
        {
            value: 'legal',
            label: 'حقوقی',
        },
    ];

    if (line?.legalType == 0) {
        PERSON_TABS.splice(1, 1)
    } else if(line?.legalType == 1) {
        PERSON_TABS.splice(0, 1)
    }
  return(
      <>
          <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
          >
              {PERSON_TABS.map((tab) => (
                  tab &&
                  <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value}/>
              ))}
          </Tabs>

          <Box sx={{mb: 5}}/>
          {currentTab === 'real' ? <RealPersonForm line={line} /> : <LegalPersonForm line={line} />}
      </>
  )
}

export default LineContextOwner