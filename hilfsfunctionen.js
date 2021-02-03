function splitJob(data){

var tempData ={};

Object.entries(data).forEach(entry=>{
    if(entry[0]=="minijob"){
      tempData[`${entry[0]}`]= $("#mini").is(':checked') ? 1 : 0;//parseInt(`${entry[1]}`) ; 
      delete data[`${entry[0]}`];
    }
    if(entry[0]=="fest"){
        tempData[`${entry[0]}`]= $("#fest").is(':checked') ? 1 : 0;//parseInt(`${entry[1]}`) ; 
        delete data[`${entry[0]}`];
     }

      if(entry[0]=="student"){
        tempData[`${entry[0]}`]= $("#student").is(':checked') ? 1 : 0;//parseInt(`${entry[1]}`) ; 
        delete data[`${entry[0]}`];
      }
      if(entry[0]=="gleitzone"){
        tempData[`${entry[0]}`]= $("#gleitzone").is(':checked') ? 1 : 0;//parseInt(`${entry[1]}`) ;
        delete data[`${entry[0]}`];
      }

});
return tempData;  
};



function splitLohn(data){
    var tempData ={};

Object.entries(data).forEach(entry=>{
    if(entry[0]=="MaxLohn"){
      tempData[`${entry[0]}`]= parseFloat(`${entry[1]}`) ; 
      delete data[`${entry[0]}`];
    }
    if(entry[0]=="Stundenlohn"){
        tempData[`${entry[0]}`]= parseFloat(`${entry[1]}`) ; 
        delete data[`${entry[0]}`];
     }

      if(entry[0]=="Festlohn"){
        tempData[`${entry[0]}`]= parseFloat(`${entry[1]}`) ; 
        delete data[`${entry[0]}`];
      }
      if(entry[0]=="MaxStunden"){
        tempData[`${entry[0]}`]= parseInt(`${entry[1]}`) ;
        delete data[`${entry[0]}`];
      }
      if(entry[0]=="zu_nacht1"){
        tempData[`${entry[0]}`]= $("#nacht").is(':checked') ? 1 : 0;//parseInt(`${entry[1]}`) ;
        delete data[`${entry[0]}`];
      }

});
return tempData; 

};