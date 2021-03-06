let params={};

function addUs(){
    params.country='us';
};

function addUk(){
    params.country='uk';
};

function addAr(){
    params.country='ar';
};

function addWW(){
    params.country='ww';
};

function addAllPlatforms(){
    params.platform='Allplatforms';
};

function addiOS(){
    params.platform='iOS';
};

function addAndroid(){
    params.platform='Android';
};

function addAllNetworks(){
  params.networks='Allnetworks';
};

function addFacebook(){
  params.networks='Facebook';
};

function addAdmob(){
  params.networks='AdMob';
};

function addUnity(){
  params.networks='Unity';
};

function addIronSource(){
  params.networks='IronSource';
};

function addChartboost(){
  params.networks='Chartboost';
};

function addAppLovin(){
  params.networks='AppLovin';
};

function addother(){
  params.networks='other';
};



// function Execute(){
//     //------------------------1. PREPARATION------------------------//
//     //-----------------------------SVG------------------------------// 
//     const width = 1000;
//     const height = 450;
//     const margin = 5;
//     const padding = 5;
//     const adj = 40;
//     // we are appending SVG first
//     d3.selectAll("svg").remove();
//     const svg = d3.select("#chart")
//         .append("svg")
//         .attr("viewBox", "-"
//              + adj + " -"
//              + adj + " "
//             + (width + adj *3) + " "
//             + (height + adj*2))
//         //.style("padding", padding)
//         .style("margin", margin)
//         .classed("svg-content", true);

//     //-----------------------------DATA-----------------------------//
//     const timeConv = d3.timeParse("%Y-%m-%d");

//     let dataset = d3.csv("./csv_for_site/"+params.country+params.platform+params.networks+".csv");
//     dataset.then(function(data) {
//         var slices = data.columns.slice(1).map(function(id) {
//             return {
//                 id: id,
//                 values: data.map(function(d){
//                     return {
//                         date: timeConv(d.date),
//                         measurement: +d[id]
//                     };
//                 })
//             };
//         });

//     //----------------------------SCALES----------------------------//
//     const xScale = d3.scaleTime().range([0,width]);
//     const yScale = d3.scaleLinear().rangeRound([height, 0]);
//     xScale.domain(d3.extent(data, function(d){
//         return timeConv(d.date)}));
//     yScale.domain([(0), d3.max(slices, function(c) {
//         return d3.max(c.values, function(d) {
//             return d.measurement + 4; });
//             })
//         ]);

//     //-----------------------------AXES-----------------------------//
//     const yaxis = d3.axisLeft()
//         .ticks((slices[0].values).length/5)
//         .scale(yScale)
//         .tickFormat(d3.format(",.0f")); //making axisticks format

//     const xaxis = d3.axisBottom()
//         .ticks(d3.timeDay.every(1))
//         .tickFormat(d3.timeFormat("%d-%m-%y"))
//         .scale(xScale);

//     //----------------------------LINES-----------------------------//
//     const line = d3.line()
//         .x(function(d) { return xScale(d.date); })
//         .y(function(d) { return yScale(d.measurement); }); 

//     //-------------------------2. DRAWING---------------------------//
//     //-----------------------------AXES-----------------------------//
//     svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(30," + height + ")")
//         .call(xaxis)
//         .selectAll("text")
//             .attr("x", -5)
//             .attr("dy",".35em")
//             .attr("transform","rotate(-90)")
//             .style("text-anchor","end");

//     svg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(30,0)")
//         .call(yaxis)
//         .append("text")
//         .attr("dy", ".75em")
//         .attr("y", 6)
//         .style("text-anchor", "end");

//     //----------------------------LINES-----------------------------//
//     const lines = svg.selectAll("lines")
//         .data(slices)
//         .enter()
//         .append("g")

//         lines.append("path")
//         .attr("transform", "translate(30,0)")
//         .attr("d", function(d) { return line(d.values); });

//     })
// };


function myFunction() {
    const width = 1000;
    const height = 350;
    const margin = 5;
    const padding = 5;
    const adj = 41;
    // we are appending SVG first
    d3.selectAll("svg").remove();
    const svg = d3.select("#chart").append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "-"
             + adj + " -"
             + adj + " "
            + (width + adj *3) + " "
            + (height + adj*3))
        //.style("padding", padding)
        .style("margin", margin)
        .classed("svg-content", true);
    
    
    let sd=document.getElementById("startdate").value;
    let ed=document.getElementById("enddate").value;

    const timeConv = d3.timeParse("%Y-%m-%d");
    let dataset = d3.csv("./csv_for_site/"+params.country+params.platform+params.networks+".csv");
    dataset
        .then(function(d){
            let data0=d.filter(function(i){
                return timeConv(i.date)>=timeConv(sd) && timeConv(i.date)<=timeConv(ed);
            });
            return data0;
        })
        .then(function(data) {
            let slices = data.slice(1).map(function(id) {
                return {
                    id: id,
                    values: data.map(function(d){
                        return {
                            date: timeConv(d.date),
                            measurement: +d.market_volume
                        };
                    }),
                };   
            });

            //----------------------------SCALES----------------------------//
            const xScale = d3.scaleTime().range([0, width]);
            const yScale = d3.scaleLinear().rangeRound([height, 0]);
            xScale.domain(d3.extent(data, function(d){
                return timeConv(d.date)}));
            yScale.domain([(0), d3.max(slices, function(c) {
                return d3.max(c.values, function(d) {
                    return d.measurement + 10; });
                    })
                ]);

            //-----------------------------AXES-----------------------------//
            const yaxis = d3.axisLeft()
                .ticks((slices[0].values).length/5)
                .scale(yScale)
                .tickFormat(d3.format(",.0f")); //making axisticks format

            const xaxis = d3.axisBottom()
                .ticks(d3.timeDay.every(1))
                .tickFormat(d3.timeFormat("%d-%m-%Y"))
                .scale(xScale);

            //----------------------------LINES-----------------------------//
            const line = d3.line()
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.measurement); }); 

            //-------------------------2. DRAWING---------------------------//
            //-----------------------------AXES-----------------------------//
            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30," + height + ")")
                .call(xaxis)
                .selectAll("text")
                    .attr("x", -5)
                    .attr("dy",".35em")
                    .attr("transform","rotate(-90)")
                    .style("text-anchor","end");

            svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(30,0)")
                .call(yaxis)
                .append("text")
                .attr("dy", ".75em")
                .attr("y", 8)
                .style("text-anchor", "end")
                .text("US$ spend on mobile games ads")
                .attr('transform', 'rotate(-90)');

            //----------------------------LINES-----------------------------//
            const lines = svg.selectAll("lines")
                .data(slices)
                .enter()
                .append("g")

                lines.append("path")
                .attr("transform", "translate(30,0)")
                .attr("d", function(d) { return line(d.values); });
            })
        }


