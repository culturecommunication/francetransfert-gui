import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LanguageModel } from 'src/app/models';
import { LanguageSelectionService } from 'src/app/services';


@Component({
  selector: 'ft-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  encapsulation: ViewEncapsulation.None

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



  languageList: LanguageModel[];
  languageSelectionSubscription: Subscription;
  currentLanguage: string;
  language: LanguageModel;
  langueCode: string;
  panelOpenState = false;


  constructor(private titleService: Title,
    private router: Router,
    private translateService: TranslateService,
    private languageSelectionService: LanguageSelectionService,
    ) {
      this.currentLanguage = this.translateService.currentLang;
      console.log('currentLanguage:', this.currentLanguage)
      // this.languageList = this.languageSelectionService.languageList;
      // this.language =  this.languageList.find(x => x.value == this.currentLanguage);
      // this.langueCode = this.language.code;
      // console.log('current lang:', this.language)
      // console.log('browser lang', this.language.code);
     }

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
      case 'ouTrouverDesInfoSurFT':
        this.ouTrouverDesInfoSurFT.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
        break;
    }
  }

}
