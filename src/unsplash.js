import Unsplash from 'unsplash-js';

import { BEARERTOKENKEY } from './constants';

const unsplash = new Unsplash({
  accessKey: 'PGsLvvzqF5PvrFQT_RaZiIyfYuR-gQa5Dcbc6gXP-jI',
  secret: 'bZUhKtmQFvnzf8YPCJNZhS0e847ZeeG1Ldz6xU81PB8',
  callbackUrl:
    process.env.NODE_ENV === 'development'
      ? 'urn:ietf:wg:oauth:2.0:oob'
      : 'http://javascript.syrenko.ru/',
  bearerToken: localStorage.getItem(BEARERTOKENKEY),
});

export default unsplash;
