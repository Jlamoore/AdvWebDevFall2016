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
                // Performs the function "resolve" when this.status is equal to 2xx
                resolve(JSON.parse(this.response));
            } else {
                // Performs the function "reject" when this.status is different than 2xx
                reject(this.statusText);
            }
        }

        function httpReject() {
            reject(this.statusText);
        }

    }


    // Return the promise
    return promise;
}


var callback = {
    success: function (data) {
        console.log(data.users);
        data.users.forEach(function (value1)
        {
            //console.log(value1);
            //console.log(value1._id);
            var li = document.createElement("li");
            li.textContent = value1.name.first + " " + value1.name.last;
            li.setAttribute('name', value1._id);
            li.id = value1._id;
            li.addEventListener('click', displayContent, false);
            document.getElementsByTagName("ul")[0].appendChild(li);
        });
    },
    error: function (data) {
        console.log(2, 'error', data);
    }
};
function displayContent() {
    var callback2 = {
        success: function (data) {
            console.log(data);
            var about = document.createElement("p");
            var stuff = [];
            stuff.push("name", "company", "email", "address", "registered", "age", "eyeColor", "greeting", "favoriteFruit", "balance", "about");
            var i = 0;
            stuff.forEach(function (things) {
                var p = document.createElement("p");
                var strong = document.createElement("b");
                strong.innerHTML = things + ": ";
                p.appendChild(strong);
                if (i === 0)
                    p.innerHTML = "<b>" + things + ": </b>" + data[things].first + " " + data[things].last;
                else
                    p.innerHTML = "<b>" + things + ": </b>" + data[things];
                document.getElementsByTagName("article")[0].appendChild(p);
                i++;
            });
            if(data.isActive === true)
            {
               document.getElementsByTagName("article")[0].className = "active";
            }
            else
            {
                document.getElementsByTagName("article")[0].className = "inactive";
            }

            switch (data.picture)
            {
                case"male.png":
                    var img = document.createElement("img");
                    img.setAttribute("src", "img/male.png");
                    document.getElementsByTagName("figure")[0].appendChild(img);
                    console.log(img.innerHTML);
                    break;
            }
        },
        error: function (data) {
            console.log(2, 'error', data);
        }
    };
    var pass = this.id;
    var url2 = '../data/' + pass + '.json';
    console.log(pass);
    func().then(callback2.success, callback2.error);
    function func()
    {
        var promise = new Promise(httpPromise);
        function httpPromise(resolve, reject) {
            var httpRequest = new XMLHttpRequest();

            if (!httpRequest) {
                reject('Giving up :( Cannot create an XMLHTTP instance');
            }
            console.log(url2);
            httpRequest.open('GET', url2);
            httpRequest.send();

            httpRequest.addEventListener('load', httpResolve.bind(httpRequest));
            httpRequest.addEventListener('error', httpReject.bind(httpRequest));

            function httpResolve() {
                if (this.status >= 200 && this.status < 300) {
                    // Performs the function "resolve" when this.status is equal to 2xx
                    resolve(JSON.parse(this.response));
                } else {
                    // Performs the function "reject" when this.status is different than 2xx
                    reject(this.statusText);
                }
            }

            function httpReject() {
                reject(this.statusText);
            }

        }


        // Return the promise
        return promise;
    }

}
;

makeRequest('../data/users.json').then(callback.success, callback.error);