
snakes_ladders_game ={
    'values':['zero','one','two','three','four','five','six','seven','eight'],
    'P1': 0,
    'P2':0,
    'snakes':[Math.floor(Math.random()*64),Math.floor(Math.random()*64),Math.floor(Math.random()*64)],
    'ladders':[Math.floor(Math.random()*64),Math.floor(Math.random()*64),Math.floor(Math.random()*64)],
}

let numbers=[];
for(let i =1 ; i<=64;i++){

    numbers.push(i);
}

let start = -1//flag valye
function give_number(){
    //for td
    start +=1;
    return numbers[start]

}
st = -1
function giveid(){
    st +=1;
    return numbers[start]
}
console.log(numbers)
let table = document.createElement('table');
for(let i =1;i<=8;i++){
    //create row
    let table_row = document.createElement('tr');
    table_row.id='row';
    table.appendChild(table_row);
    for(let i =1;i<=8;i++){
        //create columns
        let td = document.createElement('td');
        td.textContent=give_number();
        td.id='r'+giveid();
        table_row.append(td);
    }
    
}

let body = document.querySelector('#board');
body.appendChild(table)




const ladder_sound = new Audio('/home/harrypotter/Downloads/javascrpt_crash_cousre/challenge/static/sounds/cash.mp3');
const roll_sound = new Audio('/home/harrypotter/Downloads/javascrpt_crash_cousre/challenge/static/sounds/swish.m4a');
const snake_sound = new Audio('/home/harrypotter/Downloads/javascrpt_crash_cousre/challenge/static/sounds/aww.mp3');
function is_first(){
    if (snakes_ladders_game['P1']===0 && snakes_ladders_game['P2']===0 ){
        console.log('true')
        return true
    }
    else {
        return false
    }
}

function whose_turn(){
    let current_turn = document.querySelector('#chance');
    if (is_first())
    {
        console.log('hii')
        return current_turn.className;
    }
    else{
        if (current_turn.className === 'P1'){
            current_turn.textContent='Player 2\'s Move';
            current_turn.className = 'P2';
            return current_turn.className;
        }
        else if(current_turn.className === 'P2') {
            current_turn.textContent='Player 1\'s Move';
            current_turn.className = 'P1';
            return current_turn.className;
        }
    
    }

}




function issnakes(player,position){
    let choices =[2,6,9,10,4,3,9,2,8];
    for (i of snakes_ladders_game['snakes'])
    {
        if (i === position){
            console.log('Befor snake bite : '+position);
            let ran =choices[Math.floor(Math.random()*9)];
            console.log('ran s :'+ran)
            if(position > ran){
                position = position -ran;
               
            }else if (position<ran){
                position = ran - position;
            }
            console.log('After snake bite : '+position);
            snake_sound.play();
            console.log('You got a Snake Bite🐍')
            remove_prev_pos(player);
            document.querySelector('#results').textContent =player +' Got a Snake bite🐍';
            document.querySelector('#results').style.color = 'blue';
            snakes_ladders_game[player] = position;
            let id = '#r'+snakes_ladders_game[player];
            console.log('after:'+id);
            document.querySelector(id).textContent=player;
            document.querySelector(id).style.color ='black';
            
        }
    }
}

function isladders(player,position){
    let choices =[4,3,6,7,1,8];
    for (i of snakes_ladders_game['ladders'])
    {
        if (i === position)
        {
            console.log('befor ladder : ',+position)
            if (position > 60)
            {
                position += 2;
            }
            else if(position < 50)
            {
                let ran = Math.floor(Math.random()*7);
                position = position +ran;
            }
            ladder_sound.play();
            console.log('after ladder:'+position);
            console.log('You Got A ladder💥');
            remove_prev_pos(player);
            document.querySelector('#results').textContent =player +' Got a Ladder 💥';
            document.querySelector('#results').style.color = 'blue';
            let id = '#r'+snakes_ladders_game[player];
            snakes_ladders_game[player] = position;
            console.log('after:'+id);
            document.querySelector(id).textContent=player;
            document.querySelector(id).style.color ='black';
           
        }
    }
    
}

function remove_prev_pos(player){
    document.querySelector('#results').textContent =' ';
   if(snakes_ladders_game[player]===0){
       console.log('not:'+snakes_ladders_game[player])
    }else{
        let position = snakes_ladders_game[player];
        let id ='#r'+ position;
        console.log('prev-pos '+id)
        document.querySelector(id).textContent = snakes_ladders_game[player];
        document.querySelector(id).style.color ='white';
    } 
}

function reset_game(){
    remove_prev_pos('P1');
    remove_prev_pos('P2');
    snakes_ladders_game['P1']= 0;
    snakes_ladders_game['P2']=0;
}

function movedice(player,val){
    remove_prev_pos(player);
    snakes_ladders_game[player]+= val;

    isladders(player,snakes_ladders_game[player]);
    issnakes(player,snakes_ladders_game[player]);
    let id = '#r'+snakes_ladders_game[player];
    console.log(id)
    if( id ==='#r64')
    {
        document.querySelector('#results').textContent =player+' Win 😎';
        document.querySelector('#results').style.color = 'green';
        ladder_sound.play()
        let repeat = prompt('Do you wanna play again: (yes) or (no)');
        if (repeat ==='yes')
        {
            reset_game();
        }
        
    }else if(snakes_ladders_game[player] > 64 ){
        document.querySelector('#results').textContent = 'Oops! You lose!!....'+player;
        document.querySelector('#results').style.color = 'green';
        snake_sound.play()
        let repeat = prompt('Do you wanna play again: (yes) or (no)');
        if (repeat ==='yes')
        {
            reset_game();
        }
        

    }
    document.querySelector(id).textContent=player;
    document.querySelector(id).style.color ='black';
    


}

function roll_dice()
{
    let player = whose_turn();
    console.log(player)
    let val = Math.floor(Math.random()*7);
    if (val ===0)
    {
        val =Math.floor(Math.random()*7);
        if (val===0)
        {
            val = 1;
        }
    }
    roll_sound.play();
    let display = document.querySelector('#dice_value');

    display.textContent= player+' Dice Value is '+val;
    movedice(player,val); 


}
