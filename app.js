/**
 * Created by sergiiivanchenko on 12/04/2017.
 */
(
    function () {
        "use strict";

        angular.module ('combinatorMdl',[])
               .controller ('InputController', InputController)
               .service ('sentenceAnalysisService', sentenceAnalysisService);


        InputController.$inject = ['sentenceAnalysisService'];

        function InputController(sentenceAnalysisService) {
            var inputCtrl = this;
            inputCtrl.isSentenceSubmited = false;
            inputCtrl.showOptions = false;


        }


        function sentenceAnalysisService() {
            var service = this;



        }

    }
) ();