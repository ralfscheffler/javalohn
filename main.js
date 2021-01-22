//const fetch=require('node-fetch');

//Globale variablen

var   aPersonal;
var   iRec=0;
var   iReccount=0;


function openlocations() {
    fetch('http://scheffler-hardcore.com:2010/hardcore/dp/DP_L_Location')
    .then(function(response){
        if(!response.ok){
          throw Error(response.statusText);
        }
        return response;
    }).then(response => response.json())
    .then(data => writeLocations(data.value))
    .catch(function(error){
      alert(error);
    });
};

function writeLocations(arrData){
    var tempJSON = arrData;
     locations.list = [];

     tempJSON.forEach(function(arrItem){
          locations.list.push({id:arrItem.id, name:arrItem.name});
        });

    locations.list.forEach(function(item){
      var o = new Option (item.name, item.id);
      o.innerHTML = item.name;
      document.getElementById("locations").appendChild(o);});
};

function writePersonal(arrData=[]){

  if(aPersonal){
      aPersonal.push(arrData);
      iReccount = aPersonal.length;
      iRec = iReccount-1;
  }else{
    aPersonal = arrData;
    iRec  = 0;
    iReccount = aPersonal.length;
  };
   
  $("#btnNext").prop("disabled",false);
  $("#btnPrev").prop("disabled",false);
  $("#btnNew").prop("disabled",false);
  $("#inputVorname").val(arrData[iRec].Vorname);
  $("#inputNachname").val(arrData[iRec].Name);
  $("#inputAdress").val(arrData[iRec].Strasse);
  $("#inputCity").val(arrData[iRec].Ort);
  $("#inputPlz").val(arrData[iRec].PLZ);
  $("#inputBirthday").val(arrData[iRec].Geburtsdatum);
  $("#inputNationalitaet").val(arrData[iRec].Staatsangehoerigkeit);
};



function addButtonEvents(){
  document.getElementById('btnSubmit').addEventListener('click',submitBtnClick);
  //document.getElementById('locations').addEventlistener('change', selectionChange);
  document.getElementById('login').addEventListener('click',loginBtnClick);
  document.getElementById('btnNext').addEventListener('click',nextBtnClick);
  document.getElementById('btnPrev').addEventListener('click',prevBtnClick);
  document.getElementById('btnNew').addEventListener('click',newBtnClick);
};

function loginBtnClick(){
  

   

    var sFilter=  $("#locations :selected").text();
    fetch('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter?$filter=contains(Betrieb,'+ "'" +sFilter+"'" +')')
    .then(function(response){
        if(!response.ok){
          throw Error(response.statusText);
       }
        return response;})
    .then(response => response.json())
    .then(data => writePersonal(data.value))
    .catch(function(error){
      alert(error);
    });
};
async function submitBtnClick(){

  $("#btnNew").prop("disabled",true);
  $(':input').attr('readonly');
  //var input = $( "form input:text" );
    
   postEveryThing();
};

function nextBtnClick(){
  iRec++;
  if (iRec < iReccount){
    movePersonal()
    
  } else iRec--; 
    
};
function prevBtnClick(){
  iRec--;
  if (iRec > -1){
    movePersonal()
  }else iRec++;
  
};
function newBtnClick(){
    $("#btnNext").prop("disabled",true);
    $("#btnPrev").prop("disabled",true);
    $("#btnSubmit").prop("disabled",false);

    $(':input').removeAttr('readonly'); //readonly aufheben

    var input = $( "form input:text" );
 
    for (var i = 0; i <= input.length-1; i++) {
      input[i].value = ''; //clear alle eingabefelder
    }
};

function movePersonal(){
  $("#inputVorname").val(aPersonal[iRec].Vorname);
    $("#inputNachname").val(aPersonal[iRec].Name);
    $("#inputAdress").val(aPersonal[iRec].Strasse);
    $("#inputCity").val(aPersonal[iRec].Ort);
    $("#inputPlz").val(aPersonal[iRec].PLZ);
    $("#inputBirthday").val(aPersonal[iRec].Geburtsdatum);
    $("#inputNationalitaet").val(aPersonal[iRec].Staatsangehoerigkeit);
}

async function postPersonalData(url='',data={}){
  let response = await fetch(url,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

async function postJobData(url='',data={}){
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'  
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

async function postLohnData(url='',data={}){
  const response = await fetch(url,{
    method: 'POST',
    headers:{
      'Content-Type':'application/json'  
    },
    body: JSON.stringify(data)
  });
  return response.json();
};

  async function postJobID(url='',data={}){
    const response = await fetch(url,{
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  };
  
    async function postLohnID(url='',data={}){
        const response = await fetch(url,{
          method:'PATCH',
          headers:{
            'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
        });
        //await this.reloadMitarbeiter;
        return response.json();
      };

   async function postEveryThing(){

        var persArr={Vorname:$('#inputVorname').val(),Name:$('#inputNachname').val(),Strasse: $('#inputAdress').val(),Ort:$('#inputCity').val(),
            PLZ:$('#inputPlz').val(),Geburtsdatum:$('#inputBirthday').val(),Staatsangehoerigkeit:$('#inputNationalitaet').val(),farbe:$("#favcolor").val(),
            Betrieb:$("#locations :selected").text()};
        var jobArr={minijob:$("#mini").is(':checked') ? 1 : 0,fest:$("#fest").is(':checked') ? 1 : 0,student:$("#studi").is(':checked') ? 1 : 0,gleitzone:$("#gleit").is(':checked') ? 1 : 0};
        var lohnArr={MaxLohn:parseFloat($('#inputLohn').val()),Stundenlohn:parseFloat($('#inputStdlohn').val()),Festlohn:parseFloat($('#inputFestlohn').val()),
            zu_nacht1:$("#nacht").is(':checked') ? 1 : 0,zu_nacht2:$("#nacht").is(':checked') ? 1 : 0, zu_sonntag:$("#nacht").is(':checked') ? 1 : 0,zu_feiertag:$("#nacht").is(':checked') ? 1 : 0,
            MaxStunden:parseFloat($('#inputStunden').val())};

            
        
       
          $("#btnSubmit").prop("disabled", true);
          
          //const result=await postJobID('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter(' +personal.id+ ')',{fkJobsID:jobs});
          //const resp = await postLohnID('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter(' +personal.id+ ')',{fkLohnartID:lohn});
          var successStatus=false;

          var personal = await axios.post('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter',persArr);

          successStatus = (personal.status==201);

          var jobs = await axios.post('http://scheffler-hardcore.com:2010/hardcore/dp/DP_L_Job',jobArr);

          successStatus = (jobs.status==201);

          var lohn = await axios.post('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Lohnform',lohnArr);

          successStatus = (lohn.status==201);

          var result=await axios.patch('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter(' +personal.data.id+ ')',{fkJobsID:jobs.data});
          successStatus = (result.status==200);

          var resp = await axios.patch('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter(' +personal.data.id+ ')',{fkLohnartID:lohn.data});
          successStatus = (resp.status==200) &&(personal.status==201) &&(jobs.status==201) &&(lohn.status==201)&&(result.status==200);

          if(successStatus){
            var sFilter=  $("#locations :selected").text();
            var data = await axios.get('http://scheffler-hardcore.com:2010/hardcore/dp/DP_T_Mitarbeiter?$filter=contains(Betrieb,'+ "'" +sFilter+"'" +')')
            writePersonal(data.data.value);
          }else {
            alert('etwas ist schiefgegangen');
          };

         
        
       
    };

