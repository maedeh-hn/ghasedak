import {Card} from "@mui/material";

const CustomCard = ({children, style, p = 20}) => {
    return (
        <Card
            style={{
                padding: p,
                ...style
            }}
        >
            {children}
        </Card>
    )
}

export default CustomCard
