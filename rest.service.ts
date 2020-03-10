@Injectable()
export class RestService {
    public baseUrl = null;

    constructor(
        private http: HttpClient,
        private appConfigService: AppConfigService,
        private toast: ToastNotificationService,
    ) {
        this.getConfig();
    }

    get<T>(url, showError = true): Observable<any> {
        return this.http.get<T>(this.baseUrl + url).pipe(
            catchError((error: HttpErrorResponse) => {
                return this.showError(error, showError);
            }),
        );
    }

    private getConfig() {
        this.appConfigService.appConfig$.subscribe(env => {
            this.baseUrl = env.backendUrl + API_PREFIX;
        });
    }

    private showError(error: HttpErrorResponse, showError) {
        let message = Helpers.getErrorMessageFromObject(error);
        if (showError && message) this.toast.showError(message);

        return throwError(error);
    }   
}
