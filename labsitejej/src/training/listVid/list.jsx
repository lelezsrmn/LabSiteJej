
function List() {

    const fruits = [{name: "apple", calories: 95},
                                            {name: "banana", calories: 45},
                                            {name: "citron", calories: 105},
                                            {name: "strawberry", calories: 159},
                                            {name: "ananas", calories: 54}];
    fruits.sort();

    const listItems = fruits.map(fruit => <li key={fruit.name}>{fruit.name}</li>)

    return (<ol>{listItems}</ol>);
}

export default List