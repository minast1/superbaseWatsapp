import { extendTheme } from "native-base";
import { getPixelSizeForLayoutSize } from "react-native/Libraries/Utilities/PixelRatio";

const theme = extendTheme({

    components: {
        Button: {
            variants: {
                rounded: ({ colorScheme }) => {
                    return {
                        bg: `${colorScheme}.300`,
                         rounded: 'full'
                    }
                }
            }

        },
        Avatar : {
            defaultProps : {
                size : 10
            }
        }
    }
})

export default theme