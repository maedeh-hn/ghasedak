import React from "react";
import ErrorBoundary from "./ErrorHandler";
import {Container} from "@mui/material";


const CustomContainer = ({children, ...other}) => {
  return(
      <ErrorBoundary>
          <Container {...other}>
              {children}
          </Container>
      </ErrorBoundary>
  )
}

export default CustomContainer
