import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FunctionsPageComponent } from './functions-page/functions-page.component';

const routes: Routes =
[
  { path: '', redirectTo: 'FuncPage/Combination', pathMatch: 'full'  },
  { path: 'FuncPage', redirectTo: 'FuncPage/Combination', pathMatch: 'full'  },
  { path: 'FuncPage/:type', component: FunctionsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
