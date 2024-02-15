Highcharts.chart("container", {
	title: {
		text: "Statuses of Computer Science Grades",
		align: "center",
	},
	xAxis: {
		categories: ["2019", "2020", "2021", "2022", "2023"],
	},
	yAxis: {
		title: {
			text: "",
		},
	},
	// tooltip: {
	// 	valueSuffix: " million ",
	// },
	plotOptions: {
		series: {
			borderRadius: "25%",
		},
	},
	series: [
		{
			type: "column",
			name: "Pass",
			data: [48, 33, 31, 70, 71],
		},
		{
			type: "column",
			name: "Fail",
			data: [27, 17, 18, 29, 23],
		},
		{
			type: "column",
			name: "DNF",
			data: [2, 4, 1, 0, 0],
		},
		// {
		// 	type: "line",
		// 	step: "center",
		// 	name: "Average",
		// 	data: [47, 83.33, 70.66, 239.33, 175.66],
		// 	marker: {
		// 		lineWidth: 2,
		// 		lineColor: Highcharts.getOptions().colors[3],
		// 		fillColor: "white",
		// 	},
		// },
	],
});
