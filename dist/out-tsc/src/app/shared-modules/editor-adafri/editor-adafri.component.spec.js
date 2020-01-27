import { async, TestBed } from '@angular/core/testing';
import { EditorAdafriComponent } from './editor-adafri.component';
describe('EditorAdafriComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EditorAdafriComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(EditorAdafriComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=editor-adafri.component.spec.js.map