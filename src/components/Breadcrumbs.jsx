import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
// @mui
import {Box, Link, Typography, Breadcrumbs as MUIBreadcrumbs} from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import {useTheme} from "@mui/material/styles";
// ----------------------------------------------------------------------

Breadcrumbs.propTypes = {
    activeLast: PropTypes.bool,
    links: PropTypes.array.isRequired,
};

export default function Breadcrumbs({links, activeLast = false, ...other}) {
    const currentLink = links[links.length - 1].name;

    const theme = useTheme();

    const listDefault = links.map((link) => <LinkItem key={link.name} link={link}/>);

    const listActiveLast = links.map((link) => (
        <div key={link.name}>
            {link.name !== currentLink ? (
                <LinkItem link={link}/>
            ) : (
                <Typography
                    sx={{
                        maxWidth: 260,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        // color: 'text.disabled',
                        textOverflow: 'ellipsis',
                        fontSize: '12px'
                    }}
                >
                    {currentLink}
                </Typography>
            )}
        </div>
    ));

    return (
        <MUIBreadcrumbs
            separator={<NavigateBeforeIcon fontSize="small" sx={{
                fill: theme.palette.primary.main
            }}/>}
            {...other}
        >
            {activeLast ? listDefault : listActiveLast}
        </MUIBreadcrumbs>
    );
}

// ----------------------------------------------------------------------

LinkItem.propTypes = {
    link: PropTypes.shape({
        href: PropTypes.string,
        icon: PropTypes.any,
        name: PropTypes.string,
    }),
};

function LinkItem({link}) {
    const {href, name, icon} = link;
    return (
        <Link
            key={name}
            component={RouterLink}
            to={href || '#'}
            sx={{
                lineHeight: 2,
                display: 'flex',
                alignItems: 'center',
                color: 'text.primary',
                '& > div': {display: 'inherit'},
                fontSize: '12px'
            }}
        >
            {icon && <Box sx={{mr: 1, '& svg': {width: 20, height: 20}}}>{icon}</Box>}
            {name}
        </Link>
    );
}
