import { TestBed } from '@angular/core/testing';
import { PaymentService } from './payment.service';
describe('PaymentService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));
    it('should be created', () => {
        const service = TestBed.get(PaymentService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=payment.service.spec.js.map