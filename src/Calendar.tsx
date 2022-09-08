import { useState, useEffect } from "react";
import "./styles.css";
import moment from "moment";

type shownDateType = {
  day: number;
  date: string;
  weekDay: string;
};

export default function Calendar() {
  const today = moment().format("MMMM D YYYY");
  const [shownDates, setShownDates] = useState<shownDateType[]>([]);
  const [shownMonthAndYear, setShownMonthAndYear] = useState<string>("");
  const [currentWeek, setCurrentWeek] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<string>(
    moment().format("MMMM D YYYY")
  );

  function calculteShownMonthAndYear(shownDates: shownDateType[]) {
    let firstShownDate = shownDates[0].date;
    setShownMonthAndYear(
      firstShownDate.split(" ")[0] + " " + firstShownDate.split(" ")[2]
    );
  }

  function calculateShownDates(week: number) {
    const daysSinceMonday = Number(moment().format("d")) - 1;
    let tempArray: shownDateType[] = [];
    for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
      tempArray.push({
        day: Number(
          moment()
            .subtract(daysSinceMonday - (dayOfWeek + 7 * week), "days")
            .format("D")
        ),
        date: moment()
          .subtract(daysSinceMonday - (dayOfWeek + 7 * week), "days")
          .format("MMMM D YYYY"),
        weekDay: moment()
          .subtract(daysSinceMonday - (dayOfWeek + 7 * week), "days")
          .format("ddd")
      });
    }
    setShownDates(tempArray);
    calculteShownMonthAndYear(tempArray);
  }

  useEffect(() => {
    calculateShownDates(currentWeek);
  }, [currentWeek]);

  function drawDates() {
    return shownDates.map((shownDate, index) => {
      return (
        <div
          className={
            "dateBox" +
            (selectedDay === shownDate.date
              ? " selectedDay"
              : today === shownDate.date
              ? " today"
              : "")
          }
          key={index}
          onClick={() => setSelectedDay(shownDate.date)}
        >
          <div>{shownDate.weekDay}</div>
          <div>{shownDate.day}</div>
        </div>
      );
    });
  }

  return (
    <>
      <div className="month">{shownMonthAndYear}</div>
      <div className="container">
        <div
          className="arrowButton"
          onClick={() => setCurrentWeek(currentWeek - 1)}
        >
          {"<"}
        </div>
        {drawDates()}
        <div
          className="arrowButton"
          onClick={() => setCurrentWeek(currentWeek + 1)}
        >
          {">"}
        </div>
      </div>
      <h4>Selected Day: {selectedDay}</h4>
    </>
  );
}
