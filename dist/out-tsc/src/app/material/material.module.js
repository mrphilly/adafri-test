import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule, ButtonsModule, NavbarModule, TooltipModule, TableModule, InputsModule, InputUtilitiesModule, ModalModule, WavesModule, CheckboxModule, DropdownModule, IconsModule } from 'angular-bootstrap-md';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatButtonModule, MatToolbarModule, MatIconModule, MatBadgeModule, MatSidenavModule, MatListModule, MatGridListModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule, MatChipsModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatCardModule, MatButtonToggleModule, MatProgressBarModule, MatStepperModule, MatMenuModule, } from '@angular/material';
let MaterialModule = class MaterialModule {
};
MaterialModule = tslib_1.__decorate([
    NgModule({
        imports: [
            CommonModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatSidenavModule,
            MatBadgeModule,
            MatListModule,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatRadioModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatChipsModule,
            MatTooltipModule,
            MatTableModule,
            MatPaginatorModule,
            MatCardModule,
            MatButtonToggleModule,
            MatProgressBarModule,
            MDBBootstrapModule.forRoot(),
            ButtonsModule,
            NavbarModule,
            TooltipModule,
            InputUtilitiesModule,
            TableModule,
            InputsModule,
            CheckboxModule,
            ModalModule,
            WavesModule,
            DropdownModule,
            IconsModule,
            MatMenuModule,
            MatStepperModule,
            MatProgressSpinnerModule
        ],
        exports: [
            CommonModule,
            MatButtonModule,
            MatToolbarModule,
            MatIconModule,
            MatSidenavModule,
            MatBadgeModule,
            MatListModule,
            MatGridListModule,
            MatInputModule,
            MatFormFieldModule,
            MatSelectModule,
            MatRadioModule,
            MatDatepickerModule,
            MatChipsModule,
            MatTooltipModule,
            MatTableModule,
            MatPaginatorModule,
            MatCardModule,
            MatButtonToggleModule,
            MatProgressBarModule,
            MatMenuModule,
            MDBBootstrapModule,
            ButtonsModule,
            NavbarModule,
            TooltipModule,
            InputUtilitiesModule,
            TableModule,
            InputsModule,
            CheckboxModule,
            ModalModule,
            WavesModule,
            DropdownModule,
            IconsModule,
            MatStepperModule,
            MatProgressSpinnerModule
        ],
        providers: [
            MatDatepickerModule,
        ]
    })
], MaterialModule);
export { MaterialModule };
//# sourceMappingURL=material.module.js.map