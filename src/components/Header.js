import React from "react"

function Header (){
  return (
<div className="main-container">
<header className="header">
  <div className="logo">DEMO Streaming</div>
  <div className="buttons">
    <button>Log in</button>
    <button>Start your free trial</button>
  </div>
</header>
<section className="popular-titles">
  <h1>Popular Titles</h1>
</section>
</div>
  );
}

export default Header;