import { async, TestBed } from '@angular/core/testing';
import { CreateYoutubeCampaignComponent } from './create-youtube-campaign.component';
describe('CreateYoutubeCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CreateYoutubeCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CreateYoutubeCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=create-youtube-campaign.component.spec.js.map