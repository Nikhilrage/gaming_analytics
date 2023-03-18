import React, { useEffect, useState } from "react";
import { analyticsData } from "../data/data.js";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import moment from "moment/moment.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Title,
  Tooltip
);

const options = {
  plugins: {
    Legend: {
      position: "top",
    },
    Title: {
      display: true,
      text: "Analytics",
    },
  },
};

const AnalyticsDashboard = () => {
  const [chartData, setChartData] = useState();
  const [startDate, setStartDate] = useState();
  const [lastDate, setLastDate] = useState();
  const [noDataFound, setNoDataFound] = useState(false);

  useEffect(() => {
    if (startDate && lastDate) {
      const getSelectedDataFromChosenRange = analyticsData.filter((date) => {
        return (
          moment(startDate) > moment(date) || moment(lastDate) < moment(date)
        );
      });
      if (getSelectedDataFromChosenRange.length === 0) {
        setNoDataFound(true);
        return;
      }

      if (getSelectedDataFromChosenRange) {
        setNoDataFound(false);
        setChartData({
          labels: getSelectedDataFromChosenRange.map((i) => i.app),
          datasets: [
            {
              label: "Daily Users",
              data: getSelectedDataFromChosenRange.map((i) => i.dailyUsers),
              backgroundColor: "pink",
            },
          ],
        });
      }
    }
  }, [analyticsData, startDate, lastDate]);

  return (
    <div>
      <div className="hint_msg">
        As Date is limited, Please Select Date from 12th Oct, 2018 to 24th Oct,
        2018.{" "}
      </div>
      <div className="main__content">
        <div style={{ display: "flex", columnGap: 10 }}>
          <span style={{ paddingRight: 10 }}>Filters:</span>

          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>
              Start Date:{" "}
            </label>
            <input
              type="date"
              value={startDate}
              minDate={new Date(14 - 10 - 2018)}
              maxDate={new Date(27 - 10 - 2018)}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 500 }}>End Date: </label>
            <input
              type="date"
              value={lastDate}
              onChange={(e) => setLastDate(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div>
        {chartData && !noDataFound ? (
          <Bar data={chartData} options={options} />
        ) : (
          <div className="no_content">{`No Data Found. Please select date from 2018.`}</div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
