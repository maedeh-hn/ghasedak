import useTabs from "../../../../hooks/useTabs";
import {Box, Tab, Tabs} from "@mui/material";
import React from "react";
import ReceiveSettings from "./ReceiveSettings";
import StatusSettings from "./StatusSettings";

const LineContextSetting = ({settingData}) => {

    const { currentTab, onChangeTab } = useTabs('receive');

    const PERSON_TABS = [
        {
            value: 'receive',
            label: 'تنظیمات دریافت',
        },
        {
            value: 'status',
            label: 'تنظیمات دریافت وضعیت',
        },
    ];

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
                  <Tab disableRipple key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
              ))}
          </Tabs>
          {currentTab === 'receive' ? (
              <ReceiveSettings data={settingData} />
          ) : (
              <StatusSettings data={settingData} />
          )}
      </>
  )
}

export default LineContextSetting