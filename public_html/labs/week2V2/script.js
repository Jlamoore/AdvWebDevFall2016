//get json data passed through url
function makeRequest(url) {
    var promise = new Promise(httpPromise);
    function httpPromise(resolve, reject) {
        var httpRequest = new XMLHttpRequest();
        if (!httpRequest) {
            reject('Giving up :( Cannot create an XMLHTTP instance');
        }
        httpRequest.open('GET', url);
        httpRequest.send();
        httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
        httpRequest.addEventListener('error', httpReject.bind(httpRequest));
        function httpResolve() {
            if (this.status >= 200 && this.status < 300) {
                resolve(JSON.parse(this.response));
            } else {
                reject(this.statusText);
            }
        }
        function httpReject() {
            reject(this.statusText);
        }
    }
    return promise;
}
//first request functions
var callback = {
    success: function (data) {
        var dom = document.querySelector('ul.users');
        var docfrag = document.createDocumentFragment();
        data.users.forEach(function (value1)
        {
            var li = document.createElement("li");
            li.textContent = value1.name.first + " " + value1.name.last;
            li.setAttribute('name', value1._id);
            li.id = value1._id;
            li.addEventListener('click', callmethod.bind(null, 'data/' + value1._id + '.json'));
            docfrag.appendChild(li);
        });
        dom.appendChild(docfrag);
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
//second request functions
var callback2 = {
    success:
            function (data) {
                displaypicture(data);
            },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
//call second request
function callmethod(data) {
    makeRequest(data).then(callback2.success, callback2.error);
}

function displaypicture(data)
{
    var figure = document.getElementsByTagName("figure")[0];
    var article = document.getElementsByTagName("article")[0];
    // remove any child elements
    while (figure.firstChild)
    {
        figure.removeChild(figure.firstChild);
    }
    while (article.firstChild)
    {
        article.removeChild(article.firstChild);
    }
    //set picture
    switch (data.picture)
    {
        case"male.png":
            var img = document.createElement("img");
            img.setAttribute("src", "img/male.png");
            figure.appendChild(img);
            break;
        case"female.png":
            var img = document.createElement("img");
            img.setAttribute("src", "img/female.png");
            figure.appendChild(img);
            break;
    }
    //object of data to display. The key is the also the key used to access the 
    //value in the json data object. The value of each key is the text to display 
    //before each json data value.
    var stuff = {company: "Company: ", email: "Email: ", phone: "Phone: ",
        address: "Address", registered: "Registered: ", age: "Age: ",
        eyeColor: "Eye Color: ", greeting: "Greeting: ",
        favoriteFruit: "Favorite Fruit: ", balance: "Balance: ", about: "About: "};
    var p = document.createElement("p");
    //manually set the name 
    p.textContent = "Full Name: " + data.name.first + " " + data.name.last;
    article.appendChild(p);
    //run throught the above object and get all data from the json object.
    for (property in stuff)
    {
        var p = document.createElement("p");
        p.textContent = stuff[property] + data[property];
        article.appendChild(p);
    }
    //set the class
    if (data.isActive === true)
    {
        document.getElementsByTagName("article")[0].className = "active";
    }
    else
    {
        document.getElementsByTagName("article")[0].className = "inactive";
    }
}
//make the first request
makeRequest('data/users.json').then(callback.success, callback.error);