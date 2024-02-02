export class Register {
  private static instance: Register;

  private step: number = 1;
  private name: string = "";
  private email: string = "";
  private topics: string[] = [];

  public static getInstance() {
    if (!Register.instance) {
      Register.instance = new Register();
    }
    return Register.instance;
  }

  nextStep(): void {
    if (this.step > 2) {
      this.step = 1;
    } else {
      this.step = this.step + 1;
    }
  }

  set setName(name: string) {
    this.name = name;
  }

  set setEmail(email: string) {
    this.email = email;
  }

  set setTopic(topic: string) {
    this.topics.push(topic);
  }

  removeTopic(topic: string): void {
    this.topics = this.topics.filter((item) => item !== topic);
  }

  getFormValues(): { name: string; email: string } {
    return { name: this.name, email: this.email };
  }

  getTopics(): string[] {
    return this.topics;
  }

  getCurrentStep(): number {
    return this.step;
  }

  cleanData() {
    this.name = "";
    this.email = "";
    this.topics = [];
  }
}
