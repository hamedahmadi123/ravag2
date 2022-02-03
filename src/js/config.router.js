'use strict';

/**
 * Config for the router
 */
angular.module('app')
    .run(
        ['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    )
    .config(
        ['$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG',
            function ($stateProvider, $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
                var layout = "tpl/app.html";
                if (window.location.href.indexOf("material") > 0) {
                    layout = "tpl/blocks/material.layout.html";
                    $urlRouterProvider
                        .otherwise('/app/dashboard-v3');
                } else {
                    $urlRouterProvider
                        .otherwise('/app/dashboard-v1');
                }

                $stateProvider
                    .state('app', {
                        abstract: true,
                        url: '/app',
                        templateUrl: layout
                    })
                    //profailAdmin
                    .state('app.page.profailAdmin', {
                        url: '/profailAdmin',
                        templateUrl: 'tpl/_profile.html',
                        controller: 'profailAdmin',
                        resolve: load(['xeditable', 'js/controllers/_profileCtrl.js', 'ui.select'])
                    })

                    //test
                    .state('app.page.test', {
                        url: '/test',
                        templateUrl: 'tpl/test.html',
                        controller: 'testCTRL',
                        resolve: load(['xeditable', 'js/controllers/test.js', 'ui.select'])
                    })

                    //permission
                    .state('app.page.permission', {
                        url: '/permission',
                        templateUrl: 'tpl/_permission.html',
                        controller: 'permission',
                        resolve: load(['xeditable', 'js/controllers/_permissionCtrl.js'])
                    })
                    //role
                    .state('app.page.role', {
                        url: '/role',
                        templateUrl: 'tpl/_role.html',
                        controller: 'role',
                        resolve: load(['xeditable', 'js/controllers/_roleCtrl.js'])
                    })
                    ////////////////////////////////// print
                    //printClassList
                    .state('app.page.printClassList', {
                        url: '/printClassList/{mainId}/{teacherId}/{lessonId}',
                        templateUrl: 'tpl/print/_printClassList.html',
                        controller: 'printClassList',
                        resolve: load(['xeditable', 'js/controllers/print/_printClassList.js', 'ui.select'])
                    })
                    //printScoreList
                    .state('app.page.printScoreList', {
                        url: '/printScoreList/{mainId}/{teacherId}/{lessonId}',
                        templateUrl: 'tpl/print/_printScoreList.html',
                        controller: 'printScoreList',
                        resolve: load(['xeditable', 'js/controllers/print/_printScoreList.js', 'ui.select'])
                    })
                    //report_card_class
                    .state('app.page.report_card_class', {
                        url: '/report_card_class/{classid}',
                        templateUrl: 'tpl/print/_report_card_class.html',
                        controller: 'report_card_class',
                        resolve: load(['xeditable', 'js/controllers/print/_report_card_class.js', 'ui.select'])
                    })
                    //students_card
                    .state('app.page.students_card', {
                        url: '/students_card/{classid}',
                        templateUrl: 'tpl/print/_students_card_print.html',
                        controller: 'students_card',
                        resolve: load(['xeditable', 'js/controllers/print/_students_card_print.js', 'ui.select'])
                    })
                    //envelop_parrent
                    .state('app.page.envelop_parrent', {
                        url: '/envelop_parrent/{classid}',
                        templateUrl: 'tpl/print/_envelop_parrent.html',
                        controller: 'envelop_parrent',
                        resolve: load(['xeditable', 'js/controllers/print/_envelop_parrent.js', 'ui.select'])
                    })
                    ////////////////////////////////// print


                    ////////////////////////////////// main
                    //teacherClass
                    .state('app.page.teacherClass', {
                        url: '/teacherClass',
                        templateUrl: 'tpl/main/_teacherClass.html',
                        controller: 'teacherClass',
                        resolve: load(['xeditable', 'js/controllers/main/_teacherClass.js', 'ui.select'])
                    })
                    //ClassStudents
                    .state('app.page.ClassStudents', {
                        url: '/ClassStudents',
                        templateUrl: 'tpl/main/_ClassStudents.html',
                        controller: 'ClassStudents',
                        resolve: load(['xeditable', 'js/controllers/main/_ClassStudentsCtrl.js', 'ui.select'])
                    })
                    //ClassSchedule
                    .state('app.page.ClassSchedule', {
                        url: '/ClassSchedule/{userId}',
                        templateUrl: 'tpl/main/_ClassSchedule.html',
                        controller: 'ClassSchedule',
                        resolve: load(['xeditable', 'js/controllers/main/_ClassScheduleCtrl.js', 'ui.select'])
                    })
                    //Session
                    .state('app.page.Session', {
                        url: '/Session/{weeklid}/{date}',
                        templateUrl: 'tpl/main/_Session.html',
                        controller: 'Session',
                        resolve: load(['xeditable', 'js/controllers/main/_SessionCtrl.js', 'ui.select'])
                    })
                    //weeklyschedule
                    .state('app.page.weeklyschedule', {
                        url: '/weeklyschedule/{classid}',
                        templateUrl: 'tpl/main/_weeklyschedule.html',
                        controller: 'weeklyschedule',
                        resolve: load(['xeditable', 'js/controllers/main/_weeklyschedule.js', 'ui.select'])
                    })
                    //smsTemplate
                    .state('app.page.smsTemplate', {
                        url: '/smsTemplate',
                        templateUrl: 'tpl/main/_smsTemplate.html',
                        controller: 'smsTemplate',
                        resolve: load(['xeditable', 'js/controllers/main/_smsTemplate.js', 'ui.select'])
                    })
                    //sendSMS
                    .state('app.page.sendSMS', {
                        url: '/sendSMS/{classid}',
                        templateUrl: 'tpl/main/_sendSMS.html',
                        controller: 'sendSMS',
                        resolve: load(['xeditable', 'js/controllers/main/_sendSMS.js', 'ui.select'])
                    })
                    //sendSMS
                    .state('app.page.exportSnd', {
                        url: '/exportSnd',
                        templateUrl: 'tpl/main/_exportSnd.html',
                        controller: 'exportSnd',
                        resolve: load(['xeditable', 'js/controllers/main/_exportSnd.js', 'ui.select'])
                    })
                    //quizSchedule
                    .state('app.page.quizSchedule', {
                        url: '/quizSchedule',
                        templateUrl: 'tpl/main/_quizSchedule.html',
                        controller: 'quizSchedule',
                        resolve: load(['xeditable', 'js/controllers/main/_quizSchedule.js', 'ui.select'])
                    })
                    //quizSchedule_exam
                    .state('app.page.quizSchedule_exam', {
                        url: '/quizSchedule_exam/{examid}',
                        templateUrl: 'tpl/main/_quizSchedule_exam.html',
                        controller: 'quizSchedule_exam',
                        resolve: load(['xeditable', 'js/controllers/main/_quizSchedule_exam.js', 'ui.select'])
                    })
                    //Enzebat_student
                    .state('app.page.Enzebat_student', {
                        url: '/Enzebat_student',
                        templateUrl: 'tpl/main/_Enzebat_student.html',
                        controller: 'Enzebat_student',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_student.js', 'ui.select'])
                    })
                    //Enzebat_student_insert
                    .state('app.page.Enzebat_student_insert', {
                        url: '/Enzebat_student_insert',
                        templateUrl: 'tpl/main/_Enzebat_student_insert.html',
                        controller: 'Enzebat_student_insert',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_student_insert.js', 'ui.select'])
                    })
                    //Enzebat_student_update
                    .state('app.page.Enzebat_student_update', {
                        url: '/Enzebat_student_update/{disid}',
                        templateUrl: 'tpl/main/_Enzebat_student_update.html',
                        controller: 'Enzebat_student_update',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_student_update.js', 'ui.select'])
                    })
                    //Enzebat_teacher
                    .state('app.page.Enzebat_teacher', {
                        url: '/Enzebat_teacher',
                        templateUrl: 'tpl/main/_Enzebat_teacher.html',
                        controller: 'Enzebat_teacher',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_teacher.js', 'ui.select'])
                    })
                    //Enzebat_teacher_insert
                    .state('app.page.Enzebat_teacher_insert', {
                        url: '/Enzebat_teacher_insert',
                        templateUrl: 'tpl/main/_Enzebat_teacher_insert.html',
                        controller: 'Enzebat_teacher_insert',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_teacher_insert.js', 'ui.select'])
                    })
                    //Enzebat_teacher_update
                    .state('app.page.Enzebat_teacher_update', {
                        url: '/Enzebat_teacher_update/{disid}',
                        templateUrl: 'tpl/main/_Enzebat_teacher_update.html',
                        controller: 'Enzebat_teacher_update',
                        resolve: load(['xeditable', 'js/controllers/main/_Enzebat_teacher_update.js', 'ui.select'])
                    })
                    //teacher_option
                    .state('app.page.teacher_option', {
                        url: '/teacher_option',
                        templateUrl: 'tpl/main/_teacher_option.html',
                        controller: 'teacher_option',
                        resolve: load(['xeditable', 'js/controllers/main/_teacher_option.js', 'ui.select'])
                    })
                    //student_option
                    .state('app.page.student_option', {
                        url: '/student_option',
                        templateUrl: 'tpl/main/_student_option.html',
                        controller: 'student_option',
                        resolve: load(['xeditable', 'js/controllers/main/_student_option.js', 'ui.select'])
                    })
                    //attendanse
                    .state('app.page.attendanse', {
                        url: '/attendanse',
                        templateUrl: 'tpl/main/_attendanse.html',
                        controller: 'attendanse',
                        resolve: load(['xeditable', 'js/controllers/main/_attendanse.js', 'ui.select'])
                    })
                    ////////////////////////////////// main

                    ////////////////////////////////// mokamel_info
                    //blog
                    .state('app.page.blog', {
                        url: '/blog',
                        templateUrl: 'tpl/mokamel_info/_blog.html',
                        controller: 'blog',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_blog.js', 'ui.select'])
                    })
                    //wallet
                    .state('app.page.wallet', {
                        url: '/wallet',
                        templateUrl: 'tpl/mokamel_info/_wallet.html',
                        controller: 'wallet',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_wallet.js', 'ui.select'])
                    })
                    //wallet_insert
                    .state('app.page.wallet_insert', {
                        url: '/wallet_insert',
                        templateUrl: 'tpl/mokamel_info/_wallet_insert.html',
                        controller: 'wallet_insert',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_wallet_insert.js', 'ui.select'])
                    })
                    //wallet_select
                    .state('app.page.wallet_select', {
                        url: '/wallet_select',
                        templateUrl: 'tpl/mokamel_info/_wallet_select.html',
                        controller: 'wallet_select',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_wallet_select.js', 'ui.select'])
                    })
                    //wallet_edit
                    .state('app.page.wallet_edit', {
                        url: '/wallet_edit/{walid}',
                        templateUrl: 'tpl/mokamel_info/_walletEdit.html',
                        controller: 'wallet_edit',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_walletEdit.js', 'ui.select'])
                    })
                    //classWallet
                    .state('app.page.classWallet', {
                        url: '/classWallet',
                        templateUrl: 'tpl/mokamel_info/_classWallet.html',
                        controller: 'classWallet',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_classWallet.js', 'ui.select'])
                    })
                    //payBedehi
                    .state('app.page.payBedehi', {
                        url: '/payBedehi',
                        templateUrl: 'tpl/mokamel_info/_payBedehi.html',
                        controller: 'payBedehi',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_payBedehi.js', 'ui.select'])
                    })
                    //chequEdit
                    .state('app.page.chequEdit', {
                        url: '/chequEdit/{cheqid}',
                        templateUrl: 'tpl/mokamel_info/_chequEdit.html',
                        controller: 'chequEdit',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_chequEdit.js', 'ui.select'])
                    })
                    //allInWallet
                    .state('app.page.allInWallet', {
                        url: '/allInWallet',
                        templateUrl: 'tpl/mokamel_info/_allInWallet.html',
                        controller: 'allInWallet',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_allInWallet.js', 'ui.select'])
                    })
                    //pre_students
                    .state('app.page.pre_students', {
                        url: '/pre_students',
                        templateUrl: 'tpl/mokamel_info/_pre_students.html',
                        controller: 'pre_students',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_pre_students.js', 'ui.select'])
                    })
                    //students
                    .state('app.page.students', {
                        url: '/students',
                        templateUrl: 'tpl/mokamel_info/_students.html',
                        controller: 'students',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_studentsCtrl.js', 'ui.select'])
                    })
                    //insertStudent
                    .state('app.page.insertStudent', {
                        url: '/insertStudent',
                        templateUrl: 'tpl/mokamel_info/_students_insert.html',
                        controller: 'insertStudent',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_students_insert_Ctrl.js', 'ui.select'])
                    })
                    //Student_edit
                    .state('app.page.Student_edit', {
                        url: '/Student_edit/{userId}',
                        templateUrl: 'tpl/mokamel_info/_students_edit.html',
                        controller: 'Student_edit',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_students_edit_Ctrl.js', 'ui.select'])
                    })
                    //teachers
                    .state('app.page.teachers', {
                        url: '/teachers',
                        templateUrl: 'tpl/mokamel_info/_teachers.html',
                        controller: 'teachers',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_teachersCtrl.js', 'ui.select'])
                    })
                    //insertTheacher
                    .state('app.page.insertTheacher', {
                        url: '/insertTheacher',
                        templateUrl: 'tpl/mokamel_info/_teachers_insert.html',
                        controller: 'insertTheacher',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_teachers_insert_Ctrl.js', 'ui.select'])
                    })
                    //Theacher_edit
                    .state('app.page.Theacher_edit', {
                        url: '/Theacher_edit/{userId}',
                        templateUrl: 'tpl/mokamel_info/_teachers_edit.html',
                        controller: 'Theacher_edit',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_teachers_edit_Ctrl.js', 'ui.select'])
                    })
                    //class
                    .state('app.page.Class_Ctrl', {
                        url: '/Class_Ctrl',
                        templateUrl: 'tpl/mokamel_info/_class.html',
                        controller: 'Class_Ctrl',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_Class_Ctrl.js', 'ui.select'])
                    })
                    //class_insert
                    .state('app.page.class_insert', {
                        url: '/class_insert',
                        templateUrl: 'tpl/mokamel_info/_class_insert.html',
                        controller: 'class_insert',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_class_insert_Ctrl.js', 'ui.select'])
                    })
                    //class_edit
                    .state('app.page.class_edit', {
                        url: '/class_edit/{userId}',
                        templateUrl: 'tpl/mokamel_info/_class_edit.html',
                        controller: 'class_edit',
                        resolve: load(['xeditable', 'js/controllers/mokamel_info/_class_edit_Ctrl.js', 'ui.select'])
                    })

                    ////////////////////////////////// mokamel_info




// ---------------------------------------------------------------------------------------------------------------------

                    ////////////////////////////////// payeh info
                    //aboutBase ................ By Mohsen
                    .state('app.page.aboutBase', {
                        url: '/aboutBase/{majorbaseid}',
                        templateUrl: 'tpl/payeh_info/_aboutBase.html',
                        controller: 'aboutBase',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_aboutBase.js', 'ui.select'])
                    })
                    // By Mohsen End
                    //aboutMajor
                    .state('app.page.aboutMajor', {
                        url: '/aboutMajor/{majorbaseid}',
                        templateUrl: 'tpl/payeh_info/_aboutMajor.html',
                        controller: 'aboutMajor',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_aboutMajor.js', 'ui.select'])
                    })
                    //instructions
                    .state('app.page.instructions', {
                        url: '/instructions',
                        templateUrl: 'tpl/payeh_info/_instructions.html',
                        controller: 'instructions',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_instructions.js', 'ui.select'])
                    })
                    //payehCtrl
                    .state('app.page.payehCtrl', {
                        url: '/payehCtrl',
                        templateUrl: 'tpl/payeh_info/_payeh.html',
                        controller: 'payehCtrl',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_payehCtrl.js', 'ui.select'])
                    })
                    //dooros
                    .state('app.page.dooros', {
                        url: '/dooros',
                        templateUrl: 'tpl/payeh_info/_dooros.html',
                        controller: 'dooros',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_doorosCtrl.js', 'ui.select'])
                    })
                    //reshteh
                    .state('app.page.reshteh', {
                        url: '/reshteh',
                        templateUrl: 'tpl/payeh_info/_reshteh.html',
                        controller: 'reshteh',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_reshtehCtrl.js', 'ui.select'])
                    })
                    //termha
                    .state('app.page.termha', {
                        url: '/termha',
                        templateUrl: 'tpl/payeh_info/_termha.html',
                        controller: 'termha',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_termhaCtrl.js', 'ui.select'])
                    })
                    //termha insert
                    .state('app.page.termha_insert', {
                        url: '/termha_insert',
                        templateUrl: 'tpl/payeh_info/_term_insert.html',
                        controller: 'termha_insert',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_termha_insert_Ctrl.js', 'ui.select'])
                    })
                    //term_update
                    .state('app.page.term_update', {
                        url: '/term_update/{userId}',
                        templateUrl: 'tpl/payeh_info/_term_update.html',
                        controller: 'term_update',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_term_update_Ctrl.js', 'ui.select'])
                    })
                    //jalase
                    .state('app.page.jalase', {
                        url: '/jalase',
                        templateUrl: 'tpl/payeh_info/_jalase.html',
                        controller: 'jalase',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_jalaseCtrl.js', 'ui.select'])
                    })
                    //pointtype
                    .state('app.page.pointtype', {
                        url: '/pointtype',
                        templateUrl: 'tpl/payeh_info/_pointtype.html',
                        controller: 'pointtype',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_pointtypeCtrl.js', 'ui.select'])
                    })
                    //giftPoint
                    .state('app.page.giftPoint', {
                        url: '/giftPoint',
                        templateUrl: 'tpl/payeh_info/_giftPoint.html',
                        controller: 'giftPoint',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_giftPoint.js', 'ui.select'])
                    })
                    //madarek
                    .state('app.page.madarek', {
                        url: '/madarek',
                        templateUrl: 'tpl/payeh_info/_madarek.html',
                        controller: 'madarek',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_madarekCtrl.js', 'ui.select'])
                    })
                    //enzebat_students
                    .state('app.page.enzebat_students', {
                        url: '/enzebat_students',
                        templateUrl: 'tpl/payeh_info/_enzebat_students.html',
                        controller: 'enzebat_students',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_enzebat_students_Ctrl.js', 'ui.select'])
                    })
                    //enzebat_teacher
                    .state('app.page.enzebat_teacher', {
                        url: '/enzebat_teacher',
                        templateUrl: 'tpl/payeh_info/_enzebat_teacher.html',
                        controller: 'enzebat_teacher',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_enzebat_teacher_Ctrl.js', 'ui.select'])
                    })
                    //class_fizikiCtrl
                    .state('app.page.class_fizikiCtrl', {
                        url: '/class_fizikiCtrl',
                        templateUrl: 'tpl/payeh_info/_class_fiziki.html',
                        controller: 'class_fizikiCtrl',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_class_fizikiCtrl.js', 'ui.select'])
                    })
                    //TimeCtrl
                    .state('app.page.TimeCtrl', {
                        url: '/TimeCtrl',
                        templateUrl: 'tpl/payeh_info/_Time.html',
                        controller: 'TimeCtrl',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_TimeCtrl.js', 'ui.select'])
                    })
                    //schoolCtrl
                    .state('app.page.schoolCtrl', {
                        url: '/schoolCtrl',
                        templateUrl: 'tpl/payeh_info/_school.html',
                        controller: 'schoolCtrl',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_schoolCtrl.js', 'ui.select'])
                    })
                    //school_insert
                    .state('app.page.school_insert', {
                        url: '/school_insert',
                        templateUrl: 'tpl/payeh_info/_school_insert.html',
                        controller: 'school_insert',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_school_insert_Ctrl.js', 'ui.select'])
                    })
                    //school_update
                    .state('app.page.school_update', {
                        url: '/school_update/{userId}',
                        templateUrl: 'tpl/payeh_info/_school_update.html',
                        controller: 'school_update',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_school_update_Ctrl.js', 'ui.select'])
                    })
                    //majorbase
                    .state('app.page.majorbase', {
                        url: '/majorbase',
                        templateUrl: 'tpl/payeh_info/_majorbase.html',
                        controller: 'majorbase',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_majorbaseCtrl.js', 'ui.select'])
                    })
                    //majorbase_insert
                    .state('app.page.majorbase_insert', {
                        url: '/majorbase_insert/{userId}',
                        templateUrl: 'tpl/payeh_info/_majorbase_insert.html',
                        controller: 'majorbase_insert',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_majorbase_insert_Ctrl.js', 'ui.select'])
                    })
                    ////////////////////////////////// payeh info


                    //Setting
                    .state('app.page.Setting', {
                        url: '/Setting',
                        templateUrl: 'tpl/_Settings.html',
                        controller: 'Setting',
                        resolve: load(['xeditable', 'js/controllers/_SettingCtrl.js', 'ui.select'])
                    })
                    //wizard
                    .state('app.page.wizard', {
                        url: '/wizard',
                        templateUrl: 'tpl/payeh_info/_wizard.html',
                        controller: 'wizard',
                        resolve: load(['xeditable', 'js/controllers/payeh_info/_wizard.js', 'ui.select'])
                    })

                    //SupportPage
                    .state('app.page.SupportPage', {
                        url: '/SupportPage',
                        templateUrl: 'tpl/_SupportPage.html',
                    })
                    ////////////////////////////////// other
                    .state('app.page.carousel', {
                        url: '/carousel',
                        templateUrl: 'tpl/_ui_bootstrap.html'
                    })


                    .state('app.dashboard-v1', {
                        url: '/dashboard-v1',
                        templateUrl: 'tpl/app_dashboard_v1.html',
                        controller: 'dashboardCtrl',
                        resolve: load(['js/controllers/_Chart.js', 'js/controllers/dashboard.js'])
                    })
                    .state('app.categories', {
                        url: '/categories',
                        templateUrl: 'tpl/_categories.html',
                        controller: 'categoriesCtrl',
                        resolve: load(['js/controllers/iorders.js'])
                    })
                    .state('app.dashboard-v2', {
                        url: '/dashboard-v2',
                        templateUrl: 'tpl/app_dashboard_v2.html',
                        resolve: load(['js/controllers/_Chart.js'])
                    })
                    .state('app.dashboard-v3', {
                        url: '/dashboard-v3',
                        templateUrl: 'tpl/app_dashboard_v3.html',
                        resolve: load(['js/controllers/_Chart.js'])
                    })
                    .state('app.ui', {
                        url: '/ui',
                        template: '<div ui-view class="fade-in-up"></div>'
                    })

                    .state('app.ui.buttons', {
                        url: '/buttons',
                        templateUrl: 'tpl/ui_buttons.html'
                    })
                    .state('app.ui.icons', {
                        url: '/icons',
                        templateUrl: 'tpl/ui_icons.html'
                    })
                    .state('app.ui.grid', {
                        url: '/grid',
                        templateUrl: 'tpl/ui_grid.html'
                    })
                    .state('app.ui.widgets', {
                        url: '/widgets',
                        templateUrl: 'tpl/ui_widgets.html'
                    })
                    .state('app.ui.bootstrap', {
                        url: '/bootstrap',
                        templateUrl: 'tpl/ui_bootstrap.html'
                    })
                    .state('app.ui.sortable', {
                        url: '/sortable',
                        templateUrl: 'tpl/ui_sortable.html'
                    })
                    .state('app.ui.scroll', {
                        url: '/scroll',
                        templateUrl: 'tpl/ui_scroll.html',
                        resolve: load('js/controllers/scroll.js')
                    })
                    .state('app.ui.portlet', {
                        url: '/portlet',
                        templateUrl: 'tpl/ui_portlet.html'
                    })
                    .state('app.ui.timeline', {
                        url: '/timeline',
                        templateUrl: 'tpl/ui_timeline.html'
                    })
                    .state('app.ui.tree', {
                        url: '/tree',
                        templateUrl: 'tpl/ui_tree.html',
                        resolve: load(['angularBootstrapNavTree', 'js/controllers/tree.js'])
                    })
                    .state('app.ui.toaster', {
                        url: '/toaster',
                        templateUrl: 'tpl/ui_toaster.html',
                        resolve: load(['toaster', 'js/controllers/toaster.js'])
                    })
                    .state('app.ui.jvectormap', {
                        url: '/jvectormap',
                        templateUrl: 'tpl/ui_jvectormap.html',
                        resolve: load('js/controllers/vectormap.js')
                    })
                    .state('app.ui.googlemap', {
                        url: '/googlemap',
                        templateUrl: 'tpl/ui_googlemap.html',
                        resolve: load(['js/app/map/load-google-maps.js', 'js/app/map/ui-map.js', 'js/app/map/map.js'], function () {
                            return loadGoogleMaps();
                        })
                    })
                    .state('app.chart', {
                        url: '/chart',
                        templateUrl: 'tpl/ui_chart.html',
                        resolve: load('js/controllers/_Chart.js')
                    })
                    // table
                    .state('app.table', {
                        url: '/table',
                        template: '<div ui-view></div>'
                    })
                    .state('app.table.static', {
                        url: '/static',
                        templateUrl: 'tpl/table_static.html'
                    })
                    .state('app.table.datatable', {
                        url: '/datatable',
                        templateUrl: 'tpl/table_datatable.html'
                    })
                    .state('app.table.footable', {
                        url: '/footable',
                        templateUrl: 'tpl/table_footable.html'
                    })
                    .state('app.table.grid', {
                        url: '/grid',
                        templateUrl: 'tpl/table_grid.html',
                        resolve: load(['ngGrid', 'js/controllers/grid.js'])
                    })
                    .state('app.table.uigrid', {
                        url: '/uigrid',
                        templateUrl: 'tpl/table_uigrid.html',
                        resolve: load(['ui.grid', 'js/controllers/uigrid.js'])
                    })
                    .state('app.table.editable', {
                        url: '/editable',
                        templateUrl: 'tpl/table_editable.html',
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', 'js/controllers/_OrderCtrl.js'])
                    })
                    .state('app.table.smart', {
                        url: '/smart',
                        templateUrl: 'tpl/table_smart.html',
                        resolve: load(['smart-table', 'js/controllers/table.js'])
                    })
                    // form
                    .state('app.form', {
                        url: '/form',
                        template: '<div ui-view class="fade-in"></div>',
                        resolve: load('js/controllers/form.js')
                    })
                    .state('app.form.components', {
                        url: '/components',
                        templateUrl: 'tpl/form_components.html',
                        resolve: load(['ngBootstrap', 'daterangepicker', 'js/controllers/form.components.js'])
                    })
                    .state('app.form.elements', {
                        url: '/elements',
                        templateUrl: 'tpl/form_elements.html'
                    })
                    .state('app.form.validation', {
                        url: '/validation',
                        templateUrl: 'tpl/form_validation.html'
                    })
                    .state('app.form.wizard', {
                        url: '/wizard',
                        templateUrl: 'tpl/form_wizard.html'
                    })
                    .state('app.form.fileupload', {
                        url: '/fileupload',
                        templateUrl: 'tpl/form_fileupload.html',
                        resolve: load(['angularFileUpload', 'js/controllers/file-upload.js'])
                    })
                    .state('app.form.imagecrop', {
                        url: '/imagecrop',
                        templateUrl: 'tpl/form_imagecrop.html',
                        resolve: load(['ngImgCrop', 'js/controllers/imgcrop.js'])
                    })
                    .state('app.form.select', {
                        url: '/select',
                        templateUrl: 'tpl/form_select.html',
                        controller: 'SelectCtrl',
                        resolve: load(['ui.select', 'js/controllers/select.js'])
                    })
                    .state('app.form.slider', {
                        url: '/slider',
                        templateUrl: 'tpl/form_slider.html',
                        controller: 'SliderCtrl',
                        resolve: load(['vr.directives.slider', 'js/controllers/slider.js'])
                    })
                    .state('app.form.editor', {
                        url: '/editor',
                        templateUrl: 'tpl/form_editor.html',
                        controller: 'EditorCtrl',
                        resolve: load(['textAngular', 'js/controllers/editor.js'])
                    })
                    .state('app.form.xeditable', {
                        url: '/xeditable',
                        templateUrl: 'tpl/form_xeditable.html',
                        controller: 'XeditableCtrl',
                        resolve: load(['xeditable', 'js/controllers/_OrderCtrl.js'])
                    })
                    // pages
                    .state('app.page', {
                        url: '/page',
                        template: '<div ui-view class="fade-in-down"></div>'
                    })
                    .state('app.page.profile', {
                        url: '/profile',
                        templateUrl: 'tpl/page_profile.html'
                    })
                    .state('app.page.post', {
                        url: '/post',
                        templateUrl: 'tpl/page_post.html'
                    })
                    .state('app.page.search', {
                        url: '/search',
                        templateUrl: 'tpl/page_search.html'
                    })
                    .state('app.page.invoice', {
                        url: '/invoice',
                        templateUrl: 'tpl/page_invoice.html'
                    })
                    .state('app.page.price', {
                        url: '/price',
                        templateUrl: 'tpl/page_price.html'
                    })
                    .state('app.docs', {
                        url: '/docs',
                        templateUrl: 'tpl/docs.html'
                    })
                    // others
                    .state('lockme', {
                        url: '/lockme',
                        templateUrl: 'tpl/page_lockme.html'
                    })
                    .state('access', {
                        url: '/access',
                        template: '<div ui-view class="fade-in-right-big smooth"></div>'
                    })
                    .state('access.signin', {
                        url: '/signin',
                        templateUrl: 'tpl/page_signin.html',
                        resolve: load(['js/controllers/signin.js'])
                    })
                    .state('access.signup', {
                        url: '/signup',
                        templateUrl: 'tpl/page_signup.html',
                        resolve: load(['js/controllers/signup.js'])
                    })
                    .state('access.forgotpwd', {
                        url: '/forgotpwd',
                        templateUrl: 'tpl/page_forgotpwd.html'
                    })
                    .state('access.404', {
                        url: '/404',
                        templateUrl: 'tpl/page_404.html'
                    })

                    // fullCalendar
                    .state('app.calendar', {
                        url: '/calendar',
                        templateUrl: 'tpl/app_calendar.html',
                        // use resolve to load other dependences
                        resolve: load(['moment', 'fullcalendar', 'ui.calendar', 'js/app/calendar/calendar.js'])
                    })

                    // mail
                    .state('app.mail', {
                        abstract: true,
                        url: '/mail',
                        templateUrl: 'tpl/mail.html',
                        // use resolve to load other dependences
                        resolve: load(['js/app/mail/mail.js', 'js/app/mail/mail-service.js', 'moment'])
                    })
                    .state('app.mail.list', {
                        url: '/inbox/{fold}',
                        templateUrl: 'tpl/mail.list.html'
                    })
                    .state('app.mail.detail', {
                        url: '/{mailId:[0-9]{1,4}}',
                        templateUrl: 'tpl/mail.detail.html'
                    })
                    .state('app.mail.compose', {
                        url: '/compose',
                        templateUrl: 'tpl/mail.new.html'
                    })

                    .state('layout', {
                        abstract: true,
                        url: '/layout',
                        templateUrl: 'tpl/layout.html'
                    })
                    .state('layout.fullwidth', {
                        url: '/fullwidth',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_fullwidth.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: load(['js/controllers/vectormap.js'])
                    })
                    .state('layout.mobile', {
                        url: '/mobile',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_mobile.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_mobile.html'
                            }
                        }
                    })
                    .state('layout.app', {
                        url: '/app',
                        views: {
                            '': {
                                templateUrl: 'tpl/layout_app.html'
                            },
                            'footer': {
                                templateUrl: 'tpl/layout_footer_fullwidth.html'
                            }
                        },
                        resolve: load(['js/controllers/tab.js'])
                    })
                    .state('apps', {
                        abstract: true,
                        url: '/apps',
                        templateUrl: 'tpl/layout.html'
                    })
                    .state('apps.note', {
                        url: '/note',
                        templateUrl: 'tpl/apps_note.html',
                        resolve: load(['js/app/note/note.js', 'moment'])
                    })

                    // .state('apps.Experts', {
                    //     url: '/Experts',
                    //     templateUrl: 'tpl/_Experts.html',
                    //     controller: 'ScrollController2',
                    //     resolve: load([ 'js/controllers/_ExpertsCtrl.js'])
                    // })


                    .state('apps.contact', {
                        url: '/contact',
                        templateUrl: 'tpl/apps_contact.html',
                        resolve: load(['js/app/contact/contact.js'])
                    })
                    .state('app.weather', {
                        url: '/weather',
                        templateUrl: 'tpl/apps_weather.html',
                        resolve: load(['js/app/weather/skycons.js', 'angular-skycons', 'js/app/weather/ctrl.js', 'moment'])
                    })
                    .state('app.todo', {
                        url: '/todo',
                        templateUrl: 'tpl/apps_todo.html',
                        resolve: load(['js/app/todo/todo.js', 'moment'])
                    })
                    .state('app.todo.list', {
                        url: '/{fold}'
                    })
                    .state('app.note', {
                        url: '/note',
                        templateUrl: 'tpl/apps_note_material.html',
                        resolve: load(['js/app/note/note.js', 'moment'])
                    })
                    .state('music', {
                        url: '/music',
                        templateUrl: 'tpl/music.html',
                        controller: 'MusicCtrl',
                        resolve: load([
                            'com.2fdevs.videogular',
                            'com.2fdevs.videogular.plugins.controls',
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'js/app/music/ctrl.js',
                            'js/app/music/theme.css'
                        ])
                    })
                    .state('music.home', {
                        url: '/home',
                        templateUrl: 'tpl/music.home.html'
                    })
                    .state('music.genres', {
                        url: '/genres',
                        templateUrl: 'tpl/music.genres.html'
                    })
                    .state('music.detail', {
                        url: '/detail',
                        templateUrl: 'tpl/music.detail.html'
                    })
                    .state('music.mtv', {
                        url: '/mtv',
                        templateUrl: 'tpl/music.mtv.html'
                    })
                    .state('music.mtvdetail', {
                        url: '/mtvdetail',
                        templateUrl: 'tpl/music.mtv.detail.html'
                    })
                    .state('music.playlist', {
                        url: '/playlist/{fold}',
                        templateUrl: 'tpl/music.playlist.html'
                    })
                    .state('app.material', {
                        url: '/material',
                        template: '<div ui-view class="wrapper-md"></div>',
                        resolve: load(['js/controllers/material.js'])
                    })
                    .state('app.material.button', {
                        url: '/button',
                        templateUrl: 'tpl/material/button.html'
                    })
                    .state('app.material.color', {
                        url: '/color',
                        templateUrl: 'tpl/material/color.html'
                    })
                    .state('app.material.icon', {
                        url: '/icon',
                        templateUrl: 'tpl/material/icon.html'
                    })
                    .state('app.material.card', {
                        url: '/card',
                        templateUrl: 'tpl/material/card.html'
                    })
                    .state('app.material.form', {
                        url: '/form',
                        templateUrl: 'tpl/material/form.html'
                    })
                    .state('app.material.list', {
                        url: '/list',
                        templateUrl: 'tpl/material/list.html'
                    })
                    .state('app.material.ngmaterial', {
                        url: '/ngmaterial',
                        templateUrl: 'tpl/material/ngmaterial.html'
                    })
                ;

                function load(srcs, callback) {
                    return {
                        deps: ['$ocLazyLoad', '$q',
                            function ($ocLazyLoad, $q) {
                                var deferred = $q.defer();
                                var promise = false;
                                srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                                if (!promise) {
                                    promise = deferred.promise;
                                }
                                angular.forEach(srcs, function (src) {
                                    promise = promise.then(function () {
                                        if (JQ_CONFIG[src]) {
                                            return $ocLazyLoad.load(JQ_CONFIG[src]);
                                        }
                                        angular.forEach(MODULE_CONFIG, function (module) {
                                            if (module.name == src) {
                                                name = module.name;
                                            } else {
                                                name = src;
                                            }
                                        });
                                        return $ocLazyLoad.load(name);
                                    });
                                });
                                deferred.resolve();
                                return callback ? promise.then(function () {
                                    return callback();
                                }) : promise;
                            }]
                    }
                }


            }
        ]
    );
