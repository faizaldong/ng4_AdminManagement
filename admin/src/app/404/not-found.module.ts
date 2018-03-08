import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { Json } from './not-found-json'

@NgModule({
    imports: [
        NotFoundRoutingModule,
        RouterModule
    ],
    declarations: [NotFoundComponent],
    providers: [Json]
})
export class NotFoundModule {}
