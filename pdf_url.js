import fs from "fs";
import http from "https";

const file = fs.createWriteStream("file.pdf");
const request = http.get(
  "https://www.researchgate.net/profile/Jean-Pierre-Minier/publication/222683134_The_PDF_approach_to_turbulent_polydispersed_two-phase_flows/links/59e76243aca272e940e0a58f/The-PDF-approach-to-turbulent-polydispersed-two-phase-flows.pdf",
  function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  }
);
