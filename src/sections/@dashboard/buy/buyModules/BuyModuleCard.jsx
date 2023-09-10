
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, CardActions, CardContent, Stack, Typography, colors, useTheme } from '@mui/material'
import React from 'react'


const BuyModuleCard = ({title,description,price,handleBuyModule,idModule,typeModule}) => {
    const theme = useTheme();

  return (
    <Box sx={{display:"flex",padding:10}}>
    <Card sx={{ maxWidth: 350,direction:"ltr" }}>
<CardContent>
<Typography sx={{ fontSize: "h4" ,fontWeight:700}} color="text.black" gutterBottom>
{title}
</Typography>

{/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
adjective
</Typography> */}
<Typography variant="body2" sx={{fontSize:15}}>
{description}

</Typography>
<Box sx={{display:"flex",alignItems:"center", justifyContent:"space-between",marginTop:3}} >
<Typography sx={{color:theme.palette.primary.main}}>{price?.toLocaleString()} ریال  </Typography>
<CardActions>
<Stack spacing={3} alignItems="flex-end" sx={{ color: 'white'}}>
                    <LoadingButton  variant="contained" sx={{paddingX:4}} onClick={()=>{handleBuyModule(idModule,typeModule)}}>
                  خرید
                    </LoadingButton>
                </Stack>

</CardActions>
</Box>
</CardContent>

</Card>
</Box>
  )
}

export default BuyModuleCard