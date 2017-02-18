import {Component, OnInit, Input, forwardRef, OnChanges, SimpleChanges} from '@angular/core';
import {Http} from "@angular/http";
import {Subject} from "rxjs/Subject";

import  "rxjs/add/operator/map";
import  "rxjs/add/operator/debounceTime";
import  "rxjs/add/operator/distinctUntilChanged";
import  "rxjs/add/operator/switchMap";
import  "rxjs/add/operator/mergeMap";
import  "rxjs/add/operator/scan";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, NG_VALIDATORS} from "@angular/forms";

export function createRequiredValidator(name: string) {
    return function requiredValidator(c: FormControl) {
        return c.value ? null : `${name} is required`;
    }
}

@Component({
    selector: 'gt-typeahead',
    templateUrl: './gt-typeahead.component.html',
    styleUrls: ['./gt-typeahead.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GtTypeaheadComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: forwardRef(() => GtTypeaheadComponent),
            multi: true
        }
    ]
})
export class GtTypeaheadComponent implements OnInit,ControlValueAccessor,OnChanges {

    private value: any;
    private term$ = new Subject<string>();
    @Input()
    private variable: string;
    @Input()
    private url: string;
    @Input()
    private displayProp: string;
    @Input()
    private required: boolean;
    @Input()
    private name: string;
    @Input()
    private disabled:boolean;

    private data;
    private text;
    private propagateChangeFn: any;
    private validateFn: Function;

    constructor(private http: Http) {
    }

    ngOnInit() {
        this.term$
            .debounceTime(300)
            .distinctUntilChanged()
            .switchMap(term => this.search(term))
            .map(e => e.json())
            .subscribe(e => this.data = e);
    }

    search(term: string) {
        return this.http.get(`${this.url}?${this.variable}=${term}`)
    }

    select(value: any) {
        this.setValue(value);
        this.propagateChangeFn(this.value);
    }

    setValue(value: any) {
        this.value = value;
        this.data = null;
        this.text = value[this.displayProp];
    }

    clear() {
        this.value = null;
        this.data = null;
        this.text = null;
        this.propagateChangeFn(this.value);
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
        }
    }

    registerOnChange(fn: any): void {
        this.propagateChangeFn = fn;
    }

    registerOnTouched(fn: any): void {
    }

    ngOnChanges(changes: any): void {
        if (changes.required && this.required) {
            this.validateFn = createRequiredValidator(this.name);
        }
    }

    validate(c: FormControl) {
        return this.validateFn(c);
    }

}

