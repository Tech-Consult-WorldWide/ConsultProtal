import solace from "solace";

export const createSolaceSession = () => {
  const session = solace.SolclientFactory.createSession({
    url: process.env.REACT_APP_SOLACE_URL,
    vpnName: process.env.REACT_APP_SOLACE_VPN,
    userName: process.env.REACT_APP_SOLACE_USERNAME,
    password: process.env.REACT_APP_SOLACE_PASSWORD,
  });

  session.connect();
  return session;
};