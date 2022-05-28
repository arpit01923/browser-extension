import { useEffect, useState } from "react";
import "./onboarding.css";
import { AiFillEdit } from "react-icons/ai";
import { getGreet, getHour, getMinute } from "../../utils";
import { getQuote } from "../../services";
import { Todo, Weather } from "../../components";

export const OnBoarding = () => {
  const [userName, setUserName] = useState("");
  const [printUserName, setPrintUserName] = useState("");
  const [mainFocus, setMainFocus] = useState("");
  const [printMainFocus, setPrintMainFocus] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [quote, setQuote] = useState("");
  const [toggle, setToggle] = useState(false);

  const continueHandler = () => {
    localStorage.setItem("userName", userName);
    setPrintUserName(localStorage.getItem("userName"));
  };

  const eventHandler = () => {
    localStorage.setItem("mainFocus", mainFocus);
    setPrintMainFocus(localStorage.getItem("mainFocus"));
  };

  useEffect(() => {
    setInterval(() => {
      setHours(getHour());
      setMinutes(getMinute());
    }, 1000);
  }, [hours, minutes]);

  useEffect(() => {
    getQuote(setQuote);
  }, []);

  return (
    <div className="container">
      {!printUserName ? (
        <section className="sub-container">
          <h1 className="title">Hello what's your name ?</h1>
          <input
            className="name-input"
            onChange={(e) => setUserName(e.target.value)}
          />
          <button className="btn" onClick={() => continueHandler()}>
            Continue
          </button>
        </section>
      ) : (
        <section className="sub-container">
          <h1 className="time">
            {hours} : {minutes}
          </h1>
          <p className="user-text">
            {getGreet()}, {printUserName}.
          </p>
          <p className="text">What is your main focus for today ?</p>
          {!printMainFocus ? (
            <>
              <input
                className="name-input"
                value={mainFocus}
                onChange={(e) => setMainFocus(e.target.value)}
              />
              <button className="btn" onClick={() => eventHandler()}>
                Add event
              </button>{" "}
            </>
          ) : (
            <div className="focus">
              <input
                type="checkbox"
                className="focus-input"
                checked={toggle}
                onChange={() => setToggle((prev) => !prev)}
              />
              <p
                className="focus-text"
                style={{ textDecoration: toggle ? "line-through" : "none" }}
              >
                {printMainFocus}
              </p>
              <AiFillEdit
                className="focus-edit"
                onClick={() => setPrintMainFocus("")}
              />
            </div>
          )}
          <div className="quote">{quote}</div>
        </section>
      )}
      <Weather />
      <Todo />
    </div>
  );
};
