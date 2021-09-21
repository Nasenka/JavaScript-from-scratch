import { LOCALE } from '../constants';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const creationDate = new Date(date);

  return creationDate.toLocaleDateString(LOCALE, options);
}

export default formatDate;
