import {useState} from 'react';

function MyComponent() {
    const [nbr, setNbr] = useState(0);

    const addNbr = () => {
        setNbr(nbr + 1);
    }

    const minNbr = () => {
        setNbr(nbr - 1);
    }

    const resetNbr = () => {
        setNbr(0);
    }

    return(
        <div>
            <p
                className={"bg-green-800 m-6 aspect-auto break-after-auto text-center text-green-100 font-xl font-bold"}>
                    {nbr}
            </p>
            <div className={"flex justify-center flex-row "}>
                <button onClick={minNbr}
                        className={"flex-1 bg-green-800 m-8 p-2 rounded-xl border-4 border-green-500 font-sans text-base font-medium text-green-100 "}>
                    substract
                </button>
                <button onClick={resetNbr}
                        className={"flex-2 bg-green-800 m-8 p-2 rounded-xl border-4 border-green-500 font-sans text-base font-medium text-green-100 "}>
                    Reset
                </button>
                <button onClick={addNbr}
                        className={"flex-1 bg-green-800 m-8 p-2 rounded-xl border-4 border-green-500 font-sans text-base font-medium text-green-100 "}>
                    addition
                </button>
            </div>
        </div>
    );
}

export default MyComponent