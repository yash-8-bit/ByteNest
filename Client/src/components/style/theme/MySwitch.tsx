import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
function MySwitch({ change }: { change: () => void }) {
    return (
        <label className="swap swap-rotate">
            <input type="checkbox" className="theme-controller" onClick={change} />
            <LightModeIcon className="swap-on text-amber-400 h-10 w-10 fill-current" />
            <DarkModeIcon className="swap-off text-slate-600 h-10 w-10 fill-current" />

        </label>
    )
}

export default MySwitch