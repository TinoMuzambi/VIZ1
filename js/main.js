import marks from "./data/marks.json";

/**
 * Groups a list by the specified key.
 * @param {[]} xs List that you want to be grouped.
 * @param {String} key The key that you want the list to be grouped by
 * @returns Object with the values of key as attributes
 */
const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		(rv[x[key]] = rv[x[key]] || []).push(x);
		return rv;
	}, {});
};

// Get select element from DOM.
const selectElement = document.getElementById("courses");

// List of all the courses in the data
const coursesList = Object.keys(marks[0]).filter((el) => el.startsWith("CSC"));

// Populate the select element with the courses.
coursesList.map((lang, i) => {
	let opt = document.createElement("option");
	opt.value = i; // the index
	opt.innerHTML = lang;
	selectElement.append(opt);
});

// The currently selected course in the select.
let selectedCourse = "CSC1010H";

// Monitor the select element for changes and update the selectedCourse variable.
selectElement.addEventListener("change", (e) => {
	selectedCourse = coursesList[e.target.selectedIndex];
	chart.series[0].setData(marksByStatus.Pass.map((row) => row[selectedCourse]));
	chart.series[1].setData(marksByStatus.Fail.map((row) => row[selectedCourse]));
	chart.series[2].setData(marksByStatus.DNF.map((row) => row[selectedCourse]));
	chart.setTitle({
		text: `Performance Trends of ${selectedCourse} for 2019 - 2023`,
	});
	chart.redraw();
	console.log({ selectedCourse });
});

// Group marks by the status key.
const marksByStatus = groupBy(marks, "Status");
console.log(marksByStatus);

let chart = Highcharts.chart("container", {
	chart: { height: 800 },
	title: {
		text: `Performance Trends of ${selectedCourse} for 2019 - 2023`,
		align: "center",
	},
	subtitle: {
		text: "Analysis of Pass, Fail & DNF Counts",
	},
	xAxis: {
		title: { text: "Year" },
		categories: [...new Set(marks.map((el) => el.Year))],
	},
	yAxis: {
		title: {
			text: "Number of Students",
		},
	},
	credits: { enabled: false },
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
			data: marksByStatus.Pass.map((row) => row[selectedCourse]),
			color: "#002855",
		},
		{
			type: "column",
			name: "Fail",
			data: marksByStatus.Fail.map((row) => row[selectedCourse]),
			color: "#da6e5f",
		},
		{
			type: "column",
			name: "Did Not Finish (DNF)",
			data: marksByStatus.DNF.map((row) => row[selectedCourse]),
			color: "#ac9f3c",
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
