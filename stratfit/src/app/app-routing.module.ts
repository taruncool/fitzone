import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'analytics',
    loadChildren: () => import('./analytics/analytics.module').then( m => m.AnalyticsPageModule)
  },
  {
    path: 'coachprofile',
    loadChildren: () => import('./coachprofile/coachprofile.module').then( m => m.CoachprofilePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'signupverify',
    loadChildren: () => import('./signupverify/signupverify.module').then( m => m.SignupverifyPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'programdetails',
    loadChildren: () => import('./programdetails/programdetails.module').then( m => m.ProgramdetailsPageModule)
  },
  {
    path: 'plateweights',
    loadChildren: () => import('./plateweights/plateweights.module').then( m => m.PlateweightsPageModule)
  },
  {
    path: 'planrenewal',
    loadChildren: () => import('./planrenewal/planrenewal.module').then( m => m.PlanrenewalPageModule)
  },
  {
    path: 'startdate',
    loadChildren: () => import('./startdate/startdate.module').then( m => m.StartdatePageModule)
  },
  {
    path: 'mysubscription',
    loadChildren: () => import('./mysubscription/mysubscription.module').then( m => m.MysubscriptionPageModule)
  },
  {
    path: 'invite',
    loadChildren: () => import('./invite/invite.module').then( m => m.InvitePageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'exercise',
    loadChildren: () => import('./exercise/exercise.module').then( m => m.ExercisePageModule)
  },
  {
    path: 'community',
    loadChildren: () => import('./community/community.module').then( m => m.CommunityPageModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./calendar/calendar.module').then( m => m.CalendarPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'fitnessinput',
    loadChildren: () => import('./fitnessinput/fitnessinput.module').then( m => m.FitnessinputPageModule)
  },
  {
    path: 'tmaxeditpopup',
    loadChildren: () => import('./tmaxeditpopup/tmaxeditpopup.module').then( m => m.TmaxeditpopupPageModule)
  },
  {
    path: 'tmax',
    loadChildren: () => import('./tmax/tmax.module').then( m => m.TmaxPageModule)
  },
  {
    path: 'tmaxtesting',
    loadChildren: () => import('./tmaxtesting/tmaxtesting.module').then( m => m.TmaxtestingPageModule)
  },
  {
    path: 'tmaxsummary',
    loadChildren: () => import('./tmaxsummary/tmaxsummary.module').then( m => m.TmaxsummaryPageModule)
  },
  {
    path: 'tlevel',
    loadChildren: () => import('./tlevel/tlevel.module').then( m => m.TlevelPageModule)
  },
  {
    path: 'todayworkout',
    loadChildren: () => import('./todayworkout/todayworkout.module').then( m => m.TodayworkoutPageModule)
  },
  {
    path: 'timerpopup',
    loadChildren: () => import('./workout/timerpopup/timerpopup.module').then( m => m.TimerpopupPageModule)
  },
  {
    path: 'wtcalpopup',
    loadChildren: () => import('./workout/wtcalpopup/wtcalpopup.module').then( m => m.WtcalpopupPageModule)
  },
  {
    path: 'instpopup',
    loadChildren: () => import('./workout/instpopup/instpopup.module').then( m => m.InstpopupPageModule)
  },
  {
    path: 'addmeal',
    loadChildren: () => import('./userdiet/addmeal/addmeal.module').then( m => m.AddmealPageModule)
  },
  {
    path: 'diethistory',
    loadChildren: () => import('./userdiet/diethistory/diethistory.module').then( m => m.DiethistoryPageModule)
  },
  {
    path: 'dietprofile',
    loadChildren: () => import('./userdiet/dietprofile.module').then( m => m.DietprofilePageModule)
  },
  {
    path: 'filterfood',
    loadChildren: () => import('./userdiet/filterfood/filterfood.module').then( m => m.FilterfoodPageModule)
  },
  {
    path: 'viewmeal',
    loadChildren: () => import('./userdiet/viewmeal/viewmeal.module').then( m => m.ViewmealPageModule)
  },
  {
    path: 'password',
    loadChildren: () => import('./profile/password/password.module').then( m => m.PasswordPageModule)
  },
  {
    path: 'userprofile',
    loadChildren: () => import('./userprofile/userprofile.module').then( m => m.UserprofilePageModule)
  },
  {
    path: 'advexpopup',
    loadChildren: () => import('./workout/advexpopup/advexpopup.module').then( m => m.AdvexpopupPageModule)
  },
  {
    path: 'progressbar',
    loadChildren: () => import('./todayworkout/progressbar/progressbar.module').then( m => m.ProgressbarPageModule)
  },
  {
    path: 'goal',
    loadChildren: () => import('./goal/goal.module').then( m => m.GoalPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'bmicalculator',
    loadChildren: () => import('./bmicalculator/bmicalculator.module').then( m => m.BmicalculatorPageModule)
  },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
