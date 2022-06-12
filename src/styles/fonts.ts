import { css } from 'styled-components'

import gilroyExtraBoldWoff from '~/assets/fonts/Gilroy-ExtraBold.woff'
import gilroyExtraBoldWoff2 from '~/assets/fonts/Gilroy-ExtraBold.woff2'
import gilroyLightEot from '~/assets/fonts/Gilroy-Light.eot'
import gilroyLightWoff from '~/assets/fonts/Gilroy-Light.woff'
import gilroyLightWoff2 from '~/assets/fonts/Gilroy-Light.woff2'

export const gilroyCss = css`
  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Light'), url('${gilroyLightWoff2}') format('woff2'), url('${gilroyLightWoff}') format('woff'),
      url('${gilroyLightEot}?#iefix') format('embedded-opentype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Gilroy';
    src: local('Gilroy Extrabold'), url('${gilroyExtraBoldWoff2}') format('woff2'), url('${gilroyExtraBoldWoff}') format('woff');
    font-weight: bold;
    font-style: normal;
  }
`
