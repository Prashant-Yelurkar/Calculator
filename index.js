var buttons = document.getElementsByClassName("button");
var data = document.getElementById("data");
var pre = document.getElementById("pre");
var result = document.getElementById("result");
var others = document.getElementById("others");
var index =0;
var problem  =[];
var solution =[];
var flag =0;
var presedende = ["(","√","%","^","÷","*","-","+"];
for (let i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function() 
    {
        b = this.innerText;
        var values = data.innerText;
        index = (values.length-1);
        if(b=="=")
        {
            if(result.innerText)
            {
                solution =[];
                problem=[];
                solution[0] = result.innerText;
                problem[0]= result.innerText;
                data.innerText = "Ans";
                pre.innerText = result.innerText;
                result.innerText= "";
            }
            else
            {
                calculatation();
            }
        }
        else if(b=="AC")
        {
            data.innerText ="";
            result.innerText="";
            pre.innerText="";
            problem=[];
            solution =[];
        }
        else if(b=="←")
        {
            data.innerText = values.substring(0, values.length-1);
            result.innerText="";
            removing();
        }
        else if((b=="00" && index==-1) || (b=="00" && index==0 && values[index]=="0") || (b=="0" && index==0 && values[index]=="0"))
        {
            data.innerText="0";
        }
        else if(((b=="^" || b=="*" || b=="÷"|| b=="." || b=="%") && index ==-1))
        {
            data.innerText = values;
        }
        else if(( b=="*" || b=="÷" || b=="+" ||b=="^" ||b=="-" ||b=="." ||  b=="%") &&( values[index]=="^" || values[index]=="*" || values[index]=="√" || values[index]=="÷" || values[index]=="-" ||values[index]=="+" || values[index]=="." || values[index]=="%" ))
        {
            data.innerText = values;
        }
        else if(b==".")
        {
            flag =0;
           for(i=values.length-1;i>-1;i--)
           {
                if(values[i]==".")
                {
                    flag=1;
                    break;
                }
                else if(values[i]=="^" || values[i]=="*" || values[i]=="√" || values[i]=="÷" || values[i]=="-" ||values[i]=="+" )
                {
                    flag =0;
                    break;
                }
           }
           if(flag==0)
           {
                data.innerText += b;
                result.innerText="";
                storing(b);
           }

        }
        else
        {
            data.innerText+=b;
            result.innerText="";
            storing(b);
        }
        
    })



 
}


var newnum =0;
function storing(data)
{
    if(data=="^" || data=="*" || data=="√" || data=="÷" || data=="-" ||data=="+" || data=="%" || data=="(" || data==")")
    {
        problem[problem.length] = data;
        newnum =0;
    }
    else
    {
        if(newnum==1)
        {
            let join = problem[problem.length-1];
            join = join + data;
            problem[problem.length-1] = join;
        }
        else if(newnum==0)
        {
            problem[problem.length] = data;
            newnum=1;
        }
    }
    console.log(problem);
    calculatation();
}
function removing()
{
    let rmdata = problem[problem.length-1];
    problem.pop();
    if(rmdata.length>1)
        problem[problem.length]=rmdata.substring(0,rmdata.length-1);
        calculatation();
}
var calculate =0;
function calculatation()
{
    solution =[];
    var soluq =[];
    for(i=0;i<problem.length;i++)
    {
        solution[solution.length] = problem[i];
        soluq[soluq.length]=problem[i];
    }
    let bracketop = soluq.indexOf("(");
    let bracketcl = soluq.indexOf(")");
    var j =0;
    var jl = soluq.length;
    if(bracketop!=-1)   
    {
        j = bracketop;
        if(bracketcl==-1)
            jl == soluq.length-1;
    }


    for(i=0;i<presedende.length;i++)
    {
        for(j;j<jl;j++)
        {
            console.log("i = "+i + " j = "+j);
            calculate =0;
            if(solution[j]==presedende[i])
            {
                switch(presedende[i])
                {
                    case "√":
                        calculate = Math.sqrt(parseFloat(solution[j+1]));
                        solution[j+1]=calculate;
                        if(solution[j-1]=="+" || solution[j-1]=="-"|| solution[j-1]=="*" || solution[j-1]=="÷" || solution[j-1]=="^")
                        {
                            solution.splice(j,1);
                        }
                        else
                        {
                            solution[j] ="*";
                        }
                        break;
                    case "%":
                        if((solution[j+1]!=")" && solution[j+1]!="+" && solution[j+1]!="-"  && solution[j+1]!="%"  && solution[j+1]!="*" && solution[j+1]!="÷" && solution[j+1]!="^") && soluq.length>2)
                        {
                            calculate = ((( parseFloat(solution[j+1])) / 100 )*parseFloat(solution[j-1]));
                            solution[j-1] = calculate;
                            solution.splice(j,2);
                            j--
                        }
                        else
                        {
                            calculate = (parseFloat(solution[j-1]) / 100);
                            if(solution[j-2]=="(" &&  solution[j=1]=="(")
                                solution.splice(j-2,3);
                            else
                                solution.splice(j-1,2);
                            j--;
                            solution[j]=calculate;
                        }
                        break;

                    case "^":
                        calculate = Math.pow(parseFloat(solution[j-1]) ,parseFloat(solution[j+1]));
                        if(Number.isNaN(calculate))
                            break;
                        else{
                        solution[j]=calculate;
                        solution.splice(j-1,1);
                        solution.splice(j,1);
                        j = j-2; 
                        break;
                        }
                    case "*":
                        calculate = (parseFloat(solution[j-1]) * parseFloat(solution[j+1]));
                        solution[j]=calculate;
                        solution.splice(j-1,1);
                        solution.splice(j,1);
                        j = j-2;
                        break;
                    case "-":
                        calculate = (parseFloat(solution[j-1]) - parseFloat(solution[j+1]));
                        solution[j]=calculate;
                        solution.splice(j-1,1);
                        solution.splice(j,1);
                        j = j-2;
                        break;
                    case "+":
                        calculate = (parseFloat(solution[j-1]) + parseFloat(solution[j+1]));
                        solution[j]=calculate;
                        solution.splice(j-1,1);
                        solution.splice(j,1);
                        j = j-2;
                        break;
                    case "÷":
                        calculate = (parseFloat(solution[j-1]) / parseFloat(solution[j+1]));
                        if(Number.isNaN(calculate))
                        {
                            break;
                        }
                        else
                        {
                            solution[j]=calculate;
                            solution.splice(j-1,1);
                            solution.splice(j,1);
                            j = j-2;
                        }
                        break;
                }
            }
                bracketop = solution.indexOf("(");
                bracketcl = solution.indexOf(")");
                if(bracketop==bracketcl-2)
                {
                    if(solution[bracketop-1]!="-" && solution[bracketop-1]!="+" && solution[bracketop-1]!="^"  && solution[bracketop-1]!="÷" &&  solution[bracketop-1]!="*"  && (solution.indexOf("(")!=0))
                    {
                        
                        solution[bracketop]="*";
                        if(Number.isInteger(parseFloat(solution[bracketcl+1])))
                            solution[bracketcl]="*";
                        else
                            solution.splice(bracketcl,1);
                        
                    }
                    else
                    {
                        solution.splice(bracketcl,1);
                        solution.splice(bracketop,1);
                    }

                    j =0;
                    i =0;
                    bracketop =0;
                }
            console.log(solution);
        }   
        j = bracketop;
    }
    

    // console.log(solution[0]);
    if(Number.isNaN(solution[0]))
    {
        pre.innerText = "";
        
    }
    else
    {
        if(Number.isInteger(solution[0]) || Object.prototype.toString.call(solution[0]) === '[object String]')
            pre.innerText = solution;
        else
        {
            let n = solution[0];
            pre.innerText = (n.toFixed(10));
        }
    }

    if(b=="=")
    {
        pre.innerText = "Answer";
        if(Number.isInteger(solution[0]))
            result.innerText = solution;
        else
        {
            let n = solution[0];
            result.innerText = (n.toFixed(10));;
        }

    }
}

//other functions
var othersf =0;
others.addEventListener("click",function()
{
    if(othersf==0)
    {
        document.getElementById("obt").style.display="flex";
        document.getElementById("obt").style.visibility="visible";
        others.style.margin ="0px 0% 0px 35%";
        for(i=0;i<buttons.length;i++)
        {
            buttons[i].style.padding="10px 0px 6px 0px";
        }
        othersf =1;
    }
    else
    {
        document.getElementById("obt").style.display="none";
        document.getElementById("obt").style.visibility="hidden";
        others.style.margin ="10px 50% 5px 35%";
        for(i=0;i<buttons.length;i++)
        {
            buttons[i].style.padding="12px 0px 12px 0px";
        }
        othersf=0;
    }
})



// mode

var light = document.getElementById("light");
var dark = document.getElementById("dark");
var mode = document.querySelector(":root");
light.addEventListener("click",function(){
    dark.style.boxShadow="-4px 2px 0px 3px #424040"; 
    light.style.backgroundColor="orange";
    mode.style.setProperty("--white","#252525");
    mode.style.setProperty("--black","#b0b1ad");
    mode.style.setProperty("--gray","#b0b1ad");
    mode.style.setProperty("--lightgray","#b0b1ad");
    mode.style.setProperty("--yellow","red");
    mode.style.setProperty("--aqua","#252525");
    mode.style.setProperty("--pink","#252525");
    for(i=0;i<buttons.length;i++)
    {
        buttons[i].style.width="63px";
        buttons[i].style.border="solid black 1px";
    }


})
dark.addEventListener("click",function(){
    light.style.backgroundColor="#252525";
    dark.style.boxShadow="-4px 2px 0px 3px #b0b1ad"; 
    mode.style.setProperty("--white","#b0b1ad");
    mode.style.setProperty("--black","#252525");
    mode.style.setProperty("--gray","#302f2f");
    mode.style.setProperty("--lightgray","#424040");
    mode.style.setProperty("--yellow","#FFE87C");
    mode.style.setProperty("--aqua","aqua");
    mode.style.setProperty("--pink","#E75480");
    for(i=0;i<buttons.length;i++)
    {
        buttons[i].style.width="65px";
        buttons[i].style.border="solid black 0px";
    }

})