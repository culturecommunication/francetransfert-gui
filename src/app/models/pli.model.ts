/*
  * Copyright (c) Ministère de la Culture (2022)
  *
  * SPDX-License-Identifier: MIT
  * License-Filename: LICENSE.txt
  */

export class PliModel {

  dateEnvoi: string;
  type: string;
  objet: string;
  taille: any;
  typeSize: string;
  finValidite: string;
  destinataires?: Array<String>;
  enclosureId: string;
}
