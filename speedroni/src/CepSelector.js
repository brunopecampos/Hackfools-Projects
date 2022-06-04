import React, {useEffect, useState} from 'react'

function CepSelector(props){
    const values=[]
    for (let i = 0; i < 1000; i++){
        values.push(('00' + i).slice(-3))
    }
    for(let i = 0; i < values.length; i++){
        let t = values[i];
        
        let rnd = Math.floor(Math.random() * (values.length - i));
        
        values[i] = values[i + rnd];

        values[i+rnd]=t;
    }
    
    const [f1, setF1]=useState('00000');
    const [f2, setF2]=useState(values[0]);
    const onchgf1 = (event) =>{
        let vl = event.target.value;
        let valid = true;
        for (let i = 0; i < vl.length; i++){
            let nmbr =vl[i] - '0';           
            if(!(nmbr >= 0 && nmbr <= 9)){
                valid = false;
                break;
            }
        }     

        if (valid)  {
            setF1(vl)
        }
    }
    const onchgf2 =  (event) =>{
         setF2(event.target.value);
        
    }
    useEffect(() =>{
        let val = ("00000" + f1).slice(-5) + f2;
        props.setValue(val.slice(0, 4) + "-" + val.slice(4, 8))}, [f1, f2])
    let options = values.map((el) => <option value={el}>{el}</option>)

        
    return <div className='cepSelector'>
            <input type='text' maxLength={5} value={f1} onChange={onchgf1}/>
            <select onChange={onchgf2} value={f2}>{options}</select>
        </div>
}

export default CepSelector;