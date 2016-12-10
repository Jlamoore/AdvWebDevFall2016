var mongoose = require('mongoose');
var Employee = mongoose.model('Employee');
var employeeDAO = require('../service/employeesDAO');

function sendJSONresponse(res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.employeesReadAll = function(req, res) {
        
    employeeDAO.employeesReadAll().then(function(results) {
         sendJSONresponse(res, 200, results);
     }, function(err){
        sendJSONresponse(res, 404, err);
     });
        
    console.log('Getting all employees');

    
};



module.exports.employeesReadOne = function(req, res) {
    
    employeeDAO.employeesReadOne(req.params.employeeid).then(function(results) {
         sendJSONresponse(res, 200, results);
     }, function(err){
        sendJSONresponse(res, 404, {
            "message": "employeeid not found"
        });
     });
};




/*   POST a new employee
 *   /api/v1/employees 
 */
module.exports.employeesCreate = function(req, res) {
    
    console.log('Creating a employee with data ', req.body);
    
    Employee.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
    }, function(err, dataSaved) {
        if (err) {
          console.log(err);
          sendJSONresponse(res, 400, err);
        } else {
          console.log(dataSaved);
          sendJSONresponse(res, 201, dataSaved);
        }
    });
  
  
};



module.exports.employeesUpdateOne = function(req, res) {
    
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employeeid is required"
    });
    return;
  }
  Employee
    .findById(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (!employeeData) {
          sendJSONresponse(res, 404, {
            "message": "employeeid not found"
          });
          return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }

        employeeData.firstName = req.body.firstName,
        employeeData.lastName = req.body.lastName,
        employeeData.department = req.body.department,
        employeeData.jobTitle = req.body.jobTitle,
        employeeData.salary = req.body.salary;


        employeeData.save(function(err, data) {
          if (err) {
            sendJSONresponse(res, 404, err);
          } else {
            sendJSONresponse(res, 200, data);
          }
        });
    });
    
};


module.exports.employeesDeleteOne = function(req, res) {
  if ( !req.params.employeeid ) {
    sendJSONresponse(res, 404, {
      "message": "Not found, employeeid is required"
    });
    return;
  }
  Employee
    .findByIdAndRemove(req.params.employeeid)
    .exec( function(err, employeeData) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 404, err);
            return;
        }
          console.log("Employee id " + req.params.employeeid + " deleted");
          sendJSONresponse(res, 204, null);
                
    });
};
