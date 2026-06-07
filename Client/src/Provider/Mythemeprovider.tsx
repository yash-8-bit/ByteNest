import { createTheme, ThemeProvider,  } from '@mui/material/styles'
import { useContext, type PropsWithChildren } from 'react'
import { ThemeContext } from '../Context/Theme'
function Mythemeprovider(props : PropsWithChildren) {
  const theme = useContext(ThemeContext);
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