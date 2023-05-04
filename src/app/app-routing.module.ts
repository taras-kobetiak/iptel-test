import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvrFormComponent } from './components/ivr-form/ivr-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResultPageComponent } from './components/result-page/result-page.component';

const routes: Routes = [
  { path: '', component: IvrFormComponent },
  { path: 'result', component: ResultPageComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
