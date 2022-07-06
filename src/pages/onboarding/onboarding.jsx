import { useEffect, useState } from "react";
import "./onboarding.css";
import { AiFillEdit } from "react-icons/ai";
import { getGreet, getHour, getMinute } from "utils";
import { getQuote } from "services";
import { Todo, Weather } from "components";
import { AiOutlineArrowDown } from "react-icons/ai";

export const OnBoarding = () => {
  const [userName, setUserName] = useState("");
  const [printUserName, setPrintUserName] = useState(
    localStorage.getItem("userName")
  );
  const [mainFocus, setMainFocus] = useState("");
  const [printMainFocus, setPrintMainFocus] = useState(
    localStorage.getItem("mainFocus")
  );
  const [time, setTime] = useState(null);
  const [quote, setQuote] = useState("");
  const [toggle, setToggle] = useState(false);
  const [todoModal, setTodoModal] = useState(false);

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
      setTime({ ...time, hours: getHour(), minutes: getMinute() });
    }, 1000);
  }, [time]);

  useEffect(() => {
    getQuote(setQuote);
  }, []);

  return (
    <div className="container">
      <a
        className="download-btn"
        href="https://addons.mozilla.org/en-US/firefox/addon/fresh--move/"
      >
        Download extension
        <AiOutlineArrowDown className="download-icon" />
      </a>
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
        <>
          <section className="sub-container">
            {time && (
              <h1 className="time">
                {time.hours} : {time.minutes}
              </h1>
            )}
            <p className="user-text">
              {getGreet()}, {printUserName}.
            </p>
            {!printMainFocus ? (
              <>
                <p className="text">What is your main focus for today ?</p>
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
          </section>
          <div className="quote">{quote}</div>
          <Weather />
          {todoModal && <Todo />}
          <span className="todo" onClick={() => setTodoModal((prev) => !prev)}>
            Todo
          </span>
        </>
      )}
    </div>
  );
};
