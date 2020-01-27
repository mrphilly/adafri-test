import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookRoutingModule } from './facebook-routing.module';
import { ListCampaignComponent } from './list-campaign/list-campaign.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { MaterialModule } from "../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { NgSelectModule } from "@ng-select/ng-select";
import { UploaderModule } from '@syncfusion/ej2-angular-inputs';
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { ButtonModule, CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
let FacebookModule = class FacebookModule {
};
FacebookModule = tslib_1.__decorate([
    NgModule({
        declarations: [ListCampaignComponent, CreateCampaignComponent],
        imports: [
            CommonModule,
            FacebookRoutingModule,
            MaterialModule,
            FormsModule,
            ReactiveFormsModule,
            TranslateModule,
            NgSelectModule,
            UploaderModule,
            DateRangePickerModule,
            ButtonModule,
            CheckBoxModule
        ]
    })
], FacebookModule);
export { FacebookModule };
//# sourceMappingURL=facebook.module.js.map