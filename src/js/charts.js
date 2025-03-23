"use strict";


//Deklarerar variabler i mitt globala scope. Två tomma för array med alla kurser och för filtrerad array.
let data = [];
let filteredCourses = [];
let sortedCourses = [];
let top6Courses = [];
let top6CourseAppl = [];
let top6CourseNames = [];
let filteredPrograms = [];
let sortedPrograms = [];
let top5Programs = [];
let top5ProgramAppl = [];
let top5ProgramNames = [];



window.onload = () => {
    getData();
}

//Funktion som fetchar API från en url med async/await för att invänta att svaret hinner komma, samt try/catch för att kunna leverera ett felmedelande om något misslyckats men ändå kör vidare koden (vilket är ganska meningslöst i det här fallet eftersom den inte kan göra något utan API-datan...)
async function getData() {

    try {
        const response = await fetch(
            "https://studenter.miun.se/~mallar/dt211g/"
        );

        //Obs! Ändrara värde på data, inte deklarerar (det är redan gjort)
        data = await response.json();
        console.log(data);

        //Kör funktionen barChart och pieChart om hämtningen lyckats
        barChart(data);
        pieChart(data);

    } catch (error) {
        console.error("Det har uppstått ett fel: ", error);
    }
}

//Funktion som filtrerar min array med alla kurser och alla program
function barChart(data) {

    console.log("Här fortsätter mitt program ...");
    console.log(data);

    //Filtrerar ut Kurser på type
    filteredCourses = data.filter((course) => 
        course.type === "Kurs"
    );
    console.log("Filtreerad på kurs...");
    console.log(filteredCourses);

    //Sorterar Kurser från de med mest sökande
    sortedCourses = filteredCourses.sort((a,b) => 
        b.applicantsTotal - a.applicantsTotal
    );
    console.log("Filtrerad på kurs och sorterad...");
    console.log(sortedCourses);

    //Skalar av så bara topp 6 är kvar
    top6Courses = sortedCourses.slice(0, 6);
    console.log("Top 6 kurser...");
    console.log(top6Courses);



    //Kör funktionen dataToBarChart igen men med den filtrerade, sorterade och avskalade arrayen
    dataToBarChart(top6Courses);
}


//Funktion som filtrerar min array med alla kurser och alla program
function pieChart(data) {

    console.log("Här fortsätter mitt program 2...");
    console.log(data);

    //Filtrerar ut Kurser på type
    filteredPrograms = data.filter((program) => 
        program.type === "Program"
    );
    console.log("Filtreerad på program...");
    console.log(filteredPrograms);

    //Sorterar Kurser från de med mest sökande
    sortedPrograms = filteredPrograms.sort((a,b) => 
        b.applicantsTotal - a.applicantsTotal
    );
    console.log("Filtrerad på program och sorterad...");
    console.log(sortedPrograms);

    //Skalar av så bara topp 6 är kvar
    top5Programs = sortedPrograms.slice(0, 5);
    console.log("Top 5 program...");
    console.log(top5Programs);


    //Kör funktionen dataToPieChart igen men med den filtrerade, sorterade och avskalade arrayen
    dataToPieChart(top5Programs);
}




function dataToBarChart(top6Courses) {

console.log("Kör funktionen dataToBarChart...");

    //Skapar array med bara antal sökande från topp 6
    top6CourseAppl = top6Courses.map(course => course.applicantsTotal);
    console.log("Top 6 kursers antal sökande...");
    console.log(top6CourseAppl);

    //Skapar array med bara kursnamn från topp 6
    top6CourseNames = top6Courses.map(course => course.name);
    console.log("Top 6 kursers namn...");
    console.log(top6CourseNames);

let options = {
    chart: {
      type: 'bar',
      height: '800px',
    },
    plotOptions: {
        bar: {
            distributed: true
        }
    },
 
    series: [{
      name: 'Antal sökande',
      data: top6CourseAppl
    }],

    xaxis: {
        categories: top6CourseNames,

      labels: {
        trim: false,
        rotate: -45,
        hideOverlappingLabels: false,
        maxHeight: 220,
        show: false
      }
    },

    yaxis: {
        title: {
        text: 'Antal sökande',
            style: {
            fontSize: '12px',
            fontWeight: 'bold'
        }
        }
      },

    title: {
        text: 'Topp 6 mest sökta kurserna på Mittuniversitetet HT24',
        align: 'left',
        margin: 50,
        style: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    },



    fill: {
        colors: ['rgb(84, 12, 92)', 'rgb(217, 102, 255)']
    },

    responsive: [{
        breakpoint: 580,
        options: {
            title: {
                text: 'Topp 6 mest sökta kurserna',
                align: 'left',
                margin: 50,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
        
            subtitle: {
                text: 'på Mittuniversitetet HT24',
                align: 'left',
                margin: 50,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold'
                }
            },
        }
    }]

}
  
let chart = new ApexCharts(document.querySelector("#chart1"), options);
console.log(options);

chart.render();
}




function dataToPieChart(top5Programs) {

console.log("Kör funktionen dataToPieChart...");

    //Skapar array med bara antal sökande från topp 5
    top5ProgramAppl = top5Programs.map(program => program.applicantsTotal);
    console.log("Top 5 programs antal sökande...");
    console.log(top5ProgramAppl);

    //Skapar array med bara antal sökande från topp 5 som heltal (för pie-diagram verkade kräva det tillskillnad från stapel?)
    let top5ProgramApplInt = top5ProgramAppl.map(number => parseInt(number));
    console.log("Top 5 programs antal sökande som heltal...");
    console.log(top5ProgramApplInt);

    //Skapar array med bara kursnamn från topp 5
    top5ProgramNames = top5Programs.map(program => program.name);
    console.log("Top 5 programs namn...");
    console.log(top5ProgramNames);


let options2 = {
    series: top5ProgramApplInt,
    chart: {
    width: 680,
    height: '800px',
    type: 'pie',
    },
    

  labels: top5ProgramNames,

    title: {
    text: 'Topp 5 mest sökta programmen på Mittuniversitetet HT24',
    align: 'left',
    margin: 50,
    style: {
        fontSize: '14px',
        fontWeight: 'bold'
        }
    },

    fill: {
    colors: ['rgb(84, 12, 92)', 'rgb(217, 102, 255)','rgb(143, 21, 157)', 'rgb(213, 117, 245)','rgb(56, 7, 61)']
    },

    responsive: [{
    breakpoint: 580,
    options2: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      },
      title: {
        text: 'Topp 5 mest sökta programmen',
        align: 'left',
        margin: 50,
        style: {
            fontSize: '14px',
            fontWeight: 'bold'
            }
        },
      subtitle: {
        text: 'på Mittuniversitetet HT24',
        align: 'left',
        margin: 50,
        style: {
            fontSize: '14px',
            fontWeight: 'bold'
        }
    },

    }
    }]
}

let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
console.log(options2);

chart2.render();
}

