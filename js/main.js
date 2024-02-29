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

function addOutlineTo2020(series, index2020) {
	series.data[index2020].update({
		borderWidth: 2,
		borderColor: "red",
	});
}

function getImageForLegendItem(legendItem) {
	if (legendItem === "Pass") {
		return "https://p1.hiclipart.com/preview/631/856/929/check-mark-symbol-checkbox-black-and-white-text-line-circle-area-angle-png-clipart.jpg";
	} else if (legendItem === "Fail") {
		return "https://www.tinotech.co.za/media/ftgkvrsehu4cj4dv9hj9gsp9o2-0f11181185353f6f05b2f4b338870c21.png";
	} else if (legendItem === "Did Not Finish (DNF)") {
		return "https://www.tinotech.co.za/media/5b43ef96cea77-e3c9466540863ace1fa42324f4b0d031.png";
	}
}

let chart;

chart = Highcharts.chart("container", {
	chart: {
		height: 800,

		events: {
			load() {
				setTimeout(() => {
					const index2020 = chart.xAxis[0].categories.indexOf(2020);

					chart.series.forEach((series) => {
						addOutlineTo2020(series, index2020);
					});
				}, 500);
			},
		},
	},
	legend: {
		itemStyle: {
			width: "40px",
			height: "40px",
		},
		symbolWidth: 40,
		symbolHeight: 40,
		symbolPadding: 10,
		symbolRadius: 0,
		labelFormatter: function () {
			return `<div style="display: flex;">
			<span>${this.name}</span>
			<img src="${getImageForLegendItem(
				this.name
			)}" style="width: 40px; height: 40px;" />
			</div>`;
		},
		align: "right", // Align the legend to the left
		verticalAlign: "bottom", // Align the legend to the bottom
		x: 10, // Adjust the horizontal position of the legend
		y: 10,
	},
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
			dataLabels: {
				enabled: true,
				color: "black",
				style: {
					textOutline: "1px contrast",
				},
				formatter: function () {
					return this.y;
				},
			},
		},
	},

	series: [
		{
			type: "column",
			name: "Pass",
			data: marksByStatus.Pass.map((row) => row[selectedCourse]),
			color: {
				pattern: {
					image:
						"https://p1.hiclipart.com/preview/631/856/929/check-mark-symbol-checkbox-black-and-white-text-line-circle-area-angle-png-clipart.jpg",
					aspectRatio: 1,
				},
			},
		},
		{
			type: "column",
			name: "Fail",
			data: marksByStatus.Fail.map((row) => row[selectedCourse]),
			color: {
				pattern: {
					image:
						"https://www.tinotech.co.za/media/ftgkvrsehu4cj4dv9hj9gsp9o2-0f11181185353f6f05b2f4b338870c21.png",
					aspectRatio: 1,
				},
			},
		},
		{
			type: "column",
			name: "Did Not Finish (DNF)",
			data: marksByStatus.DNF.map((row) => row[selectedCourse]),
			color: {
				pattern: {
					image:
						"https://www.tinotech.co.za/media/5b43ef96cea77-e3c9466540863ace1fa42324f4b0d031.png",
					aspectRatio: 1,
				},
			},
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
