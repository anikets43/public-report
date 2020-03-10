import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { RestService } from './rest.service';
import { ToastNotificationService } from './toast-notification.service';

describe('RestService', () => {
    let service: RestService;
    let httpMock: HttpTestingController;
    const testData = { name: 'Test Data' };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                RestService,
                {
                    provide: AppConfigService,
                    useValue: jasmine.createSpyObj({
                        appConfig$: of(),
                    }),
                },
                {
                    provide: ToastNotificationService,
                    useValue: jasmine.createSpyObj({
                        showError: function () { },
                    }),
                },
            ],
        });

        service = TestBed.get(RestService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get the data successful', () => {
        service.baseUrl = '';
        const endpoint = '/api/v1/features/1';

        service.get(endpoint).subscribe((data: any) => {
            expect(data).toEqual(testData);
            expect(service.get).toHaveBeenCalled();
            expect(service.get).toHaveBeenCalledWith(endpoint);
        });

        const req = httpMock.expectOne(endpoint);
        expect(req.request.method).toBe('GET');
        req.flush(testData);
    });
});
