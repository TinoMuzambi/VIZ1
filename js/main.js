import marks from "./data/marks.json";

const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

const marksByStatus = groupBy(marks, "Status");
console.log(marksByStatus);

Highcharts.chart("container", {
	title: {
		text: "Statuses of Computer Science Grades",
		align: "center",
	},
	xAxis: {
		categories: [...new Set(marks.map((el) => el.Year))],
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
			data: marksByStatus.Pass.map((row) => row["CSC1010H"]),
		},
		{
			type: "column",
			name: "Fail",
			data: marksByStatus.Fail.map((row) => row["CSC1010H"]),
		},
		{
			type: "column",
			name: "DNF",
			data: marksByStatus.DNF.map((row) => row["CSC1010H"]),
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
