const ApiUrls = new Map();
ApiUrls.set("GitHub", [{
  "name": "organization",
  "url": "https://api.github.com/users/octocat/orgs",
  "options": {
    "method": "GET"
  }
}, {
  name: "repos",
  url: "https://api.github.com/orgs/octokit/repos",
}, {
  name: "nofound",
  url: "https://api.github.com/nofound",
}, {
  name: "feeds",
  url: "https://api.github.com/feeds",
},]);
ApiUrls.set('Go Rest', [{
  name: 'users',
  url: 'https://gorest.co.in/public/v1/users',
  options: {
    method: 'POST'
  }
}]);
ApiUrls.set('REQ|RES', [{
  name: 'login',
  url: 'https://reqres.in/api/login',
  options: {
    method: 'POST',
    body: {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }
  }
}])

document.getElementById('requestBtn').addEventListener('click', function (_) {
  let table = document.getElementById('requestTbl')

  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i)
  }

  for (let [k, v] of ApiUrls) {
    // console.log(k, v)

    for (let it of v) {
      let row = table.insertRow(++i);
      let cell1 = row.insertCell(0);
      let cell2 = row.insertCell(1)
      let cell3 = row.insertCell(2);
      let cell4 = row.insertCell(3);

      cell1.textContent = k;
      cell2.textContent = it.name
      cell3.textContent = it.url

      // set body and headers for POST
      if (it.options && it.options.body) {
        it.options.body = JSON.stringify(it.options.body)
        it.options.headers = Object.assign({}, it.options.headers, {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        })
      }

      fetch(it.url, Object.assign({
        cache: 'no-cache',
        mode: 'cors',
        credentials: 'same-origin'
      }, it.options || {})).then(response => {
        if (response.ok) {
          cell4.textContent = 'OK'
          cell4.className = 'correct'
          return response.json()
        }

        throw new Error(`${response.statusText || response.status}`)
      }).catch(reason => {
        console.log(reason)
        cell4.textContent = reason
        cell4.className = 'incorrect'
      })

    }
  }
});

