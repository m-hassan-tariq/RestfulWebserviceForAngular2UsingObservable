import { Component, OnInit } from '@angular/core';

import { SearchMovieModel } from './search-movie.model';
import { WebApiObservableService } from './web-api-observable.service';

@Component({
    selector: 'search-movie-list',
    templateUrl: '../../Scripts/app/search-movies/search-movie-list/search-movie-list.component.html'
})

export class SearchMovieListComponent implements OnInit {

    constructor(
        private movieObservableService: WebApiObservableService) {
        this.searchMovieModel = {id: '12' , name: 'abc'};
    }

    ngOnInit() {
        this.movieObservableService
            .getService('api/Movie/TestGetNo')
            .subscribe(
                result => console.log("1. getService: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .getServiceWithDynamicQueryTerm('api/Movie/TestGetParam', "query", "hello")
            .subscribe(
                result => console.log("2. getServiceWithDynamicQueryTerm: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .getServiceWithFixedQueryString('api/Movie/TestGetParam', this.searchMovieModel.name)
            .subscribe(
                result => console.log("3. getServiceWithFixedQueryString: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .getServiceWithComplexObjectAsQueryString('api/Movie/TestGet', this.searchMovieModel)
            .subscribe(
                result => console.log("4. getServiceWithComplexObjectAsQueryString: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .createService('api/Movie/TestPost', this.searchMovieModel)
            .subscribe(
                result => console.log("5. createService: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .updateService('api/Movie/TestPut', this.searchMovieModel)
            .subscribe(
                result => console.log("6. updateService: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .patchService('api/Movie/TestPatch', this.searchMovieModel)
            .subscribe(
                result => console.log("7. patchService: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .deleteService('api/Movie/TestDelete', this.searchMovieModel)
            .subscribe(
                result => console.log("8. deleteService: " + result),
                error => this.errorMessage = <any>error
            );

        this.movieObservableService
            .deleteServiceWithId('api/Movie/TestDeleteWithId', "id", "8631")
            .subscribe(
                result => console.log("9. deleteServiceWithId: " + result),
                error => this.errorMessage = <any>error
            );
	    }
}
