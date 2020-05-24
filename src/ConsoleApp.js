const readline = require('readline');
const path = require("path");
const { StudentDataReader, TeacherDataReader } = require("./DataLayer");
const { StudentService, TeacherService } = require("./Services");
const { Student, Teacher } = require("./Models");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion(question) {
    let answer;

    return new Promise((resolve, reject) => {
        rl.question(question, (ans) => {
            resolve(ans);
        })
    });
}


async function Program() {
    const baseFilePath = path.join(__dirname, "../", "JSONData");
    const _studentDataReader = new StudentDataReader(path.join(baseFilePath, "Students.json"));
    const _teacherDataReader = new TeacherDataReader(path.join(baseFilePath, "Teachers.json"));
    const _studentService = new StudentService(_studentDataReader, _teacherDataReader);
    const _teacherService = new TeacherService(_studentDataReader, _teacherDataReader);


    // console.log(_studentDataReader.getArrayFromFile());
    // console.log(_teacherDataReader.getArrayFromFile());

    let shouldLoop = true;
    while (shouldLoop) {
        //MAIN MENU
        console.log("Imperial Secondary School Database");
        console.log("[1] Students");
        console.log("[2] Teachers");
        console.log("[3] Exit");
        console.log("");
        let userInput = await askQuestion("Select an option from above: ");
        console.log("");
        switch (userInput) {
            //STUDENTS
            case "1":
                console.log("[1] Search Students");
                console.log("[2] Check a Students Grade");
                console.log("[3] Update Student Details ");
                console.log("[4] Add a Student");
                console.log("[5] Delete a Student");
                console.log("[6] Go Back");
                console.log("[7] Exit");
                console.log("");
                let userInputStudent = await askQuestion("Select an option from above: ");
                console.log("");
                switch (userInputStudent) {
                    case "1":
                        //search Students / WORKING
                        let searchTerm = await askQuestion("Enter search term: ");
                        let matchingStudents = _studentService.searchByName(searchTerm);
                        console.table(matchingStudents, ["firstName", "lastName", "age", "id"]);
                        break;
                    case "2":
                        //check grades / WORKING
                        let gradesStudentId = await askQuestion("Enter the Students Id: ");
                        let averageGrade =_studentService.getAverageGrades(gradesStudentId);
                        console.table(_studentService.findStudent(gradesStudentId), ["firstName", "lastName", "age"]);
                        console.log(`This students average grade is ${averageGrade}`)
                        console.log("");
                        break;
                    case "3":
                        //update a student / WORKING
                        let studentId = await askQuestion("Enter the Students Id: ");
                        console.table(_studentService.findStudent(studentId));
                        console.log("");
                        console.log("Please enter new details: ")
                        let updatedStudentFirstName = await askQuestion("Enter Student First Name: ");
                        let updatedStudentLastName = await askQuestion("Enter Student Last Name: ");
                        let updatedStudentAge = await askQuestion("Enter Student Age: ");
                        let parsedUpdatedStudentAge = parseInt(updatedStudentAge);
                        let updatedGrades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let parsedUpdatedGrades = updatedGrades.split(" ").map(num => parseInt(num));
                        let updatedTeacherId = await askQuestion("Enter Teacher's ID: ");

                        let updatedStudent = new Student(
                            updatedStudentFirstName,
                            updatedStudentLastName,
                            parsedUpdatedStudentAge,
                            updatedTeacherId,
                            parsedUpdatedGrades,
                            studentId
                        );
                        _studentDataReader.updateStudent(updatedStudent);
                        console.log("");
                        console.table(updatedStudent)
                        console.log("this is the updated student");
                        console.log("");
                        break;

                        break;
                    case "4":
                        //add student / WORKING
                        let studentFirstName = await askQuestion("Enter Student First Name: ");
                        let studentLastName = await askQuestion("Enter Student Last Name: ");
                        let studentAge = await askQuestion("Enter Student Age: ");
                        let parsedStudentAge = parseInt(studentAge);
                        let grades = await askQuestion("Enter Student Grades (Space-Separated): ");
                        let teacherId = await askQuestion("Enter Teacher's ID: ");
                        let parsedGrades = grades.split(" ").map(num => parseInt(num));
                        let newStudent = new Student(
                            studentFirstName,
                            studentLastName,
                            parsedStudentAge,
                            parsedGrades,
                            teacherId
                        );
                        _studentService.addStudent(newStudent);
                        console.log("");
                        console.table(newStudent)
                        console.log("New Student has been added")
                        console.log("");

                        break;
                    case "5":
                        //delete student / WORKING
                        let studentToDelete = await askQuestion("what is the ID of the student to delete: ");
                        console.table(_studentService.getStudent(studentToDelete));
                        _studentService.deleteStudent(studentToDelete);
                        console.log("This student has been deleted");
                        console.log("");
                        break;

                    case "6":
                        //go back / WORKING
                        break;
                    case "7":
                        //exit / WORKING
                        shouldLoop = false;
                        break;

                    default:
                        console.log("Going back to main menu");
                        console.log("")
                }
                break;
            case "2":
                //TEACHERS
                console.log("[1] Search Teachers");
                console.log("[2] Check a Teachers Average Grade");
                console.log("[3] Update Teacher Details");
                console.log("[4] Add a Teacher");
                console.log("[5] Delete a Teacher");
                console.log("[6] Go Back");
                console.log("[7] Exit");
                console.log("");
                let userInputTeacher = await askQuestion("Select an option from above: ");
                console.log("");
                switch (userInputTeacher) {
                    case "1":
                        //search teachers / WORKING
                        let searchTerm = await askQuestion("Enter search term: ");
                        let matchingTeachers = _teacherService.searchByName(searchTerm);
                        console.table(matchingTeachers, ["firstName", "lastName", "age", "id"]);
                        break;
                    case "2":
                        //check average teacher grades / NOT WORKING
                        let gradesTeacherId = await askQuestion("Enter the Teachers Id: ");
                        let TeacherAverageGrade =_teacherService.getAverageGrades(gradesTeacherId);
                        console.table(_teacherService.findTeacher(gradesTeacherId), ["firstName", "lastName", "age"]);
                        console.log(`This teachers average student grade is ${TeacherAverageGrade}`)
                        console.log("");
                        break;

                        break;
                    case "3":
                        //update a teacher / NOT WORKING
                        let teacherId = await askQuestion("Enter Teacher Id: ");
                        console.table(_teacherService.findTeacher(teacherId));
                        console.log("");
                        console.log("Please enter new details: ")
                        let teacherFirstName = await askQuestion("Enter Teacher First Name: ");
                        let teacherLastName = await askQuestion("Enter Teacher Last Name: ");
                        let teacherAge = await askQuestion("Enter Teacher Age: ");
                        let parsedTeacherAge = parseInt(teacherAge);
                        let updatedTeacher = new Teacher(
                            teacherFirstName,
                            teacherLastName,
                            parsedTeacherAge,
                            teacherId
                        );
                        _teacherService.updateTeacher(updatedTeacher);
                        break;

                    case "4":
                        //add teacher / WORKING
                        let newteacherFirstName = await askQuestion("Enter Teacher First Name: ");
                        let newteacherLastName = await askQuestion("Enter Teacher Last Name: ");
                        let newteacherAge = await askQuestion("Enter Teacher Age: ");
                        let newparsedTeacherAge = parseInt(newteacherAge);
                        let newTeacher = new Teacher(
                            newteacherFirstName,
                            newteacherLastName,
                            newparsedTeacherAge,
                        );
                        _teacherService.addTeacher(newTeacher);
                        console.log("");
                        console.table(newTeacher)
                        console.log("New Teacher has been added")
                        console.log("");
                        break;
                    case "5":
                        //delete teacher / NOT WORKING
                        let teacherToDelete = await askQuestion("what is the ID of the teacher to delete: ");
                        console.table(_teacherService.getTeacher(teacherToDelete));
                        _teacherService.deleteTeacher(teacherToDelete);
                        console.log("This teacher has been deleted");
                        console.log("");
                        break;

                    case "6":
                        //go back / WORKING
                        break;
                    case "7":
                        //exit / WORKING
                        shouldLoop = false;
                        break;

                    default:
                        console.log("Going back to main menu");
                        console.log("")
                }
                break;
            case "3":
                shouldLoop = false;
                break;
            default:
                console.log("Error: Could not read user input. Please enter a number from 1 to 3");
                console.log("");
        }
    }
}

Program().then(() => {
    process.exit(0);
});