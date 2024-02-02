import "./style.css";
import { initRegister } from "./initRegister.ts";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <main class="modal-container">
      <section id="modal" class="modal"></section>
      <footer id="steps" class="steps-container"></footer>
    </main>
`;

initRegister({
  modal: document.querySelector<HTMLDivElement>("#modal")!,
  footer: document.querySelector<HTMLDivElement>("#steps")!,
});
