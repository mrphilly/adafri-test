import { async, TestBed } from '@angular/core/testing';
import { SelectTypeCampaignComponent } from './select-type-campaign.component';
describe('SelectTypeCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SelectTypeCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(SelectTypeCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=select-type-campaign.component.spec.js.map