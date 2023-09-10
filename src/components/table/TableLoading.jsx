// // @mui
// import {TableRow, TableCell, LinearProgress} from '@mui/material';
//
// // ----------------------------------------------------------------------
//
// export default function TableLoading({count}) {
//     return (
//         <TableRow>
//             <TableCell colSpan={count}>
//                 <LinearProgress/>
//             </TableCell>
//         </TableRow>
//     );
// }


// @mui
import {TableRow, TableCell, LinearProgress, Skeleton} from '@mui/material';

// ----------------------------------------------------------------------

export default function TableLoading({count, rows=1, ...other}) {
    return Array.from(Array(parseInt(rows)).keys()).map(item =>
        <TableRow {...other}>
            {
                Array.from(Array(count).keys()).map((item) => (
                    <TableCell>
                        <Skeleton variant="text" width={130} height={30}/>
                    </TableCell>
                ))
            }
        </TableRow>
    );
}
