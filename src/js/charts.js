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

/** 
* //Kör funktionen getData vid inläsning av sidan
*/
window.onload = () => {
    getData();
}

/** 
* //Funktion som fetchar API från en url med async/await för att invänta att svaret hinner komma, samt try/catch för att kunna leverera ett felmedelande om något misslyckats men ändå kör vidare koden
*/
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

    //Skriver ut felmeddelande till consol log om något fel uppstår vid inhämtningen av data från API
    } catch (error) {
        console.error("Det har uppstått ett fel: ", error);
    }
}

/**
* //Funktion som filtrerar ut alla kurser från min array och därefter sorterar dem samt skalar av listan till endast topp 6 mest sökta kurserna
* @param {array} data - En array med objekt från API
*/
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

/** 
* //Funktion som filtrerar ut alla program från min array och därefter sorterar dem samt skalar av listan till endast topp 5 mest sökta programmen
* @param {array} data - En array med objekt från API
*/
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

/** 
* Funktion som skapar ett stapeldiagram av de topp 6 kurserna med hjälp av Apexcharts 
* @param {array} top6Courses - En array med objekt från API, filtrerade och sorterade och avskalad till topp 6 sökta kurser
*/
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
      height: '600px',
      width: '100%'
    },

    noData: {
        text: 'Loading...',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
    },

    plotOptions: {
        bar: {
            distributed: true,
        },
    },

    legend: {
        show: true,
        labels: {
        //   colors: 'rgb(0, 255, 42)', 
        },
        position: 'bottom',  
        horizontalAlign: 'center', 
        verticalAlign: 'top', 
        floating: false, 
        itemMargin: {
            horizontal: 5,
            vertical: 8
        },
        onItemClick: {
            toggleDataSeries: true
          },
        onItemHover: {
            highlightDataSeries: true
          },
    },

    dataLabels: {
        style: {
          colors: ['rgb(255, 255, 255)'],
          dropShadow: {
            enabled: false,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
            color: '#000',
          }
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
            fontWeight: 'bold',
            fontFamily:  undefined,
            }
        },
        labels: {
            style: {
                color: ['rgb(0, 255, 60)'],
            }
        },
        tickAmount: 10,  // Ställer in antalet ticks på y-axeln till 5
      },

    title: {
        text: 'Topp 6 mest sökta kurserna på Mittuniversitetet HT24',
        align: 'left',
        margin: 100,
        style: {
            fontSize: '14px',
            fontWeight: 'bold',
            fontFamily:  undefined,
            color: 'rgb(30, 255, 0)'
        }
    },

    fill: {
        colors: ['rgb(84, 12, 92)', 'rgb(217, 102, 255)'],
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "vertical",
          shadeIntensity: 0.3,
          gradientToColors: undefined, 
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 70, 100],
        //   colorStops: [ 
        //     [
        //       {
        //         offset: 0,
        //         color: 'rgb(84, 12, 92)',
        //         opacity: 1
        //       },
        //       {
        //         offset: 50,
        //         color: 'rgb(217, 102, 255)',
        //         opacity: 1
        //       },
        //       {
        //         offset: 100,
        //         color: 'rgb(84, 12, 92)',
        //         opacity: 1
        //       }
        //     ],
        //   ]
        }
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
                    fontWeight: 'bold',
                    fontFamily:  undefined,
                    color: 'rgb(217, 102, 255)'
                }
            },
        
            subtitle: {
                text: 'på Mittuniversitetet HT24',
                align: 'left',
                margin: 50,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily:  undefined,
                    color: 'rgb(217, 102, 255)'
                }
            },
        }
    }]
}
  
let chart = new ApexCharts(document.querySelector("#chart1"), options);
console.log(options);

chart.render();

}



/** 
* Funktion som skapar ett cirkeldiagram av de topp 5 programmen med hjälp av Apexcharts 
* @param {array} top5Programs - En array med objekt från API, filtrerade och sorterade och avskalad till topp 5 sökta program

*/
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

    chart: {
    width: '100%',
    height: '700px',
    type: 'pie',
    },
    
    series: top5ProgramApplInt,


  labels: top5ProgramNames,

  title: {
    text: 'Topp 5 mest sökta programmen på Mittuniversitetet HT24',
    align: 'left',
    margin: 100,
    style: {
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily:  undefined,
        
        }
    },

    noData: {
        text: 'Loading...',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: '14px',
          fontFamily: undefined
        }
    },

    legend: {
        show: true,
        labels: {
        // colors: 'rgb(0, 255, 42)', 
        },
        position: 'bottom',  
        horizontalAlign: 'center', 
        verticalAlign: 'top', 
        floating: false, 
        itemMargin: {
            horizontal: 5,
            vertical: 8
        },
        onItemClick: {
            toggleDataSeries: true
          },
        onItemHover: {
            highlightDataSeries: true
          },
    },

    dataLabels: {
        style: {
          colors: ['rgb(255, 255, 255)'],
        },
        dropShadow: {
            enabled: true,
            top: 0,
            left: 0,
            blur: 3,
            opacity: 0.5,
            color: 'rgb(0, 0, 0)',
          }
    },

    fill: {
    colors: ['rgb(84, 12, 92)', 'rgb(217, 102, 255)','rgb(143, 21, 157)', 'rgb(186, 19, 242)','rgb(56, 7, 61)'],
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: "horizontal",
      shadeIntensity: 0.5,
      gradientToColors: undefined, 
      inverseColors: true,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 70, 100],
      colorStops: []
    }
    },

    responsive: [{
        breakpoint: 580,
        options: {
            chart: {
                width: '100%',
                height: '600px',
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
                    fontWeight: 'bold',
                    fontFamily:  undefined,
                    // color: 'rgb(217, 102, 255)'
                    }
                },

            subtitle: {
                text: 'på Mittuniversitetet HT24',
                align: 'left',
                margin: 50,
                style: {
                    fontSize: '14px',
                    fontWeight: 'bold',
                    fontFamily:  undefined,
                    // color: 'rgb(217, 102, 255)'
                }
            },
        }
    }]
}

let chart2 = new ApexCharts(document.querySelector("#chart2"), options2);
console.log(options2);

chart2.render();
}

