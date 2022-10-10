import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { SignupComponent } from './Pages/signup/signup.component';
import { HomeComponent } from './Pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { CreateRecipeComponent } from './Pages/create-recipe/create-recipe.component';
import { HeaderComponent } from './components/header/header.component';
import { GlobalErrorHandler } from './globalErrorHandler';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, HomeComponent, CardComponent, CreateRecipeComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ {
    provide: ErrorHandler,
    useClass: GlobalErrorHandler,
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
