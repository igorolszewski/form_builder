import { Routes } from '@angular/router';
import { SurveyComponent } from './survey';

export const ROUTES: Routes = [

  { path: 'survey', component: SurveyComponent },
  { path: '**', component: SurveyComponent },
];
