var mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    department: String,
    startDate: {
        type: Date,
        default: Date.now
    },
    jobTitle: String,
    salary: { type: Number, default: 0 }
});


var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;