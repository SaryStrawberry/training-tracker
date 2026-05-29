const container = document.querySelector("#container");

const csv = './muscle_group_training.csv';
const data = d3.csv(csv, d3.autoType).then(data => {

    const muscleGroupMetricLabels = {
        upperBody: "Upper-Body training",
        lowerBody: "Lower-Body training",
        core: "Core training"
    }

    const ages = data.map(d => d.age);

    const chart = d3.select(container);
    chart.append("p")
        .attr("id", "graph-title");

    const controls = chart.append("div")
        .attr("class", "chart-controls");

    controls.append("label")
        .attr("for", "muscleGroupMetric")
        .text("Muscle Group");

    const select = controls.append("select")
        .attr("id", "muscleGroupMetric");

    select.selectAll("options")
        .data(Object.entries(muscleGroupMetricLabels))
        .join("option")
        .attr("value", ([key]) => key)
        .text(([,label]) => label);

    const width = 720;
    const height = 430;
    const margin = {top: 35, right: 25, bottom: 60, left: 58};

    const svg = chart.append("svg")
        .attr("viewBox", [0, 0, width, height]);

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x0 = d3.scaleBand()
        .domain(data.map(d => d.age))
        .range([0, innerWidth])
        .padding(0.25);

    const x1 = d3.scaleBand()
        .domain(data.map(d => d.gender))
        .range([0, x0.bandwidth()])
        .padding(0.05);

    const y = d3.scaleLinear()
        .domain([0,100])
        .range([innerHeight, 0]);

    const xAxis = g.append("g")
        .attr("transform", `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x0));

    const yAxis = g.append("g")
        .call(d3.axisLeft(y).ticks(3).tickFormat(d => d + "%"));

    const barsGroup = g.append("g");
    const labelGroup = g.append("g");

    function render(metric) {
        const ageGroups = barsGroup.selectAll("g.age-group")
            .data(ages, d => d)
            .join("g")
            .attr("class", "age-group")
            .attr("transform", d => `translate(${x0(d)}, 0)`);
        ageGroups.selectAll("rect")
            .data(d => data.filter(r => r.age === d), d => d.gender)
            .join(
                enter => enter.append("rect")
                    .attr("x", d => x1(d.gender))
                    .attr("width", x1.bandwidth())
                    .attr("y", y(0))
                    .attr("height", 0)
                    .attr("rx", 8)
                    .attr("fill", "#8fbc8f")
                    .call(enter => enter.transition().duration(550)
                        .attr("y", d => y(d[metric]))
                        .attr("height", d => innerHeight - y(d[metric]))),
                update => update.call(update => update.transition().duration(550)
                    .attr("y", d => y(d[metric]))
                    .attr("height", d => innerHeight - y(d[metric]))),
                exit => exit.remove()
            );
    }

    select.on("change", event => render(event.target.value));
    render("upperBody");
    console.log("Hello")
});



