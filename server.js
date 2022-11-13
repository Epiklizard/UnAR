/*
25/09/22 Minh Tran
the server side code is responsible for parsing email data from form
and respond to GET requests: Contact and Landing page.
*/

const express = require('express')
const app = express();
const path = require('path')
var fs = require('fs');

// loading csv
var email_list = []
var dataStr = ''
fs.readFile('emails.csv', 'utf-8', function(err, data) {
    dataStr = data
    email_list = data.split(",");
})
let email_search = (arr, s_item) => {
    for (let i=0;i<email_list.length;i++) {
        //console.log(`${email_list[i]} == ${s_item}`) testing
        if (s_item == email_list[i]) {
            return true
        }
    }
    return false
}
// Parsing data
app.use(express.urlencoded({ extended: true }));

// serves static files 
app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname + '/contact.html'));
})

// Receiving email data from form
app.post('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
    let user_email = req.body['email']
    if (user_email.length == 0) {console.log('prompt: empty')} else {
        if (email_search(email_list, user_email) == false) {
            console.log(`${user_email} is new, adding to csv`)
            email_list.push(user_email)
            dataStr = dataStr.concat(`,${user_email}`)
            fs.writeFile('emails.csv', dataStr, 'utf-8', (err) => {
                // pass
            })
        } else {
            console.log(`${user_email} is a repeat, ignoreing`)
        }
    }
});


app.listen(3000, () => {
     console.log('server on localhost:3000/')
})
