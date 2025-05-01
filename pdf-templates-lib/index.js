import { generateTemplate1 } from "./core/templates/template1.js";
import { generateTemplate2 } from "./core/templates/template2.js";
import { generateTemplate3 } from "./core/templates/template3.js";
import { generateTemplate4 } from "./core/templates/template4.js";
export function generatePdf(templateId, data) {
  switch (templateId) {
    case 1:
    case "template1":
      generateTemplate1(data);
      break;
    case 2:
    case "template2":
      generateTemplate2(data);
      break;
    case 3:
    case "template3":
      generateTemplate3(data);
      break;
    case 4:
    case "template4":
      generateTemplate4(data);
      break;
    default:
      throw new Error("Unknown template");
  }
}
