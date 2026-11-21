class Student {

    #subject1;
    #subject2;
    #subject3;
    #attendance;

    constructor(name, subject1, subject2, subject3, attendance) {

        if (!name || name.trim() === "") {
            throw new Error("من فضلك أدخل اسم الطالب");
        }

        this.name = name;

        this.subject1 = subject1;
        this.subject2 = subject2;
        this.subject3 = subject3;
        this.attendance = attendance;
    }

    set subject1(value) {
        if (value === "" || value === null ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون من 0 إلى 100");
        }

        this.#subject1 = Number(value);
    }

    set subject2(value) {
        if (value === "" || value === null ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون من 0 إلى 100");
        }

        this.#subject2 = Number(value);
    }

    set subject3(value) {
        if (value === "" || value === null ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون من 0 إلى 100");
        }

        this.#subject3 = Number(value);
    }

    set attendance(value) {
        if (value === "" || value === null ||
            !Number.isFinite(Number(value)) ||
            Number(value) < 0 || Number(value) > 100) {
            throw new Error("نسبة الحضور يجب أن تكون من 0 إلى 100");
        }

        this.#attendance = Number(value);
    }

    get subject1() {
        return this.#subject1;
    }

    get subject2() {
        return this.#subject2;
    }

    get subject3() {
        return this.#subject3;
    }

    get attendance() {
        return this.#attendance;
    }

    // Calculate Average
    get average() {
        return (this.#subject1 + this.#subject2 + this.#subject3) / 3;
    }
}

let studentsList = [];

const studentName = document.getElementById("studentName");
const subject1 = document.getElementById("subject1");
const subject2 = document.getElementById("subject2");
const subject3 = document.getElementById("subject3");
const attendance = document.getElementById("attendance");

const addStudent = document.getElementById("addStudent");
const mercyBtn = document.getElementById("mercyBtn");

const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");
const studentsBox = document.getElementById("studentsBox");
const reportBox = document.getElementById("reportBox");


function clearInputs() {
    studentName.value = "";
    subject1.value = "";
    subject2.value = "";
    subject3.value = "";
    attendance.value = "";
}


function displayStudents() {

    if (studentsList.length === 0) {
        studentsBox.textContent = "لا يوجد طلاب حتى الآن";
        return;
    }

    studentsBox.innerHTML = studentsList.map((student, index) => `
        <div class="student-item">
            <strong>${index + 1} - ${student.name}</strong>
            <br>
            المادة الأولى: ${student.subject1}
            | المادة الثانية: ${student.subject2}
            | المادة الثالثة: ${student.subject3}
            <br>
            نسبة الحضور: ${student.attendance}%
            <br>
            المتوسط: ${student.average.toFixed(2)}
        </div>
    `).join("");
}

addStudent.onclick = function () {

    try {

        errorBox.classList.add("d-none");
        successBox.classList.add("d-none");

        const student = new Student(
            studentName.value,
            subject1.value,
            subject2.value,
            subject3.value,
            attendance.value
        );

        studentsList.push(student);

        displayStudents();

        successBox.textContent =
            `تمت إضافة الطالب ${student.name} بنجاح`;

        successBox.classList.remove("d-none");

        clearInputs();

    } catch (error) {

        errorBox.textContent = error.message;
        errorBox.classList.remove("d-none");

    }
};


mercyBtn.onclick = function () {

    errorBox.classList.add("d-none");

    // Filter students whose average is between 40 and 49
    const weakStudents = studentsList.filter(student =>
        student.average >= 40 && student.average <= 49
    );

    if (weakStudents.length === 0) {

        reportBox.innerHTML = `
            <div class="alert alert-info">
                لا يوجد طلاب متعثرون يستحقون لجنة الرأفة.
            </div>
            <p>عدد الطلاب المتعثرين: 0</p>
        `;

        return;
    }

    const mercyResults = weakStudents.map(student => {

        return {
            name: student.name,
            oldAverage: student.average,
            newAverage: student.average + 5
        };

    });

    // Reduce: Calculate total averages after mercy marks
    const total = mercyResults.reduce((sum, student) => {
        return sum + student.newAverage;
    }, 0);

    const generalAverage = total / mercyResults.length;

    reportBox.innerHTML = `
        <div class="alert alert-success">
            <h5>التقرير النهائي للجنة الرأفة</h5>

            <p>
                عدد الطلاب المتعثرين:
                <strong>${mercyResults.length}</strong>
            </p>

            <hr>

            ${mercyResults.map((student, index) => `
                <div class="report-item">
                    <strong>${index + 1} - ${student.name}</strong>
                    <br>
                    المتوسط قبل الرأفة:
                    ${student.oldAverage.toFixed(2)}
                    <br>
                    المتوسط بعد الرأفة:
                    <strong>${student.newAverage.toFixed(2)}</strong>
                </div>
            `).join("")}

            <hr>

            <h5>
                المتوسط العام بعد الرأفة:
                ${generalAverage.toFixed(2)}
            </h5>
        </div>
    `;

};