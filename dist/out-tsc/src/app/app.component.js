import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
// import translation service from ngx-translate
/*
import {TranslateService} from '@ngx-translate/core'; */
let AppComponent = class AppComponent {
    // detect current browser language
    constructor(translate, auth) {
        this.translate = translate;
        this.auth = auth;
        this.title = 'adafri';
        this.auth.getAuth().idToken.subscribe(token => {
            console.log(token);
        });
        this.auth.getAuth().authState.subscribe(data => {
            console.log(data.refreshToken);
            console.log(data);
        });
        translate.addLangs(['en', 'fr']);
        if (localStorage.getItem('locale')) {
            const browserLang = localStorage.getItem('locale');
            translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
        }
        else {
            localStorage.setItem('locale', 'fr');
            translate.setDefaultLang('fr');
        }
        if (this.translate.store.currentLang === "fr") {
            L10n.load({
                'fr': {
                    'daterangepicker': {
                        placeholder: 'Choisissez les dates de votre campagne',
                        today: "Aujourd'hui",
                        startLabel: 'Date de début',
                        endLabel: 'Date de fin',
                        applyText: 'Appliquer',
                        cancelText: 'Annuler',
                        selectedDays: 'Jours sélectionnés',
                        days: 'Jours',
                        customRange: ''
                    },
                    grid: {
                        EmptyRecord: 'Aucune campagne trouvée',
                        Add: 'Ajouter',
                        Edit: "Modifier",
                        Delete: "Supprimer",
                        Update: "Enregistrer",
                        Cancel: "Annuler",
                        Search: "Rechercher",
                        GroupDropArea: "Faites glisser une en-tête de colonne ici pour regrouper sa colonne",
                        UnGroup: "Ciquez ici pour enlever le groupe",
                        Columnchooser: "Colonne",
                        Item: "element",
                        Items: "elements",
                        EditOperationAlert: "Aucune campagne sélectionnée",
                        DeleteOperationAlert: "Aucune campagne sélectionnée",
                        SaveButton: "Sauvegarder",
                        CancelButton: "Annuler",
                        EditFormTitle: "Modifier la campagne",
                        ConfirmDelete: "Vous êtes sûr de vouloir supprimer cette campagne ?",
                        CancelEdit: "Vous êtes sûr d'annuler ces changements ?",
                        ChooseColumns: "Choisir une colonne",
                        SearchColumns: "Rechercher une colonne",
                        Matchs: "Aucune correspondance trouvée",
                        Group: "Regrouper par cette colonne",
                        Ungroup: "Dissocier par cette colonne",
                        autoFitAll: "Ajustement automatique de toutes les colonnes",
                        autoFit: "Ajuster automatiquement cette colonne",
                        FirstPage: "Première page",
                        LastPage: "Dernière page",
                        All: "Tout",
                        SortAscending: "Trier par ordre croissant",
                        SortDescending: "Trier par ordre décroissant",
                        EditRecord: "Modifier la campagne",
                        DeleteRecord: "Supprimer la campagne",
                        Copy: "Copier la sélection",
                        SelectAll: "Tout sélectionner",
                        Blanks: "Espaces",
                        NoResult: "Aucun résultat",
                        PreviousPage: "Page précédente",
                        NextPage: "Page suivante"
                    },
                    datepicker: {
                        placeholder: "Date",
                        today: "Aujourd'hui"
                    },
                    pager: {
                        currentPageInfo: '{0} de {1} pages',
                        totalItemsInfo: '({0} campagnes)',
                        firstPageTooltip: 'Aller à la première page',
                        lastPageTooltip: 'Aller à la dernière page',
                        nextPageTooltip: 'Page suivante',
                        previousPageTooltip: 'Page précédente',
                        nextPagerTooltip: 'Page précédente',
                        previousPagerTooltip: 'Page suivante'
                    },
                    dropdowns: {
                        'noRecordsTemplate': "Aucun enregistrement trouvé",
                        'actionFailureTemplate': "Modèle d'échec d'action",
                        'overflowCountTemplate': "+${count} plus..",
                        'totalCountTemplate': "${count} choisi"
                    }
                },
            });
        }
    }
    ngOnInit() {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map