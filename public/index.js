import {admin} from "firebase-admin"
import {moment} from "moment" 
import {serviceAccount} from "../ra-dev-mechapp-9226f801c92c.json"

//get the data from user and push into firebase
function ExportToExcel(view){
  var htmltable= document.getElementById('view');
  var html = htmltable.outerHTML;
  window.open('data:application/vnd.ms-excel,' + encodeURIComponent(html));
}


function timeIn(){
  let timestamp1 = Date.now();
  let today = new Date();
  let timestamp2 = today.valueOf();
  document.getElementById('time').value=today;
}

function timeOut(){
  let timestamp3 = Date.now();
  let today = new Date();
  let timestamp4 = today.valueOf();
  document.getElementById('time1').value=today;
}

document.addEventListener("DOMContentLoaded", event =>{ 

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  let a = ['20201201', '20201202', '20201203', '20201204', '20201205', '20201206', '20201207', '20201208', '20201212',
    '20201210', '20201211', '20201212', '20201213', '20201214', '20201215', '20201216', '20201217', '20201218', '20201219',
    '20201220', '20201221', '20201222', '20201223', '20201224', '20201225', '20201226', '20201227', '20201228', '20201229', '20201230'
  ];

const db = admin.firestore();
const vendorRef = db.collection('vendor');
vendorRef.get().then((snapshot) => {
   //console.log(snapshot)
  snapshot.forEach(doc => {
    let mydata = doc.data();
    //console.log(mydata);    
    db.collection('vendor_history').doc(doc.id).listCollections().then((myList) => {
      //console.log(myList);
      let listOfCollections = [];         
      
      myList.forEach(collection => {          
        console.log(collection);         
        if (a.includes(String(collection.id))) {          
          //console.log(`doc ID: ${doc.id} and collection ID: ${collection.id}`);
          db.collection(`vendor_history/${doc.id}/${collection.id}/`).orderBy('ts').get().then((vh) => {
            vh.forEach(vhdoc => {
              let vhdata = vhdoc.data();
              if (vhdata.vs.toUpperCase() !== 'NOT ON DUTY') {
                // console.log(vhdata.ts.toDate()); 
                //console.log(doc.id, ',' ,mydata.vs, ',', mydata.mrodt);
                // moment.utc(vhdata.ts.toDate()).local().format().toString().replace('T', ' ').replace('+5:30', ''))
                //console.log( vhdata.vs) 
              }
            });            
          });           
        }
      })
    });
  });
});
})

 
//  db.collection('Employees').get()
//   .then(users=>{
//       users.forEach(doc=>{
//       data = doc.data()
//       console.log(data);
//       let frag = document.createDocumentFragment();
//       let tr = document.createElement('tr');
//         let td1 = document.createElement('td');
//          let td2 = document.createElement('td');
//          let td3 = document.createElement('td');
//          let tin = document.createElement('td');
//          let tout = document.createElement('td');

//          let del = document.createElement('td');
//          del.innerHTML = '<i type="button">Delete</i>';
//          let edit = document.createElement('td');
//          edit.innerHTML = '<i type="button">Edit</i>';

//           td1.appendChild(document.createTextNode(doc.id));
//           td2.appendChild(document.createTextNode(data.companyName));
//           td3.appendChild(document.createTextNode(data.employeeName));
//           tin.appendChild(document.createTextNode(data.timeIn));
//           tout.appendChild(document.createTextNode(data.timeOut));
          
//               tr.appendChild(td1);
//               tr.appendChild(td2);
//               tr.appendChild(td3);
//               tr.appendChild(tin);
//               tr.appendChild(tout);

//               tr.appendChild(del);
//               tr.appendChild(edit);
//               frag.appendChild(tr);
//               view.appendChild(frag);

//       //delete function

//           del.addEventListener("click",function(){                            
//               db.collection("Employees").doc(doc.id).delete().then(function() {
//                   console.log("Document successfully deleted!");
//               }).catch(function(error) {
//                   console.error("Error removing document: ", error);
//               });   
//           })

//       //update function

//           edit.addEventListener("click",function(){ 
//               document.getElementById("docName").value=doc.id;
//               document.getElementById("dName").value=data.companyName;
//               document.getElementById("name").value=data.employeeName;
//               document.getElementById("time").value=data.timeIn;
//               document.getElementById("time1").value=data.timeOut;

//               document.getElementById("docName").disabled=true;
//               document.getElementById("tin").disabled=true;
//               document.getElementById("time").disabled=true;
//               document.getElementById("time1").disabled=true;
//           })
//       })
//   })
// });



//push the data through code

// document.addEventListener("DOMContentLoaded", event =>{      
//     const app = firebase.app();
//     const db = firebase.firestore();
//     const docRef = db.collection('users').doc('hari');  
//     docRef.set({
//         firstName: 'Haritha',
//         lastName: 'P',
//         born: 1999
//     });
//     const aTuringRef = db.collection('users').doc('candidates');
//     aTuringRef.set({
//         'firstName': 'Tom',
//         'middleName': 'Jerry',
//         'lastName': 'and',
//         'born': 1998
//     });
//     const docR = db.collection('users');
//     docR.get()
//         .then(users=>{
//         users.forEach(doc=>{
//         data = doc.data()
//         console.log(data)
//         })
//     })
// });
// function googleLogin(){
//     const provider = new firebase.auth.GoogleAuthProvider();
//     firebase.auth().signInWithPopup(provider)
//     .then(result => {
//         const user = result.user;
//         document.write(`Email : ${user.email}`);
//         console.log("output",user)
//     })
//     .catch(console.log)
// }























