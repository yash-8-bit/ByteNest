import { createTheme, ThemeProvider,  } from '@mui/material/styles'
import { useContext, type PropsWithChildren } from 'react'
import { WebappContext } from '../Context/Webapp'
function Mythemeprovider(props : PropsWithChildren) {
  const theme = useContext(WebappContext);
  const theme_ = createTheme({
  palette: {
    mode: theme.Theme,
  },
});
  return (
    < ThemeProvider theme={theme_}>
      {props.children}
    </ThemeProvider>
  )
}

export default Mythemeprovider