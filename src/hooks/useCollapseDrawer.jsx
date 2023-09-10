import { useContext } from 'react';
import { CollapseDrawerContext } from '../contexts/CollapseDrawerContext.jsx';

// ----------------------------------------------------------------------

const useCollapseDrawer = () => useContext(CollapseDrawerContext);

export default useCollapseDrawer;
