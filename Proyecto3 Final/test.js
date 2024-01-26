//Reading Jsonfiles
sex = d3.json('Project_3_Team5-main/java_script_code/homicides_by_sex_and_education/static/data/DataSex.json')
scholarity = d3.json('Project_3_Team5-main/java_script_code/homicides_by_sex_and_education/static/data/scholarity.json')
age = d3.json('Project_3_Team5-main/java_script_code/graph_by_age/static/data/newDataAge.json')

for(let i = 4; i >-1; i--){
    console.log(i)
    sex.then(datasex=>[
        scholarity.then(dataScholarity=>{
            age.then(dataAge=>{
                
                var trace1 = {
                    x: ['Men','Women'],
                    y: [datasex[i].men, datasex[i].women],
                    type: 'bar',
                    text : [datasex[i].men, datasex[i].women],
                    name: 'Sex'
            
                    
                };
                console.log(trace1)
                var trace2 = {
                    x: ['primaria','secundaria','bachillerato','profesional','posgrado'],
                    y: [dataScholarity[i]['Primaria completa'],dataScholarity[i]['Secundaria o equivalente'],dataScholarity[i]['Bachillerato o preparatoria completo'],dataScholarity[i]['Profesional'],dataScholarity[i]['Posgrado']],
                    text:[dataScholarity[i]['Primaria completa'],dataScholarity[i]['Secundaria o equivalente'],dataScholarity[i]['Bachillerato o preparatoria completo'],dataScholarity[i]['Profesional'],dataScholarity[i]['Posgrado']],
                    type: 'bar',
                    xaxis: 'x2',
                    yaxis: 'y2',
                    name: 'School'
                };
                
                var trace4 = {
                    x: ['less than 1 year',
                    '1-4 years',
                    '5-9 years',
                    '10-14 years',
                    '15-19 years',
                    '20-24 years',
                    '25-29 years',
                    '30-34 years',
                    '35-39 years',
                    '40-44 years',
                    '45-49 years',
                    '50-54 years',
                    '55-59 years',
                    '60-64 years',
                    '65-69 years',
                    '70-74 years',
                    '75-79 years',
                    '80-84 years',
                    '85 years +'],
                    y: [
                        dataAge[i]['less than 1 year'],
                        dataAge[i]['1-4 years'],
                        dataAge[i]['5-9 years'],
                        dataAge[i]['10-14 years'],
                        dataAge[i]['15-19 years'],
                        dataAge[i]['20-24 years'],
                        dataAge[i]['25-29 years'],
                        dataAge[i]['30-34 years'],
                        dataAge[i]['35-39 years'],
                        dataAge[i]['40-44 years'],
                        dataAge[i]['45-49 years'],
                        dataAge[i]['50-54 years'],
                        dataAge[i]['55-59 years'],
                        dataAge[i]['60-64 years'],
                        dataAge[i]['65-69 years'],
                        dataAge[i]['70-74 years'],
                        dataAge[i]['75-79 years'],
                        dataAge[i]['80-84 years'],
                        dataAge[i]['85 years y m‡s']
                        
                    ],
                    type: 'bar',
                    name: 'Age',
                    xaxis: 'x4',
                    yaxis: 'y4',
                    title:'jshs'
                };
                
                var data = [trace1, trace2, trace4];
                
                var layout = {
            
                    title: `${datasex[i].Year}`,
                    xaxis: {
                    domain: [0, 0.45],
                    anchor: 'y1'
                    },
                    yaxis: {
                    domain: [0.5, 1],
                    anchor: 'x1'
                    },
                    xaxis2: {
                    domain: [0.45, 1],
                    anchor: 'y2'
                    },
                    yaxis2: {
                    domain: [0.5, 1],
                    anchor: 'x2'
                    },
                    xaxis4: {
                    domain: [0, 1],
                    anchor: 'y4'
                    },
                    yaxis4: {
                    domain: [0, 0.45],
                    anchor: 'x4'
                    },
                    annotations: [{
                        text: "Homicides by gender",
                        font: {
                        size: 16,
                        color: 'blue',
                        },
                        showarrow: false,
                        align: 'center',
                        x: 0.13,
                        y: 1.1,
                        xref: 'paper',
                        yref: 'paper',
                    },
                        {
                            text: "Educational Level",
                        font: {
                        size: 16,
                        color: 'orange',
                        },
                        showarrow: false,
                        align: 'center',
                        x: 0.9,
                        y: 1.1,
                        xref: 'paper',
                        yref: 'paper',
                        },
                        
                
                    ]
                };
                
                Plotly.newPlot(`graph${i}`, data, layout);
                d3.select(`#Total${i}`).text(`${dataScholarity[i]['Total']} Homicides`)
            })
        })
    ])
}


