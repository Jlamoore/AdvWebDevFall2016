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
function displaypicture(data)
{
    switch (data.picture)
            {
                case"male.png":
                    var img = document.createElement("img");
                    img.setAttribute("src", "male.png");
                    document.getElementsByTagName("figure")[0].appendChild(img);
                    break;
            }
}
var callback2 = {
    success:
    function (data){
        displaypicture(data);
        
    }
};
function callmethod(){
    makeRequest('./data/' +this.id+ '.json').then(callback2.success);
}
var callback = {
    success: function (data) {
        console.log(data.users);
        data.users.forEach(function (value1)
        {
            var li = document.createElement("li");
            li.textContent = value1.name.first + " " + value1.name.last;
            li.setAttribute('name', value1._id);
            li.id = value1._id;
            li.addEventListener('click', callmethod, false);
            document.getElementsByTagName("ul")[0].appendChild(li);
        });
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
makeRequest('./data/users.json').then(callback.success, callback.error);