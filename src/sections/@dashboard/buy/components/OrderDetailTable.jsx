import {Table, TableBody, TableContainer} from "@mui/material";
import {TableHeadCustom} from "../../../../components/table";
import PayForBuyPlanTableRow from "../pay/PayForBuyPlanRow";
import Scrollbar from "../../../../components/Scrollbar";

const OrderDetailTable = ({tableHead, data}) => {
    return (
        <Scrollbar>
            <TableContainer sx={{minWidth: 800, position: 'relative'}}>
                <Table>
                    <TableHeadCustom headLabel={tableHead}/>
                    <TableBody>
                        <PayForBuyPlanTableRow
                            row={data}
                        />
                    </TableBody>
                </Table>
            </TableContainer>
        </Scrollbar>
    )
}

export default OrderDetailTable