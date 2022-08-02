import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="container text-center">
        <img src="img/speech.png" className="mb-5" alt="power ding" />
      </div>
      <div className="row">
        <div className="col-md-6 mx-auto">
          <form action="">
            <div className="form-group">
              <textarea
                className="form-control form-control-lg"
                name=""
                id="text-input"
                placeholder="Type anything..."
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="rate">Rate</label>
              <div id="rate-value" className="badge badge-primary float-right">
                1
              </div>
              <input
                type="range"
                id="rate"
                className="custom-range"
                min="0.5"
                max="2"
                value="1"
                step="0.1"
                onChange={() => {
                  console.log("hi");
                }}
              ></input>
            </div>
            <div className="form-group">
              <label htmlFor="pitch">Pitch</label>
              <div id="pitch-value" className="badge badge-primary float-right">
                1
              </div>
              <input
                type="range"
                id="pitch"
                className="custom-range"
                min="0.0"
                max="2"
                value="1"
                onChange={() => {
                  console.log("hi");
                }}
                step="0.1"
              ></input>
            </div>
            <div className="form-group">
              <select
                id="voice-select"
                className="form-control form-control-lg"
              ></select>
            </div>
            <button className="btn btn-light btn-lg btn-block">Speak It</button>
          </form>
        </div>
      </div>
      <script
        src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
        integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
        crossOrigin="anonymous"
      ></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
        integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
}

export default App;
