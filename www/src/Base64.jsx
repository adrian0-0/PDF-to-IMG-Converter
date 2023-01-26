import axios from "axios";
import { useEffect, useState } from "react";
import { forms_pdf_opts } from "./Select_PDF_options";
import { rangeValue } from "./DPI_Range.jsx";
import DPI_Range from "./DPI_Range";
import Select_PDF_options from "./Select_PDF_options";
import "./styl/loading-spinner.styl";
import "./styl/Base64.styl";
import "./styl/Select_PDF_options.styl";
// import { send_pdfURL } from "./PDF_URL";

function send_pdfURL() {
  let inp_pdfURL = document.querySelector(".input__pdfUrl").value;
  console.log(inp_pdfURL);
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
    // const btn_disable = document.querySelector(".button__disabled");
    const pdf_local = document.getElementById("PDF_local");
    const pdf_link = document.getElementById("PDF_link");

    const select_pdf = document.getElementById("select__pdf");
    select_pdf.classList.remove("selectPDF--enable");
    const spinner = document.querySelector(".spinner");
    const pdf_select = document.querySelector(".pdf--file");
    pdf_select.style = "display: none";
    spinner.style = "display: flex";
    pdf_local.disabled = true;
    pdf_link.disabled = true;

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
        select_pdf.classList.add("selectPDF--enable");
        pdf_select.style = "display: block";
        pdf_local.disabled = false;
        pdf_link.disabled = false;
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
      <div className="form__PDFcontainer">
        <iframe name="formSubmitFrame " className="iframe"></iframe>
        <form
          // action="http://localhost:5000/api"
          onChange={send_pdfURL}
          target="formSubmitFrame"
          className="form__pdfURL selectPDF selectPDF--disable"
          id="forms__insertURL"
        >
          <label htmlFor="insert_pdf_url">
            <span className="label__insertPDF_URL">Insira o link do PDF: </span>
          </label>
          <input
            name="insert_pdf_url"
            type="url"
            id="input_insert_url"
            accept="application/pdf, application/vnd.ms-excel"
            className="input__pdfUrl form-control "
          ></input>
          <button
            type="button"
            target="self"
            onClick={({ target }) => getData(target.value)}
            className="button  button__SendDataToAPI  pdf--file button__standards"
          >
            Enviar
          </button>
        </form>
      </div>
      <div className="main__convert-opts">
        <h2>Opções de conversão</h2>
        <Select_PDF_options></Select_PDF_options>
        <DPI_Range></DPI_Range>
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
          <div className="selectPDF selectPDF--disable" id="select__pdf">
            <label
              htmlFor="select-pdf"
              className="input pdf--file pdf--none button__standards"
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
          </div>
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
