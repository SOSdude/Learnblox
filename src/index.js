// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc, documentId } from 'firebase/firestore';

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


const btn = document.querySelector("#submit-file");
btn.addEventListener("click", (e)=> {
    e.preventDefault();

    Papa.parse(document.getElementById('files').files[0], { // Papa parse turns CSV to 2d array 
        header: false,
        complete: csvJSON, displayHTMLTable,
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

   function csvJSON(results) { // Convert CSV data to JSON
    var csv = results.data
    var headers = csv[0];
    var result = [];
    console.log(headers)
    console.log(csv)

    for(var i = 1; i < csv.length; i++) {
        var obj = {}
        var col = csv[i];
        for(var j = 0; j < col.length; j++) {
            obj[headers[j]] = csv[i][j]
        }
        result.push(obj)
      //  console.log(obj)
        addDoc(colRef, obj)
    }
    displayHTMLTable(results)
  } 
});


