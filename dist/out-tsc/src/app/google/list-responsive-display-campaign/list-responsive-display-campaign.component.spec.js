import { async, TestBed } from '@angular/core/testing';
import { ListResponsiveDisplayCampaignComponent } from './list-responsive-display-campaign.component';
describe('ListResponsiveDisplayCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListResponsiveDisplayCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ListResponsiveDisplayCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=list-responsive-display-campaign.component.spec.js.map