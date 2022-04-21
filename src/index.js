// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, documentId, query, where } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCeXqMhq1fTZqsHV__q1E5wZ324BrKvz-U",
  authDomain: "learnblox-7dc2f.firebaseapp.com",
  projectId: "learnblox-7dc2f",
  storageBucket: "learnblox-7dc2f.appspot.com",
  messagingSenderId: "996247070877",
  appId: "1:996247070877:web:d4defe0b60207638074c74",
  measurementId: "G-62G04F1HZR"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)

const db = getFirestore()
const colRef = collection(db, 'Testbanks')

const submitBtn = document.querySelector("#save-file"); 
if(submitBtn) {
submitBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    Papa.parse(document.getElementById('files').files[0], {
        header: false,
        complete: csvJSON,
    });

    function csvJSON(input) { // convert csv to json
      var csv = input.data
      var headers = csv[0];
      var optionName = "options"

      var result = []; // for question array
      var testbankName = document.getElementById('tableName').innerHTML
  
      for(var i = 1; i < csv.length; i++) {
          var obj = {} 
          var optionArr = []
          var col = csv[i];
          for(var j = 0; j < col.length; j++) {
              if(j != 0 && j < 5) {
                optionArr[j - 1] = csv[i][j]
              } else {
              obj[headers[j]] = csv[i][j]
              }
          }
          obj[optionName] = optionArr
          result.push(obj)
      }
      var container = {}
      container["questions"] = result
      addDoc(colRef, container)
    } 
    getName()
});
}

function getName() {
  var x = document.getElementById('testBankName').value;
  if(x == "") {
      alert("Please Fill The Field")
      return;
  }
  showSave();
  document.getElementById('tableName').innerHTML = x;
}

function showSave() { // shows save button
  var x = document.getElementById('hidden');
  if(x.style.display == 'none') {
      x.style.display = 'block';
  }
  else {
      x.style.display = 'none';
  }
}

const btn = document.querySelector("#submit-file");
if(btn) {
btn.addEventListener("click", (e)=> {
    e.preventDefault();

    Papa.parse(document.getElementById('files').files[0], {
        header: false,
        complete: displayHTMLTable,
    });
    

   function displayHTMLTable(results){
    var table = "<table class='table'>";
    var data = results.data;
    
    for(var i=0;i<data.length;i++){
        table+= "<tr>";
        var col = data[i];
        
        for(var j=0;j<col.length;j++){
            table+= "<td>";
            table+= data[i][j]
            table+= "</th>";
        }
        table+= "</tr>";
    }
    table+= "</table>";
    
    $("#parsed_csv_list").html(table);
  }
  showSave()
   
});
}


const users = collection(db, 'Users')

const signUpBtn = document.querySelector("#sign-up");
if(signUpBtn) {
signUpBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    window.alert("Signup Successful");
    const username = document.getElementById('user_user').value
    const password = document.getElementById('user_pass').value;
    const user = {
        username: username,
        password: password,
    };
    addDoc(users, user);
});
}


const signInBtn = document.querySelector("#sign-in");
if(signInBtn) { 
signInBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    const username = document.getElementById('user_user').value
    const password = document.getElementById('user_pass').value

    const user = {
        username: username,
        password: password
    }
    //console.log("test");
    const userRef = query(users, where("username", "!=", user.username))
    console.log("userRef: "+userRef);
    console.log(user)
    alert("Login Successful")
    window.location.href = "teacher-dash.html"
});
}
