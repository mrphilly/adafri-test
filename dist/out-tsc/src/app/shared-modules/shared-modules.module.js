import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { UserManagementComponent } from './user-management/user-management.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PaymentService } from './payment.service';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { PublishCampaignComponent } from './publish-campaign/publish-campaign.component';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { NotificationsService } from './notifications.service';
import { ToastAdafriComponent } from './toast/toast.component';
import { ToastAllModule } from '@syncfusion/ej2-angular-notifications';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { UploaderModule, TextBoxAllModule, ColorPickerAllModule, SliderAllModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownListAllModule, MultiSelectAllModule, CheckBoxSelectionService, ListBoxAllModule } from '@syncfusion/ej2-angular-dropdowns';
import { DateRangePickerAllModule, DateTimePickerAllModule, TimePickerAllModule, DatePickerAllModule } from '@syncfusion/ej2-angular-calendars';
import { ButtonModule, CheckBoxModule, ChipListAllModule, RadioButtonAllModule } from '@syncfusion/ej2-angular-buttons';
import { GridAllModule, ToolbarService, ForeignKeyService, SelectionService, EditService, DetailRowService, RowDDService, CommandColumnService, SortService, SearchService, ColumnMenuService, ColumnChooserService } from '@syncfusion/ej2-angular-grids';
import { TabAllModule, ToolbarAllModule, MenuModule } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { InPlaceEditorAllModule } from '@syncfusion/ej2-angular-inplace-editor';
import { DropDownButtonModule, ProgressButtonAllModule, SplitButtonAllModule } from '@syncfusion/ej2-angular-splitbuttons';
import { NouisliderModule } from 'ng2-nouislider';
import { DndModule } from 'ng2-dnd';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontPickerModule } from 'ngx-font-picker';
import { FONT_PICKER_CONFIG } from 'ngx-font-picker';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RangeNavigatorModule, ChartModule } from '@syncfusion/ej2-angular-charts';
import { AreaSeriesService, DateTimeService, PeriodSelectorService } from '@syncfusion/ej2-angular-charts';
import { ListCampaignsComponent } from './list-campaigns/list-campaigns.component';
import { EditCampaignComponent } from './edit-campaign/edit-campaign.component';
import { EditorAdafriComponent } from './editor-adafri/editor-adafri.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ListViewModule, } from '@syncfusion/ej2-angular-lists';
const DEFAULT_FONT_PICKER_CONFIG = {
    // Google API Key
    apiKey: 'AIzaSyAN1VolxTqz1jn1Fzr5LdVneCjJ-FC6JT4'
};
enableRipple(true);
export const createTranslateLoader = (http) => new TranslateHttpLoader(http);
let SharedModulesModule = class SharedModulesModule {
};
SharedModulesModule = tslib_1.__decorate([
    NgModule({
        declarations: [UserManagementComponent, DateAgoPipe, PublishCampaignComponent, ToastAdafriComponent, DateAgoPipe, ListCampaignsComponent, EditCampaignComponent, EditorAdafriComponent, SpinnerComponent,],
        imports: [
            MaterialModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule,
            UploaderModule,
            DateRangePickerAllModule,
            ButtonModule,
            CheckBoxModule,
            DateTimePickerAllModule,
            GridAllModule,
            DropDownListAllModule,
            MultiSelectAllModule,
            TimePickerAllModule,
            TextBoxAllModule,
            ChipListAllModule,
            TabAllModule,
            InPlaceEditorAllModule,
            RadioButtonAllModule,
            ToastAllModule,
            DropDownButtonModule,
            ProgressButtonAllModule,
            ToolbarAllModule,
            NouisliderModule,
            DndModule.forRoot(),
            NgbModule,
            FontPickerModule,
            LazyLoadImageModule,
            ColorPickerAllModule,
            SliderAllModule,
            SplitButtonAllModule,
            DialogModule,
            RangeNavigatorModule,
            ChartModule,
            MenuModule,
            NgbModule,
            ListViewModule,
            ListBoxAllModule,
            DatePickerAllModule,
            TranslateModule.forRoot({
                loader: {
                    provide: TranslateLoader,
                    useFactory: createTranslateLoader,
                    deps: [HttpClient]
                }
            })
        ],
        exports: [
            TranslateModule,
            UserManagementComponent,
            DateAgoPipe,
            PublishCampaignComponent,
            MaterialModule,
            CommonModule,
            FormsModule,
            ReactiveFormsModule,
            NgSelectModule,
            UploaderModule,
            DateRangePickerAllModule,
            ButtonModule,
            CheckBoxModule,
            DateTimePickerAllModule,
            GridAllModule,
            DropDownListAllModule,
            MultiSelectAllModule,
            TimePickerAllModule,
            TextBoxAllModule,
            ChipListAllModule,
            TabAllModule,
            InPlaceEditorAllModule,
            RadioButtonAllModule,
            ToastAllModule,
            DropDownButtonModule,
            ProgressButtonAllModule,
            ToolbarAllModule,
            NouisliderModule,
            DndModule,
            NgbModule,
            FontPickerModule,
            LazyLoadImageModule,
            ColorPickerAllModule,
            SliderAllModule,
            SplitButtonAllModule,
            DialogModule,
            RangeNavigatorModule,
            ChartModule,
            MenuModule,
            DateAgoPipe,
            NgbModule,
            ToastAdafriComponent,
            ListCampaignsComponent,
            EditCampaignComponent,
            EditorAdafriComponent,
            SpinnerComponent,
            ListViewModule,
            ListBoxAllModule,
            DatePickerAllModule
        ],
        entryComponents: [
            UserManagementComponent,
        ],
        providers: [DateAgoPipe, PaymentService, NotificationsService, ToolbarService, ForeignKeyService, SelectionService, EditService, DetailRowService, RowDDService, CommandColumnService, SortService, CheckBoxSelectionService, SearchService, ColumnMenuService, ToolbarService, AreaSeriesService, DateTimeService, PeriodSelectorService, ColumnChooserService,
            {
                provide: FONT_PICKER_CONFIG,
                useValue: DEFAULT_FONT_PICKER_CONFIG
            }]
    })
], SharedModulesModule);
export { SharedModulesModule };
//# sourceMappingURL=shared-modules.module.js.map