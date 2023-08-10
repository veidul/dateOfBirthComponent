import { useState, useRef, useEffect } from "react";

export function DobContainer() {
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [errors, setErrors] = useState({});
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const yearRef = useRef(null);

  //Error messages that will fire after submit
  //Month can only be 01-12
  //Day can only be 01-31
  //Year can only be within (new Date().getFullYear() - 100) - (new Date().getFullYear())

  //return a string date structured as YYYY-MM-DD

  //write an on keydown function to move to the last position of the previous input if on the first position of an input and left arrow is pressed
  function validateDate(bday) {
    let dateformat =
      /^(0?[1-9]|1[0-2])[\/](0?[1-9]|[1-2][0-9]|3[01])[\/]\d{4}$/;

    // Matching the date through regular expression
    if (bday.match(dateformat)) {
      let operator = bday.split("/");

      // Extract the string into month, date and year
      let datepart = [];
      if (operator.length > 1) {
        datepart = bday.split("/");
      }
      let month = parseInt(datepart[0]);
      let day = parseInt(datepart[1]);
      let year = parseInt(datepart[2]);

      // Create a list of days of a month
      let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (month === 1 || month > 2) {
        if (day > ListofDays[month - 1]) {
          //to check if the date is out of range
          console.log("Invalid date format!");
          return false;
        }
      } else if (month === 2) {
        let leapYear = false;
        if ((!(year % 4) && year % 100) || !(year % 400)) leapYear = true;
        if (leapYear === false && day >= 29) return false;
        else if (leapYear === true && day > 29) {
          console.log("Invalid date format!");
          return false;
        }
      }
    } else {
      console.log("Invalid date format!");
      return false;
    }
    console.log("Valid date");
    return true;
  }
  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const submitBday = () => {
    let minYear = new Date().getFullYear() - 100;
    let maxYear = new Date().getFullYear();
    let monthError = "Month can only be 01-12";
    let dayError = "Day can only be 01-31";
    let yearError = "Year can only be within " + minYear + "-" + maxYear;
    let errorHandler = {};
    if (month < 1 || month > 12) {
      if (errorHandler.monthError === undefined) {
        errorHandler = { ...errorHandler, monthError };
      }
    }
    if (day < 1 || day > 31) {
      errorHandler = { ...errorHandler, dayError };
    }
    if (year < minYear || year > maxYear) {
      if (errorHandler.yearError === undefined) {
        errorHandler = { ...errorHandler, yearError };
      }
    }
    let bday = `${month}/${day}/${year}`;
    setErrors({ ...errorHandler });
    validateDate(bday);
    console.log(bday);
  };

  const handleLeftArrow = (e) => {
    const { name } = e.target;
    if (e.keyCode === 37 && e.target.selectionStart === 0) {
      if (name === "day") {
        let input = document.querySelector("input[name=month]");
        let end = input.value.length;

        input.focus();
        input.setSelectionRange(end, end);
        //move caret to after last character
      }
      if (name === "year") {
        let input = document.querySelector("input[name=day]");
        let end = input.value.length;

        console.log(input.value.length);

        input.focus();
        input.select();
        input.setSelectionRange(end, end);
      }
    }
  };

  //write an on keydown function to move to the next input if on last position of input and right arrow is pressed

  const handleRightArrow = (e) => {
    const { name } = e.target;
    console.log(e.target.selectionStart, e.target.value.length);
    if (e.keyCode === 39 && e.target.selectionStart === e.target.value.length) {
      if (name === "month") {
        let input = document.querySelector("input[name=day]");

        input.focus();
        input.setSelectionRange(0, 0);
      }
      if (name === "day") {
        let input = document.querySelector("input[name=year]");
        input.focus();
        input.setSelectionRange(0, 0);
      }
    }
  };

  //write an on keyup function to move to previous input when backspace is pressed if input is empty
  const handleBackspace = (e) => {
    const { name, value } = e.target;
    if (e.keyCode === 8 && value === "") {
      if (name === "day") {
        let input = document.querySelector("input[name=month]");
        input.focus();
        input.select();
      }
      if (name === "year") {
        let input = document.querySelector("input[name=day]");
        input.focus();
        input.select();
      }
    }
  };

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;
    //regex to allow only numbers
    const regex = /^[0-9\b]+$/;
    if (value === "" || regex.test(value)) {
      if (name === "month") {
        setMonth(value);
        monthRef.current = value;
        if (maxLength === value.length) {
          let input = document.querySelector("input[name=day]");
          input.focus();
          input.select();
        }
      }
      if (name === "day") {
        setDay(value);
        dayRef.current = value;
        if (maxLength === value.length) {
          let input = document.querySelector("input[name=year]");
          input.focus();
          input.select();
        }
      }
      if (name === "year") {
        console.log("changed");
        setYear(value);
      }
    }
  };

  //add leading zero to month and day
  const addLeading = (a, b) => {
    if (b > 0 && b < 10 && b.length === 1) {
      a === "month" ? setMonth(`0${b}`) : setDay(`0${b}`);
    }
  };

  return (
    <div className="bg-white shadow sm:rounded-lg w-1/3">
      <div className="px-4 py-5 sm:p-6 align-center">
        <h3 className="text-base font-semibold leading-6 text-gray-900">
          What is your birthday?
        </h3>
        <h3 className="text-base font-semibold leading-6 text-gray-400">
          MM - DD - YYYY
        </h3>
        <form className="mt-5 sm:flex sm:items-center">
          <div className="w-full flex sm:max-w-xs">
            <div className="m-2">
              <label htmlFor="Month" className="">
                Month
              </label>
              <input
                type="text"
                ref={monthRef}
                minLength={1}
                maxLength={2}
                size={3}
                onChange={(e) => handleChange(e)}
                value={month}
                onBlur={() => addLeading("month", monthRef.current)}
                onKeyDown={(e) => handleRightArrow(e)}
                name="month"
                id="month"
                className="block w-fit text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="MM"
              />
            </div>
            <div className="m-2">
              <label htmlFor="day" className="">
                Day
              </label>
              <input
                type="text"
                name="day"
                ref={dayRef}
                id="day"
                onChange={(e) => handleChange(e)}
                onBlur={() => addLeading("day", dayRef.current)}
                onKeyUp={(e) => handleBackspace(e)}
                onKeyDown={(e) => handleLeftArrow(e) || handleRightArrow(e)}
                value={day}
                minLength={2}
                maxLength={2}
                size={2}
                className="block w-fit text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="DD"
              />
            </div>
            <div className="m-2">
              <label htmlFor="year" className="">
                Year
              </label>
              <input
                type="text"
                name="year"
                id="year"
                ref={yearRef}
                value={year}
                minLength={4}
                maxLength={4}
                onChange={(e) => handleChange(e, "year")}
                onKeyUp={(e) => handleBackspace(e)}
                onKeyDown={(e) => handleLeftArrow(e)}
                size={4}
                // min={new Date().getFullYear() - 100}
                // max={new Date().getFullYear()}
                className="block w-fit text-center rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="YYYY"
              />
            </div>
          </div>
        </form>
        {errors.monthError ? (
          <div className="text-red-500">{errors.monthError}</div>
        ) : null}
        {errors.dayError ? (
          <div className="text-red-500">{errors.dayError}</div>
        ) : null}
        {errors.yearError ? (
          <div className="text-red-500">{errors.yearError}</div>
        ) : null}
        <div className="w-full flex">
          <button
            type="submit"
            className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => submitBday()}
            className="bg-blue-500 m-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
