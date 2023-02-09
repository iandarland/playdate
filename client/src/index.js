import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { Auth0Provider } from "@auth0/auth0-react";
import './index.css'

ReactDOM.render(

  <Auth0Provider
    domain="dev-qvymre8c27oqhfyw.us.auth0.com"
    clientId="5ieyZMyV6FNyB4sKNbTygU8S9lJRQD2w"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);


