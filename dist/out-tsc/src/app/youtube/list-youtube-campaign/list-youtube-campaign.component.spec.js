import { async, TestBed } from '@angular/core/testing';
import { ListYoutubeCampaignComponent } from './list-youtube-campaign.component';
describe('ListYoutubeCampaignComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListYoutubeCampaignComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ListYoutubeCampaignComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=list-youtube-campaign.component.spec.js.map