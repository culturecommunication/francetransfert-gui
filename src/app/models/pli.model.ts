export class PliModel {
  //mails: string;
  //files: Array<String>;
  dateEnvoi: string;
  type: string;
  objet: string;
  taille: any;
  finValidite: string;
  destinataires: Array<String>;
  token: string;
  enclosureId: string;
  typeSize: string;

  /*id: string;
  name: string;
  flowFile: flowjs.FlowFile;
  progress: number;
  error: boolean;
  paused: boolean;
  success: boolean;
  complete: boolean;
  currentSpeed: number;
  averageSpeed: number;
  size: number;
  timeRemaining: number;
  folder?: boolean;
  childs?: Array<any>;
  constructor(name: string, size: number, file: any) {
      this.id = `${Math.floor(Math.random() * Math.floor(100))}-${name}`;
      this.name = name;
      this.progress = 0;
      this.currentSpeed = 0;
      this.averageSpeed = 0;
      this.error = false;
      this.paused = false;
      this.success = false;
      this.size = size;
      this.timeRemaining = 0;
      this.childs = [file];
      this.folder = true;
  }*/
}
