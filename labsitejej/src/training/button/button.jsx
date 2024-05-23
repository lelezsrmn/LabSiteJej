
function Button() {

    let count = 0;

    const handleClick = (name) => {
        if (count < 3) {
            count++;
            console.log(`${name} you clicked me ${count} time/s`)
        } else {
            console.log(`${name} stop click me`)
        }
    };

    const testEvent  = (e) => {
        e.target.innerText = "jej";
    };

    return (
        <button onDoubleClick={(e) => testEvent(e)} className={"bg-green-800 m-8 p-2 rounded-xl border-4 border-green-500 font-sans text-base font-medium text-green-100 "}>
            Click me
        </button>
    );
}

export default Button