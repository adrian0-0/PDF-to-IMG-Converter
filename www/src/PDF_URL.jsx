import "./styl/pdf_URL.styl";
import "./styl/Base64.styl";
function send_pdfURL() {
  let inp_pdfURL = document.querySelector(".input__pdfUrl").value;
  let inp_selectPDF = document.querySelector(".pdf--none");
  let forms_pdfURL = document.querySelector(".input__pdfUrl");
  let btn_SendDataToAPI = document.querySelector(".button__SendDataToAPI");
  console.log(inp_pdfURL);
  if (inp_pdfURL != "") {
    forms_pdfURL.style = "background: red";
    inp_selectPDF.style = "display: none";
    btn_SendDataToAPI.style = "display: block";
  } else if (inp_pdfURL == "") {
    btn_SendDataToAPI.style = "display: none";
    inp_selectPDF.style = "display: block";
  }

  return inp_pdfURL;
}

function pdf_URL() {
  return (
    <div>
      <iframe name="formSubmitFrame" className="iframe"></iframe>
      <form
        // action="http://localhost:5000/api"
        onChange={send_pdfURL}
        method="POST"
        target="formSubmitFrame"
        className="form__pdfURL"
      >
        <label htmlFor="insert_pdf_url">Insira o link do PDF: </label>
        <input
          name="insert_pdf_url"
          type="url"
          accept="application/pdf, application/vnd.ms-excel"
          className="input__pdfUrl"
        ></input>
      </form>
    </div>
  );
}

export default pdf_URL;
