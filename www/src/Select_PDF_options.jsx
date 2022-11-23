import React from "react";
import InputMask from "react-input-mask";
import "./styl/Select_PDF_options.styl";
import "./styl/app.styl";

function forms_pdf_opts() {
  const select_extension = document.querySelector(
    ".select__pdf-extension"
  ).value;
  const select_dimension = document.querySelector(
    ".select__pdf-dimension"
  ).value;

  const pdf_data_opts = {
    opts: {
      select_extension: select_extension,
      select_dimension: select_dimension.split(","),
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
            <option value={cabana}>Cabana: 2166 × 3150</option>
            <option value={emporio}>Emporio: 1860 x 3361</option>
          </select>
        </div>
      </form>
    </div>
  );
}

export default select_PDF_options;
