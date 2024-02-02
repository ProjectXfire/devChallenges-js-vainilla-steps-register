import { Continue, Form, Steps, Summary, Topics } from "./components";

interface Props {
  modal: HTMLDivElement;
  footer: HTMLDivElement;
}

export function initRegister({ modal, footer }: Props) {
  // Add components
  Form.addComponent(modal);
  Topics.addComponent(modal);
  Summary.addComponent(modal);
  Continue.addComponent(modal);
  Steps.addComponent(footer);
  // Init listener for actions
  Form.getInstance().setupListener();
  Continue.getInstance().setupListeners();
  Topics.getInstance().setupListerners();
}
