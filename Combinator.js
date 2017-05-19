/**
 * Created by sergiiivanchenko on 12/04/2017.
 */
(
    function () {
        // "use strict";

        angular.module ('combinatorModule', [])
               .controller ('inputDataCtrl', inputDataCtrl)
               .controller ('optionAndResultCtrl', optionAndResultCtrl)
               .service ('dataService', dataService);


// ==============inputDataCtrl ====================
        inputDataCtrl.$inject = ['dataService'];
        function inputDataCtrl(dataService) {
            var inputCtrl = this;
            inputCtrl.categoriesIsShown = false;

            inputCtrl.sentence = dataService.getDefaultSentence ();
            // inputCtrl.sentence = 'asdf';

            inputCtrl.defineCategories = function () {
                dataService.defineCategories ();
                inputCtrl.categoriesIsShown = true;
                // inputCtrl.categories = dataService.getCategories ();

            }
        }

// ==============optionAndResultCtrl ===============
        optionAndResultCtrl.$inject = ['dataService'];
        function optionAndResultCtrl(dataService) {
            var resultCtrl = this;
            resultCtrl.showSentences = false;
            resultCtrl.options = [];

            resultCtrl.categories = dataService.getCategories ();

            resultCtrl.applyOptionsToCategories = function () {
                // console.log('resultCtrl.options', resultCtrl.options);


                console.log ('return=', dataService.applyOptionsToCategories (resultCtrl.options));

                if (!dataService.applyOptionsToCategories (resultCtrl.options)) {
                    resultCtrl.showSentences = true;
                    resultCtrl.combinedSentences = dataService.combineSentences ();

                } else {
                    alert ('not all options indicated');
                }


            }


        }


// =============== SERVICES  ======================
        function dataService() {
            var service = this;
            var sentenceObj = {};


            // var cleanSentenceObj = function () {
            sentenceObj.text = '';
            sentenceObj.categories = [];

            // };

            service.getDefaultSentence = function () {
                sentenceObj.text = 'Above Grade Level [delivery method] quality tutoring assistance with some of the best [subject] tutors in [location].';
                return sentenceObj.text
            };

            service.setSentence = function (sentence) {
                sentenceObj.text = sentence;
                console.log ('Sentence set');
            };

            service.defineCategories = function () {
                var regEx = /[^[\]]+(?=])/g;
                var categories = [];

                categories = sentenceObj.text.match (regEx);

                for (var n = 0; n < categories.length; n++) {
                    pushCateoryToObj (categories[n]);

                }

                // console.log ('sentenceObj.categories: ', sentenceObj.categories);

            };

            var pushCateoryToObj = function (categoryNameToPush) {
                var obj = {};
                obj.name = categoryNameToPush;
                obj.options = [];

                sentenceObj.categories.push (obj);
            };

            service.getCategories = function () {
                return sentenceObj.categories;
            };

            service.applyOptionsToCategories = function (options) {
                var optionsArray = [];

                if (options.length < sentenceObj.categories.length) {
                    // console.log ('not all options defined');
                    return 'not all options defined';
                }

                for (var n = 0; n < options.length; n++) {
                    optionsArray = options[n].split ('\n');
                    sentenceObj.categories[n].options = optionsArray;
                }
                console.log ('sentenceObj.categories', sentenceObj.categories);
                return '';

            };

            service.combineSentences = function () {
                var initialArrayOfSentences = [];
                var finalArrOfSentences = [];
                initialArrayOfSentences.push (sentenceObj.text);

                for (var n = 0; n < sentenceObj.categories.length; n++) {
                    finalArrOfSentences = getSentencesCombination (initialArrayOfSentences, sentenceObj.categories[n].name, sentenceObj.categories[n].options);
                    initialArrayOfSentences = finalArrOfSentences;

                }

                console.log ('finalArrOfSentences', finalArrOfSentences);
                return finalArrOfSentences;


            };

            var getSentencesCombination = function (sentences, category, options) {
                var resultArray = [];

                console.log ('category=', category);

                for (var n = 0; n < sentences.length; n++) {
                    sentences[n];

                    for (var m = 0; m < options.length; m++) {
                        options[m];
                        resultArray.push (sentences[n].replace (category, options[m]));

                    }

                }

                return resultArray;

            }


        }


    }
) ();

