import React from "react";
import {Card, Stack, Typography} from "@mui/material";

const ProSettingCard = ({description, children}) => (
      <Card>
          <Stack spacing={2} padding={2}>
              {children}
          </Stack>
      </Card>
  )

export default ProSettingCard;