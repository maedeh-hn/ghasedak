import {Helmet} from 'react-helmet-async';
import {forwardRef, ReactNode} from 'react';
import {Box} from '@mui/material';


interface Props {
    children: ReactNode;
    title: string;
    meta: any;
    other?: object;
}

export type Ref = HTMLButtonElement;

const Page = forwardRef<Ref, Props>(({children, title = '', meta, ...other}, ref) => (
    <>
        <Helmet>
            <title>{`${title} | قاصدک`}</title>
            {meta}
        </Helmet>

        <Box style={{
            height:  `calc(100vh - 130px)`,
            position: 'relative'
        }} ref={ref} {...other}>
            {children || <></>}
        </Box>
    </>
));

export default Page;
