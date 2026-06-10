import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';

export default function MyBottomNavigation() {
  const navigate = useNavigate();
  const width = window.innerWidth;
   const pathname = window.location.pathname;
  if(width>=700) return null;

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={pathname}
      >
        <BottomNavigationAction value={"/home"} onClick={()=> navigate('/home')} label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction value={"/upload-file"} onClick={()=> navigate('/upload-file')} label="Uplaod File" icon={<UploadFileIcon />} />
        <BottomNavigationAction
        value={"/account"}
        onClick={()=> navigate('/account')}
        label="Account" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Paper>
  );
}
