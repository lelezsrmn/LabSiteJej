import Proptypes from 'prop-types'

function Student(props) {
    return (
        <>
            <div className={"flex flex-wrap p-3 rounded-sm border-2 border-double ring-offset-1 "}>
                <p>Name: {props.name} </p>
                <p>Age: {props.age} </p>
                <p>Student: {props.isStudent ? "yes" : "no"}</p>
            </div>
        </>
    );
}
Student.propTypes = {
    name: Proptypes.string,
    age: Proptypes.number,
    isStudent: Proptypes.bool,
}
Student.defaultProps = {
    name: "Guest",
    age: 0,
    isStudent: false,
}
export default Student