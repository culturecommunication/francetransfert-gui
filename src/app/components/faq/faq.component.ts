import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'ft-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit, AfterViewInit {

  @ViewChild('faq') private faqFragment: ElementRef;
  @ViewChild('pourquoift') private pourquoiftFragment: ElementRef;
  @ViewChild('usagepersonnel') private usagepersonnelFragment: ElementRef;
  @ViewChild('quedeviennentlesfichiers') private quedeviennentlesfichiersFragment: ElementRef;
  @ViewChild('ouvontlesfichiers') private ouvontlesfichiersFragment: ElementRef;
  @ViewChild('codedeconfirmation') private codedeconfirmationFragment: ElementRef;
  @ViewChild('limitedetaille') private limitedetailleFragment: ElementRef;
  @ViewChild('extensionsdefichiers') private extensionsdefichiersFragment: ElementRef;
  @ViewChild('listededistribution') private listededistributionFragment: ElementRef;
  @ViewChild('questionnairedesatisfaction') private questionnairedesatisfactionFragment: ElementRef;
  @ViewChild('traitementapreslenvoiedesfichiers') private traitementapreslenvoiedesfichiers: ElementRef;
  @ViewChild('tromperDansListDestinataires') private tromperDansListDestinataires: ElementRef;
  @ViewChild('nombreDeTelechargement') private nombreDeTelechargement: ElementRef;
  @ViewChild('ouTrouverDesInfoSurFT') private ouTrouverDesInfoSurFT: ElementRef;
  @ViewChild('utilisationsurmobile') private utilisationsurmobile: ElementRef;
  @ViewChild('deuxfaçondutiliserfrancetransfert') private deuxfaçondutiliserfrancetransfert: ElementRef;

  constructor(private titleService: Title,
    private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('France transfert - FAQ');
  }

  ngAfterViewInit(): void {
    const tree = this.router.parseUrl(this.router.url);
    if (tree.fragment) {
      this.scrollTo(tree.fragment);
    }
  }

  scrollTo(_anchor: string) {
    switch (_anchor) {
      case 'faq':
        this.faqFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'pourquoift':
        this.pourquoiftFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'usagepersonnel':
        this.usagepersonnelFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'deuxfaçondutiliserfrancetransfert':
        this.deuxfaçondutiliserfrancetransfert.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'utilisationsurmobile':
        this.utilisationsurmobile.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'codedeconfirmation':
        this.codedeconfirmationFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'traitementapreslenvoiedesfichiers':
        this.traitementapreslenvoiedesfichiers.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'tromperDansListDestinataires':
        this.tromperDansListDestinataires.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'nombreDeTelechargement':
        this.nombreDeTelechargement.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'quedeviennentlesfichiers':
        this.quedeviennentlesfichiersFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'ouvontlesfichiers':
        this.ouvontlesfichiersFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'limitedetaille':
        this.limitedetailleFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'extensionsdefichiers':
        this.extensionsdefichiersFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'listededistribution':
        this.listededistributionFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'questionnairedesatisfaction':
        this.questionnairedesatisfactionFragment.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
      case 'ouTrouverDesInfoSurFT' :
        this.ouTrouverDesInfoSurFT.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
    }
  }

}
