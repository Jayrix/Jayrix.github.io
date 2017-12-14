document.addEventListener('DOMContentLoaded', function() {

    //ten skrypt obciaza troche procka mimo ze iteruje 0.111 zamiast 0.001

    var socialCounters = document.querySelectorAll('.social-counter span');
    var span0 = Number(socialCounters[0].textContent.replace(',','.'));
    var span1 = Number(socialCounters[1].textContent.replace(',','.'));
    var span2 = Number(socialCounters[2].textContent.replace(',','.'));


    //animacje counterow trwaja mniej wiecej tyle samo (ok. 5 sekund) niezaleznie od liczby w przykladowym projekcie wiec musimy wyliczyc stosunek potrzebnych iteracji o 0.111 do czasu trwania animacji
    var span0IntervalDelay = 5000 / (span0 / 0.111);
    var span1IntervalDelay = 5000 / (span1 / 0.111);
    var span2IntervalDelay = 5000 / (span2 / 0.111);

    var counter0 = 0;
    var counter1 = 0;
    var counter2 = 0;

    var setIntervalId0 = setInterval(function(){
        counter0+=0.111;
        //wywalamy znaki bedace dalej niz 3 po przecinku i zastepujemy ulamkowa kropke przecinkiem
        socialCounters[0].textContent = counter0.toString().substring(0, counter0.toString().indexOf('.') + 4).replace('.',',');
        if(counter0 > span0){
            clearInterval(setIntervalId0);
            //wyliczenia nie sa celne co do 0.001 wiec pod koniec animacji i tak podstawiamy okreslona w htmlu wartosc
            socialCounters[0].textContent = span0.toString().replace('.',',');
        }
    }, span0IntervalDelay);

    var setIntervalId1 = setInterval(function(){
        counter1+=0.111;
        socialCounters[1].textContent = counter1.toString().substring(0, counter1.toString().indexOf('.') + 4).replace('.',',');
        if(counter1 > span1){
            clearInterval(setIntervalId1);
            socialCounters[1].textContent = span1.toString().replace('.',',');
        }
    }, span1IntervalDelay);

    var setIntervalId2 = setInterval(function(){
        counter2+=0.111;
        socialCounters[2].textContent = counter2.toString().substring(0, counter2.toString().indexOf('.') + 4).replace('.',',');
        if(counter2 > span2){
            clearInterval(setIntervalId2);
            //wyliczenia nie sa celne co do 0.001 wiec pod koniec animacji i tak podstawiamy okreslona w htmlu wartosc
            socialCounters[2].textContent = span2.toString().replace('.',',');
        }
    }, span2IntervalDelay);


});
