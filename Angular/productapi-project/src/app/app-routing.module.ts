import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { AsyncComponent } from './async/async.component';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { FindComponent } from './find/find.component';
import { DetailComponent } from './detail/detail.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {path: 'product', component: HomeComponent},
  {path: 'find', component: FindComponent},
  {path: 'add', component: AddComponent},
  {path: 'update', component: UpdateComponent},
  {path: 'delete', component: DeleteComponent},
  {path: 'product/:id', component: DetailComponent},
  {​​​​​​​​path:"product/edit/:id", component:EditComponent}​​​​​​​​,
  {path: '**', redirectTo:'product', pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
