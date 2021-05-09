import values from 'lodash/values';

import * as eventListener from './eventListener';

export default [
    ...values(eventListener)
];