let input_form = document.querySelector('myform')
let submit = document.querySelector('#sbmt')
let number1 = document.querySelector('#number1')
let number2 = document.querySelector('#number2')
let sum, diff, product, division;


submit.addEventListener('click', (e)=>{
    e.preventDefault();
    document.getElementById("number1").style.border = "";
    document.getElementById("number2").style.border = "";
    if((number1.value !== '') && (number2.value !== '')){
        sum = number1.value + number2.value;
        diff = number1.value - number2.value;
        product = number1.value * number2.value;
        division = number1.value / number2.value;

        document.querySelector('.result').innerHTML = "<h1>The result is therefore: <h1> ";
        document.querySelector('.result').innerHTML  += (`sum = ${sum}` + "<br>");
        document.querySelector('.result').innerHTML  += (`diff = ${diff}` + "<br>");
        document.querySelector('.result').innerHTML  += (`product = ${product}` + "<br>");
        document.querySelector('.result').innerHTML  += (`division = ${division}` + "<br>");
    }
    else if((number1.value == '')&&(number2.value == '')){
        document.getElementById("number1").style.border = "solid red";
        document.getElementById("number2").style.border = "solid red";
        document.querySelector('.result').innerHTML = "Please input the required fields (in red): <br>";
    }
    else if(number1.value == ''){
        document.getElementById("number1").style.border = "solid red";
        document.querySelector('.result').innerHTML = "Please input the required fields (in red): <br>";
    }
    else{
        document.getElementById("number2").style.border = "solid red";
        document.querySelector('.result').innerHTML = "Please input the required fields (in red): <br>";
    }
})


