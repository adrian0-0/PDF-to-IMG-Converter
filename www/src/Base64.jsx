import axios from "axios";
import { useEffect, useState } from "react";
import { forms_pdf_opts } from "./Select_PDF_options";
import { rangeValue } from "./DPI_Range.jsx";
import DPI_Range from "./DPI_Range";
import Select_PDF_options from "./Select_PDF_options";
import "./styl/loading-spinner.styl";
import "./styl/Base64.styl";

function send_pdfURL() {
  let buttonSendURL = document.getElementById("button__sendURL");
  let buttonSelectPDF = document.getElementById("button__selectPDF");
  let inp_pdfURL = document.querySelector(".input__pdfUrl").value;
  if (inp_pdfURL != "") {
    buttonSendURL.classList.add("button--visible");
    buttonSelectPDF.classList.add("button--none");
  } else if (inp_pdfURL == "") {
    buttonSelectPDF.classList.remove("button--none");
    buttonSendURL.classList.remove("button--visible");
  }

  return inp_pdfURL;
}

function Base64() {
  const [data, setData] = useState();
  function downloadURI(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function post(
    base64PDF,
    pdfName,
    rangeValue,
    pdf_data_opts,
    pdf_url,
    pdf_is_stored_locally_boolean
  ) {
    console.log("post_init");
    const spinner = document.querySelector(".spinner");
    let buttonSendURL = document.getElementById("button__sendURL");
    let buttonSelectPDF = document.getElementById("button__selectPDF");
    buttonSendURL.classList.add("button--none");
    buttonSendURL.classList.remove("button--visible");
    buttonSelectPDF.classList.add("button--none");
    buttonSelectPDF.classList.remove("button--visible");
    // const pdf_select = document.querySelector(".button--none");
    // pdf_select.style = "display: none";
    spinner.style = "display: flex";

    const urlWithProxy = "/api";
    const data = {
      user: {
        email: "teste@gmail.com",
        password: "12345",
        base64: base64PDF,
        pdfName: pdfName,
        rangeValue: rangeValue,
        select_extension: pdf_data_opts.opts.select_extension,
        select_dimension: pdf_data_opts.opts.select_dimension,
        pdf_url: pdf_url,
        pdf_is_stored_locally_boolean: pdf_is_stored_locally_boolean,
      },
    };
    axios
      .post(urlWithProxy, data)
      .then((res) => {
        console.log("init axios");
        setData(res.data);
        downloadURI("http://localhost:5000", pdfName);
        spinner.style = "display: none";
        buttonSelectPDF.classList.add("button--visible");
        buttonSendURL.classList.add("button--visible");

        // pdf_select.style = "display: block";
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const getData = (target) => {
    // console.log(send_pdfURL());

    previewFile();
    function previewFile() {
      console.log("init_previewFile");
      const preview = document.querySelector(".pdf--preview");
      const file = document.querySelector("input[type=file]").files[0];
      const reader = new FileReader();
      let base64PDF;
      let pdfName;
      send_pdfURL() == ""
        ? getBase64()
        : post(
            base64PDF,
            pdfName,
            rangeValue(),
            forms_pdf_opts(),
            send_pdfURL(),
            false
          );
      function getBase64() {
        reader.addEventListener(
          "load",
          () => {
            preview.src = reader.result;
          },
          false
        );

        if (file) {
          reader.readAsDataURL(file);
        }

        reader.onload = function (e) {
          let base64PDF = reader.result;
          let pdfName = file.name;
          post(
            base64PDF,
            pdfName,
            rangeValue(),
            forms_pdf_opts(),
            send_pdfURL(),
            true
          );
        };
      }
    }
  };

  return (
    <div>
      <div className="main__convert-opts">
        <h2>Opções de conversão</h2>
        <DPI_Range></DPI_Range>
        <Select_PDF_options></Select_PDF_options>
        <div className="form__PDFcontainer">
          <iframe name="formSubmitFrame" className="iframe"></iframe>
          <form
            // action="http://localhost:5000/api"
            onChange={send_pdfURL}
            target="formSubmitFrame"
            className="form__pdfURL"
          >
            <label htmlFor="insert_pdf_url">
              <span className="label__insertPDF_URL">
                Insira o link do PDF:{" "}
              </span>
            </label>
            <input
              name="insert_pdf_url"
              type="url"
              accept="application/pdf, application/vnd.ms-excel"
              className="input__pdfUrl form-control"
            ></input>
            <button
              type="submit"
              target="self"
              onClick={({ target }) => getData(target.value)}
              id="button__sendURL"
              className="button  button__SendDataToAPI button__SendDataToAPI--init pdf--file "
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
      <div className="main__pdf">
        <div className="main__pdf--submit">
          <div className="spinner">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <label
            htmlFor="select-pdf"
            id="button__selectPDF"
            className="input pdf--file pdf--none"
          >
            <span>Selecione</span>
          </label>
          <input
            id="select-pdf"
            name="select-pdf"
            type="file"
            accept="application/pdf, application/vnd.ms-excel"
            className="input__SelecionePDF"
            onChange={({ target }) => getData(target.value)}
          />
          <img src="" className="pdf--preview" />
          <p hidden className="pdf--zip">
            data : {data}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Base64;
