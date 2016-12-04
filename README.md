# Restful Webservice For Angular2 Using Observable
Restful implementation of GET, POST, DELETE, PATCH, PUT in Angular2 using Observable

The Angular Http client communicates with the server using a familiar HTTP request/response protocol. The Http client is one of a family of services in the Angular HTTP library. When importing from the @angular/http module, SystemJS knows how to load services from the Angular HTTP library because the systemjs.config.js file maps to that module name. The HttpModule is necessary for making HTTP calls.

Benefits of using Global Service (web-api-observable.service.ts):

* This will contain shared/global service which will be consumed by all modules for executing CRUD operation, Request Type, URL, Parameter Object will be passed to this shared service, so it will make code more maintainable, readable and scalable

* If we dont go through this method then we have to use $http.get() or $http.post method every where in services files of each module

* content negotiation issues can be simply handled over here

* If you want to append anything with each URL like ‘Http:\mydomain\’ then instead of copy it on every service file just hard-code this thing in this file and append URL from their respective services.

* We don’t need to mention protocol and host-name now in every URL request.

----

### Observable

Think of an Observable as a stream of events published by some source. To listen for events in this stream, subscribe to the Observable. These subscriptions specify the actions to take when the web request produces a success event or a fail event (with the error in the payload).

* The observable's map callback moves to the success parameter and its catch callback to the fail parameter in this pattern.

* The errorHandler forwards an error message as a failed promise instead of a failed observable.

-----

### Observable vs Promises 

The less obvious but critical difference is that these two methods return very different results.

* The **promise-based** then returns another promise. You can keep chaining more then and catch calls, getting a new promise each time.

* The **subscribe method** returns a Subscription. A Subscription is not another Observable. It's the end of the line for observables. You can't call map on it or call subscribe again. The Subscription object has a different purpose, signified by its primary method, unsubscribe.

-----

### RxJS library

* RxJS ("Reactive Extensions") is a 3rd party library, endorsed by Angular, that implements the asynchronous observable pattern.

* RxJS npm package loaded via system.js because observables are used widely in Angular applications.

* The app needs it when working with the HTTP client. Additionally, you must take a critical extra step to make RxJS observables usable.

* The RxJS library is large. Size matters when building a production application and deploying it to mobile devices. You should include only necessary features.

* Accordingly, Angular exposes a stripped down version of Observable in the rxjs/Observable module that lacks most of the operators such as the map method.

* You could add every RxJS operator with a single import statement. While that is the easiest thing to do, you'd pay a penalty in extended launch time and application size because the full library is so big.

* Since this app only uses a few operators, it's better to import each Observable operator and static class method, one-by-one, for a custom Observable implementation tuned precisely to the app's requirements. Put the import statements in one app/rxjs-operators.ts file.

-----

## HTTP GET Code (web-api-observable.service.ts)

The Http.get method takes an object that implements RequestOptionsArgs as a second parameter.

* #### Plain HTTP GET using Observable without any parameters

        getService(url: string): Observable<any> {
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }
            
     **Consumer Code in _custom component_**:
     
               this.movieObservableService
                  .getService('api/Movie/TestGetNo')
                  .subscribe(
                      result => console.log(result),
                      error => this.errorMessage = <any>error
                );
            
* #### HTTP GET using Observable with single query string term

        getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
        return this.http
            .get(url + "/?" + key + "=" + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }
            
     **Consumer Code in _custom component_**:
     
        this.movieObservableService
            .getServiceWithDynamicQueryTerm('api/Movie/TestGetParam', "query", "hello")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );    
            
* #### HTTP GET using Observable with multiple query string term

        getServiceWithMultipleQueryTerm(url: string, query: string): Observable<any> {
              return this.http
                  .get(url + "/?" + query, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
   
        this.movieObservableService
            .getServiceWithMultipleQueryTerm('api/Movie/TestGetParam', "id=1&&name=abc")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        ); 

* #### HTTP GET using Observable with hardcode query string term

  *The search field of that object can be used to set a string or a URLSearchParams object.*

        getServiceWithFixedQueryString(url: string, param: any): Observable<any> {
        this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }         

     **Consumer Code in _custom component_**:
     
        this.movieObservableService
            .getServiceWithFixedQueryString('api/Movie/TestGetParam', 'abc')
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );

* #### HTTP GET using Observable with complex object as query string

  *The search field of that object can be used to set a string or a URLSearchParams object.*

        getServiceWithComplexObjectAsQueryString(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .get(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }     

     **Consumer Code in _custom component_**:
     
        this.movieObservableService
            .getServiceWithComplexObjectAsQueryString('api/Movie/TestGet', "{ id: '1', name: 'abc'}")
            .subscribe(
                result => console.log("4. getServiceWithComplexObjectAsQueryString: " + result),
                error => this.errorMessage = <any>error
        );

## HTTP POST Producer Code (web-api-observable.service.ts)

The Http.post method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP POST using Observable with body object as parameter

        createService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .post(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
        this.movieObservableService
            .createService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );

## HTTP PUT Producer Code (web-api-observable.service.ts)

The Http.put method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP PUT using Observable with body object as parameter

        updateService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .put(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
         this.movieObservableService
            .updateService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );

## HTTP PATCH Producer Code (web-api-observable.service.ts)

The Http.patch method takes body as second parameter and an object that implements RequestOptionsArgs as a third parameter.

* #### HTTP PATCH using Observable with body object as parameter

        patchService(url: string, param: any): Observable<any> {
        let body = JSON.stringify(param);
        return this.http
            .patch(url, body, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }   

     **Consumer Code in _custom component_**:
     
        this.movieObservableService
            .patchService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );
        
## HTTP DELETE Producer Code (web-api-observable.service.ts)

The Http.delete method takes an object that implements RequestOptionsArgs as a second parameter.

* #### HTTP DELETE using Observable with ID as parameter

        deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
        return this.http
            .delete(url + "/?" + key + "=" + val, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
         this.movieObservableService
            .deleteServiceWithId('api/Movie/TestDeleteWithId', "id", "8631")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
          );

* #### HTTP DELETE using Observable with complex object as parameter

   *The search field of that object can be used to set a string or a URLSearchParams object.*
   
        deleteService(url: string, param: any): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (var key in param) {
            if (param.hasOwnProperty(key)) {
                let val = param[key];
                params.set(key, val);
            }
        }
        this.options = new RequestOptions({ headers: this.headers, search: params });
        return this.http
            .delete(url, this.options)
            .map(this.extractData)
            .catch(this.handleError);
        }

     **Consumer Code in _custom component_**:
     
         this.movieObservableService
            .deleteService('api/Movie/TestPost', "{ id: '1', name: 'abc'}")
            .subscribe(
                result => console.log(result),
                error => this.errorMessage = <any>error
        );

#### Important Note

**You need to append Accept headers to your get request in order for Firefox to render the json that comes back.**

In the headers object, the Content-Type specifies that the body represents JSON. The headers object is used to configure the options object. The options object is a new instance of RequestOptions, a class that allows you to specify certain settings when instantiating a request. In this way, headers is one of the RequestOptions.

In the return statement, options is the third argument of the post method, as shown above.

        ngOnInit() {
        let headers = new Headers();
        headers.append('Accept', 'q=0.8;application/json;q=0.9');
        return this.http.get(this.url, { headers: headers } )
                   .map(data => console.log(data.json()))
                   .subscribe(err => console.log(err));
        }

-----

# Restful HTTP Service using Observable

Angular injects a WebApiObservableService into the constructor and the component calls that service to fetch and save data. The component does not talk directly to the Angular Http client. The component doesn't know or care how it gets the data. It delegates to the WebApiObservableService. **This is a golden rule: always delegate data access to a supporting service class.**

      import { Injectable } from '@angular/core';
      import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
      import { Observable } from 'rxjs/Observable';

      // Observable class extensions
      import 'rxjs/add/observable/of';
      import 'rxjs/add/observable/throw';

      // Observable operators
      import 'rxjs/add/operator/catch';
      import 'rxjs/add/operator/debounceTime';
      import 'rxjs/add/operator/distinctUntilChanged';
      import 'rxjs/add/operator/do';
      import 'rxjs/add/operator/filter';
      import 'rxjs/add/operator/map';
      import 'rxjs/add/operator/switchMap';

      import { ToasterService } from './alert.service';
      import { LoaderService } from './loader.service';

      @Injectable()
      export class WebApiObservableService {
          headers: Headers;
          options: RequestOptions;

          constructor(private http: Http,
              private toasterService: ToasterService,
              private loaderService: LoaderService) {
              this.headers = new Headers({ 'Content-Type': 'application/json', 
                                        'Accept': 'q=0.8;application/json;q=0.9' });
              this.options = new RequestOptions({ headers: this.headers });
          }

          getService(url: string): Observable<any> {
              return this.http
                  .get(url, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          getServiceWithDynamicQueryTerm(url: string, key: string, val: string): Observable<any> {
              return this.http
                  .get(url + "/?" + key + "=" + val, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }
          
          getServiceWithMultipleQueryTerm(url: string, query: string): Observable<any> {
              return this.http
                  .get(url + "/?" + query, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          getServiceWithFixedQueryString(url: string, param: any): Observable<any> {
              this.options = new RequestOptions({ headers: this.headers, search: 'query=' + param });
              return this.http
                  .get(url, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          getServiceWithComplexObjectAsQueryString(url: string, param: any): Observable<any> {
              let params: URLSearchParams = new URLSearchParams();
              for (var key in param) {
                  if (param.hasOwnProperty(key)) {
                      let val = param[key];
                      params.set(key, val);
                  }
              }
              this.options = new RequestOptions({ headers: this.headers, search: params });
              return this.http
                  .get(url, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          createService(url: string, param: any): Observable<any> {
              let body = JSON.stringify(param);
              return this.http
                  .post(url, body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          updateService(url: string, param: any): Observable<any> {
              let body = JSON.stringify(param);
              return this.http
                  .put(url, body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          patchService(url: string, param: any): Observable<any> {
              let body = JSON.stringify(param);
              return this.http
                  .patch(url, body, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          deleteService(url: string, param: any): Observable<any> {
              let params: URLSearchParams = new URLSearchParams();
              for (var key in param) {
                  if (param.hasOwnProperty(key)) {
                      let val = param[key];
                      params.set(key, val);
                  }
              }
              this.options = new RequestOptions({ headers: this.headers, search: params });
              return this.http
                  .delete(url, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          deleteServiceWithId(url: string, key: string, val: string): Observable<any> {
              return this.http
                  .delete(url + "/?" + key + "=" + val, this.options)
                  .map(this.extractData)
                  .catch(this.handleError);
          }

          private extractData(res: Response) {
              let body = res.json();
              return body || {};
          }

          private handleError(error: any) {
              let errMsg = (error.message) ? error.message :
                  error.status ? `${error.status} - ${error.statusText}` : 'Server error';
              console.error(errMsg);
              this.toasterService.showToaster('error', 'Oops!! An error occurred', errMsg);
              this.loaderService.displayLoader(false);
              return Observable.throw(errMsg);
          }
      }
      
[Text Reference](https://angular.io/docs/ts/latest/guide/server-communication.html)      
