import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

// ----------------------------------------------------------------------

export default function TreeView(theme) {
  return {
    MuiTreeView: {
      defaultProps: {
        defaultCollapseIcon: <ExpandLess />,
        defaultExpandIcon: <ExpandMore/>,
        defaultEndIcon: <ChevronLeft color={'disabled'} />,
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: { ...theme.typography.body2 },
        iconContainer: { width: 'auto' },
        group: {
          marginLeft: '32px'
        }
      },
    },
  };
}
