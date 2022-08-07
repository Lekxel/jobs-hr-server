import OAuthServer from "oauth2-server";
import model from "./models";

const oauth = new OAuthServer({
  // @ts-ignore
  model: model,
  accessTokenLifetime: 24 * 60 * 60,
  requireClientAuthentication: false,
});

export default oauth;
