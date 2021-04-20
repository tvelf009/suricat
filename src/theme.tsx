import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'


const fonts = {
//   mono: `'Menlo', monospace`,
  body: `'Roboto', sans-serif;`,
}

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const components = {
  Button: {
    variants: {
      "cus-menu":{
        fontFamily: 'Montserrat-Regular',
        fontWeight: 500
      },
      "cus-call": {
        fontFamily: 'Montserrat-Regular',
        fontWeight: 500,
        bg: "#28467F",
        color: "#fff"
      }
    }
  },
  Tabs: {
    variants: {
      "cus-tabs-block": {
        tab: {
          ml: "2%",
          mr: "2%",
          border: "1px solid #D7DEE9",
          background: "#FFF",
          color: "#000",
          fontWeight: 500,
          fontSize: "1.5vmin",
          borderRadius: "2px",
          w: "50px",
          _selected: {
            background: "#e2a253",
          }
        }
      }
    }
  }
}

const theme = extendTheme({
  styles: {
    global: (props) => ({
      "html, body": {
        backgroundColor: "#f1f4f6"
      }
    })
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
  components,
  textStyles:{
    title: {
      fontSize: ["16px"],
      fontFamily: `'Montserrat-Regular', sans-serif`,
      color: "#fff"
    }
  }
})

export default theme