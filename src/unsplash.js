import Unsplash from 'unsplash-js';

const unsplash = new Unsplash({
  accessKey: 'PGsLvvzqF5PvrFQT_RaZiIyfYuR-gQa5Dcbc6gXP-jI',
  secret: 'bZUhKtmQFvnzf8YPCJNZhS0e847ZeeG1Ldz6xU81PB8',
  callbackUrl: 'urn:ietf:wg:oauth:2.0:oob',
  bearerToken: localStorage.getItem('bearerToken'),
});

export default unsplash;
