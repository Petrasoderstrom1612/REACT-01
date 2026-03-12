import React from "react";

const Counter = () => {
  const [counter, setCounter] = React.useState(0);

  const handleBtnClick = () => {
    console.log("counter before increase", counter);
    // counter++ = variabel kommer öka men sidan kommer inte renderas om - you cannot do counter++ as the destructured state is const,
    // setCounter(counter++) means counter + 1 and you are once again trying to reassign a const, consider it an advanced type
    setCounter(counter + 1); //den här tryggar omrendering, men  den görs efteråt (React lägger på kö alla state uppdateringar och omrenderar så har du console.log inuti denna function kommer den inte visa det aktuella värdet. Omrenderingen kommer rendera om allt förutom funktionen (egentligen det som ändrades - där staten används), rätt värde kommer därför visas på console.log utanför funktionen och uppdaterat värde kommer synas i JSX)
    //counter++;
    console.log("counter after increase", counter);
    // console.log(msg)
  };

  console.log("App is rendering, counter is:", counter);
  return (
    <div className="counter">
      <p>Counter: {counter}</p>
      <button onClick={handleBtnClick} className="btn btn-primary">
        Click me
      </button>
      <hr />
    </div>
  );
};

export default Counter;
