import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import {MatSliderModule} from '@angular/material/slider'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FlexLayoutModule,
        MatCardModule,
        MatSliderModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        FlexLayoutModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        MatSliderModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class MaterialLoaderModule { }
