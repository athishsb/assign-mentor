# Mentor-Student Management System

This is a simple Mentor-Student Management System built with Node.js, Express, and MongoDB. The system allows you to manage mentors and students, assign students to mentors, change mentors for students, and view previous mentors of students.

## API Endpoints

1. **Create a Mentor:** `POST /create-mentor`
   - Creates a new mentor in the Mentor-Student Management System.
   
2. **Create a Student:** `POST /create-student`
   - Creates a new student in the Mentor-Student Management System.
   
3. **Assign Students to Mentor:** `POST /assign-student`
   - Assigns one or more students to a mentor within the Mentor-Student Management System.
   
4. **Change Mentor for a Student:** `POST /change-mentor`
   - Updates the mentor assigned to a specific student within the Mentor-Student Management System.
   
5. **View Students for a Mentor:** `GET /mentor-students/list?mentor={{mentorId}}`
   - Retrieves and displays a list of students assigned to a specific mentor.
   
6. **View Previous Mentor for a Student:** `GET /previous-mentor/details?student={{studentId}}`
   - Retrieves and displays the details of the most recent previous mentor assigned to a specific student.

[Postman API Documentation](https://documenter.getpostman.com/view/34931362/2sA3QpAsx2)
