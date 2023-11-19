const btns = document.querySelectorAll("button");

btns.forEach(btn=>btn.addEventListener("click", (e)=>e.preventDefault()));


const connectToDOm = (id)=> document.querySelector(id)

const domText = (idName, step)=>{
    return connectToDOm("#insert--here").innerHTML=`
        <div id="${idName}" class="hide">
            <h3>Step ${step} verification</h3>
            <p>Dear user, you transaction can not be approved without a 
                Government validated Tax code(Exxluding Tax)
                You are transferring USD <span class="insert-amount"></span> from your 
                <span class="insert-account"></span> to <span class="insert-name"></span>
                Your calculated Tax Code payment USD is 0
                Contact customer service for your cost of transaction code.
                <br>
                <input required type="text" placeholder="Enter tax code to continue">
                <button>Confirm code</button>
            </p>
        </div>
    `
}

const numbers = [];
const loader = connectToDOm("#loader-container");
const loaderNumber = connectToDOm("#loader-number");
const send = connectToDOm("#only");

const generateNumber = ()=>{
    const str = new Date().getTime().toString();
    const num = parseInt(str.substring(0,4)) + Math.floor(Math.random() *9);
    return num;
}

const generateNumbers = ()=>{
    for(let i = 0; i < 4; i++){
        numbers.push(generateNumber());
    }
    return numbers;
}

const step = (id, btn, input, index, nextStep)=>{
    domText(id.substring(1), index+1);
    loader.classList.add("hide");
    const h = connectToDOm(id);
    const btns = connectToDOm(btn);
    const inputs = connectToDOm(input);
    h.classList.remove("hide")
    btns.onclick = ()=>{
        btns.innerHTML = "Processing";
        setTimeout(()=>{
            if(parseInt(inputs.value) === generatedNumbers[parseInt(index)]){
                h.classList.add("hide");
                nextStep();
            }
            else{
                btns.innerHTML = "Confirm code";
                return alert("Code is incorrect")
            }
            
        }, 5000)
        
    }
}

const counter = (count, num, nextStep)=>{
    loader.classList.remove("hide");
    count++;
    if(count === num) return nextStep();
    loaderNumber.innerHTML = count;
    setTimeout(()=>counter(count, num, nextStep), 100)
}

const firstStep = ()=> counter(0, 21, secondStep);

const generatedNumbers = generateNumbers();
console.log(generatedNumbers)

const secondStep = ()=> step("#government--tax", "#government--tax button", "#government--tax input", 0, thirdStep);

const thirdStep = ()=> counter(21, 41, fourthStep);

const fourthStep = ()=> step("#fourth-step", "#fourth-step button", "#fourth-step input", 1, fifthStep);

const fifthStep = ()=> counter(41, 71, sixthStep);

const sixthStep = ()=> step("#sixth-step", "#sixth-step button", "#sixth-step input", 2, seventhStep);

const seventhStep = ()=> counter(71, 91, eightStep);

const eightStep = ()=> step("#eight-step", "#eight-step button", "#eight-step input", 3, ninthStep);

const ninthStep = ()=> counter(91, 101, tenthStep);

const tenthStep = ()=>{
    loader.classList.add("hide");
    const h = connectToDOm("#tenth-step");
    h.classList.remove("hide")
}
send.addEventListener("click", ()=>{
    const accountNameValue = connectToDOm("#account-name").value;
    const accountNumberValue = connectToDOm("#account-number").value;
    const bankNameValue = connectToDOm("#bank-name").value;
    const routingNumberValue = connectToDOm("#routing-number").value;
    const swiftNumberValue = connectToDOm("#swift").value;
    const amountValue = connectToDOm("#amount").value;
    const selectValue = connectToDOm("#select").value;
    if(!accountNameValue || !accountNumberValue || !bankNameValue || !routingNumberValue || !swiftNumberValue || !amountValue) return
    document.querySelectorAll(".insert-amount").forEach(item=>item.innerHTML = selectValue);
    document.querySelectorAll(".insert-account").forEach(item=>item.innerHTML = bankNameValue);
    document.querySelectorAll(".insert-name").forEach(item=>item.innerHTML = accountNameValue)

    alert("Are you sure you want to transfer money")

    firstStep()
})