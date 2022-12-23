import React from "react";
import InputMask from "react-input-mask";
import "./styl/Select_PDF_options.styl";
import "./styl/app.styl";
import "./styl/Base64.styl";

function forms_pdf_opts() {
  const select_extension = document.querySelector(
    ".select__pdf-extension"
  ).value;
  const select_dimension = document.querySelector(
    ".select__pdf-dimension"
  ).value;

  const select_pdf = document.getElementById("select__pdf");
  const forms_insertURL = document.getElementById("forms__insertURL");
  const input_insert_url = document.getElementById("input_insert_url");
  let pdf_link = document.getElementById("PDF_link").checked;
  let pdf_local = document.getElementById("PDF_local").checked;

  if (pdf_local) {
    select_pdf.classList.add("selectPDF--enable");
    select_pdf.classList.remove("selectPDF--disable");
    forms_insertURL.classList.remove("selectPDF--enable");
    forms_insertURL.classList.remove("selectPDF--disable");
    input_insert_url.value = "";
  } else if (pdf_link) {
    forms_insertURL.classList.add("selectPDF--enable");
    forms_insertURL.classList.remove("selectPDF--disable");
    select_pdf.classList.remove("selectPDF--enable");
    select_pdf.classList.remove("selectPDF--disable");
  }

  console.log(pdf_link);

  const pdf_data_opts = {
    opts: {
      select_extension: select_extension,
      select_dimension: select_dimension.split(","),
      pdf_link: pdf_link,
      pdf_local: pdf_local,
    },
  };
  return pdf_data_opts;
}

export { forms_pdf_opts };

function select_PDF_options() {
  const cabana = [2166, 3150];
  const emporio = [1860, 3361];

  return (
    <div className="select__container">
      <form onChange={forms_pdf_opts}>
        <div className="block__pdf-opts">
          <div className="button__typeofConversion">
            <p>*Selecione por onde você enviara o PDF</p>
            <div>
              <input
                type="radio"
                id="PDF_local"
                className="button__disabled"
                name="input__radioPDF"
              />
              <label htmlFor="PDF_local">PDF já armazenado</label>
            </div>
            <div>
              <input
                type="radio"
                id="PDF_link"
                className="button__disabled"
                name="input__radioPDF"
              />
              <label htmlFor="PDF_link">Link do PDF</label>
            </div>
          </div>
          <div className="select__extension">
            <label htmlFor="extensão">
              <div className="label label__pdf-opts">
                Selecione um formato de imagem:
              </div>
            </label>
            <select
              className="select select--size select__pdf-opts select__pdf-extension form-select form-select-lg"
              aria-label=".form-select-lg example"
              size="1"
              name="extensão"
              placeholder="Selecione o formato da imagem"
            >
              <option value="jpeg">JPG</option>
              <option value="png">PNG</option>
            </select>
          </div>
        </div>

        <div className="block__pdf-opts">
          <label htmlFor="extensão">
            <div className="label label__pdf-opts">
              Selecione as dimensões da imagem a ser gerada:
            </div>
          </label>
          <select
            className="select select--size select__pdf-opts select__pdf-dimension form-select form-select-lg"
            aria-label=".form-select-lg example"
            size="1"
            name="extensão"
          >
            <option value={cabana}>Cliente 1: 2166 × 3150</option>
            <option value={emporio}>Cliente 2: 1860 x 3361</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default select_PDF_options;
