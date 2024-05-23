import {useState} from 'react';

const Button = ({ children, className, onClick }) => {
    return (
        <button className={`flex items-center justify-center bg-pink-800 hover:bg-pink-700 mx-8 my-2 p-2 rounded-xl border-4 border-pink-500 hover:border-pink-300 ${className}`}
                onClick={onClick}>
            <span className={"font-sans text-xl text-pink-100"} > {children} </span>
        </button>
    );
};

const ButtonOp = ({ children, className, onClick }) => {
    return (
        <button className={`flex items-center justify-center bg-pink-800 hover:bg-pink-700  m-8 p-2 rounded-xl border-4 border-pink-500 hover:border-pink-300 ${className}`}
                onClick={onClick}>
            <span className={"font-sans text-xl font-medium text-pink-200"} > {children} </span>
        </button>
    );
}

function Calculatrice(){
    const [res, setRes] = useState(0);
    const [nbr, setNbr] = useState('0');
    const [oldNbr, setOldNbr] = useState(0);
    const [truc, setTruc] = useState('');
    const [errorMessage, setErrorMessage] = useState("");
    let statusEr = false;
    let status = false;

    const equal = () => {
        let temp_res = 0;

        if (truc === '+') {
            temp_res = nbr + oldNbr;
        } else if (truc === '-') {
            temp_res = oldNbr - nbr;
        } else if (truc === 'x') {
            temp_res = nbr * oldNbr;
        } else if (truc === ':' && ((oldNbr === 0) || (nbr === 0))) {
            setErrorMessage("Division par 0 impossible");
        } else if (truc === ':') {
            temp_res = oldNbr / nbr;
        }

        setRes(temp_res);
        setNbr(temp_res);
        status = false;
    }

    const handleNumber = (input) => {
        if (status) {
            setNbr(input.toString()); // Convertir input en chaîne
            status = false;
        } else {
            setNbr(nbr + input.toString()); // Concaténer la nouvelle entrée à nbr
        }
    }

    const handleOperator = (inputOperator) => {
        setOldNbr(parseFloat(nbr)); // Convertir nbr en nombre flottant
        setNbr('0'); // Réinitialiser nbr à '0'
        setTruc(inputOperator);
        status = true; // Définir le statut pour accepter une nouvelle entrée
    }

    const handleErase = () => {
        if (!statusEr) {
            statusEr = true;
            setNbr(0);
        } else if (statusEr) {
            setNbr(0);
            setTruc('');
            setOldNbr(0);
            setRes(0);
            statusEr = false;
        }

        console.log(`nbr -> ${nbr}\noldNbr -> ${oldNbr}\nstatusEr -> ${statusEr}`);
    }

    return (
        <div className={"bg-red-950"}>
            <p
                className={"bg-red-800 m-6 aspect-auto break-after-auto text-center text-red-100 font-xl font-bold"}>
                    {status ? res : nbr}
            </p>
            <div className={"flex flex-col items-center justify-center h-screen"}>
                <div className={"max-w-xl w-full"}>
                    <div className={"grid grid-cols-4 gap-2 justify-between"}>
                        <Button onClick={() => handleNumber(7)}>
                            7</Button>
                        <Button onClick={() => handleNumber(8)}>
                            8</Button>
                        <Button onClick={() => handleNumber(9)}>
                            9</Button>
                        <ButtonOp onClick={() => handleOperator(':')}>
                            :</ButtonOp>
                        <Button onClick={() => handleNumber(4)}>
                            4</Button>
                        <Button onClick={() => handleNumber(5)}>
                            5</Button>
                        <Button onClick={() => handleNumber(6)}>
                            6</Button>
                        <ButtonOp onClick={() => handleOperator('x')}>
                            x</ButtonOp>
                        <Button onClick={() => handleNumber(1)}>
                            1</Button>
                        <Button onClick={() => handleNumber(2)}>
                            2</Button>
                        <Button onClick={() => handleNumber(3)}>
                            3</Button>
                        <ButtonOp onClick={() => handleOperator('-')}>
                            -</ButtonOp>
                        <Button onClick={() => handleNumber(0)}>
                            0</Button>
                        <Button onClick={() => handleNumber('.')}>
                            .</Button>
                        <ButtonOp onClick={() => equal('=')}>
                            =</ButtonOp>
                        <ButtonOp onClick={() => handleOperator('+')}>
                            +</ButtonOp>
                        <Button onClick={() => handleErase()}>
                            err</Button>
                    </div>
                </div>
            </div>
            <p>{errorMessage}</p>
        </div>
    );
}

export default Calculatrice