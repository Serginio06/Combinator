/**
 * Created by sergiiivanchenko on 12/04/2017.
 */
(
    function () {
        "use strict";

        angular.module ('combinatorMdl', [])
               .controller ('InputController', InputController)
               .service ('sentenceAnalysisService', sentenceAnalysisService);


        InputController.$inject = ['sentenceAnalysisService'];

        function InputController(sentenceAnalysisService) {
            var inputCtrl = this;
            inputCtrl.isSentenceSubmited = false;
            inputCtrl.showOptions = false;
            inputCtrl.categoryOptions = [[""]];
            inputCtrl.categories = [];
            inputCtrl.sentencesOptions = [];


            inputCtrl.userSentence = "Above Grade Level [delivery method] quality tutoring assistance with some of the best [subject] tutors in [location].";

            inputCtrl.clearOptions = function () {
                inputCtrl.isSentenceSubmited = false;
                inputCtrl.showOptions = false;
                inputCtrl.categoryOptions = [[""]];

                while (inputCtrl.categories.length > 0) {
                    inputCtrl.categories.pop ();
                }
                while (inputCtrl.sentencesOptions.length > 0) {
                    inputCtrl.sentencesOptions.pop ();
                }
            };


            inputCtrl.SubmitSentence = function () {
                if (inputCtrl.userSentence) {

                    inputCtrl.categories = sentenceAnalysisService.getCatergories (inputCtrl.userSentence);
                    initOptionsArray (inputCtrl.categories);
                    inputCtrl.isSentenceSubmited = true;
                }
            };

            inputCtrl.SubmitOptions = function () {
                console.log (inputCtrl.categories);
                inputCtrl.showOptions = true;
                // inputCtrl.sentencesOptions = sentenceAnalysisService.createSentencesOptions (inputCtrl.userSentence, inputCtrl.categories);

            };

            inputCtrl.addOption = function (categoryIndex, optionValue) {

                inputCtrl.categories[categoryIndex].categoryValues.push (optionValue);
                inputCtrl.categoryOptions[categoryIndex].push (optionValue);

                console.log (inputCtrl.categories[categoryIndex]);
            };

            var initOptionsArray = function (categoriesArray) {
                for (var i = 0; i < inputCtrl.categories.length; i++) {
                    inputCtrl.categories[i].categoryValues = [];
                    inputCtrl.categoryOptions[i] = [""];
                }
            };


        }


        function sentenceAnalysisService() {
            var service = this;
            var categoriesObj = [];
            var sentencesOptions = [];

            service.getCatergories = function (sentence) {

                var categorisArray = sentence.match (/[^[\]]+(?=])/g);


                for (var i = 0; i < categorisArray.length; i++) {
                    var obj = {categoryName: categorisArray[i]};
                    categoriesObj.push (obj);

                }
                console.log (categoriesObj);
                return categoriesObj;
            };

            service.createSentencesOptions = function (sentence, categories) {

                sentencesOptions.push (sentence);
                
                for (var i = 0; i < categories.length; i++) {
                    // categories[i].categoryName;

                    for (var n = 0; n < categories[i].categoryValues.length; n++) {
                       // [n];
                        var res = sentence.replace("["+categories[i].categoryName+"]", "---OPTION---");
                        console.log(res);

                    }


                  
                }
                
                return sentencesOptions;
            }


        }

    }
) ();