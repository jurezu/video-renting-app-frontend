import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://0f17bfc4fa21448c980104856179a190@sentry.io/1824024"
  });
}
function log(error) {
  //just to test
  console.log(error);
  Sentry.captureException(error);
}

export default {
  init,
  log
};
