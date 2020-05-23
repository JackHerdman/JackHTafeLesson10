module.exports = class TeacherService {
    constructor(studentDataReader, teacherDataReader) {
        this.studentDataReader = studentDataReader;
        this.teacherDataReader = teacherDataReader;
    }

    getTeacher(id) {
        return this.teacherDataReader.getTeacher(id);
    }

    deleteTeacher(id) {
        let teacher = this.getTeacher(id);
        if (!teacher) {
            console.log("Error: No Matching Teacher Found");
            console.log("");
        } else {
            this.TeacherDataReader.deleteTeacher(id);
        }
    }

    updateTeacher(teacher) {
        let dataTeacher = this.getTeacher(teacher.id);
        if (!dataTeacher) {
            console.log("Error: No Matching Teacher Found");
            console.log("");
        } else if (this.validateTeacher(teacher)) {
            this.TeacherDataReader.updateTeacher(teacher);
        } else {
            console.log("Error: Teacher object was invalid");
            console.log("");
        }
    }

    addTeacher(teacher) {
        let dataTeacher = this.getTeacher(teacher.id);
        if (dataTeacher) {
            console.log("Error: Teacher Already Found With id: " + teacher.id);
            console.log("");
        } else if (this.validateTeacher(teacher)) {
            this.teacherDataReader.addTeacher(teacher);
        } else {
            console.log("Error: Teacher object was invalid");
            console.log("");

        }
    }

    searchByName(searchTerm) {
        return this.teacherDataReader.getArrayFromFile()
            .filter(teacher => `${teacher.firstName} ${teacher.lastName}`.toLowerCase().includes(searchTerm));
    }


    validateTeacher(teacher) {
        if (isNaN(teacher.age)) {
            return false;
        }
        return true;
    }

    findTeacher(id){
        let foundTeacher = this.teacherDataReader.getArrayFromFile().filter(s => id == s.id);
        return foundTeacher;
        }
}