module.exports = class StudentService {
    constructor(studentDataReader, teacherDataReader) {
        this.studentDataReader = studentDataReader;
        this.teacherDataReader = teacherDataReader;
    }

    getStudent(id) {
        return this.studentDataReader.getStudent(id);
    }

    deleteStudent(id) {
        let student = this.getStudent(id);
        if (!student) {
            console.log("Error: No Matching Student Found");
            console.log("");
        } else {
            this.studentDataReader.deleteStudent(id);
        }
    }

    updateStudent(student) {
        let dataStudent = this.getStudent(student.id);
        if (!dataStudent) {
            console.log("Error: No Matching Student Found");
            console.log("");
        } else if (this.validateStudent(student)) {
            this.studentDataReader.updateStudent(student);
        } else {
            console.log("Error: Student object was invalid");
            console.log("");

        }
    }

    addStudent(student) {
        let dataStudent = this.getStudent(student.id);
        if (dataStudent) {
            console.log("Error: Student Already Found With id: " + student.id);
            console.log("");
        } else if (this.validateStudent(student)) {
            this.studentDataReader.addStudent(student);
        } else {
            console.log("Error: Student object was invalid");
            console.log("");

        }
    }

    searchByName(searchTerm) {
        return this.studentDataReader.getArrayFromFile()
            .filter(student => `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm));
    }

    doesTeacherExist(id) {
        let teacher = this.teacherDataReader.getTeacher(id);
        if (teacher) {
            return true;
        } else {
            return false;
        }
    }

    validateStudent(student) {
        if (!this.doesTeacherExist(student.teacherId)) {
            console.log("Error: Could not find matching teacher for given teacherId")
            console.log("");
            return false;
        }
        if (isNaN(student.age)) {
            return false;
        }
        for (let i = 0; i < student.grades.length; i++) {
            const grade = student.grades[i];
            if (isNaN(grade)) {
                console.log("Error: One or more of the entered grades was invalid")
                console.log("");
                return false;
            }
        }
        return true;
    }
    findStudent(id){
        let foundStudent = this.studentDataReader.getArrayFromFile().filter(s => id == s.id);
        return foundStudent;
        }

}