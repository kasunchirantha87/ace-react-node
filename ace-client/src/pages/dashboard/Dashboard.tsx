import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";

import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { ApiResponse } from "../../types/apiResponce";
import { CountryResponse } from "../../types/countryResponse";
import "./Dashboard.css";
import axiosInstance from "../../services/axios.service";

const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";
const V1 = "v1.0";

const Dashboard = () => {
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [pieChartData, setPieChartData] = useState<any>({
    labels: [],
    data: [],
  });

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    data: [],
  });

  const [lineChartData, setLineChartData] = useState<any>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    getOutbrakeData();
    getCountryList();
  }, []);

  useEffect(() => {
    getOutbrakeData();
  }, [selectedCountry]);

  function getOutbrakeData() {
    return axiosInstance
      .get(`${BASE_URL}/${V1}/outbrake?country=${selectedCountry}`)
      .then((response: AxiosResponse<ApiResponse<any>>) => {
        console.log(response.data.data);
        const pieChartResult: any[] = [];
        const barChartResult: any[] = [];
        const lineChartResult: any[] = [];
        if (response.data.data) {
          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.disease]) {
              res[value.disease] = { disease: value.disease, death_count: 0 };
              pieChartResult.push(res[value.disease]);
            }
            res[value.disease].death_count += value.death_count;
            return res;
          }, {});

          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.year]) {
              res[value.year] = { year: value.year, death_count: 0 };
              barChartResult.push(res[value.year]);
            }
            res[value.year].death_count += value.death_count;
            return res;
          }, {});

          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.year]) {
              res[value.year] = { year: value.year, recoverd_count: 0 };
              lineChartResult.push(res[value.year]);
            }
            res[value.year].recoverd_count += value.recoverd_count;
            return res;
          }, {});

        }
        console.log(lineChartResult);
        setPieChartData({
          labels: pieChartResult.map((x) => x.disease),
          data: pieChartResult.map((x) => x.death_count),
        });

        setBarChartData({
          labels: barChartResult.map((x) => x.year),
          data: barChartResult.map((x) => x.death_count),
        });

        setLineChartData({
          labels: lineChartResult.map((x) => x.year),
          data: lineChartResult.map((x) => x.recoverd_count),
        });
      });
  }

  function getCountryList() {
    axiosInstance
      .get(`${BASE_URL}/${V1}/country`)
      .then((response: AxiosResponse<ApiResponse<CountryResponse[]>>) => {
        setCountries(response.data.data);
      });
  }

  return (
    <div className="Dashboard">
      <div className="filter-row">
        Country
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(parseInt(e.target.value));
          }}
          className="select-filter"
        >
          <option value={0}>-- All --</option>
          {Array.isArray(countries) &&
            countries.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
        </select>
      </div>
      <div className="chart-row">
        <div className="chart">
          {"Total Deaths "}
          <PieChart
            labels={pieChartData.labels ? pieChartData.labels : []}
            data={pieChartData.data ? pieChartData.data : []}
          />
        </div>
        <div className="chart">
          {" "}
          <BarChart 
          labels={barChartData.labels ? barChartData.labels : []}
          data={barChartData.data ? barChartData.data : []}
          />
        </div>
        <div className="chart">
        {" "}
          <LineChart 
          labels={lineChartData.labels ? lineChartData.labels : []}
          data={lineChartData.data ? lineChartData.data : []}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
