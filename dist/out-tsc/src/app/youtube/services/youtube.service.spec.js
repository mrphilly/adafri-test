import { TestBed } from '@angular/core/testing';
import { YoutubeService } from './youtube.service';
describe('YoutubeService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(YoutubeService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=youtube.service.spec.js.map