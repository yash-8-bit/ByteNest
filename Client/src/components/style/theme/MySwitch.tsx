import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useContext } from 'react';
import { ThemeContext } from '../../../Context/Theme';
function MySwitch() {
    const context = useContext(ThemeContext);
    return (
        <span onClick={context.ChangeTheme}>
            {context.Theme === "light"?   <DarkModeIcon className="swap-off text-slate-600 h-10 w-10 fill-current" /> :
            <LightModeIcon className="swap-on text-amber-400 h-10 w-10 fill-current" />
          }
        </span>
    )
}

export default MySwitch