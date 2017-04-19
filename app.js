(
    function () {

        angular.module ('mainModule', [])
               .controller ('InputController', InputController)
               .service ('SentenceProcessingService', SentenceProcessingService);


        InputController.$inject = ['SentenceProcessingService'];
        function InputController(SentenceProcessingService) {
            var inputCtrl = this;
            inputCtrl.categories = [];
            inputCtrl.options = [];
            inputCtrl.showOptions = false;
            inputCtrl.showSentences = false;
            inputCtrl.sentences = [];
            inputCtrl.userSentence = "Above Grade Level [delivery method] quality tutoring assistance with some of the best [subject] tutors in [location].";


            inputCtrl.submitSentence = function () {
                SentenceProcessingService.defineCategories (inputCtrl.userSentence);
                inputCtrl.showOptions = true;
                inputCtrl.categories = SentenceProcessingService.getCategories ();
            };

            inputCtrl.createSentences = function () {

                SentenceProcessingService.addCategoryOptions (inputCtrl.options);
                // inputCtrl.categories = SentenceProcessingService.getCategories ();
                inputCtrl.sentences = SentenceProcessingService.generateSentences (inputCtrl.userSentence);
                inputCtrl.showSentences = true;
                console.log ('cat with options= ', inputCtrl.categories);
            }
        }


        function SentenceProcessingService() {
            var service = this;
            var categories = [];
            var sentences = [];

            service.defineCategories = function (sentence) {

                var categoriesArray = [];
                var obj2 = [];
                categoriesArray = sentence.match (/[^[\]]+(?=])/g);
                //   /[^[\]]+(?=])/g


                obj2.push (categoriesArray.map (function (item) {
                    var obj = {};
                    obj = {categoryName: item};
                    console.log ('obj= ', obj);
                    return obj;
                }));

                categories = obj2[0];
            };

            service.getCategories = function () {
                return categories;
            };

            service.addCategoryOptions = function (options) {

                for (var i = 0; i < options.length; i++) {
                    var categoryOptions = [];
                    categories[i].categoryOptions = [];

                    categoryOptions = options[i].split ('\n');
                    categories[i].categoryOptions = categoryOptions;
                }
            };

            service.generateSentences = function (userSentence) {

                var changedSentences = [];
                var tempSentences = [];
                tempSentences.push (userSentence);

                sentences[0] = 'temp sentence';

                for (var n = 0; n < categories.length; n++) {
                    // categories[n].categoryName;
                    tempSentences = replaceCategoryWithOptions (categories[n], tempSentences);

                }

                console.log ('tempSentences=', tempSentences);
                sentences = tempSentences;
                return sentences;
            };

            var replaceCategoryWithOptions = function (category, tempSentences) {
                var temSentence2 = [];

                for (var m = 0; m < tempSentences.length; m++) {
                    for (var b = 0; b < category.categoryOptions.length; b++) {
                        temSentence2.push (tempSentences[m].replace ('[' + category.categoryName + ']', category.categoryOptions[b]));
                    }
                }
                return temSentence2;
            }

        }

    }
) ();