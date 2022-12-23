import axios from "axios";

const CLIENT_ID =
  "633742412181-mpit53md815fkpjbbrh9i2obs8n92cgk.apps.googleusercontent.com";

function handleCredentialResponse(response) {
  loginURI();
  const urlWithProxy = "http://localhost:5000/oauth";
  const data = {
    user: {
      JWT: response.credential,
      CLIENT_ID: CLIENT_ID,
    },
  };
  axios
    .post(urlWithProxy, data)
    .then((res) => {
      setData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
  // return response.credential, true;
}

function loginURI() {
  var link = document.createElement("a");
  link.href = "http://localhost:8080";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

window.onload = function () {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse,
  });
  google.accounts.id.renderButton(
    document.getElementById("button__GoogleLogin"),
    { theme: "outline", size: "large" } // customization attributes
  );
  google.accounts.id.prompt(); // also display the One Tap dialog
  google.accounts.id.disableAutoSelect();
};

function UserAuthentication() {
  return (
    <div>
      Login:
      <div id="button__GoogleLogin"></div>
    </div>
  );
}

export default UserAuthentication;
