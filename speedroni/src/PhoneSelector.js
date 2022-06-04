import React, { useState, useEffect} from 'react';


//
function Matcher (props){
    const [nmbr, setNmbr] = useState(50);
    const time=80;
    const [dir, setDir] = useState(1);
    const [intervalId, setIntervalId] = useState(-1);
    const [running, setRunning] = useState(true);
    
    if(nmbr >= 100 || nmbr <= -1){
        setNmbr(nmbr+dir*-1);
        setDir(dir * -1);            
    }

    useEffect(()=>{
    if(running){
        const id = setInterval(()=>{            
            setNmbr(prevnmbr => prevnmbr + dir );
            console.log('tick');
        }, time)        
        setIntervalId(id);
        console.log(intervalId);       

        return () =>{
            clearInterval(id)                   
        }
    }
        
    },[dir, running]);

    const click=(ev)=>{
        if(running){            
            props.setVal(nmbr);
        }
        setRunning(! running);
        
    };

    return <div className='matcher'>
        <input type='range' min='00' max='99' value={nmbr} readonly/>
        <button onClick={click}>{running ? "Parar" : "Continuar"}</button>
        <p> {nmbr} </p>
    </div>
};

function PhoneSelector (props){
    const logg=(val) =>{
        console.log(val);
    }
    const [f1, setF1] = useState(0)
    const [f2, setF2] = useState(0)
    const [f3, setF3] = useState(0)
    const [f4, setF4] = useState(0)

    const pad = (val) =>{
        return ("00" + val).slice(-2)
    }
    
    return <div className='PhoneSel'>
            <Matcher setVal={setF1} />
            <Matcher setVal={setF2} />
            <Matcher setVal={setF3} />
            <Matcher setVal={setF4} />
            <p className="phone">{pad(f1)}{pad(f2)}-{pad(f3)}{pad(f4)}</p>
        </div>
};

export default PhoneSelector;