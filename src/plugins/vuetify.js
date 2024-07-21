// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

const lightTheme = {
    dark: false,
    colors: {
        primary: '#27374D',
        secondary: '#526D82',
        accent: '#B43F3F',
        error: '#FF5252',
        info: '#DDE6ED',
        success: '#4CAF50',
        warning: '#FFC107'
    },
}

const darkTheme = {
    dark: true,
    colors: {
        primary: '#92C7CF',
        secondary: '#AAD7D9',
        accent: '#B43F3F',
        error: '#FF5252',
        info: '#FBF9F1',
        success: '#4CAF50',
        warning: '#FFC107'
    },
}
export default createVuetify(
    {
        theme: {
            defaultTheme: 'darkTheme',
            themes: {
                lightTheme,
                darkTheme
            },
        },
    }
)
