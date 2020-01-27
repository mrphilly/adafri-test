import { async, TestBed } from '@angular/core/testing';
import { CreateResponsiveDisplayCampaignComponent } from './create-responsive-display-campaign.component';
describe('CreateResponsiveDisplayCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateResponsiveDisplayCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CreateResponsiveDisplayCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-responsive-display-campaign.component.spec.js.map