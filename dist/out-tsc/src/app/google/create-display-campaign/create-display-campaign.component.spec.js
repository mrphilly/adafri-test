import { async, TestBed } from '@angular/core/testing';
import { CreateDisplayCampaignComponent } from './create-display-campaign.component';
describe('CreateDisplayCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateDisplayCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CreateDisplayCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-display-campaign.component.spec.js.map