import StudentType from "../types/StudentType";

function Student(props: StudentType) { //child
    return (
        <div>
            <h1>{props.name}</h1>
            <p>Age: {props.age}</p>
        </div>
    )
}

export default Student;