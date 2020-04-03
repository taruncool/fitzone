import { Component, OnInit } from '@angular/core';
import { NavController, ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
  faqsdataNew:any = [];
  preData;
  faqsdata:any = {
                  "faqs": [{
                      "question": "I am an athlete.  What can Stratfit do for me?",
                      "answer": "<p>As an athlete, you can get access to truly professional scientific training for a fraction of the cost.</p><br><b>Stratfit:</b><ul><li>Is a facilitator to choose the right Strength Training Program from Elite professional trainers.</li><li>Provides the training interface for the chosen program on mobile devices - iOS and Android.</li><li>Gives you extensive progress charts and training analytics.</li><li>Provides tools to share results directly on your social media.</li></ul>"
                    },
                    {
                      "question": "I am not an athlete. What can Stratfit do for me?",
                      "answer": "<p>As a normal user, you can get access to truly scientific training for a variety of purposes customized to you for a fraction of the cost.<br> Stratfit has an easy to use messenger like interface. You first select a training program that is suitable for your objective, go through a simple test to determine your current level of training and go.<br> If you have not done any programmed workouts, we recommend you begin with a STARTER program of any coach of your choice (Starter programs are marked 'S' on the right hand top in the program list). Progress is rapid till you reach your inherent potential.<br>If you have done some weight training you could choose INTERMEDIATE programs - marked 'I' or choose from advanced programs if you have been training with weights. </p>"
                    },
                    {
                      "question": "How to find a training program suitable for me?",
                      "answer": "<p>To help you find the best program suited, coaches have indicated what each program is best suitable. You can simply select from a list of purposes which best describe your performance.</p>"
                    },
                    {
                      "question": "Can I communicate with the coach?",
                      "answer": "<p>You can find instructions by clicking on 'i' next to the exercise name on the WORKOUT screen. Video instructions for doing the exercise the right way are also included.</p>"
                    },
                    {
                      "question": "Where can I find instructions for every exercise?",
                      "answer": "<p> You can find instructions by clicking on 'i' next to the exercise name on the WORKOUT screen. Video instructions for doing the exercise the right way are also included.</p>"
                    },
                    {
                      "question": "How to continue the program after end of 28 day free trial?",
                      "answer": "<ul><li> At the end of 28 day free trial period, you will be given the option to continue the same program by purchasing subscription for a month. This will guide you through the process of payment and you can start the program  where you left off. At the end of every month you can continue this process.</li> <br> <li> Alternately, at the end of the 28 day free trial period, you can subscribe to another program from one of the programs available in the store.</li></ul>"
                    },
                    {
                      "question": "What payment methods are available?",
                      "answer": "<p>We accept all credit cards, debit cards, net banking and PayPal for Android and in app purchase for iOS.</p>"
                    },
                    {
                      "question": "Price of all programs are in $(USD).   Can I convert them to local currency ? ",
                      "answer": "<p>If you wish to see the price of programs in store in INR / USD, you can change the currency settings from SETTINGS -> Currency Type.</p>"
                    },
                    {
                      "question": "Can I get the 28 day free period for every program I subscribe? ",
                      "answer": "<p>The elite coaches who have designed the programs are the owners of the programs. They decide the price and receive the payment from you. StratFit does not have any say in the pricing. StratFit has worked out a special deal with all the coaches to forego the payment for any first time user of StratFit.You would agree that it is unreasonable to expect coaches to keep extending free programs indefinitely. </p>"
                    },
                    {
                      "question": "Can I decide when to start my training program? ",
                      "answer": "<p> Yes.  At the time of subscription, you will be given an option of choosing the start date.</p>"
                    },
                    {
                      "question": "Can I change the unit of Weights ? ",
                      "answer": "<ul><li>Yes, you can change it from Kgs to Lbs and vice versa.</li><li>Go to SETTINGS -> Metrics to change your metrics.</li></ul>"
                    },
                    {
                      "question": "I would like to change my Tmax.  How to do that ?",
                      "answer": "<ul><li>Go to SETTINGS ->Tmax summary to change your Tmax.</li><li> You can change the Tmax of one or many exercises from here. Please DONOT change the Tmax if you are not confident.</li></ul>"
                    },
                    {
                      "question": "Do I need to retest Tmax for every program ?",
                      "answer": "<ul><li> No. Your parent exercise numbers determine the scientifically approved approximate values of the remaining exercises.</li> <br> <li> The parent exercises are</li><ul><li>i.Bench Press</li><li>ii. Powerlifting Squat</li></ul></ul>"
                    },
                    {
                      "question": "I was asked to test Tmax for only two exercises.  How to find the Tmax of other exercises in the training program?",
                      "answer": "<ul><li>We ask you to go through Tmax testing of parent exercises only.  All other exercises are derived from the parent exercises.</li><br> <li> The parent exercises are</li><ul><li>i.Bench Press</li><li>ii.Powerlifting Squat</li></ul></ul>"
                    },
                    {
                      "question": "What is training program structure?",
                      "answer": "<ul><li>Programs are organized as training units. Every training unit can have subordinate training units.</li> <br> <li> For each training unit, the training duration and variables are organized based on time-tested and scientifically proven rules which have been established for the given unit.</li><br><li>A 'Macrocycle' is broken down into 'Periods' which are qualitatively defined by the coach who designed the program.<br> Each 'Period' is broken down into 'Mesocycles', which are described and/or defined by the designer according to purpose.<br> 'Mesocycles' are further divided into 'Microcycles' again by the program designer.<br> Each 'Microcycle' lasts for a specified number of days (sessions), as decided by the designer.</li></ul>"
                    },
                    {
                      "question": "How do I track my progress?",
                      "answer": "<ul><li> Go to ANALYSIS to track your progress </li><br> <li>'My Progress' allows you to see where you are on the program and what you have done.</li><br><li>'My Session Summary' allows you to see your progress by tracking the training parameters.</li></ul>"
                    },
                    {
                      "question": "Is there a diet program?",
                      "answer": "<p>We believe that a strict diet not essential for most purposes, and in our experience most people would find difficult to follow our very strict diet regime.StratFit research has come up with generic dietary recommendations which are available on our website. StratFit expects to have more specific recommendations after some time. Till then please consult a nutritionist in case you're an athlete in a competitive sport. </p>"
                    },
                    {
                      "question": "I am planning to go on a vacation, is there a way to pause the program?",
                      "answer": "<ul><li>SF coach app is autoregulating and self-correcting so there is no concept of 'pausing the program'. The app itself reworks the program to account for missed sessions.<br> You will notice 'skipped sessions' in your progress chart but these don't really matter since the app adjusts itself and automatically does the required corrections.<br> Based on the number of sessions missed, you might see no major change in the workout instructions or may see a significant alteration.</li></ul>"
                    },
                    {
                      "question": "Can I work offline, without network ?",
                      "answer": "<p>You can workout offline.</p>"
                    },
                    {
                      "question": "Can I share my data on social media?",
                      "answer": "<p>Yes, you can share from 'Session Summary' screens</p>"
                    },
                    {
                      "question": "I am unable to find the \"Start\" button in today's workout ?",
                      "answer": "<p>You will not see the START button if it's a completed session. You will see the date of your next session in the same screen.</p>"
                    },
                    {
                      "question": "Why don't I see any work out details in Today's workout screen.  It says Break day ?",
                      "answer": "<p>Depending on the program there will be rest days in a week / microcycle.  You will see the date of your next session in the same screen.</p>"
                    },
                    {
                      "question": "Do I see the plot of my parameters across all programs ?",
                      "answer": "<p>In the present version of the app, you will see your performance in the current program.  We will soon add the tools to plot your progress across all programs you have used in future versions of the App</p>"
                    },
                    {
                      "question": " I have an active program and subscribed to a new program with the intention of starting on a specific date. Can I reschedule or change the date once again?",
                      "answer": "<p>Yes, you can change the date of the new program. Go to Settings-->My subscription and change the start date of the next program.  When you reach that date, you need to activate the next program to start.  Once activated, you can not reschedule it.</p>"
                    }

                  ]
                };
  data: Array<{title: string, details: string, icon: string, showDetails: boolean}> = [];

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.preData='';
      this.faqsdataNew = this.faqsdata.faqs;
      for(var j=0; j<this.faqsdataNew.length; j++){
        this.data.push({
            title: this.faqsdataNew[j].question,
            details: this.faqsdataNew[j].answer,
            icon: 'ios-arrow-dropdown',
            showDetails: false
        })
      }
  }
  backButtonAction() {
    this.modalCtrl.dismiss();
  }
  toggleDetails(data) {
    if(this.preData!==''){
      this.preData.showDetails = false;
    }
    if (data.showDetails) {
        data.showDetails = false;
    } else {
        data.showDetails = true;
    }
    this.preData = data;
  }

}
